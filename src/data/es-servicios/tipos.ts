/**
 * Keystone Part 3.3 — la forma de una página de servicio en español.
 *
 * Este tipo vivía dentro de src/data/es-servicios.ts, junto con las seis
 * páginas, cuando cada una eran cuatrocientas palabras. Al llevarlas a su
 * profundidad real el archivo pasó de las trescientas líneas a varios miles, y
 * un archivo así se vuelve imposible de revisar: nadie encuentra en él la
 * sección de roedores sin buscar, y dos personas que editan dos servicios
 * distintos chocan en el mismo archivo.
 *
 * Ahora es un módulo por servicio dentro de este directorio, con index.ts
 * armando la lista. La ruta de importación no cambió — `../../../data/es-servicios`
 * resuelve al index — así que las plantillas siguen igual.
 */

export interface EsServicio {
  /** Slug en español, bajo /es/servicios/. */
  slug: string;
  /** Ruta en inglés equivalente — la misma pareja que está en PAGE_PAIRS. */
  enPath: string;
  nav: string;
  h1: string;
  title: string;
  description: string;
  answer: string;
  secciones: { h2: string; parrafos: string[] }[];
  faqs: { q: string; a: string }[];
}
