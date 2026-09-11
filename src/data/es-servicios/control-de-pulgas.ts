import type { EsServicio } from './tipos';

/**
 * Pulgas, en español. Fuente: src/content/services/flea-control.md. Escrita
 * dentro de la banda de Keystone v2 para un servicio.
 *
 * Igual que en inglés, la página dice que NO tratamos a la mascota: eso es
 * del veterinario, y hay productos seguros para perros que dañan gravemente
 * a los gatos. No se nombra ningún producto para mascotas.
 */
export const controlDePulgas: EsServicio = {
  slug: 'control-de-pulgas',
  enPath: '/services/flea-control/',
  nav: 'Pulgas',
  h1: 'Control de Pulgas en Bellingham y el Condado de Whatcom',
  title: 'Control de Pulgas en Bellingham, WA',
  description:
    'Control de pulgas en Bellingham y el condado de Whatcom: tratamiento, aspiradora, seguimiento y la mascota tratada por su veterinario. Llame al 360-410-2199.',
  answer:
    'Las pulgas no se quitan por una sola razón: la pupa está protegida y espera. El tratamiento mata adultas y larvas, y una o dos semanas después salen las pupas y parece que nada funcionó. El trabajo es tratamiento, aspiradora a fondo, una visita de seguimiento y la mascota tratada por su veterinario: las cuatro, o regresan.',
  secciones: [
    {
      h2: '¿Por qué la pupa lo explica todo?',
      parrafos: [
        'Casi todas las historias frustrantes de pulgas se reducen a un detalle de biología. La pulga pasa por huevo, larva, pupa y adulto. Las adultas que usted ve son una fracción chica de lo que hay en la casa: casi toda la población son huevos y larvas entre las fibras de la alfombra, las grietas del piso, la cama de la mascota y los muebles tapizados.',
        'El problema es la pupa. Teje un capullo pegajoso que junta polvo y basura, lo que la camufla y — sobre todo — la hace resistente a casi todo lo que se puede aplicar. Adentro, una adulta ya formada puede esperar semanas hasta que algo le avise que llegó un huésped: el calor, el dióxido de carbono y la vibración.',
        'Así que en casi todos los trabajos pasa lo mismo. Tratamos. Mueren adultas y larvas. Una semana la casa parece limpia. Luego empiezan a salir las pupas que sobrevivieron, y la familia concluye que el tratamiento falló. No falló: esa salida es el siguiente acto esperado, y por eso la visita de seguimiento es parte del plan desde el principio y no un rescate. Una empresa que trata una vez y le dice que ya terminó, o no sabe esto o no se lo está diciendo.',
      ],
    },
    {
      h2: '¿De verdad ayuda tanto la aspiradora?',
      parrafos: [
        'Es la parte que usted puede hacer y que de verdad cambia el resultado. La aspiradora saca físicamente huevos, larvas y los restos de sangre seca de los que se alimentan las larvas. Pero lo más útil es que la vibración hace que las pupas salgan antes: una adulta que sale a un ambiente tratado se atiende; una que espera tres semanas más en su capullo, no.',
        'La indicación: aspire todos los días durante por lo menos dos semanas después del tratamiento, concentrándose donde descansa la mascota, a lo largo de los zoclos, debajo de los muebles y en las costuras de lo tapizado — no en el centro del piso, donde las pulgas no se desarrollan. Vacíe el depósito o saque la bolsa después de cada vez y llévela afuera de la casa. Lave la cama de la mascota en agua caliente y séquela en caliente; el que hace el trabajo es la secadora.',
      ],
    },
    {
      h2: '¿Qué pulga es?',
      parrafos: [
        'La pulga del gato, prácticamente siempre. A pesar del nombre, es la especie que se encuentra en perros, gatos y fauna silvestre por igual en esta región, y es con la que trabajamos en casi todos los trabajos residenciales. La pulga del perro y la pulga humana existen y son tan raras aquí que si alguien le dice que eso es lo que tiene, vale la pena una segunda opinión.',
        'Lo que se confunde con pulga son los colémbolos — diminutos, saltan y están ligados a la humedad, en baños y alrededor de las macetas — y las larvas del escarabajo de alfombra, que causan una irritación de piel que se lee como picadura. Los dos son comunes y ninguno necesita tratamiento de pulgas.',
      ],
    },
    {
      h2: '¿De dónde vienen si no tengo mascota?',
      parrafos: [
        'La mascota es la ruta obvia: se le suben afuera, las adultas se alimentan y ponen huevos, y los huevos se caen donde el animal pasa el tiempo. Los huevos no se pegan; caen en la alfombra, la cama y las grietas del piso. La mascota es el transporte y la casa es la guardería.',
        'La fauna es la que se le pasa a la gente. Un problema de pulgas en una casa sin mascotas casi siempre es un problema de un animal en la estructura: mapaches o zarigüeyas en una madriguera debajo de la terraza o en el espacio bajo el piso, roedores en una pared o en el ático, o un gato callejero que usa el espacio debajo del porche. Cuando el animal se va — o se muere —, sus pulgas necesitan otro huésped y se meten a la casa. Eso no es en realidad un trabajo de pulgas: es sacar al animal, con un tratamiento de pulgas agregado — control de roedores si es un roedor, y un especialista en fauna si no. Tratar la alfombra mientras el animal sigue debajo del piso garantiza que regresen.',
        'La casa vacía es el otro caso clásico. Al comprar o rentar una casa que estuvo vacía, las pupas esperaron, y el calor, el dióxido de carbono y los pasos de la gente que se muda disparan una salida masiva en días. Se siente como si la casa estuviera infestada y escondida; lo que pasó es que una población dormida recibió la señal que estaba esperando. No dice nada de la casa: quiere decir que los anteriores tenían mascota.',
      ],
    },
    {
      h2: '¿Tratan también a la mascota?',
      parrafos: [
        'No, y nadie en control de plagas debería. Tratamos estructuras, no animales. Los productos para mascotas son asunto del veterinario: los ingredientes, la dosis por peso, las restricciones por especie y las interacciones son decisión suya, no de una empresa de plagas. No es precaución por precaución: varios productos seguros para perros dañan gravemente a los gatos, y los tratamientos de tienda mal aplicados causan emergencias veterinarias de verdad cada año.',
        'Lo práctico es que tienen que pasar las dos mitades. Tratar la casa con la mascota sin tratar quiere decir que la mascota vuelve a sembrar la casa sin parar; tratar la mascota con la casa sin tratar quiere decir que la mascota se vuelve a infestar de la alfombra. Así que el orden honesto es: hable con su veterinario, agéndenos, y trate de que el tratamiento de la mascota y el de la casa queden a pocos días uno del otro. Las pulgas además pueden pasarle solitaria a la mascota, que es otra razón por la que el lado veterinario importa.',
      ],
    },
    {
      h2: '¿Cómo trabajamos un trabajo de pulgas?',
      parrafos: [
        'Confirmamos que son pulgas, porque los colémbolos y las larvas de escarabajo de alfombra son las falsas alarmas comunes y ninguno responde a este tratamiento. Buscamos la fuente: si no hay mascota, buscamos un animal — espacio bajo el piso, ático, debajo de la terraza, una pared —, porque eso cambia el trabajo y es la primera pregunta, no la última. Ubicamos las zonas: donde descansa la mascota, los zoclos, debajo de los muebles y las costuras de lo tapizado, porque el tratamiento se concentra donde vive el ciclo.',
        'Tratamos con un producto que incluye un regulador de crecimiento, para que los huevos y las larvas que queden no lleguen a adultas. Le damos por escrito la preparación y el plan de aspiradora. Y regresamos a dar seguimiento en el momento en que salen las pupas, que ya está agendado desde el principio. Cuente con unas semanas para que se calme del todo: menos pulgas cada semana es el tratamiento funcionando, y ver algunas después de tratar es normal.',
      ],
    },
    {
      h2: '¿Cuánto cuesta?',
      parrafos: [
        'Se cotiza después de la visita. Una casa con una mascota y pulgas encontradas a tiempo es un trabajo sencillo de dos visitas. Una casa sin mascota, donde la fuente es un animal debajo del piso, es un trabajo de sacar al animal y cerrar la entrada, con el tratamiento de pulgas como la parte chica. La estimación no se cobra.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Tratamos y a las dos semanas había por todos lados. ¿Por qué?',
      a: 'Por la pupa. Está envuelta en un capullo pegajoso que casi ningún tratamiento penetra, y puede esperar semanas a un huésped. Las adultas que salen después del tratamiento no son una falla: son la siguiente etapa llegando a tiempo, y por eso el seguimiento es parte del plan.',
    },
    {
      q: 'No tengo mascotas. ¿Cómo tengo pulgas?',
      a: 'Casi siempre por fauna. Mapaches, zarigüeyas o roedores en el espacio bajo el piso, debajo de la terraza o en el ático traen pulgas, y cuando el animal se va o se muere, las pulgas se meten a buscar huésped. Una casa sin mascota con pulgas casi siempre tiene un animal en alguna parte de la estructura.',
    },
    {
      q: 'Acabamos de mudarnos y la casa está llena de pulgas. ¿Por qué?',
      a: 'Es el caso clásico. Las pupas de una casa vacía esperan a un huésped, y el calor, el dióxido de carbono y la vibración de la gente que se muda disparan una salida masiva. No dice nada de la casa: quiere decir que los anteriores tenían mascota.',
    },
    {
      q: '¿Son peligrosas las picaduras?',
      a: 'Para casi todos dan comezón y molestan más que hacer daño, sobre todo en los tobillos y la parte baja de las piernas. Algunas personas y muchas mascotas reaccionan fuerte, y una picadura rascada se puede infectar.',
    },
  ],
};
