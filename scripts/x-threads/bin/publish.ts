import path from 'node:path';
import { runPublish } from '../lib/publish.ts';
import { postThread, type XAuth } from '../lib/x-client.ts';

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`${name} is required`);
    process.exit(1);
  }
  return v;
}

async function main(): Promise<void> {
  const auth: XAuth = {
    apiKey: requireEnv('X_API_KEY'),
    apiSecret: requireEnv('X_API_SECRET'),
    accessToken: requireEnv('X_ACCESS_TOKEN'),
    accessTokenSecret: requireEnv('X_ACCESS_TOKEN_SECRET'),
  };

  const rootDir = process.cwd();
  const written = await runPublish(
    { threadsDir: path.join(rootDir, 'threads') },
    {
      postThread: (tweets) => postThread(tweets, { auth }),
    },
  );

  if (written.length === 0) {
    console.log('No draft threads to publish.');
  } else {
    console.log(`Published ${written.length} thread(s):`);
    for (const p of written) console.log(`  ${p}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
