import { parse, stringify } from 'yaml';
import type { ThreadDoc } from './types.ts';

export function parseThreadYaml(raw: string): ThreadDoc {
  return parse(raw) as ThreadDoc;
}

export function serializeThreadYaml(doc: ThreadDoc): string {
  return stringify(doc, { lineWidth: 0 });
}

export function validateThread(doc: ThreadDoc): string[] {
  const issues: string[] = [];
  if (!doc?.slug) issues.push('missing required slug');
  if (!doc?.url) issues.push('missing required url');
  if (!doc?.status) issues.push('missing required status');
  if (!doc?.tweets || doc.tweets.length === 0) issues.push('tweets must not be empty');
  if (doc?.status && doc.status !== 'draft' && doc.status !== 'published') issues.push('status must be draft or published');
  if (doc?.url && doc?.tweets && doc.tweets.length > 0 && doc.tweets[doc.tweets.length - 1]?.text !== doc.url) issues.push('last tweet text must equal the post url');
  return issues;
}
