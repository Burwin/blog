import { test } from 'node:test';
import assert from 'node:assert/strict';
import { draftThread, runDraft } from './draft.ts';
import { buildThreadPrompt } from './prompt.ts';
import { validateThread, parseThreadYaml } from './thread-yaml.ts';
import type { PostMeta } from './types.ts';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

test('draftThread calls complete(system,user), builds draft ThreadDoc, appends url if omitted, validates 0 issues', async () => {
  const input = {
    slug: 'trust',
    title: 'Trust',
    body: 'Trust is earned slowly and lost quickly.',
    url: 'https://mharris.io/posts/trust',
  };
  const expectedPrompt = buildThreadPrompt({
    title: input.title,
    body: input.body,
    url: input.url,
  });

  let completeCalls = 0;
  let receivedSystem = '';
  let receivedUser = '';

  const complete = async (system: string, user: string): Promise<string> => {
    completeCalls += 1;
    receivedSystem = system;
    receivedUser = user;
    // Model omits the blog URL — draftThread must append it.
    return JSON.stringify([
      'Trust is earned slowly.',
      'And lost quickly.',
    ]);
  };

  const doc = await draftThread(input, { complete });

  assert.equal(completeCalls, 1, 'complete must be called once');
  assert.equal(receivedSystem, expectedPrompt.system);
  assert.equal(receivedUser, expectedPrompt.user);

  assert.equal(doc.slug, input.slug);
  assert.equal(doc.url, input.url);
  assert.equal(doc.title, input.title);
  assert.equal(doc.status, 'draft');
  assert.deepEqual(
    doc.tweets.map((t) => t.text),
    [
      'Trust is earned slowly.',
      'And lost quickly.',
      input.url,
    ],
  );
  assert.equal(validateThread(doc).length, 0);
});

test('draftThread strips markdown from LLM tweet texts before validate/write', async () => {
  const input = {
    slug: 'separation-of-powers',
    title: 'Separation of Powers',
    body: 'Body.',
    url: 'https://mharris.io/posts/separation-of-powers',
  };

  const complete = async (_system: string, _user: string): Promise<string> =>
    JSON.stringify([
      '- **Legislators**: write laws',
      'See **TRUST!!**',
    ]);

  const doc = await draftThread(input, { complete });

  assert.deepEqual(
    doc.tweets.map((t) => t.text),
    [
      '- Legislators: write laws',
      'See TRUST!!',
      input.url,
    ],
  );
  assert.equal(validateThread(doc).length, 0);
});

test('runDraft for one eligible post: load body → draftThread → write; skips null body; returns written paths', async () => {
  const root = mkdtempSync(path.join(tmpdir(), 'run-draft-'));
  const threadsDir = path.join(root, 'threads');
  const postsDir = path.join(root, 'content', 'posts');
  try {
    mkdirSync(postsDir, { recursive: true });
    mkdirSync(threadsDir, { recursive: true });

    writeFileSync(
      path.join(postsDir, 'with-body.md'),
      `---
date: 2026-08-01
title: With Body
excerpt: e
---

Trust is earned slowly and lost quickly.
`,
    );
    // no-body: eligible by date but no content/posts/no-body.md → loadPostBody null

    const posts: PostMeta[] = [
      { id: 'with-body', date: '2026-08-01', title: 'With Body', excerpt: 'e' },
      { id: 'no-body', date: '2026-08-02', title: 'No Body', excerpt: 'e' },
      { id: 'too-old', date: '2026-01-01', title: 'Old', excerpt: 'e' },
    ];

    let completeCalls = 0;
    const complete = async (_system: string, _user: string): Promise<string> => {
      completeCalls += 1;
      return JSON.stringify(['Hook tweet.', 'Second tweet.']);
    };

    const written = await runDraft(
      {
        posts,
        rootDir: root,
        threadsDir,
        goLive: '2026-07-31',
        siteUrl: 'https://mharris.io',
      },
      { complete },
    );

    const expectedPath = path.join(threadsDir, 'with-body.yml');
    assert.deepEqual(written, [expectedPath]);
    assert.equal(completeCalls, 1, 'complete only for posts with a body');
    assert.ok(existsSync(expectedPath));
    assert.ok(!existsSync(path.join(threadsDir, 'no-body.yml')));
    assert.ok(!existsSync(path.join(threadsDir, 'too-old.yml')));

    const doc = parseThreadYaml(readFileSync(expectedPath, 'utf8'));
    assert.equal(doc.slug, 'with-body');
    assert.equal(doc.title, 'With Body');
    assert.equal(doc.url, 'https://mharris.io/posts/with-body');
    assert.equal(doc.status, 'draft');
    assert.deepEqual(
      doc.tweets.map((t) => t.text),
      [
        'Hook tweet.',
        'Second tweet.',
        'https://mharris.io/posts/with-body',
      ],
    );
    assert.equal(validateThread(doc).length, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
