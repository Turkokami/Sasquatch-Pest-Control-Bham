import type { EsServicio } from './tipos';

/**
 * Tratamiento de organismos que destruyen la madera para una compraventa, en
 * español. Fuente: src/content/services/wdo-treatment.md.
 *
 * LA PÁGINA MÁS REGULADA DEL SITIO, en cualquier idioma. La empresa tiene
 * licencia para TRATAR lo que un inspector encontró y NO para hacer la
 * inspección ni emitir su documento. Cada frase con vocabulario regulado aquí
 * niega en primera persona, pone la inspección en manos de un inspector
 * independiente, o describe la regla sin hablar de nosotros — que es lo que
 * revisan INSPECTION_CLAIMS_ES y WDO_*_ES en src/lib/seo.ts y el chequeo 2c
 * sobre el HTML construido. El registro que sí entregamos es el del
 * TRATAMIENTO (qué se usó, dónde, cuándo), nunca una cuenta de lo que se
 * encontró en la madera.
 *
 * El slug no dice "WDO": un comprador que busca en español no conoce esa sigla.
 */
export const tratamientoParaVentaDeCasa: EsServicio = {
  slug: 'tratamiento-para-venta-de-casa',
  enPath: '/services/wdo-treatment/',
  nav: 'Compraventa de casa',
  h1: 'Tratamiento de Plagas de la Madera para la Venta de una Casa',
  title: 'Tratamiento de Termitas para Venta de Casa en Whatcom',
  description:
    'Su inspector encontró organismos que destruyen la madera. Tenemos licencia para tratarlos: termitas, hormiga carpintera, escarabajos y hongos. Llame al 360-410-2199.',
  answer:
    'Su inspector encontró organismos que destruyen la madera y usted tiene fecha de cierre. Esa es la mitad que hacemos: nuestra licencia estatal lleva la categoría PCO Structural, que cubre tratar las termitas, la hormiga carpintera, los escarabajos y el hongo de pudrición que aparecen ahí. El documento no lo emitimos nosotros; eso es otra credencial.',
  secciones: [
    {
      h2: '¿Para quién es esta página?',
      parrafos: [
        'Para quien está comprando o vendiendo una casa en el condado de Whatcom. Un inspector ya la revisó y produjo un documento que menciona organismos que destruyen la madera, o condiciones que los favorecen, y ahora alguien tiene que atenderlo antes de que se cierre la venta. Es un carril angosto, con prisa y muchas veces con estrés, y es uno donde el oficio del control de plagas suele ser vago sobre lo que de verdad tiene licencia para hacer. Así que vamos a ser específicos.',
      ],
    },
    {
      h2: '¿Por qué son dos papeles distintos?',
      parrafos: [
        'En una compraventa hay dos trabajos, piden credenciales distintas, y de verdad importa cuál está pidiendo. El primero es identificar: un inspector estructural de plagas con licencia examina el edificio y documenta lo que hay. En su hallazgo se apoyan el prestamista, el comprador y el oficial de escrow. Es una actividad regulada en Washington y lleva su propia licencia.',
        'El segundo es tratar: alguien tiene que atender lo que se encontró — tratar los insectos activos y corregir las condiciones que los dejaron entrar. Eso pide una licencia de pesticidas con la categoría correcta.',
        'Nosotros hacemos el segundo. No somos inspectores estructurales de plagas con licencia, no hacemos ese examen y no emitimos ese documento. Si eso es lo que necesita, necesita a alguien más, y se lo decimos por teléfono con gusto en lugar de hacerle perder el tiempo.',
        'Creemos que esa separación es una ventaja y no una limitación. Cuando la misma empresa identifica el problema y le vende el remedio, gana más mientras más grande sea el problema. Nadie hace nada indebido por eso, pero el incentivo está ahí, y en una venta donde el comprador ya está nervioso y el vendedor ya está negociando, quitarlo vale algo. Un hallazgo independiente y una cotización independiente es un arreglo más limpio para todos.',
      ],
    },
    {
      h2: '¿Qué cubre de verdad nuestra licencia?',
      parrafos: [
        'Nuestra gente tiene licencias del Departamento de Agricultura del estado de Washington: una licencia de aplicador comercial, que según la ley estatal de aplicación de pesticidas corresponde al negocio de aplicar pesticidas en la propiedad de otro, y licencias de operador comercial, que corresponden a los empleados que hacen la aplicación. Todas llevan las mismas dos categorías: PCO Structural y PCO General.',
        'La que importa aquí es PCO Structural. En los términos del propio estado, cubre el control de las plagas que atacan el material estructural, incluidos hongos, termitas, hormiga carpintera y escarabajos que perforan la madera. Es una autorización para tratar, y es lo que nos permite trabajar sobre los hallazgos que usted tiene enfrente.',
        'Los números de licencia están publicados en nuestra página de quiénes somos, junto al nombre de quien los tiene. Puede meter cualquiera en el buscador de licencias del Departamento de Agricultura y confirmar el estado, la vigencia y las categorías usted mismo en un minuto. Los publicamos porque una credencial que no se puede revisar es una afirmación y no una credencial, y en una venta con dinero y fecha límite no debería creerle a nadie de palabra — tampoco a nosotros.',
      ],
    },
    {
      h2: '¿Qué organismos aparecen, y qué implica tratarlos?',
      parrafos: [
        'Seis cosas aparecen con regularidad en los hallazgos de este condado, y son problemas distintos que piden trabajo distinto. Por eso un precio fijo de "tratamiento de termitas" casi siempre es señal de que nadie revisó bien.',
        'La termita de madera húmeda del Pacífico es, por mucho, el hallazgo de termita más común aquí. No necesita contacto con la tierra, no construye tubos de lodo y tiene un requisito absoluto: madera con mucha humedad. El tratamiento se localiza en el material infestado y no se aplica como barrera en el suelo alrededor del edificio, porque no hay colonia en la tierra que interceptar. Donde la pieza dañada es estructural, la respuesta honesta muchas veces es que hay que reemplazar una sección, y eso es carpintería. Y lo decisivo es el agua: un hallazgo de madera húmeda es en realidad un hallazgo de humedad con insectos adentro.',
        'La termita subterránea del oeste existe en Washington y es otro animal, aunque su rango es más angosto de lo que dice casi todo lo que se escribe: el boletín EB0787 de la extensión de la Universidad Estatal de Washington pone su límite norte en el oeste del estado en Seattle, a unas noventa millas al sur de este condado. Depende del suelo y construye los tubos que la gente asocia con termitas. Aparece en esta lista porque la categoría de licencia la cubre y porque un documento de inspección la puede mencionar, no porque sea un hallazgo probable en esta latitud. Identificarla bien importa mucho, porque su tratamiento es bastante más complejo y que le vendan uno cuando tiene la otra es un error común y caro.',
        'La hormiga carpintera es muy común aquí y aparece seguido en un hallazgo. Excava galerías para anidar sin comerse la madera, prefiere material que ya empezó a ablandarse, y una colonia madura casi siempre tiene la madre afuera — un tocón, una rama muerta, una traviesa, un poste — con satélites adentro. Tratar el satélite sin encontrar la madre es por lo que tantos trabajos de hormiga carpintera regresan.',
        'Los escarabajos que perforan la madera suelen ser anóbidos en esta región, comunes en espacios bajo el piso viejos y húmedos: agujeritos redondos con polvo fino debajo. La pregunta que decide el tratamiento es si la infestación está activa o es historia, porque el daño dura décadas después de que se van los insectos. Preferimos establecer eso antes que tratar una pieza de museo, y si el hallazgo es viejo e inactivo se lo decimos, aunque nos cueste el trabajo.',
        'La hormiga de humedad coloniza madera que ya está mojada y pudriéndose, así que encontrarla es información útil: es el síntoma y el agua es la enfermedad. Y el hongo de pudrición no es un insecto, pero muchas veces es lo más importante del hallazgo: es lo que de verdad le quita capacidad estructural a la madera en este clima. Donde está activo, el trabajo que importa es secar y corregir el agua, y después reparar o reemplazar lo que perdió resistencia. Tratamos lo que cae dentro de nuestra categoría y somos directos sobre dónde está el límite: la reparación estructural es de un contratista.',
      ],
    },
    {
      h2: '¿Por qué las condiciones favorables pesan más que los insectos?',
      parrafos: [
        'Casi todos los hallazgos del condado incluyen una sección de condiciones que favorecen a estos organismos, y en nuestra experiencia es la que vale la pena leer dos veces. Lo que se repite es poco vistoso y predecible: agua estancada en el espacio bajo el piso, una barrera de vapor que falta, está rota o se corrió, mallas de rejilla tapadas, rotas o que faltan, tierra contra madera donde se subió el nivel del suelo contra el revestimiento, bajadas de agua que descargan en el cimiento, la viga de apoyo de una terraza mal impermeabilizada, corteza de jardín amontonada contra la solera, plomería que gotea despacio debajo de un baño, y canaletas que llevan años desbordándose por una pared.',
        'Nada de eso es una plaga. Todo eso es la razón por la que llegan. En este clima — sin helada fuerte, con unas treinta y cinco pulgadas de lluvia al año y madera que nunca se seca del todo — esa sección es la que predice con qué va a lidiar la casa dentro de cinco años.',
        'Por eso, cuando cotizamos, le decimos qué partidas son nuestras y cuáles no. Corregir el nivel del suelo, cambiar una barrera de vapor, volver a colgar una bajada de agua e impermeabilizar una viga de apoyo no son tratamientos de plagas. Algunas las podemos hacer, otras son de un contratista, y hacer como que toda la lista es un problema de plagas sería una manera directa de cobrarle de más.',
      ],
    },
    {
      h2: '¿Cómo funciona el calendario?',
      parrafos: [
        'Las ventas corren con fechas, así que esta es la secuencia real. El inspector produce su hallazgo. Usted nos lo manda — una foto de las páginas que importan basta para empezar. Muchas veces con eso ya le podemos decir si es un tratamiento sencillo o algo que hay que ver primero, y darle un rango aproximado por teléfono.',
        'Vamos a ver. Esa visita no se cobra y de ahí sale la cotización: revisamos lo que se documentó, si está activo y qué lo está causando. Usted recibe una cotización por escrito que separa el tratamiento de lo que es reparación; si parte del trabajo necesita un contratista, se lo decimos en ese momento y no después de empezar, porque el tiempo de espera de un contratista es lo que más probablemente pone en riesgo una fecha de cierre.',
        'Se programa el tratamiento — para casi todos los hallazgos, la misma semana; donde primero tiene que secarse algo o hacerse una reparación, el orden importa y se lo explicamos. Y usted recibe el registro de lo que se trató, con qué producto y cuándo: el papel para su expediente, el de su agente y el de la venta.',
        'Díganos la fecha de cierre en la primera llamada. Es lo más útil que nos puede dar, y la diferencia entre un calendario cómodo y una carrera casi siempre es que ese dato llegó tarde.',
      ],
    },
    {
      h2: '¿Y para agentes, prestamistas y oficiales de escrow?',
      parrafos: [
        'Trabajamos con varios agentes del condado de Whatcom y sabemos qué les facilita el trabajo. Una cotización que distingue el tratamiento de plagas de la reparación del edificio, para que nadie negocie un crédito contra una cifra que en silencio incluye carpintería. Una respuesta rápida sobre si la fecha de cierre la decide nuestro calendario o la preparación. Y un registro del tratamiento que se puede archivar tal cual. Si el trabajo le toca a alguien más, se lo decimos el primer día.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Qué hacen exactamente en una compraventa?',
      a: 'El tratamiento. Cuando un inspector ya documentó lo que hay en la estructura, nuestra categoría PCO Structural es lo que nos permite tratarlo: termita de madera húmeda o subterránea, hormiga carpintera, escarabajos que perforan la madera, hormiga de humedad y hongo de pudrición. Trabajamos con la fecha de cierre.',
    },
    {
      q: '¿Pueden hacer la inspección para mi venta?',
      a: 'No. No somos inspectores estructurales de plagas con licencia y no emitimos ese documento; es una credencial distinta de la nuestra. Para esa parte necesita un inspector independiente, y preferimos decírselo claro que tomar la cita y quedarle mal.',
    },
    {
      q: '¿Qué tan rápido se puede tratar antes del cierre?',
      a: 'Lo programamos cuando la fecha lo pida, y casi nunca es la fecha lo que limita, sino la preparación: parte de este trabajo no puede empezar hasta que un contratista corrija la entrada de agua o se abra el acceso. Díganos la fecha de cierre en la primera llamada.',
    },
    {
      q: '¿Tratar los insectos resuelve el problema?',
      a: 'Solo la mitad, y es lo más importante de esta página. La termita de madera húmeda, la hormiga de humedad y el hongo de pudrición necesitan madera mojada. Si no se corrige el agua, las condiciones que los trajeron siguen ahí después del tratamiento.',
    },
    {
      q: '¿Cobran por venir a cotizar el tratamiento?',
      a: 'No. Venir a ver lo que se encontró y ponerle precio al tratamiento no cuesta nada. Y le decimos con honestidad si parte de lo documentado es una reparación del edificio y no un tratamiento, aunque esa parte no sea trabajo que nos paguen.',
    },
  ],
};
