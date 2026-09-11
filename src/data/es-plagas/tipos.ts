/**
 * Keystone Part 3.3 — la forma de una ficha de la biblioteca de plagas en
 * español, bajo /es/plagas/.
 *
 * Solo lleva lo que se traduce. Todo lo que es un HECHO sobre la especie y no
 * una frase — el nombre científico, el grupo, el veredicto de tratamiento, con
 * qué se confunde, las fuentes y la fecha de revisión — se lee de la ficha
 * inglesa (src/content/pests/<species>.md) y de src/data/pests.ts. Una ficha
 * española que llevara su propia copia del veredicto podría decir "lo
 * tratamos" mientras la inglesa dice "no lo tratamos", y ese es justo el tipo
 * de deriva entre dos listas que este proyecto sigue encontrando.
 */
export interface EsPlaga {
  /** Slug en español, bajo /es/plagas/. */
  slug: string;
  /** Slug de la especie en src/data/pests.ts; la ficha inglesa es /pest-library/<species>/. */
  species: string;
  /** Nombre común como lo diría un lector de aquí. */
  nombre: string;
  h1: string;
  title: string;
  description: string;
  answer: string;
  secciones: { h2: string; parrafos: string[] }[];
  faqs: { q: string; a: string }[];
}
