/**
 * Keystone Part 15 — Spanish.
 *
 * Spanish is served as its own indexable route under /es/, not as a
 * browser-side translation widget. A widget translates in the reader's
 * browser after the page loads, which means Google never sees Spanish and a
 * reader searching in Spanish never finds us — the opposite of the point.
 *
 * The scope is deliberate and it is not the whole site. These are the pages a
 * customer actually needs to decide and to call. Everything else stays in
 * English and says so, because a half-translated page that switches language
 * mid-sentence reads worse than an English one.
 *
 * What is NOT translated, on purpose:
 *   - /what-we-use/. It publishes EPA registration numbers and links to
 *     manufacturers' labels. A label is a legal document and a paraphrase of
 *     one is not a label. Spanish readers are sent to the manufacturer's own
 *     Spanish label where the manufacturer publishes one.
 *   - /awards/, /blog/, /guides/. Long-form English that no purchase depends
 *     on. They are reachable, they are just not duplicated.
 */

export type Lang = 'en' | 'es';

/**
 * Every page that exists in both languages, English path first. Both
 * directions are derived from this one map, because an hreflang pair that
 * only points one way is ignored by every crawler that reads it, and two
 * hand-maintained lists drift.
 */
export const PAGE_PAIRS: Record<string, string> = {
  '/': '/es/',
  '/contact/': '/es/contacto/',
};

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
      'Algunas páginas de referencia — las etiquetas de los productos que aplicamos, los premios y la guía técnica — están solo en inglés. Si necesita cualquiera de esas en español, llámenos y se lo explicamos por teléfono.',
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
  '/es/servicios/control-de-aranas/': 'Arañas',
  '/es/servicios/control-de-moscas/': 'Moscas',
  '/es/servicios/eliminacion-de-abejas/': 'Abejas',
  '/es/areas-de-servicio/': 'Áreas de servicio',
  '/es/garantia/': 'Nuestra garantía',
  '/es/nosotros/': 'Quiénes somos',
  '/es/contacto/': 'Contacto',
};

UI.es.nav = Object.values(PAGE_PAIRS)
  .filter((esPath) => esPath in ES_LABELS)
  .map((esPath) => ({ href: esPath, label: ES_LABELS[esPath] }));

export const t = (lang: Lang = 'en') => UI[lang];
