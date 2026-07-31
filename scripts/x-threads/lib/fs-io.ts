import fs from 'node:fs';
import path from 'node:path';
import type { ThreadDoc } from './types.ts';
import { serializeThreadYaml } from './thread-yaml.ts';

export function listThreadFiles(threadsDir: string): string[] {
  if (!fs.existsSync(threadsDir)) return [];
  const entries = fs.readdirSync(threadsDir);
  return entries
    .filter((f) => f.endsWith('.yml') && f !== 'config.yml')
    .map((f) => path.join(threadsDir, f));
}

export function listExistingThreadSlugs(threadsDir: string): Set<string> {
  if (!fs.existsSync(threadsDir)) return new Set();
  const entries = fs.readdirSync(threadsDir);
  const slugs = entries
    .filter((f) => f.endsWith('.yml') && f !== 'config.yml')
    .map((f) => path.basename(f, '.yml'));
  return new Set(slugs);
}

export function readFile(p: string): string {
  return fs.readFileSync(p, 'utf8');
}

export function writeFile(p: string, content: string): void {
  fs.writeFileSync(p, content, 'utf8');
}

export function writeThreadDoc(threadsDir: string, doc: ThreadDoc): void {
  if (!fs.existsSync(threadsDir)) {
    fs.mkdirSync(threadsDir, { recursive: true });
  }
  const p = path.join(threadsDir, `${doc.slug}.yml`);
  writeFile(p, serializeThreadYaml(doc));
}
