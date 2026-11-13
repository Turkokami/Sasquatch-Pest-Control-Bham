/**
 * PEST CALENDAR — the numbers behind /guides/whatcom-county-pest-calendar/.
 *
 * TWO MODES, and the split exists to protect customers rather than to be tidy.
 *
 *   node scripts/pest-calendar.mjs --ingest
 *     Reads raw GorillaDesk exports from private/gorilladesk/, reduces them to
 *     anonymized counts in private/derived/, and then tells you to delete the
 *     raw files. Run it once per export and keep nothing afterwards.
 *
 *   node scripts/pest-calendar.mjs
 *     Reads private/derived/ and prints the figures the guide publishes.
 *     Needs no customer data and never touches any.
 *
 * WHY. A GorillaDesk service-lookup export carries a customer name, a street
 * address, a phone number and an invoice value on every row — 16,368 rows of
 * it for 2023-2025 — and a new-customer export adds email addresses. None of
 * that is needed to say that 77% of wasp work falls in July, August and
 * September. Keeping it after the counts have been taken is risk with no
 * upside, so the owner's instruction on 12 Nov 2026 was to reduce and then
 * erase. This script makes that the normal way the page gets updated rather
 * than something somebody has to remember to do.
 *
 * WHAT THE DERIVED FILES HOLD: a service label, a year, a month and a count.
 * Nothing identifying anybody, and no money. They stay inside private/ anyway,
 * not because they are sensitive but because the page publishes shares rather
 * than volumes and the counts would give the volumes away.
 *
 * THE TWO METHOD DECISIONS, both argued on the page itself:
 *
 *   1. Reactive jobs only. Recurring plan stops are excluded — 6,730 Monthly
 *      Rodent Service visits across 2023-2025 record a timetable, not a
 *      season, and including them drowns every real signal. Free call-backs
 *      are excluded too: each is a second visit to a problem already counted.
 *   2. Shares, not counts. The shape of the year is what a reader needs; job
 *      volume tells them about the business instead.
 *
 * SCOPE: pests the company currently services. Mole work is in the history and
 * was the largest reactive line in it (1,330 jobs, 2023-2025), but mole and
 * wildlife revenue both ran to zero from June 2026 and the owner confirmed
 * neither service is currently offered. Mole service returns later with a
 * BurrowRX carbon monoxide device; move the entry out of EXCLUDED then.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(root, 'private', 'gorilladesk');
const DERIVED = path.join(root, 'private', 'derived');
const JOBS = path.join(DERIVED, 'job-counts.csv');
const CUSTOMERS = path.join(DERIVED, 'new-customers.csv');

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

const csvCell = (s) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);

/* ─────────────────────────────── INGEST ─────────────────────────────── */

