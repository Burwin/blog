# Blog posts → X threads (MASTER-1926)

Status: implemented — human go-live checklist pending (see `scripts/x-threads/README.md`).

Asana: MASTER-1926 — "Automatically convert my blog posts into twitter threads and linkedin posts"
(https://app.asana.com/1/1203819684139908/project/1204506183888935/task/1217019063779866)
GID `1217019063779866`

## Goal

Within a couple hours of publishing a new post to mharris.io, automatically
draft an X thread from the post’s own wording, open a PR with a YAML draft for
human review, and on merge publish the thread via X’s pay-per-use API, then
commit the real tweet IDs back into the YAML.

## Scope

**In**

- Detect new posts on push to production branch `m` (plus `workflow_dispatch`)
- LLM draft via **xAI Grok** (near-verbatim, engaging thread)
- PR review surface: `threads/<slug>.yml`
- On merge → post thread via **direct X API** → enrich YAML with tweet IDs
- Skip posts before go-live date; skip if `threads/<slug>.yml` already exists
- Last tweet is always the blog post URL

**Out**

- LinkedIn (follow-up card)
- RSS polling
- OpenTweet / Typefully / other third-party posters
- Backfill of the existing post archive
- Editing blog post content itself

## Decisions (locked from task review)

1. **X only for v1** — LinkedIn later.
2. **Home: this repo** (`Burwin/blog`) — `threads/`, `scripts/x-threads/`,
   `.github/workflows/`. Prod branch is **`m`** (not `main`/`master`).
3. **Detection: push to `m`** touching post sources / `posts.json`, plus
   manual `workflow_dispatch`. No RSS cron.
4. **Old posts:** only `date >= go-live`; existing `threads/<slug>.yml` =
   already handled (draft or published).
5. **Posting: direct X pay-per-use API.**
6. **LLM: xAI Grok** (`XAI_API_KEY`).
7. **X credentials:** account exists; developer app + secrets still to create.
   Draft→PR can ship before publish path is unblocked.
8. **Draft format:**

```yaml
slug: trust
url: https://mharris.io/posts/trust
title: Trust
status: draft   # draft | published
tweets:
  - text: "..."
  # after publish:
  # - text: "..."
  #   id: "1234567890"
```

## Design

### Layout

```
scripts/x-threads/
  package is the blog root (Node 22, tsx) — no nested package.json unless needed
  lib/
    types.ts              # ThreadDoc, Tweet, PostMeta, Config
    config.ts             # load go-live date + paths
    thread-yaml.ts        # parse / serialize / validate
    select-posts.ts       # eligible posts from posts.json + threads/
    load-post-body.ts     # content/posts/<slug>.md (gray-matter) preferred
    prompt.ts             # build Grok prompt from post + system instructions
    grok-client.ts        # xAI chat completions (injectable fetch)
    draft.ts              # load → prompt → grok → ThreadDoc
    x-client.ts           # post thread via X API v2 (injectable fetch)
    publish.ts            # load yaml → post → enrich → write
    fs-io.ts              # read/write threads/, posts.json helpers
  bin/
    draft.ts              # CLI entry for GH Action (draft + write yaml files)
    publish.ts            # CLI entry for GH Action (publish changed yaml)
  prompts/
    thread.txt            # system/user prompt template
threads/
  .gitkeep
  config.yml              # go_live_date: YYYY-MM-DD
  <slug>.yml              # per-post drafts (created by automation)
.github/workflows/
  x-thread-draft.yml      # push to m + workflow_dispatch → draft PR
  x-thread-publish.yml    # PR merged to m touching threads/** → post + enrich commit
```

### Test harness

Repo currently has **no tests**. Add:

- `npm test` → `node --import tsx --test scripts/x-threads/**/*.test.ts`
- Node 22 built-in test runner (`node:test` + `node:assert/strict`)
- Deps: `yaml` (parse/serialize drafts). `gray-matter` already present for MD.
- Pure logic takes injected `fetch` / filesystem facades so unit tests never
  hit live X, xAI, or the network.

### Core pure APIs

```ts
// thread-yaml.ts
parseThreadYaml(raw: string): ThreadDoc
serializeThreadYaml(doc: ThreadDoc): string
validateThread(doc: ThreadDoc): string[]   // human-readable issues

// select-posts.ts
selectEligiblePosts(posts: PostMeta[], existingSlugs: Set<string>, goLive: string): PostMeta[]

// load-post-body.ts
loadPostBody(slug: string, rootDir: string): string | null  // md body or null

// prompt.ts
buildThreadPrompt(input: { title: string; body: string; url: string }): { system: string; user: string }

// draft.ts
draftThread(input, deps: { complete: (sys, user) => Promise<string> }): Promise<ThreadDoc>

// x-client.ts
postThread(tweets: string[], deps: { fetch; auth }): Promise<string[]>  // ids in order

// publish.ts
publishThreadFile(path: string, deps): Promise<ThreadDoc>  // posts + writes ids
```

### Workflows

**Draft (`x-thread-draft.yml`)**

- `on.push.branches: [m]` with `paths:` `posts.json`, `content/posts/**`,
  `pages/posts/**`
- `on.workflow_dispatch` (optional inputs later)
- Steps: checkout → setup Node 22 → `npm ci` →
  `npx tsx scripts/x-threads/bin/draft.ts` → if new `threads/*.yml`,
  open PR via `peter-evans/create-pull-request` (branch
  `x-thread/<slug>`, title `X thread draft: <title>`)
- Secrets: `XAI_API_KEY`. Needs `contents: write` + `pull-requests: write`.

**Publish (`x-thread-publish.yml`)**

- `on.pull_request` types `[closed]` branches `[m]`,
  `if: merged && paths include threads/**`
- Or simpler: on push to `m` with `paths: threads/**` and only process files
  whose `status: draft` (idempotent; already-published skipped)
- Prefer **push to `m` paths `threads/**`**: merge already landed; no need to
  reconstruct PR file list. Skip docs-only / config-only changes.
- Steps: checkout → Node → `npx tsx scripts/x-threads/bin/publish.ts` →
  commit enriched YAML back to `m` (or open follow-up commit on same branch)
- Secrets: X OAuth user-context creds (API key/secret + access token/secret)
  for pay-per-use posting.

### Go-live

`threads/config.yml`:

```yaml
go_live_date: "2026-07-31"   # set on first enable; no archive backfill
site_url: "https://mharris.io"
```

Change only deliberately. Draft CLI refuses to run without it.

### Post body source

1. Prefer `content/posts/<slug>.md` (strip front-matter via `gray-matter`).
2. If missing (legacy hand-written Vue-only posts): **skip with a clear log**
   for v1 — those predate go-live anyway. Do not scrape live HTML in v1
   unless a RED step later requires it.

### X API (v1 assumption)

- User-context OAuth 1.0a against X API v2 `POST /2/tweets`
- Thread = first tweet, then each subsequent with `reply.in_reply_to_tweet_id`
  = previous id
- Exact auth helper can use a thin signed-request implementation or a small
  maintained client — decide in the GREEN step for `x-client` (prefer minimal
  deps; `oauth-1.0a` + `crypto` is fine if needed)

### Secrets (GitHub Actions)

| Secret | Used by | Notes |
|--------|---------|--------|
| `XAI_API_KEY` | draft | xAI Grok |
| `X_API_KEY` | publish | Consumer key |
| `X_API_SECRET` | publish | Consumer secret |
| `X_ACCESS_TOKEN` | publish | User access token |
| `X_ACCESS_TOKEN_SECRET` | publish | User access secret |

Draft workflow ships without X secrets. Publish workflow no-ops or fails
loudly until they exist.

## TDD implementation order

Conventions:

- Each step is **one test OR one implementation move** — never both.
- RED = failing test. GREEN = minimal pass. REFACTOR = suite stays green.
- When a step completes, post the **next** step’s trigger verbatim.
- Trigger shape (see `@rules/plans.md`):

  > ▶️ Step `N` of 42 — `<kind>: <title>` — model: `<tier>` — plan:
  > `docs/plans/blog-x-threads/PLAN.md`

### Phase A — Harness + thread YAML (shippable: validated schema)

| # | Kind | Step | Model |
|---|------|------|-------|
| 1 | setup | Scaffold `scripts/x-threads/{lib,bin,prompts}/`, `threads/.gitkeep`, `threads/config.yml` stub; add `yaml` dep; add `npm test` script (`node --import tsx --test 'scripts/x-threads/**/*.test.ts'`); empty `thread-yaml.test.ts` importing stubs; confirm suite runs 0 tests. | Grok Build 0.1 |
| 2 | RED | `validateThread` flags missing `slug`, `url`, `status`, or empty `tweets`. | Grok Build 0.1 |
| 3 | GREEN | Implement `validateThread` required-field checks. | Grok Build 0.1 |
| 4 | RED | `validateThread` flags `status` not in `draft\|published`. | Grok Build 0.1 |
| 5 | GREEN | Status enum rule. | Grok Build 0.1 |
| 6 | RED | `validateThread` flags when last tweet `text` ≠ `doc.url`. | Grok Build 0.1 |
| 7 | GREEN | Last-tweet-is-url rule. | Grok Build 0.1 |
| 8 | RED | `parseThreadYaml` / `serializeThreadYaml` round-trip preserves slug, url, title, status, tweet texts (+ optional ids). | Grok Build 0.1 |
| 9 | GREEN | Implement parse/serialize via `yaml`. | Grok Build 0.1 |
| 10 | REFACTOR | Types in `types.ts`; keep suite green; happy-path fixture test (zero issues). | Grok Build 0.1 |

### Phase B — Eligible posts (shippable: selection pure fn)

| # | Kind | Step | Model |
|---|------|------|-------|
| 11 | RED | `selectEligiblePosts` returns `[]` when every post `date` is before `goLive`. | Grok Build 0.1 |
| 12 | GREEN | Date cutoff (compare `YYYY-MM-DD` calendar dates, ignore time). | Grok Build 0.1 |
| 13 | RED | Skips posts whose `id` is in `existingSlugs` even if on/after go-live. | Grok Build 0.1 |
| 14 | GREEN | Existing-slug filter. | Grok Build 0.1 |
| 15 | RED | Includes on/after go-live posts not in `existingSlugs` (stable order by date asc). | Grok Build 0.1 |
| 16 | GREEN | Happy-path selection + ordering. | Grok Build 0.1 |

### Phase C — Load body + prompt + draft (shippable: draftThread with mock LLM)

| # | Kind | Step | Model |
|---|------|------|-------|
| 17 | RED | `loadPostBody` returns markdown body without front-matter for a temp `content/posts/<slug>.md`. | Grok Build 0.1 |
| 18 | GREEN | Implement with `gray-matter` + `fs`. | Grok Build 0.1 |
| 19 | RED | `loadPostBody` returns `null` when file missing (no throw). | Grok Build 0.1 |
| 20 | GREEN | Missing-file path. | Grok Build 0.1 |
| 21 | RED | `buildThreadPrompt` user message includes title, body, url; system text requires near-verbatim wording, engaging hook, JSON array output, ≤~260 chars guidance. | Opus 4.8 |
| 22 | GREEN | Implement `prompt.ts` reading `prompts/thread.txt` placeholders. | Opus 4.8 |
| 23 | RED | `parseLlmTweetList` accepts a JSON array of strings; rejects empty / non-array / non-strings. | Grok Build 0.1 |
| 24 | GREEN | Implement parser (tolerate optional markdown fences). | Grok Build 0.1 |
| 25 | RED | `draftThread` calls `complete(system,user)`, builds `ThreadDoc` with `status: draft`, appends `url` as final tweet if model omitted it, runs `validateThread` (0 issues). | GLM 5.2 |
| 26 | GREEN | Implement `draft.ts` orchestration. | GLM 5.2 |
| 27 | RED | `grokComplete` posts to xAI chat completions with model id from config; test with mock `fetch` (no network). | GLM 5.2 |
| 28 | GREEN | Implement `grok-client.ts`. | GLM 5.2 |

### Phase D — Draft CLI + filesystem IO (shippable: local `bin/draft.ts`)

| # | Kind | Step | Model |
|---|------|------|-------|
| 29 | RED | `listExistingThreadSlugs(threadsDir)` returns slug set from `*.yml` basenames. | Grok Build 0.1 |
| 30 | GREEN | Implement listing (ignore `config.yml`). | Grok Build 0.1 |
| 31 | RED | `writeThreadDoc` writes `threads/<slug>.yml` via serialize. | Grok Build 0.1 |
| 32 | GREEN | Implement write. | Grok Build 0.1 |
| 33 | RED | `runDraft` for one eligible post: load body → draftThread → write; skips null body; returns written paths. Mock `complete`. | GLM 5.2 |
| 34 | GREEN | Implement `runDraft` + `bin/draft.ts` (load `posts.json`, config, env `XAI_API_KEY`). | GLM 5.2 |

### Phase E — X post + publish + enrich (shippable: local `bin/publish.ts`)

| # | Kind | Step | Model |
|---|------|------|-------|
| 35 | RED | `postThread` sends N tweets in order; each after the first replies to previous id; returns ids; mock `fetch`. | GLM 5.2 |
| 36 | GREEN | Implement `x-client.ts` (OAuth1 user context). | GLM 5.2 |
| 37 | RED | `enrichThread` sets each `tweets[i].id`, sets `status: published`. | Grok Build 0.1 |
| 38 | GREEN | Implement enrich helper. | Grok Build 0.1 |
| 39 | RED | `runPublish` no-ops when `status === published`; otherwise postThread + write enriched yaml. | GLM 5.2 |
| 40 | GREEN | Implement `runPublish` + `bin/publish.ts`. | GLM 5.2 |

### Phase F — GitHub Actions + human setup (shippable: end-to-end on `m`)

| # | Kind | Step | Model |
|---|------|------|-------|
| 41 | setup | Author `x-thread-draft.yml` and `x-thread-publish.yml` (branch `m`, path filters, permissions, create-pull-request / commit-enriched). Dry-run locally with `act` only if available — otherwise validate YAML structure by review. | Opus 4.8 |
| 42 | setup | Human checklist in `scripts/x-threads/README.md`: create X developer app (pay-per-use), generate user tokens, add all five GitHub secrets, set `go_live_date`, enable Actions. Smoke: `workflow_dispatch` draft on a throwaway post or fixture. Wire AGENTS.md one-liner pointing at the README. Stop — no silent prod tweets without human confirmation of secrets. | Opus 4.8 |

## Testing strategy

- **Unit-first** on pure functions (`validate`, `select`, `parse`, `draft` with
  mock LLM, `postThread` with mock fetch).
- **No live network in CI** — Actions integration is manual smoke after secrets.
- Run: `npm test` from repo root.
- Blog still has no lint/formatter; do not add unless needed for the scripts.

## Risks & gotchas

- **Prod branch is `m`** — every workflow `branches:` filter must use `m`.
- **Grok brainstorm on the Asana card contradicts AC** (OpenTweet, JSON/md) —
  ignore card appendix; follow this plan + AC.
- **X API pay-per-use + OAuth** is fiddly; budget time in step 42; draft path
  must work with only `XAI_API_KEY`.
- **Premium character limits** — soft target ~260; validation should **warn**
  in logs, not fail the draft (AC allows over 280).
- **create-pull-request** needs a token that can open PRs; default
  `GITHUB_TOKEN` usually fine with `pull-requests: write`.
- **Publish commit-back** can retrigger path filters — `runPublish` must
  skip `status: published` to avoid loops.
- **Hand-written Vue-only posts** without `content/posts/*.md` are skipped in
  v1 (acceptable under go-live cutoff).
- **No tests in repo today** — introducing `npm test` is intentional and
  scoped to `scripts/x-threads/`.

## Progress

- [x] Phase A (steps 1–10) — YAML schema
- [x] Phase B (steps 11–16) — selection
- [x] Phase C (steps 17–28) — draft generation
- [x] Phase D (steps 29–34) — draft CLI
- [x] Phase E (steps 35–40) — publish path
- [x] Phase F (steps 41–42) — Actions + secrets + smoke

**Plan complete (code).** Remaining work is human-only: X developer app,
five GitHub secrets, confirm `go_live_date`, draft smoke via
`workflow_dispatch`, then first deliberate publish. Follow
`scripts/x-threads/README.md`. Do not silently tweet to prod.

## References

- Asana MASTER-1926 (acceptance criteria in task notes)
- Task review comment on the card (decisions 1–8)
- `AGENTS.md` — branch `m`, post pipeline, Cloudflare deploy (no GH Pages)
- `posts.json` / `content/posts/*.md` / `generate-rss.ts`
- X API v2 tweets:
  https://developer.x.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets
- xAI API docs (Grok chat completions)

---

## Kickoff

Copy-paste into a fresh session:

▶️ Step 1 of 42 — setup: Scaffold x-threads harness + npm test — model: Grok Build 0.1 — plan: `docs/plans/blog-x-threads/PLAN.md`
