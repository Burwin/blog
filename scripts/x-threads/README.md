# X threads from blog posts

## TL;DR

After you publish a post on branch `m`, Actions drafts an X thread into
`threads/<slug>.yml`, opens a PR for review, and **on merge** posts the
thread via the X API, then commits tweet IDs back into the YAML.

**Do not enable the publish path until all secrets are set and you have
confirmed a dry draft smoke.** Nothing in this repo should silently tweet
to production without that human gate.

| Path | Trigger | Secrets | Posts to X? |
|------|---------|---------|-------------|
| Draft | push to `m` (post paths) or `workflow_dispatch` | `XAI_API_KEY` | No |
| Publish | push to `m` touching `threads/**` (not config) | four `X_*` OAuth secrets | **Yes** |

## Prerequisites

- GitHub repo with Actions enabled; production branch is **`m`**
- xAI API key (Grok chat completions)
- X developer app on **pay-per-use** with user-context OAuth 1.0a
- Local: Node 22 (see `.node-version`), `npm ci`, `npm test`

## Steps (human setup checklist)

### 1. Create the X developer app

1. Open [X Developer Portal](https://developer.x.com/) → create or select a
   project/app tied to the account that will post.
2. Choose **pay-per-use** (not a legacy free tier that cannot write tweets).
3. App permissions: **Read and write** (tweet create).
4. Note **API Key** and **API Key Secret** (consumer key/secret).

### 2. Generate user access tokens

1. In the same app, generate **Access Token** and **Access Token Secret**
   for the posting user (user-context OAuth 1.0a).
2. Confirm the tokens are for the intended @handle.
3. Store all four values somewhere safe offline; they are not in git.

### 3. Add GitHub Actions secrets

Repo → **Settings → Secrets and variables → Actions**. Add:

| Secret | Used by | Value |
|--------|---------|--------|
| `XAI_API_KEY` | draft workflow | xAI API key |
| `X_API_KEY` | publish | X consumer key |
| `X_API_SECRET` | publish | X consumer secret |
| `X_ACCESS_TOKEN` | publish | User access token |
| `X_ACCESS_TOKEN_SECRET` | publish | User access token secret |

Draft can ship with only `XAI_API_KEY`. Publish **will fail loudly** until
all four `X_*` secrets exist — that is intentional.

### 4. Set `go_live_date`

Edit `threads/config.yml`:

```yaml
go_live_date: "YYYY-MM-DD"   # only posts on/after this date are drafted
site_url: "https://mharris.io"
```

- Change only deliberately. No archive backfill.
- Draft CLI refuses to run if this file or `go_live_date` is missing.
- Stub in-repo is `"2026-07-31"` — bump if you enable later.

### 5. Enable / verify Actions

1. Confirm Actions are allowed for the repo.
2. Workflows live at:
   - `.github/workflows/x-thread-draft.yml`
   - `.github/workflows/x-thread-publish.yml`
3. Both target branch **`m`** only.

### 6. Smoke: draft only (no tweets)

**Do this before any merge of a `status: draft` thread to `m`.**

1. Confirm `XAI_API_KEY` is set; leave publish alone or ensure no draft
   YAMLs will merge yet.
2. Either:
   - **Actions UI:** run **X thread draft** → `workflow_dispatch`, or
   - **Local:**  
     `XAI_API_KEY=… npx tsx scripts/x-threads/bin/draft.ts`  
     (needs eligible posts: `date >= go_live_date`, Markdown body in
     `content/posts/<slug>.md`, no existing `threads/<slug>.yml`).
3. Expect a PR `X thread draft: …` with `threads/<slug>.yml`, or a log
   line `No new thread drafts to write.`
4. Review YAML; edit tweet text if needed. Last tweet must equal the
   post URL (`validateThread`).

### 7. First live publish (explicit human confirmation)

Only after secrets + draft smoke look good:

1. Merge the draft PR into **`m`** (or push a reviewed `status: draft`
   file under `threads/`).
2. **X thread publish** runs, posts the thread, commits enrich with
   tweet `id`s and `status: published` (`[skip x-thread-publish]` in the
   commit message avoids loops).
3. Verify the live thread on X and the committed YAML.

**Stop here until you intentionally want production tweets.**

### 8. Day-to-day

1. Publish a post as usual (Markdown → commit on `m` including
   `posts.json`).
2. Review the auto draft PR; merge when happy.
3. Publish workflow posts; no manual CLI required.

## Local commands

```bash
npm test                                          # unit suite (no network)
XAI_API_KEY=… npx tsx scripts/x-threads/bin/draft.ts
# publish — live tweets; only with real creds and intent:
X_API_KEY=… X_API_SECRET=… X_ACCESS_TOKEN=… X_ACCESS_TOKEN_SECRET=… \
  npx tsx scripts/x-threads/bin/publish.ts
```

## Reference

### Layout

```
scripts/x-threads/
  bin/draft.ts          # GH Action + local draft entry
  bin/publish.ts        # GH Action + local publish entry
  lib/                  # pure-ish modules + *.test.ts
  prompts/thread.txt    # Grok system/user template
threads/
  config.yml            # go_live_date, site_url
  <slug>.yml            # per-post draft / published record
.github/workflows/
  x-thread-draft.yml
  x-thread-publish.yml
```

### Draft YAML shape

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

Rules (`lib/thread-yaml.ts`): required fields; `status` enum; **last
tweet text must equal `url`**.

### Eligibility

`selectEligiblePosts` (`lib/select-posts.ts`):

- `post.date >= go_live_date` (calendar `YYYY-MM-DD`)
- no existing `threads/<slug>.yml` (basename; ignores `config.yml`)
- body from `content/posts/<slug>.md` only; Vue-only legacy posts skipped

### Secrets matrix

| Secret | Workflow | Notes |
|--------|----------|--------|
| `XAI_API_KEY` | draft | Grok via `lib/grok-client.ts` (`GROK_MODEL` in `config.ts`) |
| `X_API_KEY` | publish | OAuth1 consumer key |
| `X_API_SECRET` | publish | OAuth1 consumer secret |
| `X_ACCESS_TOKEN` | publish | User token |
| `X_ACCESS_TOKEN_SECRET` | publish | User token secret |

### Workflow behavior

- **Draft:** path filters on `posts.json`, `content/posts/**`,
  `pages/posts/**`; `workflow_dispatch` always. Opens PR via
  `peter-evans/create-pull-request` (branch `x-thread/<slug>` or
  `x-thread/drafts`). Permissions: `contents: write`,
  `pull-requests: write`.
- **Publish:** push to `m` with `paths: threads/**` excluding
  `config.yml` / `.gitkeep`. Skips commits whose message contains
  `[skip x-thread-publish]`. `runPublish` no-ops `status: published`.
- Character length: soft ~260 guidance in the prompt; validation does
  **not** fail drafts over 280 (AC).

### Invariants / gotchas

- Prod branch is **`m`**, not `main`/`master`.
- Enrich commit must not re-post: published skip + `[skip x-thread-publish]`.
- Do not hand-edit `posts.json` for blog reasons; threads own
  `threads/*.yml` only.
- Pay-per-use X billing: every successful `POST /2/tweets` costs money.
- No live network in `npm test`; CI does not smoke-post.

### Cross-references

- Plan: `docs/plans/blog-x-threads/PLAN.md`
- Asana: MASTER-1926
- X API v2 create tweet:
  https://developer.x.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets
- Repo agent notes: `AGENTS.md` (pointer back here)
