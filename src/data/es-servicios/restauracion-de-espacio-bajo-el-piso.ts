import type { EsServicio } from './tipos';

/**
 * Limpieza y restauración del espacio bajo el piso, en español. Fuente: la
 * versión en inglés en src/content/services/crawlspace-restoration.md.
 * Escrita dentro de la banda de Keystone v2 para un servicio.
 *
 * UNA DIFERENCIA DELIBERADA CON EL INGLÉS. La página inglesa llama al
 * hantavirus "una preocupación rural y de borde de bosque aquí, no del
 * centro". La página de roedores en inglés cita al Departamento de Salud de
 * Washington diciendo lo contrario: que hay riesgo en cualquier parte del
 * estado, y que una cochera separada en la ciudad cuenta igual que una
 * cabaña. Las dos no pueden ser ciertas; aquí va la versión del Departamento
 * de Salud, que es la que tiene fuente, y la discrepancia en inglés queda
 * reportada al dueño para corregirla allá.
 */
export const restauracionDeEspacioBajoElPiso: EsServicio = {
  slug: 'restauracion-de-espacio-bajo-el-piso',
  enPath: '/services/crawlspace-restoration/',
  nav: 'Espacio bajo el piso',
  h1: 'Limpieza y Restauración del Espacio Bajo el Piso en Bellingham',
  title: 'Limpieza del Espacio Bajo el Piso en Bellingham, WA',
  description:
    'Espacio bajo el piso en Bellingham: sacamos el aislamiento contaminado, ponemos barrera de vapor, mallas y aislamiento nuevo. Llame al 360-410-2199.',
  answer:
    'Después de roedores o de años de humedad, un espacio bajo el piso necesita más que un tratamiento. Sacamos el aislamiento contaminado y los escombros, tratamos las superficies, instalamos una barrera de vapor como se debe, ponemos malla en las rejillas y volvemos a aislar. En el orden correcto, termina con la plaga y seca la estructura de arriba.',
  secciones: [
    {
      h2: '¿Qué hay debajo de casi todas las casas de aquí?',
      parrafos: [
        'Los espacios bajo el piso de este condado son más húmedos que en casi cualquier otra parte del país, y muchísimos nunca se terminaron como se debe. El típico de una casa vieja de Bellingham tiene tierra desnuda, o una barrera que se puso hace décadas y que desde entonces se rompió, se corrió o alguien la hizo a un lado para pasar un ducto. La humedad del suelo se evapora sin parar hacia ese espacio. Una parte sale por las rejillas cuando están libres, y mucha sube a las vigas, al subpiso y a las soleras.',
        'Ese es el mecanismo detrás de casi todo lo que nos llaman. La madera con humedad alta sostiene a la termita de madera húmeda, a la hormiga de humedad, al escarabajo anóbido y a los hongos de pudrición, y ninguno de ellos se establece en madera seca. Súmele una malla de rejilla vencida y tiene roedores también, en un espacio que nadie revisa. Ahí vive, físicamente, casi todo un problema de plagas del condado de Whatcom, y es la parte de la casa de la que el dueño sabe menos.',
      ],
    },
    {
      h2: '¿Cuándo hace falta restaurarlo?',
      parrafos: [
        'No todos lo necesitan, y preferimos decirlo a venderlo. Hace falta cuando el aislamiento se usó como nido o está empapado, cuando hay mucha contaminación de excremento y orina, cuando la barrera de vapor falta, está hecha trizas o nunca se puso, cuando el aislamiento se cayó de las vigas y está en el suelo guardando humedad, cuando hay agua estancada o tierra siempre saturada, o cuando la humedad de la estructura está lo bastante alta para sostener pudrición e insectos que destruyen la madera.',
        'No hace falta cuando la barrera está entera y sellada, el aislamiento está seco y en su lugar, y no hay contaminación ni una fuente de humedad activa. Un espacio con polvo no es un problema. Uno seco con telaraña vieja e inofensiva tampoco. Le decimos cuál tiene, y le enseñamos fotos en lugar de pedirle que nos crea, porque usted no se va a meter ahí abajo a revisar.',
      ],
    },
    {
      h2: '¿Por qué el orden importa más que todo?',
      parrafos: [
        'Es lo más importante de esta página. Primero, los roedores fuera: exclusión y trampas, confirmado sin actividad durante varias visitas. Aislamiento nuevo instalado con una población activa es material de nido que usted pagó, y una empresa dispuesta a volver a aislar antes de que se vayan los animales está arreglando venderle el mismo trabajo dos veces.',
        'Después, retirar: aislamiento contaminado, excremento, material de nido, la barrera vieja rota, escombros de la obra, y cualquier madera que quien construyó la casa dejó en el suelo. Después, tratar las superficies: desinfección adecuada del suelo y de la estructura donde la contaminación fue más fuerte.',
        'Después, el trabajo de humedad: la barrera de vapor bien traslapada, sellada y subida por los muros del cimiento donde corresponde; malla en las rejillas que detenga a los roedores y deje pasar el aire; y una puerta de acceso que selle, tenga pasador y todavía se pueda abrir. Y al final, volver a aislar, en un espacio que ya está seco y cerrado. Si se salta un paso o se hace en desorden, el resultado es una casa bien aislada y recién sellada para la siguiente población.',
      ],
    },
    {
      h2: '¿Qué pasa con la salud?',
      parrafos: [
        'El excremento y la orina de roedor llevan patógenos, y el material seco se levanta en el aire cuando se mueve. Por eso este trabajo tiene un método y no es cosa de pala y bolsa. El que hay que nombrar es el hantavirus, que en Washington lo carga el ratón ciervo. El Departamento de Salud del estado dice que hay riesgo en cualquier parte de Washington: lo que lo concentra no es la zona sino la situación, un espacio cerrado con excremento y material de nido que alguien mueve. Un espacio bajo el piso es exactamente eso, y una cochera separada en la ciudad cuenta igual que una cabaña.',
        'La regla práctica para quien piense hacerlo por su cuenta: no barra en seco ni aspire. Ventile primero, moje el material con desinfectante, use guantes y protección respiratoria adecuada, y embólselo en lugar de barrerlo. No lo decimos para asustar a nadie y que nos contrate. Es un riesgo manejable con el método correcto, y si prefiere hacerlo usted, debe saber cómo.',
      ],
    },
    {
      h2: '¿Qué gano además del control de plagas?',
      parrafos: [
        'Una parte importante del valor no tiene nada que ver con insectos, y vale la pena contarla. Aislamiento que funciona: el que se usó de nido, se aplastó o se empapó perdió casi todo su valor térmico, y cambiarlo recupera lo que ya pagó una vez. Pisos más tibios, que es lo que más nos dicen los clientes después. Menos pudrición en la estructura, porque un espacio seco no la sostiene, y en diez años eso es un ahorro de mantenimiento estructural, no de comodidad.',
        'Mejor aire: el aire sube del espacio bajo el piso a la casa por cada penetración del piso, así que uno contaminado contribuye a lo que usted respira arriba. Y menos plagas secundarias: los nidos de roedor alojan ácaros y escarabajos dermestidos, que se mueven hacia adentro cuando los roedores se van.',
      ],
    },
    {
      h2: '¿Barrera de vapor o encapsulado completo?',
      parrafos: [
        'Una barrera de vapor es una lámina sobre el suelo, traslapada y sellada, que impide que la humedad de la tierra se evapore hacia la estructura. Junto con rejillas que funcionen y un drenaje razonable, es la respuesta correcta para la mayoría de las casas de aquí, y cuesta muchísimo menos.',
        'El encapsulado sella todo el espacio — suelo y muros — y por lo general agrega un deshumidificador o aire acondicionado. Tiene usos reales: un espacio con agua freática persistente que no se puede drenar, o uno donde viven ductos y equipo que tienen que quedar dentro de la envolvente térmica. Pero se vende mucho y con frecuencia es más sistema del que necesita una casa del condado de Whatcom. Donde de verdad se justifica se lo decimos, y donde no, también; y encapsular un espacio que todavía tiene un problema de drenaje abajo es una forma de encerrar el problema.',
      ],
    },
    {
      h2: '¿Qué hacemos nosotros y qué pasamos a otros?',
      parrafos: [
        'Somos una empresa local chica, y es más útil decirle los límites que fingir que no hay. Lo nuestro: limpieza, retiro de material contaminado, tratamiento de superficies, barrera de vapor, malla y reparación de rejillas, puertas de acceso, retiro y reemplazo de aislamiento a escala residencial normal, y la exclusión que lo mantiene cerrado.',
        'Donde la parte de aislamiento rebasa lo que debe hacer una cuadrilla chica — una superficie grande, un retiro y reemplazo de toda la estructura, o equipo que no traemos —, traemos a un contratista local de aislamiento que hace eso todos los días. Coordinamos el orden, seguimos siendo responsables del trabajo de plagas, y usted sabe antes de empezar quién hace qué.',
        'Ni ellos ni nosotros hacemos reparación de estructura, cimientos, excavación de drenaje, plomería ni techos. Donde una viga perdió sección por pudrición, la tiene que cambiar un carpintero, y poner aislamiento nuevo contra una estructura comprometida es tapar el problema. Donde el agua freática necesita un dren o una bomba, es un trabajo de excavación. Cuando encontramos eso, se lo describimos con suficiente claridad para cotizarlo con el oficio correcto.',
      ],
    },
    {
      h2: '¿Qué se saca, y a dónde va?',
      parrafos: [
        'El aislamiento contaminado se baja y se embolsa; en un espacio muy afectado es casi todo el volumen, y es lo que más cambia cómo huele después. El excremento y los nidos se mojan primero, nunca se barren en seco, y se embolsan y se sacan en lugar de amontonarlos a un lado. La barrera vieja sale antes de que entre la nueva, porque un plástico roto que se pisó durante décadas guarda humedad debajo en lugar de detenerla.',
        'Los escombros de la obra — recortes, cimbra, madera enterrada — salen también, porque cada pedazo de madera en el suelo es un sitio de colonia para la hormiga de humedad y la termita a unos pasos de la estructura. Y de vez en cuando aparece lo inesperado: un ducto abandonado, cosas guardadas de un dueño anterior, y en casas viejas alguna línea de aceite enterrada; le decimos lo que encontramos en lugar de embolsarlo sin decir nada. Todo sale de la propiedad. Nada se empuja a una esquina y se tapa con lámina nueva, que es una práctica real y que usted nunca vería.',
        'Documentamos el espacio antes, durante y después, y usted recibe las fotos. Le estamos pidiendo que pague por trabajo en un lugar que nunca va a ver, y la única forma honesta de cerrar esa distancia es enseñárselo. Además le queda una base: si algo cambia en tres años, hay registro de cómo quedó.',
      ],
    },
    {
      h2: '¿Por el condado, cómo cambia?',
      parrafos: [
        'En el Bellingham viejo — Lettered Streets, Columbia, Sunnyland, York y South Hill — poste y pilar, poca altura, tierra desnuda o una barrera de otra época y un siglo de historia de canaletas: la mayor concentración de este trabajo en el condado, y muchas veces el único arreglo de verdad para un problema de insectos que se repite arriba. Alrededor del lago Whatcom, los lotes con pendiente empujan el agua hacia los cimientos y la construcción de los setenta contra el bosque deja entrar roedores por rejillas abiertas desde hace años.',
        'En el campo — Lynden, Everson, Nooksack, Sumas — las superficies son más grandes, hay bodegas, y el ratón ciervo es más común que el casero, lo que sube los requisitos de manejo. En la costa — Blaine, Birch Bay y Semiahmoo — las casas pasan vacías los meses de lluvia y nadie nota una malla que falló en noviembre hasta abril. En la construcción nueva el problema casi siempre tiene una causa específica: una bajada de agua que descarga debajo de la casa, o el riego contra el cimiento.',
      ],
    },
    {
      h2: '¿Cuánto cuesta, y cuándo conviene?',
      parrafos: [
        'Se cotiza después de la visita, y lo mueven sobre todo tres cosas. La altura, que es el factor más grande: un espacio donde uno se puede mover es otro trabajo que cuarenta y cinco centímetros boca arriba. Los metros cuadrados. Y qué tanto hay que sacar: si el aislamiento baja en todo el espacio o por secciones, y cuánta superficie hay que tratar. Es de los trabajos residenciales más grandes que hacemos, y la comparación no es contra no hacer nada: es contra un problema de insectos que no se resuelve, aislamiento que no funciona y una estructura que empeora despacio. La cifra va por escrito antes de empezar, y la estimación no se cobra.',
        'La mejor ventana es a finales del verano y principios del otoño, antes del empujón de roedores que llega con la lluvia de septiembre y octubre, y cuando el espacio está más seco. El invierno también sirve y a veces es mejor para diagnosticar, porque un problema de drenaje está corriendo de verdad en febrero en lugar de estar escondido en agosto.',
        'En una renta, el capítulo 6.15 del código municipal de Bellingham exige una inspección certificada y la lista marca las aberturas de cimiento de más de un cuarto de pulgada; una restauración con malla en las rejillas y una puerta de acceso sellada atiende eso directamente, y el cambio de inquilino es el momento más barato para hacerla. En una venta, un espacio con aislamiento contaminado y sin barrera es algo que el asesor del comprador va a encontrar y a descontar, casi siempre por más de lo que cuesta el trabajo.',
      ],
    },
    {
      h2: '¿Qué le pregunto a cualquier empresa?',
      parrafos: [
        'Si está pidiendo más de una cotización — y debería —, estas preguntas las separan, contrate a quien contrate. ¿Se metieron de verdad debajo de la casa? Una cotización hecha desde la escotilla es una adivinanza; pregunte la altura, el estado de la barrera y dónde están las entradas. ¿Cuál es el orden? Si la exclusión y las trampas no van antes del aislamiento nuevo, se lo están vendiendo al revés. ¿Qué material de barrera, y cómo se sella? Traslapada, sellada y fijada, o una lámina suelta sobre el suelo: es la diferencia entre una barrera y una lona.',
        '¿Qué pasa con el material viejo? ¿Sale de la propiedad o se tapa en una esquina? ¿Va a ver fotos? Está pagando por trabajo en un lugar al que nunca va a entrar. ¿Y qué queda fuera? Estructura, excavación y plomería son de otros oficios; una empresa que dice que hace todo lo está subcontratando o piensa trabajar alrededor.',
        'Después del trabajo, revise las mallas una vez al año — la primavera es buena costumbre —, pídale a cualquier plomero, electricista o técnico de calefacción que trabaje abajo que deje la barrera como estaba, y mantenga las canaletas limpias y la tierra por debajo del revestimiento. Casi toda la humedad del espacio bajo el piso empieza afuera de él.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿De verdad necesito cambiar el aislamiento?',
      a: 'Solo si está contaminado o dejó de funcionar. El que se usó de nido, está empapado de orina o se cayó de las vigas no le sirve y guarda humedad contra la madera. El que está seco, entero y en su lugar se queda. No le vamos a vender un reemplazo que no necesita.',
    },
    {
      q: '¿Puedo limpiarlo yo?',
      a: 'Puede, con precauciones de verdad. No barra ni aspire el excremento en seco: el material seco se levanta en el aire, y el ratón ciervo en Washington es una consideración de hantavirus. Ventile, moje todo con desinfectante y use guantes y protección respiratoria. Casi todos prefieren que lo hagamos nosotros.',
    },
    {
      q: '¿Tengo que quitar los roedores primero?',
      a: 'Siempre. Restaurar un espacio con una población activa es instalar aislamiento nuevo para que aniden. El orden es exclusión y trampas, confirmar que ya no hay actividad, y después limpiar y restaurar.',
    },
    {
      q: '¿Cuánto tarda?',
      a: 'Casi todos los espacios residenciales toman de uno a tres días, según la superficie, la altura y cuánto material hay que sacar. La altura es el factor más grande: uno de cuarenta y cinco centímetros toma bastante más que uno donde se puede mover.',
    },
  ],
};
