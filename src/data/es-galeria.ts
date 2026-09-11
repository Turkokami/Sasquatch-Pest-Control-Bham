/* --------------------------------------------------------------------------
 * LA GALERÍA EN ESPAÑOL — títulos y texto alternativo, 11 Sep 2026.
 *
 * src/data/gallery.ts se genera y se sobrescribe, así que el español vive
 * aquí, con la ruta de cada imagen como llave. /es/galeria/ lanza un error
 * en el build si una imagen que muestra no tiene su texto aquí: una imagen
 * nueva en la galería inglesa no puede aparecer en la española con el alt
 * en inglés ni sin alt.
 *
 * LO QUE NO PASA A ESPAÑOL: el trabajo con aves. Está abierto en
 * GUARDRAILS.md §8 y no se repite en un segundo idioma hasta que el dueño
 * decida. Son dieciséis imágenes: trece cuyo propio alt dice que son
 * exclusión de aves, y tres (g27714, g27716, g27731) que el alt llama
 * "exclusión" o "trabajo comercial" pero que, vistas, son el mismo trabajo
 * de red en la entrada de la misma tienda, con la misma plataforma. El
 * filtro por palabra no las habría atrapado; se revisaron una por una.
 *
 * Los textos describen lo que se ve y siguen al alt de la biblioteca, sin
 * agregar nada que la foto no muestre.
 * ------------------------------------------------------------------------ */

export const SIN_AVES = new Set<string>([
  '/img/gallery/g27717.jpg',
  '/img/gallery/g27715.jpg',
  '/img/gallery/g27714.jpg',
  '/img/gallery/g27713.jpg',
  '/img/gallery/g27716.jpg',
  '/img/gallery/g27731.jpg',
  '/img/gallery/g27730.jpg',
  '/img/gallery/g27729.jpg',
  '/img/gallery/g27728.jpg',
  '/img/gallery/g27727.jpg',
  '/img/gallery/g27726.jpg',
  '/img/gallery/g27724.jpg',
  '/img/gallery/g27723.jpg',
  '/img/gallery/g27722.jpg',
  '/img/gallery/g27721.jpg',
  '/img/gallery/g27719.jpg',
]);

export const TITULOS: Record<string, string> = {
  crawlspaces: 'Espacios bajo el piso',
  exclusion: 'Exclusión y trabajo en metal',
  insulation: 'Aislamiento',
  rodents: 'Trabajo de roedores',
  stinging: 'Avispas, avispones y abejas',
  pests: 'Los insectos que tratamos',
  commercial: 'Trabajo comercial',
  crew: 'El equipo y las camionetas',
  country: 'La tierra donde trabajamos',
};

