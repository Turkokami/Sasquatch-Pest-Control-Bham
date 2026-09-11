import type { EsServicio } from './tipos';

/**
 * Chinches de cama, en español. Fuente: la versión en inglés en
 * src/content/services/bed-bug-control.md. Escrita dentro de la banda de
 * Keystone v2 para un servicio.
 *
 * DOS COSAS QUE EL ARNÉS REVISA AQUÍ, Y POR QUÉ:
 *   · Los precios ($150 la visita de verificación, $395 por cuarto) salen de
 *     business.ts y el chequeo 2b falla cualquier cifra que no esté allá. Si
 *     cambian, cambian allá primero.
 *   · Las chinches son la ÚNICA excepción a la visita sin costo
 *     (business.freeInspection.exceptions). El chequeo 2c falla esta página si
 *     ofrece una visita gratuita sin una negación o una excepción al lado, así
 *     que toda mención de la visita gratuita aquí va acompañada de por qué no
 *     aplica a las chinches.
 */
export const controlDeChinches: EsServicio = {
  slug: 'control-de-chinches',
  enPath: '/services/bed-bug-control/',
  nav: 'Chinches',
  h1: 'Control de Chinches de Cama en Bellingham y el Condado de Whatcom',
  title: 'Control de Chinches de Cama en Bellingham, WA',
  description:
    'Chinches de cama en Bellingham y el condado de Whatcom: visita de verificación de $150, luego $395 por cuarto con áreas comunes incluidas. Llame al 360-410-2199.',
  answer:
    'Confirmamos que son chinches antes de que alguien pague por tratarlas. Una visita de verificación de $150 establece qué tiene de verdad, y se descuenta del tratamiento si sigue adelante, así que no le cuesta nada si trata. El tratamiento es de $395 por cuarto, con las áreas comunes incluidas.',
  secciones: [
    {
      h2: '¿Por qué verificamos primero, y por qué se cobra?',
      parrafos: [
        'Casi todas las empresas agendan un tratamiento de chinches con una llamada. Nosotros no, porque una parte importante de las llamadas por chinches que recibimos no son chinches.',
        'La visita de verificación de $150 existe para contestar una sola pregunta antes de que gaste algo en tratamiento: ¿de verdad es lo que usted cree? Un técnico revisa bien las áreas donde se duerme y los escondites — costuras, box spring, cabecera, uniones de la base, zoclo, placas de contactos, muebles de junto — y encuentra insectos vivos, mudas, huevos o manchas de excremento, o no los encuentra.',
        'Los $150 se descuentan del tratamiento si sigue adelante. Si encontramos chinches y decide tratar, la visita no le cuesta nada: nada más adelantó parte del precio a cambio de certeza. Si no las encontramos, pagó $150 para no pagar un tratamiento que no necesitaba, y tiene una respuesta clara de qué revisar en su lugar.',
        'Por eso las chinches son la única excepción a nuestra visita gratuita. Una búsqueda de chinches es otro tipo de trabajo: toma tiempo de verdad, implica desarmar una cama, y buena parte de ellas no encuentran nada. Cobrarla y descontarla es lo que nos deja hacerla bien y no rápido.',
      ],
    },
    {
      h2: '¿Cuánto cuesta el tratamiento?',
      parrafos: [
        'El tratamiento es de $395 por cuarto, y las áreas comunes van incluidas en lugar de contarse como cuartos extra. Un departamento de una recámara con la recámara infestada y una sala donde la persona ha estado durmiendo no se cobra como dos cuartos más un pasillo.',
        'Publicamos estos números porque las chinches son el único servicio donde el alcance es lo bastante predecible para ponerle precio honesto por adelantado. Todo lo demás lo cotizamos después de ver el lugar, porque un espacio bajo el piso de cuarenta y cinco centímetros y uno donde se puede estar de pie no son el mismo trabajo. Con las chinches es distinto: un cuarto es un cuarto.',
        'De todos modos recibe el total por escrito antes de empezar, y las visitas de seguimiento que son parte del plan son parte del precio, no una segunda factura.',
      ],
    },
    {
      h2: '¿Por qué las picaduras son la peor evidencia?',
      parrafos: [
        'Es lo más útil de esta página, así que va arriba. La reacción a las picaduras falla en las dos direcciones. La publicación ENTFACT-636 de la Universidad de Kentucky reporta que como treinta por ciento de las personas no muestran ninguna reacción aunque las piquen una y otra vez, y que la proporción es todavía mayor en adultos mayores. No tener picaduras no prueba nada: muchas infestaciones las encuentra alguien que llevaba meses durmiendo en el cuarto sin una marca.',
        'Y al revés: muchas cosas producen ronchas chicas que dan comezón y quedan en fila — pulgas, ácaros, una reacción alérgica, un problema de piel, o un mosquito que se metió. La reacción puede tardar desde minutos hasta más de una semana, lo que vuelve casi inútil la pregunta de dónde estaba cuando lo picaron.',
        'Así que no diagnosticamos por las picaduras. Diagnosticamos por los insectos, sus huevos, sus mudas y sus manchas, porque eso es evidencia física que existe o no existe.',
      ],
    },
    {
      h2: '¿Qué hay que buscar?',
      parrafos: [
        'El insecto adulto es del tamaño y la forma de una semilla de manzana: plano, café rojizo, y más redondo y oscuro después de alimentarse. Los inmaduros son más chicos y mucho más pálidos — casi transparentes sin comer —, por eso la gente no los ve.',
        'Las manchas de excremento son puntitos oscuros que se corren en la tela como tinta en papel secante, porque son sangre digerida y no algo sólido. Se concentran donde descansan los insectos, así que hay que ver las costuras y los dobleces, no la superficie abierta de la sábana. Las mudas son cáscaras transparentes: la chinche muda cinco veces, y encontrarlas quiere decir que ahí se está reproduciendo una población, no que una se subió de paso. Los huevos miden como un milímetro, blanco perla, pegados en grietas y costuras, y son de verdad difíciles de ver; también son la razón por la que un solo tratamiento casi nunca alcanza.',
        'Dónde buscar, en orden: las costuras y los botones del colchón; el box spring, incluido debajo de la tela de abajo; las uniones de la base, sobre todo donde se junta madera con madera; la cabecera, más si está fija a la pared. Luego hacia afuera: el buró, el zoclo detrás de la cama, las placas de contactos y apagadores, la orilla de la alfombra y cualquier mueble tapizado donde alguien duerma.',
        'La chinche se queda cerca de donde la gente duerme. Una infestación casi siempre es un problema de recámara y no de toda la casa, y eso es buena noticia para el costo.',
      ],
    },
    {
      h2: '¿Con qué se confunden?',
      parrafos: [
        'La larva del escarabajo de alfombra es la falsa alarma más común: chica, peludita, aparece en la ropa de cama, y en algunas personas causa una irritación de piel que parece picadura.',
        'La chinche de murciélago es una posibilidad real en las casas viejas de Bellingham con murciélagos en el ático, y es pariente cercana que se ve casi igual. La diferencia importa, porque el arreglo de verdad es sacar la colonia de murciélagos, y eso es trabajo de un especialista en fauna, no nuestro. Tratar la recámara mientras la colonia sigue arriba del techo no resuelve nada.',
        'El escarabajo araña, el piojo de los libros y las pulgas completan la lista. Las pulgas en particular se confunden con chinches seguido, y el tratamiento es completamente distinto. Para eso es la visita de verificación.',
      ],
    },
    {
      h2: '¿Cómo llegan, y quiere decir que la casa está sucia?',
      parrafos: [
        'No. La chinche es un problema de viaje y de muebles. No sube del jardín, no la atraen las sobras de comida, y no tiene nada que ver con la limpieza. Llega en una maleta, en una mochila, en un mueble de segunda mano, con una visita, o a través de una pared compartida.',
        'Lo decimos claro porque la vergüenza alrededor de esta plaga cuesta caro de verdad. La gente espera semanas para llamar porque cree que una infestación dice algo de ellos, y en esas semanas un problema chico y localizado se vuelve uno grande y regado. Las chinches aparecen todo el tiempo en casas impecables y en hoteles buenos. Es un problema de logística, no de moral.',
      ],
    },
    {
      h2: '¿Hay un patrón en Bellingham?',
      parrafos: [
        'Dos. El primero es el cinturón de rentas estudiantiles: Sehome, Happy Valley, la orilla del campus de Western y los edificios de alrededor corren con el calendario escolar, y eso quiere decir que una cantidad enorme de muebles y pertenencias se mueve entre unidades cada junio y cada septiembre. Esa rotación es exactamente como viaja la chinche. Los muebles usados que pasan de una casa de estudiantes a otra son la vía más común que vemos en el condado.',
        'El segundo es el aumento de enero. Los viajes de las fiestas regresan a la gente al condado con maletas que estuvieron en hoteles, aeropuertos y casas ajenas, y las llamadas se notan en enero y hasta febrero. Aparte de esos dos, aplican las fuentes de siempre: rentas vacacionales, trabajo en hotelería, instalaciones de salud y de adultos mayores, y cualquier casa con visitas que se quedan a dormir seguido.',
      ],
    },
    {
      h2: '¿Por qué la preparación es casi todo el trabajo?',
      parrafos: [
        'Aquí es donde el tratamiento funciona o fracasa, y es de lo que menos se avisa. Un tratamiento en un cuarto sin preparar casi se desperdicia. El desorden les da escondites a los que no llegamos. La ropa de cama que no se lavó y se secó a temperatura alta vuelve a sembrar el cuarto. Los muebles pegados a la pared tapan justo la unión que más necesitamos revisar. Las cosas amontonadas en el piso convierten un trabajo de dos horas en uno imposible.',
        'Por eso le damos una lista de preparación por escrito antes de la visita, y — esto es lo que importa — si el cuarto no está listo, cambiamos la cita en lugar de tratar. A veces eso molesta, y siempre es lo correcto: tratar un cuarto sin preparar es cobrar por un trabajo que no va a aguantar, y tener la misma conversación en tres semanas. La cláusula de cooperación del cliente en nuestra garantía existe por eso mismo.',
      ],
    },
    {
      h2: '¿Qué no debo hacer?',
      parrafos: [
        'No tire el colchón ni los muebles. Es el instinto más caro que hay. Arrastrar un colchón infestado por un pasillo y una escalera reparte el problema por todo el edificio, y habrá comprado un colchón nuevo para un cuarto que sigue infestado. Una funda protectora después del tratamiento cuesta una fracción de un mueble nuevo.',
        'No use una bomba fumigadora. Los aerosoles de descarga total no entran en las grietas donde de verdad viven las chinches, y el efecto repelente las empuja más adentro de las paredes y hacia los cuartos de junto — o, en un departamento, a las unidades de junto. Las bombas hacen el trabajo más grande y más caro, sin falta.',
        'No se vaya a dormir al sillón ni al cuarto de visitas. Es lo más natural, y es como un problema de recámara se vuelve de toda la casa: la chinche sigue el dióxido de carbono y el calor del cuerpo, y a donde usted duerme, van. Y no empiece a rociar con productos de la tienda antes de que revisemos: los insectos regados son más difíciles de encontrar, y se revuelve la evidencia que necesitamos para confirmar.',
      ],
    },
    {
      h2: '¿Qué pasa en departamentos y rentas?',
      parrafos: [
        'En un edificio de varias unidades, el límite entre departamentos es un concepto legal, no físico. Las chinches pasan de uno a otro por los huecos de pared, las corridas de plomería compartidas y los ductos eléctricos, y la razón más común de que un trabajo en un edificio fracase es tratar la unidad que se quejó mientras las de los lados, arriba y abajo quedan sin tocar. En una infestación seria, el alcance honesto incluye revisar las unidades de junto y a veces tratarlas: un número más grande al principio y uno mucho más chico en el año siguiente.',
        'Sobre quién paga: la ley de propietario e inquilino de Washington, RCW 59.18.060, pone el control de plagas del lado del propietario, con una excepción cuando la vivienda es una casa unifamiliar o cuando la infestación la causó el inquilino. En un edificio de varias unidades la obligación por lo general es del dueño; en una casa rentada muchas veces no. Trabajamos con inquilinos, dueños y administradores, y donde la respuesta dependa de cuál es usted, se lo decimos.',
      ],
    },
    {
      h2: '¿Cómo es el tratamiento, y qué pasa después?',
      parrafos: [
        'Escogemos el método según la situación en lugar de vender el mismo para todo: el cuarto, los muebles, qué tan extendida está y el tipo de edificio cambian lo que tiene sentido. Calor, aplicación dirigida, fundas, monitoreo y trabajo estructural hacen cada uno algo que los otros no. Lo constante es que el tratamiento va a los escondites y no regado sobre las superficies, que le decimos qué proponemos y por qué antes de que acepte, y que el seguimiento se planea desde el principio.',
        'Cuente con más de una visita. Los huevos están bien protegidos y no responden como los insectos activos, así que una segunda visita en el momento en que eclosionan es parte del plan. Ver actividad en los días después de un tratamiento es normal y no es señal de que falló: los insectos que se molestan se mueven más. Y cuente con unas semanas para que se calme: confirmar que funcionó quiere decir varias revisiones sin encontrar nada, no una noche tranquila.',
      ],
    },
    {
      h2: '¿Son peligrosas?',
      parrafos: [
        'No se sabe que las chinches transmitan enfermedades a las personas. Lo que causan es una reacción de piel localizada, y en algunas personas una reacción alérgica más fuerte. Una picadura rascada se puede infectar, que es la complicación médica real más común, y es una complicación común y corriente. El daño más grande casi siempre es el sueño y el estrés: quien sabe que hay insectos en su cama deja de dormir bien, y eso tiene consecuencias reales en unas semanas. Si alguien en la casa está reaccionando mal a las picaduras, esa conversación es con un médico; nosotros atendemos los insectos.',
      ],
    },
    {
      h2: '¿Y en hoteles, rentas vacacionales y residencias?',
      parrafos: [
        'En hoteles, moteles y rentas vacacionales, lo útil es revisar por ciclo en lugar de tratar cuando llega una queja. Encontrar una unidad a tiempo es un cuarto fuera de servicio un par de días; encontrarla después de que se quejaron tres huéspedes es un problema de reputación y muchas veces varios cuartos de junto. El personal de limpieza es el mejor sistema de detección que tiene una propiedad, y casi nunca lo capacitan para saber qué buscar.',
        'Las residencias de adultos mayores y las instalaciones de salud agregan dos cosas: muchas veces el residente no puede preparar su cuarto, así que la preparación tiene que ser parte del servicio, y la sensibilidad reducida hace que las picaduras pasen desapercibidas y la infestación dure más antes de que alguien la reporte. En todos estos, documentamos qué se revisó, qué se encontró y qué se hizo, porque ahí el registro es parte de lo que se entrega.',
      ],
    },
    {
      h2: '¿Qué hago cuando viajo?',
      parrafos: [
        'Diez minutos de costumbre evitan casi todo lo que tratamos en enero. En el cuarto, ponga la maleta en el portamaletas lejos de la cama, no en la cama ni en el piso. Levante la sábana en la cabecera del colchón y revise la costura y la orilla de la cabecera antes de desempacar. Al regresar, desempaque directo a la lavandería y pase todo por la secadora en calor alto — el que hace el trabajo es la secadora, no el lavado — y guarde la maleta fuera de la recámara.',
        'Y trate los muebles de segunda mano como sospechosos hasta revisarlos, sobre todo los tapizados y los que tienen armazón. Un mueble gratis en la banqueta de un barrio de estudiantes en junio está gratis por una razón más seguido de lo que la gente cree. Si recibe visitas seguido, lave y seque en caliente la ropa de cama del cuarto de visitas después de cada estancia y dele una revisada a las costuras unos días después: los cuartos que se usan poco son donde una infestación tiene más ventaja.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Cuánto cuesta el tratamiento de chinches?',
      a: 'La visita de verificación cuesta $150 y se descuenta completa del tratamiento si sigue adelante, así que si encontramos chinches y trata, no le cuesta nada. El tratamiento es de $395 por cuarto, con pasillos y salas incluidos en lugar de cobrarse como cuartos extra.',
    },
    {
      q: 'Tengo picaduras pero no encuentro ningún bicho. ¿Son chinches?',
      a: 'Tal vez no. Las picaduras son la evidencia menos confiable que hay: como treinta por ciento de la gente no reacciona aunque la piquen muchas veces, y muchas cosas que no son chinches dejan marcas parecidas. Por eso verificamos primero.',
    },
    {
      q: '¿Tiro el colchón?',
      a: 'Casi nunca, y por favor no antes de que revisemos. Sacar un colchón infestado por el edificio reparte el problema en pasillos y escaleras, y habrá comprado uno nuevo para un cuarto que sigue infestado. Una funda después del tratamiento cuesta una fracción.',
    },
    {
      q: '¿Cuántos tratamientos hacen falta?',
      a: 'Cuente con más de uno. Los huevos están protegidos y no responden como los insectos activos, así que un seguimiento cuando eclosionan es parte del trabajo, no señal de que algo salió mal. Lo programamos desde el principio.',
    },
    {
      q: 'Vivo en un departamento. ¿Hay que tratar al vecino también?',
      a: 'Muy probablemente. Las chinches pasan entre unidades por las paredes y los ductos, y tratar un departamento mientras los de junto quedan sin tocar es la razón más común de que un trabajo así falle. En un edificio de varias unidades, la ley de Washington por lo general pone el control de plagas del lado del propietario.',
    },
  ],
};
