import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildThreadPrompt, parseLlmTweetList } from './prompt.ts';

test('buildThreadPrompt user includes title/body/url; system requires near-verbatim, hook, JSON array, ~260 chars', () => {
  const input = {
    title: 'Trust',
    body: 'Trust is earned slowly and lost quickly.\n\nPeople notice when you keep small promises.',
    url: 'https://mharris.io/posts/trust',
  };

  const { system, user } = buildThreadPrompt(input);

  assert.ok(user.includes(input.title), 'user must include title');
  assert.ok(user.includes(input.body), 'user must include body');
  assert.ok(user.includes(input.url), 'user must include url');

  const systemLower = system.toLowerCase();
  assert.ok(
    /near[- ]verbatim|verbatim|own wording|post'?s (own )?wording/.test(systemLower),
    'system must require near-verbatim wording',
  );
  assert.ok(
    /hook|engaging|open(ing)?/.test(systemLower),
    'system must require an engaging hook',
  );
  assert.ok(
    /json\s*array|array of (json\s*)?strings|json/.test(systemLower),
    'system must require JSON array output',
  );
  assert.ok(
    /260|~260|around 260|at most 260|≤\s*~?260|under 280|≤\s*280/.test(systemLower) ||
      /260|~260|around 260|at most 260|under 280/.test(system),
    'system must guide toward ≤~260 chars per tweet',
  );
});

test('parseLlmTweetList accepts a JSON array of strings', () => {
  const raw = '["First tweet here.", "Second tweet with more."]';
  const tweets = parseLlmTweetList(raw);
  assert.deepEqual(tweets, ['First tweet here.', 'Second tweet with more.']);
});

test('parseLlmTweetList rejects empty array', () => {
  assert.throws(() => parseLlmTweetList('[]'), /empty|no tweets|at least one/i);
});

test('parseLlmTweetList rejects non-array', () => {
  assert.throws(() => parseLlmTweetList('{"not":"array"}'), /array/i);
  assert.throws(() => parseLlmTweetList('"just a string"'), /array/i);
  assert.throws(() => parseLlmTweetList('123'), /array/i);
});

test('parseLlmTweetList rejects non-string elements', () => {
  assert.throws(() => parseLlmTweetList('[1, "two"]'), /string/i);
  assert.throws(() => parseLlmTweetList('["one", null]'), /string/i);
  assert.throws(() => parseLlmTweetList('[true, false]'), /string/i);
});