function ingest() {
  if (!fs.existsSync(RAW)) {
    console.error(`No raw export folder at ${path.relative(root, RAW)}`);
    console.error('Put the GorillaDesk service-lookup CSVs there and re-run.');
    process.exit(1);
  }
  const files = fs.readdirSync(RAW).filter((f) => f.toLowerCase().endsWith('.csv'));
  if (!files.length) {
    console.error(`No CSVs in ${path.relative(root, RAW)}`);
    process.exit(1);
  }

  const counts = new Map();
  let rows = 0, undated = 0;
  for (const f of files) {
    for (const r of parseCsv(fs.readFileSync(path.join(RAW, f), 'utf8'))) {
      rows++;
      const type = (r['Service Type'] ?? '').trim() || '(blank)';
      const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/.exec(r['Scheduled Date'] ?? '');
      if (!m) { undated++; continue; }
      const y = Number(m[3]) < 100 ? Number(m[3]) + 2000 : Number(m[3]);
      const key = `${type}\t${y}\t${Number(m[1])}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  fs.mkdirSync(DERIVED, { recursive: true });
  const out = ['service_type,year,month,jobs'];
  for (const [k, n] of [...counts].sort()) {
    const [type, y, mo] = k.split('\t');
    out.push(`${csvCell(type)},${y},${mo},${n}`);
  }
  fs.writeFileSync(JOBS, out.join('\n') + '\n');

  console.log(`read ${rows} rows from ${files.length} file(s)`);
  if (undated) console.log(`  ${undated} row(s) had no parseable date and were dropped`);
  console.log(`wrote ${out.length - 1} count rows to ${path.relative(root, JOBS)}`);
  console.log('\nThe derived file holds a service label, a year, a month and a count.');
  console.log('No names, no addresses, no phone numbers, no email, no money.\n');
  console.log('NOW DELETE THE RAW EXPORTS. They are no longer needed:');
  for (const f of files) console.log(`   private/gorilladesk/${f}`);
}

/* ─────────────────────────────── REPORT ─────────────────────────────── */

/* Service Type is free text typed by whoever booked the job, so it is matched
   on patterns rather than on an enumeration. Every pattern was checked against
   the distinct values actually present in the 2023-2025 exports. */
const PESTS = [
  /* OHA is the owner's shorthand for odorous house ants (confirmed 12 Nov
     2026) and it is the largest pest-specific line in the book — more jobs
     than carpenter ants and wasps combined. It sat in the unmapped bucket
     until he translated it, which is the argument for never guessing at a
     service label. Its curve is a real spring season rather than the flat line
     a scheduled service draws: compare QT GP, the quarterly general
     preventative, which runs 5% to 10% and is a timetable. */
  [/\boha\b/i, 'Odorous house ants'],
  [/wasp/i, 'Wasps and yellowjackets'],
  [/carpenter ant|pre construct/i, 'Carpenter ants'],
  [/cockroach/i, 'Cockroaches'],
  [/bed bug|crossing border/i, 'Bed bugs'],
  [/flea/i, 'Fleas'],
  [/spider/i, 'Spiders'],
  [/\bvole\b/i, 'Voles'],
  [/powder ?post/i, 'Powderpost beetles'],
  [/pavement ant|moisture ant|thatching ant/i, 'Ants, other'],
  [/carpet beetle|drug ?store/i, 'Carpet and pantry beetles'],
  [/silverfish/i, 'Silverfish'],
  [/termite/i, 'Termites'],
];

/* Counted and reported separately so each figure stays visible rather than
   being silently dropped into an "other" bucket. */
const EXCLUDED = [
  [/\bmole\b/i, 'Moles — service not currently offered'],
  [/wild ?-? ?life|squirrel|otter|skunk|animal pick|bat exclusion|raccoon|opossum/i, 'Wildlife'],
  [/\bbird\b/i, 'Birds'],
  [/mosquito/i, 'Mosquitoes'],
  /* Free return visits on an active plan — trap checks and re-treatments.
     Each is a second visit to a problem already counted elsewhere. */
  [/^extra service/i, 'Free call-backs (second visit to a counted problem)'],
];

/* Below this many jobs over the whole period a monthly curve is noise. The
   guide says so in prose rather than charting three dots. */
const MIN_SAMPLE = 25;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function report() {
  if (!fs.existsSync(JOBS)) {
    console.error(`No derived counts at ${path.relative(root, JOBS)}`);
    console.error('Run `node scripts/pest-calendar.mjs --ingest` first.');
    process.exit(1);
  }
  const rows = parseCsv(fs.readFileSync(JOBS, 'utf8'));
  const match = (list, t) => list.find(([rx]) => rx.test(t))?.[1] ?? null;

  const grid = new Map(), totals = new Map(), excluded = new Map();
  const years = new Set();
  let other = 0;

  for (const r of rows) {
    const type = r.service_type, n = Number(r.jobs), mo = Number(r.month);
    years.add(Number(r.year));
    const out = match(EXCLUDED, type);
    if (out) { excluded.set(out, (excluded.get(out) ?? 0) + n); continue; }
    const pest = match(PESTS, type);
    if (!pest) { other += n; continue; }
    if (!grid.has(pest)) grid.set(pest, new Array(12).fill(0));
    grid.get(pest)[mo - 1] += n;
    totals.set(pest, (totals.get(pest) ?? 0) + n);
  }

  const yrs = [...years].sort();
  const published = [...totals].filter(([, n]) => n >= MIN_SAMPLE).sort((a, b) => b[1] - a[1]);
  const thin = [...totals].filter(([, n]) => n < MIN_SAMPLE).sort((a, b) => b[1] - a[1]);
  const inScope = [...totals.values()].reduce((a, b) => a + b, 0);

  console.log(`years ${yrs.join(', ')} · reactive in-scope pest jobs ${inScope}`);
  console.log(`recurring plan stops and unmapped labels: ${other}\n`);

  console.log("PUBLISHED — monthly share of each pest's own annual work\n");
  console.log(`${''.padEnd(26)}${MON.map((m) => m.padStart(5)).join('')}   n`);
  for (const [pest, n] of published) {
    const g = grid.get(pest);
    const pk = g.indexOf(Math.max(...g));
    const cells = g.map((v, i) => {
      const s = `${Math.round((v / n) * 100)}%`;
      return (i === pk ? `*${s}` : s).padStart(5);
    }).join('');
    console.log(`${pest.padEnd(26)}${cells}  ${String(n).padStart(4)}`);
  }
  console.log('\n(* marks the peak month)');

  if (thin.length) {
    console.log(`\nNOT PUBLISHED — under ${MIN_SAMPLE} jobs, too few to describe a season`);
    for (const [p, n] of thin) console.log(`   ${String(n).padStart(4)}  ${p}`);
  }
  if (excluded.size) {
    console.log('\nEXCLUDED — counted, not published');
    for (const [k, n] of [...excluded].sort((a, b) => b[1] - a[1])) {
      console.log(`   ${String(n).padStart(5)}  ${k}`);
    }
  }

  if (fs.existsSync(CUSTOMERS)) {
    const cr = parseCsv(fs.readFileSync(CUSTOMERS, 'utf8'));
    const g = new Array(12).fill(0);
    const cy = new Set();
    for (const r of cr) { g[Number(r.month) - 1] += Number(r.customers); cy.add(r.year); }
    const tot = g.reduce((a, b) => a + b, 0);
    const pk = g.indexOf(Math.max(...g));
    console.log(`\nNEW CUSTOMERS BY MONTH — ${[...cy].sort().join(', ')}, n=${tot}\n`);
    console.log(`${''.padEnd(26)}${MON.map((m) => m.padStart(5)).join('')}`);
    console.log(`${'First-time callers'.padEnd(26)}${g.map((v, i) => {
      const s = `${Math.round((v / tot) * 100)}%`;
      return (i === pk ? `*${s}` : s).padStart(5);
    }).join('')}`);
    console.log(`\n   Jul-Sep ${Math.round(((g[6] + g[7] + g[8]) / tot) * 100)}% of the year` +
                ` · Jan-Feb ${Math.round(((g[0] + g[1]) / tot) * 100)}%`);
  }
}

if (process.argv.includes('--ingest')) ingest();
else report();
