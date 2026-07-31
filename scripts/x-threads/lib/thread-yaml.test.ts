import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateThread, parseThreadYaml, serializeThreadYaml } from './thread-yaml.ts';
import type { ThreadDoc } from './types.ts';

test('validateThread flags missing slug', () => {
  const doc: any = { url: 'https://ex', status: 'draft', tweets: [{ text: 'hi' }] };
  const issues = validateThread(doc);
  assert.ok(issues.length > 0);
  assert.match(issues.join(' '), /slug/i);
});

test('validateThread flags missing url', () => {
  const doc: any = { slug: 's', status: 'draft', tweets: [{ text: 'hi' }] };
  const issues = validateThread(doc);
  assert.ok(issues.length > 0);
  assert.match(issues.join(' '), /url/i);
});

test('validateThread flags missing status', () => {
  const doc: any = { slug: 's', url: 'https://ex', tweets: [{ text: 'hi' }] };
  const issues = validateThread(doc);
  assert.ok(issues.length > 0);
  assert.match(issues.join(' '), /status/i);
});

test('validateThread flags empty tweets', () => {
  const doc: any = { slug: 's', url: 'https://ex', status: 'draft', tweets: [] };
  const issues = validateThread(doc);
  assert.ok(issues.length > 0);
  assert.match(issues.join(' '), /tweet/i);
});

test('validateThread flags status not in draft|published', () => {
  const doc: any = { slug: 's', url: 'https://ex', status: 'foo', tweets: [{ text: 'hi' }] };
  const issues = validateThread(doc);
  assert.ok(issues.length > 0);
  assert.match(issues.join(' '), /status/i);
});

test('validateThread flags when last tweet text ≠ doc.url', () => {
  const doc: any = { slug: 's', url: 'https://ex', status: 'draft', tweets: [{ text: 'hi' }] };
  const issues = validateThread(doc);
  assert.ok(issues.length > 0);
  assert.match(issues.join(' '), /last tweet|url/i);
});

test('parseThreadYaml / serializeThreadYaml round-trip preserves slug, url, title, status, tweet texts (+ optional ids)', () => {
  const original: ThreadDoc = {
    slug: 'trust',
    url: 'https://mharris.io/posts/trust',
    title: 'Trust',
    status: 'draft',
    tweets: [
      { text: 'First tweet' },
      { text: 'https://mharris.io/posts/trust', id: '123' }
    ]
  };
  const yaml = serializeThreadYaml(original);
  const round = parseThreadYaml(yaml);
  assert.equal(round.slug, original.slug);
  assert.equal(round.url, original.url);
  assert.equal(round.title, original.title);
  assert.equal(round.status, original.status);
  assert.equal(round.tweets.length, original.tweets.length);
  assert.equal(round.tweets[0].text, original.tweets[0].text);
  assert.equal(round.tweets[1].text, original.tweets[1].text);
  assert.equal(round.tweets[1].id, original.tweets[1].id);
});

test('happy-path fixture ThreadDoc validates with zero issues', () => {
  const doc: ThreadDoc = {
    slug: 'trust',
    url: 'https://mharris.io/posts/trust',
    title: 'Trust',
    status: 'draft',
    tweets: [
      { text: 'First tweet' },
      { text: 'https://mharris.io/posts/trust' }
    ]
  };
  const issues = validateThread(doc);
  assert.equal(issues.length, 0);
  assert.deepEqual(issues, []);
});
