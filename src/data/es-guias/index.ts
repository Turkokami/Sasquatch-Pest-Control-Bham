import type { EsGuia } from './tipos';
import type { GuideClusterKey } from '../guide-clusters';
import { quienPagaElControlDePlagasEnUnaRenta } from './quien-paga-el-control-de-plagas-en-una-renta';
import { controlDePlagasEnEscuelasDeWashington } from './control-de-plagas-en-escuelas-de-washington';
import { organismosQueDestruyenLaMaderaEnUnaVenta } from './organismos-que-destruyen-la-madera-en-una-venta';

export type { EsGuia } from './tipos';

/**
 * Las guías en español. La lista la arma este archivo; las fuentes, la fecha
 * de revisión, el aviso legal, el grupo y si está lista vienen de la guía
 * inglesa, y la ruta falla si un módulo nombra una guía que el inglés no
 * publica.
 */
export const esGuias: EsGuia[] = [
  quienPagaElControlDePlagasEnUnaRenta,
  controlDePlagasEnEscuelasDeWashington,
  organismosQueDestruyenLaMaderaEnUnaVenta,
];

export const esGuiaPath = (g: EsGuia) => `/es/guias/${g.slug}/`;
export const enGuiaPath = (g: EsGuia) => `/guides/${g.guide}/`;

/**
 * Los nombres de los grupos en español. Las claves son las de
 * src/data/guide-clusters.ts y el tipo obliga a tenerlas todas: un grupo nuevo
 * en inglés sin nombre en español no compila.
 */
export const ES_CLUSTERS: Record<GuideClusterKey, { name: string; blurb: string }> = {
  compliance: {
    name: 'Reglas y obligaciones',
    blurb:
      'Lo que dice de verdad la ley sobre plagas en una renta, en una escuela y en un edificio que cambia de dueño, con la ley citada y enlazada para que no tenga que creernos.',
  },
  building: {
    name: 'Edificios y humedad',
    blurb:
      'Por qué los edificios de este clima fallan donde fallan, y cómo eso decide qué plagas llegan. Casi todos los problemas de plagas de aquí empiezan como problemas de agua.',
  },
  seasonal: {
    name: 'El año de las plagas en Whatcom',
    blurb: 'Qué llega y cuándo, y las semanas en que atenderlo sale barato y no caro.',
  },
  practice: {
    name: 'Cómo se hace el trabajo, y cómo contratarlo',
    blurb:
      'Qué quieren decir las palabras del oficio, qué puede lograr un tratamiento y qué no, qué mueve el precio, y cómo distinguir una empresa que vale la pena de una que vende miedo.',
  },
};
