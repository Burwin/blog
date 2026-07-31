import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grokComplete } from './grok-client.ts';
import { GROK_MODEL } from './config.ts';

test('grokComplete posts to xAI chat completions with model id from config', async () => {
  const system = 'You are a thread writer.';
  const user = 'Write a thread about Trust.';
  const apiKey = 'test-xai-key';
  const assistantContent = '["tweet one","tweet two"]';

  let fetchCalls = 0;
  let receivedUrl: string | URL | Request = '';
  let receivedInit: RequestInit | undefined;

  const fetchMock = async (
    url: string | URL | Request,
    init?: RequestInit,
  ): Promise<Response> => {
    fetchCalls += 1;
    receivedUrl = url;
    receivedInit = init;
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: 'assistant', content: assistantContent } }],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  };

  const result = await grokComplete(system, user, {
    fetch: fetchMock,
    apiKey,
  });

  assert.equal(fetchCalls, 1, 'fetch must be called once');
  assert.equal(String(receivedUrl), 'https://api.x.ai/v1/chat/completions');
  assert.equal(receivedInit?.method ?? 'POST', 'POST');

  const headers = new Headers(receivedInit?.headers);
  assert.equal(headers.get('Authorization'), `Bearer ${apiKey}`);
  assert.match(headers.get('Content-Type') ?? '', /application\/json/);

  const body = JSON.parse(String(receivedInit?.body));
  assert.equal(typeof GROK_MODEL, 'string');
  assert.ok(GROK_MODEL.length > 0, 'GROK_MODEL must be non-empty');
  assert.equal(body.model, GROK_MODEL);
  assert.deepEqual(body.messages, [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ]);

  assert.equal(result, assistantContent);
});
