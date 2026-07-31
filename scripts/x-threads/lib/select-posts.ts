import type { PostMeta } from './types.ts';

export function selectEligiblePosts(posts: PostMeta[], existingSlugs: Set<string>, goLive: string): PostMeta[] {
  const goYmd = (goLive || '').slice(0, 10);
  const filtered = posts.filter(p => (p.date || '').slice(0, 10) >= goYmd && !existingSlugs.has(p.id));
  return filtered.sort((a, b) => (a.date || '').slice(0, 10).localeCompare((b.date || '').slice(0, 10)));
}
