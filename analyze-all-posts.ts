import fs from "fs";
import path from "path";
import type { Post } from "./post";
import { addHours } from "date-fns";

const POSTS_DIR = "./pages/posts";
const OUTPUT = "posts.json";

// Pull out only the <script setup> block so values in template/body don't false-match.
function extractScript(content: string): string {
  const m = content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
  return m ? m[1] : content;
}

// Extract a string literal assigned to `key` in a TS object literal.
// Accepts ", ', or ` as quote; supports backslash escapes and multi-line values.
function extractStringField(source: string, key: string): string | null {
  const re = new RegExp(
    `\\b${key}\\s*:\\s*(["'\`])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`,
  );
  const m = source.match(re);
  return m ? m[2] : null;
}

const files = fs.readdirSync(POSTS_DIR);
const posts: Post[] = [];
let hadErrors = false;

for (const file of files) {
  if (!file.endsWith(".vue")) continue;

  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, "utf8");
  const script = extractScript(content);

  const date = extractStringField(script, "date");
  const title = extractStringField(script, "title");
  const excerpt = extractStringField(script, "excerpt");

  const missing: string[] = [];
  if (!date) missing.push("date");
  if (!title) missing.push("title");
  if (!excerpt) missing.push("excerpt");

  if (missing.length > 0) {
    console.error(
      `Skipping ${file}: missing field(s) ${missing.join(", ")}`,
    );
    hadErrors = true;
    continue;
  }

  posts.push({
    // Add 12 hours to the date to avoid annoying UTC to EST issue
    date: addHours(new Date(date!), 12),
    title: title!,
    description: excerpt!,
    href: `posts/${file.replace(/\.vue$/, "")}`,
    id: file.replace(/\.vue$/, ""),
  });
}

// sort posts by date descending
posts.sort((a, b) => b.date.getTime() - a.date.getTime());

fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2), "utf8");
console.log(`Posts metadata has been written to ${OUTPUT} (${posts.length} posts).`);

if (hadErrors) process.exitCode = 1;
