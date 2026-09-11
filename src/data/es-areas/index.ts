/**
 * Keystone Part 3.3 — las páginas de lugar en español.
 *
 * Un módulo por lugar en este directorio; este archivo solo los arma. Las
 * parejas de hreflang se derivan de esta lista en i18n.ts, así que un lugar
 * entra a PAGE_PAIRS cuando su página española existe, y no antes.
 *
 * Rutas:
 *   pueblo   /es/areas-de-servicio/<town>/            ↔ /locations/<town>/
 *   barrio   /es/areas-de-servicio/<town>/<barrio>/   ↔ /locations/<town>/<barrio>/
 *   condado  /es/areas-de-servicio/<slugEs>/          ↔ /locations/<town>/
 */
import type { EsLugar } from './tipos';

import { everson } from './everson';
import { sumas } from './sumas';
import { nooksack } from './nooksack';
import { acme } from './acme';

export type { EsLugar } from './tipos';

export const esLugares: EsLugar[] = [
  /* Condado de Whatcom */
  everson,
  sumas,
  nooksack,
  acme,
];

export const COUNTY_TOWNS = ['whatcom-county', 'skagit-county'] as const;
export const isCounty = (l: EsLugar) => (COUNTY_TOWNS as readonly string[]).includes(l.town);

/** La ruta española de un lugar. */
export const esPathOf = (l: EsLugar) =>
  l.barrio
    ? `/es/areas-de-servicio/${l.town}/${l.barrio}/`
    : `/es/areas-de-servicio/${l.slugEs ?? l.town}/`;

/** La ruta inglesa de la que es pareja. */
export const enPathOf = (l: EsLugar) =>
  l.barrio ? `/locations/${l.town}/${l.barrio}/` : `/locations/${l.town}/`;

export const esPueblo = (town: string) => esLugares.find((l) => l.town === town && !l.barrio);
export const esBarrio = (town: string, barrio: string) =>
  esLugares.find((l) => l.town === town && l.barrio === barrio);
