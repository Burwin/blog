import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectEligiblePosts } from './select-posts.ts';
import type { PostMeta } from './types.ts';

test('selectEligiblePosts returns [] when every post date is before goLive', () => {
  const posts: PostMeta[] = [
    { id: 'a', date: '2026-07-30', title: 'A', excerpt: 'x' },
    { id: 'b', date: '2026-07-29T12:00:00.000Z', title: 'B', excerpt: 'y' },
  ];
  const eligible = selectEligiblePosts(posts, new Set<string>(), '2026-07-31');
  assert.deepEqual(eligible, []);
});

test('selectEligiblePosts skips posts whose id is in existingSlugs even if on/after go-live', () => {
  const posts: PostMeta[] = [
    { id: 'old', date: '2026-07-30', title: 'Old', excerpt: 'x' },
    { id: 'new1', date: '2026-07-31', title: 'New1', excerpt: 'y' },
    { id: 'new2', date: '2026-08-01', title: 'New2', excerpt: 'z' },
  ];
  const eligible = selectEligiblePosts(posts, new Set(['new1']), '2026-07-31');
  assert.deepEqual(eligible, [
    { id: 'new2', date: '2026-08-01', title: 'New2', excerpt: 'z' },
  ]);
});

test('selectEligiblePosts includes on/after go-live posts not in existingSlugs (stable order by date asc)', () => {
  const posts: PostMeta[] = [
    { id: 'late', date: '2026-08-05', title: 'Late', excerpt: 'l' },
    { id: 'before', date: '2026-07-30', title: 'Before', excerpt: 'b' },
    { id: 'early', date: '2026-07-31', title: 'Early', excerpt: 'e' },
    { id: 'mid', date: '2026-08-01', title: 'Mid', excerpt: 'm' },
  ];
  const eligible = selectEligiblePosts(posts, new Set<string>(), '2026-07-31');
  assert.deepEqual(eligible, [
    { id: 'early', date: '2026-07-31', title: 'Early', excerpt: 'e' },
    { id: 'mid', date: '2026-08-01', title: 'Mid', excerpt: 'm' },
    { id: 'late', date: '2026-08-05', title: 'Late', excerpt: 'l' },
  ]);
});
