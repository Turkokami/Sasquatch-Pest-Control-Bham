/**
 * Credential expiry check (Keystone v3.2 audit, 20 Nov 2026).
 *
 * Every published WSDA license carries `licenseExpires`, and it renders on
 * /about/ and as `hasCredential.expires` in the structured data. Nothing
 * stopped the site from publishing a license past its expiry: all five ran to
 * 31 Dec 2026, and from 1 Jan the site would show expired credentials unless
 * the renewed dates were entered. This makes that a gate failure.
 *
 * - FAILS when any publishable person's license has expired.
 * - WARNS (does not fail) inside 45 days of an expiry, so the renewal date
 *   gets entered before the deadline rather than on it.
 * - Also fails if the insurance `coverThrough` date has passed.
 *
 * Never "fix" a failure here by inventing a date. Enter the renewed expiry
 * from the WSDA license lookup.
 */
import { people, business, isReady } from '../../src/data/business';

const DAY = 86_400_000;
const WARN_DAYS = 45;
const today = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');

const problems: string[] = [];
const warnings: string[] = [];

function check(label: string, date: string) {
  const d = new Date(date + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) { problems.push(`${label}: "${date}" is not a date`); return; }
  const left = Math.round((d.getTime() - today.getTime()) / DAY);
  if (left < 0) problems.push(`${label} expired on ${date}. Enter the renewed date from the WSDA lookup.`);
  else if (left <= WARN_DAYS) warnings.push(`${label} expires on ${date} (${left} days). Enter the renewed date once it posts.`);
}

for (const p of people as readonly any[]) {
  if (!p.publishable || !p.credential) continue;
  if (!isReady(p.licenseExpires)) continue;
  check(`${p.name} (${p.credential})`, p.licenseExpires as string);
}
const cover = (business as any).insurance?.coverThrough;
if (cover) check('Insurance and bond cover', cover);

for (const w of warnings) console.log(`\x1b[33mSOON: ${w}\x1b[0m`);
for (const p of problems) console.log(`EXPIRED: ${p}`);
console.log(problems.length === 0
  ? `\x1b[32mCredentials: none expired${warnings.length ? `, ${warnings.length} due soon` : ''}\x1b[0m`
  : `\x1b[31m${problems.length} expired credential(s) would publish\x1b[0m`);
process.exit(problems.length ? 1 : 0);
