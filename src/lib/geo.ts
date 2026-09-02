/**
 * geo.ts — differentiated local copy, and the genericLocal() fallback.
 *
 * Keystone Part 6.3, the anti-slop engine: "Differentiation is data-driven.
 * Each town row carries distanceMi, direction, pestPressures[], housing,
 * landmarks; the copy derived from these cannot read as a template."
 *
 * Part 12 also records the build that stopped mid-run because of a non-null
 * assertion on an optional data field. Every accessor here degrades to a
 * generic-but-true sentence instead of throwing. Never `!`-assert town data.
 */

import { towns, type Town } from '../data/towns';
import { business, isReady } from '../data/business';

/** Never throws, never emits an empty string, never emits a template token. */
export function genericLocal(t: Pick<Town, 'name' | 'county'>): string {
  return `${t.name} sits in ${t.county}, where the marine climate keeps pest pressure steady through most of the year.`;
}

export function placement(t: Town): string {
  if (t.distanceMi == null || !t.direction) return genericLocal(t);
  const mins = Math.max(5, Math.round(t.distanceMi * 1.6));
  return `${t.name} is about ${t.distanceMi} miles ${t.direction} of Bellingham — roughly ${mins} minutes for our crews.`;
}

export function housingLine(t: Town): string {
  if (!t.housing) return '';
  const map: Record<Town['housing'] & string, string> = {
    prewar:
      'Much of the housing stock predates 1940: post-and-pier foundations, unsealed crawlspaces, and knob-and-tube era framing with generous gaps around every penetration.',
    midcentury:
      'The housing here is largely 1950s–70s: block or poured stem walls, vented crawlspaces, and original cedar siding that has taken decades of marine damp.',
    seventies:
      'The dominant stock is 1970s–90s: cedar and T1-11 siding, vented crawlspaces, and attics with soffit venting that rodents treat as an entryway.',
    modern:
      'Newer construction dominates, which shifts the problem from structural entry to perimeter pressure — landscaping, irrigation, and bark mulch held against the foundation.',
    rural:
      'Homes here sit on acreage among working farmland, which puts outbuildings, feed storage, and field margins directly in play.',
    mixed:
      'The housing stock is mixed — prewar cottages beside newer infill — so treatment has to be matched to the structure rather than the address.',
  };
  return map[t.housing] ?? '';
}

export function pressureLine(t: Town): string {
  if (!t.pestPressures?.length) return '';
  const p = t.pestPressures;
  const list = p.length === 1 ? p[0] : `${p.slice(0, -1).join(', ')} and ${p[p.length - 1]}`;
  return `The recurring calls out of ${t.name} are ${list}.`;
}

export function landmarkLine(t: Town): string {
  if (!t.landmarks?.length) return '';
  const l = t.landmarks;
  const list = l.length === 1 ? l[0] : `${l.slice(0, -1).join(', ')} and ${l[l.length - 1]}`;
  return `We work the neighborhoods around ${list} regularly.`;
}

/**
 * The differentiator paragraph. Assembled from real fields; if a town has
 * too little data the page is not built at all — Keystone Part 6.3: "If the
 * data to write 3,000 unique local words doesn't exist, don't publish the
 * page — a thin geo page is worse than no geo page."
 */
export function localParagraph(t: Town): string {
  return [placement(t), pressureLine(t), housingLine(t), landmarkLine(t)]
    .filter(Boolean)
    .join(' ');
}

/** Capacity gate — decides the tier a town earns. Part 6.3 cluster field. */
export function tierFor(t: Town): 'full' | 'triple' | 'single' | 'area' {
  let score = 0;
  if (t.pestPressures?.length) score += t.pestPressures.length;
  if (t.landmarks?.length) score += t.landmarks.length;
  if (t.housing) score += 2;
  if (t.neighborhoods?.length) score += Math.min(t.neighborhoods.length, 6);
  if (t.population && t.population > 5000) score += 2;
  if (score >= 14) return 'full';
  if (score >= 9) return 'triple';
  if (score >= 5) return 'single';
  return 'area'; // mentioned in areaServed only — no page built
}

/** Towns that only ever appear in schema areaServed, never as a URL. */
export function areaServedOnly(towns: Town[]): string[] {
  /* MUST respect `serviced`. This function feeds the "Also serving" rail and
     areaServed in schema, and it previously used its own filter — which is how
     Point Roberts kept being listed as covered after the owner said we do not
     run it. Same class of bug as the footer/route divergence that produced dead
     links on 95 pages. One rule, everywhere. */
  return towns
    .filter((t) => t.serviced !== false && tierFor(t) === 'area')
    .map((t) => t.name);
}

