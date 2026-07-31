import path from 'node:path';
import type { PostMeta, ThreadDoc } from './types.ts';
import { buildThreadPrompt, parseLlmTweetList } from './prompt.ts';
import { validateThread } from './thread-yaml.ts';
import { selectEligiblePosts } from './select-posts.ts';
import { loadPostBody } from './load-post-body.ts';
import { listExistingThreadSlugs, writeThreadDoc } from './fs-io.ts';

export async function draftThread(
  input: { title: string; body: string; url: string; slug: string },
  deps: { complete: (sys: string, user: string) => Promise<string> }
): Promise<ThreadDoc> {
  const { system, user } = buildThreadPrompt({
    title: input.title,
    body: input.body,
    url: input.url,
  });
  const raw = await deps.complete(system, user);
  const texts = parseLlmTweetList(raw);
  if (texts[texts.length - 1] !== input.url) {
    texts.push(input.url);
  }
  const doc: ThreadDoc = {
    slug: input.slug,
    url: input.url,
    title: input.title,
    status: 'draft',
    tweets: texts.map((text) => ({ text })),
  };
  const issues = validateThread(doc);
  if (issues.length > 0) {
    throw new Error(`invalid thread draft: ${issues.join('; ')}`);
  }
  return doc;
}

export async function runDraft(
  opts: {
    posts: PostMeta[];
    rootDir: string;
    threadsDir: string;
    goLive: string;
    siteUrl: string;
  },
  deps: { complete: (sys: string, user: string) => Promise<string> },
): Promise<string[]> {
  const existing = listExistingThreadSlugs(opts.threadsDir);
  const eligible = selectEligiblePosts(opts.posts, existing, opts.goLive);
  const siteUrl = opts.siteUrl.replace(/\/$/, '');
  const written: string[] = [];

  for (const post of eligible) {
    const body = loadPostBody(post.id, opts.rootDir);
    if (body === null) {
      console.log(`Skipping ${post.id}: no content/posts/${post.id}.md`);
      continue;
    }
    const url = `${siteUrl}/posts/${post.id}`;
    const doc = await draftThread(
      { slug: post.id, title: post.title, body, url },
      deps,
    );
    writeThreadDoc(opts.threadsDir, doc);
    written.push(path.join(opts.threadsDir, `${doc.slug}.yml`));
  }

  return written;
}
