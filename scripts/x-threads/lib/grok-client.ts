import { GROK_MODEL } from './config.ts';

const XAI_CHAT_COMPLETIONS_URL = 'https://api.x.ai/v1/chat/completions';

export type GrokCompleteDeps = {
  fetch?: typeof globalThis.fetch;
  apiKey: string;
};

export async function grokComplete(
  system: string,
  user: string,
  deps: GrokCompleteDeps,
): Promise<string> {
  const fetchFn = deps.fetch ?? globalThis.fetch;
  const res = await fetchFn(XAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${deps.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROK_MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content ?? '';
}
