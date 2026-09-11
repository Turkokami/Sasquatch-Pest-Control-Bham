import type { EsServicio } from './tipos';

/**
 * Arañas, en español y a profundidad completa. Fuente: la versión en inglés en
 * src/content/services/spider-control.md.
 *
 * La corrección sobre la araña vagabunda (hobo spider) va arriba en español
 * igual que en inglés, y por la misma razón: es lo más útil de la página y es
 * lo que el resto del oficio no dice. Un lector en español tiene todavía menos
 * probabilidad de encontrar la postura actualizada del Departamento de Salud
 * en su idioma, así que aquí pesa más, no menos.
 *
 * La prueba del chevrón en el abdomen NO aparece como método de
 * identificación, igual que ya no aparece en inglés. La única marca de campo
 * que se ofrece es la del esternón, que es la que da la clave de la
 * Universidad Estatal de Washington.
 */
export const controlDeAranas: EsServicio = {
  slug: 'control-de-aranas',
  enPath: '/services/spider-control/',
  nav: 'Arañas',
  h1: 'Control de Arañas en Bellingham y el Condado de Whatcom',
  title: 'Control de Arañas en Bellingham, WA',
  description:
    'Control de arañas en Bellingham y el condado de Whatcom. Casi todas las arañas grandes de otoño son inofensivas; identificamos antes de tratar. Llame: 360-410-2199.',
  answer:
    'Casi todas las arañas grandes que se encuentran adentro en otoño aquí son la araña doméstica gigante, y es inofensiva. Tratamos el exterior, quitamos las telarañas y reducimos los insectos que le sirven de comida, y le vamos a decir cuando lo que tiene no necesita tratamiento. La identificación va antes de que alguien le recomiende un servicio.',
  secciones: [
    {
      h2: 'La corrección que casi todo este oficio tiene mal',
      parrafos: [
        'Empecemos aquí, porque es lo más útil de esta página y porque el oficio del control de plagas lleva dos décadas equivocándose en una dirección que casualmente vende tratamientos.',
        'La araña vagabunda (en inglés, hobo spider) tiene fama en el noroeste del Pacífico de causar lesiones de piel necróticas. Esa fama viene de investigaciones publicadas en los años ochenta y noventa que trabajos posteriores no respaldaron. El Departamento de Salud del estado de Washington dice hoy claramente que la araña vagabunda no se considera tan peligrosa como se pensaba, y que la evidencia no respalda un vínculo entre su mordida y la necrosis del tejido.',
        'Es un cambio importante, y no ha llegado a la mayoría de los sitios que va a encontrar buscando control de arañas en esta región — porque "araña inofensiva" es más difícil de vender que "araña peligrosa".',
        'Lo ponemos arriba de nuestra página de arañas porque preferimos que nos tengan confianza a venderle un tratamiento que no hace falta. Hay buenas razones para querer menos arañas alrededor de una casa. El miedo a una mordida que el departamento de salud del estado dice que no es lo que se decía no es una de ellas.',
      ],
    },
    {
      h2: 'Lo que de verdad tiene',
      parrafos: [
        'La araña doméstica gigante. Esta es la grande. Cuerpo grande, patas largas, café, y es la araña que produce la mayoría de las llamadas de "hay una araña enorme en mi tina" en el condado de Whatcom. Teje telaraña en forma de embudo, es inofensiva para las personas, y es muy probablemente la araña que está viendo ahorita si llegó a esta página en septiembre.',
        'Es además un animal útil de tener cerca. Es territorial, consume un volumen constante de insectos, y se come a otras arañas. Lo que no le vamos a decir es que caza a la araña vagabunda, que es la versión que circula y que no podemos respaldar con una fuente. Lo que sí tiene fuente es la observación de la extensión de la Universidad de California de que en partes del noroeste del Pacífico la araña doméstica gigante desplazó por competencia a la araña vagabunda. Pase lo que pase entre las dos, la forma práctica es que donde la grande e inofensiva está bien establecida, la que carga con la fama es más escasa.',
        'La araña vagabunda. Pariente cercana, de apariencia parecida, y no se puede separar de una araña doméstica gigante a simple vista. La identificación confiable exige examinar las estructuras reproductivas con aumento, en un ejemplar maduro. La hoja de identificación de la extensión de la Universidad Estatal de Washington dice que sin ellas no se puede identificar definitivamente a una araña vagabunda, y la nota de la Universidad de California dice lo mismo con otras palabras: distinguir a las tejedoras de embudo es trabajo para un aracnólogo calificado.',
        'Hay una sola cosa que vale la pena intentar en casa, y necesita al animal en un recipiente transparente para verlo desde abajo. La clave de la Universidad Estatal de Washington separa a las dos por el esternón, que es la placa en la parte de abajo entre la base de las patas: una franja pálida por el centro en la araña vagabunda, y tres o cuatro pares de manchas pálidas a los lados en la araña doméstica gigante o en la tejedora de embudo de granero. Si tiene manchas, no es vagabunda. Es la única marca de campo que de verdad sirve, y en un animal que se mueve a la velocidad que se mueven estas, sigue sin ser fácil.',
        'La implicación práctica es incómoda para la versión de esta página basada en el miedo: si no se pueden distinguir de forma confiable a simple vista, y la que no se puede descartar no es peligrosa, entonces la identificación deja casi de importar para la seguridad. Sigue importando para la honestidad.',
        'La araña de jardín en cruz. La que construye la clásica telaraña en forma de rueda en la puerta de atrás a finales del verano, muchas veces con un cuerpo grande, con dibujo y de aspecto alarmante. Completamente inofensiva, y una depredadora eficiente de insectos voladores. Quitamos telarañas donde de verdad estorban. No recomendamos tratar contra ella.',
        'La araña de sótano. Cuerpo chico, patas absurdamente largas y delgadas, telarañas desordenadas en las esquinas de sótanos, espacios bajo el piso y cocheras. Inofensiva, y otra araña que se come a otras arañas.',
        'La araña saco amarilla. Chica, de color amarillo verdoso pálido, cazadora activa en lugar de esperar en una red, y muchas veces se le encuentra en un refugio chico de seda donde la pared se junta con el techo. Es de las pocas arañas locales cuya mordida sí produce una reacción de verdad — por lo general dolor y enrojecimiento localizados, no algo grave. Vale la pena conocerla precisamente porque recibe menos atención que las especies que no merecen la suya.',
        'La viuda negra. La viuda negra occidental es una especie de Washington, y el Departamento de Salud la describe como común en el este del estado. Su distribución sigue el terreno más seco y más cálido al este y al sur de las Cascadas, así que de este lado de las montañas es poco común y no rutinaria, y las que aparecen están en pilas de leña, cajas de medidor y esquinas de cobertizo que nadie mueve, no adentro de una casa. La marca es lo bastante distintiva para que una foto lo resuelva.',
        'La reclusa café. No está establecida en Washington. A nivel nacional, las mordidas atribuidas a la reclusa café superan por mucho a su distribución real, y muchísimas "mordidas de reclusa" resultan al investigarlas ser infecciones u otros problemas de piel. Si le dijeron que las tiene en el condado de Whatcom, pida una segunda opinión antes de que alguien trate.',
      ],
    },
    {
      h2: 'Por qué el otoño es temporada de arañas',
      parrafos: [
        'Cada año, más o menos de agosto a octubre, la gente de este condado descubre arañas grandes adentro y concluye que están entrando por el frío.',
        'No es eso lo que pasa. Son machos adultos andando en busca de pareja. Pasaron el año creciendo, llegaron a la madurez, y se están moviendo — por los pisos, por las paredes, y adentro de las tinas, donde las paredes lisas los atrapan. Es una temporada de apareamiento, no una migración, y casi no tiene nada que ver con la temperatura.',
        'De ahí salen dos cosas. Primero, las arañas que está viendo en su mayoría no se acaban de mudar: muchas llevan todo el tiempo viviendo dentro y alrededor de la estructura. Segundo, la temporada se termina sola. Un tratamiento aplicado a finales de septiembre se lleva el crédito de algo que iba a pasar en tres semanas de todos modos.',
        'Se lo vamos a decir en lugar de venderle el tratamiento de septiembre, y preferimos hacer la versión útil del trabajo — exterior, exclusión y reducción de presas — en primavera y principios del verano.',
      ],
    },
    {
      h2: 'Por qué rociar hace menos de lo que uno esperaría',
      parrafos: [
        'Vale la pena hablarlo claro, porque es la razón por la que nuestro enfoque se apoya en trabajo físico más que en producto.',
        'Las arañas están hechas distinto de los insectos, y eso importa aquí. Caminan sobre la punta de las patas, así que tocan mucha menos superficie tratada que una cucaracha o una hormiga que cruza la misma franja. No se acicalan como los insectos, así que ingieren menos de lo que sí tocan. Y son depredadoras y no recolectoras: no las atrae un cebo, y no siguen un rastro que se pueda interceptar.',
        'Lo que sí funciona es una combinación. Quitar las telarañas: bajar físicamente la telaraña y los sacos de huevos le quita a la población su infraestructura y su siguiente generación al mismo tiempo. Es poco vistoso y es lo más efectivo que se hace en un trabajo de arañas.',
        'Cortar la comida. Las arañas están donde está su presa. Una casa con mucha presión de insectos por fuera va a tener arañas sin importar qué se le rocíe al revestimiento, y bajar los insectos baja las arañas de forma más confiable que tratar a las arañas.',
        'Arreglar la iluminación. Es la intervención más subestimada. Las luces blancas de afuera jalan insectos voladores toda la noche, y las arañas se instalan exactamente donde está la comida. Cambiar a focos de tono cálido o amarillo, o mover las lámparas lejos de las puertas, baja visiblemente la población de arañas alrededor de las entradas en una temporada.',
        'Cerrar las rendijas: barredoras de puerta, burletes, mosquiteros de ventana, malla en las rejillas, y los huecos alrededor de las penetraciones de servicio.',
        'Y después tratar, en los lugares correctos. Aplicación exterior dirigida alrededor de las entradas, los aleros y el cimiento, en primavera y principios del verano cuando más sirve, en lugar de rociar el interior entero.',
      ],
    },
    {
      h2: 'El año de la araña aquí',
      parrafos: [
        'De febrero a abril. Los sacos de huevos del año anterior eclosionan y las arañitas se dispersan. Casi nadie lo nota, y es el momento más barato del año para intervenir, porque quitar sacos de huevos a finales del invierno evita una población en lugar de reducirla.',
        'De mayo a julio. Crecimiento. Las poblaciones se forman junto con sus presas, y la telaraña empieza a acumularse en los aleros, las entradas y los muebles de afuera. Esta es la ventana en que el tratamiento y el retiro de telarañas hacen más bien, y es la que la mayoría de la gente se salta.',
        'De agosto a octubre. La temporada de andar. Los machos maduros dejan sus redes para buscar hembras, y es cuando aparecen las arañas grandes adentro y cuando llegan las llamadas. Es también, por desgracia, el momento menos productivo para tratar.',
        'De noviembre a enero. La actividad cae de golpe. Las hembras que sobreviven se resguardan y los sacos de huevos pasan el invierno esperando la primavera. Buen momento para el trabajo de limpieza — quitar telaraña del espacio bajo el piso, de las cocheras, de los cobertizos y de los aleros — porque nada la está reconstruyendo de inmediato.',
      ],
    },
    {
      h2: 'Las mordidas, dicho claro',
      parrafos: [
        'La mordida de araña se diagnostica muchísimo de más, en Washington y en todas partes. Los estudios que dan seguimiento a supuestas mordidas de araña encuentran de forma consistente que la mayoría resultan ser otra cosa — con frecuencia infecciones bacterianas de la piel, que se pueden ver muy parecidas y son bastante más comunes que una araña que mordió a alguien mientras dormía.',
        'La mayoría de las arañas locales no pueden atravesar de manera significativa la piel humana, y las que sí pueden en general solo muerden cuando quedan atrapadas contra el cuerpo — alguien se les recargó en la cama, quedaron apretadas dentro de la ropa, o dentro de un guante. La mordida sin provocación es rara.',
        'Si tiene una lesión que le preocupa, el paso útil es un médico y no una empresa de control de plagas, y lo útil que puede llevar es la araña si la tiene. Nosotros podemos identificar lo que usted atrapó. No podemos diagnosticar una herida, y le haríamos un mal servicio adivinando.',
      ],
    },
    {
      h2: 'Cuándo sí vale la pena tratar',
      parrafos: [
        'Nos pasamos casi toda esta página convenciéndolo de no hacer trabajo innecesario, así que aquí va el otro lado.',
        'El tratamiento vale la pena cuando la telaraña persiste en entradas, aleros, porches y áreas de estar al aire libre y sigue regresando después de quitarla. Cuando hay una población fuerte en una cochera, un cobertizo o un espacio bajo el piso que la gente usa seguido. Cuando alguien en la casa tiene una fobia de verdad — es un asunto real de calidad de vida y no lo descartamos. Cuando un sitio comercial tiene un estándar de apariencia, que en hotelería, salud, manejo de alimentos y comercio es un requisito legítimo del negocio y no un gusto. Y cuando de verdad está presente una araña que sí merece atención, como una población de araña saco amarilla en el área donde se vive.',
        'Lo que no vamos a hacer es decirle que una araña doméstica gigante en su tina en septiembre es un peligro para su familia.',
      ],
    },
    {
      h2: 'Qué hacer con la que está en su tina',
      parrafos: [
        'La pregunta práctica que de verdad tiene la gente en septiembre.',
        'Una araña doméstica gigante en una tina está atorada: los lados son demasiado lisos para subir y se cayó en la noche mientras cazaba. No está ahí para amenazar a nadie. Échele una toalla o un tramo de papel de baño y va a salirse sola, o atrápela bajo un vaso con una tarjeta deslizada por debajo y sáquela.',
        'Tampoco subió por el drenaje, que es lo otro que pregunta la gente. Una trampa de drenaje que funciona guarda agua estancada en la curva debajo de la coladera, y una araña no va a nadar hacia arriba a través de ella. Lo que pasó es que una que andaba cazando por el piso en la noche pasó por el borde, encontró el esmalte demasiado resbaloso para volver a salir, y seguía ahí en la mañana. Por eso tapar el drenaje o abrir la llave del agua caliente no cambia nada de cuántas va a encontrar el próximo septiembre.',
        'Matarla es una decisión, no una necesidad, y vale la pena saber qué va con ella. Es una depredadora territorial que se come insectos cada noche y también a otras arañas, y pertenece a la especie a la que la Universidad de California le acredita haber desplazado a la araña vagabunda en partes de esta región. La que usted quita estaba defendiendo terreno contra algo.',
        'Si quiere que la identifiquemos, tómele una foto desde arriba con algo de referencia para el tamaño antes de soltarla. Identificamos gratis, y una foto resuelve casi todas las preguntas en un minuto.',
        'Lo que le pediríamos es que no compre una bomba fumigadora. Los aerosoles de descarga total son casi inútiles contra las arañas: no llegan a donde se refugian, dejan residuo sobre superficies que la gente toca, y matan a los insectos que estaban alimentando a algo que usted preferiría conservar.',
      ],
    },
    {
      h2: 'Espacio bajo el piso, cocheras y bodegas',
      parrafos: [
        'Casi todo el volumen de arañas en cualquier propiedad del condado de Whatcom está en los espacios donde la gente no pasa tiempo, y ahí es donde casi siempre pasa el trabajo útil.',
        'El espacio bajo el piso. La araña de sótano y la araña doméstica gigante prosperan ahí abajo porque nadie las molesta, hay humedad y está lleno de presas. En la vivienda vieja de Bellingham con un espacio bajo el piso sin sellar, eso es en la práctica un depósito que vuelve a surtir el área de vivienda de arriba. Quitar la telaraña y atender la humedad hace más que cualquier tratamiento interior.',
        'Cocheras y cobertizos. Cajas guardadas, material apilado y esquinas que nadie mueve son refugio ideal, y una cochera pegada a la casa es una puerta. Es el lugar más común donde encontramos telaraña pesada en un trabajo residencial.',
        'Graneros y bodegas. Las propiedades rurales alrededor de Lynden, Everson y Nooksack tienen poblaciones enormes de arañas en las bodegas, y en la mayoría de los casos están haciendo trabajo útil contra las moscas y otros insectos. Quitamos lo que estorba y dejamos el resto, a menos que sea un edificio donde la gente trabaja todos los días.',
        'Lanchas y guardado de temporada. Los amarres techados y el equipo guardado alrededor de Blaine, Birch Bay y los puertos acumulan telaraña toda la temporada baja sin que nadie la toque. Una limpieza en primavera muchas veces es el servicio completo.',
        'Lo común a los cuatro es que limpiar y secar el espacio le gana a rociarlo, y que el resultado dura una temporada y no dos semanas.',
      ],
    },
    {
      h2: 'Por el condado',
      parrafos: [
        'Bellingham viejo — Lettered Streets, Columbia, Sunnyland, York, South Hill. Espacios bajo el piso sin sellar, ventanas originales de un solo vidrio y un siglo de rendijas por asentamiento dan mucho refugio interior. Araña de sótano debajo del piso, araña doméstica gigante en el área de vivienda.',
        'Contra la línea de árboles — Sudden Valley, Silver Beach, Edgemoor y el corredor de Whatcom Falls. Mucha presión de insectos desde los árboles y el agua, lo que quiere decir muchas arañas sin importar el tratamiento. Aquí la elección de iluminación exterior importa más que en cualquier otra parte del condado.',
        'Ladera nueva — Alabama Hill, Barkley, Cordata. Mejor sellado, así que el problema más seguido es telaraña en aleros, entradas y áreas de estar de afuera que arañas adentro.',
        'Rural y agrícola — Lynden, Everson, Nooksack, Sumas. Las bodegas, el guardado de maquinaria y los graneros tienen poblaciones grandes, y en esas estructuras las arañas en su mayoría están haciendo trabajo útil.',
        'La costa — Blaine, Birch Bay y Semiahmoo. Las casas de temporada que pasan vacías los meses de lluvia acumulan telaraña sin que nadie la toque, así que la visita de primavera muchas veces es sobre todo limpieza y no tratamiento.',
      ],
    },
    {
      h2: 'Cómo trabajamos, y cuánto cuesta',
      parrafos: [
        'Identificamos lo que de verdad hay, y lo decimos con honestidad. Quitamos telaraña y sacos de huevos de aleros, entradas, esquinas, porches y bodegas. Evaluamos y reducimos la base de presas, incluida la cuestión de la iluminación. Aplicamos tratamiento exterior dirigido en las entradas, el cimiento y los aleros, en el momento en que importa. Recomendamos el trabajo de exclusión que cierra las rendijas para siempre. Y programamos en primavera y principios del verano donde podemos, porque es cuando este trabajo rinde.',
        'El trabajo de arañas se cotiza según la propiedad, y el número sigue a cuánto trabajo físico hay más que a cuánto producto se aplica. Una casa con telaraña en aleros, entradas y un porche que hay que limpiar, más un tratamiento exterior dirigido, es una visita sencilla. Lo que sube el número es la escala y el acceso: una casa de dos pisos con aleros profundos, una bodega grande, o un espacio bajo el piso y una cochera que llevan años sin limpiarse y son en la práctica un trabajo de limpieza antes de cualquier otra cosa.',
        'Los programas exteriores recurrentes tienen más sentido para las arañas que para la mayoría de las plagas que atendemos, porque lo que las mueve es presión exterior continua y no una colonia que eliminar. Si esa es la respuesta correcta para su propiedad se lo vamos a decir, y si una sola visita en primavera basta, le vamos a decir eso. La estimación no se cobra, e incluye la versión honesta de si el trabajo vale la pena hacerlo.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Hay arañas peligrosas aquí?',
      a: 'Mándenos una foto antes de suponerlo. La gran mayoría de lo que se encuentra en casas del condado de Whatcom es inofensivo. La viuda negra es poco común de este lado de las Cascadas y la reclusa café no está establecida en Washington. La identificación va primero, antes del tratamiento y antes del presupuesto.',
    },
    {
      q: '¿La araña vagabunda es peligrosa?',
      a: 'El Departamento de Salud de Washington dice que no se considera tan peligrosa como se pensaba, y que la evidencia no respalda que su mordida cause necrosis. Esa fama viene de estudios de los años ochenta y noventa que no se confirmaron después.',
    },
    {
      q: '¿Por qué hay tantas arañas grandes en septiembre?',
      a: 'Son machos de araña doméstica gigante buscando pareja, no arañas huyendo del frío. Muchas ya vivían dentro y alrededor de la casa. La temporada se acaba sola en unas semanas.',
    },
    {
      q: '¿Sirve una bomba fumigadora?',
      a: 'Casi nada contra las arañas. No llega a donde se esconden, deja residuo en superficies que la gente toca, y mata a los insectos de los que se alimentan. Quitar telarañas, cambiar la iluminación exterior y sellar rendijas hace mucho más.',
    },
  ],
};
