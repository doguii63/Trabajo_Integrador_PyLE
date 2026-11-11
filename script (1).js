// Trabajo Integrador PyLE - Matías Martínez y Facundo Guido
// Ventana 4: cartas para repasar + multiple choice

// ---------- NAVEGACIÓN ----------
const navBoton = document.getElementById('navBoton');
const navLinks = document.getElementById('navLinks');
navBoton.addEventListener('click', () => navLinks.classList.toggle('abierto'));

document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('abierto'))
);

// marca el enlace activo según la sección visible
const secciones = document.querySelectorAll('.ventana');
const enlaces = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      enlaces.forEach(a => a.classList.remove('activo'));
      const enlace = document.querySelector('.nav-links a[href="#' + e.target.id + '"]');
      if (enlace) enlace.classList.add('activo');
    }
  });
}, { threshold: 0.4 });
secciones.forEach(s => observer.observe(s));

// ---------- TABS ----------
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('activo'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('activo'));
    tab.classList.add('activo');
    document.getElementById(tab.dataset.tab).classList.add('activo');
  });
});

// ---------- CARTAS ----------
// Definiciones con el contenido de la Unidad 5 (Saforcada y Ximenes / Gluz y Kesler)
const cartas = [
  {
    termino: 'Derecho individual',
    definicion: 'Concepción en la que el derecho se reconoce jurídicamente a todas las personas (igualdad formal) y se expresa como igualdad de oportunidades. El Estado solo propicia que existan oportunidades, por vía propia o de la iniciativa privada. (Saforcada y Ximenes)'
  },
  {
    termino: 'Derecho social',
    definicion: 'Igualdad en el acceso a una educación de calidad a lo largo de la vida. No alcanza con el reconocimiento jurídico: importa su realización efectiva. El Estado, como ámbito de lo común, lo garantiza mediante la educación pública. (Saforcada y Ximenes)'
  },
  {
    termino: 'Juridificación reactiva',
    definicion: 'Fenómeno en el que los sectores conservadores reinscriben normas y derechos (libertad de enseñanza, primacía de la familia) para reaccionar contra las conquistas del derecho social. Consecuencia: el derecho a la educación pasa a ser disputado «desde dentro». (Saforcada y Ximenes, a partir de Vaggione)'
  },
  {
    termino: 'Disputa «desde dentro»',
    definicion: 'El derecho universal a la escolaridad enfrenta ahora la idea de un «derecho educativo natural» de los padres y tutores (educación en el hogar, «con mis hijos no te metas») y el cuestionamiento a la labor docente. (Saforcada y Ximenes)'
  },
  {
    termino: 'Ciclos de expansión y retracción',
    definicion: 'Estado de Bienestar: expansión del derecho social. Dictaduras y años 90: concepción individual, privatización. Siglo XXI: nueva expansión (leyes, obligatoriedad, financiamiento). Restauración conservadora actual: retracción y mercantilización. (Saforcada y Ximenes)'
  },
  {
    termino: 'Chile como caso de interés',
    definicion: 'La Constitución de 1980 no consagró el derecho social a la educación: lo suplantó por la «libertad de enseñanza». Eso fue central para la privatización y mercantilización del sistema chileno. (Saforcada y Ximenes)'
  },
  {
    termino: 'Individuación',
    definicion: 'Dinámicas de larga data que cristalizaron reglas y modos de intervención pública que vehiculizaron representaciones estigmatizantes sobre los sectores más vulnerados y erosionaron lo común. Cada estudiante termina respondiendo solo por su resultado: competencia, autoevaluación, educación emocional. (Gluz y Kesler)'
  },
  {
    termino: 'La CABA como «semillero»',
    definicion: 'Desde 2007 la Ciudad de Buenos Aires se reorganiza con lógica de Nueva Gestión Pública y presencia empresarial, convirtiéndose en laboratorio de las políticas que después se expanden al resto del país. (Gluz y Kesler)'
  },
  {
    termino: 'Financiamiento selectivo y competitivo',
    definicion: 'El Plan de Mejora Institucional pasó a dar recursos solo a unas pocas instituciones seleccionadas (Proyectos de Aprendizaje Integrado, Secundaria Federal 2030), con «fondos rotatorios»: asignación por etapas sujeta a rendición de cuentas; quien no rinde pierde los desembolsos. (Gluz y Kesler)'
  },
  {
    termino: 'Vouchers Educativos (2024)',
    definicion: 'Financiamiento a familias con hijos en escuelas privadas con subvención mayor al 75% y de bajos ingresos. Se pagan con fondos que antes destinaban a programas socioeducativos estatales: un «impacto simbólico» que naturaliza la salida de la escuela pública. (Gluz y Kesler)'
  }
];

