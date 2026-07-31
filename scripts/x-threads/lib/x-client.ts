import { createHmac, randomBytes } from 'node:crypto';

const TWEETS_URL = 'https://api.x.com/2/tweets';

export type XAuth = {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
};

export type PostThreadDeps = {
  fetch?: typeof globalThis.fetch;
  auth: XAuth;
};

function percentEncode(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function oauthHeader(method: string, url: string, auth: XAuth): string {
  const oauth: Record<string, string> = {
    oauth_consumer_key: auth.apiKey,
    oauth_nonce: randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: auth.accessToken,
    oauth_version: '1.0',
  };

  const paramString = Object.keys(oauth)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(oauth[k]!)}`)
    .join('&');

  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(paramString),
  ].join('&');

  const signingKey = `${percentEncode(auth.apiSecret)}&${percentEncode(auth.accessTokenSecret)}`;
  oauth.oauth_signature = createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');

  const header =
    'OAuth ' +
    Object.keys(oauth)
      .sort()
      .map((k) => `${percentEncode(k)}="${percentEncode(oauth[k]!)}"`)
      .join(', ');

  return header;
}

export async function postThread(
  tweets: string[],
  deps: PostThreadDeps,
): Promise<string[]> {
  const fetchFn = deps.fetch ?? globalThis.fetch;
  const ids: string[] = [];

  for (let i = 0; i < tweets.length; i++) {
    const body: {
      text: string;
      reply?: { in_reply_to_tweet_id: string };
    } = { text: tweets[i]! };

    if (i > 0) {
      body.reply = { in_reply_to_tweet_id: ids[i - 1]! };
    }

    const res = await fetchFn(TWEETS_URL, {
      method: 'POST',
      headers: {
        Authorization: oauthHeader('POST', TWEETS_URL, deps.auth),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as { data?: { id?: string } };
    const id = data.data?.id;
    if (!id) {
      throw new Error(
        `X API post failed (status ${res.status}): missing data.id`,
      );
    }
    ids.push(id);
  }

  return ids;
}
