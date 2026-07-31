import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export function loadPostBody(slug: string, rootDir: string): string | null {
  const file = path.join(rootDir, 'content', 'posts', `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = matter(raw);
  return parsed.content;
}
