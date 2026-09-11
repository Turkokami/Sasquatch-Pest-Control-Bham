import type { EsLugar } from './tipos';

/** Fuente: src/content/locations/lynden-north-prairie.md. La sección inglesa sobre aves en
 *  los edificios de la granja (redes, trabajo de aves, retirado) no se traduce. */
export const lyndenNorthPrairie: EsLugar = {
  town: 'lynden',
  barrio: 'north-prairie',
  nombre: 'North Prairie',
  h1: 'Control de Plagas en North Prairie, Lynden',
  title: 'Control de Plagas en North Prairie, Lynden',
  description:
    'Control de plagas en North Prairie: lecherías y moras en producción, cuartos de alimento, cobertizos de maquinaria, roedores del granero y moscas.',
  answer:
    'North Prairie es tierra de granja en producción y no una calle residencial, y eso cambia el trabajo por completo. El alimento guardado, el ensilaje, los cobertizos de maquinaria y los establos abiertos sostienen roedores todo el año, y la temporada de moscas es un asunto de producción y no una molestia.',
  secciones: [
    {
      h2: 'Dos tipos de edificio, y solo uno se cierra',
      parrafos: [
        'Una granja no se trata como una casa ni se debe vender como una. En cada operación de aquí hay edificios que se pueden cerrar — el cuarto del alimento, la sala de leche, el taller, la caseta de bomba, la oficina, el depósito de grano o suplemento y la casa — y edificios que no — el establo abierto, el cobertizo de descanso, el pajar, el techado de maquinaria —, y separarlos es lo primero que hacemos: con eso el plan se simplifica mucho. El cuarto del alimento es donde el dinero rinde más, y muchas veces el edificio peor defendido: concentrado, suplemento, grano y minerales en un espacio tibio y seco son la mejor comida en millas. Lo cambian tres cosas sin chiste — una puerta que cierre contra el umbral, contenedores con tapa y lo regado recogido —, y lo regado es lo que más se subestima.',
      ],
    },
    {
      h2: 'Las moscas nacen en el material, y la etiqueta manda',
      parrafos: [
        'En una lechería el control de moscas es primero manejo de material y después tratamiento, y quien empieza por las moscas adultas empezó en el lugar equivocado. La mosca doméstica y la de los establos se crían en el estiércol, la cama sucia, el ensilaje echado a perder en la cara del silo, el alimento regado en el comedero y las orillas mojadas de bebederos y drenajes; el desarrollo empieza en cuanto el material se calienta, mucho antes de que alguien note adultas, y cuando se ven en cantidad en la sala de ordeña ya hay varias generaciones detrás. Lo que funciona es aburrido y eficaz: mover el material, voltear la cama y atender los criaderos temprano, y la razón para que importe más allá de la comodidad es la producción. Y en una granja lo que se puede aplicar y dónde lo decide la etiqueta, no la preferencia: una etiqueta es un documento legal, y un producto aprobado para un perímetro o un cobertizo muchas veces no lo está cerca del alimento, el agua o los animales. Le mostramos la etiqueta, cada producto que manejamos está publicado en el sitio con su registro de la EPA, y donde no se puede aplicar nada lo decimos y usamos exclusión, trampas y manejo de material.',
      ],
    },
    {
      h2: 'Roedores, maquinaria y cómo trabajamos',
      parrafos: [
        'Un animal que comió cebo puede ser comido por otro — un búho, un halcón, un gato de granero —, así que el riesgo se maneja con la colocación, en estaciones cerradas y fuera del alcance, y la exclusión es la mitad grande del trabajo porque sellar un edificio es lo único de roedores que no hay que repetir. Cuando se corta o se cosecha un campo que sostuvo una población todo el verano, llega una ola a los edificios con un hueco, y se ve venir. Una máquina quieta todo el invierno es un edificio para un roedor, y de los buenos: diez minutos por máquina antes de guardarla — sacar lo comestible, abrir las cabinas — y estaciones alrededor del cobertizo hacen casi todo. Las plagas del cultivo de la mora son asunto de un agrónomo y no nuestro; donde se cruzan es en la empacadora y el enfriador, que son un local de comida con todo lo que implica. Empezamos recorriendo toda la operación, porque el edificio con el síntoma casi nunca es el de la fuente, y trabajamos alrededor de la ordeña.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Pueden trabajar alrededor del horario de ordeña?',
      a: 'Sí, y planeamos alrededor de él en lugar de esperar que la granja se acomode a nosotros. Díganos la rutina al agendar: casi todo lo que hacemos en una lechería cabe entre ordeñas, y lo que no se puede hacer en un área que no se esté usando en ese momento.',
    },
    {
      q: '¿Dónde se puede aplicar producto en una granja?',
      a: 'Lo decide la etiqueta, no la preferencia, y la etiqueta es concreta sobre las áreas de alimento. Un producto aprobado para un perímetro o un cobertizo muchas veces no lo está cerca del alimento, el agua o los animales. Trabajamos con la etiqueta y se la mostramos.',
    },
    {
      q: '¿Por qué el problema de moscas empieza antes de que haga calor?',
      a: 'Porque empieza en la cama y el estiércol y no en el aire. Las larvas se desarrollan en cuanto el material se calienta, mucho antes de que se noten adultas, y cuando se ven en cantidad hay varias generaciones detrás. Atender el material temprano gana siempre.',
    },
  ],
};