let indiceCarta = 0;
const carta = document.getElementById('carta');
const cartaInner = document.getElementById('cartaInner');
const cartaTermino = document.getElementById('cartaTermino');
const cartaDefinicion = document.getElementById('cartaDefinicion');
const cartaContador = document.getElementById('cartaContador');

function mostrarCarta() {
  const c = cartas[indiceCarta];
  carta.classList.remove('volteada');
  cartaTermino.textContent = c.termino;
  cartaDefinicion.textContent = c.definicion;
  cartaContador.textContent = (indiceCarta + 1) + ' / ' + cartas.length;
}

carta.addEventListener('click', () => carta.classList.toggle('volteada'));
document.getElementById('cartaSig').addEventListener('click', () => {
  indiceCarta = (indiceCarta + 1) % cartas.length; mostrarCarta();
});
document.getElementById('cartaAnt').addEventListener('click', () => {
  indiceCarta = (indiceCarta - 1 + cartas.length) % cartas.length; mostrarCarta();
});
document.getElementById('cartaMezclar').addEventListener('click', () => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  indiceCarta = 0; mostrarCarta();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('ventana4').classList.contains('activo')) return;
  if (e.key === 'ArrowRight') document.getElementById('cartaSig').click();
  if (e.key === 'ArrowLeft') document.getElementById('cartaAnt').click();
});
mostrarCarta();

// ---------- QUIZ ----------
const preguntas = [
  {
    pregunta: 'Según Saforcada y Ximenes, ¿cómo se expresa la concepción del derecho individual a la educación?',
    opciones: [
      'Como igualdad de oportunidades',
      'Como igualdad en el acceso a una educación de calidad a lo largo de la vida',
      'Como derecho a la educación emocional'
    ],
    correcta: 0,
    explica: 'El derecho individual supone igualdad formal (reconocimiento jurídico para todos) y se expresa como igualdad de oportunidades.'
  },
  {
    pregunta: '¿Qué significa que el derecho a la educación se dispute «desde dentro»?',
    opciones: [
      'Que las provincias discuten el financiamiento con Nación',
      'Que se enfrenta el derecho universal a la escolaridad con un supuesto «derecho educativo natural» de los padres',
      'Que los docentes discuten el currículo dentro de la escuela'
    ],
    correcta: 1,
    explica: 'Es la idea de un «derecho educativo natural» de madres y padres (educación en el hogar, «con mis hijos no te metas») frente al derecho universal. Las desigualdades se renaturalizan y se persigue la labor docente.'
  },
  {
    pregunta: 'En el ciclo de expansión y retracción, ¿qué caracteriza a los años 90?',
    opciones: [
      'Expansión del derecho social con Estados proactivos',
      'Nuevos temas como interculturalidad y diversidad sexual',
      'Concepción individual y de oportunidad, con privatización y nuevo rol del Estado'
    ],
    correcta: 2,
    explica: 'Las dictaduras y los años 90 corresponden a la concepción individual: privatización y nuevo rol del Estado. La expansión corresponde al Estado de Bienestar y al Siglo XXI.'
  },
  {
    pregunta: 'Para Gluz y Kesler, ¿qué implica la «individuación» en las políticas educativas?',
    opciones: [
      'Competencia, autoevaluación y educación emocional: cada estudiante responde por su resultado',
      'La atención personalizada a cada estudiante por parte del Estado',
      'La creación de aulas individuales con tutores'
    ],
    correcta: 0,
    explica: 'La individuación erosiona lo común: cada estudiante termina respondiendo individualmente por su resultado, mientras se naturalizan las desigualdades.'
  },
  {
    pregunta: '¿Qué pasó con el Plan Conectar Igualdad?',
    opciones: [
      'Se amplió a todo el nivel secundario',
      'Fue reemplazado por Aprender Conectados, orientado a aulas digitales móviles y laboratorios de robótica',
      'Se convirtió en un programa de vouchers para netbooks'
    ],
    correcta: 1,
    explica: 'La asignación universal de netbooks y formación docente fue reemplazada por un programa orientado a equipamiento móvil y robótica, con propuestas que estimularon la competencia entre escuelas.'
  },
  {
    pregunta: '¿Qué son los «fondos rotatorios»?',
    opciones: [
      'Un fondo nacional para docentes investigadores',
      'Asignación de recursos por etapas y sujeta a rendición de cuentas: quien no rinde pierde los desembolsos',
      'Un crédito rotativo para que las escuelas compren equipamiento'
    ],
    correcta: 1,
    explica: 'Convenios por metas y rendición de cuentas. En contexto de ajuste, implica más desfinanciación y fragmentación.'
  },
  {
    pregunta: '¿A quiénes financia el programa de Vouchers Educativos (2024)?',
    opciones: [
      'A todas las familias del país sin distinción',
      'Solo a los docentes de escuelas de gestión privada',
      'A familias con hijos en escuelas privadas con subvención mayor al 75% cuyos ingresos no superen 7 salarios mínimos'
    ],
    correcta: 2,
    explica: 'Y se pagan con fondos antes destinados a programas socioeducativos estatales: de ahí el «impacto simbólico» que señalan Gluz y Kesler.'
  },
  {
    pregunta: '¿Por qué Chile es un caso de interés para Saforcada y Ximenes?',
    opciones: [
      'Porque su Constitución de 1980 no consagró el derecho social a la educación y lo suplantó por la «libertad de enseñanza»',
      'Porque fue el primer país de la región en aprobar una ley de financiamiento educativo',
      'Porque nacionalizó todas sus escuelas privadas en 1990'
    ],
    correcta: 0,
    explica: 'Esa ausencia del derecho social en la Constitución fue un elemento central para la privatización y mercantilización del sistema chileno.'
  }
];

