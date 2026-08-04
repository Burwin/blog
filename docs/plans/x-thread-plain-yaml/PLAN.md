# X thread drafts: single blank lines + plain-text tweets (MASTER-1952)

Status: in progress — steps 1–10 done; next is step 11 (deploy).

Asana: MASTER-1952 — "blog tweet teaser should remove extra blank lines"
(https://app.asana.com/1/1203819684139908/project/1204506183888935/task/1217116590530676)
GID `1217116590530676`

## Goal

Make auto-drafted X thread YAML easy to review and tweet-ready as plain
text:

1. **YAML source** never shows two consecutive blank lines between
   paragraphs (folded-style `>-` artifact from `yaml` stringify).
2. **Tweet strings** stored in drafts are plain text — markdown
   decoration stripped at draft time (`**bold**` → `bold`, etc.).

## Scope

**In**

- `serializeThreadYaml` options so long multi-paragraph tweets serialize
  with literal `|-` (single blank line between paragraphs in the file).
- Pure `stripMarkdownToPlain(text)` covering common markdown.
- Wire strip into `draftThread` after LLM parse (before validate/write).
- Unit tests under `scripts/x-threads/**/*.test.ts`; run via `npm test`.
- Optional prompt tweak so the model is told to emit plain text
  (belt-and-suspenders; code strip is authoritative).

**Out**

- Editing open PR #5 (`threads/separation-of-powers.yml`) or any existing
  `threads/*.yml` (published or draft).
- Publish-path stripping (publish posts YAML text as-is).
- Collapsing extra newlines *inside* tweet string content (`\n{3,}` →
  `\n\n`) — content already has single paragraph breaks; blank-line fix
  is serialization-only.
- New npm dependencies (hand-roll strip; `yaml` + existing harness only).
- Changing blog post markdown sources.

## Decisions (locked from task review)

| # | Decision |
|---|----------|
| Q1 | **Serializer rule only** for blank lines — do not rewrite PR #5 or existing threads. |
| Q2 | **`stringify(doc, { lineWidth: 0 })`** → literal `\|-`, one blank line in file per paragraph break. |
| Q3 | **No tweet-content newline normalize** — YAML serialization only for blanks. |
| Q4 | **Common md → plain**: bold/italic/inline code/links/headings; drop ` ``` ` fence markers but keep inner lines; **keep** list markers (`- `). |
| Q5 | **Draft only** — strip after LLM parse in `draftThread`; publish unchanged. |

## Design

### Root cause (blank lines)

`serializeThreadYaml` today is bare `stringify(doc)`. For long lines that
need wrapping **and** contain `\n\n`, `yaml@2.9` picks folded style
(`>-`). In folded style a paragraph break is written as **two** blank
lines in the file. Parsed tweet text is already correct (`\n\n` once).

`lineWidth: 0` disables wrapping → literal `|-` → one blank line in the
file maps to one paragraph break in content. Round-trip must still
preserve `\n\n` in `tweets[].text`.

### Plain-text strip

New pure helper (suggested path:
`scripts/x-threads/lib/plain-text.ts`):

```ts
export function stripMarkdownToPlain(text: string): string
```

Apply in `draftThread` to every LLM tweet string **before** URL append /
validate. Do not strip the synthetic final URL tweet (or stripping a bare
URL is a no-op — either is fine; prefer mapping all `texts` from the LLM
then append URL unchanged).

**Transform table (pin in tests):**

| Input | Output |
|-------|--------|
| `**bold text**` | `bold text` |
| `__bold__` | `bold` |
| `*italic*` / `_italic_` | `italic` |
| `` `code` `` | `code` |
| `[EARS](https://example.com)` | `EARS` |
| `## Conventions` | `Conventions` |
| fenced block with ` ``` ` markers | inner lines only, markers gone |
| `- **Legislators**: …` | `- Legislators: …` (list marker kept) |
| plain prose / bare URL | unchanged |

Order of operations (implementation note): fences → inline code → links
→ bold → italic → heading markers; trim only trailing spaces on lines if
needed; do not collapse blank lines.

No new dependency — small regex/state walk is enough for this surface.

### Files touched

```
scripts/x-threads/lib/thread-yaml.ts      # stringify opts
scripts/x-threads/lib/thread-yaml.test.ts # blank-line + multi-para round-trip
scripts/x-threads/lib/plain-text.ts       # NEW stripMarkdownToPlain
scripts/x-threads/lib/plain-text.test.ts  # NEW table-driven cases
scripts/x-threads/lib/draft.ts            # map texts through strip
scripts/x-threads/lib/draft.test.ts       # assert strip on LLM output
scripts/x-threads/prompts/thread.txt      # require plain text (optional step)
```

### Test command

```bash
npm test
# → node --import tsx --test scripts/x-threads/**/*.test.ts
```

## TDD implementation order

Conventions:

- Each step is **one test OR one implementation move** — never both.
- RED = failing test. GREEN = minimal pass. REFACTOR = suite stays green.
- When a step completes, post the **next** step’s trigger verbatim.
- Trigger shape:

  > ▶️ Step `N` of 12 — `<kind>: <title>` — model: `<tier>` — plan:
  > `docs/plans/x-thread-plain-yaml/PLAN.md`

### Phase A — YAML serialization (shippable: clean blank lines in new drafts)

| # | Kind | Step | Model |
|---|------|------|-------|
| 1 | RED | `serializeThreadYaml` on a `ThreadDoc` whose first tweet is a **long** multi-paragraph string (several sentences per para so default line-wrap would engage, joined by `\n\n`): assert the serialized YAML does **not** match `/\n[ \t]*\n[ \t]*\n/` (no two consecutive blank lines). Fails on current bare `stringify`. | Grok Build 0.1 |
| 2 | GREEN | `serializeThreadYaml`: `return stringify(doc, { lineWidth: 0 })`. Step 1 passes. | Grok Build 0.1 |
| 3 | RED | Round-trip: serialize then `parseThreadYaml` preserves exact multi-paragraph tweet text (including single `\n\n` between paras). Extends coverage beyond the short-string round-trip already in suite. | Grok Build 0.1 |
| 4 | GREEN | No logic change if step 3 already green after step 2; otherwise adjust only stringify options until round-trip holds. Do not reintroduce folded double-blanks. | Grok Build 0.1 |

### Phase B — `stripMarkdownToPlain` (shippable: pure helper)

| # | Kind | Step | Model |
|---|------|------|-------|
| 5 | RED | Add `plain-text.test.ts` with a **table-driven** test for `stripMarkdownToPlain` covering the transform table in Design (bold `**`/`__`, italic `*`/`_`, inline code, link→label, heading markers, fence markers dropped / body kept, list markers kept, plain + bare URL unchanged). Import from `./plain-text.ts`. Fails (module/export missing). | Grok Build 0.1 |
| 6 | GREEN | Implement `scripts/x-threads/lib/plain-text.ts` so the table passes. No new deps. | GLM 5.2 |

### Phase C — Draft wiring + prompt (shippable: new drafts are plain)

| # | Kind | Step | Model |
|---|------|------|-------|
| 7 | RED | In `draft.test.ts`: mock `complete` returns JSON with markdown in a tweet (e.g. `'- **Legislators**: write laws'` and/or `'See **TRUST!!**'`). Assert `draftThread` result tweet texts are stripped (`'- Legislators: write laws'`, plain TRUST). URL still appended last; `validateThread` 0 issues. | Grok Build 0.1 |
| 8 | GREEN | In `draft.ts`, after `parseLlmTweetList`, map each LLM string through `stripMarkdownToPlain` before building `tweets` / appending URL. | Grok Build 0.1 |
| 9 | REFACTOR | Update `prompts/thread.txt` system rules: output must be plain text (no markdown bold/italic/links/headings/fences). Keep suite green; no behavior change required beyond prompt text. | Opus 4.8 |
| 10 | VERIFY | Full `npm test` green. Spot-check: unit-only — do not open/edit PR #5. | Grok Build 0.1 |

### Phase D — Ship

| # | Kind | Step | Model |
|---|------|------|-------|
| 11 | DEPLOY | Commit on `MASTER-1952`, push, open PR → base **`m`**, Copilot loop until clean, CI/`npm test` green, merge. Do **not** merge or rewrite `x-thread/separation-of-powers` as part of this card. | Opus 4.8 |
| 12 | CLOSE | Mark Asana MASTER-1952 complete (or move to DONE) with a short comment: serializer `lineWidth: 0` + draft-time plain-text strip; existing threads / PR #5 left untouched. | Grok Build 0.1 |

**M = 12.**

## Testing strategy

- Hermetic unit tests only (`node:test`); no network, no live X/xAI.
- Phase A asserts on **serialized string shape** (blank lines) and
  round-trip **content**.
- Phase B is pure string→string table.
- Phase C is `draftThread` with mock `complete` (existing pattern in
  `draft.test.ts`).
- Do not add lint/formatter config.

## Risks & gotchas

- **Folded vs literal:** collapsing blank lines *inside* a `>-` file by
  hand would destroy paragraph breaks on parse. Always fix via
  `lineWidth: 0` (or equivalent literal force), never post-process folded
  YAML text.
- **Italic `_…_`:** naive regex can mangle `snake_case` or mid-word
  underscores. Prefer emphasis patterns that require word boundaries or
  matching pairs around non-space content; pin a snake_case “unchanged”
  row if a case fails in GREEN.
- **Links:** `[label](url)` → `label` only (drop URL). If a future draft
  needs the URL visible, that’s a product change — out of scope.
- **Code fences in posts:** constitution-style posts keep fence *body* as
  plain lines; fine for teaser tweets.
- **Existing drafts:** PR #5 still has `**…**` and folded blanks until
  someone redrafts or edits by hand — explicit non-goal.
- **Publish path:** already-published threads keep their text; no rewrite.
- **Prod branch is `m`.**

## Progress

- [x] Phase A (steps 1–4) — YAML blank lines
- [x] Phase B (steps 5–6) — plain-text helper
- [x] Phase C (steps 7–10) — draft wire + prompt + verify
- [ ] Phase D (steps 11–12) — deploy + close card

## References

- Asana MASTER-1952
- PR example of the symptom: https://github.com/Burwin/blog/pull/5
- Prior plan / harness: `docs/plans/blog-x-threads/PLAN.md`
- `scripts/x-threads/lib/thread-yaml.ts` — `serializeThreadYaml`
- `scripts/x-threads/lib/draft.ts` — `draftThread`
- `scripts/x-threads/prompts/thread.txt`
- Task review Q&A (this session): Q1 serializer-only, Q2 `lineWidth: 0`,
  Q3 no content newline collapse, Q4 common md→plain, Q5 draft-only strip

---

## Kickoff

Copy-paste into a fresh session:

▶️ Step 1 of 12 — RED: serializeThreadYaml has no double blank lines for long multi-paragraph tweets — model: Grok Build 0.1 — plan: `docs/plans/x-thread-plain-yaml/PLAN.md`
