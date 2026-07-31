import fs from 'node:fs';
import path from 'node:path';
import { loadConfig } from '../lib/config.ts';
import { runDraft } from '../lib/draft.ts';
import { grokComplete } from '../lib/grok-client.ts';
import type { PostMeta } from '../lib/types.ts';

async function main(): Promise<void> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    console.error('XAI_API_KEY is required');
    process.exit(1);
  }

  const rootDir = process.cwd();
  const config = loadConfig(rootDir);
  const postsPath = path.join(rootDir, 'posts.json');
  const raw = JSON.parse(fs.readFileSync(postsPath, 'utf8')) as Array<{
    id: string;
    date: string;
    title: string;
    description?: string;
    excerpt?: string;
  }>;
  const posts: PostMeta[] = raw.map((p) => ({
    id: p.id,
    date: p.date,
    title: p.title,
    excerpt: p.excerpt ?? p.description ?? '',
  }));

  const written = await runDraft(
    {
      posts,
      rootDir,
      threadsDir: path.join(rootDir, 'threads'),
      goLive: config.goLiveDate,
      siteUrl: config.siteUrl,
    },
    {
      complete: (system, user) => grokComplete(system, user, { apiKey }),
    },
  );

  if (written.length === 0) {
    console.log('No new thread drafts to write.');
  } else {
    console.log(`Wrote ${written.length} draft(s):`);
    for (const p of written) console.log(`  ${p}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
