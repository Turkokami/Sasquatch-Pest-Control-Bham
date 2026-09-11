import type { EsServicio } from './tipos';

/**
 * Plan de protección del hogar todo el año, en español. Fuente: la versión en
 * inglés en src/content/services/home-protection-plan.md. Escrita dentro de la
 * banda de Keystone v2 para un servicio.
 *
 * La lista de lo que el plan NO cubre dice "fauna silvestre" y no menciona
 * aves: el inglés sí las nombra, y el trabajo con aves está abierto en
 * GUARDRAILS.md §8.
 */
export const planDeProteccionDelHogar: EsServicio = {
  slug: 'plan-de-proteccion-del-hogar',
  enPath: '/services/home-protection-plan/',
  nav: 'Plan anual',
  h1: 'Plan de Protección del Hogar Todo el Año en el Condado de Whatcom',
  title: 'Plan de Control de Plagas Todo el Año en Whatcom, WA',
  description:
    'Plan de control de plagas recurrente para casas del condado de Whatcom, con visitas según el calendario local y sin contrato largo. Llame al 360-410-2199.',
  answer:
    'Un plan recurrente tiene sentido cuando la presión de plagas sobre su propiedad es continua y no un solo evento. Las visitas van con lo que de verdad pasa aquí mes con mes, no con trimestres parejos. No hay contrato largo, y si un tratamiento de una sola vez resuelve su problema, se lo vamos a decir.',
  secciones: [
    {
      h2: '¿Para quién es de verdad un plan?',
      parrafos: [
        'Casi todo este sitio argumenta contra comprar tratamientos que no hacen falta, así que sería raro poner una página de plan recurrente que finja que todos lo necesitan. Esta es la versión honesta.',
        'Tiene sentido cuando la presión es continua. Una casa en el borde del bosque en Sudden Valley, una propiedad que da a un cinturón verde en Whatcom Falls, una dirección rodeada de campo afuera de Lynden: ahí hay poblaciones empujando contra el edificio todo el tiempo, desde terreno que usted no controla. Nada que le haga a la estructura cambia lo que pasa afuera de ella, y manejar eso es trabajo continuo por naturaleza.',
        'Tiene sentido cuando hay historial: una casa que ya tuvo roedores dos veces, o hormiga carpintera varias primaveras seguidas, ya demostró algo de su terreno que no va a cambiar solo. Tiene sentido en rentas y segundas casas, donde no hay nadie para notar las primeras señales y las visitas programadas sustituyen la atención que un dueño que vive ahí da gratis. Y tiene sentido cuando usted simplemente no quiere pensar en eso, que es una razón legítima para comprar un servicio.',
      ],
    },
    {
      h2: '¿Para quién no es?',
      parrafos: [
        'Para un problema identificable con una causa que se arregla: un nido de avispa debajo de un alero, una rendija en el cimiento por donde entran roedores, hormigas que siguen una sola fuente de humedad. Se arregla la causa, se trata una vez y se acabó. Vender un año de visitas para un problema que resuelve una tarde es la práctica que le dio a este oficio su fama.',
        'Para una casa nueva bien sellada y sin historial: una casa en Cordata o Barkley con el revestimiento sano, mallas en las rejillas y ningún antecedente no está comprando mucho. Y para una situación donde el dinero debería ir a la exclusión, que es el caso más común: si tiene un problema de roedores y un presupuesto limitado, cierre las rendijas. La exclusión se compra una vez y sigue funcionando; un plan hay que seguirlo pagando. Lo ordenamos así aunque la cifra recurrente sea mejor negocio para nosotros. Si nos llama y alguno de estos es su caso, eso le vamos a decir.',
      ],
    },
    {
      h2: '¿Qué hace el plan?',
      parrafos: [
        'Tratamiento del perímetro exterior donde importa — cimiento, entradas, aleros y los escondites alrededor de la estructura —, no regado sobre las superficies para que se vea que se hizo algo. Retiro de telarañas y nidos: quitar a mano telaraña, sacos de huevos y nidos iniciales de avispa de los aleros, las entradas y las áreas de estar de afuera. Es poco vistoso y es lo más efectivo de casi cada visita.',
        'Tratamiento interior solo donde se justifica: casi todo el trabajo va afuera, y adentro tratamos cuando hay un problema activo, no por rutina. Monitoreo y reporte: qué encontramos, qué hicimos y qué está cambiando en la propiedad, porque una actividad que sube en un área es información que conviene atender antes de que se vuelva una llamada.',
        'Revisión de entradas: cada visita es una oportunidad de notar una rendija nueva — una malla que falló, una penetración que dejó un contratista, un revestimiento que se ablandó. Eso va en el reporte, y si es chico lo atendemos ahí mismo. Y visitas de regreso cubiertas: entre visitas programadas, si algo cubierto regresa, volvemos sin cargo adicional bajo nuestra Garantía de Servicio 100 %.',
      ],
    },
    {
      h2: '¿Qué no cubre?',
      parrafos: [
        'Claro, porque un plan que dice cubrirlo todo no es un documento de verdad. Las chinches de cama van aparte: una visita de verificación con costo que se descuenta del tratamiento, y luego precio por cuarto. La exclusión estructural — sellar rejillas, penetraciones y las rendijas que de verdad usa un animal — se cotiza por trabajo, porque el alcance depende por completo del edificio.',
        'La fauna silvestre, incluidos murciélagos y ardillas, no es un servicio que ofrezcamos; si es lo que tiene, se lo decimos y le damos el nombre de alguien que sí lo hace. El tratamiento de plagas de la madera, termitas y escarabajos, es otro alcance, porque implica diagnosticar la humedad y muchas veces a otros oficios. El trabajo de espacio bajo el piso y de aislamiento es de proyecto, no de plan. Y la reparación estructural no es nuestra.',
        'Nada de eso es vender por omisión. Son trabajos distintos de verdad, y meterlos en una cuota mensual subiría el plan para todos o nos obligaría a hacerlos mal.',
      ],
    },
    {
      h2: '¿Cómo se reparten las visitas en el año?',
      parrafos: [
        'Casi todos los planes de este oficio van por trimestres parejos porque los trimestres son fáciles de facturar. El calendario de plagas del condado de Whatcom no es parejo, y el calendario de visitas debe seguir a las plagas y no a la facturación.',
        'De finales del invierno a la primavera las reinas de avispa que pasaron el invierno fundan sus nidos y la hormiga carpintera se activa: tumbar los nidos iniciales ahora evita el problema de septiembre y casi no tiene riesgo, y el trabajo de hormigas temprano llega antes de que la colonia crezca. De finales de la primavera a principios del verano es la ventana productiva para arañas y trabajo de perímetro, justo cuando menos le preocupa a la gente y por eso se salta. A finales del verano llega el pico de avispas y avispones, cuando pasan casi todas las picaduras.',
        'Principios del otoño es la visita crítica: cuando el suelo se satura a finales de septiembre y en octubre, los roedores se meten, empujados por el agua más que por el frío, y esta visita es la que evita un invierno con roedores — y la razón de que el calendario no sea parejo. A mitad del otoño llegan los insectos que buscan dónde pasar el invierno, amontonados en las paredes que dan al sur. Y el invierno, callado afuera, es el momento de la conversación estructural: qué está haciendo el espacio bajo el piso, dónde están las rendijas y qué conviene sellar antes de la primavera.',
      ],
    },
    {
      h2: '¿Cómo se relaciona con la garantía, y hay contrato?',
      parrafos: [
        'El plan y la garantía son el mismo compromiso dicho de dos maneras. Mientras el plan está activo, si una plaga cubierta regresa entre visitas programadas, volvemos sin cargo adicional, sin límite de visitas de regreso dentro del periodo y sin discusión de si fue demasiado pronto. Hay dos condiciones y están en la página de la garantía, no escondidas: la visita de regreso necesita acceso razonable a las áreas tratadas, y donde identificamos una causa de su lado — una canaleta, una malla, una barredora de puerta — la garantía no sustituye a arreglarla.',
        'La cobertura se pausa en una cuenta con pago atrasado y se reanuda cuando se pone al corriente. Si cancela a mitad del plan, la cobertura sigue hasta el final del periodo que ya pagó. Y no hay contrato largo: el acuerdo de servicio dice el calendario, el alcance y un aviso previo corto para cancelar. El contrato de largo plazo es lo normal en este oficio y su función real es retener clientes; preferimos ganarnos la siguiente visita.',
      ],
    },
  ],
  faqs: [
    {
      q: '¿De verdad necesito un plan recurrente?',
      a: 'Muchas veces no. Si tiene un problema identificable con una causa que se arregla — un nido de avispa, una rendija por donde entran roedores, hormigas que siguen una fuente de humedad —, una visita y la reparación son mejor compra. El plan se gana su lugar donde la presión de afuera es continua.',
    },
    {
      q: '¿Cada cuánto vienen?',
      a: 'En visitas programadas durante el año, según el calendario local de plagas y no en trimestres parejos, porque los meses útiles aquí no están repartidos igual. Entre visitas, las visitas de regreso por algo cubierto van incluidas sin costo adicional.',
    },
    {
      q: '¿Qué pasa si algo aparece entre visitas?',
      a: 'Nos llama y vamos. Las visitas de regreso por plagas cubiertas van incluidas, sin límite y sin discusión de si fue demasiado pronto. Es el beneficio práctico principal de estar en un plan en lugar de llamar cada vez.',
    },
    {
      q: '¿Primero la exclusión o el plan?',
      a: 'La exclusión, casi siempre. Sellar las entradas baja lo que el plan tiene que manejar, y a veces lo baja tanto que el plan ya no vale la pena. Lo ordenamos así aunque sea la cifra recurrente más chica para nosotros.',
    },
  ],
};
