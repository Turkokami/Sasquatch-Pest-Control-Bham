/**
 * Keystone Part 3.3 — la lista de páginas de servicio en español.
 *
 * Un módulo por servicio en este directorio; este archivo solo los arma. El
 * orden de la lista es el orden en que aparecen en /es/servicios/ y en el riel
 * "Otros servicios", así que se escribe a mano y no se deriva del sistema de
 * archivos.
 *
 * Regla heredada de services.ts: nunca inventar un servicio. Cada entrada aquí
 * tiene su pareja en inglés en PAGE_PAIRS (src/data/i18n.ts), y la prueba
 * scripts/tests/es-servicios.test.ts falla si alguna no la tiene.
 */
import type { EsServicio } from './tipos';
import { controlDeRoedores } from './control-de-roedores';
import { controlDeAvispas } from './control-de-avispas';
import { controlDeHormigas } from './control-de-hormigas';
import { controlDeAranas } from './control-de-aranas';
import { controlDeMoscas } from './control-de-moscas';
import { eliminacionDeAbejas } from './eliminacion-de-abejas';
import { exclusionYReparaciones } from './exclusion-y-reparaciones';
import { controlDeTermitas } from './control-de-termitas';
import { controlDeChinches } from './control-de-chinches';
import { controlDeCucarachas } from './control-de-cucarachas';
import { restauracionDeEspacioBajoElPiso } from './restauracion-de-espacio-bajo-el-piso';
import { aislamientoDeAtico } from './aislamiento-de-atico';
import { tratamientoParaVentaDeCasa } from './tratamiento-para-venta-de-casa';
import { controlDePlagasComercial } from './control-de-plagas-comercial';
import { planDeProteccionDelHogar } from './plan-de-proteccion-del-hogar';
import { abejasCarpinterasYEscarabajos } from './abejas-carpinteras-y-escarabajos';
import { escarabajosDeAlfombraYDespensa } from './escarabajos-de-alfombra-y-despensa';
import { controlDeCiempies } from './control-de-ciempies';
import { controlDeTijerillas } from './control-de-tijerillas';
import { controlDePulgas } from './control-de-pulgas';
import { controlDePolillas } from './control-de-polillas';
import { controlDePececillosDePlata } from './control-de-pececillos-de-plata';
import { controlDeChinchesApestosas } from './control-de-chinches-apestosas';

export type { EsServicio } from './tipos';

export const esServicios: EsServicio[] = [
  controlDeRoedores,
  controlDeAvispas,
  controlDeHormigas,
  controlDeAranas,
  controlDeMoscas,
  eliminacionDeAbejas,
  exclusionYReparaciones,
  controlDeTermitas,
  controlDeChinches,
  controlDeCucarachas,
  restauracionDeEspacioBajoElPiso,
  aislamientoDeAtico,
  tratamientoParaVentaDeCasa,
  controlDePlagasComercial,
  planDeProteccionDelHogar,
  abejasCarpinterasYEscarabajos,
  escarabajosDeAlfombraYDespensa,
  controlDeCiempies,
  controlDeTijerillas,
  controlDePulgas,
  controlDePolillas,
  controlDePececillosDePlata,
  controlDeChinchesApestosas,
];

export const esServicioBySlug = (slug: string) => esServicios.find((s) => s.slug === slug);
