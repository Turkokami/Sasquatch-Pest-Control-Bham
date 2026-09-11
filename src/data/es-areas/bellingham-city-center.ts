import type { EsLugar } from './tipos';

/** Fuente: src/content/locations/bellingham-city-center.md. Eje propio frente a Barkley y
 *  Fairhaven: callejones, sótanos, estacionamientos de varios pisos y locales vacíos. */
export const bellinghamCityCenter: EsLugar = {
  town: 'bellingham',
  barrio: 'city-center',
  nombre: 'City Center',
  h1: 'Control de Plagas en City Center, Centro de Bellingham',
  title: 'Control de Plagas en el Centro de Bellingham',
  description:
    'Control de plagas comercial en el centro de Bellingham: cuadras conectadas, restaurantes, departamentos sobre las tiendas y encierros de basura compartidos.',
  answer:
    'El centro de Bellingham es un problema de cuadra conectada con una dimensión vertical. Los edificios comparten paredes, sótanos y ductos, los restaurantes están debajo de los departamentos, y los callejones de atrás juntan la basura que sostiene a toda la población. Casi nada aquí se resuelve un local a la vez.',
  secciones: [
    {
      h2: 'La cuadra es la unidad',
      parrafos: [
        'Hay un hecho que manda el control de plagas en el centro de Bellingham y casi nadie que renta un local aquí lo sabe: los edificios están unidos, por medianeras, sótanos compartidos y ductos de servicio. Una población de roedores del centro es una sola que usa toda la cuadra, y eso tiene una consecuencia comercial directa: el servicio mensual en un local controla su espacio y no baja el número de animales detrás de la pared. Donde un dueño, un administrador o varios inquilinos trabajan con un solo plan, el resultado cambia de naturaleza; donde esa coordinación no existe — y en el centro muchas veces no —, hacemos buen trabajo en su espacio, sellamos lo que se puede y le decimos claro que lo que compra es el control de su local y no la eliminación de la población de la cuadra. Además aquí vive gente, muchas veces justo arriba de los negocios, y los edificios mueven cosas hacia arriba: calor, olor a comida y pasos de servicio suben juntos, así que un departamento con cucarachas arriba de una cocina muchas veces tiene un problema del edificio y no de limpieza, y un solo programa coordinado le sale mejor a un edificio mixto que un mosaico de contratos.',
      ],
    },
    {
      h2: 'Los callejones, los sótanos y el techo',
      parrafos: [
        'Los callejones del centro son el corredor de servicio de todo el distrito, y ahí vive buena parte de la población: juntan la basura de muchos locales en un tramo corto, dan refugio y caminos, están mal iluminados y casi nadie los camina de noche, y tienen un siglo de estructura acumulada — andenes, escaleras en desuso, cortinas que ya no asientan, escotillas de sótano —. Un callejón no se puede tratar como si fuera de una dirección, y ningún inquilino solo lo arregla; donde varios locales de un callejón se coordinan, la diferencia se ve en una temporada. El centro tiene más espacio bajo tierra de lo que se cree, y los sótanos viejos traen las aberturas más viejas del distrito — entradas de servicio originales, pozos de ventana llenos de basura, cárcamos y tubos abandonados — y es donde más se ven las conexiones entre edificios. Los estacionamientos de varios pisos no son prioridad de nadie y afectan todo lo cercano, y el daño de roedores al cableado de un coche es real y caro. Y en los techos planos cada paso de servicio se sella en un ciclo mucho más corto que el techo mismo: lo que pasa el plano del techo está en el plafón, que en muchos de estos edificios conecta los locales.',
      ],
    },
    {
      h2: 'Cocinas, locales vacíos y cómo trabajamos',
      parrafos: [
        'La cucaracha alemana vive en los huecos y no en las superficies — dentro de los marcos del equipo, detrás de los gabinetes, alrededor de la lavaloza —, así que una cocina limpia no dice nada de lo que hay detrás del equipo, y rociar la cocina cuando están adentro del equipo es teatro. Llega con el cartón, las cajas de verdura, el equipo usado y las entregas de un proveedor compartido. Un local vacío entre inquilinos no tiene a nadie que note nada, así que muchas veces se entrega a un inquilino nuevo con el problema ya adentro, y ese inquilino pasa sus primeros meses creyendo que él lo causó: si va a tomar un local del centro, pregunte qué había antes y cuánto tiempo estuvo vacío, y que alguien mire antes de que entre su equipo. Para un negocio empezamos por sus límites de operación — horario, servicio, acceso, qué se puede colocar y dónde, y lo que pida una auditoría —; luego el exterior y el callejón, la basura, las puertas de servicio, el sótano, el plafón y el techo. Programamos las cocinas temprano o entre servicios.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Tratamos cada mes y seguimos viendo roedores. ¿Por qué?',
      a: 'Porque los edificios del centro están unidos físicamente. Medianeras, sótanos compartidos y ductos de servicio los conectan, así que la población usa la cuadra y no su local. El servicio mensual en un local controla su espacio y no baja el número de animales detrás de la pared.',
    },
    {
      q: 'Nuestra cocina está impecable. ¿Por qué seguimos teniendo cucarachas?',
      a: 'La cucaracha alemana vive en los huecos y no en las superficies: dentro de los marcos del equipo, detrás de los gabinetes, en el hueco de la lavaloza. Una superficie limpia no dice nada de lo que hay detrás del equipo, por eso el tratamiento de superficie casi nunca las resuelve.',
    },
    {
      q: 'Vivo arriba de un restaurante. ¿Por eso tengo un problema?',
      a: 'Muchas veces, aunque no siempre por culpa del restaurante. Los edificios mixtos comparten ductos verticales, y el calor, el olor a comida y los pasos de servicio suben. El arreglo suele ser una conversación de edificio, y se lo decimos en lugar de tratar su departamento una y otra vez.',
    },
  ],
};
