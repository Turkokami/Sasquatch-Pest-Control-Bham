import type { EsServicio } from './tipos';

/**
 * Control de plagas comercial, en español. Fuente: la versión en inglés en
 * src/content/services/commercial-pest-control.md. Escrita dentro de la banda
 * de Keystone v2 para un servicio.
 *
 * Las páginas por industria viven en /es/comercial/ desde el 10 Sep 2026, y la
 * plantilla de servicios le pone a esta un riel hacia ellas. Antes esta era la
 * única entrada en español para un dueño de negocio y las industrias se
 * nombraban sin enlace.
 */
export const controlDePlagasComercial: EsServicio = {
  slug: 'control-de-plagas-comercial',
  enPath: '/services/commercial-pest-control/',
  nav: 'Negocios',
  h1: 'Control de Plagas para Negocios en el Condado de Whatcom',
  title: 'Control de Plagas Comercial en Bellingham, WA',
  description:
    'Programas de control de plagas para negocios en Bellingham y Whatcom: dispositivos mapeados y registros listos para una auditoría. Llame al 360-410-2199.',
  answer:
    'Un programa comercial no es una visita de casa hecha más seguido. La colocación de dispositivos va mapeada, cada visita deja un registro que se sostiene solo, y el trabajo se programa alrededor de su operación. Para un negocio que recibe inspecciones y auditorías, la documentación es parte de lo que se entrega, no un extra.',
  secciones: [
    {
      h2: '¿Qué es de verdad un programa comercial?',
      parrafos: [
        'Antes de comparar cotizaciones conviene entender esto: un programa comercial no es el servicio residencial hecho más seguido. Es otro producto. El servicio se documenta, no nada más se hace: cada visita deja un registro de qué se revisó, qué se encontró, qué se hizo y qué necesita atención de su lado. Ese registro es lo que pide un inspector, un auditor o una aseguradora, y es la razón por la que el programa existe como existe.',
        'Los dispositivos se mapean, no nada más se ponen: monitores y estaciones tienen posiciones numeradas en un plano del sitio, para que cualquiera vea el arreglo sin creerle a un técnico y para que los datos a lo largo del tiempo signifiquen algo. El alcance cubre lo que un programa de casa nunca toca — andenes y cortinas metálicas, encierros de basura y la losa de abajo, ductos de servicio entre locales, almacenes de producto y de alimento, coladeras, cuartos de máquinas, y el perímetro como sistema y no como una pared. Y corre con su horario: en restaurantes, tiendas y salud casi siempre es antes de abrir o después de cerrar, y se fija al principio en lugar de negociarse cada visita.',
      ],
    },
    {
      h2: '¿Qué quiere decir manejo integrado de plagas en la práctica?',
      parrafos: [
        'El término se usa muy suelto, así que esto es lo que quiere decir en un sitio y no en un folleto. Primero, revisar e identificar: qué hay, dónde y cuánto. La especie decide todo lo demás, y un programa que consiste en "rociamos el perímetro cada mes" no es un programa.',
        'Monitoreo con umbrales: dispositivos que dicen si la presión sube o baja, y un nivel de actividad acordado que dispara una acción. El monitoreo es la diferencia entre responder a una queja y ver una tendencia tres semanas antes. Medidas sin químicos antes que las químicas: exclusión, corrección de limpieza, quitar escondites, mantenimiento de coladeras, manejo de basura y trabajo físico con dispositivos. En un negocio eso hace casi todo el trabajo que dura. Aplicación dirigida donde se justifica, en el lugar que dice la biología y en la cantidad que pide la situación, registrada con producto, dosis, lugar y técnico. Y revisión: los datos se ven a lo largo del tiempo, para que un problema que se repite en un área reciba atención estructural en lugar de un tratamiento repetido.',
      ],
    },
    {
      h2: '¿Qué incluye el registro?',
      parrafos: [
        'Vale la pena detallarlo, porque "damos documentación" quiere decir cosas muy distintas en empresas distintas. Un reporte de servicio por cada visita: fecha, técnico, áreas revisadas, hallazgos por lugar, acciones, productos con dosis y sitio, dispositivos atendidos, y recomendaciones con responsable asignado. Un plano de dispositivos con la posición numerada de cada monitor y estación, actualizado cuando algo se mueve, para que un auditor recorra el sitio contra el plano.',
        'Datos de tendencia — actividad por dispositivo y por área a lo largo del tiempo —, que es lo que convierte una pila de reportes en algo que se puede manejar. Registros de productos, con etiquetas y hojas de seguridad disponibles en el sitio. Y una bitácora de acciones correctivas: lo que le toca a su negocio, escrito, con fecha y seguimiento, en lugar de mencionado de pasada a quien estuviera en la puerta.',
        'La prueba que nos ponemos: si un inspector o un auditor le pide el expediente de control de plagas y usted se lo entrega sin llamarnos para que lo expliquemos, la documentación está haciendo su trabajo.',
      ],
    },
    {
      h2: '¿Dónde está la presión en un negocio?',
      parrafos: [
        'En todos los sectores, un puñado de puntos explica casi todos los problemas, y casi todos son de estructura y no de limpieza. Las puertas: cortinas y puertas de andén que no sellan en las esquinas de abajo, puertas exteriores con la barredora gastada, y puertas que se quedan abiertas durante las entregas. Es la entrada más común en cualquier sitio comercial.',
        'Las coladeras: la película orgánica adentro de las coladeras y los drenajes es la fuente de plagas peor atendida en cualquier cocina comercial, y es donde se crían las moscas de drenaje y la mosca fórida; una rutina de mantenimiento de coladeras suele ser lo que más vale del programa de un restaurante. La basura: dónde está el contenedor, cómo está la tapa, cada cuánto se vacía y si alguna vez se lava la losa de abajo.',
        'Las entregas y el cartón: el cartón corrugado es como llegan la cucaracha y las plagas de despensa a casi cualquier sitio, y sacar la mercancía de las cajas en el andén en lugar de meter las cajas al almacén quita la vía principal sin costar nada. El almacén: producto en el piso en lugar de en estantería, sin pasillo de revisión alrededor, y mercancía que no rota. Los huecos detrás y debajo de la refrigeración, el equipo de cocina y los compresores, donde se junta la grasa. Y el exterior: vegetación contra el edificio, agua estancada, luces que atraen insectos a las entradas, y rendijas en la envolvente. Eso es trabajo de exclusión, y en un edificio comercial casi siempre se paga más rápido que en una casa.',
      ],
    },
    {
      h2: '¿Qué pasa en los sectores regulados?',
      parrafos: [
        'Escuelas y guarderías: Washington tiene reglas específicas para aplicar pesticidas en escuelas, incluidos requisitos de aviso y de letreros. Programamos y documentamos para cumplirlas, y en esos lugares nos apoyamos más en la exclusión, la limpieza y el monitoreo que en la aplicación, siempre que la situación lo permite.',
        'Manejo de alimentos: ya sea bajo inspección del departamento de salud, una auditoría de tercero o las dos, lo que se espera es parecido — dispositivos mapeados, registros al día disponibles en el sitio, ningún producto sin etiqueta, y un proceso de acciones correctivas que se pueda demostrar. Salud y residencias de adultos mayores: restricciones de ocupación, residentes vulnerables, y residentes que quizá no reporten picaduras ni actividad, lo que hace la revisión programada más valiosa que casi en cualquier otro lugar.',
        'Multifamiliares y asociaciones: las paredes y los ductos compartidos hacen que la unidad de trabajo sea el edificio y no el departamento, y la responsabilidad entre dueño, administrador e inquilino la fija la ley estatal de propietarios e inquilinos. Agricultura y procesamiento de alimentos: protección del producto, presión de roedores y moscas a escala, y registros que respaldan los requisitos de compradores con los que el productor ya trabaja.',
      ],
    },
    {
      h2: '¿Con qué negocios trabajamos?',
      parrafos: [
        'El detalle por industria está en nuestra sección comercial, con una página para cada una: lecherías y ganado, procesadoras de fruta y alimentos, marinas y muelles, restaurantes, escuelas y guarderías, salud y residencias, tiendas y supermercados, edificios de departamentos, y gobierno y edificios públicos. Lo que tienen en común todas es que el registro importa tanto como el resultado, y que el trabajo que más vale casi siempre es estructural y no aplicado.',
      ],
    },
    {
      h2: '¿Cómo empezamos, y hay contrato?',
      parrafos: [
        'Con un recorrido del sitio, y en cualquier cosa más grande que un local toma tiempo, porque casi todo lo que importa no está donde está la actividad sino donde está el acceso. Después, un programa por escrito: alcance, frecuencia, qué pasa en cada visita, el plano de dispositivos, las áreas incluidas, y las cosas de su lado que van a hacer o deshacer el resultado. Y luego lo corremos, y lo ajustamos cuando el sitio lo pide y no cuando lo pide el calendario.',
        'No hay contrato de largo plazo. Los programas son recurrentes porque la presión de plagas es recurrente, pero no hay amarre de varios años: el acuerdo dice el calendario, el alcance, la frecuencia y un aviso previo corto, y ese es todo el documento.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Sus registros aguantan una inspección de salud o una auditoría?',
      a: 'Para eso se escriben. Reportes de servicio, plano de dispositivos, registros de productos y aplicaciones, tendencias a lo largo del tiempo y las acciones correctivas de su lado. Si un auditor pide el expediente de control de plagas, debe contestar sin que nos tenga que llamar.',
    },
    {
      q: '¿Pueden trabajar fuera de nuestro horario?',
      a: 'Casi siempre. Restaurantes, tiendas y salud se atienden seguido antes de abrir o después de cerrar, y armamos la ruta alrededor del horario que nos dé. Díganos la restricción al principio y se vuelve parte del programa en lugar de una negociación cada vez.',
    },
    {
      q: '¿Qué pasa si reprobamos una inspección por una plaga?',
      a: 'Llámenos y vamos. Más útil todavía: casi todo lo que encuentra una inspección es algo que debimos señalar antes — una puerta que no sella, una coladera que necesita mantenimiento, basura demasiado cerca del edificio. Eso va por escrito en cada visita justo para que se atienda antes de que alguien más lo encuentre.',
    },
    {
      q: '¿Tratan mientras estamos abiertos?',
      a: 'Solo donde es apropiado y seguro. Mucho del trabajo comercial es revisar, monitorear, atender dispositivos y excluir, y nada de eso requiere aplicar. Donde hace falta tratar un espacio ocupado, se programa alrededor de la ocupación.',
    },
  ],
};
