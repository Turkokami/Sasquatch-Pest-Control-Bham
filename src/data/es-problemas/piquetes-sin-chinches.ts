import type { EsProblema } from './tipos';

/** Fuente: src/content/problems/bites-but-no-bugs-found.md. La verificación
 *  de chinches se cobra: aquí no se ofrece ninguna visita gratis. Los ácaros
 *  de nido van solo con roedores; el caso de otros nidos se dice sin nombrar
 *  el animal, porque ese trabajo no es nuestro. */
export const piquetesSinChinches: EsProblema = {
  service: 'bed-bug-control',
  problem: 'bites-but-no-bugs-found',
  slug: 'piquetes-sin-chinches',
  nav: 'Piquetes, pero ninguna chinche',
  h1: 'Piquetes, Pero Ninguna Chinche',
  title: 'Piquetes Pero Ninguna Chinche: Qué Sigue',
  description:
    '¿Le salen marcas en la noche y en la cama no aparece nada? Qué descarta una búsqueda a fondo, qué más deja las mismas marcas y a dónde ir. Tel. 360-410-2199.',
  answer:
    'Tener piquetes sin encontrar ningún insecto es común y frustrante, y tiene muchas causas posibles. Una búsqueda a fondo que no encuentra nada es información útil de verdad, porque cambia la pregunta: deja de ser qué hay en el cuarto y pasa a ser qué otra cosa produce esas mismas marcas.',
  secciones: [
    {
      h2: 'Una situación difícil de verdad',
      parrafos: [
        'Salen marcas en la noche, dan comezón y parecen piquetes, y la cama y el cuarto ya se revisaron varias veces sin resultado. Algo le está pasando a la piel de alguien en su propia cama y la explicación obvia no se confirma. Merece una respuesta directa y sin prisa, no una tranquilidad rápida ni un tratamiento rápido.',
      ],
    },
    {
      h2: 'Por qué un piquete solo dice poco',
      parrafos: [
        'La reacción de la piel a un piquete cambia muchísimo de una persona a otra. Con la chinche de cama, buena parte de la gente no reacciona, y en quien sí, la marca puede salir días después: dos personas en la misma cama, una llena de marcas y la otra con nada.',
        'También pasa al revés. Los dermatólogos son claros en que ninguna lesión se identifica como piquete de chinche solo por cómo se ve, y la famosa fila de tres es un patrón aproximado, no un diagnóstico. Una marca dice que algo pasa, no qué, y no alcanza para tratar una recámara.',
      ],
    },
    {
      h2: 'Lo que establece una búsqueda bien hecha',
      parrafos: [
        'Una búsqueda negativa pesa porque la chinche esconde mal su evidencia aunque se esconda bien ella: deja manchitas oscuras de sangre digerida en sábanas, costuras y cabecera, mudas pálidas, cinco por insecto, y huevos pegados en las grietas.',
        'Sus escondites se pueden predecir: cerca de quien duerme, en costuras y superficies ásperas o de tela. Una búsqueda a fondo cubre el colchón por las dos caras, el box spring, las uniones de la base, la cabecera por detrás, el buró, la orilla de la alfombra y el zoclo. Si nada de eso da manchas, mudas ni insectos, la chinche es muy poco probable. No imposible en las primeras semanas de una llegada, y conviene decirlo claro en vez de darle vueltas hasta un tratamiento.',
      ],
    },
    {
      h2: 'Otras cosas que pican de noche',
      lista: [
        'Pulgas: pican en tobillos y pantorrillas, van con las mascotas, y saltan, cosa que la chinche no hace.',
        'Mosquitos: piquetes sueltos y sin ningún rastro.',
        'Ácaros de un nido de roedores: piquetes que empiezan de golpe, en un solo cuarto y sin insecto visible. Lo explicamos abajo.',
        'La sarna, un ácaro que vive en la piel y no en la casa: comezón nocturna intensa, asunto médico, y ningún control de plagas la quita.',
      ],
      parrafos: [],
    },
    {
      h2: 'Lo que marca la piel sin picar',
      parrafos: [
        'Es la categoría que casi nadie considera. La larva del escarabajo de alfombra, común en las casas de aquí, suelta pelitos erizados que, según Penn State, provocan con la exposición larga una alergia adquirida: ronchas con comezón que no se distinguen de un piquete, sin que haya habido piquete. Vive en orillas de alfombra, clósets y telas guardadas, y encontrarla es un hallazgo con arreglo.',
        'Y hay más: un detergente, suavizante o colchón nuevo, que marca justo donde la tela toca la piel; la piel reseca por la calefacción del invierno; un medicamento; un eccema. No somos médicos y no opinamos cuál es. Lo que sí establecemos con certeza es si hay un artrópodo en el cuarto, la pregunta que un médico no puede contestar.',
      ],
    },
    {
      h2: 'Antes de la visita, y si hay mascotas',
      parrafos: [
        'Si puede, atrape algo con cinta transparente o en una bolsa cerrada: termina la discusión en treinta segundos. Tome fotos fechadas de las marcas y anote qué noches salieron, a quién y dónde durmió cada quien. Anote lo que cambió: un colchón, un detergente, un viaje, un mueble usado, ruido en el ático. Y no limpie la recámara a fondo antes de la búsqueda, porque quita justo la evidencia que buscamos.',
        'Las mascotas son la explicación que más se pasa por alto. Peine al animal sobre una superficie clara y busque puntitos oscuros que se ponen rojizos al mojarlos. Y cuando un animal deja la casa, las pulgas que se quedaron sin huésped salen a buscar otro, y los piquetes empiezan de repente. Si hay animales, díganoslo.',
      ],
    },
    {
      h2: 'Los ácaros de nido',
      parrafos: [
        'Cuando el nido es de ratas o ratones, somos justo a quienes hay que llamar. Los ácaros que viven en un roedor no molestan a la gente mientras tienen huésped. Cuando el roedor se va o se muere, porque se atendió la población o se abandonó el nido, bajan por la estructura y tratan de alimentarse de lo que encuentren.',
        'El patrón se reconoce: piquetes que empiezan de golpe, sin viaje ni mueble nuevo, en un cuarto, muchas veces una recámara bajo el entretecho; ningún insecto visto, porque casi no se ven a simple vista; y a menudo ruido en el techo que paró hace dos semanas o un problema de roedores recién tratado. La respuesta no es tratar la recámara sino sacar el nido con su material y cerrar la abertura, que es trabajo de control de roedores y exclusión. Si el nido resulta ser de otro animal, se lo decimos y le indicamos a quién llamar.',
      ],
    },
    {
      h2: 'Por qué no tratamos por si acaso',
      parrafos: [
        'Aplicar insecticida junto a la cama donde alguien duerme se justifica cuando hay algo que tratar. Si la causa no es un insecto, las marcas siguen, con varios cientos de dólares menos y la angustia de un tratamiento que parece fallido. Y cierra el camino útil: un negativo claro es lo que permite llevar la pregunta al médico con confianza.',
      ],
    },
    {
      h2: 'Lo que vale un resultado negativo, y lo que sigue',
      parrafos: [
        'Hay quien siente que pagó por nada. Pagó por convertir una preocupación en un dato, se ahorró un tratamiento más caro, y tiene algo concreto para su médico: una búsqueda profesional no encontró artrópodos que piquen donde duerme.',
        'Si las marcas siguen, hay pasos sensatos: vasos interceptores bajo las patas y fundas claras en colchón y box spring, que en unas semanas hacen visible una población muy chica; buscar donde la persona también duerme, como un sillón o un carro; buscar un nido en el ático y el espacio bajo el piso; revisar por escarabajo de alfombra. Y si todo sale limpio, la recomendación honesta es un médico, y un dermatólogo si sigue.',
        'Cuéntenos qué ve, desde cuándo, si alguien más está afectado, si hay mascotas y si ha habido ruido en la estructura. La verificación tiene costo, que se descuenta del tratamiento si lo hay; es la única revisión nuestra que se cobra. No tratamos un cuarto vacío, y no lo dejamos sin un siguiente paso.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿No encontrar nada quiere decir que no hay nada?',
      a: 'Quiere decir que no apareció evidencia donde se esperaría encontrarla. Para la chinche eso pesa mucho, porque deja manchas, mudas y huevos aunque se esconda bien. Para otras causas es menos concluyente, y le decimos cuáles.',
    },
    {
      q: '¿Pueden estar escondidas donde no buscaron?',
      a: 'La chinche se queda cerca de donde se duerme y sus escondites son predecibles, así que una búsqueda bien hecha los cubre. Si la cama, la base, la cabecera y lo de alrededor no dan manchas ni mudas, es muy poco probable que sean ellas.',
    },
    {
      q: '¿Pueden tratar el cuarto por si acaso?',
      a: 'No. Tratar un cuarto sin actividad confirmada es aplicar producto donde alguien duerme sin razón establecida, y no resuelve nada si la causa no es un insecto.',
    },
    {
      q: '¿Vale la pena pagar la búsqueda si no encuentran nada?',
      a: 'Casi todos dicen que sí. Un negativo claro termina semanas de duda, evita un tratamiento innecesario y lleva la pregunta a un lugar más útil. El costo solo se descuenta si hay tratamiento.',
    },
  ],
};