export const ALT_ES: Record<string, string> = {
  // Avispas, avispones y abejas
  '/img/gallery/g27532.jpg': 'Un nido de avispón construido en un arbusto del patio',
  '/img/gallery/g27439.jpg': 'Foto de cerca de un abejorro, un polinizador útil que se ve seguido en casas y jardines',
  '/img/gallery/g27239.jpg': 'Un nido grande de avispón pegado a un tanque sobre grava, encontrado en una visita',
  '/img/gallery/g27238.jpg': 'Un nido de avispón abierto durante el retiro, con el panal de papel y las larvas a la vista',
  '/img/gallery/g27237.jpg': 'Un técnico retirando con una manguera de aspiradora un nido de avispón de un tanque',
  '/img/gallery/g27231.jpg': 'Un nido de avispa de papel construido bajo el pico del hastial de una casa',
  '/img/gallery/g27230.jpg': 'De cerca, un nido de avispa o avispa amarilla metido en la esquina del alero de una casa',
  '/img/gallery/g27224.jpg': 'Un nido de avispa de papel descubierto dentro de una pared, entre el aislamiento',
  '/img/gallery/g27157.jpg': 'Una avispa en una pared blanca interior',
  '/img/gallery/g27156.jpg': 'Una avispa en una pared blanca texturizada',
  '/img/gallery/g27155.jpg': 'Una avispa en una pared de estuco texturizado',
  '/img/gallery/g27154.jpg': 'Una avispa sobre estuco texturizado, de cerca',
  '/img/gallery/g27153.jpg': 'Una avispa sobre una pared de estuco, vista de lado',
  '/img/gallery/g26963.jpg': 'Un nido de avispón colgando entre follaje verde',
  '/img/gallery/g26740.jpg': 'Un nido grande de avispón de papel ya retirado, en la caja de una camioneta',
  '/img/gallery/g26739.jpg': 'Otro ángulo del nido grande de avispón retirado, en la caja de la camioneta',
  // Los insectos que tratamos
  '/img/gallery/g27140.jpg': 'Una cucaracha en una pared rodeada de excremento y manchas, señal de una infestación que se trató',
  '/img/gallery/g27139.jpg': 'Una cucaracha junto a la bisagra y el marco de una puerta, señal de una infestación encontrada',
  '/img/gallery/g27138.jpg': 'Cucarachas muertas en la esquina de un piso después de un tratamiento',
  '/img/gallery/g27094.jpg': 'Montones de aserrín de hormiga carpintera en una viga del espacio bajo el piso',
  '/img/gallery/g27093.jpg': 'Aserrín de hormiga carpintera acumulado en la madera de un espacio bajo el piso',
  '/img/gallery/g26864.jpg': 'Una mantis religiosa verde, fauna útil que encontramos durante un trabajo',
  '/img/gallery/g26863.jpg': 'Una mantis religiosa verde subiendo por una pared',
  '/img/gallery/g26861.jpg': 'Una mantis religiosa verde sobre grava',
  '/img/gallery/g26940.jpg': 'Un grupo denso de arañitas sobre una superficie que refleja',
  '/img/gallery/g26939.jpg': 'Muchas arañitas repartidas sobre una superficie',
  '/img/gallery/g26862.jpg': 'Una mantis religiosa verde sobre grava, vista de cerca',
  '/img/gallery/g26769.jpg': 'Una mantis religiosa verde en el parabrisas de una camioneta',
  '/img/gallery/g26768.jpg': 'Una mantis religiosa verde en un parabrisas, desde otro ángulo',
  '/img/gallery/g26767.jpg': 'Una mantis religiosa parada en el espejo lateral de una camioneta',
  '/img/gallery/g26766.jpg': 'Una mantis religiosa en el parabrisas de una camioneta, con el sol detrás',
  '/img/gallery/g26765.jpg': 'Una mantis religiosa en la ventana de una camioneta',
  // Trabajo de roedores
  '/img/gallery/g27234.jpg': 'Un hueco oscuro entre las piedras de un cimiento, una entrada para roedores',
  '/img/gallery/g27233.jpg': 'Un hueco abierto alrededor de un tubo blanco de PVC donde atraviesa una pared, una entrada común de roedores',
  '/img/gallery/g27229.jpg': 'Túneles de roedores revolviendo el aislamiento suelto de un ático',
  '/img/gallery/g27228.jpg': 'De cerca, túneles de roedores en el aislamiento',
  '/img/gallery/g27227.jpg': 'Una tabla de cimbra podrida en un espacio bajo el piso con barrera de vapor azul, por donde entran roedores',
  '/img/gallery/g27147.jpg': 'Aislamiento de tubería mordido por roedores en un espacio bajo el piso',
  '/img/gallery/g27146.jpg': 'Excremento de roedor y daño sobre una barrera de vapor negra en un espacio bajo el piso',
  '/img/gallery/g27145.jpg': 'Tierra removida y una barrera de vapor rota por túneles de roedores',
  '/img/gallery/g27137.jpg': 'Estaciones de cebo para roedores y un tubo de sellador listos en una esquina durante una visita',
  '/img/gallery/g27136.jpg': 'Un hueco bajo el revestimiento donde entran tubos a una casa, una posible entrada de roedores',
  '/img/gallery/g27134.jpg': 'Una rata muerta sobre grava, retirada en un trabajo de roedores',
  '/img/gallery/g27111.jpg': 'Excremento de roedor y basura en el umbral de una puerta, encontrado en una revisión',
  '/img/gallery/g27101.jpg': 'Un roedor en una repisa contra una pared',
  '/img/gallery/g27100.jpg': 'Un roedor sobre una superficie, de noche',
  '/img/gallery/g27097.jpg': 'Material de nido de roedor apelmazado en el aislamiento de un espacio bajo el piso',
  '/img/gallery/g27096.jpg': 'Una caja de cartón en una cochera llena de semillas y material de nido guardados por un roedor',
  // Aislamiento
  '/img/gallery/g26372.jpg': 'Un descanso durante la instalación de aislamiento',
  '/img/gallery/g27149.jpg': 'Aislamiento rosa en un espacio bajo el piso, durante una revisión',
  '/img/gallery/g27148.jpg': 'Un pedazo de aislamiento rosa sobre una barrera de vapor oscura',
  '/img/gallery/g27144.jpg': 'Un hueco en el cimiento junto al aislamiento y la barrera de vapor, una posible entrada de plagas',
  '/img/gallery/g27060.jpg': 'Tubería forrada de aislamiento y sostenida con alambre en un espacio bajo el piso',
  '/img/gallery/g27000.jpg': 'Un tubo forrado de aislamiento en un espacio bajo el piso húmedo',
  '/img/gallery/g26995.jpg': 'Excremento de roedor regado sobre el aislamiento de un espacio bajo el piso',
  '/img/gallery/g26994.jpg': 'Excremento de roedor sobre aislamiento esponjoso',
  '/img/gallery/g26993.jpg': 'Un tubo forrado de aislamiento de aluminio en un espacio bajo el piso',
  '/img/gallery/g26950.jpg': 'Aislamiento bajo el piso y la orilla de una barrera de vapor',
  '/img/gallery/g26949.jpg': 'Aislamiento bajo el piso y la orilla de una barrera de vapor azul',
  '/img/gallery/g26947.jpg': 'Basura vieja y excremento de roedor en la orilla de un espacio bajo el piso, antes del trabajo de aislamiento',
  '/img/gallery/g26944.jpg': 'Aislamiento roto colgando junto a cables en un espacio bajo el piso',
  '/img/gallery/g26927.jpg': 'Un espacio bajo el piso con aislamiento y ductos sobre la barrera de vapor',
  '/img/gallery/g26926.jpg': 'Aislamiento instalado bajo el piso',
  '/img/gallery/g26925.jpg': 'Aislamiento bajo el piso, durante una revisión',
  // Espacios bajo el piso
  '/img/gallery/g27170.jpg': 'Una puerta de madera de acceso al espacio bajo el piso en el cimiento de una casa',
  '/img/gallery/g27090.jpg': 'Una puerta de acceso dañada y la abertura oscura del espacio bajo el piso',
  '/img/gallery/g27099.jpg': 'Un técnico con respirador y lámpara de cabeza para trabajar bajo el piso',
  '/img/gallery/g26923.jpg': 'Técnicos con trajes de protección en un trabajo de espacio bajo el piso',
  '/img/gallery/g26811.jpg': 'Un técnico trabajando con lámpara de cabeza en un espacio bajo el piso oscuro',
  '/img/gallery/g26708.jpg': 'Un técnico con respirador y lámpara de cabeza, listo para entrar bajo el piso',
  '/img/gallery/g27160.jpg': 'Hongo blanco sobre madera en un espacio bajo el piso, señal de humedad',
  '/img/gallery/g27159.jpg': 'Un tubo y escombro de concreto en un espacio bajo el piso',
  '/img/gallery/g27152.jpg': 'Escombro de concreto y estructura en una esquina del espacio bajo el piso',
  '/img/gallery/g27151.jpg': 'Una ventila del espacio bajo el piso con grava y basura en la madera',
  '/img/gallery/g27110.jpg': 'Una aspiradora de taller y herramientas listas para trabajar bajo el piso',
  '/img/gallery/g27109.jpg': 'Una tapa negra aislada sobre un pozo de acceso forrado de metal, parte de un trabajo de exclusión',
  '/img/gallery/g27088.jpg': 'Ventilas y un hueco en el cimiento que dan acceso a los roedores',
  '/img/gallery/g27078.jpg': 'Un pozo de acceso forrado de metal, con tapa, en el cimiento de una casa',
  '/img/gallery/g27075.jpg': 'Una barrera de vapor oscura tendida sobre la tierra de un espacio bajo el piso',
  '/img/gallery/g27062.jpg': 'Agua estancada sobre la barrera de vapor de un espacio bajo el piso',
  // Exclusión y trabajo en metal
  '/img/gallery/g27172.jpg': 'La línea del techo y la canaleta de una casa',
  '/img/gallery/g27171.jpg': 'Un hueco oscuro entre las tablas del revestimiento de una casa, una posible entrada de plagas',
  '/img/gallery/g27712.jpg': 'Malla de exclusión puesta sobre un hueco en una pared de estuco',
  '/img/gallery/g27108.jpg': 'Un hueco donde una tabla de la terraza toca el revestimiento de la casa',
  '/img/gallery/g27087.jpg': 'Una ventila de secadora de plástico con persianas en el revestimiento de una casa',
  '/img/gallery/g27086.jpg': 'Otro ángulo de una ventila de secadora de plástico, revisada como posible entrada de plagas',
  '/img/gallery/g27085.jpg': 'Un muro de cimiento aplanado y agrietado, con malla de alambre',
  '/img/gallery/g27083.jpg': 'Escombro suelto y un hueco en el cimiento de una casa, una posible entrada de roedores',
  '/img/gallery/g27080.jpg': 'Un hueco donde el revestimiento toca la losa del cimiento',
  '/img/gallery/g27077.jpg': 'Un bajante desaguando junto al cimiento y el revestimiento de una casa',
  '/img/gallery/g27073.jpg': 'Un hueco donde el umbral de una puerta toca una losa de concreto',
  '/img/gallery/g27061.jpg': 'Un hueco en un cimiento de block sellado con espuma',
  // Trabajo comercial
  '/img/gallery/g27203.jpg': 'El interior de un taller de estructura de acero, con mesas de trabajo, herramientas y una dobladora de tubo',
  '/img/gallery/g25779.jpg': 'Kris Elling aplicando un tratamiento previo en una obra comercial en construcción',
  '/img/gallery/g27464.jpg': 'Una tarima envuelta en plástico con cebo y material de control de plagas',
  '/img/gallery/g26726.jpg': 'Una camioneta rotulada estacionada frente a un local, con una estatua cerca',
  // El equipo y las camionetas
  '/img/gallery/g27169.jpg': 'Una camioneta rotulada estacionada en una entrada bordeada de árboles',
  '/img/gallery/g27540.jpg': 'Un técnico con respirador tratando el exterior de una casa',
  '/img/gallery/g27539.jpg': 'Un técnico con respirador y la aspersora en el exterior de una casa',
  '/img/gallery/g27538.jpg': 'Un técnico con respirador preparando un tratamiento en una casa',
  '/img/gallery/g26871.jpg': 'Un técnico parado con su equipo de tratamiento en una casa',
  '/img/gallery/g27236.jpg': 'Una camioneta rotulada junto a un cobertizo en una propiedad con bosque del condado de Whatcom',
  '/img/gallery/g27143.jpg': 'Un arcoíris sobre un bosque en otoño, fotografiado por un técnico en el campo',
  '/img/gallery/g27142.jpg': 'Un arcoíris sobre pinos y abetos, fotografiado por un técnico en el trabajo',
  '/img/gallery/g27141.jpg': 'Camionetas rotuladas estacionadas en una calle residencial durante las visitas',
  '/img/gallery/g27112.jpg': 'Una van verde rotulada que da servicio en Bellingham y el condado de Whatcom',
  '/img/gallery/g27091.jpg': 'Un amanecer rojo y naranja detrás de la silueta de los árboles, fotografiado por un técnico',
  '/img/gallery/g27089.jpg': 'Una camioneta rotulada en una entrada junto a unas cocheras, durante una visita',
  '/img/gallery/g27064.jpg': 'Un técnico con lentes de sol naranjas, sentado en un vehículo de servicio',
  '/img/gallery/g27044.jpg': 'Una van rotulada estacionada en una casa',
  '/img/gallery/g27043.jpg': 'Una van verde rotulada del servicio en Bellingham y el condado de Whatcom',
  '/img/gallery/g27042.jpg': 'Una van rotulada estacionada en una entrada',
  // La tierra donde trabajamos
  '/img/gallery/g26617.jpg': 'Una casa bajo los cables de luz al atardecer',
  '/img/gallery/g27166.jpg': 'Una bahía enmarcada por árboles bajo un cielo nublado del noroeste del Pacífico',
  '/img/gallery/g27165.jpg': 'Una vista nublada sobre una bahía en calma, desde la orilla',
  '/img/gallery/g27107.jpg': 'Un venado parado en el pasto alto de una propiedad del campo',
  '/img/gallery/g27106.jpg': 'Un venado comiendo de los arbustos de una casa',
  '/img/gallery/g27105.jpg': 'Un venado parado cerca de la entrada de una casa',
  '/img/gallery/g27104.jpg': 'Un venado comiendo arbustos junto a una casa',
  '/img/gallery/g27103.jpg': 'Un venado ramoneando en los arbustos del jardín',
  '/img/gallery/g27102.jpg': 'Un venado parado entre las plantas del jardín cerca de una casa',
  '/img/gallery/g27081.jpg': 'Un venado parado en el patio de una casa',
  '/img/gallery/g27079.jpg': 'Dos venados descansando en el patio de una casa',
  '/img/gallery/g26996.jpg': 'Un venado parado entre árboles en una propiedad',
  '/img/gallery/g26991.jpg': 'Un venado junto a una construcción en una propiedad del campo',
  '/img/gallery/g26989.jpg': 'Un atardecer de colores sobre una casa y los cables de luz',
  '/img/gallery/g26983.jpg': 'Una entrada con jardín, vista desde un vehículo',
  '/img/gallery/g26981.jpg': 'Una rana sobre grava junto a una estación de cebo',
};
