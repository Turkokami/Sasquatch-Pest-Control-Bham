import type { EsServicio } from './tipos';

/**
 * Abejas, en español y a profundidad completa. Fuente: la versión en inglés en
 * src/content/services/bee-removal.md.
 *
 * El slug dice "eliminación" porque es lo que la gente escribe en el buscador.
 * La página, igual que la inglesa, dice en la primera línea que no matamos
 * abejas melíferas. Un slug que atrapa la búsqueda y un texto que corrige la
 * idea es exactamente lo que hace la página en inglés con "bee removal".
 */
export const eliminacionDeAbejas: EsServicio = {
  slug: 'eliminacion-de-abejas',
  enPath: '/services/bee-removal/',
  nav: 'Abejas',
  h1: 'Abejas: Identificación y Retiro en Bellingham',
  title: 'Control y Retiro de Abejas en Bellingham, WA',
  description:
    'No matamos abejas melíferas. Identificación primero: casi todas las llamadas por abejas son avispas chaqueta amarilla. Bellingham y Whatcom. Llame al 360-410-2199.',
  answer:
    'No matamos abejas melíferas. La mayoría de las llamadas por abejas resultan ser avispas chaqueta amarilla, y la mayoría de las llamadas que sí son de abejas necesitan un apicultor o no necesitan nada. Cuando hay una colonia de abejas melíferas establecida dentro de una estructura, eso es un trabajo de retiro y reparación: el panal tiene que salir, porque si se queda causa problemas peores que las abejas.',
  secciones: [
    {
      h2: 'Empiece aquí: probablemente no son abejas',
      parrafos: [
        'La mayoría de las llamadas que recibimos por abejas son por chaquetas amarillas.',
        'La confusión se entiende — amarillo y negro, vuelan, pican — pero la distinción lo decide todo, porque a la chaqueta amarilla la tratamos y a la abeja melífera no la matamos.',
        'La abeja melífera es de color café dorado, peluda, de tamaño mediano. Visita flores. No le interesa su comida, su bebida, su bote de basura ni su asador. Pica una sola vez y se muere, así que no tiene ganas de hacerlo. Una "abeja" en un día de campo casi siempre es una chaqueta amarilla.',
        'La chaqueta amarilla es lisa, brillante, con marcas muy vivas y cintura angosta, y es notablemente más rápida y más atrevida. Caza proteína a principios de temporada y busca azúcar al final, que es exactamente por qué aparece en su mesa en septiembre. Pica una y otra vez.',
        'El abejorro es grande, redondo y muy peludo, muchas veces con bandas amarillas, negras y a veces anaranjadas. Lento, ruidoso y famoso por lo tranquilo.',
        'Las abejas albañiles y las abejas mineras son chicas, solitarias, muchas veces de color azul verdoso metálico u oscuras, y activas en primavera. Sin colonia, sin defensa, y en la práctica sin riesgo de picadura.',
        'Si le puede tomar una foto, mándela. La identificación es gratis y con frecuencia termina la conversación con un "no nos necesita".',
      ],
    },
    {
      h2: 'Por qué no matamos abejas melíferas',
      parrafos: [
        'Es una postura firme y vale la pena explicarla en lugar de nada más afirmarla.',
        'En lo práctico, empeora el problema. Una colonia dentro de una pared son kilos de panal de cera, cría y miel. Mate a las abejas y todo eso se queda en el hueco. Sin la colonia cuidándolo, el panal se calienta, la miel se fermenta y escurre, y se mete en el tablaroca y en la estructura — dejando manchas, olor, y una fuente de comida de largo plazo que atrae hormigas, polillas de la cera, derméstidos y roedores. Las familias que pagan para que envenenen una colonia en la pared con frecuencia pagan otra vez un año después por un trabajo bastante más sucio.',
        'En lo ecológico, es un mal intercambio. La presión sobre los polinizadores es real, y destruir una colonia que funciona y que un apicultor recogería con gusto es difícil de justificar cuando existe un mejor resultado.',
        'Y casi siempre hay una mejor opción. Los enjambres se recogen. Las colonias establecidas se retiran como se debe. Ninguna de las dos cosas requiere matar nada.',
      ],
    },
    {
      h2: 'Los enjambres',
      parrafos: [
        'Un enjambre es una colonia de paso: una reina y un racimo grande de obreras que salieron de una colmena para fundar otra. Se juntan en una rama, un poste de cerca, una pared o un vehículo en una masa densa, a veces de miles de abejas, mientras las exploradoras buscan un hueco permanente.',
        'Dos cosas que conviene saber. Por lo general son dóciles: un enjambre no tiene nido, ni cría, ni reservas que defender, y va lleno de miel para el viaje. No anda buscando problemas, aunque no hay que molestarlo. Y por lo general se va solo, en uno o dos días.',
        'La respuesta correcta en general es dejarlo en paz y, si está en un lugar incómodo, contactar a un apicultor de la zona. Los apicultores con frecuencia recogen enjambres sin cobrar, porque una colonia gratis de verdad tiene valor para ellos. Lo vamos a orientar hacia allá en lugar de venderle un servicio.',
        'Lo que le pediríamos es que no lo rocíe. Un enjambre es el mejor resultado posible — una colonia que todavía no se metió a su pared — y matarlo desperdicia eso.',
      ],
    },
    {
      h2: 'Colonias establecidas dentro de una estructura',
      parrafos: [
        'Una propuesta completamente distinta, y la razón por la que existe esta página.',
        'Si las exploradoras escogieron el hueco de su pared, un sofito, la chimenea o un hueco del piso, la colonia construye panal y se vuelve permanente. Las señales son un tráfico constante y en una dirección en un solo punto del edificio durante semanas y no días, un zumbido bajo y continuo que se oye desde adentro, calor en una zona de la pared, y en una colonia establecida, miel o manchas que aparecen a través del tablaroca o del revestimiento.',
        'Resolverlo bien es un retiro con apertura. Se abre el hueco, se saca la colonia y todo el panal, se limpia el hueco para quitar el residuo y la feromona, y se repara y sella la estructura para que el lugar no se vuelva a ocupar — que es lo que va a pasar, porque un hueco que tuvo abejas le huele a casa a las siguientes exploradoras.',
        'Eso es tanto carpintería como trabajo de plagas, y con frecuencia lo hace un apicultor que se especializa en retiros, a veces trabajando junto con un contratista. Le vamos a decir honestamente qué implica el trabajo y quién es el más indicado para cada parte, en lugar de ofrecerle un rociado como atajo.',
        'Lo que no vamos a hacer es tratarla y dejar el panal en la pared. Eso es lo que produce la llamada de un año después.',
      ],
    },
    {
      h2: 'Los abejorros',
      parrafos: [
        'Nuestra recomendación por defecto es dejarlos, y aquí va por qué eso no es flojera.',
        'Las colonias de abejorro son chicas: de docenas a unos cuantos cientos de individuos, no decenas de miles. Son anuales: la colonia se muere en otoño y solo las reinas nuevas pasan el invierno, en otro lado. El nido nunca se vuelve a usar. Son dóciles a menos que se moleste el nido directamente, y están entre los polinizadores más efectivos de esta región para justo los cultivos de los que depende el corredor agrícola del condado de Whatcom.',
        'Así que un nido de abejorro debajo de un cobertizo, en una composta, en una madriguera vieja de roedor o en el aislamiento de una pared es una situación temporal que se resuelve sola para el otoño, y la respuesta sensata casi siempre es mantenerse lejos y esperar.',
        'Donde de verdad está en un mal lugar — justo al lado de una puerta, en el área de juego de un niño, o donde alguien de la casa tiene alergia a las picaduras — platicamos las opciones. Aun así, la primera opción que se considera es si se puede trabajar alrededor del área lo que queda de la temporada.',
      ],
    },
    {
      h2: 'Abejas albañiles, abejas mineras y las inofensivas',
      parrafos: [
        'Cada primavera nos llaman por estas, y no necesitan ningún servicio.',
        'La abeja albañil es chica, oscura o metálica, y solitaria: cada hembra es su propia reina con su propio nido, y no tiene colonia que defender. Anida en agujeros que ya existen — tallos huecos, agujeros de salida de escarabajo, y los tubos que la gente pone precisamente para atraerlas. Son polinizadoras de principios de temporada de verdadero valor en huertos y jardines, no dañan la madera, y casi no son capaces de dar una picadura que importe.',
        'La abeja minera anida en madrigueras individuales chicas en tierra desnuda o en el pasto, muchas veces en grupos sueltos que se ven alarmantes y no son una colonia. Están activas unas semanas en primavera y después se van. No dañan el pasto.',
        'Si alguna de las dos aparece en su propiedad, el consejo honesto es que las disfrute. No le vamos a vender un tratamiento contra un polinizador solitario, y si alguien más se lo ofreció, vale la pena saber eso de esa empresa.',
        'Otra cosa distinta son los agujeros redondos y limpios, más o menos del grosor de un lápiz, en fascias, molduras, barandales de terraza o revestimiento, muchas veces con aserrín grueso abajo y una abeja grande rondando cerca. Eso es una abeja que perfora madera. Es una pregunta estructural y no de polinizadores, aunque el daño se acumula despacio y con frecuencia se exagera.',
      ],
    },
    {
      h2: 'Qué hacemos de verdad en una llamada por abejas',
      parrafos: [
        'Identificar, sin cobrar. Especie y situación. Una buena parte de estas llamadas terminan aquí, con un consejo.',
        'Orientarlo hacia un apicultor, para un enjambre o para una colonia establecida de abeja melífera, porque ese es el resultado correcto y preferimos dárselo a vender alrededor de él.',
        'Atenderlo como avispas cuando resulta que son chaquetas amarillas, avispones o avispas papeleras, que es casi siempre.',
        'Atender la estructura donde ya se retiró una colonia: sellar el hueco, poner malla en la entrada, y cerrar las otras aberturas del edificio para que no se vuelva a ocupar. Eso es trabajo de exclusión y reparación, y es la parte que más seguido se salta, que es por lo que algunos edificios tienen colonias una y otra vez.',
        'Y aconsejar sobre la prevención: tapar las chimeneas, poner malla en rejillas y sofitos, y cerrar las aberturas de hueco que les atraen a las exploradoras.',
      ],
    },
    {
      h2: 'Cómo evitar que una colonia se instale',
      parrafos: [
        'Las exploradoras buscan un hueco seco y cerrado, del volumen correcto, con una entrada chica y fácil de defender. Los edificios ofrecen muchos, y los que reciben colonias tienden a recibirlas una y otra vez.',
        'Tape la chimenea. Un tiro sin tapa es de los lugares más confiables para una colonia en una casa, y es el más difícil de resolver después porque el acceso es malo.',
        'Ponga malla en las rejillas. Rejillas de hastial, de sofito, de cumbrera y de secadora con malla metálica sana y no con persianas de plástico rotas.',
        'Cierre las rendijas: donde el revestimiento se junta con la moldura, alrededor de los marcos de puertas y ventanas, en los remates de sofito, y cualquier agujero que haya usado una colonia anterior. Eso último es lo que más importa: un hueco que tuvo abejas guarda feromona que atrae activamente a las exploradoras nuevas, así que un sitio de colonia anterior debe limpiarse y sellarse, no nada más vaciarse.',
        'Revise después de cambiar el techo o el revestimiento. Los oficios crean rendijas nuevas, y las exploradoras de primavera las encuentran rápido.',
        'Ese trabajo es exclusión y reparación, y cierra las mismas aberturas que dejan entrar a las avispas, a los roedores y a la mosca de racimo. Un trabajo, varios problemas.',
      ],
    },
    {
      h2: 'Si alguien en la casa es alérgico',
      parrafos: [
        'Esto cambia el cálculo y vale la pena decirlo aparte.',
        'Una alergia conocida a las picaduras convierte la cercanía a cualquier colonia — de abeja o de avispa — en una consideración médica de verdad y no en un gusto. En esa situación no le decimos a la gente que tolere un nido de abejorro junto a una puerta, y el consejo de "déjelas en paz" de esta página no aplica.',
        'Lo que sí seguimos haciendo es buscar la respuesta menos destructiva que resuelva el riesgo. Para un enjambre, eso quiere decir un apicultor, rápido. Para una colonia establecida de abeja melífera, un retiro como se debe y no un envenenamiento. Para un nido de abejorro en un mal lugar, platicar las opciones en lugar de suponer la peor.',
        'Díganoslo cuando llame. Cambia la urgencia y cambia lo que le recomendamos.',
      ],
    },
    {
      h2: 'Abejas en el suelo en otoño',
      parrafos: [
        'Una llamada común que no necesita servicio.',
        'A finales de la temporada, las obreras de abejorro y de abeja melífera que llegan al final de su vida con frecuencia aparecen en el suelo, moviéndose despacio o sin moverse. Los nidos también se están deshaciendo en otoño, lo que pone a más individuos al descubierto.',
        'Es mortalidad normal de temporada, no la señal de un nido cerca, ni de envenenamiento, ni de nada malo con la propiedad. Una abeja sola moviéndose despacio en un andador en septiembre es una abeja al final de su vida.',
        'Si quiere ayudar a una, una gota de agua con azúcar en una cuchara a veces revive a una abeja que simplemente se quedó sin combustible. Esa es toda la intervención, y no es algo que cobremos.',
      ],
    },
    {
      h2: 'Por qué tomamos esta postura',
      parrafos: [
        'Comercialmente sería más fácil tratar igual todas las llamadas por insectos que pican. Una colonia en la pared rociada es un trabajo rápido con buen margen, y la mayoría de los clientes nunca notaría la diferencia hasta que la miel saliera por el techo un año después.',
        'No lo hacemos por tres razones, y vale la pena ponerlas por escrito. No es el trabajo correcto: un tratamiento que deja kilos de panal y miel en un hueco no resolvió nada, convirtió un problema de abejas en un problema de humedad, manchas y plagas secundarias, y le dejó al cliente una cuenta más grande para después.',
        'La alternativa de verdad existe. Los apicultores quieren enjambres. Los especialistas en retiro hacen las aperturas. Mandar a alguien a un mejor resultado nos cuesta un trabajo y nos gana algo que vale más que el trabajo.',
        'Y los polinizadores aquí no son una abstracción. La producción de mora y de fruta de árbol del condado de Whatcom depende de polinizadores manejados y silvestres, y el corredor agrícola a unas millas al norte de nuestra oficina es donde esa dependencia es más directa. Destruir colonias que funcionan en ese contexto es difícil de defender.',
        'Si otra empresa le ofrece exterminar las abejas melíferas de su pared, la pregunta que vale la pena hacer es qué pasa con el panal.',
      ],
    },
    {
      h2: 'Por el condado',
      parrafos: [
        'El corredor agrícola — Lynden, Everson, Nooksack, Sumas. Las colmenas manejadas son parte del paisaje de trabajo y la polinización de la mora depende de ellas. Aquí la identificación importa más que en ningún otro lado, porque destruir la colonia de producción de alguien es un problema real y no una abstracción.',
        'Los barrios viejos de la ciudad — Lettered Streets, Columbia, Sunnyland, York. Chimeneas sin tapa, sofitos abiertos y huecos de pared en construcción vieja les dan a las exploradoras exactamente el volumen que buscan, y es donde aparecen las colonias establecidas.',
        'Alrededor del lago Whatcom y el borde del bosque — Sudden Valley, Silver Beach, Edgemoor. Abejorros en huecos del suelo y debajo de las terrazas, abejas albañiles en el cedro y en agujeros de escarabajo, y muchas colonias silvestres de abeja melífera en árboles que no son problema de nadie.',
        'La costa y las casas de temporada — Blaine, Birch Bay y Semiahmoo. Propiedades cerradas durante meses, donde una colonia se puede establecer a lo largo de un verano y estar bien desarrollada antes de que alguien lo note.',
      ],
    },
    {
      h2: 'Qué necesitamos saber cuando llame, y cuánto cuesta',
      parrafos: [
        'Una foto, si es posible: resuelve la identificación más rápido que cualquier descripción. Por dónde están entrando: un solo punto constante del edificio, varios puntos, o ninguno en particular. Tráfico constante y en una dirección en un solo lugar durante semanas quiere decir colonia establecida; abejas moviéndose por el jardín quiere decir recolectoras.',
        'Cuánto tiempo lleva pasando: días sugiere un enjambre; semanas o una temporada sugiere una colonia con panal. Si se oye algo: un zumbido continuo que se escucha desde adentro de una pared, sobre todo cuando el cuarto está en silencio en la noche, es un indicador fuerte de colonia establecida. Si alguien es alérgico. Y si ya se roció algo, porque afecta lo que un apicultor está dispuesto a recoger — una colonia tratada por lo general ya no se puede rescatar, lo cual es otra razón para no rociar primero y llamar después.',
        'La identificación es gratis y con frecuencia es toda la interacción. Donde el trabajo de verdad es nuestro — una colonia de avispa que se confundió con abejas, o el sellado estructural después de retirar una colonia — se cotiza como cualquier otro trabajo, a partir de una visita y por escrito de antemano. Donde la respuesta correcta es un apicultor, no cobramos por decírselo. Donde es un retiro con apertura, el precio es del apicultor y la reparación puede ser de un contratista; le decimos cuáles son las partes para que pueda juzgar una cotización en lugar de adivinar.',
        'Una nota más, que aplica mucho más allá de esta página: nuestros tratamientos de rutina son dirigidos y no regados — perímetro, entradas, refugio y estructura, no aplicación general sobre la vegetación y las plantas en flor. Evitamos tratar plantas en flor, trabajamos alrededor de los periodos de floración cuando un tratamiento queda cerca de ellas, y donde una aplicación tiene que hacerse cerca del forraje preferimos las horas en que las abejas no están activas. En cuentas agrícolas cerca de colmenas manejadas esa coordinación importa más, y vale la pena que nos diga si hay colmenas junto a una propiedad donde estemos trabajando.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Hay un montón de abejas colgando de mi árbol.',
      a: 'Eso suele ser un enjambre de paso y casi siempre se va solo en uno o dos días. No lo rocíe. Si está en un lugar incómodo, un apicultor de la zona muchas veces lo recoge sin cobrar, y le podemos decir a quién llamar.',
    },
    {
      q: '¿Por qué no simplemente las matan?',
      a: 'Porque el panal y la miel se quedan en la pared, se fermentan, escurren y atraen otras plagas. Matar una colonia dentro de una pared convierte un problema de abejas en un problema de humedad y manchas, y casi siempre se paga dos veces.',
    },
    {
      q: 'Tengo un nido de abejorros debajo de la terraza.',
      a: 'La recomendación por defecto es dejarlo. La colonia es chica, se muere sola en otoño y el nido no se vuelve a usar. Si está junto a una puerta o alguien de la casa es alérgico, platicamos las opciones.',
    },
    {
      q: 'Hay abejas muertas o muy lentas en el suelo en otoño.',
      a: 'Es mortalidad normal de temporada: obreras al final de su vida y nidos que se deshacen. No es señal de un nido cerca ni de envenenamiento, y no necesita servicio.',
    },
  ],
};
