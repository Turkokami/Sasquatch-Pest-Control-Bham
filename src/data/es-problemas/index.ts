import type { EsProblema } from './tipos';
import { esServicios } from '../es-servicios';
import { ratasBajoElPiso } from './ratas-bajo-el-piso';
import { rasgunosEnLasParedesDeNoche } from './rasgunos-en-las-paredes-de-noche';
import { excrementoEnLaCocina } from './excremento-en-la-cocina';
import { roedoresEnElAislamientoDelAtico } from './roedores-en-el-aislamiento-del-atico';

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
];

/** Slug español del servicio padre, leído de src/data/es-servicios/. */
export const esServicioSlugOf = (p: EsProblema) =>
  esServicios.find((s) => s.enPath === `/services/${p.service}/`)?.slug;

export const esProblemaPath = (p: EsProblema) => `/es/servicios/${esServicioSlugOf(p)}/${p.slug}/`;
export const enProblemaPath = (p: EsProblema) => `/services/${p.service}/${p.problem}/`;
