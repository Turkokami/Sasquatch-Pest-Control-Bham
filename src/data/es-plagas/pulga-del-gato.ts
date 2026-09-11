import type { EsPlaga } from './tipos';

/** Fuente: src/content/pests/cat-flea.md. Cada dato viene de ahí y de sus fuentes.
 *  Lo que va en el animal es del veterinario; la página no recomienda productos para mascotas. */
export const pulgaDelGato: EsPlaga = {
  slug: 'pulga-del-gato',
  species: 'cat-flea',
  nombre: 'Pulga del gato',
  h1: 'Pulga del Gato — La Especie en Gatos y Perros',
  title: 'Pulga del Gato (Ctenocephalides felis) en Whatcom',
  description:
    'La pulga de los perros aquí es la pulga del gato, y casi toda la población nunca está en el animal. Qué quiere decir eso para tratar bien una casa.',
  answer:
    'Casi toda pulga en una casa del condado de Whatcom es la pulga del gato, sin importar en qué animal llegó. Cerca del noventa y cinco por ciento de la población son huevos, larvas y pupas en la alfombra y las camas, no adultos en la mascota, y las pupas pueden esperar meses antes de salir.',
  secciones: [
    {
      h2: 'La pulga de perro que no lo es',
      parrafos: [
        'Alguien en el condado encuentra pulgas en su perro y, con razón, les dice pulgas de perro. La especie casi seguro es Ctenocephalides felis, la pulga del gato: el nombre es un accidente histórico. UC IPM la llama el parásito externo más común de gatos y perros por igual, y Purdue suma entre sus huéspedes gallinas, becerros y cerdos, y entre los silvestres coyotes, mapaches y tlacuaches. La verdadera pulga de perro existe y aparece a veces; el tratamiento no cambia.',
      ],
    },
    {
      h2: 'El dato que explica casi todo lo demás',
      parrafos: [
        'Este es el número para llevarse: cerca del noventa y cinco por ciento de las pulgas en una casa infestada no son pulgas que se ven. La extensión de la Universidad de Arizona lo da como una división directa — alrededor del noventa y cinco por ciento de la población son huevos, larvas y pupas repartidos por la casa, y el otro cinco por ciento son adultos que viven en el animal —, y todo lo frustrante de las pulgas sale de ahí. Explica por qué una familia trata a la mascota, ve desaparecer las pulgas visibles y a los quince días tiene la casa llena otra vez. Explica por qué una aspirada a fondo hace mella donde un rociado en el sillón no. Explica por qué la visita de seguimiento es parte del plan y no una admisión de que algo salió mal. Y explica por qué un trabajo de pulgas tiene una mitad de la familia y una mitad profesional, y falla cuando se salta cualquiera de las dos.',
      ],
    },
    {
      h2: 'El ciclo, etapa por etapa',
      parrafos: [
        'Una hembra pone de veinte a cincuenta huevos al día, según UC IPM, y Missouri da hasta ochocientos en su vida. Son blanco perla, ovalados, de un treintaidosavo de pulgada, y lo importante: no son pegajosos. Caen del animal a las pocas horas donde sea que esté parado, y ese detalle cambia todo el tratamiento, porque la guardería no es la mascota: es su recorrido por la casa y los lugares donde se echa. Eclosionan en dos a cinco días. Las larvas son ciegas, sin patas, como gusanitos de hasta tres dieciseisavos de pulgada, y se mueven con cerdas. Huyen de la luz y bajan — a la fibra de la alfombra, las grietas del piso, las uniones de la madera, la parte de abajo de los cojines y la tela de la cama de la mascota. No pican a nadie: comen basurita orgánica y, sobre todo, la sangre seca del excremento de las pulgas adultas, así que la tierrita que cae del pelo del animal importa como comida y no solo como evidencia. Tardan de ocho a quince días y necesitan por lo menos setenta y cinco por ciento de humedad relativa a setenta a noventa grados Fahrenheit. UC IPM precisa que casi no se encuentran en zonas muy pisadas ni al sol directo: quien trata el centro de una sala iluminada aplica producto donde no están los insectos.',
        'La larva teje un capullo de seda y le pega basurita, lo que lo camufla y lo protege de lo que se aplica en la superficie. Adentro termina y se detiene: UC IPM registra adultos ya formados que esperan en el capullo hasta doce meses con temperaturas frescas. La salida la dispara algo — el calor, la presión de alguien caminando sobre la alfombra, una aspiradora, la vibración de un animal que se acerca, según UC IPM, Missouri y Purdue. Ya afuera, la hembra de la pulga del gato se queda en el animal, a diferencia de casi todas las demás pulgas, y vive ahí unos treinta a cuarenta días; a temperatura de casa, el ciclo completo corre en unos dieciocho días.',
      ],
    },
    {
      h2: 'Por qué aparecen pulgas en una casa vacía',
      parrafos: [
        'Es la situación más malinterpretada de todo el tema, y con la etapa de pupa entendida deja de ser un misterio. Una propiedad se queda vacía — se cierra una venta, cambia un inquilino, o una casa de verano en Birch Bay se cierra desde octubre —, y quienes vivían ahí tenían un animal, así que la alfombra guarda una generación de capullos. Sin nadie adentro no hay calor, ni pisadas, ni dióxido de carbono, así que nada sale: la población solo espera. Luego llega gente, y a los uno o dos días de la primera tarde caminando por la casa aparecen pulgas en cantidad, y los nuevos concluyen que la casa estaba infestada y que se lo ocultaron. En cierto sentido lo estaba, y en el sentido que importa nadie podía verlo: los capullos están camuflados y metidos en la fibra, y los insectos de adentro no hacían nada hasta que el edificio les avisó que llegó un huésped. El mismo mecanismo da la versión chica: una familia vuelve de dos semanas fuera y entra a pulgas que no estaban cuando se fue. Nada de esto dice algo de la casa, los inquilinos anteriores ni la limpieza: dice que en algún momento de los meses anteriores hubo un animal.',
      ],
    },
    {
      h2: 'Confirmar que es pulga, y cuándo no nos necesita',
      parrafos: [
        'Dos cosas se reportan como pulgas aquí seguido. Los colémbolos son diminutos, blanditos y saltan; aparecen donde hay humedad — el baño, la tierra de una maceta, la orilla de la regadera —, no pican y se deshacen al apretarlos, mientras una pulga, plana de lado y acorazada, no. Las larvas de escarabajo de alfombra irritan la piel de algunas personas con sus cerdas, pero no brincan. La prueba que lo resuelve es la tierrita de pulga: peine al animal sobre una hoja blanca, o pase una toalla de papel húmeda donde duerme; puntitos oscuros que se corren color óxido al mojarse son sangre seca y diagnósticos, y lo que sigue gris es tierra.',
        'Un perro vuelve de un fin de semana con otros animales y se le peinan dos o tres pulgas; tiene preventivo del veterinario, no aparece nada en el piso y nadie tiene piquetes. Eso es una introducción que no se estableció, y la respuesta es el peine, lavar la cama caliente, aspirar y dos semanas de atención, no un tratamiento. Lo vuelve trabajo la evidencia fuera del animal: tierrita de pulga donde se echa, piquetes en la gente, o adultas que siguen apareciendo tres semanas después de tratar a la mascota.',
      ],
    },
    {
      h2: 'Cuando no hay mascota, y lo que va en el animal',
      parrafos: [
        'Un problema de pulgas en una casa sin animal no es de verdad un problema de pulgas: es un problema de animal con pulgas pegadas, y tratar la alfombra sin resolver la fuente compra unas cuantas semanas buenas. Entre los huéspedes que Purdue enlista están mapaches, tlacuaches y coyotes, y en este condado el patrón se repite: algo hace su madriguera en el espacio bajo el piso, bajo una terraza, detrás del faldón de un porche o en un hueco de pared o el ático, cría ahí en primavera y verano, y las pulgas se reproducen en el material del nido. Luego el animal se va, lo sacan o se muere, y una generación de adultas sale a un nido sin huésped y se mueve hacia lo tibio más cercano, que está arriba y adentro. La señal es el tiempo y el lugar: piquetes que empiezan de golpe, se concentran en una parte de la casa y siguen a un periodo de ruido arriba o bajo el piso, a veces después de un trabajo de roedores que por lo demás salió bien. Si el animal es un roedor, eso es control de roedores y luego cerrar la entrada; si es un mapache, un tlacuache u otra fauna silvestre, es trabajo de un especialista y no nuestro, y se lo decimos por teléfono en lugar de después de manejar hasta allá. De cualquier forma el orden es el mismo: el animal, luego cerrar, luego tratar. Si no tiene mascota, dígalo primero cuando llame: es la frase más útil que tiene.',
        'No tratamos animales ni le vamos a decir qué ponerle a uno. Los productos para mascotas se dosifican por peso y tienen restricciones duras por especie — varios compuestos de rutina en un perro dañan seriamente a un gato —, y quien puede pesar eso es un veterinario con el animal enfrente. El manual del noroeste dice que el éxito depende de tratar al mismo tiempo a las mascotas y el lugar. Un animal tratado en una casa sin tratar se reinfesta desde la alfombra, y una casa tratada con el animal sin tratar se vuelve a sembrar cada día; agende las dos cosas con pocos días de diferencia y dígale a cada uno lo que hace el otro.',
      ],
    },
    {
      h2: 'La mitad de la familia, y cómo se trata el lugar',
      parrafos: [
        'Aspire diario por lo menos dos semanas después del tratamiento: saca huevos, larvas y la sangre seca que comen, y la vibración hace salir a las pupas del capullo en un momento malo para ellas — una adulta que sale a una alfombra tratada se atiende, y una que espera tres semanas en su capullo acorazado no. Vacíe el depósito o saque la bolsa cada vez y llévela directo afuera. Aspire donde están los insectos y no donde está la tierra: junto a los zoclos, bajo los muebles, en las costuras de los tapizados y sobre todo donde el animal duerme y se echa; el piso abierto de un cuarto con sol casi no tiene larvas. Lave la cama de la mascota con agua caliente y séquela con calor, y cuente como cama de mascota cualquier cosa suave donde se echa, incluido cierto sillón. Despeje el piso antes del tratamiento — juguetes, zapatos, ropa y lo de debajo de las camas — para que lo aplicado llegue al nivel de las larvas, levante los platos de comida y agua, y tape las peceras y apague sus bombas. El programa de aspirado no es un consejo de limpieza pegado al tratamiento: es una pieza del tratamiento con un trabajo concreto.',
        'Primero se confirma el insecto y se encuentra al huésped — si es fauna silvestre, va primero y lo demás espera —, y luego se trabajan los focos donde crecen las larvas: donde descansa el animal, la línea de la pared, bajo los muebles y los tapizados. Junto al adulticida va un regulador de crecimiento, que impide que huevos y larvas lleguen a adultas; matar el cinco por ciento visible sin tocar el noventa y cinco da dos semanas limpias y luego se repite. Afuera se tratan los lugares sombreados y protegidos — bajo una terraza, bajo los arbustos donde se echa un perro, donde un animal hizo madriguera —, no el pasto abierto, que no sostiene larvas. El seguimiento se programa contra la salida de las pupas, y ver actividad entre visitas es esa generación llegando a tiempo. Las bombas y los nebulizadores no llegan a la fibra ni a las pupas, y los aparatos ultrasónicos no hacen nada.',
      ],
    },
    {
      h2: 'Lo que les hacen a la gente y a los animales, y el año aquí',
      parrafos: [
        'Para casi toda la gente, los piquetes de pulga son comezón y marquitas rojas en los tobillos, y Purdue anota que varios en hilera son de una sola pulga comiendo varias veces. En los animales pesa más: la dermatitis alérgica por pulgas es una reacción a la saliva, no al número, y eso es del veterinario. El riesgo de enfermedad aquí es bajo y concreto: el CDC asocia a la pulga del gato con el tifo murino, casi todo en California, Texas y Hawái, y con la enfermedad por arañazo de gato, que pasa por el arañazo y no por el piquete; y las pulgas llevan la tenia Dipylidium caninum, que se contrae al tragar una, con más riesgo para los niños chicos. La peste en Estados Unidos corre por pulgas de ardillas de tierra y ratas en el oeste rural, no por esta especie.',
        'El clima de aquí estira la temporada por los dos lados. Las llamadas más fuertes van de agosto a octubre, cuando la fauna se acerca a las casas antes de las lluvias, y por eso los casos de otoño son en proporción los de un animal bajo el piso. El invierno no reinicia nada adentro, porque una casa con calefacción guarda la humedad y el calor que necesitan las larvas, y la primavera es la temporada de las casas vacías. Antes de llamar, díganos si hay un animal en la casa, si lo trató un veterinario y si algo ha vivido bajo el piso o en el techo: esas tres respuestas deciden la forma de la visita.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Mi perro tiene pulgas. ¿Por qué se llama pulga del gato?',
      a: 'Porque el nombre registra en qué animal se describió primero, no cuál prefiere. UC IPM llama a Ctenocephalides felis el parásito externo más común de gatos y perros domésticos por igual, y una pulga sacada de un perro aquí casi seguro es esta especie.',
    },
    {
      q: '¿Por qué aparecieron pulgas una semana después de mudarnos a una casa vacía?',
      a: 'Las pupas los esperaron. UC IPM registra pulgas ya formadas que se quedan en el capullo hasta doce meses con temperaturas frescas, y las hace salir el calor y la presión: pasos sobre la alfombra, una aspiradora. Volver a ocupar una casa vacía da las dos cosas a la vez.',
    },
    {
      q: '¿Qué le pongo a mi perro o a mi gato?',
      a: 'Eso es pregunta para su veterinario y no la vamos a contestar. La dosis va por peso y por especie, varios productos seguros en un perro son peligrosos para un gato, y la decisión es de alguien que revisó al animal. Lo nuestro es el edificio.',
    },
    {
      q: 'No tenemos mascotas. ¿De dónde vienen las pulgas?',
      a: 'Algo de sangre caliente ha vivido en la estructura o debajo de ella. Purdue enlista mapaches, tlacuaches y coyotes entre los huéspedes de la pulga del gato, y un espacio bajo el piso, el hueco de una terraza o una pared donde vivió uno deja pulgas cuando el animal se va o se muere.',
    },
  ],
};
