import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import type { Config } from './types.ts';

/** xAI chat-completions model id used by grokComplete. */
export const GROK_MODEL = 'grok-4';

export function loadConfig(rootDir: string = process.cwd()): Config {
  const configPath = path.join(rootDir, 'threads', 'config.yml');
  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Missing ${configPath}; draft CLI refuses to run without threads/config.yml`,
    );
  }
  const parsed = YAML.parse(fs.readFileSync(configPath, 'utf8')) as {
    go_live_date?: unknown;
    site_url?: unknown;
  };
  if (parsed.go_live_date == null || parsed.go_live_date === '') {
    throw new Error('threads/config.yml missing go_live_date');
  }
  if (parsed.site_url == null || parsed.site_url === '') {
    throw new Error('threads/config.yml missing site_url');
  }
  return {
    goLiveDate: String(parsed.go_live_date).slice(0, 10),
    siteUrl: String(parsed.site_url).replace(/\/$/, ''),
  };
}
