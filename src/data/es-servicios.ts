/**
 * Keystone Part 15 — contenido en español de las páginas de servicio.
 *
 * No es una traducción línea por línea de src/content/services/*.md. Esas
 * páginas pasan de las tres mil palabras y buena parte de ese texto existe
 * para posicionamiento en inglés. Estas están escritas para que alguien que
 * busca en español entienda qué hacemos y llame.
 *
 * Todo lo que se afirma aquí sale del contenido en inglés ya publicado —
 * el `answer` de cada servicio y sus preguntas frecuentes. Regla de
 * services.ts: nunca inventar un servicio. Si no está en la lista confirmada
 * en inglés, no aparece aquí.
 */

export interface EsServicio {
  /** Slug en español, bajo /es/servicios/. */
  slug: string;
  /** Ruta en inglés equivalente — la misma pareja que está en PAGE_PAIRS. */
  enPath: string;
  nav: string;
  h1: string;
  title: string;
  description: string;
  answer: string;
  secciones: { h2: string; parrafos: string[] }[];
  faqs: { q: string; a: string }[];
}

export const esServicios: EsServicio[] = [
  {
    slug: 'control-de-roedores',
    enPath: '/services/rodent-control/',
    nav: 'Roedores',
    h1: 'Control de Roedores y Ratones en Bellingham y el Condado de Whatcom',
    title: 'Control de Roedores y Ratones en Bellingham, WA',
    description:
      'Control de ratas y ratones en español para casas de Bellingham y el condado de Whatcom: inspección, exclusión, trampas y limpieza. Llame o mande un mensaje al 360-410-2199.',
    answer:
      'Aquí el control de roedores es primero exclusión y después trampas. Buscamos por dónde están entrando, sellamos esas entradas, atrapamos a los que ya están adentro y limpiamos la contaminación que dejaron. Poner trampas sin sellar vacía la casa un tiempo; sellar una rendija de un cuarto de pulgada en los cimientos es lo que de verdad termina el problema.',
    secciones: [
      {
        h2: 'Por qué entran en otoño',
        parrafos: [
          'No es el frío, es la lluvia. En el condado de Whatcom no hay heladas fuertes, así que los roedores no entran empujados por la temperatura como pasa en otros estados. Lo que los mete es el agua: cuando el suelo se satura en septiembre y octubre, las madrigueras se inundan y el espacio seco debajo de su piso se vuelve la mejor opción disponible.',
        ],
      },
      {
        h2: 'Por dónde entran',
        parrafos: [
          'Un ratón casero necesita como un cuarto de pulgada, más o menos el grosor de un lápiz. Una rata necesita algo más de media pulgada para pasar entera, pero con un cuarto de pulgada ya le alcanza para morder el borde y agrandar el hueco hasta que cabe. Por eso el número con el que se trabaja es un cuarto de pulgada para los dos.',
          'Ese mismo cuarto de pulgada está escrito en la lista de inspección de alquileres de la ciudad de Bellingham como riesgo de infestación.',
        ],
      },
      {
        h2: 'Cómo trabajamos',
        parrafos: [
          'La exclusión — sellar las entradas — suele llevar uno o dos días según la estructura. Las trampas trabajan de una a tres semanas con visitas de regreso, porque una población no cae en las trampas toda de golpe. La limpieza y el reemplazo de aislamiento se programan después de terminar con las trampas, para no restaurar un espacio que todavía está ocupado.',
        ],
      },
      {
        h2: 'Sobre el cebo y la fauna',
        parrafos: [
          'Sí usamos rodenticida, pero como parte del programa y no como el programa entero. Elegimos productos específicamente para limitar el riesgo de envenenamiento secundario a los búhos, halcones y demás depredadores que cazan roedores aquí, y cada colocación va en una estación a prueba de manipulación, mapeada y documentada. El trabajo interior se hace con trampas.',
        ],
      },
      {
        h2: 'La limpieza, dicho claro',
        parrafos: [
          'No barra ni aspire los excrementos en seco. Mover material seco lo levanta en el aire, y el ratón ciervo en Washington es una consideración de hantavirus. Ventile el espacio, moje el material con desinfectante y use guantes y un respirador de verdad — o déjenos hacerlo a nosotros como parte del trabajo.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Van a volver?',
        a: 'Por una rendija sellada, no. Los roedores vuelven a estructuras, no a direcciones, así que una casa bien excluida deja de estar disponible. Lo que los trae de vuelta es una entrada nueva: una malla de ventilación rota, un cimiento que se asentó, o un contratista que pasó una tubería nueva y no la selló.',
      },
      {
        q: '¿Cuánto tarda el trabajo?',
        a: 'La exclusión, uno o dos días. Las trampas, de una a tres semanas con visitas de regreso. La limpieza va después de terminar las trampas.',
      },
    ],
  },
  {
    slug: 'control-de-avispas',
    enPath: '/services/wasp-control/',
    nav: 'Avispas',
    h1: 'Control de Avispas y Avispones en Bellingham y el Condado de Whatcom',
    title: 'Control de Avispas y Avispones en Bellingham, WA',
    description:
      'Retiro de nidos de avispa y avispón en español, en Bellingham y el condado de Whatcom. Nidos en el suelo, aéreos y dentro de paredes. Llame al 360-410-2199.',
    answer:
      'Aquí las colonias llegan a su punto más alto a finales de agosto y en septiembre, que es cuando ocurren casi todas las picaduras. Retiramos nidos en el suelo, nidos aéreos y los nidos dentro de paredes, que son los que de verdad no conviene intentar por su cuenta. Si tiene un nido cerca de una puerta, de un pasillo o de donde juegan los niños, eso pasa al frente de nuestra agenda.',
    secciones: [
      {
        h2: 'Cuándo pican',
        parrafos: [
          'La colonia crece todo el verano y llega a su tamaño máximo a finales de agosto y en septiembre. Ahí es cuando hay más obreras, menos comida y más contacto con la gente — y es cuando pasan casi todas las picaduras. Un nido que en junio no molestaba a nadie puede ser un problema serio en septiembre.',
        ],
      },
      {
        h2: 'El nido dentro de la pared',
        parrafos: [
          'Un nido dentro de un hueco de pared es el que no se debe intentar en casa. Rociar la entrada desde afuera puede empujar a la colonia hacia adentro de la casa en lugar de hacia afuera, y el nido abandonado sigue ahí. Ese trabajo se hace con equipo y con un plan de salida.',
        ],
      },
      {
        h2: 'Qué hacer mientras espera',
        parrafos: [
          'No tape la entrada del nido. Si sella el agujero por donde entran y salen, las obreras que quedan adentro buscan otra salida, y en un nido dentro de una pared esa otra salida es muchas veces hacia el interior de la casa.',
          'No rocíe desde una escalera. La reacción normal de la colonia es defenderse, y la mayoría de las caídas graves en este trabajo son de alguien que se movió rápido estando en alto. Si el nido está a más de la altura del hombro, déjelo.',
          'Mientras tanto, cierre las ventanas de ese lado, mantenga a los niños y a las mascotas lejos de la línea de vuelo — que es la ruta recta que usan para entrar y salir — y no golpee la pared donde está el nido.',
        ],
      },
      {
        h2: 'Prioridad por dónde está',
        parrafos: [
          'Si el nido está junto a una puerta, sobre una banqueta, cerca de un área de juegos o donde alguien alérgico pasa todos los días, eso cambia la urgencia. Díganos dónde está cuando llame.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Puedo esperar a que se muera en invierno?',
        a: 'La colonia sí muere con el frío, pero eso no ayuda en agosto, que es cuando pica. Si el nido está en un lugar de paso, esperar cinco semanas es cinco semanas de riesgo.',
      },
    ],
  },
  {
    slug: 'control-de-hormigas',
    enPath: '/services/ant-control/',
    nav: 'Hormigas',
    h1: 'Control de Hormigas y Hormiga Carpintera en Bellingham',
    title: 'Control de Hormigas y Hormiga Carpintera en Bellingham, WA',
    description:
      'Control de hormigas en español en Bellingham y el condado de Whatcom. Hormiga olorosa, hormiga carpintera y hormiga de humedad. Llame al 360-410-2199.',
    answer:
      'La hormiga olorosa es la que de verdad tienen la mayoría de las casas de aquí, y es la que un aerosol de ferretería empeora: los repelentes parten la colonia en lugar de matarla. La hormiga carpintera es como tres de cada diez llamadas y es la que daña la construcción. La hormiga de humedad significa agua. La identificación decide el tratamiento, porque las tres necesitan trabajo distinto.',
    secciones: [
      {
        h2: 'Por qué el aerosol empeora el problema',
        parrafos: [
          'Los productos de ferretería son repelentes. Con la hormiga olorosa, un repelente no mata la colonia: la parte. Donde había un nido ahora hay varios, cada uno con su reina, y el problema se hace más grande y más difícil de tratar que antes de rociar.',
        ],
      },
      {
        h2: 'Las tres que importan aquí',
        parrafos: [
          'La hormiga olorosa es la más común y es molestia, no daño. La hormiga carpintera excava la madera para hacer nido — no se la come, pero la hueca — y es la que puede costarle dinero en reparaciones. La hormiga de humedad casi nunca es el problema principal: es la señal de que hay madera húmeda o una fuga en alguna parte.',
          'Si lo que tiene son hormigas de humedad, se lo vamos a decir, y también le vamos a decir que arreglar el agua es parte del trabajo.',
        ],
      },
      {
        h2: 'Qué nos sirve que nos diga',
        parrafos: [
          'Dónde las vio y a qué hora. Las hormigas carpinteras se mueven sobre todo de noche, así que un rastro a las diez de la noche dice algo distinto que uno a mediodía.',
          'Si hay aserrín, no lo barra antes de que lleguemos. Ese montoncito dice dónde está el nido, y una vez barrido hay que esperar a que se vuelva a juntar.',
          'Si puede, mándenos una foto. Con una foto medio decente se distingue la carpintera de la olorosa, y eso cambia el trabajo y el precio antes de que nadie salga de la oficina.',
        ],
      },
      {
        h2: 'La humedad primero',
        parrafos: [
          'Con hormiga de humedad y muchas veces con carpintera, la madera ya estaba húmeda antes de que llegaran. Si no se arregla la fuga, el techo que gotea o la ventilación del sótano, el tratamiento compra tiempo y nada más. Se lo decimos aunque la reparación no la hagamos nosotros.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cómo sé si son carpinteras?',
        a: 'Suelen ser más grandes y negras, y muchas veces dejan un serrín fino, como aserrín, debajo de donde están trabajando. Si ve montoncitos de aserrín junto a un marco de ventana o debajo de la moldura, mándenos una foto cuando llame.',
      },
    ],
  },
  {
    slug: 'control-de-aranas',
    enPath: '/services/spider-control/',
    nav: 'Arañas',
    h1: 'Control de Arañas en Bellingham y el Condado de Whatcom',
    title: 'Control de Arañas en Bellingham, WA',
    description:
      'Control de arañas en español en Bellingham y el condado de Whatcom. Identificación primero — casi todas las arañas grandes de otoño son inofensivas. Llame al 360-410-2199.',
    answer:
      'Casi todas las arañas grandes que se encuentran adentro en otoño aquí son la araña doméstica gigante, y es inofensiva. Tratamos el exterior, quitamos las telarañas y reducimos los insectos que le sirven de comida, y le vamos a decir cuando lo que tiene no necesita tratamiento. La identificación va antes de que alguien le recomiende un servicio.',
    secciones: [
      {
        h2: 'La grande de otoño',
        parrafos: [
          'En septiembre y octubre aparecen arañas grandes adentro de la casa. Casi siempre son machos de araña doméstica gigante buscando pareja, no una infestación. Son inofensivas y se van solas.',
        ],
      },
      {
        h2: 'Qué sí hacemos',
        parrafos: [
          'Cuando el tratamiento tiene sentido, trabajamos el exterior, quitamos telarañas y sacos de huevos, y reducimos la población de insectos que las atrae — porque una araña se queda donde hay comida. Si el problema real son los insectos, el trabajo es sobre los insectos.',
        ],
      },
      {
        h2: 'Lo que sí ayuda en casa',
        parrafos: [
          'Las arañas van donde hay insectos, y los insectos van donde hay luz. Cambiar las luces de afuera por focos de tono cálido, o moverlas para que no den directo sobre la puerta, baja la comida disponible más que cualquier aerosol.',
          'Quitar las telarañas con una escoba, incluidos los sacos de huevos, y sellar rendijas debajo de las puertas y alrededor de los tubos ayuda igual. Es el mismo trabajo de exclusión que hacemos para roedores, en versión pequeña.',
          'Recoger la hojarasca, la leña y el cartón pegados a la pared de la casa quita el refugio de afuera. Nada de esto es dramático, pero junto hace más que rociar el zócalo cada primavera.',
        ],
      },
      {
        h2: 'Cuando le decimos que no hace falta',
        parrafos: [
          'Si lo que tiene es una araña inofensiva de temporada, se lo decimos aunque eso signifique que no hay venta. Es la respuesta correcta y es la más fácil de comprobar después.',
          'Vale la pena decirlo claro: la araña doméstica gigante es de las que más asustan por el tamaño y de las que menos importan. Es rápida, es grande, y no le va a hacer nada. Matarlas una por una en septiembre no reduce cuántas entran, porque las que entran vienen de afuera y no del interior de la casa.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Hay arañas peligrosas aquí?',
        a: 'Mándenos una foto antes de suponerlo. La gran mayoría de lo que se encuentra en casas del condado de Whatcom es inofensivo, y la identificación va primero — antes del tratamiento y antes del presupuesto.',
      },
    ],
  },
  {
    slug: 'control-de-moscas',
    enPath: '/services/fly-control/',
    nav: 'Moscas',
    h1: 'Control de Moscas en Bellingham y el Condado de Whatcom',
    title: 'Control de Moscas en Bellingham, WA',
    description:
      'Control de moscas en español en Bellingham y el condado de Whatcom. La mosca es un síntoma: hay que encontrar dónde se está criando. Llame al 360-410-2199.',
    answer:
      'Las moscas son un síntoma. Matar las adultas que usted ve no cambia nada, porque algo se está criando en alguna parte — y cuál especie tiene nos dice dónde buscar. La excepción es la mosca de racimo, que se cría afuera y pasa el invierno dentro de sus paredes; esa es trabajo de exclusión y no de tratamiento.',
    secciones: [
      {
        h2: 'La especie dice dónde buscar',
        parrafos: [
          'Cada mosca se cría en un material distinto, así que identificarla es la mitad del trabajo. Un drenaje, un bote de basura, una planta de interior con tierra siempre húmeda, un animal muerto en un hueco de pared — cada uno da una mosca diferente. Fumigar el cuarto no toca ninguno de esos.',
        ],
      },
      {
        h2: 'La mosca de racimo es otra cosa',
        parrafos: [
          'La mosca de racimo no se cría adentro. Se cría afuera y entra en otoño a pasar el invierno en los huecos de las paredes y en el ático, y sale a las ventanas de arriba en los días tibios. Eso se resuelve sellando por dónde entra, no rociando adentro.',
        ],
      },
      {
        h2: 'Dónde buscamos',
        parrafos: [
          'En una casa: los drenajes de la cocina y del baño, el bote de basura y lo que se derramó debajo de él, la tierra siempre húmeda de las macetas, la charola del refrigerador y, cuando el olor lo acompaña, un animal muerto en un hueco de pared o debajo del piso.',
          'En un negocio de comida, casi siempre es un drenaje. La película biológica que se forma dentro del tubo es criadero suficiente, y limpiar el piso alrededor no la toca. Eso se trata dentro del drenaje.',
          'También revisamos debajo y detrás del equipo fijo, que es donde se acumula lo que se barrió y nunca se recogió.',
        ],
      },
      {
        h2: 'Qué le vamos a pedir',
        parrafos: [
          'Que no fumigue el cuarto antes de que lleguemos. Matar a las adultas no cambia el problema y sí nos quita la mejor pista que hay: dónde se están juntando y a qué hora.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Mato las que veo y vuelven al día siguiente. ¿Por qué?',
        a: 'Porque está matando adultas mientras el criadero sigue produciendo. Hasta que no se encuentre y se elimine el material donde se están criando, van a seguir saliendo.',
      },
    ],
  },
  {
    slug: 'eliminacion-de-abejas',
    enPath: '/services/bee-removal/',
    nav: 'Abejas',
    h1: 'Abejas: Identificación y Retiro en Bellingham',
    title: 'Control y Retiro de Abejas en Bellingham, WA',
    description:
      'No matamos abejas melíferas. Identificación primero: la mayoría de las llamadas por abejas resultan ser avispas chaqueta amarilla. Bellingham y el condado de Whatcom. Llame al 360-410-2199.',
    answer:
      'No matamos abejas melíferas. La mayoría de las llamadas por abejas resultan ser avispas chaqueta amarilla, y la mayoría de las llamadas que sí son de abejas necesitan un apicultor o no necesitan nada. Cuando hay una colonia de abejas melíferas establecida dentro de una estructura, eso es un trabajo de retiro y reparación: el panal tiene que salir, porque si se queda causa problemas peores que las abejas.',
    secciones: [
      {
        h2: 'Primero, qué es',
        parrafos: [
          'La mayoría de las llamadas por "abejas" son chaqueta amarilla, que es una avispa. Eso cambia por completo la respuesta, así que la identificación va primero. Una foto ayuda mucho.',
        ],
      },
      {
        h2: 'Si son abejas melíferas',
        parrafos: [
          'No las matamos. Según el caso, lo correcto es un apicultor, o dejarlas en paz porque un enjambre de paso se va solo en un día o dos.',
          'Cuando hay una colonia establecida dentro de una pared o un techo, es distinto: hay que abrir, sacar el panal y reparar. Si se mata la colonia y se deja el panal adentro, la miel se fermenta, escurre por la pared y atrae a otras plagas — sale peor que el problema original.',
        ],
      },
      {
        h2: 'Cómo distinguirlas de lejos',
        parrafos: [
          'La abeja melífera se ve peluda, más redonda, de café y ámbar apagado, y anda entre las flores. La chaqueta amarilla se ve lisa y brillante, amarillo y negro marcados, con la cintura muy delgada, y anda en la carne asada y en el bote de basura.',
          'Si entran y salen de un agujero en el suelo, casi seguro es chaqueta amarilla: la abeja melífera no anida en el suelo aquí.',
        ],
      },
      {
        h2: 'Por qué importa acertar',
        parrafos: [
          'Porque la respuesta correcta es opuesta. A la chaqueta amarilla en un lugar de paso se le retira el nido. A la abeja melífera no se le mata, y muchas veces lo correcto es no hacer nada. Tratar una como la otra es el error más común en estas llamadas.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Hay un montón de abejas colgando de mi árbol.',
        a: 'Eso suele ser un enjambre de paso y casi siempre se va solo en uno o dos días. No lo rocíe. Si no se va, llámenos y le decimos si hace falta un apicultor.',
      },
    ],
  },
];

export const esServicioBySlug = (slug: string) => esServicios.find((s) => s.slug === slug);
