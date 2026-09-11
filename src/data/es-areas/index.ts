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

import { condadoDeWhatcom } from './condado-de-whatcom';
import { condadoDeSkagit } from './condado-de-skagit';
import { bellingham } from './bellingham';
import { ferndale } from './ferndale';
import { lynden } from './lynden';
import { blaine } from './blaine';
import { everson } from './everson';
import { sumas } from './sumas';
import { nooksack } from './nooksack';
import { acme } from './acme';
import { deming } from './deming';
import { custer } from './custer';
import { suddenValley } from './sudden-valley';
import { birchBay } from './birch-bay';
import { mountVernon } from './mount-vernon';
import { burlington } from './burlington';
import { sedroWoolley } from './sedro-woolley';
import { bow } from './bow';
import { alger } from './alger';
import { blaineSemiahmoo } from './blaine-semiahmoo';
import { blaineBirchBayVillage } from './blaine-birch-bay-village';
import { blaineDowntownBlaine } from './blaine-downtown-blaine';
import { blaineEastBlaine } from './blaine-east-blaine';

export type { EsLugar } from './tipos';

export const esLugares: EsLugar[] = [
  /* Los dos condados */
  condadoDeWhatcom,
  condadoDeSkagit,
  /* Condado de Whatcom */
  bellingham,
  ferndale,
  lynden,
  blaine,
  everson,
  sumas,
  nooksack,
  acme,
  deming,
  custer,
  suddenValley,
  birchBay,
  /* Condado de Skagit */
  mountVernon,
  burlington,
  sedroWoolley,
  bow,
  alger,
  /* Barrios: Blaine */
  blaineSemiahmoo,
  blaineBirchBayVillage,
  blaineDowntownBlaine,
  blaineEastBlaine,
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
