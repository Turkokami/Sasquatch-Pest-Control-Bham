import type { EsGiro } from './tipos';
import { lecheriasYGanado } from './lecherias-y-ganado';
import { procesadorasDeFrutaYAlimentos } from './procesadoras-de-fruta-y-alimentos';
import { marinasYMuelles } from './marinas-y-muelles';
import { restaurantesYServicioDeComida } from './restaurantes-y-servicio-de-comida';
import { escuelasYGuarderias } from './escuelas-y-guarderias';
import { saludYResidenciasDeMayores } from './salud-y-residencias-de-mayores';
import { tiendasYSupermercados } from './tiendas-y-supermercados';
import { departamentosYMultifamiliares } from './departamentos-y-multifamiliares';
import { gobiernoYEdificiosPublicos } from './gobierno-y-edificios-publicos';

export type { EsGiro } from './tipos';

/**
 * Las páginas comerciales en español, una por industria — las nueve que
 * publica el lado inglés. La lista la arma este archivo; los hechos — si la
 * industria tiene página y si está lista — vienen del lado inglés, y la ruta
 * falla si un módulo nombra una industria que el inglés no publica.
 */
export const esGiros: EsGiro[] = [
  lecheriasYGanado,
  procesadorasDeFrutaYAlimentos,
  marinasYMuelles,
  restaurantesYServicioDeComida,
  escuelasYGuarderias,
  saludYResidenciasDeMayores,
  tiendasYSupermercados,
  departamentosYMultifamiliares,
  gobiernoYEdificiosPublicos,
];

export const esGiroPath = (g: EsGiro) => `/es/comercial/${g.slug}/`;
export const enGiroPath = (g: EsGiro) => `/commercial/${g.industry}/`;
