import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { enrichThread, runPublish } from './publish.ts';
import { parseThreadYaml, serializeThreadYaml } from './thread-yaml.ts';
import type { ThreadDoc } from './types.ts';

test('enrichThread sets each tweets[i].id, sets status: published', () => {
  const doc: ThreadDoc = {
    slug: 'trust',
    url: 'https://mharris.io/posts/trust',
    title: 'Trust',
    status: 'draft',
    tweets: [
      { text: 'Trust is earned.' },
      { text: 'https://mharris.io/posts/trust' }
    ]
  };
  const ids = ['111222333', '444555666'];

  const enriched = enrichThread(doc, ids);

  assert.equal(enriched.status, 'published');
  assert.equal(enriched.tweets.length, 2);
  assert.equal(enriched.tweets[0]!.id, '111222333');
  assert.equal(enriched.tweets[1]!.id, '444555666');
  assert.equal(enriched.tweets[0]!.text, 'Trust is earned.');
  assert.equal(enriched.tweets[1]!.text, 'https://mharris.io/posts/trust');
  // original draft unchanged (pure)
  assert.equal(doc.status, 'draft');
  assert.equal(doc.tweets[0]!.id, undefined);
});

test('runPublish no-ops when status === published; otherwise postThread + write enriched yaml', async () => {
  const root = mkdtempSync(path.join(tmpdir(), 'run-publish-'));
  const threadsDir = path.join(root, 'threads');
  try {
    mkdirSync(threadsDir, { recursive: true });

    const draftDoc: ThreadDoc = {
      slug: 'trust',
      url: 'https://mharris.io/posts/trust',
      title: 'Trust',
      status: 'draft',
      tweets: [
        { text: 'Trust is earned.' },
        { text: 'https://mharris.io/posts/trust' },
      ],
    };
    const publishedDoc: ThreadDoc = {
      slug: 'already',
      url: 'https://mharris.io/posts/already',
      title: 'Already',
      status: 'published',
      tweets: [
        { text: 'Done.', id: '999' },
        { text: 'https://mharris.io/posts/already', id: '998' },
      ],
    };

    const draftPath = path.join(threadsDir, 'trust.yml');
    const publishedPath = path.join(threadsDir, 'already.yml');
    const publishedBefore = serializeThreadYaml(publishedDoc);
    writeFileSync(draftPath, serializeThreadYaml(draftDoc));
    writeFileSync(publishedPath, publishedBefore);

    const postCalls: string[][] = [];
    const postThread = async (tweets: string[]): Promise<string[]> => {
      postCalls.push(tweets);
      return tweets.map((_, i) => `id-${i}`);
    };

    const written = await runPublish({ threadsDir }, { postThread });

    assert.equal(postCalls.length, 1, 'postThread only for draft status');
    assert.deepEqual(postCalls[0], [
      'Trust is earned.',
      'https://mharris.io/posts/trust',
    ]);

    assert.deepEqual(written, [draftPath]);

    const enriched = parseThreadYaml(readFileSync(draftPath, 'utf8'));
    assert.equal(enriched.status, 'published');
    assert.equal(enriched.tweets[0]!.id, 'id-0');
    assert.equal(enriched.tweets[1]!.id, 'id-1');
    assert.equal(enriched.tweets[0]!.text, 'Trust is earned.');
    assert.equal(enriched.tweets[1]!.text, 'https://mharris.io/posts/trust');

    assert.equal(
      readFileSync(publishedPath, 'utf8'),
      publishedBefore,
      'already-published yaml must be untouched',
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
