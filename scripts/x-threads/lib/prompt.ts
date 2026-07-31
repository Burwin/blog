import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TEMPLATE_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'prompts',
  'thread.txt',
);

function loadTemplate(): { system: string; userTemplate: string } {
  const raw = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const systemMatch = raw.match(/===SYSTEM===\s*([\s\S]*?)\s*===USER===/);
  const userMatch = raw.match(/===USER===\s*([\s\S]*)$/);
  if (!systemMatch || !userMatch) {
    throw new Error(`Invalid prompt template at ${TEMPLATE_PATH}: missing ===SYSTEM=== / ===USER=== sections`);
  }
  return {
    system: systemMatch[1].trim(),
    userTemplate: userMatch[1].trim(),
  };
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    if (!(key in vars)) throw new Error(`Unknown prompt placeholder: {{${key}}}`);
    return vars[key];
  });
}

export function buildThreadPrompt(input: {
  title: string;
  body: string;
  url: string;
}): { system: string; user: string } {
  const { system, userTemplate } = loadTemplate();
  const user = fill(userTemplate, {
    title: input.title,
    body: input.body,
    url: input.url,
  });
  return { system, user };
}

export function parseLlmTweetList(raw: string): string[] {
  let text = raw.trim();
  const fenceMatch = text.match(/^```(?:\w+)?\s*\n?([\s\S]*?)\n?```\s*$/i);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    throw new Error(`invalid JSON: ${e instanceof Error ? e.message : String(e)}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error('expected a JSON array');
  }
  if (parsed.length === 0) {
    throw new Error('empty array: at least one tweet required');
  }
  if (!parsed.every((t): t is string => typeof t === 'string')) {
    throw new Error('all elements must be strings');
  }
  return parsed;
}
