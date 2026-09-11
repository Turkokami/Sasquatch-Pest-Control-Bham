/**
 * Keystone Part 3.3 — Spanish.
 *
 * (Every Spanish file on this site cited "Keystone Part 15" until 10 Sep 2026.
 * In Keystone v2, Part 15 is the reusable starter repo; the multilingual tree
 * is the /es/servicios/{service}/ row of the URL taxonomy in Part 3.3, and
 * Phase 5 of Part 13 is where it falls in the build order. The citations were
 * renumbered rather than left pointing at a part that says something else.)
 *
 * Spanish is served as its own indexable route under /es/, not as a
 * browser-side translation widget. A widget translates in the reader's
 * browser after the page loads, which means Google never sees Spanish and a
 * reader searching in Spanish never finds us — the opposite of the point.
 *
 * THE SCOPE CHANGED ON 10 SEP 2026. It was drawn deliberately small — the
 * pages a customer needs to decide and to call, everything else left in
 * English and saying so. The owner then asked for a full translation, and the
 * six service pages were brought to between 89 and 101 percent of their
 * English twins the same day. The rest of the tier follows in the same way:
 * a page joins PAGE_PAIRS when a real Spanish page exists behind it, and not
 * before, because a half-translated page that switches language mid-sentence
 * still reads worse than an English one.
 *
 * WHAT THIS TIER IS NOT: the Spanish site for a future El Salvador branch.
 * Everything here is written for Spanish speakers in Whatcom and Skagit — it
 * cites WSDA licensing, Washington statute, EPA registrations and a Pacific
 * Northwest climate. Pointed at El Salvador it would advertise a license that
 * does not apply there and a seasonal argument ("it is the rain, not the
 * cold") that is false in the tropics. A Salvadoran branch needs its own
 * property and its own content, kept apart from this one for the same reason
 * Keystone Part 14 keeps this site apart from the Texas franchise. The
 * hreflang here is es-US and must stay es-US.
 *
 * What is NOT translated, on purpose:
 *   - /what-we-use/. It publishes EPA registration numbers and links to
 *     manufacturers' labels. A label is a legal document and a paraphrase of
 *     one is not a label. Spanish readers are sent to the manufacturer's own
 *     Spanish label where the manufacturer publishes one.
 *
 * Everything else is being translated, in the order the owner approved on
 * 10 Sep 2026: main pages and services (done), the pest library (done, 53 of
 * 53), locations (done, 49 of 49: counties, towns and neighborhoods),
 * commercial (done, the hub and 9 of 9 verticals), guides (done, 11 of 11), then
 * blog, problem pages, awards, partners and the gallery. Until a section lands its pages are simply
 * unpaired — reachable in English, and never linked from a Spanish page
 * without an "(en inglés)" mark.
 */

import { esPlagas } from './es-plagas';
import { esLugares, esPathOf, enPathOf } from './es-areas';
import { esGiros, esGiroPath, enGiroPath } from './es-comercial';
import { esGuias, esGuiaPath, enGuiaPath } from './es-guias';

export type Lang = 'en' | 'es';

/**
 * Every page that exists in both languages, English path first. Both
 * directions are derived from this one map, because an hreflang pair that
 * only points one way is ignored by every crawler that reads it, and two
 * hand-maintained lists drift.
 */
