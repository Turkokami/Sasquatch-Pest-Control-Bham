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
import { lyndenDowntownLynden } from './lynden-downtown-lynden';
import { lyndenHomestead } from './lynden-homestead';
import { lyndenMeadowview } from './lynden-meadowview';
import { lyndenSterlingMeadows } from './lynden-sterling-meadows';
import { lyndenNorthPrairie } from './lynden-north-prairie';
import { lyndenPepinCreek } from './lynden-pepin-creek';
import { lyndenFishtrapCreek } from './lynden-fishtrap-creek';
import { ferndaleSandyPoint } from './ferndale-sandy-point';
import { ferndaleDowntownFerndale } from './ferndale-downtown-ferndale';
import { ferndaleMalloyVillage } from './ferndale-malloy-village';
import { ferndaleVistaRidge } from './ferndale-vista-ridge';
import { ferndalePacificHighlands } from './ferndale-pacific-highlands';
import { ferndaleWoodsPoint } from './ferndale-woods-point';
import { ferndaleTheMeadows } from './ferndale-the-meadows';
import { bellinghamAlabamaHill } from './bellingham-alabama-hill';
import { bellinghamBarkley } from './bellingham-barkley';
import { bellinghamCityCenter } from './bellingham-city-center';
import { bellinghamCordata } from './bellingham-cordata';
import { bellinghamEdgemoor } from './bellingham-edgemoor';
import { bellinghamFairhaven } from './bellingham-fairhaven';
import { bellinghamHappyValley } from './bellingham-happy-valley';
import { bellinghamIrongate } from './bellingham-irongate';
import { bellinghamLetteredStreets } from './bellingham-lettered-streets';
import { bellinghamSehome } from './bellingham-sehome';
import { bellinghamSilverBeach } from './bellingham-silver-beach';
import { bellinghamWhatcomFalls } from './bellingham-whatcom-falls';

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
  /* Barrios: Lynden */
  lyndenDowntownLynden,
  lyndenHomestead,
  lyndenMeadowview,
  lyndenSterlingMeadows,
  lyndenNorthPrairie,
  lyndenPepinCreek,
  lyndenFishtrapCreek,
  /* Barrios: Ferndale */
  ferndaleSandyPoint,
  ferndaleDowntownFerndale,
  ferndaleMalloyVillage,
  ferndaleVistaRidge,
  ferndalePacificHighlands,
  ferndaleWoodsPoint,
  ferndaleTheMeadows,
  /* Barrios: Bellingham */
  bellinghamAlabamaHill,
  bellinghamBarkley,
  bellinghamCityCenter,
  bellinghamCordata,
  bellinghamEdgemoor,
  bellinghamFairhaven,
  bellinghamHappyValley,
  bellinghamIrongate,
  bellinghamLetteredStreets,
  bellinghamSehome,
  bellinghamSilverBeach,
  bellinghamWhatcomFalls,
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
