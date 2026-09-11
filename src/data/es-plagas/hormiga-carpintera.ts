import type { EsPlaga } from './tipos';

/** Fuente: src/content/pests/carpenter-ant.md. Cada dato viene de ahí y de sus fuentes. */
export const hormigaCarpintera: EsPlaga = {
  slug: 'hormiga-carpintera',
  species: 'carpenter-ant',
  nombre: 'Hormiga carpintera',
  h1: 'Hormiga Carpintera — Camponotus modoc',
  title: 'Hormiga Carpintera en el Condado de Whatcom, WA',
  description:
    'Hormiga carpintera (Camponotus modoc): cómo identificarla, por qué excava la madera sin comerla y cómo distinguir sus aladas de las termitas.',
  answer:
    'La hormiga carpintera es una hormiga negra grande que excava la madera para anidar en ella, sin comerse nada. Aquí una colonia tiene su nido madre afuera, casi siempre en madera podrida a menos de cien yardas, y nidos satélite adentro de los edificios. Verlas adentro en invierno quiere decir que ya hay uno en la casa.',
  secciones: [
    {
      h2: '¿Qué es lo que tiene en la mano?',
      parrafos: [
        'El tamaño resuelve casi todo antes que cualquier otra cosa. La hoja de los Master Gardeners de WSU en el condado de Clark pone a las obreras de la hormiga carpintera occidental entre un cuarto y media pulgada, con reinas de hasta tres cuartos, y las describe negras salvo por las patas rojizas. Sobre una hoja blanca bajo una lámpara, las patas se ven café rojizo y no oscuras, que es una prueba más rápida de lo que la gente espera.',
        'Cuando el tamaño deja duda, dos rasgos terminan de identificarla. De lado, la parte de arriba del tórax es una sola curva lisa, sin cortes; ese arco es lo que la separa de la hormiga de humedad, cuyo perfil lleva una muesca a medio camino. Y la cintura tiene un solo nudo y no dos, lo que descarta de un vistazo a la hormiga de pavimento y a casi todas las chiquitas de cocina.',
        'Lo que más confunde es otra cosa: en un mismo nido las obreras no son del mismo tamaño. Una colonia madura produce obreras chicas, medianas y mayores de cabeza visiblemente más grande, todas hermanas de la misma reina. Muchas familias concluyen que tienen dos especies y compran dos productos. Tienen una colonia portándose normal.',
      ],
    },
    {
      h2: 'Excavan la madera. No se comen nada',
      parrafos: [
        'Es el dato que explica todo lo demás, y el que más seguido se entiende mal. El Laboratorio de Productos Forestales del USDA lo dice sin rodeos en su manual de la madera: la hormiga carpintera usa la madera como refugio y no como comida, y prefiere la que es blanda por naturaleza o que la pudrición ya ablandó. La hoja de WSU lo dice desde el otro lado: comen insectos, la mielecilla de los pulgones, savia, comida de personas y comida de mascotas. Nada de eso es celulosa.',
        'Lo que hacen es soltar las fibras a mordidas, juntar las virutas, llevarlas a una abertura y tirarlas afuera del nido. De ahí salen tres consecuencias. El daño es madera que se quitó, no que se comió: una galería es un hueco donde antes había madera, y esa madera está ahora en un montón más abajo. El cebo funciona: como buscan azúcar y proteína y reparten lo que juntan boca a boca dentro del nido, el material puesto donde ya comen se lleva hacia adentro; un insecto que de verdad digiriera madera nunca se llevaría un cebo a casa.',
        'Y las galerías no se parecen a las de una termita. La extensión de Penn State describe las de la hormiga carpintera con paredes lisas, sin tierra ni excremento: el nido se mantiene limpio porque viven en él. Las termitas subterráneas llenan sus túneles de tierra, y el boletín de termitas de WSU describe las bolitas de la termita de madera húmeda como de un veinticinqueavo de pulgada, algo hexagonales, pegadas a las paredes de la galería o regadas por el piso. Así que, cuando se quita una moldura, la pregunta útil no es cuánta madera falta, sino si el hueco está limpio.',
      ],
    },
    {
      h2: 'El aserrín, y lo que le está diciendo',
      parrafos: [
        'El montoncito de material grueso debajo de una abertura es la otra mitad del mismo hecho. No es aserrín de sierra: es fibra de madera excavada y sacada a propósito, revuelta con lo demás que la colonia estaba limpiando — alas de las reproductoras de la primavera pasada, patas y cabezas de compañeras muertas, restos de presas.',
        'Esa mezcla es la que identifica. Un polvo fino sin fragmentos apunta a escarabajos que perforan la madera; gránulos duros y parejos, a termitas; virutas fibrosas con pedazos de insecto, a hormiga carpintera. Y como el aserrín cae, la galería está arriba del montón: siga una línea recta hacia arriba y busque una rendija en una junta o un agujero de clavo.',
      ],
    },
    {
      h2: '¿Hormiga con alas o termita?',
      parrafos: [
        'Cada abril este condado produce una racha de llamadas que empiezan con "creo que tengo termitas", y en la gran mayoría lo que hay en el marco de la ventana es una hormiga carpintera con alas. Es la confusión más común de la región.',
        'Tres rasgos las separan, y basta uno. Las antenas de la hormiga se doblan: tienen un primer segmento largo y luego un codo; las de la termita salen derechas de la cabeza. La guía comparativa de la extensión de Maryland empieza por ahí, y es lo primero que conviene revisar porque no necesita otro insecto al lado para comparar. Las alas de la hormiga son desiguales: las de adelante son más largas que las de atrás, y el boletín de WSU dice lo mismo desde el lado de la termita, cuyas cuatro alas son del mismo tamaño. Y la hormiga tiene cintura: una constricción angosta entre el tórax y el abdomen, mientras que el cuerpo de la termita va derecho y ancho de la cabeza para atrás.',
        'Hay un cuarto dato que no cuesta nada: el calendario. Las reproductoras de la hormiga carpintera se forman la temporada anterior, pasan el invierno en el nido y salen la primavera siguiente. Los vuelos de la termita de madera húmeda del Pacífico, según WSU, son en tardes tibias de finales del verano o del otoño, sobre todo después de lluvia. Una nube de insectos con alas en una ventana en marzo, abril o mayo aquí casi siempre son hormigas. Un vuelo contra una ventana iluminada en una tarde tibia y húmeda de septiembre merece una mirada más cuidadosa.',
      ],
    },
    {
      h2: 'Por qué las aladas adentro son la señal más fuerte',
      parrafos: [
        'Una colonia no produce reproductoras hasta que puede darse ese lujo. Penn State pone una colonia madura en unas dos a tres mil obreras, que se alcanzan en varios años, y solo entonces empieza a sacar formas con alas, unas doscientas a cuatrocientas por año.',
        'Por eso pesa tanto una salida adentro. Las aladas que salen dentro de su casa en primavera son el producto de un nido que ya maduró, y ese nido está en el edificio: las de un tocón a cuarenta pies salen afuera. Es el hallazgo que con más razón justifica abrir una pared.',
      ],
    },
    {
      h2: 'Colonia madre, satélites, y por qué tratar solo adentro falla',
      parrafos: [
        'Una población de hormiga carpintera no es un nido: es una red. La colonia madre guarda a la reina, los huevos y las crías más chicas, y como los huevos necesitan humedad alta y constante, casi siempre está en madera mojada: un tocón, una raíz enterrada, un tronco caído, una rama muerta, un poste de cerca podrido, un durmiente de jardín sobre la tierra, o el fondo de una pila de leña que no se ha movido en cinco años.',
        'Las colonias satélite guardan obreras, larvas grandes y pupas, que aguantan aire más seco. Por eso se instalan donde el nido madre nunca sobreviviría: un hueco de pared, el ático, una puerta hueca, la estructura debajo de una tina, un sofito cerrado, el espacio detrás de los gabinetes de la cocina. WSU explica el motivo con sencillez: los satélites se forman cuando la colonia madre necesita espacio para crecer.',
        'Las obreras van y vienen sin parar entre los dos, y ese tráfico es lo que hace tratable la red — y la razón por la que tratar solo el edificio suele fallar: quitar un satélite es cortar una rama. La reina sigue intacta y la pared sigue igual de atractiva, así que llega otro satélite al mismo lugar. La recomendación de WSU es clara: tratar la colonia madre además de los satélites es lo que da un control efectivo.',
      ],
    },
    {
      h2: 'El radio de cien yardas',
      parrafos: [
        'Muchas veces la colonia madre no está en su terreno. Penn State la ubica en un árbol, un tronco o madera de desecho a menos de unas cien yardas de la casa: un círculo de unos seis acres que, en un lote de Bellingham, incluye a los vecinos y el área verde al final de la cuadra.',
        'No cruzan ese terreno al azar: viajan por las orillas. En un lote de aquí son predecibles — cercas, la base de un muro de contención, la unión de la entrada con el césped, líneas de riego, acometidas de servicios y, sobre todo, cualquier rama o arbusto que toque la casa. Una rama apoyada en el techo es un puente que se salta todo lo que se haya hecho a nivel del suelo, y cortarla muchas veces son los diez minutos más valiosos de todo el trabajo.',
        'Los caminos se recorren de noche: la hoja de WSU pone la ventana entre la puesta y la salida del sol, de abril a mediados de octubre, y Penn State estrecha las horas más productivas a entre las diez de la noche y las dos de la mañana, de mayo a julio. Y cuando la colonia madre está en un terreno donde no podemos entrar, lo honesto es decirlo: estamos protegiendo un edificio contra la presión de una fuente que no alcanzamos, que es útil y real, pero no es lo mismo que acabar con la colonia.',
      ],
    },
    {
      h2: 'Dónde aparecen en las casas de este condado',
      parrafos: [
        'Aquí el patrón lo pone la temporada de lluvias, no el frío: las vigas de borde y soleras de un espacio bajo el piso viejo; las esquinas de abajo de ventanas y puertas, sobre todo donde se puso una ventana nueva sin corregir el tapajuntas; los sofitos donde una canaleta tapada lleva inviernos desbordándose; alrededor de chimeneas y tragaluces; los largueros de terrazas fijados a la pared sin tapajuntas; los subpisos encima de una fuga lenta; y las cocheras con leña apilada contra una pared compartida.',
        'Lo que tienen en común no es el cuarto: es agua entrando en una pieza de madera el tiempo suficiente para ablandarla. Por eso el laboratorio del USDA señala que esta hormiga puede indicar un problema de humedad en la estructura, y por eso una visita bien hecha revisa canaletas y el nivel del terreno antes que productos.',
      ],
    },
    {
      h2: '¿Cuánto daño hacen de verdad?',
      parrafos: [
        'Penn State es medida al respecto: el daño estructural por anidación de hormiga carpintera rara vez es significativo. En una temporada y en un solo satélite eso coincide con lo que vemos; una colonia trabajando el marco de una puerta un verano no es un problema estructural.',
        'La salvedad honesta es el tiempo, y es la razón de que esta ficha diga que se trata. Diez años de una red sin detectar en una viga de borde siempre mojada le quitan sección real a una pieza que carga peso, junto con los hongos que ablandaron la madera; el laboratorio del USDA calcula que la madera con pudrición pierde entre seis y más de cincuenta por ciento de su tenacidad cuando apenas ha perdido uno por ciento de su peso. Nadie tiene que asustarse el primer año, pero conviene actuar el primer año.',
      ],
    },
    {
      h2: 'Con qué se confunde',
      parrafos: [
        'La hormiga de humedad es la confusión que más seguido va al revés: hormigas chicas y amarillentas en una solera mojada se reportan como carpinteras porque el lugar coincide. WSU pone a sus obreras en tres a cinco milímetros, contra el cuarto de pulgada o más de la carpintera, y el color la delata otra vez: amarillo a café medio contra negro de patas rojas. Con lupa, el perfil del tórax decide: muesca en la de humedad, curva continua en la carpintera.',
        'La hormiga olorosa es chica, oscura y mucho más numerosa en una fila visible. Si se aplasta, huele fuerte — a coco podrido o a queso azul, según WSU —, mientras que la carpintera, cuando mucho, huele un poco a ácido fórmico. Si las hormigas de su barra corren en una columna densa de ida y vuelta y son todas del mismo tamaño, no son carpinteras, y tratarlas como si lo fueran empeora las cosas. Y las termitas, que es la confusión que más consecuencias tiene, se resuelven con los tres rasgos, la temporada del vuelo y el estado de las galerías.',
      ],
    },
    {
      h2: 'Por qué conviene tratarla, y qué implica',
      parrafos: [
        'La colonia no se termina con la temporada ni se va cuando cambia el clima; crece dentro del edificio a su ritmo, trabaja de noche donde nadie mira y se suma a una pudrición que ya está en marcha. Esperar no mejora nada. Un trabajo bien hecho identifica primero, con lupa si hace falta; busca nidos y no filas, siguiendo el aserrín y recorriendo afuera tocones, ramas muertas y leña dentro del radio; usa cebos y materiales no repelentes que las obreras lleven hacia adentro — el manual de plagas del noroeste del Pacífico advierte que los aerosoles de tienda son muy repelentes y dispersan a las hormigas —; trata las dos puntas de la red; corrige el agua o le dice qué oficio la corrige; quita el refugio; y regresa a revisar, porque la actividad suele subir un tiempo después de poner el cebo, que es justo lo que tiene que pasar.',
        'Lo que lo empeora: rociar la fila, que borra la ruta y deja la red intacta; sellar la abertura del aserrín, que esconde la mejor pista sin cerrar nada; y tratar adentro año tras año mientras el tocón que abastece la casa sigue ahí, a cuarenta pies.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Si no se comen la madera, ¿qué pasa con ella?',
      a: 'La sacan. Las obreras sueltan las fibras a mordidas, llevan las virutas a una abertura y las tiran, y por eso una colonia deja un montón de desecho y no un hueco que se vea desde el cuarto. La madera se quita, no se consume.',
    },
    {
      q: '¿Cómo sé que las de alas no son termitas?',
      a: 'Mire primero las antenas, porque no necesita otro insecto para comparar: las de la hormiga se doblan en un codo y las de la termita salen derechas. Las alas y la cintura lo confirman: pares de alas desiguales y una cintura angosta quieren decir hormiga.',
    },
    {
      q: '¿Por qué el nido regresa a la misma pared?',
      a: 'Porque la pared sigue húmeda y la colonia madre de afuera sigue produciendo obreras. Los satélites se ponen donde las condiciones les convienen, y cuando se trató el anterior nada cambió en esa pared, así que el lugar se vuelve a usar.',
    },
    {
      q: '¿Son peligrosas para las personas o las mascotas?',
      a: 'No de manera importante. Las obreras mayores pueden dar una mordida que pellizca si las agarra, y a veces echan ácido fórmico en ella, que arde un momento. No tienen veneno de importancia ni transmiten enfermedades. Lo que preocupa es la madera, no la familia.',
    },
  ],
};
