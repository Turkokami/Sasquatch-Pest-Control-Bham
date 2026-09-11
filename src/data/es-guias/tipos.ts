/**
 * Keystone Part 3.3 — la forma de una guía en español.
 *
 * Solo el texto. Las fuentes, la fecha de revisión, el aviso legal, el grupo
 * y si está lista se leen de la guía inglesa en src/content/guides/: una guía
 * tiene una sola lista de fuentes, y una traducción que llevara la suya
 * podría citar algo distinto de lo que cita el original.
 */
export interface EsGuia {
  /** Slug de la guía inglesa en src/content/guides/. */
  guide: string;
  /** Slug en español, bajo /es/guias/. */
  slug: string;
  /** Etiqueta corta para migas, hub y rieles. */
  nav: string;
  h1: string;
  title: string;
  description: string;
  answer: string;
  /**
   * Orden de una sección: `parrafos`, luego `cita`, luego `lista`, luego
   * `despues`. La cita es texto legal: va en inglés, como lo publicó quien lo
   * escribió, marcada lang="en", y seguida de nuestra traducción dicha como
   * traducción — una ley parafraseada no es la ley.
   */
  secciones: {
    h2: string;
    parrafos: string[];
    cita?: { en: string; es: string };
    lista?: string[];
    despues?: string[];
  }[];
  faqs: { q: string; a: string }[];
}
