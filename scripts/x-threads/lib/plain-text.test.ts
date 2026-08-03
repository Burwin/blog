import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stripMarkdownToPlain } from './plain-text.ts';

const cases: { name: string; input: string; expected: string }[] = [
  { name: 'bold **', input: '**bold text**', expected: 'bold text' },
  { name: 'bold __', input: '__bold__', expected: 'bold' },
  { name: 'italic *', input: '*italic*', expected: 'italic' },
  { name: 'italic _', input: '_italic_', expected: 'italic' },
  { name: 'inline code', input: '`code`', expected: 'code' },
  { name: 'link to label', input: '[EARS](https://example.com)', expected: 'EARS' },
  { name: 'heading markers', input: '## Conventions', expected: 'Conventions' },
  {
    name: 'fenced block drops markers keeps body',
    input: '```\ninner line\n```',
    expected: 'inner line',
  },
  {
    name: 'list marker kept, bold stripped',
    input: '- **Legislators**: write laws',
    expected: '- Legislators: write laws',
  },
  { name: 'plain prose unchanged', input: 'Just plain text.', expected: 'Just plain text.' },
  {
    name: 'bare URL unchanged',
    input: 'https://mharris.io/posts/trust',
    expected: 'https://mharris.io/posts/trust',
  },
];

for (const { name, input, expected } of cases) {
  test(`stripMarkdownToPlain: ${name}`, () => {
    assert.equal(stripMarkdownToPlain(input), expected);
  });
}
