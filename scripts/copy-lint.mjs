#!/usr/bin/env node
/**
 * copy-lint — counts the copy and styling habits the 25 Nov 2026 cleanup
 * removed, in the BUILT output, so a later edit that brings one back shows up.
 *
 *   npm run lint:copy                 scan dist/
 *   node scripts/copy-lint.mjs dir    scan another build folder
 *   node scripts/copy-lint.mjs --strict   exit 1 if anything is found
 *
 * It reports; it does not fail the build. Exit 0 unless --strict is passed.
 * Not wired into `npm run build` on purpose. No dependencies.
 *
 * Checks:
 *   real/really            filler "real"; literal uses (real estate, real-time)
 *                          are excluded, the rest needs a human read
 *   quiet/quietly
 *   short sentences        a 1-2 word sentence inside a <p> in <main>, after
 *                          another sentence ("Every visit.")
 *   arrows in links        → › » ➜ ➔ ⟶ ↗ in <a>/<button> text
 *   dots in main           · or • between words inside <main>
 *   eyebrow elements       class names containing eyebrow, kicker or overline
 *   border-left accents    border-left rules in <style> blocks and .css files
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const root = args.find((a) => !a.startsWith('--')) ?? 'dist';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

let files;
try {
  files = walk(root);
} catch {
  console.error(`copy-lint: cannot read ${root}. Build first.`);
  process.exit(strict ? 1 : 0);
}

const decode = (t) =>
  t
    .replace(/&nbsp;/g, ' ')
    .replace(/&middot;/g, '·')
    .replace(/&bull;/g, '•')
    .replace(/&rarr;/g, '→')
    .replace(/&raquo;/g, '»')
    .replace(/&rsaquo;/g, '›')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
const textOf = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const strip = (html) =>
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<template\b[\s\S]*?<\/template>/gi, ' ');

const checks = {
  'real/really': { n: 0, ex: [] },
  'quiet/quietly': { n: 0, ex: [] },
  '1-2 word sentences in paragraphs': { n: 0, ex: [] },
  'arrows in link/button text': { n: 0, ex: [] },
  'middots/bullets in main content': { n: 0, ex: [] },
  'eyebrow-class elements': { n: 0, ex: [] },
  'border-left accent rules in CSS': { n: 0, ex: [] },
};
const hit = (k, sample, where) => {
  const c = checks[k];
  c.n++;
  if (c.ex.length < 5) c.ex.push(`${sample.slice(0, 100)}  [${where}]`);
};
const around = (text, idx, len) =>
  text.slice(Math.max(0, idx - 45), idx + len + 35).replace(/\s+/g, ' ').trim();

const LITERAL_REAL = /^real(?:[- ]estate|[- ]time|tor|tors|ty|ly)\b/i;
const ARROW = /[→›»➜➔⟶↗]/;
const seenCss = new Set();

for (const file of files) {
  const ext = extname(file);
  if (ext === '.css') {
    const css = readFileSync(file, 'utf8');
    for (const m of css.matchAll(/border-left\s*:\s*[^;}]+/g)) {
      if (/:\s*(0|none)\b/.test(m[0])) continue;
      hit('border-left accent rules in CSS', m[0], file);
    }
    continue;
  }
  if (ext !== '.html') continue;
  const where = file.slice(root.length).replace(/index\.html$/, '') || '/';
  const raw = readFileSync(file, 'utf8');

  /* Inline stylesheets: the site inlines its one stylesheet into every page,
     so count each distinct rule once rather than once per page. */
  for (const st of raw.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const m of st[1].matchAll(/([^{}]*)\{[^}]*?(border-left\s*:\s*[^;}]+)/g)) {
      if (/:\s*(0|none)\b/.test(m[2])) continue;
      const key = (m[1].trim() + m[2]).slice(0, 200);
      if (seenCss.has(key)) continue;
      seenCss.add(key);
      hit('border-left accent rules in CSS', `${m[1].trim()} { ${m[2]} }`, where);
    }
  }

  const html = strip(raw);
  const body = (html.match(/<body\b[\s\S]*<\/body>/i) || [html])[0];
  const mainHtml = (body.match(/<main\b[\s\S]*<\/main>/i) || [body])[0];
  const text = textOf(body);

  for (const m of text.matchAll(/\breal(ly)?\b/gi)) {
    if (LITERAL_REAL.test(text.slice(m.index, m.index + 12))) continue;
    hit('real/really', around(text, m.index, m[0].length), where);
  }
  for (const m of text.matchAll(/\bquiet(ly)?\b/gi)) {
    hit('quiet/quietly', around(text, m.index, m[0].length), where);
  }

  for (const p of mainHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const sentences = textOf(p[1]).split(/(?<=[.!?])\s+/);
    for (let i = 1; i < sentences.length; i++) {
      const s = sentences[i];
      const words = s.match(/[A-Za-zÀ-ÿ0-9'’-]+/g) || [];
      if (words.length >= 1 && words.length <= 2 && /\.$/.test(s) && !/\d/.test(s) && s.length < 30) {
        hit('1-2 word sentences in paragraphs', `${sentences[i - 1].slice(-60)} ${s}`, where);
      }
    }
  }

  for (const a of body.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const t = textOf(a[2]);
    if (ARROW.test(t)) hit('arrows in link/button text', t, where);
  }

  const mainText = textOf(mainHtml);
  for (const m of mainText.matchAll(/\S\s*[·•]\s*\S/g)) {
    hit('middots/bullets in main content', around(mainText, m.index, 3), where);
  }

  for (const m of body.matchAll(/class="([^"]*\b(?:[\w-]*eyebrow[\w-]*|[\w-]*kicker[\w-]*|[\w-]*overline[\w-]*)\b[^"]*)"/gi)) {
    hit('eyebrow-class elements', m[1], where);
  }
}

let total = 0;
console.log(`copy-lint: ${files.filter((f) => f.endsWith('.html')).length} HTML files in ${root}\n`);
for (const [name, c] of Object.entries(checks)) {
  total += c.n;
  console.log(`${String(c.n).padStart(6)}  ${name}`);
  for (const e of c.ex) console.log(`          - ${e}`);
}
console.log(`\n${total} finding(s).${strict ? '' : ' Report only; pass --strict to fail on findings.'}`);
process.exit(strict && total > 0 ? 1 : 0);
