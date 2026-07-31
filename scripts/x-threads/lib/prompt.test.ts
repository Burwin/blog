import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildThreadPrompt, parseLlmTweetList } from './prompt.ts';

test('buildThreadPrompt user includes title/body/url; system requires single verbatim tweet + JSON array', () => {
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
    /verbatim|own wording|post'?s (own )?wording|own words/.test(systemLower),
    'system must require verbatim wording',
  );
  assert.ok(
    /single tweet|exactly one tweet|one tweet/.test(systemLower),
    'system must require a single tweet',
  );
  assert.ok(
    /json\s*array|array of (json\s*)?strings|json/.test(systemLower),
    'system must require JSON array output',
  );
  assert.ok(
    !/\bengaging\b|≤\s*~?260|~260|under 280|soft target/.test(systemLower),
    'system must not require engaging hook or soft char limit',
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
