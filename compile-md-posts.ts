import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const SRC = "./content/posts";
const DEST = "./pages/posts";
const MARKER_PREFIX = "<!-- GENERATED FROM content/posts/";

// ---- Markdown renderer ----------------------------------------------------
//
// We override markdown-it's HTML output so the generated Vue template uses the
// existing <Elements*> styled wrappers instead of bare <p>, <ul>, <h2>, etc.
// See AGENTS.md "Markdown to component mapping" for the full table.
//
// Vue interprets `{{ ... }}` in templates as mustache interpolation. To let
// posts include literal curly braces (e.g., code samples), we escape `{` and
// `}` in every token that produces text-like output.

const md = new MarkdownIt({ html: true, linkify: false, typographer: false });

const escapeCurly = (s: string) => s.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const escapeAttr = (s: string) => escapeHtml(s);
const escapeTextForTemplate = (s: string) => escapeCurly(escapeHtml(s));

// In a "tight" list (no blank lines between items), markdown-it marks paragraph
// tokens as hidden so the default renderer suppresses them. Honor that so list
// items don't gain spurious <ElementsBp> wrappers (which would inject mt-8).
md.renderer.rules.paragraph_open = (tokens, idx) =>
  tokens[idx].hidden ? "" : "<ElementsBp>";
md.renderer.rules.paragraph_close = (tokens, idx) =>
  tokens[idx].hidden ? "" : "</ElementsBp>";

md.renderer.rules.bullet_list_open = () => "<ElementsBul>";
md.renderer.rules.bullet_list_close = () => "</ElementsBul>";

md.renderer.rules.ordered_list_open = () => "<ElementsBol>";
md.renderer.rules.ordered_list_close = () => "</ElementsBol>";

md.renderer.rules.list_item_open = () => "<ElementsBli>";
md.renderer.rules.list_item_close = () => "</ElementsBli>";

md.renderer.rules.blockquote_open = () => "<ElementsBquote>";
md.renderer.rules.blockquote_close = () => "</ElementsBquote>";

md.renderer.rules.heading_open = (tokens, idx) => {
  const level = parseInt(tokens[idx].tag.slice(1), 10);
  if (level === 1) {
    throw new Error(
      "h1 (`# ...`) is not allowed in post body. The title goes in front-matter.",
    );
  }
  if (level >= 2 && level <= 4) return `<ElementsBh${level}>`;
  return `<${tokens[idx].tag}>`;
};
md.renderer.rules.heading_close = (tokens, idx) => {
  const level = parseInt(tokens[idx].tag.slice(1), 10);
  if (level >= 2 && level <= 4) return `</ElementsBh${level}>`;
  return `</${tokens[idx].tag}>`;
};

md.renderer.rules.link_open = (tokens, idx) => {
  const href = tokens[idx].attrGet("href") ?? "";
  return `<ElementsBa href="${escapeAttr(href)}">`;
};
md.renderer.rules.link_close = () => "</ElementsBa>";

md.renderer.rules.fence = (tokens, idx) => {
  const content = escapeTextForTemplate(tokens[idx].content);
  return `<pre class="bg-gray-100 p-4 overflow-auto"><code>${content}</code></pre>`;
};
md.renderer.rules.code_block = md.renderer.rules.fence;
md.renderer.rules.code_inline = (tokens, idx) =>
  `<code>${escapeTextForTemplate(tokens[idx].content)}</code>`;

md.renderer.rules.text = (tokens, idx) =>
  escapeTextForTemplate(tokens[idx].content);

// html_block / html_inline default renderers pass content through verbatim,
// which is the documented escape hatch. We still need to escape curly braces
// so a stray `{{` in raw HTML doesn't break Vue compilation.
const passthroughCurly = (tokens: any[], idx: number) => escapeCurly(tokens[idx].content);
md.renderer.rules.html_block = passthroughCurly;
md.renderer.rules.html_inline = passthroughCurly;

// ---- Helpers --------------------------------------------------------------

function toYmd(d: unknown): string | null {
  if (d instanceof Date && !isNaN(d.getTime())) {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d.trim())) {
    return d.trim();
  }
  return null;
}

function jsStringLiteral(s: string): string {
  // JSON.stringify produces a JS-compatible double-quoted literal with all the
  // right escapes for backslash, quote, and control chars.
  return JSON.stringify(s);
}

function indentBody(body: string): string {
  return body
    .split("\n")
    .map((line) => (line.length ? `    ${line}` : line))
    .join("\n");
}

function renderVueTemplate(
  slug: string,
  meta: { date: string; title: string; excerpt: string },
  body: string,
): string {
  return `${MARKER_PREFIX}${slug}.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: ${jsStringLiteral(meta.date)},
  title: ${jsStringLiteral(meta.title)},
  excerpt: ${jsStringLiteral(meta.excerpt)},
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
${indentBody(body.trimEnd())}
  </BlogPost>
</template>
`;
}

// ---- Main -----------------------------------------------------------------

if (!fs.existsSync(SRC)) {
  // No markdown sources yet; nothing to do.
  process.exit(0);
}

if (!fs.existsSync(DEST)) fs.mkdirSync(DEST, { recursive: true });

const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".md"));
let hadErrors = false;
let written = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const srcPath = path.join(SRC, file);
  const destPath = path.join(DEST, `${slug}.vue`);
  const raw = fs.readFileSync(srcPath, "utf8");

  let parsed;
  try {
    parsed = matter(raw);
  } catch (err) {
    console.error(`Failed to parse front-matter in ${file}: ${(err as Error).message}`);
    hadErrors = true;
    continue;
  }

  const date = toYmd(parsed.data.date);
  const title = typeof parsed.data.title === "string" ? parsed.data.title : null;
  const excerpt = typeof parsed.data.excerpt === "string" ? parsed.data.excerpt : null;

  const missing: string[] = [];
  if (!date) missing.push("date (YYYY-MM-DD)");
  if (!title) missing.push("title");
  if (!excerpt) missing.push("excerpt");
  if (missing.length) {
    console.error(`Skipping ${file}: missing front-matter field(s) ${missing.join(", ")}`);
    hadErrors = true;
    continue;
  }

  if (fs.existsSync(destPath)) {
    const existing = fs.readFileSync(destPath, "utf8");
    if (!existing.startsWith(MARKER_PREFIX)) {
      console.error(
        `Refusing to overwrite hand-written ${destPath}. Rename the .md or the .vue to resolve.`,
      );
      hadErrors = true;
      continue;
    }
  }

  let body: string;
  try {
    body = md.render(parsed.content);
  } catch (err) {
    console.error(`Failed to render ${file}: ${(err as Error).message}`);
    hadErrors = true;
    continue;
  }

  const vue = renderVueTemplate(slug, { date: date!, title: title!, excerpt: excerpt! }, body);
  fs.writeFileSync(destPath, vue, "utf8");
  written++;
}

console.log(`Compiled ${written} markdown post(s) to ${DEST}.`);
if (hadErrors) process.exitCode = 1;
