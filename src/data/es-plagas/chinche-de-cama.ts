import type { EsPlaga } from './tipos';

/** Fuente: src/content/pests/bed-bug.md. Cada dato viene de ahí y de sus fuentes.
 *  La visita es PAGADA en este servicio: el texto no nombra cifras (viven en
 *  /es/servicios/control-de-chinches/) y offer.ts hace que el formulario y la barra
 *  digan lo mismo — scripts/tests/es-plagas.test.ts lo fija. */
export const chincheDeCama: EsPlaga = {
  slug: 'chinche-de-cama',
  species: 'bed-bug',
  nombre: 'Chinche de cama',
  h1: 'Chinche de Cama — Qué la Confirma y Qué No',
  title: 'Chinche de Cama (Cimex lectularius) en Whatcom',
  description:
    'Por qué los piquetes no confirman chinches, qué evidencia física sí, y por qué encontrarlas no dice nada sobre qué tan limpia se mantiene una casa.',
  answer:
    'Las chinches de cama no se diagnostican por los piquetes, porque la reacción cambia de persona a persona y cerca del treinta por ciento de la gente nunca reacciona. Lo que las confirma son las manchas de excremento, las mudas, los huevos y los insectos vivos. Llegan en maletas y muebles, y no tienen nada que ver con la limpieza.',
  secciones: [
    {
      h2: 'Lo único que hay que llevarse de esta página',
      parrafos: [
        'Los piquetes no confirman chinches. Nada más en esta página importa tanto como esa frase, y casi todos los errores caros con este insecto empiezan por ignorarla. Una persona puede recibir piquetes cada noche durante meses y no mostrar nada en la piel — Kentucky reporta que cerca del treinta por ciento de la gente no reacciona aunque la piquen una y otra vez, y más entre los adultos mayores —, y otra puede despertar llena de ronchas causadas por un detergente, un ácaro o nada de afuera. Desde dentro de la casa las dos situaciones se ven iguales, y mirar un antebrazo con cuidado no las separa. Lo que las separa es la evidencia física: manchas de excremento, mudas, huevos y los insectos mismos. Eso existe en un cuarto o no existe, y encontrarlo es una búsqueda, no una opinión.',
        'Lo segundo llega justo detrás: las chinches no son un problema de limpieza. El Departamento de Salud de Washington describe a la gente trayéndolas en maletas, muebles, ropa de cama o ropa, y ese es todo el mecanismo. Este insecto come sangre y solo sangre, así que las migajas, los trastes y el polvo no son comida ni el refugio que busca; el desorden solo cambia qué tan difícil es alcanzarlas después. Lo decimos arriba porque la vergüenza cuesta semanas, y esas semanas son justo cuando una introducción en una cama se vuelve una población en el cuarto de al lado.',
      ],
    },
    {
      h2: 'Cómo es el insecto',
      parrafos: [
        'Kentucky pone al adulto en unos tres dieciseisavos de pulgada, café rojizo, ovalado y aplanado: el color de una semilla de manzana en algo del tamaño de una lenteja. El manual del noroeste lo describe como la mitad de un borrador de lápiz, que es la comparación más útil para quien tiene uno pegado en una cinta. Lo que lo identifica es lo plano: sin comer, el cuerpo cabe en una rendija que usted no llamaría rendija. Después de comer, que según el Departamento de Salud toma de tres a diez minutos, el cuerpo se hincha, se alarga y se pone rojo brillante, y parece otro animal; quien ha visto uno comido y uno sin comer muchas veces cree que encontró dos especies. No vuelan ni brincan: caminan, rápido, sobre superficies planas. Las crías pasan por cinco mudas, y Kentucky anota que cada una necesita antes una comida de sangre. Una ninfa recién nacida es casi transparente y mide como un milímetro, por eso las chiquitas pasan meses sin verse en cuartos revisados una y otra vez. Los huevos son blancuzcos, del tamaño de una mota de polvo, y a temperatura de casa eclosionan en más o menos una semana.',
      ],
    },
    {
      h2: 'Las cuatro pruebas, y dónde buscarlas',
      parrafos: [
        'Las manchas de excremento son la prueba más confiable y la primera en aparecer en cantidad. Son sangre digerida, no una bolita seca, así que en la tela se absorben y se corren en la orilla como tinta en papel secante, y en madera pintada o metal secan como un puntito oscuro en relieve. Una hilera de puntos oscuros a lo largo de una costura es lo que deja un grupo que descansa ahí, y se ve mucho más fácil que los insectos que la hicieron. Las mudas son las conchas pálidas y transparentes con forma de chinche que quedan después de cada una de las cinco mudas, y se juntan en lo más hondo del refugio; una muda quiere decir que algo creció en ese punto, o sea reproducción y no un solo insecto que llegó la semana pasada. Los huevos miden un milímetro, son perlados y están pegados, no sueltos: no se quitan con la mano, se esconden en grietas y costuras en grupitos, se ven mal sin una luz de lado, y son la razón de que un tratamiento casi nunca termine el trabajo. Y los insectos son lo menos confiable para salir a buscar, porque son nocturnos y viven en rendijas: encontrarlos confirma, y no encontrarlos no descarta.',
        'Las chinches se quedan cerca de quien duerme, y por eso en una casa sola la infestación suele ser de una recámara y no de la casa. De adentro hacia afuera: el colchón, en cada costura, las dos caras y alrededor de la etiqueta y las agarraderas; el box spring, mejor refugio que el colchón y donde más se pasa por alto, sobre todo bajo la tela de abajo y dentro de los protectores de las esquinas; la base, en cada unión, agujero de tornillo y hueco de tabla; y la cabecera, por delante y por detrás, y la pared de atrás si está fija — una cabecera tapizada es alojamiento de primera. Luego el cuarto: el buró por abajo y en los rieles de los cajones, la orilla de la alfombra contra la pared, el zoclo separado, las placas de contactos y apagadores, la parte de atrás de cuadros y espejos, y cualquier sillón donde alguien toma siesta. El manual del noroeste explica que las infestaciones chicas se quedan cerca de la cama y se extienden por la vivienda al crecer, y por eso la extensión importa tanto en lo que cuesta un trabajo: una temprana está contenida, y una de tiempo no.',
      ],
    },
    {
      h2: 'Cómo viajan, y las paredes compartidas',
      parrafos: [
        'Las cargan: no entran del patio ni las atrae la basura. La ruta principal son las maletas y las cosas personales — una bolsa en el piso de un hotel, una mochila en un dormitorio —, y produce nuestras llamadas de enero, después de los viajes de fin de año. La otra son los muebles de segunda mano o mudados, sobre todo en las rentas de estudiantes de Bellingham, donde muchísimos muebles cambian de manos en junio y en septiembre.',
        'En un dúplex, un edificio de departamentos o una casa vieja dividida en cuartos, el límite entre una renta y otra es una idea legal y no una barrera. La chinche sigue el calor por la línea de la pared, el hueco bajo la puerta, el agujero de un tubo y el hueco detrás del zoclo, y las casas viejas de Bellingham dan los cuatro de sobra. Tratar el cuarto que se quejó sin tocar el que comparte su pared deja el resultado a la suerte del vecino; donde la población está establecida, el alcance sigue a la estructura — el cuarto confirmado, los que comparten pared y la sala común —, y en un edificio de varias unidades lo decide quien lo administra.',
      ],
    },
    {
      h2: 'Chinche o escarabajo de alfombra, y otras confusiones',
      parrafos: [
        'Es la confusión que más dinero cuesta en los dos sentidos. La larva del escarabajo de alfombra es alargada, con cerdas, se mueve como oruguita y vive en las orillas de la alfombra y la lana guardada, comiendo fibra animal y nunca sangre. Algunas personas reaccionan a sus pelos con ronchas sin ningún piquete — Penn State lo describe como una reacción alérgica adquirida, por eso en una misma casa le pasa a una persona y a las demás no —, y quien busca la causa en la recámara llega a las chinches. Lo que las separa es lo que hay alrededor: mudas huecas con cerdas y ninguna mancha en la cama, contra manchas oscuras en costuras y mudas lisas y ovaladas. Las pulgas son la otra confusión: marcas en tobillos y pantorrillas, y un insecto que brinca, cosa que una chinche no puede hacer.',
        'Si los piquetes empezaron de golpe en un cuarto de arriba un par de semanas después de que dejó de oírse ruido en el techo, piense en ácaros que dejó un nido abandonado: es una búsqueda en la estructura, no en la recámara, y es trabajo nuestro. Y si una búsqueda completa del área donde se duerme no encuentra manchas, mudas, huevos ni insectos, eso es un resultado de verdad y no una visita fallida: cierra el camino que tenía a alguien sin dormir, y vale llevarlo al médico como información.',
      ],
    },
    {
      h2: 'Lo que le hacen a la gente, y el calor y el frío',
      parrafos: [
        'El Departamento de Salud de Washington es directo: no se conocen casos de enfermedades infecciosas transmitidas por piquetes de chinche. Lo que causan es una reacción de la piel en quien reacciona, una alergia más fuerte en una minoría e infección donde se rasca, y el mismo departamento nombra la ansiedad, el insomnio y la irritabilidad, la mitad del problema que la gente subestima. La razón de ir rápido no es un peligro médico: es que alguien que sabe que hay insectos en su cama deja de dormir por semanas.',
        'Lo que sirve en casa sirve por la temperatura. Purdue pone el punto de muerte térmica en unos cuarenta y cinco grados Celsius; en la práctica, lavar con agua caliente y luego por lo menos veinte minutos en la secadora a temperatura alta mata todas las etapas, huevos incluidos, y es la secadora la que hace el trabajo. El frío sirve mucho menos: Purdue registra que sobreviven varios días bajo cero, y congelar en serio es bajo cero Fahrenheit por lo menos cuatro días; una cochera fría de aquí ni se acerca. Y esperar no funciona: el manual del noroeste dice que una chinche vive hasta un año sin comer. Un cuarto vacío no se limpia solo.',
      ],
    },
    {
      h2: 'La preparación decide casi todo, y cómo es el trabajo',
      parrafos: [
        'Un tratamiento en un cuarto sin preparar casi se desperdicia. Lave y seque con calor todo lo de tela de los cuartos afectados y guárdelo en bolsas cerradas hasta que termine el trabajo. Reduzca el desorden dentro del cuarto en lugar de cargarlo a otro, que es como un problema de un cuarto se vuelve de dos. Separe la cama de la pared y quite la ropa de cama del piso. Deje la evidencia: si cambia las sábanas, guarde las viejas sin lavar. Y no rocíe nada antes, porque los productos de la tienda dispersan a la población y alteran las manchas que la confirmarían. Le damos la lista antes de la visita, y si un cuarto no está listo reprogramamos en lugar de trabajar alrededor.',
        'El tratamiento va a los refugios y no se rocía sobre las superficies: costuras, uniones, huecos, herrajes de la base, las orillas del cuarto y los pasos entre cuartos. El método depende del cuarto, los muebles, qué tan lejos llegó la población y el tipo de edificio; una recámara en una casa sola de Alabama Hill y un tercer piso cerca del campus no reciben la misma respuesta. Los seguimientos se planean desde el principio, al intervalo de diez a veintiún días de Purdue, por los huevos, y ver actividad los días siguientes es normal. No prometemos un cuarto libre en una visita. Las fundas del colchón y del box spring — Purdue pide por lo menos 0.08 milímetros y un año puestas — encierran lo de adentro y dejan una superficie clara donde una mancha nueva se ve sola, y los vasos interceptores bajo las patas de la cama convierten en unas semanas una pregunta en respuesta.',
      ],
    },
    {
      h2: 'Por qué aquí se verifica primero',
      parrafos: [
        'Las chinches de cama son el único servicio nuestro que empieza con una visita pagada y no gratuita, y las cifras están en la página del servicio de control de chinches y no aquí, donde se quedarían viejas. La razón es corta: una parte importante de las llamadas por chinches no son chinches. Una búsqueda como se debe es quitar la ropa de cama, revisar las dos caras del colchón y del box spring, desarmar la base donde haga falta y recorrer las orillas del cuarto con una luz, y eso es trabajo real encuentre algo o no. Cobrarla y abonarla al tratamiento es lo que permite hacerla a fondo y no rápido, y quiere decir que una familia que resulta no tener chinches compró una respuesta definitiva y no un tratamiento. Antes de llamar, díganos qué encontró, dónde y qué cambió en las semanas de antes — un viaje, un mueble, una visita, una mudanza —, tómele foto a lo que encuentre, guarde un ejemplar en cinta transparente si puede, y deje el cuarto más o menos como está hasta que alguien lo vea.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Un médico o una foto pueden decirme que son piquetes de chinche?',
      a: 'No. Una marca en la piel es una reacción, y las reacciones a los piquetes de chinche no son lo bastante distintivas para identificar la causa. La Universidad de Kentucky reporta que cerca del treinta por ciento de la gente no reacciona aunque la piquen una y otra vez.',
    },
    {
      q: '¿Tener chinches quiere decir que mi casa está sucia?',
      a: 'No, y vale decirlo sin rodeos. Las chinches comen solo sangre, así que las migajas, el polvo y el desorden no tienen que ver con que lleguen. El Departamento de Salud de Washington las describe llegando en maletas, muebles, ropa de cama y ropa: es cuestión de movimiento, no de limpieza.',
    },
    {
      q: '¿Por qué el tratamiento necesita más de una visita?',
      a: 'Por los huevos. Están pegados en grietas, miden como un milímetro y no responden como un insecto que se mueve. Purdue indica revisar los sitios infestados de diez a veintiún días después de cada esfuerzo de control, que es el intervalo en que eclosionan.',
    },
    {
      q: '¿Vale la pena tirar la cama?',
      a: 'Casi nunca, y hacerlo pronto empeora las cosas. La población rara vez está solo en el colchón, lo que se tira va soltando insectos por el camino hacia afuera del edificio, y lo nuevo entra a un cuarto que no se ha atendido.',
    },
  ],
};
