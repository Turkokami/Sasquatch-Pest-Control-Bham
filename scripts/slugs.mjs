#!/usr/bin/env node
/**
 * slugs.mjs — emits the full valid internal-link slug list.
 *
 * Keystone Part 6.2: every writer gets "the full valid internal-link slug list
 * so cross-links resolve." Without it, writers link to pages that were never
 * built — the exemplar in this repo did exactly that on its first pass,
 * linking to a town the capacity gate had correctly refused to build.
 *
 *   node scripts/slugs.mjs           # human-readable, for the writer brief
 *   node scripts/slugs.mjs --json    # machine-readable, for tooling
 *
 * Reads the built output so it reflects what ACTUALLY exists, not what the
 * data files intend. Run after a build.
 */

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'dist';
if (!fs.existsSync(DIR)) {
  console.error('No ./dist — run `npm run build` first.');
  process.exit(1);
}

const urls = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') {
      const html = fs.readFileSync(p, 'utf8');
      urls.push({
        url: '/' + path.relative(DIR, p).replace(/index\.html$/, '').replace(/\\/g, '/'),
        noindex: /<meta\s+name=["']robots["'][^>]*noindex/i.test(html),
      });
    }
  }
})(DIR);

urls.sort((a, b) => a.url.localeCompare(b.url));

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(urls.map((u) => u.url), null, 2));
} else {
  const group = (label, pred) => {
    const rows = urls.filter((u) => pred(u.url));
    if (!rows.length) return;
    console.log(`\n${label} (${rows.length})`);
    for (const r of rows) console.log(`  ${r.url}${r.noindex ? '  [noindex — link is valid, page awaits content]' : ''}`);
  };
  console.log(`\nValid internal link targets — ${urls.length} routes\n${'─'.repeat(58)}`);
  group('Services', (u) => u.startsWith('/services/') && u.split('/').filter(Boolean).length === 2);
  group('Problem pages', (u) => u.startsWith('/services/') && u.split('/').filter(Boolean).length === 3);
  group('Cities', (u) => u.startsWith('/locations/') && u.split('/').filter(Boolean).length === 2);
  group('Neighborhoods', (u) => u.startsWith('/locations/') && u.split('/').filter(Boolean).length === 3);
  group('Hubs & pages', (u) => !u.startsWith('/services/') && !u.startsWith('/locations/'));
  console.log(
    `\n${'─'.repeat(58)}\nLink ONLY to paths on this list. A link to any other path fails the` +
    `\ndead-link crawler and blocks the batch.\n`,
  );
}
