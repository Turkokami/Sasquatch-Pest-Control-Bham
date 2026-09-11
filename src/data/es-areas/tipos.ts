/**
 * Una página de lugar en español: un pueblo, un barrio de un pueblo o uno de
 * los dos condados.
 *
 * LOS NOMBRES DE LUGAR NO SE TRADUCEN. Ferndale es Ferndale en el GPS, en el
 * sobre del correo y en la conversación, y el slug del pueblo es el mismo que
 * en inglés por la misma razón: /es/areas-de-servicio/ferndale/ es la pareja
 * obvia de /locations/ferndale/. Lo que se traduce es la prosa.
 *
 * CADA DATO SALE DE LA PÁGINA INGLESA DE ESE LUGAR (src/content/locations/),
 * que es la que sabe qué calles, qué casas y qué plagas. Keystone v2, directiva
 * 8: ningún nombre de lugar ni ningún hecho local se inventa en la traducción.
 */
export interface EsLugar {
  /** Slug del pueblo en src/data/towns.ts, o 'whatcom-county' / 'skagit-county'. */
  town: string;
  /** Slug del barrio en towns.ts; ausente en una página de pueblo o condado. */
  barrio?: string;
  /** Solo los condados: su slug español (condado-de-whatcom). */
  slugEs?: string;
  /** Como se nombra en el texto y en los rieles. */
  nombre: string;
  h1: string;
  /** Keystone M5: ≤ 60 caracteres. */
  title: string;
  /** Keystone M5: 110–165 caracteres, termina en puntuación. */
  description: string;
  /** Keystone M2: 40–60 palabras. */
  answer: string;
  secciones: { h2: string; parrafos: string[] }[];
  faqs: { q: string; a: string }[];
}
