import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPostBody } from './load-post-body.ts';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

test('loadPostBody returns markdown body without front-matter for a temp content/posts/<slug>.md', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'load-post-body-'));
  try {
    const postsDir = path.join(root, 'content', 'posts');
    mkdirSync(postsDir, { recursive: true });
    const md = `---
date: 2026-08-01
title: Foo
excerpt: bar
---

# hello

This is the **body**.

`;
    writeFileSync(path.join(postsDir, 'foo.md'), md);
    const body = loadPostBody('foo', root);
    assert.ok(body);
    assert.ok(!body.includes('date: 2026-08-01'));
    assert.ok(body.includes('# hello'));
    assert.ok(body.includes('**body**'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('loadPostBody returns null when file missing (no throw)', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'load-post-body-missing-'));
  try {
    const body = loadPostBody('nonexistent', root);
    assert.strictEqual(body, null);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
