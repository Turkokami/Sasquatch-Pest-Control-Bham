import type { EsServicio } from './tipos';

/**
 * Polillas de la ropa y de la despensa, en español. Fuente:
 * src/content/services/moth-control.md. Escrita dentro de la banda de
 * Keystone v2 para un servicio.
 *
 * No se repiten frases de la página de escarabajos de alfombra y despensa
 * (escarabajos-de-alfombra-y-despensa.ts), aunque las dos hablan de guardar
 * en frascos y de congelar lo que se compra a granel: el escáner de hermanas
 * del arnés las revisa como páginas del mismo grupo.
 */
export const controlDePolillas: EsServicio = {
  slug: 'control-de-polillas',
  enPath: '/services/moth-control/',
  nav: 'Polillas',
  h1: 'Polillas de la Ropa y de la Despensa en Bellingham',
  title: 'Control de Polillas de Ropa y Despensa en Bellingham, WA',
  description:
    'Polilla de la ropa y polilla de la despensa en Bellingham y el condado de Whatcom: identificamos cuál es y encontramos de dónde sale. Llame al 360-410-2199.',
  answer:
    'Son dos problemas que no tienen nada que ver entre sí. La polilla de la ropa come lana, seda y piel en lugares oscuros y quietos. La de la despensa se cría en la comida guardada y vuela por la cocina. Cuál tiene lo decide todo, y la que vuela alrededor de su lámpara casi seguro no es ninguna.',
  secciones: [
    {
      h2: '¿Cuál de las dos tengo?',
      parrafos: [
        'La palabra "polilla" cubre dos situaciones que no comparten nada salvo el orden de insecto. La polilla de la ropa come fibras animales — lana, cachemira, seda, piel, plumas, cuero —; el daño lo hacen las larvas en lugares oscuros y quietos, y las adultas huyen de la luz y vuelan mal. La polilla de la despensa se cría en la comida guardada: las larvas viven en el paquete y las adultas vuelan por la cocina y hacia las luces, por eso se notan.',
        'Piden búsquedas, tratamientos y prevención distintos, y lo primero que establecemos es cuál es. Muchas veces no es ninguna: casi todas las polillas que la gente encuentra adentro son especies inofensivas de afuera que entraron por una puerta abierta y están dando vueltas a una luz.',
      ],
    },
    {
      h2: '¿Cómo es la polilla de la ropa?',
      parrafos: [
        'Hay dos especies. La polilla de la ropa común deja tubos y tapetitos de seda sobre la tela. La polilla de estuche construye un estuchito portátil que arrastra y desde el que come; encontrar esos estuchitos pegados a una prenda o a un tapete es inconfundible una vez que se han visto. Las adultas son chicas, lisas, color paja, de como un cuarto de pulgada, sin marcas llamativas, y vuelan débil, a revoloteos cortos y bajos, escondiéndose cuando las molestan.',
        'Las adultas no comen nada: no tienen piezas bucales que funcionen. Existen para aparearse y poner huevos. Por eso matar las que ve no cambia el daño, que lo están haciendo las larvas en otro lugar — y por eso tantas familias pasan una temporada aplastando polillas y siguen encontrando agujeros. Las larvas comen queratina, la proteína de la lana, la seda, la piel, las plumas, el pelo y el cuero. No comen algodón, lino, viscosa ni sintéticos, a menos que estén sucios: el residuo les da lo que necesitan y las telas mezcladas se dañan de paso.',
      ],
    },
    {
      h2: '¿Por qué importa que huyan de la luz?',
      parrafos: [
        'Es el diagnóstico más útil de la página. La polilla de la ropa evita activamente la luz, así que una polilla que da vueltas a su lámpara, que golpea una ventana o que se junta en la luz del porche casi seguro no es polilla de la ropa. La de la despensa sí vuela hacia la luz.',
        'Y le dice dónde buscar. El daño pasa donde no llega la luz y donde nada se mueve: el fondo de un clóset, la parte de abajo de un tapete debajo de un mueble que nunca se mueve, adentro de una caja guardada, en el ático, debajo de la cama, adentro de una funda de ropa, en los dobleces de las cobijas guardadas, y en las costuras y cuellos de la ropa colgada al final del tubo. Una prenda que se usa seguido casi nunca se daña; las que se comen son las que nadie ha tocado desde el invierno pasado.',
      ],
    },
    {
      h2: '¿Por qué solo se dañó un suéter?',
      parrafos: [
        'Casi siempre por la suciedad. La larva prefiere las fibras de queratina con sudor, grasa del cuerpo, restos de comida u orina: esos residuos le dan humedad y nutrientes extra, y hacen que una prenda sea mucho más atractiva que la limpia de junto. La pérdida clásica es la prenda de lana que se usó una vez al final de la temporada y se guardó sin lavar: entra al almacenaje con exactamente las señales que atraen a la polilla a poner huevos, y sale en otoño con agujeros mientras todo lo de alrededor está bien.',
        'Así que lavar antes de guardar es la medida preventiva más efectiva que existe, y no cuesta más de lo que usted haría de todos modos.',
      ],
    },
    {
      h2: '¿Qué funciona contra la polilla de la ropa?',
      parrafos: [
        'Encontrar y limpiar la fuente: todo lo que hay en el área afectada se revisa y se limpia, y la tintorería o un lavado caliente matan todas las etapas en lo que se puede lavar. Frío o calor para lo que no se lava: varios días en el congelador, de preferencia con un rato de calentar y una segunda congelada, matan huevos y larvas en las prendas delicadas, y algunas piezas aguantan calor en su lugar. Así se tratan los textiles valiosos sin ningún químico cerca.',
        'Aspirar a fondo y seguido: las orillas de la alfombra, debajo y detrás de los muebles, el piso y los estantes del clóset, los zoclos y el interior de las rejillas de la calefacción, donde se junta pelusa y pelo; vacíe la aspiradora afuera. Tratar los escondites y no la tela: aplicación dirigida a la estructura del clóset, las orillas de la alfombra, debajo de los muebles fijos y los zoclos. No rociamos ropa ni camas. Y trampas de feromona para confirmar que la población de verdad baja; en una colección valiosa vale la pena dejarlas siempre. Después, guardar bien: en contenedores cerrados en lugar de cartón, en fundas que de verdad cierren, y solo prendas limpias.',
      ],
    },
    {
      h2: '¿Sirven las bolitas de naftalina y el cedro?',
      parrafos: [
        'Las dos se usan mucho y se usan mal. La naftalina es un fumigante: funciona solo en un contenedor cerrado donde el vapor se acumula hasta una concentración efectiva, y a esa concentración no es un lugar donde usted quiera meter la cara. Regada en un clóset abierto produce olor y casi nada más; además hay que tenerla lejos de niños y mascotas, y el olor en la tela cuesta quitarlo.',
        'El cedro sí repele cuando los aceites están frescos y puede desanimar a la polilla de poner huevos en cierta medida. Pero no mata larvas que ya están, pierde efecto en un año o dos conforme se van los aceites, y un clóset de cedro lleno de lana sucia se la van a comer igual. Lijar un poco la madera le devuelve algo del efecto.',
      ],
    },
    {
      h2: '¿Y la polilla de la despensa?',
      parrafos: [
        'La palomilla de la harina es la común: una polilla de como media pulgada de ala a ala, con las alas de dos tonos: gris pálido cerca del cuerpo y con brillo cobrizo en la parte de afuera. Las adultas vuelan por la cocina y sí van hacia la luz. Las larvas viven adentro del paquete, y lo que las delata es la seda que amarra el contenido: harina, cereal, granos, fruta seca, nueces, alpiste o croquetas apelmazados con hilos. Eso no aparece en un producto sin infestar.',
        'La fuente casi siempre es un paquete, y muchas veces no el que la gente sospecha: la bolsa grande de croquetas en la cochera, el alpiste, o un adorno que nadie pensó como comida. Lo que está infestado se va afuera de la casa; lo demás se congela o se guarda en frascos herméticos. Y las larvas, cuando están por convertirse en pupa, salen del paquete y suben por las paredes hasta el techo — por eso aparecen gusanitos en la unión de la pared y el techo de la cocina, lejos de la alacena. No hace falta tirar toda la despensa; el error común es tirar todo y dejar la fuente de verdad.',
      ],
    },
    {
      h2: '¿Cuánto cuesta?',
      parrafos: [
        'Se cotiza después de la visita, y casi siempre es poco, porque los dos son problemas localizados. Donde hay una colección de lana, tapetes antiguos o textiles valiosos, díganoslo al cotizar, porque cambia qué tan cuidadoso tiene que ser el trabajo y cuánto de él es congelar y limpiar en lugar de tratar. Y si la respuesta es "lave ese suéter y guarde la harina en frascos", eso le decimos. La estimación no se cobra.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Salió una polilla de mi clóset. ¿Está en riesgo mi ropa?',
      a: 'Tal vez, y lo que hay que revisar es la seda, no la polilla. La larva de la polilla de la ropa deja seda — tubos, tapetitos o estuchitos — en la tela que come. Si encuentra seda en una costura, debajo de un cuello o al fondo de un estante, es una infestación de verdad. Una polilla sola sin seda puede no ser nada.',
    },
    {
      q: '¿La polilla de la ropa vuela hacia la luz?',
      a: 'No, y es el dato más útil para distinguirla. Huye de la luz y vuela débil, bajito, y se esconde si la molestan. Las polillas que dan vueltas a una lámpara o a la luz del porche casi siempre son especies inofensivas de afuera. La de la despensa sí va a la luz.',
    },
    {
      q: 'Hay polillitas por toda mi cocina. ¿Qué son?',
      a: 'Polilla de la despensa, y la fuente es un paquete. Busque seda y grumos adentro de granos, harina, cereal, fruta seca, nueces, alpiste o croquetas. Lo que la delata es la seda que amarra el contenido.',
    },
    {
      q: '¿Tengo que tirar todo?',
      a: 'No. Tire lo que de verdad está infestado, y congele o guarde bien lo demás. El error común es tirar toda la despensa y dejar la fuente real, que muchas veces es la comida de mascota, el alpiste o un adorno.',
    },
  ],
};
