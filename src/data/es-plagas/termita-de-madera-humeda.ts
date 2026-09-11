import type { EsPlaga } from './tipos';

/** Fuente: src/content/pests/pacific-dampwood-termite.md. Cada dato viene de ahí y de sus
 *  fuentes. La sección sobre lo que se entrega por escrito sigue la misma frontera que
 *  control-de-termitas.ts: registro del tratamiento sí, informe de hallazgos no. */
export const termitaDeMaderaHumeda: EsPlaga = {
  slug: 'termita-de-madera-humeda',
  species: 'pacific-dampwood-termite',
  nombre: 'Termita de madera húmeda',
  h1: 'Termita de Madera Húmeda del Pacífico — Zootermopsis angusticollis',
  title: 'Termita de Madera Húmeda del Pacífico en Whatcom',
  description:
    'La termita del noroeste solo ataca madera que ya está mojada: encontrarla es noticia de un problema de agua. Identificación, temporada y tratamiento.',
  answer:
    'La termita de madera húmeda del Pacífico es la termita del noroeste de Washington, y solo ataca madera que ya está mojada. Encontrarla es noticia de un problema de agua que lleva años. Aquí los tubos de lodo no son la señal, y casi todo lo que dice internet sobre termitas describe otro insecto.',
  secciones: [
    {
      h2: 'La termita que de verdad vive aquí',
      parrafos: [
        'Pregúntele a un buscador sobre termitas y casi todo lo que sale describe un insecto que no vive en el noroeste de Washington: termitas subterráneas agresivas del sur y del sureste, tubos de lodo subiendo por un cimiento, barreras químicas en la tierra, estaciones de cebo alrededor de la casa, casas cubiertas con lona. Ese contenido domina porque ahí está el dinero de las termitas, y se copia a sitios regionales sin que nadie revise si la biología aplica. No aplica. La termita de esta región es la termita de madera húmeda del Pacífico, Zootermopsis angusticollis, y se porta distinto en lo que cambia todas las decisiones: no sale de la tierra a buscar su casa. Llega volando, como una pareja de reproductoras con alas, y aterriza en madera que ya está empapada.',
        'De ahí salen dos cosas, las dos al revés del consejo de siempre. Los tubos de lodo no son la señal: las termitas de tierra los hacen porque necesitan una conexión húmeda con el suelo, y una colonia de madera húmeda vive dentro de la madera mojada que se come, así que no hay nada que conectar. Quien recorre el cimiento, no ve tubos y concluye que la casa está bien revisó lo equivocado. Y tratar la tierra es el mecanismo equivocado: no hay colonia en el suelo que interceptar, así que una barrera química alrededor de la casa no le hace nada a un insecto que vive en el cabezal de una ventana a ocho pies.',
        'El boletín EB0787 de WSU dice que la subterránea solo llega al norte hasta Seattle en el oeste del estado, y el condado de Whatcom está bastante más al norte. Si encuentra tubos de tierra de verdad en un muro o un pilar, dígalo en la primera llamada, porque cambian el alcance y el método.',
      ],
    },
    {
      h2: 'Cómo es',
      parrafos: [
        'Casi todos la ven en una forma y nunca las otras dos. Las aladas, las reproductoras: grandes — WSU da más de una pulgada contando las alas, la termita más grande de la región —, de cuerpo café y cuatro alas largas y ahumadas que pasan el abdomen; son las que llegan a una ventana o a la luz del porche, y con ellas empieza casi toda llamada. Los soldados: unos tres cuartos de pulgada, con una cabeza pesada café rojizo a casi negra y mandíbulas enormes sobre un cuerpo color crema; solo aparecen cuando se abre la madera. Y las ninfas, que hacen el trabajo de comer: blancas a crema, blandas, de media pulgada; en esta especie las etapas inmaduras hacen el trabajo de la colonia en lugar de una casta de obreras aparte, y huyen de la luz, así que puede haber una colonia grande en una viga sin que nadie vea un solo individuo. Las colonias son modestas para ser termitas: no hay una red enorme bajo tierra, sino una población viviendo en una pieza de madera mojada, o en varias conectadas, agrandando despacio sus galerías.',
      ],
    },
    {
      h2: 'Cómo distinguirlas de las hormigas carpinteras con alas',
      parrafos: [
        'Es la identificación que más sale mal en el condado de Whatcom, y en las dos direcciones: las aladas de la hormiga carpintera también son grandes, también asustan y también aparecen en las casas. Tres señas las separan sin lupa. Las antenas de la termita son derechas, como una hilera de cuentas; las de la hormiga tienen un codo claro — es la seña más confiable y se ve en una foto de teléfono. El cuerpo de la termita es ancho y recto del tórax al abdomen, sin cintura; la hormiga tiene la cintura angosta que todos se imaginan. Y las cuatro alas de la termita miden más o menos lo mismo, mientras que las delanteras de la hormiga son claramente más grandes; además, las de la termita se caen fácil, y un montoncito de alas del mismo tamaño en un alféizar, soltadas a pocos pies unas de otras, es firma de termita.',
        'Y lo que dejan: la hormiga saca virutas fibrosas; la termita, bolitas duras de un milímetro, algo hexagonales. Guarde una docena de ejemplares en un frasco.',
      ],
    },
    {
      h2: 'Cuándo las verá, y por qué es en otoño',
      parrafos: [
        'La temporada de vuelo aquí es tardía: WSU describe vuelos en tardes tibias de finales del verano o del otoño, sobre todo después de lluvias, y coincide con lo que nos llaman — una tarde templada de septiembre o principios de octubre, un día o dos después de una racha mojada, con aladas llegando a la luz del porche, una ventana iluminada o una lámpara sobre la cochera.',
        'Dónde salieron importa mucho más que cuántas eran. Aladas afuera alrededor de una luz exterior volaron de algún lado, y ese lado puede ser un tocón, un aliso caído, un durmiente de jardín, la leña o el cobertizo del vecino. Aladas saliendo adentro de un cuarto, o un montón de alas sueltas en el lado de adentro de una ventana, apuntan con mucha más fuerza a una colonia dentro de la estructura. Y un vuelo quiere decir una colonia madura: es el anuncio de un problema viejo, no la llegada de uno nuevo. Las aladas son inofensivas y casi todas mueren en horas; matar las de su ventana no le hace nada a la colonia, aunque juntarlas sí sirve.',
      ],
    },
    {
      h2: 'Lo que de verdad significa encontrarla',
      parrafos: [
        'Aquí está lo que separa a esta especie de todo lo que ha leído. Una colonia de madera húmeda no puede establecerse en madera sana y seca, y no es preferencia sino requisito: el EB0787 dice que se necesita mucha humedad para el ataque y el establecimiento, y los manuales del noroeste dicen lo mismo. Así que el hallazgo es en realidad un hallazgo de humedad con un insecto pegado, y no de humedad reciente, porque casi siempre la madera tuvo que estar mojada el tiempo suficiente para que los hongos la ablandaran primero.',
        'Los números se citan al revés todo el tiempo, así que vale ser exactos. El Laboratorio de Productos Forestales del USDA pone la pudrición seria arriba del punto de saturación de la fibra, en promedio cerca del treinta por ciento de contenido de humedad; por debajo de más o menos veinte por ciento, la madera secada al aire tiene un margen razonable de seguridad contra los hongos. Veinte es el umbral seguro, y treinta es donde ya corre la pudrición seria. Esa inversión aparece hasta en sitios de control de plagas, y importa: una lectura de veintidós por ciento en una solera no quiere decir "ya se está pudriendo", sino "más mojada de lo que debería, y yendo en la dirección equivocada". Para una familia, las preguntas útiles son todas de plomería y drenaje: de dónde viene el agua, desde cuándo, y qué la para. La pregunta del insecto va después de las tres.',
      ],
    },
    {
      h2: 'Dónde aparecen en las casas del condado',
      parrafos: [
        'Siguen al agua, y aquí el agua sigue la misma lista corta de defectos. Las soleras y vigas de borde del espacio bajo el piso, la madera sobre el cimiento que recibe salpicaduras, la humedad que sube por el concreto y el aire húmedo de un espacio sin forrar: estructurales, bajas, y el lugar más común. La estructura bajo una fuga lenta de años — debajo de un baño, detrás del lavaplatos, bajo el cuarto de lavado, en una llave de agua que lleva una década goteando. Los largueros de terrazas y la viga de borde detrás, donde la terraza se fijó a la pared sin tapajuntas y la madera se queda mojada cada temporada de lluvias — un defecto crónico en las casas del condado. Los marcos de ventanas y puertas del lado del mal tiempo, con tapajuntas fallados y sellador vencido. Los postes y pilares enterrados, incluidas las cimbras que se quedaron después de construir. Y las construcciones anexas, los postes de cerca y la madera guardada, que no son estructurales pero son colonias a distancia de vuelo de la casa, que es por lo que hay vuelos.',
        'Las casas viejas de Bellingham dan casi todos los hallazgos de espacio bajo el piso; el lago Whatcom, los de terrazas; el campo, los de construcciones bajas. En Barkley o Cordata es raro, y detrás casi siempre hay un defecto concreto.',
      ],
    },
    {
      h2: 'Cuando están en un tocón y no en la casa',
      parrafos: [
        'Buena parte de los hallazgos de este condado no están en un edificio: alisos caídos, tocones, escombro enterrado, la leña sobre la tierra. Nada de eso es estructural, pero es la fuente de los vuelos, y la respuesta no es tratar sino alejar de la casa la madera más cercana, subir la leña del suelo y moler tocones donde se pueda. La excepción es la madera enterrada que hace un trabajo — un poste, una zapata de terraza —, que sí hay que revisar.',
      ],
    },
    {
      h2: 'Cómo leer el daño',
      parrafos: [
        'La madera abierta dice qué insecto hay aunque nada se mueva. Las galerías de la termita corren a lo largo y a lo ancho de la veta, con un aspecto de cámaras en capas; las de la hormiga carpintera siguen la madera blanda de primavera y quedan lisas, casi lijadas. Las de la termita están llenas de material oscuro, y las de la hormiga, barridas. Y la madera alrededor cede al desarmador, porque la pudrición llegó antes. El EB0787 agrega que una colonia ya establecida puede extenderse a madera sana y hasta relativamente seca: la humedad decide cómo empieza, no hasta dónde llega.',
      ],
    },
    {
      h2: 'Qué implica el tratamiento',
      parrafos: [
        'Primero se decide la especie — termita de madera húmeda, hormiga carpintera, escarabajo que perfora la madera o pudrición sola —, porque aquí las cuatro están en los mismos espacios bajo el piso y todo depende de eso. Luego se ve hasta dónde llega, golpeando y probando todo el largo de la pieza y no solo la parte que se veía desde la tapa: el daño casi siempre es más largo que la señal. Luego se sigue el agua hasta su origen, y las lecturas de humedad de la estructura de junto separan un problema activo de uno histórico, que a veces cambia si conviene tratar. Se trata la madera, no la tierra: aplicación directa en las galerías y las piezas afectadas, con productos a base de borato u otros según el caso. Se ordena la corrección de la humedad — drenaje, nivel del terreno, extensiones de bajadas, una barrera de vapor bien traslapada, ventilación, la reparación de plomería, el tapajuntas —; parte es restauración del espacio bajo el piso o exclusión que hacemos nosotros, y mucho le toca a un plomero, un techador o un especialista en drenaje, y le decimos cuál es cuál. Se reemplaza lo que perdió capacidad, porque la madera podrida no recupera resistencia al secarse, y eso es trabajo de un constructor; la madera nueva en un lugar con historial se trata con borato antes de cerrar, que es barato entonces y caro después. Y se regresa cuando el espacio ya está seco, para confirmar que las condiciones de verdad cambiaron.',
        'Por escrito, lo que le entregamos es el registro del tratamiento: el producto, las piezas y lugares tratados y la fecha. Es un buen documento para guardar, y es lo que produce nuestro trabajo. No emitimos un documento que establezca daño por organismos que destruyen la madera: bajo las reglas de Washington es un reporte regulado con sus propios requisitos, no somos inspectores estructurales de plagas — tenemos licencia para tratar, no credencial de inspector —, y quien le diga que un registro de tratamiento es lo mismo está confundido o espera que usted lo esté.',
      ],
    },
    {
      h2: 'Lo que no le vamos a vender, y qué tan urgente es',
      parrafos: [
        'No le vamos a vender una barrera en la tierra, que aquí no tiene mecanismo; ni carpa o fumigación, que es para termitas de madera seca de climas calientes — si se lo propusieron aquí, pida otra opinión —; ni un programa anual en un edificio ya seco y sano; ni tratar galerías sin nada vivo; ni un tratamiento sobre una fuga sin reparar, que los manuales del noroeste desaconsejan.',
        'Nada se va a caer este invierno por una colonia de madera húmeda: la sección se pierde en años, y quien le venda urgencia de un colapso inminente exagera a un insecto lento. Pero el material es estructural y está en la base del edificio, la pudrición que llegó antes casi siempre se llevó más capacidad que los insectos, y una fuente de humedad que sigue dos temporadas más cuesta bastante más y se lleva más madera. Suben la urgencia: un desarmador que se hunde en una solera o un poste, un piso que rebota, agua estancada bajo la casa, actividad en más de un lugar, o tubos de tierra, que cambian la especie. La bajan: una sola pieza afectada, madera mojada pero todavía firme, una fuente de agua obvia y barata, y un espacio bajo el piso por lo demás seco y ventilado. Toda la prevención es mantenimiento de la casa: canaletas limpias, bajadas lejos del cimiento, barrera de vapor completa, ventilas abiertas, terreno que caiga hacia afuera, nada de madera en contacto con la tierra, leña lejos de las paredes, tapajuntas en los largueros, sellador renovado antes de que falle, riego lejos del revestimiento, y las fugas lentas arregladas mientras siguen siendo lentas.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Tengo que buscar tubos de lodo en mi cimiento?',
      a: 'No como señal principal. Los tubos de lodo son de las especies que anidan en la tierra, y la termita de madera húmeda no los hace porque vive dentro de la madera mojada que se come. Buscar tubos y no encontrar ninguno no le dice casi nada sobre si tiene esta especie.',
    },
    {
      q: 'En septiembre llegaron insectos grandes con alas a la luz del porche. ¿Qué eran?',
      a: 'Lo más probable, aladas de termita de madera húmeda. WSU registra sus vuelos en tardes tibias de finales del verano o del otoño, sobre todo después de lluvias, y las atraen las luces. Con cerca de una pulgada contando las alas asustan, y así se entera casi toda familia de que la especie existe.',
    },
    {
      q: '¿Tratar los insectos lo arregla?',
      a: 'Solo la mitad del insecto. Esta especie no puede establecerse en madera sana y seca, así que la madera mojada que hizo posible la colonia sigue ahí después de cualquier tratamiento. Corregir la humedad es lo que cambia el resultado, y casi siempre le toca a un plomero, un techador o un contratista de drenaje.',
    },
  ],
};
