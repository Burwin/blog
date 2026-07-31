import type { ThreadDoc } from './types.ts';
import { listThreadFiles, readFile, writeFile } from './fs-io.ts';
import { parseThreadYaml, serializeThreadYaml } from './thread-yaml.ts';

export function enrichThread(doc: ThreadDoc, ids: string[]): ThreadDoc {
  return {
    ...doc,
    status: 'published',
    tweets: doc.tweets.map((t, i) => ({ ...t, id: ids[i] })),
  };
}

export async function publishThreadFile(
  filePath: string,
  deps: { postThread: (tweets: string[]) => Promise<string[]> },
): Promise<ThreadDoc | null> {
  const doc = parseThreadYaml(readFile(filePath));
  if (doc.status === 'published') return null;

  const ids = await deps.postThread(doc.tweets.map((t) => t.text));
  const enriched = enrichThread(doc, ids);
  writeFile(filePath, serializeThreadYaml(enriched));
  return enriched;
}

export async function runPublish(
  opts: { threadsDir: string },
  deps: { postThread: (tweets: string[]) => Promise<string[]> },
): Promise<string[]> {
  const written: string[] = [];

  for (const filePath of listThreadFiles(opts.threadsDir)) {
    const result = await publishThreadFile(filePath, deps);
    if (result !== null) written.push(filePath);
  }

  return written;
}
