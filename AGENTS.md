# AGENTS.md

Nuxt 3 + Vue 3 + Tailwind blog, served at mharris.io by **Cloudflare Workers & Pages** (SSR), auto-built from this repo.

## Deploy

- Production branch is **`m`**, not `main`/`master`.
- **Production is Cloudflare Workers & Pages**, connected to this repo: every push to `m` triggers a CF build (config lives in the Cloudflare dashboard, not this repo). mharris.io DNS → Cloudflare proxy → that deployment.
- `.node-version` pins Node 22 for the CF build image. Do not remove it: CF's default is Node 18, which cannot install/build Nuxt ≥3.21 (`nuxt prepare` crashes in postinstall). This froze prod at the 2026-07-23 "Trust" commit until the pin was added.
- There is **no GitHub Actions deploy**. The old `deploy.yml` (GitHub Pages) was removed 2026-07-23: GitHub Pages had long stopped serving mharris.io (DNS moved to Cloudflare; GitHub no longer held a cert for the domain), and its green runs falsely suggested pushes were live. Its `publish_rss` job had also been a silent no-op since March 2024 (`download-artifact@v4` directory-extraction bug). The stale GitHub Pages copy still exists but only redirects; disable Pages in repo settings if it ever confuses.

## Commands

- `npm run dev` / `build` / `generate` — each one prepends `npx tsx compile-md-posts.ts && npx tsx analyze-all-posts.ts` before invoking Nuxt (`build`/`generate` also run `npx tsx generate-rss.ts`). Running `nuxt dev` directly will skip the regeneration step.
- `npx tsx compile-md-posts.ts` — compile `content/posts/*.md` to `pages/posts/*.vue`.
- `npx tsx analyze-all-posts.ts` — regenerate `posts.json` from `pages/posts/*.vue`.
- `npx tsx generate-rss.ts` — regenerate `public/rss.xml` from `posts.json`. Runs as part of `npm run build` / `generate`.
- `npm test` — unit tests for `scripts/x-threads/` only (Node built-in test runner; no network).
- No lint / formatter config. Prettier is suggested in `.devcontainer/devcontainer.json` but unconfigured.

## X threads

Auto-draft / publish blog posts as X threads. Human setup checklist (X app, GitHub secrets, `go_live_date`, smoke): **`scripts/x-threads/README.md`**. Do not enable publish secrets or merge draft YAMLs until that checklist is done — no silent prod tweets.

## Post pipeline

Two authoring formats coexist in this repo. **Prefer Markdown for new posts.**

### Markdown source (preferred for new posts)

Drop a file in `content/posts/<slug>.md` with YAML front-matter:

```markdown
---
date: 2026-05-15
title: Post Title
excerpt: One-line summary shown on the index and in RSS.
---

Body in plain Markdown.
```

`compile-md-posts.ts` writes `pages/posts/<slug>.vue` using the same `<BlogPost>` + `<Elements*>` wrappers used by hand-written posts. Generated files start with `<!-- GENERATED FROM content/posts/<slug>.md — DO NOT EDIT -->` and the compiler **refuses** to overwrite a `.vue` file that lacks that marker (so hand-written posts are safe even if a `.md` with the same slug appears).

`pages/posts/<slug>.vue` is then a normal post: `analyze-all-posts.ts` picks it up and adds it to `posts.json` like any other.

Markdown → component mapping:

| Markdown | Generated tag |
|---|---|
| paragraph | `<ElementsBp>` |
| `## h2` / `### h3` / `#### h4` | `<ElementsBh2/3/4>` |
| `# h1` | **error** — title belongs in front-matter |
| `- bullet` | `<ElementsBul>` / `<ElementsBli>` |
| `1. item` | `<ElementsBol>` / `<ElementsBli>` (chevron bullets, no visible numbering) |
| `[text](url)` | `<ElementsBa href="url">` (plain attribute) |
| `> quote` | `<ElementsBquote>` (no figcaption metadata from plain Markdown) |
| ` ```lang\n…\n``` ` | `<pre class="bg-gray-100 p-4 overflow-auto"><code>…</code></pre>` (matches `<ElementsBcode>` output, no `:code` prop escaping needed) |
| inline `` `code` `` | `<code>` |
| `**bold**` / `_italic_` | `<strong>` / `<em>` |
| `![alt](url)` | `<img src="url" alt="alt">` |
| `---` | `<hr />` |
| raw HTML | passed through (`markdown-it` `html: true`) — escape hatch |