const quizZona = document.getElementById('quizZona');
const quizResultado = document.getElementById('quizResultado');
const quizReiniciar = document.getElementById('quizReiniciar');
let puntaje = 0;
let respondidas = 0;

function armarQuiz() {
  puntaje = 0;
  respondidas = 0;
  quizResultado.classList.add('oculto');
  quizReiniciar.classList.add('oculto');
  quizZona.innerHTML = '';
  preguntas.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-pregunta';
    const h4 = document.createElement('h4');
    h4.textContent = (i + 1) + '. ' + p.pregunta;
    div.appendChild(h4);
    p.opciones.forEach((texto, j) => {
      const btn = document.createElement('button');
      btn.className = 'opcion';
      btn.textContent = texto;
      btn.addEventListener('click', () => {
        const botones = div.querySelectorAll('.opcion');
        botones.forEach(b => b.disabled = true);
        if (j === p.correcta) {
          btn.classList.add('correcta');
          puntaje++;
        } else {
          btn.classList.add('incorrecta');
          botones[p.correcta].classList.add('correcta');
        }
        const exp = document.createElement('p');
        exp.className = 'quiz-explica';
        exp.textContent = p.explica;
        div.appendChild(exp);
        respondidas++;
        if (respondidas === preguntas.length) mostrarResultado();
      });
      div.appendChild(btn);
    });
    quizZona.appendChild(div);
  });
}

function mostrarResultado() {
  let mensaje;
  if (puntaje === preguntas.length) mensaje = '¡Perfecto! 🏆 Ya podés explicar la unidad vos mismo.';
  else if (puntaje >= preguntas.length * 0.7) mensaje = '¡Muy bien! Repasá las cartas y quedás listo. 💪';
  else mensaje = 'Para la exposición hay que repasar: volvé a las cartas de arriba. 📚';
  quizResultado.textContent = 'Puntaje: ' + puntaje + ' / ' + preguntas.length + ' — ' + mensaje;
  quizResultado.classList.remove('oculto');
  quizReiniciar.classList.remove('oculto');
}

quizReiniciar.addEventListener('click', armarQuiz);
armarQuiz();
