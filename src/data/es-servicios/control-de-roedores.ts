import type { EsServicio } from './tipos';

/**
 * Roedores, en español y a profundidad completa.
 *
 * Todo lo que se afirma aquí sale de src/content/services/rodent-control.md,
 * que es la versión en inglés ya publicada y revisada. No es una traducción
 * línea por línea — el inglés lleva mucho texto que existe para posicionar en
 * inglés — pero ningún dato aparece aquí que no esté allá.
 *
 * UNA COSA SE OMITIÓ A PROPÓSITO. El texto en inglés dice en un lugar que la
 * rata noruega domina "por mucho" en este condado y más abajo dice que entre
 * las dos ratas el volumen de llamadas corre sesenta-cuarenta a favor de la
 * rata de tejado. Las dos frases no pueden ser ciertas al mismo tiempo. En
 * lugar de escoger una y darle categoría de dato en un segundo idioma, esta
 * página describe a las dos ratas por dónde trabajan el edificio, que es lo
 * que de verdad cambia el trabajo y no está en disputa. Cuando el dueño
 * resuelva cuál cifra es la buena, entra aquí y allá al mismo tiempo.
 */
export const controlDeRoedores: EsServicio = {
  slug: 'control-de-roedores',
  enPath: '/services/rodent-control/',
  nav: 'Roedores',
  h1: 'Control de Roedores y Ratones en Bellingham y el Condado de Whatcom',
  title: 'Control de Roedores y Ratones en Bellingham, WA',
  description:
    'Control de ratas y ratones en español para casas de Bellingham y el condado de Whatcom: inspección, exclusión, trampas y limpieza. Llame al 360-410-2199.',
  answer:
    'Aquí el control de roedores es primero exclusión y después trampas. Buscamos por dónde están entrando, sellamos esas entradas, atrapamos a los que ya están adentro y limpiamos la contaminación que dejaron. Poner trampas sin sellar vacía la casa un tiempo; sellar una rendija de un cuarto de pulgada en los cimientos es lo que de verdad termina el problema.',
  secciones: [
    {
      h2: 'El año del roedor en el condado de Whatcom',
      parrafos: [
        'Si le pregunta a la mayoría de la gente por qué las ratas se meten a las casas, le va a decir que por el frío. Esa es la mitad de la respuesta, y la mitad que falta es justamente la que decide cuándo conviene hacer el trabajo.',
        'Aquí pasan dos cosas, y pasan en orden. Primero las mueve la lluvia. En este condado no hay una helada fuerte y sostenida, pero sí caen unas treinta y cinco pulgadas de lluvia al año. Durante la parte seca del verano la rata noruega vive perfectamente afuera: en la zarzamora, debajo de las terrazas, en las pilas de leña, a lo largo de los arroyos y los cinturones verdes, y en las orillas de los campos rumbo a Lynden y Everson. Después la lluvia se instala a finales de septiembre, el suelo se satura, las madrigueras se inundan, y toda esa población queda desplazada y buscando.',
        'Y después el frío decide dónde terminan. Un frentazo de frío de verdad, encima de una población que ya anda desplazada, es lo que convierte el andar buscando en entrar — y es el mejor predictor que tenemos del volumen de llamadas. Su espacio bajo el piso está seco y está tibio, y para ese momento es la mejor dirección disponible en la cuadra.',
        'La consecuencia es la misma por los dos caminos, y es el único consejo de calendario que de verdad vale la pena seguir en este condado: la ventana útil para el trabajo de roedores es agosto y principios de septiembre, antes de que la lluvia mueva nada y bastante antes de que el primer frío los concentre. Para noviembre ya estamos trabajando una estructura que tiene una población adentro, y eso es un trabajo más largo y más caro que cerrar esas mismas rendijas ocho semanas antes.',
      ],
    },
    {
      h2: 'Qué es lo que tiene, exactamente',
      parrafos: [
        'Identificar bien cambia el trabajo, así que vale la pena ser específico en lugar de decir nada más "roedores".',
        'La rata noruega es pesada, de nariz roma, con la cola más corta que el cuerpo, y es excavadora. Por eso aparece debajo de las losas, de las terrazas y de los cobertizos, y en el espacio bajo el piso, más que en el ático. Los excrementos son grandes y de puntas romas, como de tres cuartos de pulgada.',
        'La rata de tejado es más delgada, de nariz puntiaguda, con la cola más larga que el cuerpo, y es trepadora. Cuando la encontramos suele ser en áticos y en la parte alta de la estructura, y muchas veces en propiedades donde las ramas de los árboles tocan el techo.',
        'La diferencia entre las dos no es un detalle de manual: decide por dónde empieza el trabajo. Una casa con rata de tejado es un problema de línea de techo, de sofito y de ramas encima. Una casa con rata noruega es un problema de cimientos, de espacio bajo el piso y de drenajes. Sellar la mitad equivocada del edificio cuesta el mismo dinero y no resuelve nada.',
        'El ratón casero es chico, gris pardo, y sus excrementos son del tamaño de un grano de arroz con las puntas afiladas. Necesita muy poco: un cuarto de pulgada de rendija y unos cuantos gramos de comida al día. Tampoco necesita moverse lejos, y por eso un problema de ratones muchas veces se queda en una sola parte de la casa mientras que un problema de ratas involucra toda la estructura.',
        'El ratón ciervo tiene la panza blanca, la cola claramente de dos colores, y los ojos y las orejas más grandes que el ratón casero. Es común en propiedades rurales y en el borde del bosque: Sudden Valley, la orilla del lago Whatcom, Edgemoor, y el campo al norte y al este de la ciudad. El ratón ciervo importa por una razón específica, que está más abajo en la parte de salud.',
        'Nada de esto es académico. Las ratas y los ratones responden a colocaciones distintas de trampa, a espaciados distintos y a cebos distintos. Una línea de trampas puesta para ratas se queda intacta en una casa que tiene ratones.',
      ],
    },
    {
      h2: 'Por dónde están entrando',
      parrafos: [
        'Todo trabajo de roedores es en realidad un trabajo de exclusión, y la exclusión empieza por saber dónde buscar. En las casas de este condado la misma lista corta explica casi todo lo que encontramos.',
        'Las rejillas de ventilación de los cimientos son la entrada más común en las casas viejas de Bellingham. Las mallas originales se oxidan, se empujan hacia adentro, o en algún momento las cambiaron por una tela metálica demasiado abierta para servir de algo. En los barrios de antes de la guerra — Lettered Streets, Columbia, Sunnyland, York, partes de Fairhaven y South Hill — es lo primero que revisamos y con frecuencia es la respuesta completa.',
        'Los cimientos de poste y pilar, y los cimientos asentados. Mucha vivienda anterior a 1940 aquí está sobre poste y pilar, y ochenta y tantos años de asentamiento abren huecos entre el cimiento y la estructura de arriba. Desde afuera son difíciles de ver y desde adentro del espacio bajo el piso son obvios.',
        'Las penetraciones de servicios: agua, gas, electricidad, cable, y cada línea que se agregó después. Casi nadie las sella bien, y el contratista que pasó una línea nueva no tenía por qué estar pensando en una rata. Busque el hueco alrededor del tubo, no el tubo.',
        'Las esquinas del portón de la cochera casi nunca sellan bien, y la cochera casi siempre está conectada con el resto de la estructura. Las rejillas de secadora y de baño se rompen, y el ducto que está detrás de ellas es una carretera techada. La puerta de acceso al espacio bajo el piso está muchas veces alabeada, muchas veces atrancada, y de vez en cuando de plano no está.',
        'El sofito y la línea del techo. Donde el techo se encuentra con una pared en un cambio de pendiente muchas veces hay un agujero de verdad. En construcción nueva de ladera — Alabama Hill, Barkley, Cordata, King Mountain — combinado con contacto de árbol o de cerca, así es como los animales acaban en el ático y no debajo del piso.',
        'El número que hay que recordar es un cuarto de pulgada. Esa es la cifra que está en la propia lista de inspección de alquileres de la ciudad de Bellingham, que marca las aberturas en cimientos mayores de un cuarto de pulgada como riesgo de infestación. Si un inspector de código lo busca en una casa rentada, vale la pena buscarlo en una casa propia.',
        'Y es también el número correcto para las ratas, cosa que sorprende a la gente, porque todas las fuentes de extensión universitaria dan una cifra más grande para el animal en sí. Lo que concilia las dos cosas es cómo lo plantea el Departamento de Pesca y Vida Silvestre de Washington: a una rata le basta un agujero de un cuarto de pulgada para morderlo, agrandarlo y pasar. El umbral de exclusión no es la medida por donde cabe el animal. Es la medida a la que el animal puede meterle los dientes a una orilla y empezar a quitar material — y con incisivos que crecen sin parar, ese trabajo se hace. Una malla de media pulgada sobre una rejilla detiene a la rata y deja pasar al ratón; una de un cuarto detiene a los dos y además le quita a la rata la orilla que necesita.',
      ],
    },
    {
      h2: 'Las señales, y qué dice cada una',
      parrafos: [
        'Los excrementos son la evidencia más informativa que hay en la propiedad. El tamaño dice la especie. La ubicación dice las rutas de paso y dónde hay que poner las trampas. El estado dice el tiempo: los frescos son oscuros y flexibles, los viejos son grises, secos y se desmoronan al apretarlos. Un espacio bajo el piso con puros excrementos viejos es una situación distinta de uno con excremento fresco, y eso cambia lo que le recomendamos.',
        'Las marcas de roce. Los roedores siguen siempre las mismas rutas y llevan aceite y tierra en el pelo, así que van dejando un tiznado oscuro a lo largo de las vigas, de los tubos y del arranque de las paredes. Las marcas de roce son la forma en que encontramos la carretera en lugar de adivinar dónde está.',
        'Las mordidas. Los incisivos crecen todo el tiempo, así que el roedor muerde todo el tiempo. La mordida fresca en la madera se ve pálida; la vieja ya se intemperizó. La que más importa es el cable mordido, y es la razón por la que tomamos en serio la actividad en el ático y bajo el piso en lugar de tratarla como una molestia.',
        'El ruido. Rasguños o carreritas arriba del techo por la noche, casi siempre justo después de que oscurece y otra vez antes del amanecer. Las ratas debajo del piso muchas veces se oyen como golpes secos y no como rasguños.',
        'El aislamiento revuelto: túneles y caminos aplastados entre las mantas de fibra, y en una infestación de mucho tiempo, aislamiento comprimido y contaminado al grado de que ya perdió casi todo su valor térmico.',
        'Y las mascotas. Un gato o un perro clavado en un punto de una pared o de un techo merece que se le crea. Tienen razón con frecuencia, y con frecuencia son la primera señal.',
      ],
    },
    {
      h2: 'Cómo trabajamos un trabajo de roedores',
      parrafos: [
        'La inspección. Nos metemos al espacio bajo el piso y al ático. Eso no es opcional y no es una vuelta por afuera de la casa: las entradas y la evidencia están adentro de esos espacios, y una empresa que cotiza trabajo de roedores sin meterse a ellos está cotizando una adivinanza. Mapeamos las entradas, la actividad, hasta dónde llegó la contaminación, y en qué estado está el aislamiento.',
        'La exclusión. Sellar todas las entradas que encontramos, con materiales por los que un roedor no pasa: tela metálica del calibre correcto, lámina, mortero donde corresponde. No espuma expansiva sola, que una rata se atraviesa en una noche, y no fibra de acero sola, que se oxida y se deshace. Esta es la parte del trabajo que termina el problema, y es donde debe ir el dinero.',
        'Las trampas. Trampas de golpe y dispositivos de captura múltiple puestos sobre las rutas que mapeamos, en la cantidad que justifique la actividad. Regresamos a revisar y a volver a armar, porque una población sale a lo largo de varios días y no toda de una vez. Las trampas van después de la exclusión y no antes, para no estar sacando animales mientras la puerta sigue abierta.',
        'El monitoreo. Dejamos la línea trabajando hasta que se queda callada, y callada quiere decir varias visitas sin nada, no una.',
        'La limpieza y la restauración. Se retiran los excrementos y el material contaminado, se tratan las superficies, y donde el aislamiento quedó comprometido, se quita y se reemplaza. Esto se programa después de terminar con las trampas, para no restaurar un espacio que todavía está ocupado.',
      ],
    },
    {
      h2: 'Cómo usamos el rodenticida, y qué escogemos',
      parrafos: [
        'Sí manejamos programas de rodenticida donde son la herramienta correcta, y somos deliberados con qué productos entran en ellos. Vale la pena explicarlo, porque "¿usan veneno?" es de las primeras preguntas que hace la gente y la respuesta honesta tiene más adentro que un sí o un no.',
        'El envenenamiento secundario es lo que decide la elección del producto. El problema clásico del cebo para roedores no es el roedor: es lo que se come al roedor después. Las químicas anticoagulantes viejas matan despacio, así que un animal cebado sigue moviéndose varios días y una parte de ellos muere a la intemperie, donde se los llevan las lechuzas de campanario, los halcones de cola roja, los coyotes y los gatos. La lechuza de campanario en particular es el control de roedores más efectivo que tiene cualquier propiedad rural de este condado, y envenenarla para matar a su presa es un mal negocio en un rancho que está trabajando.',
        'Por eso escogemos rodenticidas formulados para limitar o impedir esa exposición secundaria, en lugar de irnos por el bloque de cebo más barato. Esa decisión cuesta un poco más por estación y protege a los depredadores que ya están trabajando su propiedad gratis.',
        'La colocación importa tanto como el producto. Cada cebo va en una estación a prueba de manipulación, puesta sobre las rutas que mapeamos y no regada al azar, y queda registrada para que cualquiera que audite el sitio — o usted mismo, un año después — pueda ver exactamente dónde están los dispositivos y por qué.',
        'El trabajo interior es con trampas. El cebo va afuera y va en estación. Adentro atrapamos, porque un roedor que se muere en el hueco de una pared o debajo de un piso se convierte en un problema de descomposición y de moscas en un lugar al que usted no llega. La trampa deja al animal donde lo podemos sacar.',
        'Y nada de esto sustituye a la exclusión. Un programa de cebo maneja la presión que hay sobre una propiedad; no impide que los animales entren al edificio. La rendija de un cuarto de pulgada sigue siendo lo que decide si usted tiene roedores adentro, y por eso la secuencia en todos los trabajos es la misma: exclusión primero, trampas para lo que ya está adentro, y cebo donde la presión exterior o comercial de verdad lo justifique.',
      ],
    },
    {
      h2: 'El daño, y por qué esperar sale más caro',
      parrafos: [
        'El cableado. Los roedores le quitan el aislamiento a los conductores a mordidas. Ese es el riesgo que justifica moverse rápido, y no es teórico.',
        'El aislamiento. Además de los túneles, la orina y los excrementos saturan las mantas y acaban con el valor térmico. El reemplazo del aislamiento del ático es de forma rutinaria la partida más grande de un trabajo de roedores, y crece en proporción directa al tiempo que los animales estuvieron ahí.',
        'La contaminación. Los roedores no controlan esfínteres mientras se desplazan, así que una ruta es una superficie contaminada, y con frecuencia está arriba de su techo o debajo de su piso.',
        'La estructura. Las infestaciones largas debajo del piso dañan la barrera de vapor y los ductos, y un ducto roto en un espacio contaminado mete ese aire a la casa.',
        'Y las plagas secundarias. Los nidos de roedor sostienen ácaros y escarabajos dermestidos, y cuando los roedores se van o se mueren, esos se mueven hacia adentro buscando dónde quedarse.',
      ],
    },
    {
      h2: 'La parte de salud, dicha claro',
      parrafos: [
        'Los excrementos y la orina de roedor llevan patógenos, y la respuesta sensata es tomar precauciones de manejo, no alarmarse.',
        'El que vale la pena nombrar específicamente es el hantavirus, que en Washington lo carga el ratón ciervo. Da tentación archivar eso como un problema del campo, y el estado no lo permite: el Departamento de Salud de Washington dice que hay ratones ciervo infectados en todo el estado y que existe riesgo de síndrome pulmonar por hantavirus en cualquier parte de Washington. Lo que concentra el riesgo no es un mapa, es una situación — un espacio cerrado con excremento y material de nido que alguien luego mueve. Cabañas, cobertizos, graneros, cocheras, vehículos guardados y espacios bajo el piso son los escenarios que nombra la guía, y una cochera separada atrás de una casa en la ciudad califica igual que una cabaña al final de un camino de terracería.',
        'La otra mitad del cuadro es qué tan raro es, y va en la misma frase y no aparte. El departamento reporta normalmente entre uno y cinco casos al año en todo el estado, y alrededor de una de cada tres personas diagnosticadas ha muerto. Su guía de vigilancia registra 58 casos en Washington en total hasta 2022, 20 de ellos mortales, y como el 70 por ciento con exposición reportada en el este del estado. Consecuencia grave, probabilidad baja — que es exactamente la combinación donde seguir un método le gana tanto al pánico como al desdén.',
        'El contagio es por respirar material que se levanta en el aire desde excremento, orina y material de nido secos, así que la regla práctica sale sola: no barra ni aspire en seco el excremento de roedor. Ventile el espacio primero, moje el material con desinfectante, use guantes y protección respiratoria adecuada, y embólselo.',
        'La leptospirosis es la otra que vale la pena conocer. Se transmite por agua contaminada y es sobre todo relevante donde se juntan el agua estancada y la actividad de roedores.',
        'Si todo eso suena a más de lo que usted quiere echarse encima, esa es precisamente la razón por la que la limpieza es parte del trabajo y no algo que le regresamos a usted.',
      ],
    },
    {
      h2: 'Por el condado',
      parrafos: [
        'Bellingham de antes de la guerra — Lettered Streets, Columbia, Sunnyland, York, South Hill. Cimientos de poste y pilar, mallas de ventilación vencidas, penetraciones sin sellar. Ratas noruegas en el espacio bajo el piso. Casi siempre es un trabajo de exclusión.',
        'Ladera y borde de construcción nueva — Alabama Hill, Barkley, Cordata, King Mountain. Entrada por sofito y línea de techo, contacto de árboles y cercas, actividad en el ático. Más seguido es trabajo a nivel de techo.',
        'El cinturón de renta estudiantil — Sehome, Happy Valley, cerca del campus. Mucha rotación, manejo de comida que cambia con cada inquilino, y responsabilidad repartida entre dueño, administrador y ocupante. Ratas más que ratones, igual que el resto de la ciudad.',
        'Arriba junto al lago. Sudden Valley, Silver Beach y Edgemoor traen ratón ciervo y presión de bosque, picos por temporada, y muchas veces una segunda casa que lleva meses vacía.',
        'El campo — Lynden, Everson, Nooksack, Sumas. Orillas de sembradío, almacenamiento de alimento y grano, bodegas y cobertizos de equipo. El volumen es más alto y el trabajo es estructural. Aquí es también donde más nos interesa que las lechuzas sigan vivas.',
        'La costa — Blaine, Birch Bay y los puertos. Guardado de equipo de marina, y mucha vivienda que pasa vacía los meses de lluvia sin que nadie se dé cuenta de qué se metió.',
      ],
    },
    {
      h2: 'Si renta, o si administra una renta',
      parrafos: [
        'Los roedores son la plaga que con más frecuencia se convierte en un pleito sobre quién paga, y en Bellingham ese pleito tiene una forma legal que conviene conocer antes de tenerlo.',
        'La ley de propietario e inquilino de Washington, RCW 59.18.060, pone el control de plagas del lado del propietario — con una excepción específica cuando la vivienda es una casa unifamiliar, o cuando la infestación la causó el inquilino. En un edificio de varias unidades la obligación por lo general es del dueño. En una casa rentada con frecuencia no lo es, y eso sorprende a los inquilinos seguido.',
        'Bellingham agrega una segunda capa. El capítulo 6.15 del código municipal exige que las propiedades de renta pasen una inspección certificada, y la lista de revisión nombra explícitamente las aberturas en cimientos mayores de un cuarto de pulgada como riesgo de infestación. Eso convierte la exclusión de buena práctica en un asunto de cumplimiento, y quiere decir que el propietario que sella el espacio bajo el piso está comprando dos cosas al mismo tiempo.',
        'Trabajamos con inquilinos, con dueños y con administradores, y donde la respuesta dependa de cuál de esos es usted, se lo vamos a decir en lugar de cobrarle calladamente a quien haya llamado.',
      ],
    },
    {
      h2: 'Trabajo comercial de roedores',
      parrafos: [
        'Las cuentas comerciales se distinguen por lo que queda documentado más que por lo que se hace. La colocación de dispositivos va mapeada para que un auditor o un inspector vea el arreglo sin tener que creerle a nadie, cada visita produce un registro de hallazgos y acciones, y las recomendaciones que quedan de su lado — una puerta de andén que no cierra, basura guardada demasiado cerca del edificio, un drenaje que mantiene húmeda la losa — van por escrito y no mencionadas de pasada.',
        'Los puntos de presión son consistentes en todo el condado: andenes de carga y cortinas metálicas, encierros de contenedor de basura, ductos de servicio entre unidades, almacenamiento de alimento y grano en sitios agrícolas, y el guardado de equipo alrededor de los puertos. En edificios multifamiliares el problema entero es la pared compartida y el ducto compartido, porque tratar una unidad mientras la de junto queda intacta nada más reubica la población.',
      ],
    },
    {
      h2: 'Cuánto cuesta',
      parrafos: [
        'Cotizamos a partir de la inspección y no de una lista de precios, porque el rango es de verdad amplio. Un problema de ratones limitado a una parte de la casa con dos entradas es un trabajo chico. Una casa de campo de los años veinte con ratas por todo el espacio bajo el piso, doce metros de malla de ventilación vencida y aislamiento que hay que quitar y reponer, no lo es.',
        'Lo que mueve el número es el acceso y la extensión, más que el animal: qué tanta altura hay en el espacio bajo el piso, cuánto perímetro hay que sellar, si el revestimiento está lo bastante sano para sellar contra él, y hasta dónde llegó la contaminación. Usted recibe la cifra por escrito antes de que empiece nada, y la estimación no se cobra.',
      ],
    },
    {
      h2: 'Cómo mantenerlos afuera',
      parrafos: [
        'Recorte la vegetación y las ramas para que no toquen el techo ni las paredes. No deje que la corteza de jardín ni la tierra suban hasta el revestimiento. Guarde el alimento, la semilla y la comida de mascota en recipientes cerrados y no en bolsas. Levante la fruta caída. Mantenga la leña despegada del suelo y lejos de la casa. Maneje el agua estancada y haga que las bajadas de agua descarguen lejos del cimiento.',
        'Revise las mallas de ventilación una vez al año — la primavera es buena costumbre — y selle cada penetración nueva en el momento en que un contratista la hace.',
        'Nada de eso sustituye a la exclusión en una casa que ya tiene un hueco. Es lo que mantiene sellada una casa que ya se selló.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿Van a volver?',
      a: 'Por una rendija sellada, no. Los roedores vuelven a estructuras, no a direcciones, así que una casa bien excluida deja de estar disponible. Lo que los trae de vuelta es una entrada nueva: una malla de ventilación rota, un cimiento que se asentó, o un contratista que pasó una tubería nueva y no la selló.',
    },
    {
      q: '¿Cuánto tarda el trabajo?',
      a: 'La exclusión, uno o dos días según la estructura. Las trampas, de una a tres semanas con visitas de regreso, porque una población no cae toda de golpe. La limpieza y el reemplazo de aislamiento van después de terminar las trampas.',
    },
    {
      q: '¿Cuál es el mejor mes para hacerlo?',
      a: 'Agosto y principios de septiembre. Es antes de que la lluvia desplace a la población de afuera y bastante antes del primer frío. Sellar en agosto es un trabajo más corto y más barato que sellar la misma casa en noviembre con animales ya adentro.',
    },
    {
      q: '¿Puedo nada más poner trampas yo mismo?',
      a: 'Puede, y va a agarrar algunos. Lo que no cambia es la disponibilidad de la casa: mientras la entrada siga abierta, atrapar vacía el lugar un tiempo y se vuelve a llenar. Por eso aquí el orden es sellar primero y atrapar después.',
    },
    {
      q: '¿Puedo limpiar yo el excremento?',
      a: 'Sí, pero no en seco. No barra ni aspire: mover material seco lo levanta en el aire, y el ratón ciervo en Washington es una consideración de hantavirus. Ventile, moje el material con desinfectante, use guantes y respirador, y embólselo. O déjenoslo a nosotros, que es parte del trabajo.',
    },
  ],
};