Compiler quirks:

- `{` / `}` in text content are escaped to `&#123;` / `&#125;` so a stray `{{` cannot trigger Vue mustache interpolation. Authors can write `{{ foo }}` in prose or code without breaking the template.
- Front-matter `date` may be either an unquoted `YYYY-MM-DD` (YAML parses it as a JS Date) or a quoted string. The compiler normalizes either to the `"YYYY-MM-DD"` string literal `analyze-all-posts.ts` expects.
- Missing front-matter field logs `Skipping <file>: missing front-matter field(s) ...` to stderr and exits non-zero. CI will fail.

### Hand-written Vue source (legacy, still supported)

The 17 posts that existed before the Markdown pipeline are hand-written `pages/posts/<slug>.vue` files. They keep working unchanged. Use this format only when a post needs something Markdown can't express (e.g., `<ElementsBcode :code="myStringConst">` for syntax-highlighted multi-line code samples, or `<ElementsBquote>` with `name` / `contextText` / `contextUrl` figcaption metadata). `analyze-all-posts.ts` extracts metadata from the `<script setup>` block:

- Pulls the `<script setup>` block from each `pages/posts/*.vue` (so values in the template don't false-match).
- Extracts `date`, `title`, `excerpt` string literals. Accepts `"`, `'`, or `` ` `` quoting, supports backslash escapes, and allows multi-line values inside backticks.
- Captures the **raw** source between the quotes — escape sequences like `\"` or `\n` are **not** decoded. Prefer writing post strings without escapes (use single-quoted around `"..."`, or backticks for multi-line).
- Logs `Skipping <file>: missing field(s) ...` to stderr and exits non-zero if any post is missing one of the three fields.

Do **not** hand-edit `posts.json` — it will be clobbered by the next build.

## Adding a post

1. Create `content/posts/<slug>.md`. The slug becomes the URL and the id.
2. Front-matter: `date: YYYY-MM-DD`, `title: ...`, `excerpt: ...`.
3. Write the body in plain Markdown.
4. Run `npm run dev` (or `npx tsx compile-md-posts.ts && npx tsx analyze-all-posts.ts`).
5. Commit **all three**: the `.md` source, the generated `pages/posts/<slug>.vue`, and the updated `posts.json`.

## Date / timezone quirk

Posts store dates as `"YYYY-MM-DD"` strings. Everywhere they are consumed, they are wrapped in `addHours(new Date(date), 12)` to shift to noon UTC and dodge a UTC→ET off-by-one. This shows up in:

- `analyze-all-posts.ts:55` — bakes `+12h` into the stored `Date` in `posts.json`.
- Every `pages/posts/*.vue` template that does `:date="addHours(new Date(post.date), 12)"`.
- `utils.ts` exports `postDate()` doing the equivalent via `setHours(12)`.

Keep the convention when touching dates.

## Nuxt auto-imports (component naming)

Nuxt 3 auto-imports `components/**` with the directory path prefixed in PascalCase:

- `components/elements/bp.vue` → `<ElementsBp>` (the lowercase `b` prefix on element files is "blog"; they are styled wrappers around `<p>`, `<ul>`, `<li>`, `<a>`, etc.)
- `components/elements/BFigureFullWidthImage.vue` → `<ElementsBFigureFullWidthImage>`
- `components/svg/GitHubLogo.vue` → `<SvgGitHubLogo>`
- `components/BlogPost.vue` → `<BlogPost>`

`components/elements/index.ts` is a manual re-export and is **not** what Nuxt uses — auto-import resolves files directly. Edit a component, not the index.

## Layout

- `pages/index.vue` reads `posts.json` and renders `<BlogList>`.
- `pages/posts/<slug>.vue` is one file per post, self-contained (date/title/excerpt + body markup using `<BlogPost>` and `<Elements*>` wrappers).
- `app.vue` registers SEO meta, RSS link, favicons.
- `server/` only contains a tsconfig stub; there is no Nitro server code.