export const PAGE_PAIRS: Record<string, string> = {
  '/': '/es/',
  '/services/': '/es/servicios/',
  '/commercial/': '/es/comercial/',
  '/services/rodent-control/': '/es/servicios/control-de-roedores/',
  '/services/wasp-control/': '/es/servicios/control-de-avispas/',
  '/services/ant-control/': '/es/servicios/control-de-hormigas/',
  '/services/spider-control/': '/es/servicios/control-de-aranas/',
  '/services/fly-control/': '/es/servicios/control-de-moscas/',
  '/services/bee-removal/': '/es/servicios/eliminacion-de-abejas/',
  '/services/exclusion-and-repairs/': '/es/servicios/exclusion-y-reparaciones/',
  '/services/termite-control/': '/es/servicios/control-de-termitas/',
  '/services/bed-bug-control/': '/es/servicios/control-de-chinches/',
  '/services/cockroach-control/': '/es/servicios/control-de-cucarachas/',
  '/services/crawlspace-restoration/': '/es/servicios/restauracion-de-espacio-bajo-el-piso/',
  '/services/attic-insulation/': '/es/servicios/aislamiento-de-atico/',
  '/services/wdo-treatment/': '/es/servicios/tratamiento-para-venta-de-casa/',
  '/services/commercial-pest-control/': '/es/servicios/control-de-plagas-comercial/',
  '/services/home-protection-plan/': '/es/servicios/plan-de-proteccion-del-hogar/',
  '/services/carpenter-bee-control/': '/es/servicios/abejas-carpinteras-y-escarabajos/',
  '/services/beetle-control/': '/es/servicios/escarabajos-de-alfombra-y-despensa/',
  '/services/centipede-control/': '/es/servicios/control-de-ciempies/',
  '/services/earwig-control/': '/es/servicios/control-de-tijerillas/',
  '/services/flea-control/': '/es/servicios/control-de-pulgas/',
  '/services/moth-control/': '/es/servicios/control-de-polillas/',
  '/services/silverfish-control/': '/es/servicios/control-de-pececillos-de-plata/',
  '/services/stink-bug-control/': '/es/servicios/control-de-chinches-apestosas/',
  '/pest-library/': '/es/plagas/',
  '/locations/': '/es/areas-de-servicio/',
  '/guides/': '/es/guias/',
  '/our-guarantee/': '/es/garantia/',
  '/about/': '/es/nosotros/',
  '/contact/': '/es/contacto/',
};

/* THE SPECIES PAIRS ARE DERIVED, NOT TYPED. Fifty-three hand-typed rows here
   would be a second list of the Spanish library beside src/data/es-plagas/,
   and the two would drift the first time a slug changed. A species pair
   exists when, and only when, its Spanish module is registered there — and
   the route throws if that module names a species with no English profile,
   so no pair can point at a 404 in either direction. */
for (const p of esPlagas) PAGE_PAIRS[`/pest-library/${p.species}/`] = `/es/plagas/${p.slug}/`;
for (const l of esLugares) PAGE_PAIRS[enPathOf(l)] = esPathOf(l);
for (const g of esGiros) PAGE_PAIRS[enGiroPath(g)] = esGiroPath(g);
for (const g of esGuias) PAGE_PAIRS[enGuiaPath(g)] = esGuiaPath(g);

/** Spanish path -> English path. Derived, never typed twice. */
export const ES_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_PAIRS).map(([en, es]) => [es, en]),
);

/** The counterpart of a page in the other language, or undefined. */
export function altPathFor(path: string): string | undefined {
  return PAGE_PAIRS[path] ?? ES_TO_EN[path];
}

type NavItem = { href: string; label: string };

interface Strings {
  /** Written to <html lang>. */
  htmlLang: string;
  skip: string;
  phoneBarTagline: string;
  navPrimaryLabel: string;
  /**
   * TWELVE, always — see the count note in Header.astro. The chip grid lays
   * out four across above 34rem and three across below, and twelve is the
   * smallest count that divides evenly by both. A shorter Spanish nav would
   * leave a ragged last row on every Spanish page.
   */
  nav: NavItem[];
  utilityNav: NavItem[];
  /** Label on the control that switches to the other language. */
  switchTo: string;
  /** aria-label on that control, in the language being switched TO. */
  switchToAria: string;
  /** Shown on Spanish pages whose onward links lead to English. */
  englishOnwardNote: string;
  callNow: string;
  breadcrumbHome: string;
}

