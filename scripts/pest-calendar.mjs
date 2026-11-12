/**
 * PEST CALENDAR — the numbers behind /guides/whatcom-county-pest-calendar/.
 *
 * Reads GorillaDesk "service lookup" CSV exports from private/gorilladesk/
 * (gitignored, because those files carry customer names, addresses, phone
 * numbers and invoice values and this repository is public) and prints the
 * monthly shares the guide publishes.
 *
 * It exists because that page promises an annual update, and a page built by
 * hand once is a page that silently rots. Drop next year's export into the
 * folder and run `node scripts/pest-calendar.mjs` — the method stays fixed and
 * only the figures move.
 *
 * WHAT IT DELIBERATELY DOES NOT DO: write anything. It prints. Pasting the
 * figures into the guide is a human step on purpose, because the guide's prose
 * explains each curve and a number that moved without its explanation moving
 * with it is exactly the drift this file is meant to prevent.
 *
 * THE TWO METHOD DECISIONS, both argued on the page itself:
 *
 *   1. Reactive jobs only. Recurring plan stops are excluded — 6,730 Monthly
 *      Rodent Service visits across 2023–2025 record a timetable, not a
 *      season, and including them drowns every real signal.
 *   2. Shares, not counts. The shape of the year is what a reader needs; job
 *      volume tells them about the business instead. The page says so.
 *
 * SCOPE: pests the company currently services. Mole work is in the exports and
 * is the single largest reactive line (1,330 jobs, 2023–2025) but is excluded,
 * because the owner confirmed on 12 Nov 2026 that mole service is not
 * currently offered and returns later with a BurrowRX carbon monoxide device.
 * Publishing counts for a service we do not sell would advertise it. Move the
 * entry out of EXCLUDED and into PESTS when it relaunches.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'private', 'gorilladesk');

if (!fs.existsSync(dir)) {
  console.error(`no export folder at ${dir}`);
  console.error('Drop the GorillaDesk service-lookup CSVs there. It is gitignored.');
  process.exit(1);
}

/** Minimal RFC-4180 reader. The exports quote any field containing a comma. */
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const head = rows.shift().map((h) => h.trim());
  return rows
    .filter((r) => r.length > 1)
    .map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? '').trim()])));
}

/* Service Type is free text typed by whoever booked the job, so it is matched
   on patterns rather than on an enumeration. Every pattern below was checked
   against the distinct values actually present in the 2023–2025 exports. */
const PESTS = [
  [/wasp/i, 'Wasps and yellowjackets'],
  [/carpenter ant|pre construct/i, 'Carpenter ants'],
  [/cockroach/i, 'Cockroaches'],
  [/bed bug|crossing border/i, 'Bed bugs'],
  [/flea/i, 'Fleas'],
  [/spider/i, 'Spiders'],
  [/\bvole\b/i, 'Voles'],
  [/powder ?post/i, 'Powderpost beetles'],
  [/pavement ant|moisture ant/i, 'Ants, other'],
  [/carpet beetle|drug ?store/i, 'Carpet and pantry beetles'],
  [/silverfish/i, 'Silverfish'],
  [/termite/i, 'Termites'],
];

/* Out of scope for publication. Counted and reported separately so the figure
   is visible rather than silently dropped. */
const EXCLUDED = [
  [/\bmole\b/i, 'Moles — service not currently offered'],
  [/wild ?-? ?life|squirrel|otter|skunk|animal pick|bat exclusion/i, 'Wildlife'],
  [/\bbird\b/i, 'Birds'],
  [/mosquito/i, 'Mosquitoes'],
];

/* Below this many jobs over the whole period a monthly curve is noise. The
   guide says so in prose rather than charting three dots. */
const MIN_SAMPLE = 25;

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.csv'));
if (!files.length) { console.error(`no CSVs in ${dir}`); process.exit(1); }

const rows = files.flatMap((f) => parseCsv(fs.readFileSync(path.join(dir, f), 'utf8')));

const when = (r) => {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/.exec(r['Scheduled Date'] ?? '');
  if (!m) return null;
  const y = Number(m[3]);
  return { year: y < 100 ? y + 2000 : y, month: Number(m[1]) };
};

const match = (list, t) => list.find(([rx]) => rx.test(t))?.[1] ?? null;

const grid = new Map();      // pest -> Int32Array(12)
const totals = new Map();
const excluded = new Map();
const years = new Set();
let undated = 0, recurring = 0;

for (const r of rows) {
  const type = r['Service Type'] ?? '';
  const d = when(r);
  if (!d) { undated++; continue; }
  years.add(d.year);

  const out = match(EXCLUDED, type);
  if (out) { excluded.set(out, (excluded.get(out) ?? 0) + 1); continue; }

  const pest = match(PESTS, type);
  if (!pest) { recurring++; continue; }

  if (!grid.has(pest)) grid.set(pest, new Int32Array(12));
  grid.get(pest)[d.month - 1]++;
  totals.set(pest, (totals.get(pest) ?? 0) + 1);
}

const yrs = [...years].sort();
const published = [...totals.entries()].filter(([, n]) => n >= MIN_SAMPLE)
  .sort((a, b) => b[1] - a[1]);
const thin = [...totals.entries()].filter(([, n]) => n < MIN_SAMPLE)
  .sort((a, b) => b[1] - a[1]);

console.log(`files ${files.length} · rows ${rows.length} · years ${yrs.join(', ')}`);
console.log(`reactive in-scope pest jobs: ${[...totals.values()].reduce((a, b) => a + b, 0)}`);
console.log(`recurring plan stops and unmapped labels (excluded): ${recurring}`);
if (undated) console.log(`rows with an unparseable date: ${undated}`);
console.log();

console.log('PUBLISHED — monthly share of each pest\'s own annual work\n');
console.log(`${''.padEnd(26)}${MON.map((m) => m.padStart(5)).join('')}   n`);
for (const [pest, n] of published) {
  const g = grid.get(pest);
  const pk = g.indexOf(Math.max(...g));
  const cells = [...g].map((v, i) => {
    const s = `${Math.round((v / n) * 100)}%`;
    return (i === pk ? `*${s}` : s).padStart(5);
  }).join('');
  console.log(`${pest.padEnd(26)}${cells}  ${String(n).padStart(4)}`);
}
console.log('\n(* marks the peak month)');

if (thin.length) {
  console.log(`\nNOT PUBLISHED — under ${MIN_SAMPLE} jobs, too few to describe a season`);
  for (const [pest, n] of thin) console.log(`   ${String(n).padStart(4)}  ${pest}`);
}

if (excluded.size) {
  console.log('\nOUT OF SCOPE — counted, not published');
  for (const [k, n] of [...excluded].sort((a, b) => b[1] - a[1])) {
    console.log(`   ${String(n).padStart(4)}  ${k}`);
  }
}

console.log(`\nCounty split:`);
const counties = new Map();
for (const r of rows) {
  const c = r['County'] || '(blank)';
  counties.set(c, (counties.get(c) ?? 0) + 1);
}
for (const [c, n] of [...counties].sort((a, b) => b[1] - a[1]).slice(0, 6)) {
  console.log(`   ${((n / rows.length) * 100).toFixed(1).padStart(5)}%  ${c}`);
}
