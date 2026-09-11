import type { EsProblema } from './tipos';
import { esServicios } from '../es-servicios';
import { ratasBajoElPiso } from './ratas-bajo-el-piso';
import { rasgunosEnLasParedesDeNoche } from './rasgunos-en-las-paredes-de-noche';
import { excrementoEnLaCocina } from './excremento-en-la-cocina';
import { roedoresEnElAislamientoDelAtico } from './roedores-en-el-aislamiento-del-atico';
import { sellarUnaRendijaDeUnCuartoDePulgada } from './sellar-una-rendija-de-un-cuarto-de-pulgada';
import { mallaParaLasVentilasBajoElPiso } from './malla-para-las-ventilas-bajo-el-piso';
import { hormigasEnLaCocina } from './hormigas-en-la-cocina';
import { hormigasDeHumedadYAgua } from './hormigas-de-humedad-y-agua';
import { hormigasCarpinterasEnUnaVentana } from './hormigas-carpinteras-en-una-ventana';
import { aserrinBajoLaMoldura } from './aserrin-bajo-la-moldura';
import { termitasDeMaderaHumedaBajoElPiso } from './termitas-de-madera-humeda-bajo-el-piso';
import { maderaBlandaEnElAlfeizar } from './madera-blanda-en-el-alfeizar';
import { avispasDentroDeUnaPared } from './avispas-dentro-de-una-pared';
import { avispasAmarillasEnElPasto } from './avispas-amarillas-en-el-pasto';
import { nidoDeAvisponEnUnArbol } from './nido-de-avispon-en-un-arbol';

export type { EsProblema } from './tipos';

/**
 * Las páginas de problema en español. La lista la arma este archivo; los
 * hechos vienen del lado inglés, y la ruta falla si un módulo nombra un
 * problema que el inglés no publica o un servicio sin página en español.
 */
export const esProblemas: EsProblema[] = [
  ratasBajoElPiso,
  rasgunosEnLasParedesDeNoche,
  excrementoEnLaCocina,
  roedoresEnElAislamientoDelAtico,
  sellarUnaRendijaDeUnCuartoDePulgada,
  mallaParaLasVentilasBajoElPiso,
  hormigasEnLaCocina,
  hormigasDeHumedadYAgua,
  hormigasCarpinterasEnUnaVentana,
  aserrinBajoLaMoldura,
  termitasDeMaderaHumedaBajoElPiso,
  maderaBlandaEnElAlfeizar,
  avispasDentroDeUnaPared,
  avispasAmarillasEnElPasto,
  nidoDeAvisponEnUnArbol,
];

/** Slug español del servicio padre, leído de src/data/es-servicios/. */
export const esServicioSlugOf = (p: EsProblema) =>
  esServicios.find((s) => s.enPath === `/services/${p.service}/`)?.slug;

export const esProblemaPath = (p: EsProblema) => `/es/servicios/${esServicioSlugOf(p)}/${p.slug}/`;
export const enProblemaPath = (p: EsProblema) => `/services/${p.service}/${p.problem}/`;
