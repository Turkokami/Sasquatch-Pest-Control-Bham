/**
 * Keystone Part 3.3 — la biblioteca de plagas en español.
 *
 * Un módulo por especie en este directorio; este archivo solo los arma. Las
 * parejas de hreflang de cada ficha se derivan de esta lista en i18n.ts, así
 * que agregar una ficha aquí es todo lo que hace falta para que las dos
 * páginas se nombren una a la otra — y scripts/tests/es-plagas.test.ts falla
 * si una ficha nombra una especie que no está en src/data/pests.ts o que no
 * tiene ficha en inglés.
 *
 * Mismo estándar de inclusión que pests.ts, sin excepción: una especie aparece
 * aquí solo si su ficha inglesa existe. La biblioteca española no puede
 * afirmar que algo vive en este condado cuando la inglesa no lo afirma.
 */
import type { EsPlaga } from './tipos';
import { hormigaCarpintera } from './hormiga-carpintera';
import { hormigaDeHumedad } from './hormiga-de-humedad';
import { hormigaOlorosa } from './hormiga-olorosa';
import { hormigaDePavimento } from './hormiga-de-pavimento';
import { hormigaAterciopelada } from './hormiga-aterciopelada';
import { hormigaDeMonticulo } from './hormiga-de-monticulo';
import { hormigaFantasma } from './hormiga-fantasma';
import { hormigaFaraon } from './hormiga-faraon';
import { hormigaLadrona } from './hormiga-ladrona';
import { hormigaDeInvierno } from './hormiga-de-invierno';
import { hormigaPonerina } from './hormiga-ponerina';
import { hormigaCosechadora } from './hormiga-cosechadora';
import { hormigaAphaenogaster } from './hormiga-aphaenogaster';
import { rataNoruega } from './rata-noruega';
import { rataDeTecho } from './rata-de-techo';
import { ratonCasero } from './raton-casero';
import { ratonCiervo } from './raton-ciervo';
import { topillo } from './topillo';
import { aranaGiganteDeCasa } from './arana-gigante-de-casa';
import { aranaVagabunda } from './arana-vagabunda';
import { aranaDeCruz } from './arana-de-cruz';
import { aranaDeSotano } from './arana-de-sotano';
import { aranaSacoAmarilla } from './arana-saco-amarilla';
import { avisponCaraBlanca } from './avispon-cara-blanca';
import { avispaPapeleraEuropea } from './avispa-papelera-europea';
import { avispaAmarillaOccidental } from './avispa-amarilla-occidental';
import { avispaAmarillaAerea } from './avispa-amarilla-aerea';
import { abejaDeMiel } from './abeja-de-miel';
import { abejorro } from './abejorro';
import { avispaExcavadoraDorada } from './avispa-excavadora-dorada';
import { avispaQueCargaPasto } from './avispa-que-carga-pasto';
import { avispaDeLodo } from './avispa-de-lodo';
import { termitaDeMaderaHumeda } from './termita-de-madera-humeda';
import { escarabajoAnobido } from './escarabajo-anobido';
import { abejaCarpintera } from './abeja-carpintera';
import { gorgojoDeLaMadera } from './gorgojo-de-la-madera';
import { moscaDeRacimo } from './mosca-de-racimo';
import { chincheDelArce } from './chinche-del-arce';
import { mariquitaAsiatica } from './mariquita-asiatica';
import { chincheDeLaConifera } from './chinche-de-la-conifera';
import { chincheApestosaMarmoleada } from './chinche-apestosa-marmoleada';
import { pececilloDePlata } from './pececillo-de-plata';
import { tijerilla } from './tijerilla';
import { cochinilla } from './cochinilla';
import { milpies } from './milpies';

export type { EsPlaga } from './tipos';
export { ES_GRUPOS, ES_VEREDICTO, ES_GRUPO_SERVICIO } from './grupos';

export const esPlagas: EsPlaga[] = [
  /* Hormigas */
  hormigaCarpintera,
  hormigaDeHumedad,
  hormigaOlorosa,
  hormigaDePavimento,
  hormigaAterciopelada,
  hormigaDeMonticulo,
  hormigaFantasma,
  hormigaFaraon,
  hormigaLadrona,
  hormigaDeInvierno,
  hormigaPonerina,
  hormigaCosechadora,
  hormigaAphaenogaster,
  /* Roedores */
  rataNoruega,
  rataDeTecho,
  ratonCasero,
  ratonCiervo,
  topillo,
  /* Arañas */
  aranaGiganteDeCasa,
  aranaVagabunda,
  aranaDeCruz,
  aranaDeSotano,
  aranaSacoAmarilla,
  /* Insectos con aguijón */
  avisponCaraBlanca,
  avispaPapeleraEuropea,
  avispaAmarillaOccidental,
  avispaAmarillaAerea,
  abejaDeMiel,
  abejorro,
  avispaExcavadoraDorada,
  avispaQueCargaPasto,
  avispaDeLodo,
  /* Plagas de la estructura */
  termitaDeMaderaHumeda,
  escarabajoAnobido,
  abejaCarpintera,
  gorgojoDeLaMadera,
  /* Invasores ocasionales */
  moscaDeRacimo,
  chincheDelArce,
  mariquitaAsiatica,
  chincheDeLaConifera,
  chincheApestosaMarmoleada,
  pececilloDePlata,
  tijerilla,
  cochinilla,
  milpies,
];

export const esPlagaPorEspecie = (species: string) => esPlagas.find((p) => p.species === species);
