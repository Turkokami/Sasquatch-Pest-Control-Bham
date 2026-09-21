import type { EsServicio } from './tipos';

/**
 * Monitoreo remoto de roedores, en español. Fuente:
 * src/content/services/remote-rodent-monitoring.md, la versión en inglés. No es
 * una traducción línea por línea, pero ningún dato aparece aquí que no esté
 * allá, y no se le agrega al equipo ninguna función que el inglés no nombre.
 *
 * Es un complemento de un programa comercial y no un servicio aparte; la página
 * lo dice igual que el inglés. Se conserva la única cita del inglés (la EPA,
 * en la misma afirmación). El enlace del inglés al sitio del fabricante no se
 * repite: el producto se nombra sin enlace. Los enlaces internos del cierre
 * tampoco se repiten, porque el riel "Otros servicios" ya lleva a las dos
 * páginas en español.
 */
export const monitoreoRemotoDeRoedores: EsServicio = {
  slug: 'monitoreo-remoto-de-roedores',
  enPath: '/services/remote-rodent-monitoring/',
  nav: 'Monitoreo remoto',
  h1: 'Monitoreo Remoto de Roedores para Cuentas Comerciales',
  title: 'Monitoreo Remoto de Roedores para Negocios en Whatcom',
  description:
    'Sensores en trampas y estaciones de cebo de negocios en Whatcom: conteo y hora de cada interacción, tendencias y un aviso que nos manda a un técnico.',
  answer:
    'El monitoreo remoto le pone un sensor a las trampas y estaciones que su programa ya tiene. Cada interacción queda contada y con hora, las tendencias entran a sus reportes de servicio, y cuando una trampa se dispara nos llega el aviso, así que mandamos a un técnico a atenderla sin esperar a la siguiente visita programada.',
  secciones: [
    {
      h2: 'Qué es',
      parrafos: [
        'El monitoreo remoto es un sensor que se instala en los dispositivos para roedores de un programa comercial. Las estaciones y las trampas se quedan justo donde las puso el técnico; lo que cambia es el sensor, y lo que el sensor cambia es qué tan rápido alguien se entera de que un dispositivo hizo algo.',
        'El equipo es Skyhawk TrapMate. Una unidad chica se sujeta a una trampa de golpe o a la tapa de una estación de cebo a prueba de manipulación, y reporta la actividad de ese dispositivo. En un sitio con docenas de dispositivos repartidos entre un edificio y su patio, eso convierte un recorrido mensual en un registro continuo. La estación a prueba de manipulación, por cierto, no es un gusto nuestro: las [restricciones de la EPA para los productos rodenticidas](https://www.epa.gov/rodenticides/restrictions-rodenticide-products) son la razón por la que el cebo va dentro de un bloque protegido y asegurado y no suelto, y un sensor en la tapa deja ese arreglo exactamente como estaba.',
        'Va en los dispositivos que ya tiene. Esto conviene saberlo antes de que alguien le cotice: los sensores de Skyhawk se montan en trampas y estaciones existentes, sin exigir modelos propios de la marca, así que adoptar el monitoreo no significa cambiar el equipo de su sitio.',
        'Tres formas de detectar, para tres tipos de dispositivo. Skyhawk ofrece un sensor de vibración que lee el movimiento de una trampa al dispararse, un interruptor magnético de lengüeta que lee cuando se mueve el brazo de una trampa o una puerta, y un sensor infrarrojo pasivo que lee el calor del cuerpo de un animal dentro de una trampa de captura múltiple. Cuál va en cada dispositivo depende del dispositivo: una trampa de golpe, una estación y una caja de captura múltiple reportan cada una a su manera.',
        'El concentrador se comunica por la red celular. Los sensores le reportan a un concentrador, y el concentrador reporta hacia afuera por la red celular y no por su Wi-Fi, así que no pide contraseña, ni un puerto abierto, ni una plática con su departamento de sistemas. Skyhawk indica un alcance de más de 500 pies entre el concentrador y los sensores, y una duración de cinco años o más con un juego de dos pilas AA en el sensor infrarrojo. Las pilas se cambian; nada va cableado.',
      ],
    },
    {
      h2: 'Qué obtiene usted',
      parrafos: [
        'Conteo de interacciones: cuántas veces registró actividad cada dispositivo, uno por uno, en lugar de una impresión general de cómo va el sitio.',
        'La hora de cada interacción. Una estación del andén que reporta a las tres de la mañana y una trampa del comedor del personal que reporta a media jornada son dos problemas distintos con dos soluciones distintas, y lo que los separa es el reloj.',
        'Registros de tendencia en sus reportes de servicio. El conteo de una visita es una medida; el mismo conteo a lo largo de ocho semanas ya es información. Los datos de tendencia son lo que demuestra que un programa funciona, y también lo que muestra que está llegando una presión nueva antes de que alguien vea un animal.',
        'Un aviso cuando una trampa se dispara, y ese aviso nos llega a nosotros. Esa es la parte que cambia la respuesta. Cuando un dispositivo se activa nos enteramos, y se programa a un técnico para ir a atenderlo en lugar de que la trampa se quede así hasta la siguiente visita de rutina. En una cuenta donde una trampa disparada que sigue en su lugar ya cuenta como hallazgo, esa espera es justo lo que el sensor elimina.',
      ],
    },
    {
      h2: 'Por qué el aviso nos llega a nosotros y no a usted',
      parrafos: [
        'Es una decisión tomada a propósito y conviene explicarla, porque casi toda la industria lo vende al revés.',
        'Un aviso solo le sirve a quien puede hacer algo con él. Una notificación a las 2 de la mañana de que la estación 14 registró actividad no le sirve de nada a un encargado de instalaciones que no puede entrar al edificio y que tampoco atendería el dispositivo aunque pudiera. Esa misma notificación, enviada a nosotros, se convierte en un técnico.',
        'Si su operación quiere además los datos directos — algunos gerentes de calidad los piden, sobre todo cuando el expediente de plagas forma parte de una auditoría —, díganoslo y lo configuramos. Lo normal es la opción que termina con el dispositivo atendido de verdad.',
      ],
    },
    {
      h2: 'Dónde rinde más',
      parrafos: [
        'El monitoreo remoto vale más donde dejar un dispositivo sin atender sale caro, o donde el sitio es demasiado grande para leerlo caminándolo.',
        'Procesamiento de alimentos y almacenes refrigerados: filas largas de estaciones por fuera, dispositivos interiores en áreas de acceso restringido, y una auditoría que pregunta qué pasó en cada uno.',
        'Restaurantes y servicio de comida: pocos dispositivos, pero una trampa disparada detrás de la línea en pleno servicio no es algo que alguien vaya a notar antes de la siguiente visita.',
        'Bodegas y centros de distribución: puertas de andén abiertas todo el día, un perímetro más largo que el edificio, y tantos dispositivos que ordenarlos por actividad es la única forma de decidir por dónde empezar.',
        'Multifamiliares y administración de propiedades: estructuras compartidas donde la pregunta siempre es qué unidad o qué tramo está usando de verdad la población.',
        'Cualquier cuenta con un programa documentado. Si su expediente de plagas lo lee un inspector, un arrendador o el auditor de un cliente, el historial por dispositivo contesta preguntas que una firma en un ticket de servicio no contesta.',
      ],
    },
    {
      h2: 'Lo que un sensor no hace',
      parrafos: [
        'Esto importa más que la lista de funciones, y preferimos decirlo aquí a que usted lo descubra después.',
        'Un sensor reporta que algo pasó en un dispositivo. No identifica qué lo activó. No sabe si usted tiene ratas noruegas que llegan desde un cinturón verde o ratones caseros criando dentro del hueco de una pared, y esos son trabajos opuestos. No encuentra la rendija debajo de la rampa niveladora del andén por donde entraron, y sellar esa rendija sigue siendo el trabajo que termina el problema en lugar de nada más administrarlo.',
        'Tampoco arregla un programa mal planteado. Los dispositivos puestos en lugares equivocados reportan desde lugares equivocados, nada más que más rápido. El valor de los datos depende del recorrido que decidió dónde iban los dispositivos, y por eso esto es un complemento de un programa y no un producto que se vende por separado.',
      ],
    },
    {
      h2: 'Cómo se agrega a una cuenta',
      parrafos: [
        'En el recorrido. Vemos lo que tiene ahora, dónde están los dispositivos y dónde puede ir el concentrador para que el extremo más lejano del sitio todavía lo alcance. Skyhawk pone el alcance entre concentrador y sensor arriba de los 500 pies, que es generoso y aun así es una distancia que un edificio largo, la cerca de un patio o un sótano de concreto se pueden comer, así que es mejor resolverlo caminando que suponiéndolo.',
        'En el alcance por escrito. Qué dispositivos llevan sensor y qué le agrega el monitoreo al programa queda escrito en el mismo alcance que el resto del trabajo, con el número de dispositivos anotado.',
        'En el servicio. Los dispositivos se siguen atendiendo según el calendario. Los avisos deciden cuáles visitamos entre los días programados, y los reportes se integran al registro que su expediente ya lleva.',
        'En la revisión. El registro de tendencias es la parte que vale la pena leer juntos. Después de dos o tres servicios, por lo general empieza a decir algo del edificio que nadie había notado.',
      ],
    },
    {
      h2: 'En el condado',
      parrafos: [
        'Casi todo este trabajo está en los corredores comerciales: las zonas industriales y la costa de Bellingham, la Guide Meridian, el corredor de comercio y distribución de Burlington y Mount Vernon, y las cuentas agrícolas de la zona de Lynden y Everson, donde el problema es el patio y el edificio viene después. En las lecherías y en las operaciones de moras en particular, el historial por dispositivo es lo que convierte "tenemos roedores" en un mapa de dónde están trabajando.',
      ],
    },
    {
      h2: 'Cómo agregarlo a su programa',
      parrafos: [
        'Si ya es cuenta comercial, es una plática y una cotización. Si no lo es, el monitoreo no es por donde se empieza: primero va el programa, porque los sensores en dispositivos mal colocados producen información rápida, precisa e inútil. Preferimos recorrer el sitio, dejar bien puestos los dispositivos y agregar el monitoreo a algo que ya funciona.',
        'Para empezar, llámenos o mándenos un texto con el botón de abajo y pida un recorrido comercial. Nuestra página de control de plagas comercial explica cómo se arman y se documentan los programas, y la de control de roedores cubre el trabajo de exclusión que termina un problema de roedores en lugar de nada más medirlo.',
      ],
    },
  ],
  tabla: [
    { label: 'Qué cubre', value: 'Sensores en las trampas y estaciones de cebo para roedores de un programa comercial que ya existe' },
    { label: 'Incluye', value: 'Conteo y hora de las interacciones por dispositivo, registros de tendencia en sus reportes de servicio, y un técnico enviado cuando se dispara una trampa' },
    { label: 'No incluye', value: 'Cuentas residenciales, ni identificar la especie o encontrar la entrada, que siguen haciendo las visitas de servicio' },
    { label: 'Lo que necesita su sitio', value: 'Nada de Wi-Fi, electricidad ni trabajo de sistemas; el concentrador reporta por red celular y los sensores funcionan con pilas' },
    { label: 'Cuánto cuesta', value: 'Se cotiza por sitio como complemento, según cuántos dispositivos tiene y cómo están colocados' },
  ],

  faqs: [
    {
      q: '¿Está disponible para una cuenta residencial?',
      a: 'No. Es un complemento de un programa comercial, porque lo que produce — conteos de interacciones, horas y registros de tendencia de muchos dispositivos — es lo que necesita un negocio auditado o inspeccionado, y no lo que necesita una casa.',
    },
    {
      q: '¿Me llegan los avisos al teléfono?',
      a: 'El aviso nos llega a nosotros, no a usted. Cuando un dispositivo reporta, lo vemos y programamos a un técnico para que vaya a atenderlo. Lo que usted recibe es la respuesta y el registro, en lugar de un teléfono que suena a las dos de la mañana por una trampa en una bodega a la que no puede entrar.',
    },
    {
      q: '¿Qué trae exactamente el reporte?',
      a: 'Cuántas interacciones registró cada dispositivo, a qué hora pasaron, y cómo se mueve ese patrón con el tiempo. Esto último es lo útil: un dispositivo que pasa de dos interacciones a la semana a nueve dice algo que una sola visita no puede decir.',
    },
    {
      q: '¿Esto reemplaza las visitas de servicio?',
      a: 'No, y quien lo venda así lo está exagerando. Un sensor avisa que algo pasó en un dispositivo. No identifica la especie, no encuentra la entrada y no le dice por qué está ahí la población. Las visitas siguen; los sensores deciden adónde van primero y cuándo hace falta una de más.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Se cotiza por sitio como complemento, porque depende de cuántos dispositivos tiene y de cómo están colocados. Va en el mismo alcance por escrito que el resto del programa, y ningún dispositivo se suma a su conteo sin estar en ese alcance.',
    },
    {
      q: '¿Los sensores necesitan algo de nosotros, como Wi-Fi, electricidad o una plática con sistemas?',
      a: 'Ninguna de las tres. El concentrador reporta por la red celular y no por su Wi-Fi, todo funciona con pilas que se cambian en lugar de ir cableado, y los sensores se montan en las trampas y estaciones que ya tiene. Lo que sí necesitamos es un lugar donde el concentrador quede al alcance de los dispositivos más lejanos, y eso se resuelve en el recorrido.',
    },
  ],
};