export const UI: Record<Lang, Strings> = {
  en: {
    htmlLang: 'en-US',
    skip: 'Skip to content',
    phoneBarTagline: 'Family-owned pest control & exclusion · Whatcom & Skagit County',
    navPrimaryLabel: 'Primary',
    nav: [
      { href: '/', label: 'Home' },
      { href: '/services/', label: 'Services' },
      { href: '/commercial/', label: 'Commercial' },
      { href: '/locations/', label: 'Service areas' },

      { href: '/pest-library/', label: 'Pest library' },
      { href: '/guides/', label: 'Guides' },
      { href: '/blog/', label: 'Blog' },
      { href: '/gallery/', label: 'Gallery' },

      { href: '/awards/', label: 'Awards' },
      { href: '/what-we-use/', label: 'What we apply' },
      { href: '/about/', label: 'About' },
      { href: '/contact/', label: 'Contact' },
    ],
    utilityNav: [
      { href: '/our-guarantee/', label: 'Our guarantee' },
      { href: '/trusted-partners/', label: 'Trusted partners' },
      { href: '/network/', label: 'Our network' },
    ],
    switchTo: 'Español',
    switchToAria: 'Ver esta página en español',
    englishOnwardNote: '',
    callNow: 'Call now',
    breadcrumbHome: 'Home',
  },
  es: {
    htmlLang: 'es-US',
    skip: 'Saltar al contenido',
    phoneBarTagline: 'Control de plagas y exclusión, empresa familiar · Condados de Whatcom y Skagit',
    navPrimaryLabel: 'Principal',
    /* Generated from PAGE_PAIRS so it can only ever list pages that exist.
       Adding a Spanish page is one line in that map plus a label here; the
       masthead picks it up and no link can dangle in the meantime. The grid
       wants twelve (see Header.astro) and reaches it when the set is
       complete — a short row while pages land beats a dead link. */
    nav: [],
    /* Deliberately empty. The English utility row points at three pages that
       are not translated; linking a Spanish reader into English from the
       masthead is the drift this scope was drawn to avoid. */
    utilityNav: [],
    switchTo: 'English',
    switchToAria: 'View this page in English',
    englishOnwardNote:
      'Algunas páginas están en inglés: las etiquetas de los productos que aplicamos, que son documentos legales y se quedan como las publica el fabricante, y por ahora los premios, el blog y la galería. Si necesita cualquiera de esas en español, llámenos y se lo explicamos por teléfono.',
    callNow: 'Llame ahora',
    breadcrumbHome: 'Inicio',
  },
};

/** Spanish nav labels, keyed by Spanish path. */
const ES_LABELS: Record<string, string> = {
  '/es/': 'Inicio',
  '/es/servicios/': 'Servicios',
  '/es/servicios/control-de-roedores/': 'Roedores',
  '/es/servicios/control-de-avispas/': 'Avispas',
  '/es/servicios/control-de-hormigas/': 'Hormigas',
  /* Comercial took the Abejas chip on 10 Sep 2026, again to keep the grid at
     twelve. The English masthead links /commercial/ third, and the Spanish one
     now does too; bees are one click away on /es/servicios/. */
  '/es/comercial/': 'Comercial',
  /* Took the Moscas chip on 10 Sep 2026, to keep the grid at twelve. The
     English masthead links its pest library and the Spanish one should too;
     flies are still one click away on /es/servicios/. */
  '/es/plagas/': 'Biblioteca de plagas',
  '/es/areas-de-servicio/': 'Áreas de servicio',
  /* Guías took the Arañas chip on 10 Sep 2026, the third service chip to
     give way so the grid stays at twelve. Spiders are one click away on
     /es/servicios/. */
  '/es/guias/': 'Guías',
  '/es/garantia/': 'Nuestra garantía',
  '/es/nosotros/': 'Quiénes somos',
  '/es/contacto/': 'Contacto',
};

UI.es.nav = Object.values(PAGE_PAIRS)
  .filter((esPath) => esPath in ES_LABELS)
  .map((esPath) => ({ href: esPath, label: ES_LABELS[esPath] }));

export const t = (lang: Lang = 'en') => UI[lang];
