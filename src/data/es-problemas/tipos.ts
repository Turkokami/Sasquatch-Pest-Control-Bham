/**
 * Keystone Part 3.3 — la forma de una página de problema en español, debajo
 * de su servicio: /es/servicios/<servicio>/<problema>/.
 *
 * Una por cada página inglesa de /services/<service>/<problem>/. El servicio y
 * el problema se nombran con sus slugs ingleses, porque de allá vienen los
 * hechos: si el problema existe bajo ese servicio y si está listo. El slug
 * español del servicio sale de src/data/es-servicios/, nunca se escribe aquí.
 */
export interface EsProblema {
  /** Slug del servicio inglés en src/data/services.ts. */
  service: string;
  /** Slug del problema inglés — el campo `problem` de src/content/problems/. */
  problem: string;
  /** Slug en español, el último segmento de la ruta. */
  slug: string;
  /** Etiqueta corta para migas y rieles. */
  nav: string;
  h1: string;
  title: string;
  description: string;
  answer: string;
  secciones: { h2: string; parrafos: string[]; lista?: string[] }[];
  faqs: { q: string; a: string }[];
}
