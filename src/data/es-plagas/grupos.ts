/**
 * Los grupos, los veredictos y el riel "qué hacer" de la biblioteca, en
 * español. Las claves son las mismas de src/data/pests.ts y del esquema de la
 * colección, y están tipadas contra ellas: agregar un grupo o un veredicto en
 * inglés sin su versión aquí rompe la compilación en lugar de dejar una ficha
 * con un hueco.
 */
import type { PestGroupKey } from '../pests';

export const ES_GRUPOS: Record<PestGroupKey, { nombre: string; blurb: string }> = {
  ants: {
    nombre: 'Hormigas',
    blurb:
      'La causa número uno de llamadas aquí, y el grupo donde identificar cambia más la respuesta: la hormiga carpintera y la hormiga de humedad piden trabajos de verdad distintos.',
  },
  rodents: {
    nombre: 'Roedores',
    blurb:
      'Espacios bajo el piso, áticos y huecos de pared — y, en el caso del topillo, el césped y no el edificio. La especie decide por dónde anda, qué le hace al aislamiento y al cableado, y si el trabajo es nuestro.',
  },
  spiders: {
    nombre: 'Arañas',
    blurb:
      'Casi todas inofensivas, confundidas a cada rato, y el grupo donde la respuesta honesta más seguido es que no hace falta tratar.',
  },
  stinging: {
    nombre: 'Insectos con aguijón',
    blurb:
      'Avispas, avispones y abejas. A unos los tratamos y a otros no; la diferencia, y la razón, están en cada ficha.',
  },
  structural: {
    nombre: 'Plagas de la estructura',
    blurb:
      'Los organismos que dañan el edificio mismo. Aquí casi todos siguen a la humedad en lugar de atacar madera sana.',
  },
  invaders: {
    nombre: 'Invasores ocasionales',
    blurb:
      'Llegan por temporada, no hacen nada y se van. Casi todo este grupo se resuelve sellando, no tratando.',
  },
  'fabric-pantry': {
    nombre: 'Plagas de telas y despensa',
    blurb:
      'Las que llegan adentro de algo que usted compró. Encontrar la fuente importa más que tratar el cuarto.',
  },
  biting: {
    nombre: 'Plagas que pican',
    blurb:
      'El grupo del que la gente más quiere una respuesta rápida, y donde una identificación equivocada cuesta más.',
  },
};

/** Las mismas cuatro frases fijas de la ficha inglesa, elegidas por el mismo enum. */
export const ES_VEREDICTO: Record<'treat' | 'depends' | 'rarely-warranted' | 'we-do-not', string> = {
  treat: 'Esto lo tratamos, y encontrarlo por lo general justifica tratar.',
  depends: 'A veces conviene tratar y a veces no: depende de lo que se explica abajo.',
  'rarely-warranted': 'Casi nunca conviene tratarlo. Por lo general es un trabajo de sellado o de limpieza.',
  'we-do-not': 'Esto no lo tratamos. Abajo está a dónde acudir.',
};

/** El servicio de cada grupo — la misma tabla que GROUP_SERVICE en la plantilla
 *  inglesa, apuntando a la pareja española de cada página. */
export const ES_GRUPO_SERVICIO: Record<PestGroupKey, { href: string; label: string }> = {
  ants: { href: '/es/servicios/control-de-hormigas/', label: 'Control de hormigas en el condado de Whatcom' },
  rodents: { href: '/es/servicios/control-de-roedores/', label: 'Control y exclusión de roedores' },
  spiders: { href: '/es/servicios/control-de-aranas/', label: 'Control de arañas' },
  stinging: { href: '/es/servicios/control-de-avispas/', label: 'Control de avispas y avispones' },
  structural: { href: '/es/servicios/tratamiento-para-venta-de-casa/', label: 'Tratamiento de organismos que dañan la madera' },
  invaders: { href: '/es/servicios/control-de-chinches-apestosas/', label: 'Insectos que pasan el invierno adentro' },
  'fabric-pantry': { href: '/es/servicios/control-de-polillas/', label: 'Polillas y plagas de la despensa' },
  biting: { href: '/es/servicios/control-de-chinches/', label: 'Chinches de cama y plagas que pican' },
};
