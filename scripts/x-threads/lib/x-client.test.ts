import { test } from 'node:test';
import assert from 'node:assert/strict';
import { postThread } from './x-client.ts';

test('postThread sends N tweets in order; each after the first replies to previous id; returns ids', async () => {
  const tweets = ['first tweet', 'second tweet', 'third tweet'];
  const responseIds = ['100', '200', '300'];

  const calls: Array<{ url: string; body: unknown }> = [];
  let callIndex = 0;

  const fetchMock = async (
    url: string | URL | Request,
    init?: RequestInit,
  ): Promise<Response> => {
    const body = JSON.parse(String(init?.body));
    calls.push({ url: String(url), body });
    const id = responseIds[callIndex]!;
    callIndex += 1;
    return new Response(JSON.stringify({ data: { id } }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const auth = {
    apiKey: 'consumer-key',
    apiSecret: 'consumer-secret',
    accessToken: 'access-token',
    accessTokenSecret: 'access-token-secret',
  };

  const ids = await postThread(tweets, { fetch: fetchMock, auth });

  assert.equal(calls.length, 3);
  assert.deepEqual(ids, responseIds);

  for (const call of calls) {
    assert.equal(call.url, 'https://api.x.com/2/tweets');
  }

  assert.deepEqual(calls[0]!.body, { text: 'first tweet' });
  assert.deepEqual(calls[1]!.body, {
    text: 'second tweet',
    reply: { in_reply_to_tweet_id: '100' },
  });
  assert.deepEqual(calls[2]!.body, {
    text: 'third tweet',
    reply: { in_reply_to_tweet_id: '200' },
  });
});
