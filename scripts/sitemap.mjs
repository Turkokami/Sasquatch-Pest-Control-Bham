#!/usr/bin/env node
/**
 * sitemap.mjs — writes dist/sitemap.xml and dist/robots.txt after a build.
 *
 * Runs from `npm run build`, so the sitemap can never be one build stale.
 * Written by hand rather than pulled in as an integration, for one reason
 * that matters on this site: the rule for what belongs in a sitemap here is
 * not "every route". It is "every route we are asking Google to index", and
 * this build deliberately ships 57 pages that are noindex —
 *
 *   - archived blog posts, canonicalled to the page that supersedes them
 *   - species profiles and other routes whose content has not landed
 *   - the 404
 *
 * Listing a noindex page in a sitemap is a contradiction: it asks a crawler
 * to index a page the page itself refuses. Off-the-shelf sitemap integrations
 * enumerate routes and would do exactly that, so this reads the built HTML and
 * asks each page what it says about itself.
 *
 * lastmod comes from the file's mtime, which after a clean build is the build
 * time — honest, if coarse. It is deliberately NOT invented per page.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'dist';
const SITE = 'https://www.sasquatchpestcontrol.com';

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(DIR);
if (!files.length) {
  console.error(`No built HTML in ./${DIR} — run the build first.`);
  process.exit(1);
}

/* Priority is a hint, not a ranking lever, and Google has said for years that
   it largely ignores it. It is set here anyway because it costs nothing and
   because expressing the site's own hierarchy in one place is a useful
   sanity check on that hierarchy: if a page's priority looks wrong, the
   information architecture is usually what is wrong. */
const priorityFor = (url) => {
  if (url === '/') return '1.0';
  if (/^\/(services|locations|commercial|pest-library|guides|about)\/$/.test(url)) return '0.9';
  if (/^\/services\/[^/]+\/$/.test(url)) return '0.8';
  if (/^\/locations\/[^/]+\/$/.test(url)) return '0.8';
  if (/^\/blog\//.test(url)) return '0.4';
  return '0.6';
};

const entries = [];
let excluded = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  if (/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) { excluded++; continue; }

  const url = '/' + path.relative(DIR, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  if (url === '/404.html' || url === '/404/') { excluded++; continue; }

  /* A page canonicalled elsewhere does not belong here either, even if it
     somehow escaped the noindex check — same contradiction, second guard. */
  const canon = (html.match(/<link\s+rel=["']canonical["'][^>]*href=(["'])((?:(?!\1).)*)\1/i) || [])[2];
  if (canon && canon !== `${SITE}${url}`) { excluded++; continue; }

  entries.push({ url, lastmod: fs.statSync(f).mtime.toISOString().slice(0, 10) });
}

entries.sort((a, b) => a.url.localeCompare(b.url));

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries
    .map(
      (e) =>
        `  <url>\n    <loc>${SITE}${e.url}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <priority>${priorityFor(e.url)}</priority>\n  </url>`,
    )
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(DIR, 'sitemap.xml'), xml);

/* robots.txt. Nothing here is clever, and that is intentional — a robots file
   is the easiest place on a site to accidentally deindex everything, so it
   stays minimal and obvious. No Disallow rules: the pages we do not want
   indexed carry noindex, which is the correct mechanism. Disallowing a URL
   in robots.txt prevents the crawl, which prevents the crawler from ever
   SEEING the noindex — the opposite of the intent. */
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
fs.writeFileSync(path.join(DIR, 'robots.txt'), robots);

console.log(
  `sitemap.xml — ${entries.length} indexable URLs (${excluded} excluded: noindex, canonicalled elsewhere, or the 404)`,
);
console.log('robots.txt — written');