/**
 * Every community we serve, page or not — for schema areaServed.
 * Built towns plus the mention-only tier, both already filtered on `serviced`,
 * so an excluded town cannot leak into structured data.
 */
export function servedPlaceNames(): string[] {
  const built = builtTowns().map((t) => t.name);
  const mentioned = areaServedOnly(towns.filter(inTerritory));
  return [...new Set([...built, ...mentioned])].sort();
}

/**
 * Neighborhoods that earn their own URL. THE single definition — getStaticPaths,
 * the city page rail and the sibling rail all read this, so they cannot drift
 * and produce dead links the way the footer once did.
 */
export function pagedNeighborhoods(t: Town) {
  return (t.neighborhoods ?? []).filter((n) => n.page === true);
}

/** Neighborhoods covered by the city page instead of a URL of their own. */
export function mentionNeighborhoods(t: Town) {
  return (t.neighborhoods ?? []).filter((n) => n.page !== true);
}

/** Towns we explicitly do NOT serve, for honest "where we don't go" copy. */
export function notServiced(): Town[] {
  return towns.filter((t) => t.serviced === false && inTerritory(t));
}

/** Hard territory filter. Keystone Part 14: build geo pages only inside the
 *  assigned area; a neighboring partner's turf stays untouched. */
export function inTerritory(t: Town): boolean {
  return (business.territory.counties as readonly string[]).includes(t.county);
}

/**
 * THE single definition of "which towns have a page".
 *
 * getStaticPaths, the footer, the geo hub and every link rail must all read
 * from this one function. The first build had the footer enumerating towns
 * with its own filter while the route builder used another, so the footer
 * linked to Skagit pages that were never generated — the harness caught it as
 * dead links on all 95 pages. One source, or they drift again.
 */
export function builtTowns(): Town[] {
  const skagitOk = isReady(business.territory.skagitConfirmed)
    ? business.territory.skagitConfirmed === true
    : false;
  return towns.filter(
    (t) =>
      inTerritory(t) &&
      /* Explicit owner decision beats geography. A town inside a serviced
         county is still not ours if we do not run there. */
      t.serviced !== false &&
      tierFor(t) !== 'area' &&
      (t.county === 'Whatcom County' || skagitOk),
  );
}

/**
 * The radius, in road miles from Bellingham, of the smallest circle that
 * contains every community we serve — or null when no such circle is honest.
 *
 * This exists for schema `serviceArea` as a GeoCircle, and it is derived
 * rather than chosen because a chosen number is a claim nobody checked. Two
 * facts decide it, both already in towns.ts:
 *
 *   - the farthest community we actually serve (Sedro-Woolley, 30 miles), and
 *   - the nearest community the owner explicitly EXCLUDED.
 *
 * If the first is not strictly smaller than the second, a circle centered here
 * would swallow a town we have said on the record that we do not run — Point
 * Roberts, Anacortes, La Conner — and this returns null instead. That case is
 * not hypothetical bookkeeping: it is one Skagit row away. Extending south to
 * Lyman or Clear Lake pushes the served maximum past La Conner's 35 miles, at
 * which point the circle stops being true and stops being emitted, without
 * anybody having to remember why.
 *
 * TWO HONEST CAVEATS, because a circle is a coarse instrument.
 *
 *   1. `distanceMi` is ROAD miles and GeoCircle's radius is straight-line.
 *      For Point Roberts those differ enormously — 40 miles of driving through
 *      two border crossings covers about 22 miles of water. So a circle sized
 *      on road distance can still geometrically contain an excluded exclave.
 *   2. Which is why `areaServed` on the Organization stays the AUTHORITATIVE
 *      statement of coverage: it is an enumeration, built from the same
 *      `serviced` filter, and it names places rather than describing a shape.
 *      The GeoCircle is a convenience envelope for consumers that want a
 *      geometry, and it is deliberately the weaker of the two claims.
 */
export function serviceRadiusMiles(): number | null {
  const served = towns.filter((t) => inTerritory(t) && t.serviced !== false);
  const distances = served
    .map((t) => t.distanceMi)
    .filter((d): d is number => typeof d === 'number');
  if (!distances.length) return null;

  const maxServed = Math.max(...distances);
  if (maxServed <= 0) return null;

  const excluded = notServiced()
    .map((t) => t.distanceMi)
    .filter((d): d is number => typeof d === 'number');
  const nearestExcluded = excluded.length ? Math.min(...excluded) : Infinity;

  return maxServed < nearestExcluded ? maxServed : null;
}

/** Neighborhoods, only for towns that actually have a page. */
export function builtNeighborhoods(): { town: Town; n: NonNullable<Town['neighborhoods']>[number] }[] {
  return builtTowns().flatMap((t) => (t.neighborhoods ?? []).map((n) => ({ town: t, n })));
}
