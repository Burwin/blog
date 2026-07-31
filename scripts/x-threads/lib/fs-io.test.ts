import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listExistingThreadSlugs, writeThreadDoc } from './fs-io.ts';
import type { ThreadDoc } from './types.ts';
import { serializeThreadYaml } from './thread-yaml.ts';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

test('listExistingThreadSlugs(threadsDir) returns slug set from *.yml basenames', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'threads-slugs-'));
  const threadsDir = path.join(root, 'threads');
  try {
    mkdirSync(threadsDir, { recursive: true });
    writeFileSync(path.join(threadsDir, 'trust.yml'), 'slug: trust\n');
    writeFileSync(path.join(threadsDir, 'foo-bar.yml'), '');
    writeFileSync(path.join(threadsDir, 'config.yml'), 'go_live_date: 2026-07-31\n');
    writeFileSync(path.join(threadsDir, '.gitkeep'), '');
    writeFileSync(path.join(threadsDir, 'notyml.txt'), 'x');

    const slugs = listExistingThreadSlugs(threadsDir);
    assert.ok(slugs instanceof Set);
    assert.deepEqual(Array.from(slugs).sort(), ['foo-bar', 'trust']);
    assert.ok(!slugs.has('config'));
    assert.ok(!slugs.has('notyml'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('writeThreadDoc writes threads/<slug>.yml via serialize', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'write-thread-doc-'));
  const threadsDir = path.join(root, 'threads');
  try {
    mkdirSync(threadsDir, { recursive: true });
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
    writeThreadDoc(threadsDir, doc);
    const p = path.join(threadsDir, 'trust.yml');
    const written = readFileSync(p, 'utf8');
    assert.equal(written, serializeThreadYaml(doc));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
