# Michael Burwin Harris

Catholic. Husband. Father. Traditionalist. Developer. Entrepreneur.

- [X](https://twitter.com/ParallelMike)
- [LinkedIn](https://www.linkedin.com/in/burwin/)
- [bamboo.dev](https://www.bamboo.dev/)

## Writing a new post

1. Create `content/posts/<slug>.md`. The filename becomes the URL and the id.
2. Add YAML front-matter at the top:

   ```markdown
   ---
   date: 2026-05-15
   title: Post Title
   excerpt: One-line summary shown on the index and in RSS.
   ---

   Body in plain Markdown.
   ```

3. Run `npm run dev` to compile, regenerate `posts.json`, and start the dev server. Verify the post renders correctly.
4. Commit all three:
   - `content/posts/<slug>.md` (the source)
   - `pages/posts/<slug>.vue` (generated; do not edit)
   - `posts.json` (regenerated index)
5. Push to branch `m` to deploy.

See [`AGENTS.md`](./AGENTS.md) for the Markdown → component mapping, the legacy hand-written-Vue flow, and other build details.
