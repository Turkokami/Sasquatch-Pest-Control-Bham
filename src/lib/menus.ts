/**
 * Sub-menus for QuickNav — owner's request, 12 Sep 2026: "can we use
 * collapsible menus or sub menus to lessen the visual load. Like north
 * bellingham south bellingham or some equivalent. Maybe zip codes."
 *
 * SERVICES are grouped by the categories services.ts already carries, so a
 * new service lands in the right sub-menu with no change here.
 *
 * NEIGHBORHOODS are grouped by `area` on the town's neighborhood rows. Only
 * Bellingham has areas: every other town has five neighborhoods or fewer, which
 * is already a short list. A town where any listed neighborhood lacks an area
 * gets a flat list rather than a half-grouped one.
 *
 * WHY AREAS AND NOT ZIP CODES. Bellingham has three residential ZIP codes and
 * they cut across the city's official neighborhoods; no source this project
 * could verify maps one to the other. A menu that put a neighborhood under the
 * wrong ZIP would be a claim about somebody's address, so the menu uses plain
 * compass areas, which are orientation rather than boundaries.
 */
import { liveServices, categories } from '../data/services';
import type { Town } from '../data/towns';
import { PAGE_PAIRS } from '../data/i18n';
import { esServicios } from '../data/es-servicios';

export interface MenuLink { href: string; label: string }
export interface MenuGroup { heading: string; links: MenuLink[] }
type Lang = 'en' | 'es';
type Category = keyof typeof categories;

const ES_CATEGORIES: Record<Category, string> = {
  'rodents-birds': 'Roedores y exclusión',
  'stinging-flying': 'Insectos que pican y vuelan',
  household: 'Insectos de la casa',
  structural: 'Termitas y plagas de la estructura',
  exclusion: 'Exclusión, reparaciones y restauración',
  commercial: 'Control de plagas comercial',
};

/** Every live service, grouped by category. On Spanish pages only services
 *  with a Spanish page are listed, under their Spanish menu names. `exclude`
 *  drops one href (the page the reader is already on). */
export function serviceGroups(lang: Lang = 'en', exclude?: string): MenuGroup[] {
  return (Object.keys(categories) as Category[])
    .map((cat) => ({
      heading: lang === 'es' ? ES_CATEGORIES[cat] : categories[cat],
      links: liveServices()
        .filter((s) => s.category === cat)
        .map((s): MenuLink | null => {
          const en = `/services/${s.slug}/`;
          if (lang === 'en') return { href: en, label: s.name };
          const es = PAGE_PAIRS[en];
          const label = esServicios.find((x) => x.enPath === en)?.nav;
          return es && label ? { href: es, label } : null;
        })
        .filter((x): x is MenuLink => x !== null && x.href !== exclude),
    }))
    .filter((g) => g.links.length > 0);
}

/**
 * Every town with a page, grouped by county.
 *
 * WHY THIS EXISTS, 17 Sep 2026. Owner: "we want to grow those areas", naming
 * Mount Vernon, Burlington, Sedro-Woolley and Bow. Search Console says the
 * demand there is real and it is service-shaped — "burlington rodent control",
 * "mount vernon ant control", "rodent exterminator sedro woolley", each sitting
 * around position 6 to 11 with almost no clicks.
 *
 * Every town was already linked from the footer of all 254 pages, so this is
 * not a reachability fix and should not be described as one. What was missing
 * was the link a reader and a crawler read as a statement: the service spokes
 * carried rails for problems and sibling services and named no place at all,
 * and the homepage's own "where we work" rail filtered to Whatcom County, so
 * the strongest page on the site listed one county in its content and both in
 * its footer.
 *
 * Two counties is also why this groups rather than lists. A flat rail of
 * twenty-odd towns hides the second county at the bottom; a county heading
 * says plainly that the company works in both.
 */
export function townGroups(
  towns: readonly { slug: string; name: string; county: string }[],
): MenuGroup[] {
  const order = ['Whatcom County', 'Skagit County'];
  const counties = [
    ...order.filter((c) => towns.some((t) => t.county === c)),
    ...Array.from(new Set(towns.map((t) => t.county))).filter((c) => !order.includes(c)).sort(),
  ];
  return counties.map((county) => ({
    heading: county,
    links: towns
      .filter((t) => t.county === county)
      .map((t) => ({ href: `/locations/${t.slug}/`, label: t.name })),
  }));
}

export type Area = 'north' | 'central' | 'south' | 'east';
const AREA_ORDER: Area[] = ['north', 'central', 'south', 'east'];
const AREA_LABEL: Record<Lang, Record<Area, string>> = {
  en: { north: 'North', central: 'Central', south: 'South', east: 'East & Lake Whatcom' },
  es: { north: 'Norte', central: 'Centro', south: 'Sur', east: 'Este y lago Whatcom' },
};

/** Neighborhood links grouped by area, or undefined when the town has no
 *  areas for every item — the caller then shows a flat list. */
export function neighborhoodGroups(
  town: Town,
  items: { slug: string; href: string; label: string }[],
  lang: Lang = 'en',
): MenuGroup[] | undefined {
  const areaOf = (slug: string) => town.neighborhoods?.find((n) => n.slug === slug)?.area;
  if (items.length === 0 || items.some((i) => !areaOf(i.slug))) return undefined;
  return AREA_ORDER
    .map((a) => ({
      heading: AREA_LABEL[lang][a],
      links: items.filter((i) => areaOf(i.slug) === a).map(({ href, label }) => ({ href, label })),
    }))
    .filter((g) => g.links.length > 0);
}
