/**
 * Places photographs through the body of every English Markdown page, after
 * the first paragraph of every third section. The choice of photographs, and
 * the rules that keep it honest, are in page-photos.ts; this file only finds
 * the page's path and the places to put them.
 *
 * Runs while Markdown compiles, so the figures are in the static HTML — no
 * script, no layout shift (width and height are on every <img>), and nothing
 * for a crawler to miss. Every one is lazy: none of them is ever above the
 * fold, because the first can only come after the third section.
 *
 * Wired in astro.config.mjs. A change here needs the content cache cleared
 * (node_modules/.astro and .astro) or Astro serves the old compiled bodies.
 */
import { inlinePhotosFor, photoAfterSection } from './page-photos';

type Node = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: Node[]; value?: string };

/** The English path a content file renders at, or null for anything else. */
function pathOf(file: string, fm: Record<string, unknown>): string | null {
  const m = file.replace(/\\/g, '/').match(/\/src\/content\/([^/]+)\/([^/]+)\.md$/);
  if (!m) return null;
  const [, collection, slug] = m;
  switch (collection) {
    case 'services': return `/services/${slug}/`;
    case 'problems': return fm.service ? `/services/${fm.service}/${slug}/` : null;
    case 'pests': return `/pest-library/${slug}/`;
    case 'industries': return `/commercial/${slug}/`;
    case 'guides': return `/guides/${slug}/`;
    case 'blog': return `/blog/${slug}/`;
    case 'locations':
      if (!fm.town) return null;
      return fm.neighborhood ? `/locations/${fm.town}/${fm.neighborhood}/` : `/locations/${fm.town}/`;
    default: return null;
  }
}

const figure = (p: { file: string; alt: string; width: number; height: number }): Node => ({
  type: 'element',
  tagName: 'figure',
  /* data-boilerplate: the caption is the photograph's description, and the same
     photograph appears on a handful of pages, so the caption would read as a
     sentence repeated across the site. The harness strips these blocks before
     the duplicate-sentence scanner and the word count, which is exactly right —
     it is a label on a picture, not the page's own prose. */
  properties: { className: ['inline-photo'], 'data-boilerplate': true },
  children: [
    {
      type: 'element',
      tagName: 'img',
      properties: { src: p.file, alt: p.alt, width: p.width, height: p.height, loading: 'lazy', decoding: 'async' },
      children: [],
    },
    {
      type: 'element',
      tagName: 'figcaption',
      properties: {},
      children: [{ type: 'text', value: p.alt }],
    },
  ],
});

export default function rehypeInlinePhotos() {
  return (tree: Node, file: { history?: string[]; path?: string; data?: { astro?: { frontmatter?: Record<string, unknown> } } }) => {
    const src = file.path ?? file.history?.[0] ?? '';
    const fm = file.data?.astro?.frontmatter ?? {};
    const path = pathOf(src, fm);
    if (!path || !tree.children) return;
    const photos = inlinePhotosFor(path, String(fm.title ?? fm.h1 ?? ''));
    if (!photos.length) return;

    const kids = tree.children;
    const h2s = kids.map((n, i) => (n.type === 'element' && n.tagName === 'h2' ? i : -1)).filter((i) => i >= 0);
    /* A page with fewer than three sections has no third section to sit
       after — two of the blog posts are written as one long run with almost
       no headings. Those get a photograph every sixth block instead (a paragraph or a list: one of them is written
       almost entirely as numbered lists),
       which is the same rhythm by a different measure. */
    if (h2s.length < 3) {
      const ps = kids.map((n, i) => (n.type === 'element' && ['p', 'ol', 'ul'].includes(n.tagName ?? '') ? i : -1)).filter((i) => i >= 0);
      const at = ps.filter((_, n) => n >= 3 && (n - 3) % 6 === 0).slice(0, photos.length);
      for (let k = at.length - 1; k >= 0; k--) kids.splice(at[k] + 1, 0, figure(photos[k]));
      return;
    }
    /* Work back to front so earlier indexes stay valid as figures go in. */
    const slots: number[] = [];
    h2s.forEach((at, section) => {
      if (!photoAfterSection(section)) return;
      const end = h2s[section + 1] ?? kids.length;
      let p = -1;
      for (let i = at + 1; i < end; i++) {
        if (kids[i].type === 'element' && kids[i].tagName === 'p') { p = i; break; }
      }
      slots.push(p >= 0 ? p + 1 : at + 1);
    });
    const used = slots.slice(0, photos.length);
    for (let k = used.length - 1; k >= 0; k--) kids.splice(used[k], 0, figure(photos[k]));
  };
}
