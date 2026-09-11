/**
 * Keystone Part 3.3 — la forma de una página comercial por industria, en
 * español. Una por cada página en inglés de src/content/industries/, nunca
 * más: la ruta en inglés genera una página por industria escrita, y la
 * española sirve solo las industrias que la inglesa sirve.
 */
export interface EsGiro {
  /** Slug en inglés — el campo `industry` de src/content/industries/. */
  industry: string;
  /** Slug en español, bajo /es/comercial/. */
  slug: string;
  /** Etiqueta corta para el selector del hub y el riel de hermanos. */
  nav: string;
  h1: string;
  title: string;
  description: string;
  answer: string;
  /** `lista`, si la hay, se pinta después de los párrafos de la sección. */
  secciones: { h2: string; parrafos: string[]; lista?: string[] }[];
  faqs: { q: string; a: string }[];
}
