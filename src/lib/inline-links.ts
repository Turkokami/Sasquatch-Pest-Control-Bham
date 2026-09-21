/**
 * A LINK INSIDE A SPANISH PARAGRAPH.
 *
 * The English pages are Markdown, so a citation at the point of the claim is
 * just `[WSU Extension](https://…)` in the sentence. The Spanish pages are not:
 * their prose lives in TypeScript as plain strings and the templates render it
 * as `<p>{p}</p>`, which is text and only text. That is why Keystone 6.5 —
 * "one primary authority named in a visible sentence and linked at the point of
 * the claim" — was unreachable on every Spanish page on this site, not as a
 * content gap but as a rendering one. Owner's call, 20 Sep 2026: make the
 * change.
 *
 * The smallest change that fixes it is this: keep the data as plain strings,
 * write the link in the same Markdown spelling the English pages use, and
 * convert that one construct at render time. No Markdown parser, no new field
 * on the type, and the Spanish files stay readable to somebody who does not
 * write Astro.
 *
 * ESCAPE FIRST, THEN LINK, AND IN THAT ORDER. The result is handed to
 * `set:html`, so anything that is not deliberately a link has to be inert
 * before the anchors go in. Escaping afterwards would mangle the anchors;
 * escaping first means a stray `<` in the prose renders as a `<` and nothing
 * in the data can introduce an element. Only `https:` is accepted, so a
 * `javascript:` or `data:` URL in the string is left as literal text.
 */
const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ESCAPES[c]);

/** `[texto](https://…)` becomes an anchor; everything else is escaped text. */
export function inlineLinks(text: string): string {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,
    (_m, label: string, url: string) => `<a href="${url}" rel="noopener">${label}</a>`,
  );
}

/** True when a string carries at least one link, for tests and audits. */
export const hasInlineLink = (text: string) => /\[[^\]]+\]\(https:\/\/[^\s)]+\)/.test(text);
