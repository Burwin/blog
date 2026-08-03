/**
 * Strip common markdown decoration to plain text for tweet drafts.
 * Order: fences → inline code → links → bold → italic → heading markers.
 * Does not collapse blank lines. List markers (`- `) are kept.
 */
export function stripMarkdownToPlain(text: string): string {
  let s = text;

  // Fenced code blocks: drop ``` markers (optional lang), keep inner lines
  s = s.replace(/```[^\n]*\n?([\s\S]*?)```/g, (_, body: string) =>
    body.replace(/\n$/, ''),
  );

  // Inline code
  s = s.replace(/`([^`]+)`/g, '$1');

  // Links: [label](url) → label
  s = s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

  // Bold before italic so ** / __ are not partially eaten as emphasis
  s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
  s = s.replace(/__([^_]+)__/g, '$1');

  // Italic: *…* / _…_ around non-empty non-space-bounded runs (avoid snake_case)
  s = s.replace(/(?<!\w)\*([^*\n]+)\*(?!\w)/g, '$1');
  s = s.replace(/(?<!\w)_([^_\n]+)_(?!\w)/g, '$1');

  // Heading markers at line start
  s = s.replace(/^#{1,6}\s+/gm, '');

  // Trailing spaces on lines only
  s = s.replace(/[ \t]+$/gm, '');

  return s;
}
