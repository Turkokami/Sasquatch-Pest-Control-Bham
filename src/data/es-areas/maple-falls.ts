import type { EsLugar } from './tipos';

/** Fuente: src/content/locations/maple-falls.md. La geografía (el cruce con
 *  Silver Lake Road, el parque del condado, las 26 millas, los 291 habitantes
 *  del censo de 2020) se verificó el 11 de noviembre de 2026. Las plagas que
 *  se nombran son una inferencia del terreno y del tipo de edificio, no un
 *  informe del dueño — así queda registrado en la fila de towns.ts. */
export const mapleFalls: EsLugar = {
  town: 'maple-falls',
  nombre: 'Maple Falls',
  h1: 'Control de Plagas en Maple Falls, Washington',
  title: 'Control de Plagas en Maple Falls, WA',
  description:
    'Control de plagas en Maple Falls y el valle alto: chinches en cabañas de renta, roedores cuando cae la nieve y hormiga carpintera en cedro.',
  answer:
    'Maple Falls está donde el condado deja de ser campo y empieza a ser montaña. Buena parte de los edificios de aquí arriba se rentan por noche, y eso hace que las chinches de cama sean el problema que define la zona. Además la temporada fuerte es el invierno, al revés que casi todo el condado.',
  secciones: [
    {
      h2: 'Veintiséis millas arriba, y otra economía',
      parrafos: [
        'Maple Falls es el cruce de Silver Lake Road con la carretera al Monte Baker, y es el último punto del valle que funciona como pueblo y no como desviación. Más arriba el camino sube hacia Glacier y la montaña; más abajo el valle se abre otra vez hacia el campo de Deming y Nooksack.',
        'Lo que importa aquí no es tanto la altura como quién usa los edificios. En casi todo el condado el control de plagas se escribe alrededor del terreno: qué crece pegado a la casa, qué hace el suelo cuando llueve, qué tan vieja es la madera. De Maple Falls hacia arriba la mitad de la historia es otra, porque muchísimos edificios no los habita quien los compró. Se rentan por noche. Snowline, Peaceful Valley y Mt. Baker Rim son en buena parte comunidades de renta vacacional, el propio condado renta cabañas y un albergue en Silver Lake Park, una milla al norte, y muchas casas sueltas se anuncian por internet.',
        'Un edificio donde duermen treinta o cuarenta grupos distintos entre noviembre y abril está expuesto a cosas a las que no está expuesta una casa en Lynden. No es peor; es distinto. Lo que llega dentro de una maleta no se fija en qué tan bien sellado está el espacio bajo el piso.',
      ],
    },
    {
      h2: 'Aquí el invierno es la temporada alta',
      parrafos: [
        'Casi todas las demás páginas de este sitio están escritas pensando en un edificio que se usa menos en invierno. Aquí arriba muchos se usan más, y eso voltea el consejo normal al revés.',
        'Los meses tranquilos y vacíos, cuando es fácil agendar el trabajo de sellado, son los del verano. Los meses en que aparece un problema y hay que resolverlo entre una reserva y la siguiente son los de nieve. Un roedor que entra en diciembre entra a un edificio con calefacción, cocina llena y gente dentro, no a una casa cerrada que nadie va a abrir hasta mayo. La presión es mayor y la paciencia es menor, porque alguien está pagando por estar ahí.',
        'También cambia cuándo se puede trabajar. Sellar un edificio es trabajo por fuera de la pared, y desde la primera nieve que se queda hasta que se va, los primeros tres pies de esa pared — que es donde están casi todas las entradas — ni siquiera se ven. Por eso preferimos revisar una cabaña en septiembre y no en enero, aunque enero sea cuando se nota.',
      ],
    },
    {
      h2: 'Las chinches de cama son el problema propio de esta zona',
      parrafos: [
        'Conviene decirlo claro: las chinches de cama no son señal de un edificio sucio, y en una renta por noche tampoco son señal de un edificio mal llevado. Son señal de que ahí ha dormido mucha gente.',
        'Las chinches viajan en maletas, ropa de cama, ropa y muebles. La [hoja informativa de PestSense de WSU Extension](https://pestsense.cahnrs.wsu.edu/fact-sheet/bed-bugs/) explica el mecanismo sin folclor: se suben y ponen huevos en las cosas que la gente carga, y pasan de un cuarto a otro en objetos infestados. Nada de eso tiene que ver con la limpieza. Una cabaña con cuarenta reservas en la temporada está expuesta cuarenta veces.',
        'Lo que las hace caras aquí arriba es el movimiento de huéspedes. En una casa, quien vive ahí descubre el problema en unas semanas, porque lo pican en la misma cama todas las noches. En una renta nadie se queda lo suficiente para atar cabos. Un huésped amanece con marcas, le echa la culpa al jacuzzi, no dice nada y se va — a veces con el problema en la maleta. El siguiente grupo llega a un cuarto limpio. Cuando por fin se identifica, el problema ya tuvo una temporada para moverse por el edificio, y a veces entre edificios del mismo administrador.',
        'De ahí salen tres consecuencias prácticas. Encontrarlo temprano vale mucho más aquí que en otro lado, porque el reloj se mide en reservas y no en semanas. Los aerosoles de tienda hacen daño en un cambio de huéspedes, porque dispersan la infestación hacia los cuartos de al lado sin terminarla, y la resistencia a los ingredientes de venta libre está muy extendida. Y el tratamiento se planea con el calendario de reservas por delante y con honestidad, lo que a veces significa decirle a un administrador que dos horas no son una ventana de tratamiento, en lugar de aceptar el trabajo y cruzar los dedos.',
        'Nuestro trabajo de chinches empieza con una visita de verificación que sí se cobra, justo por esto. Es la única plaga por la que cobramos ir a ver, y el costo se acredita al tratamiento. Aquí arriba se paga sola más seguido que en la ciudad, porque los escarabajos de alfombra y las marcas que dejan en la ropa de cama se reportan como chinches muy seguido, y tratar un edificio por el insecto equivocado cuesta mucho más que una visita.',
      ],
    },
    {
      h2: 'Qué sí se le puede pedir a quien hace la limpieza',
      parrafos: [
        'Quien limpia entre huéspedes tiene entre cuarenta minutos y un par de horas para una cabaña entera. Pedirle una inspección completa de chinches es pedir algo que no se puede entregar. Pedirle que revise cuatro puntos de la cama, siempre los mismos, sí se puede, y agarra bastante.',
        'Las costuras del colchón y el ribete de la orilla, sobre todo del lado de la cabecera. La parte de abajo de la base, donde las tablas se juntan con los travesaños. El respaldo de la cabecera por detrás, en especial donde va atornillada o colgada. Y la costura de cualquier sillón que esté en la recámara. Lo que se busca no son insectos — de día se esconden — sino puntitos oscuros que no se quitan como una mancha, pieles mudadas y, de vez en cuando, algún insecto vivo en la rendija más apretada.',
        'Dos cosas ayudan más de lo que cuestan. Las fundas claras de colchón dejan la evidencia a la vista en vez de esconderla en una costura, y las trampas de pozo bajo las patas de la cama convierten una duda en un registro que cualquiera puede leer en la siguiente visita. Ninguna de las dos trata nada. Las dos hacen que el problema se encuentre en la primera quincena y no en el tercer mes.',
      ],
    },
    {
      h2: 'Roedores, y lo que la nieve le hace al calendario',
      parrafos: [
        'El trabajo de roedores aquí sigue las mismas reglas que en el resto del condado, con un cambio: la nieve le quita la caminata al animal.',
        'En campo abierto, un ratón que cruza hacia un edificio queda expuesto, y eso limita qué tan seguido pasa. Bajo la nieve queda una capa protegida a ras de suelo que corre sin interrupción desde la maleza hasta el cimiento, y el animal la recorre sin salir. Al final de ese recorrido hay un edificio con calefacción, seco y con despensa, que además huele a comida todo el fin de semana.',
        'Así que la llegada se concentra en las semanas siguientes a la primera nevada que se queda, en vez de repartirse por todo el otoño, y va directo a la estructura con calefacción en lugar de pasar primero por las bodegas como pasa en el campo más abajo del valle. En la parte arbolada el animal común es el ratón ciervo; cerca de los grupos de casas, el ratón casero; y la rata noruega donde hay basura o alimento de manera constante.',
        'Las entradas son las de siempre y todas están abajo: una ventila del espacio bajo el piso con la malla vencida, el hueco por donde pasa un tubo, la base de la puerta del garaje, el umbral debajo de una terraza. Todas quedan bajo la línea de nieve desde la primera tormenta de verdad. Ese es todo el argumento para hacer este trabajo en otoño, y es lo más útil de esta página para quien tenga un edificio aquí arriba.',
        'Si va a abrir una cabaña cerrada y encuentra excremento, no lo barra ni lo aspire en seco. La [guía sobre hantavirus del Departamento de Salud de Washington](https://doh.wa.gov/you-and-your-family/illness-and-disease-z/hantavirus) explica por qué, y el método que indica — ventilar primero, mojar el material, levantarlo con guantes — tarda unos minutos más y evita echar ese polvo al aire de un cuarto donde alguien va a dormir.',
      ],
    },
    {
      h2: 'Hormiga carpintera en edificios hechos para la nieve',
      parrafos: [
        'El valle alto tiene un tipo de construcción muy propio: techos muy inclinados, aleros largos, vigas gruesas a la vista, terrazas grandes y mucho cedro. Todo eso es una respuesta sensata al peso de la nieve, y casi todo le da a la hormiga carpintera más de lo que quiere que una casa común.',
        'La hormiga carpintera no se come la madera: abre galerías para anidar en ella, y prefiere con mucho la madera que la humedad ya ablandó. La [hoja de PestSense de WSU sobre hormiga carpintera](https://pestsense.cahnrs.wsu.edu/fact-sheet/carpenter-ants/) es la referencia regional de la especie, y el punto al que siempre regresa es el agua. Tratar hormigas en una pared cuya madera sigue mojada le compra a usted una temporada, no más.',
        'Lo particular de aquí es que esa madera mojada suele ser estructural y estar a la vista. La punta de una viga metida en el larguero de la terraza. La cara de afuera de una viga laminada donde el alero no alcanza a taparla. La base de un poste que pasa cuatro meses dentro de un montón de nieve. Un valle del techo que descarga todos los años sobre la misma esquina. Nada de eso es descuido: son las partes que por diseño reciben más clima, pero se quedan húmedas mucho más tiempo que una fachada, y ahí es donde encontramos galerías.',
        'El uso por temporadas lo empeora de una manera muy concreta. Una gotera en una casa habitada se nota en días. Una gotera en una cabaña entre reservas corre hasta que alguien abre la puerta, y una lenta detrás de una regadera o alrededor de un tragaluz puede correr casi toda la temporada. Para cuando se encuentra, la reparación es de carpintería y las hormigas son la consecuencia, no la causa.',
        'La señal que conviene atender no son las hormigas. Es el aserrín falso que empujan fuera de la galería y que se junta justo debajo de ella, en un alféizar, un escalón o encima de un zoclo. No es aserrín de sierra: es fibroso, muchas veces trae pedazos de insecto, y le dice dónde buscar como nunca se lo va a decir una hormiga caminando en la cocina.',
      ],
    },
    {
      h2: 'Lo que la nieve le hace al trabajo ya hecho',
      parrafos: [
        'El sellado en una propiedad de montaña tiene que aguantar cosas que en la ciudad no existen, y ahí es donde se nota el trabajo barato.',
        'Un techo que suelta su carga se lleva la canaleta, y muchas veces también las mallas de las ventilas, la gotera y lo que estuviera fijado al alero. Una malla de alambre engrapada sobre una ventila dura exactamente hasta la primera descarga o la primera pala. Los montones de nieve del quitanieves y de la pala dejan peso mojado contra la base de la pared durante meses, lo que pudre la madera a la que estaba sujeto el sellado. El hielo en una canaleta tapada mete agua por debajo del techo, que es donde empiezan varios de los problemas de madera húmeda de la sección anterior.',
        'Por eso el trabajo que hacemos aquí va fijado en material sano, fuera de la línea de descarga donde se puede, y en metal y no en algo que una temporada de hielo y deshielo vuelva quebradizo. También vale la pena volver a revisarlo después de un invierno duro, cosa que no diríamos del mismo trabajo en Birch Bay. Un edificio bien sellado en octubre al que se le vinieron seis pies de nieve encima del techo en enero no necesariamente sigue sellado en abril.',
      ],
    },
    {
      h2: 'Avispas al final del verano, agua de pozo y cómo es una visita',
      parrafos: [
        'El verano aquí arriba no es tranquilo, nada más es otra clase de movimiento: el valle se llena de gente caminando, acampando y usando el sendero, justo cuando las colonias de avispa amarilla llegan a su mayor tamaño y a su peor humor. Los nidos que importan son los que están donde la gente se para: en el suelo junto a un camino, dentro de la pared junto a la puerta de atrás, debajo de la terraza, en el alero arriba del jacuzzi. Los panales abiertos de avispa de papel bajo un alero casi siempre preocupan menos y se pueden dejar si no estorban. Le decimos cuál tiene antes de tratar nada, y a las abejas de miel no las tratamos ni aquí ni en ningún lado: un enjambre es trabajo de apicultor.',
        'Los espacios bajo el piso se quedan húmedos por lo mismo que en cualquier terreno con árboles, más una razón extra: el deshielo. Suelo congelado o saturado bajo la nieve manda el agua hacia el perímetro en lugar de dejarla pasar, y un espacio bajo el piso que aguanta la lluvia normal puede acabar con agua parada en un deshielo. La barrera de vapor sobre la tierra es lo único entre ese suelo y la parte de abajo del piso; rota o mal traslapada no está haciendo su trabajo, y el resultado es madera blanda para las hormigas y material de nido para los roedores.',
        'Casi todas las propiedades de aquí tienen pozo y fosa séptica en vez de servicios municipales, y eso importa por una razón práctica: dónde colocamos los dispositivos para roedores y qué se aplica cerca de un pozo o un campo de drenaje lo decide la etiqueta del producto y el sitio, no la comodidad. Si tiene pozo, díganoslo al agendar. Es una conversación de treinta segundos y cambia la colocación.',
        'Maple Falls está a veintiséis millas al este por la carretera al Monte Baker y se atiende en días de ruta programados, junto con el resto del valle. Le damos un día en lugar de prometerle una hora, porque el camino en invierno tiene sus propias ideas. Muchas de las propiedades que nos piden revisar no tienen a nadie adentro, así que díganos cómo entrar: una clave, una caja de llaves, un vecino, una oficina de administración. No necesitamos que usted esté ahí. La primera visita es un recorrido de toda la propiedad y no del cuarto por el que nos llamaron, y en una renta además queremos ver bien las camas, que es la parte que no conviene apurar.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Por qué hay tantas chinches de cama en este valle y no allá abajo?',
      a: 'Porque las chinches viajan con la gente y no con el clima, y aquí arriba hay una cantidad poco común de edificios donde duerme gente distinta cada pocas noches. Lo que manda es el movimiento de huéspedes, no la altura ni la limpieza. Una cabaña con cuarenta grupos en la temporada tuvo cuarenta oportunidades de que se las metieran.',
    },
    {
      q: 'Administro una renta. ¿Pueden tratar entre un huésped y otro?',
      a: 'Casi siempre, y lo primero que necesitamos saber es de cuánto es el hueco entre reservas. Díganos cuántas horas hay y le decimos con honestidad qué cabe ahí. Lo que no hacemos es prometer un tratamiento terminado para la hora de entrada si no se puede, porque un trabajo de chinches a medias en un cambio de huéspedes es justo como el problema se va a la casa del siguiente.',
    },
    {
      q: '¿Cobran por ir a ver si hay chinches?',
      a: 'Sí, y solo por chinches. La visita de verificación confirma qué tiene usted realmente antes de que alguien pague por tratarlo, y el costo se acredita al tratamiento si decide seguir. Todo lo demás lo vamos a ver sin cobrar. Aquí arriba esa visita se justifica sola, porque los escarabajos de alfombra se reportan como chinches muy seguido y no se tratan igual.',
    },
    {
      q: 'En verano no tenemos nada, pero cada invierno hay ratones. ¿Por qué?',
      a: 'Porque su edificio es lo más caliente que hay en la ladera durante cinco meses, y con nieve en el suelo el animal no tiene que cruzar terreno abierto para llegar. La nieve además tapa los primeros tres pies de la construcción, que es donde están casi todas las entradas, así que el sellado hay que hacerlo en otoño mientras la pared todavía se ve.',
    },
    {
      q: '¿La nieve echa a perder el sellado que ustedes hacen?',
      a: 'Puede, y conviene saber qué parte es la frágil. Un techo que suelta su carga se lleva canaletas, mallas de ventila y la orilla del alero, y los montones del quitanieves dejan peso mojado contra la pared durante meses. Ponemos sellado pensado para aguantar eso, y contamos con volver a revisar la línea del techo después de un invierno duro.',
    },
    {
      q: '¿Pueden atender un nido de avispas en una cabaña donde esta semana no hay nadie?',
      a: 'Sí, y una semana vacía es el momento más fácil para hacerlo. Díganos cómo entrar a la propiedad y dónde está el nido, y si puede mándenos una foto. No necesitamos que usted esté ahí, y si el nido está en el suelo junto a un camino, es mejor que no esté.',
    },
  ],
};
