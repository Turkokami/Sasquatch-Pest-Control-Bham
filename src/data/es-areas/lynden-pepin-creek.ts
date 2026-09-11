import type { EsLugar } from './tipos';

/** Fuente: src/content/locations/lynden-pepin-creek.md. Redactada aparte de
 *  lynden-sterling-meadows.ts: las dos son vivienda nueva sobre campo, y esta se centra en
 *  la obra activa y el arroyo en restauración. */
export const lyndenPepinCreek: EsLugar = {
  town: 'lynden',
  barrio: 'pepin-creek',
  nombre: 'Pepin Creek',
  h1: 'Control de Plagas en la Zona de Pepin Creek, Lynden',
  title: 'Control de Plagas en Pepin Creek, Lynden',
  description:
    'Control de plagas en la zona de Pepin Creek: casas nuevas sobre antiguo campo, obra activa, un arroyo que se realinea y franjas protegidas junto al agua.',
  answer:
    'Pepin Creek es la zona de crecimiento del oeste de Lynden, donde se levanta vivienda nueva sobre tierra que se cultivaba hasta hace poco y el arroyo mismo se está realineando como un corredor de ribera nuevo. La obra, el campo y un cauce protegido se juntan aquí al mismo tiempo.',
  secciones: [
    {
      h2: 'Una zona en pleno cambio',
      parrafos: [
        'La zona de Pepin Creek es la parte del pueblo que se está volviendo otra cosa: tierra agrícola donde se construye, un cauce protegido que se restaura y obra activa en medio. Cada una tiene su consecuencia de plagas, y juntas dan un patrón que no da ni un barrio asentado ni un fraccionamiento terminado. La tierra no deja de ser lo que era el día que llegan los topógrafos: el campo carga una población de roedores de generaciones, y al limpiar y nivelar, lo que vivía ahí se desplaza en días a lo más cercano, que en una obra son las casas nuevas. Por eso tanta gente aquí tiene ratones a las semanas de mudarse a una casa de pocos meses, y se siente como un juicio sobre la casa cuando no lo es. Y el terreno de alrededor todavía se trabaja, así que la cosecha manda su propia ola.',
        'Vivir junto a una obra activa trae olas de llamadas, y no quiere decir que algo se descompuso para siempre: cada fase que se limpia, cada calle que se abre, cada zanja de servicios o estanque que se forma desplaza lo que vivía en ese pedazo, y cada una manda su ola chica a lo más cercano. Juzgar su casa por una temporada tranquila engaña en los dos sentidos; cierre el edificio por sus propios méritos y deja de importar lo que pase al lado.',
      ],
    },
    {
      h2: 'El corredor del arroyo, y el agua de la obra',
      parrafos: [
        'Un corredor de ribera que se restaura y se protege no es lugar para aplicar plaguicidas: lo que cae en tierra que drena al corredor llega al agua. En la práctica el trabajo en ese lindero es más lento y mecánico — estaciones cerradas, trampas y exclusión —, y una cotización más barata que consista en rociar la franja del arroyo no es un servicio comparable: es uno distinto y peor, y no la vamos a cotizar. El corredor además se va a volver mejor hábitat con el tiempo, porque ese es el punto de restaurarlo, así que la presión en ese lindero no es algo pasajero de la obra; esa es la razón para gastar en herrajes ahora, con la casa nueva y el suelo accesible. Y el agua de la obra se separa en dos: las instalaciones de lluvia diseñadas — estanques, cunetas, jardines de lluvia — casi no crían nada que moleste a una casa; el agua accidental de una obra — charcos en llantas, lonas, zanjas que no drenan — sí cría mosquitos, y nada que se aplique a su casa lo cambia.',
      ],
    },
    {
      h2: 'La ventana abierta ahora, y qué preguntar al comprar',
      parrafos: [
        'Hoy las plantas son nuevas, chicas y separadas, y en casi todas las casas se puede ver y alcanzar el cimiento completo: es una ventaja real y temporal. Todo barrio maduro del condado cuenta lo mismo — plantas puestas con la casa nueva que crecieron hasta pegarse al revestimiento sobre una capa honda de material —, así que dejar un espacio de verdad entre planta y pared y el mantillo fuera del revestimiento cuesta nada ahora. La línea de la bomba de calor suele ser el agujero más grande de la envoltura, casi siempre relleno con espuma y tapado con una canaleta de plástico que atiende el clima y nada más. Si va a comprar aquí, pregunte qué se hizo para excluir roedores — aparte del sellado de aire —, qué cubre la garantía y por cuánto tiempo, y qué hay detrás del lote y qué plan tiene: franja del arroyo, drenaje pluvial, una fase futura o campo que se va a construir. La visita empieza por lo que rodea la casa, luego los puntos de falla conocidos de la obra nueva, los sofitos para las avispas, y abajo con una luz, que en una casa nueva deja una línea base limpia para después.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Por qué tuvimos ratones en cuanto nos mudamos?',
      a: 'Porque se removió la tierra. Limpiar y nivelar desplazan en días lo que vivía en un campo, y se van a lo más cercano, que en una obra son las casas nuevas. Es un evento y no un juicio sobre el edificio, y por eso importa tanto cerrar pronto los huecos de la construcción.',
    },
    {
      q: 'La casa es nuevecita. ¿Cómo entra algo?',
      a: 'Apretado no es sellado. La obra nueva se detalla contra el aire y el agua, y la exclusión de roedores es otra especificación. Las fallas constantes son los pasos cerrados con espuma, la malla de ventila engrapada y las esquinas de abajo de la puerta de la cochera.',
    },
    {
      q: '¿Pueden tratar cerca del corredor del arroyo?',
      a: 'Con rociado de perímetro no, y esa restricción es correcta: lo que se aplica en tierra que drena a un corredor de ribera llega al agua. En ese lindero se usan estaciones cerradas, trampas y exclusión física, que para roedores dura más.',
    },
  ],
};
