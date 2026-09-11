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

export type { EsServicio } from './tipos';

export const esServicios: EsServicio[] = [
  controlDeRoedores,
  controlDeAvispas,
  controlDeHormigas,
  controlDeAranas,
  controlDeMoscas,
  eliminacionDeAbejas,
];

export const esServicioBySlug = (slug: string) => esServicios.find((s) => s.slug === slug);
