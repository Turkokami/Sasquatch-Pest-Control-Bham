import type { EsServicio } from './tipos';

/**
 * Termitas y plagas que destruyen la madera, en español. Fuente: la versión en
 * inglés en src/content/services/termite-control.md.
 *
 * ESCRITA DENTRO DE LA BANDA DE KEYSTONE v2 (1,200–2,500 palabras para un
 * servicio), no a la par palabra por palabra con el inglés, que se escribió
 * bajo el piso de 3,000 de la v1. Lleva toda la sustancia: la especie que de
 * verdad hay aquí, el argumento de la humedad, cómo distinguirla de la hormiga
 * carpintera, el escarabajo del que nadie avisa, la compraventa y lo que no
 * vendemos.
 *
 * LA PARTE DE COMPRAVENTA es la más delicada del sitio en cualquier idioma.
 * Cada frase que usa el vocabulario regulado pasa por las reglas en español de
 * src/lib/seo.ts (INSPECTION_CLAIMS_ES y WDO_*_ES): o niega en primera
 * persona, o pone la inspección en manos de un inspector independiente sin
 * decir que la hacemos nosotros, o describe la regla sin hablar de nosotros.
 * Si se edita, que siga así; el arnés lo revisa en el HTML construido.
 */
export const controlDeTermitas: EsServicio = {
  slug: 'control-de-termitas',
  enPath: '/services/termite-control/',
  nav: 'Termitas',
  h1: 'Control de Termitas y Plagas de la Madera en el Condado de Whatcom',
  title: 'Control de Termitas y Plagas de la Madera en Bellingham',
  description:
    'Termita de madera húmeda y escarabajos que perforan la madera en Bellingham y el condado de Whatcom. Buscamos la humedad que los trajo. Llame al 360-410-2199.',
  answer:
    'Nuestras termitas no son las de las noticias. La termita de madera húmeda del Pacífico sigue al agua y no ataca madera sana y seca, así que encontrarla quiere decir que una pared o un espacio bajo el piso lleva tiempo mojado. Tratamos el insecto y le decimos de dónde viene la humedad, porque sin eso el tratamiento no dura.',
  secciones: [
    {
      h2: '¿Qué termitas hay de verdad aquí?',
      parrafos: [
        'Casi todo lo que se escribe sobre termitas en internet habla de otro insecto en otro clima: la termita subterránea del este, la termita de Formosa, los tubos de lodo, las barreras en el suelo y las estaciones de cebo alrededor de la casa. Es una industria enorme construida alrededor de especies que sí son destructivas en el sur y el este del país. No es nuestra situación, y hacer como que sí es como la gente del condado de Whatcom termina pagando por lo equivocado.',
        'La termita de madera húmeda del Pacífico es la que encontramos. Es grande — los voladores miden como una pulgada con todo y alas, y asustan — y la define una sola necesidad: madera con mucha humedad. A diferencia de las subterráneas, no necesita contacto con la tierra ni construye tubos, porque vive directamente adentro de la madera mojada que se está comiendo. Es común en el noroeste del Pacífico precisamente porque nuestro clima mantiene la madera húmeda.',
        'La termita subterránea del oeste existe en Washington, pero en qué parte de Washington es lo que decide cómo se escribe esta página. El boletín EB0787 de la extensión de la Universidad Estatal de Washington dice que en el oeste del estado llega solo hasta Seattle. El condado de Whatcom queda como noventa millas más allá de ese límite, así que aquí está fuera de su distribución documentada, no nada más es poco común. No es imposible — las distribuciones cambian y la madera viaja en camión —, pero en una llamada por termitas en este condado lo que se supone primero es madera húmeda.',
        'Lo que no tenemos: la termita de Formosa no está establecida aquí, y la termita de madera seca que obliga a fumigar con carpa en California no es un problema del condado de Whatcom. Si alguien le propuso encarpar su casa en Bellingham, pida una segunda opinión antes de aceptar nada.',
      ],
    },
    {
      h2: '¿Por qué la humedad es todo el asunto?',
      parrafos: [
        'Una colonia de termita de madera húmeda no puede establecerse en madera sana y seca. No es capaz. Así que cuando la encontramos en una estructura, el hallazgo de verdad no es "tiene termitas". Es: esta madera lleva mucho tiempo mojada.',
        'En la práctica el origen casi siempre sale de una lista corta. Una canaleta que lleva tiempo desbordándose por una pared. Una bajada de agua que descarga contra el cimiento. Un espacio bajo el piso sin barrera de vapor que funcione y con agua estancada. Plomería que gotea despacio adentro de una pared. La viga de apoyo de una terraza mal impermeabilizada. Revestimiento en contacto con la tierra o con la corteza de jardín. Un impermeabilizado de ventana o de puerta que falló hace años. Una gotera de techo que nadie rastreó porque solo se nota con lluvia fuerte.',
        'Es la misma lista que la de la hormiga de humedad, porque es la misma condición produciendo dos insectos distintos. Y quiere decir que la madera ya se estaba pudriendo antes de que llegaran las termitas: el hongo de pudrición no necesita insecto, y para cuando hay una colonia, la pérdida estructural casi siempre es de los dos. Por eso tratar el insecto y quedarse ahí le da un año tranquilo y la misma conversación después.',
        'Le vamos a decir cuando la persona que de verdad necesita es un contratista o un techador. Nos cuesta trabajo seguido, y es la respuesta correcta.',
      ],
    },
    {
      h2: '¿Cómo distingo una termita de una hormiga carpintera?',
      parrafos: [
        'Se confunden todo el tiempo, sobre todo en las temporadas de vuelo, y la diferencia cambia todo el enfoque. La cintura: la termita es ancha de en medio, sin estrechez; la hormiga carpintera tiene la cintura muy marcada. Es la marca de campo más fácil.',
        'Las alas: las cuatro alas de la termita son más o menos del mismo largo y se extienden mucho más allá del cuerpo; en la hormiga, el par de adelante es notablemente más largo que el de atrás. Las alas sueltas de termita en un alféizar suelen quedar en un montoncito, todas del mismo tamaño. Las antenas: rectas y como de cuentas en la termita, con un codo marcado en la hormiga.',
        'Lo que dejan: la hormiga carpintera excava y saca viruta, así que debajo de una galería hay aserrín fibroso con pedazos de insecto. La termita de madera húmeda se come la madera y deja bolitas duras de excremento, no viruta. Y el comportamiento: a la hormiga carpintera se le ve caminando al descubierto; a una obrera de termita casi nunca, porque se queda adentro de la madera y evita la luz.',
        'Equivocarse en cualquiera de las dos direcciones desperdicia el tratamiento, y por eso identificamos antes de cotizar.',
      ],
    },
    {
      h2: '¿Cuándo vuelan?',
      parrafos: [
        'La termita de madera húmeda vuela a finales del verano y en otoño, más o menos de agosto a octubre, en las tardes tibias. La atraen mucho las luces, y por eso el reporte clásico es un insecto grande con alas en la luz del porche o en una ventana en septiembre.',
        'Voladores afuera quieren decir que hay una colonia en algún lado cerca — un tocón, un tronco caído, una traviesa de jardín, una pila de leña o la estructura de otra persona. Eso solo no quiere decir que su casa esté infestada. Voladores adentro, o un montón de alas sueltas en un alféizar interior, es una señal mucho más fuerte: si los reproductores están saliendo adentro de la estructura, casi siempre la colonia está adentro de la estructura.',
        'La termita subterránea del oeste vuela al revés: en primavera, por lo general de día y muchas veces después de llover.',
      ],
    },
    {
      h2: '¿Qué es el polvito y los agujeritos redondos en las vigas?',
      parrafos: [
        'Si tiene una casa vieja en este condado con un espacio bajo el piso húmedo, el insecto que perfora madera que más probablemente se va a encontrar no es una termita. Es el escarabajo anóbido, un carcoma que es de verdad común en los espacios bajo el piso del noroeste del Pacífico y que muchas veces se confunde con daño de termita o se descarta como daño viejo.',
        'Las señales son agujeritos redondos de salida, más o menos del grueso de la punta de un lápiz, en vigas, subpiso y soleras, con un polvito fino debajo. A diferencia de otros barrenadores, el anóbido vuelve a infestar la misma madera generación tras generación mientras la humedad siga alta. Y necesita madera húmeda: un espacio bajo el piso con barrera de vapor que funcione, buen drenaje y ventilación no lo sostiene; uno con agua estancada y sin barrera, lo sostiene indefinidamente.',
        'Polvo fino debajo de agujeritos redondos en el espacio bajo el piso vale una revisión. Se trata, y el arreglo de fondo es la misma corrección de humedad.',
      ],
    },
    {
      h2: '¿Cómo trabajamos un trabajo de plagas de la madera?',
      parrafos: [
        'Identificar el insecto: termita, hormiga carpintera o escarabajo barrenador. Todo lo demás depende de eso. Encontrar la humedad: lecturas de medidor en la madera sospechosa, y rastrear el agua hasta su origen en lugar de anotar que la madera está mojada. Esa es la parte que decide si el trabajo aguanta.',
        'Medir hasta dónde llega: golpeteo y sondeo para saber qué tanto se extiende la madera afectada, porque el daño que se ve es casi siempre la parte más chica. Tratar: aplicación dirigida a las piezas afectadas y a la colonia, según la especie. La termita de madera húmeda no depende del suelo, así que no pide la barrera en el suelo que se usa contra las subterráneas; tratarla así es gasto sin beneficio.',
        'Explicarle la humedad con claridad: dónde está y qué creemos que la causa, para que actúe con el oficio que corresponda. Y recomendar el trabajo estructural: a veces nos toca a nosotros — barrera de vapor, drenaje del espacio bajo el piso, ventilación, exclusión — y a veces es de un techador, un plomero, alguien de canaletas o un carpintero. Le decimos cuál.',
      ],
    },
    {
      h2: '¿Qué pasa si voy a comprar o vender una casa?',
      parrafos: [
        'Aquí va la distinción dicha claro, porque es lo que la gente confunde y es lo que decide si le servimos o no.',
        'No somos inspectores estructurales de plagas con licencia, y no emitimos el documento que un prestamista o una compañía de escrow usa en una compraventa. Esa es una credencial distinta de la nuestra, y está regulada con razón, porque el comprador y el prestamista dependen de lo que dice. A cualquier empresa que contrate para esa parte, pregúntele qué credencial tiene y pídale el número, no una promesa.',
        'Tenemos licencia para tratar lo que encuentre su inspector. Nuestras licencias del Departamento de Agricultura del estado llevan la categoría PCO Structural, que cubre el control de las plagas que atacan el material estructural — hongos, termitas, hormiga carpintera y escarabajos que perforan la madera. Así que donde el informe de su inspector independiente identifique termita de madera húmeda o subterránea, hormiga carpintera, escarabajos, hormiga de humedad o una condición de hongo de pudrición, nosotros somos quienes llegan a tratarlo.',
        'El orden en una compraventa del condado de Whatcom es sencillo. Un inspector independiente revisa la casa y documenta lo que hay. Usted nos manda lo que encontró. Cotizamos y hacemos el tratamiento de lo que aparece ahí. Tener esos dos papeles en manos distintas le conviene de todos modos, porque quien identifica el problema no gana nada con que el remedio sea más grande. Si el tratamiento tiene que estar antes del cierre, eso es una semana normal para nosotros; díganos la fecha de cierre al principio y no al final.',
        'Si los papeles del vendedor mencionan termita de madera húmeda o escarabajo anóbido, la pregunta útil no es "¿se trató?" sino "¿se arregló el agua?". Un tratamiento sin corrección es un resultado temporal sobre una condición permanente.',
      ],
    },
    {
      h2: '¿Qué no le vamos a vender?',
      parrafos: [
        'Una barrera en el suelo para una infestación de madera húmeda: la especie no depende del suelo, así que tratar el perímetro de una casa por un insecto que vive en el cabezal mojado de una ventana es dinero gastado en el problema equivocado. Una carpa o fumigación: no es un tratamiento del condado de Whatcom para una especie del condado de Whatcom.',
        'Un plan anual de termitas que se renueva solo, para una estructura sin hallazgos y sin problema de humedad: los programas recurrentes tienen sentido donde la presión es recurrente, y una casa seca, sana y bien drenada no lo necesita. Y el tratamiento de una infestación vieja e inactiva sin evidencia de actividad actual: el daño queda mucho después de que se fueron los insectos, y encontrar galerías en una viga no es, por sí solo, razón para tratar.',
      ],
    },
    {
      h2: '¿Qué encontramos debajo del piso, y en qué orden?',
      parrafos: [
        'Agua estancada o tierra saturada es lo más común en las casas viejas de Bellingham y la raíz de casi todo lo demás. La barrera de vapor que falta, está rota o suelta, que deja que la humedad del suelo se evapore directo hacia la estructura. Las mallas de ventilación tapadas o que faltan, que son dos problemas a la vez: humedad que no sale y una puerta abierta para los roedores — por eso el trabajo de plagas de la madera y el de roedores tantas veces resultan ser la misma visita.',
        'Madera en contacto con la tierra: postes, cimbra que se dejó después de construir, madera guardada, un montón viejo de recortes que nadie sacó. Lecturas de humedad altas en la estructura, que nos dicen si el problema está activo o es historia, y eso decide si hace falta tratar. Aislamiento tirado en el suelo, casi siempre señal de un historial de roedores. Y los agujeritos redondos con polvo del anóbido, que hay que distinguir con cuidado del daño viejo.',
        'Un espacio bajo el piso seco, sellado, con malla y sin escombros no sostiene termita de madera húmeda, hormiga de humedad ni escarabajo barrenador. No es una promesa de tratamiento: es lo que esos insectos necesitan, y es por lo que lo más valioso que hacemos en muchos de estos trabajos es arreglar el espacio en lugar de rociarlo.',
      ],
    },
    {
      h2: '¿Cuánto cuesta, y cuándo conviene hacerlo?',
      parrafos: [
        'Se cotiza a partir de la visita, y el rango es amplio porque la variable en realidad no es el insecto. Un área afectada con buen acceso y un origen de humedad obvio es un trabajo acotado. Un espacio bajo el piso con anóbido por todas partes, agua estancada, sin barrera y con vigas comprometidas es uno más grande, y parte de lo que necesita es restauración del espacio y no tratamiento. La cifra va por escrito antes de empezar, la estimación no se cobra, y si la respuesta honesta es que el dinero rinde más en un drenaje o en un techo, eso dice la estimación.',
        'A diferencia de las avispas o los roedores, este trabajo no tiene temporada urgente: el daño se acumula en años, no en semanas. Lo que sí tiene temporada es la evidencia. Los voladores salen a finales del verano y en otoño, que es cuando la mayoría sospecha por primera vez. La humedad del espacio bajo el piso se ve mejor en los meses de lluvia, más o menos de noviembre a marzo, cuando un problema de drenaje de verdad está corriendo. Si quiere la imagen más clara de lo que hace su espacio bajo el piso, véalo en febrero.',
        'La prevención aquí es, sencillamente, control de humedad: canaletas limpias y bajadas que descarguen lejos del cimiento, barrera de vapor que funcione, tierra y corteza por debajo del revestimiento, leña despegada del suelo, tocones y madera enterrada fuera donde se pueda, el impermeabilizado de la terraza revisado, el riego lejos del revestimiento, y las fugas chicas arregladas en lugar de toleradas.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿De verdad hay termitas en el condado de Whatcom?',
      a: 'Sí, pero no la termita subterránea agresiva del sur y el medio oeste. La de aquí es la termita de madera húmeda del Pacífico, que necesita madera que ya esté mojada. La extensión de la Universidad Estatal de Washington dice que en el oeste del estado la subterránea llega solo hasta Seattle, y este condado queda como noventa millas más al norte.',
    },
    {
      q: 'Vi insectos grandes con alas en la tarde en septiembre. ¿Qué son?',
      a: 'Muy probablemente voladores de termita de madera húmeda. Vuelan en las tardes tibias de finales del verano y del otoño, los atraen las luces y miden como una pulgada con alas. Encontrarlos adentro importa más que afuera, porque sugiere una colonia en la estructura.',
    },
    {
      q: '¿Tratar las termitas arregla el problema?',
      a: 'Solo la mitad. La termita de madera húmeda no se establece en madera seca y sana, así que si la humedad sigue, siguen las condiciones que la trajeron. Tratamos el insecto y le decimos claro de dónde viene el agua, aunque el arreglo le toque a un contratista.',
    },
    {
      q: '¿Qué tan rápido hacen daño?',
      a: 'Despacio, en el sentido de que una colonia de madera húmeda no va a comprometer una estructura en una temporada. La razón para actuar es que la madera ya se está pudriendo: las termitas son el síntoma de un problema de humedad que hace su propio daño, y los dos empeoran mientras más tiempo corren.',
    },
  ],
};
