const questions = [
  { letter: 'A', question: 'Objeto que sirve para dar aire.', answer: 'abanico', status: 0 },
  { letter: 'B', question: 'Ave nocturna que tiene grandes ojos y puede girar la cabeza casi completamente', answer: 'buho', status: 0 },
  { letter: 'C', question: 'Recipiente con tapa que sirve para guardar o transportar objetos.', answer: 'caja', status: 0 },
  { letter: 'D', question: 'Animal prehistórico que vivió hace millones de años y que hoy solo conocemos por sus fósiles.', answer: 'dinosaurio', status: 0 },
  { letter: 'E', question: 'Subir a gran altura trepando, por ejemplo, por una montaña.', answer: 'escalar', status: 0 },
  { letter: 'F', question: 'Imagen que se captura con una cámara para guardar un momento.', answer: 'fotografia', status: 0 },
  { letter: 'G', question: 'Ciencia que estudia la Tierra, sus paisajes, países y habitantes.', answer: 'geografia', status: 0 },
  { letter: 'H', question: 'Persona valiente que realiza actos importantes para ayudar a otros.', answer: 'heroe', status: 0 },
  { letter: 'I', question: 'Estación del año cuando hace frío y los días son más cortos.', answer: 'invierno', status: 0 },
  { letter: 'J', question: 'El planeta más grande del sistema solar.', answer: 'jupiter', status: 0 },
  { letter: 'K', question: 'Arte marcial japonés que usa golpes y patadas para defenderse.', answer: 'karate', status: 0 },
  { letter: 'L', question: 'Lugar con caminos que se cruzan y donde es fácil perderse.', answer: 'laberinto', status: 0 },
  { letter: 'M', question: 'Arte que usa sonidos organizados para expresar emociones.', answer: 'musica', status: 0 },
  { letter: 'N', question: 'Agua congelada que cae de las nubes.', answer: 'nieve', status: 0 },
  { letter: 'Ñ', question: 'Lugar donde vivimos', answer: 'españa', status: 0 },
  { letter: 'O', question: 'Gran extensión de agua salada que cubre la mayor parte de la Tierra.', answer: 'oceano', status: 0 },
  { letter: 'P', question: 'Arte de crear imágenes usando colores sobre una superficie.', answer: 'pintura', status: 0 },
  { letter: 'Q', question: 'Ciencia que estudia las sustancias y cómo cambian', answer: 'quimica', status: 0 },
  { letter: 'R', question: 'Máquina que puede hacer tareas de forma automática.', answer: 'robot', status: 0 },
  { letter: 'S', question: 'Estrella que da luz y calor a nuestro planeta.', answer: 'sol', status: 0 },
  { letter: 'T', question: 'Uso de conocimientos científicos para crear herramientas y máquinas.', answer: 'tecnologia', status: 0 },
  { letter: 'U', question: 'Todo lo que existe, incluyendo planetas, estrellas y galaxias.', answer: 'universo', status: 0 },
  { letter: 'W', question: 'Tecnología que permite conectar dispositivos a internet sin cables.', answer: 'wifi', status: 0 },
  { letter: 'X', question: 'Instrumento musical formado por listones de madera o metal que suenan cuando los golpeas.', answer: 'xilofono', status: 0 },
  { letter: 'Y', question: 'Práctica que combina ejercicios físicos, respiración y meditación.', answer: 'yoga', status: 0 },
  { letter: 'Z', question: 'Animal parecido a un perro, de pelaje rojizo y muy astuto.', answer: 'zorro', status: 0 },
  // Puedes seguir agregando hasta la Z
];

let current = 0, correct = 0, wrong = 0;
let timeLeft = 600;
let timerInterval;

function createRosco() {
  const rosco = document.getElementById('rosco');
  const total = questions.length;
  const radius = 45;

  questions.forEach((q, i) => {
    const angle = (2 * Math.PI / total)  * i - Math.PI / 2;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    const div = document.createElement('div');
    div.className = 'letter';
    div.id = 'letter-' + i;
    div.style.left = `${x}%`;
    div.style.top = `${y}%`;
    div.textContent = q.letter;
    rosco.appendChild(div);
  });
}

function updateUI() {
  const q = questions[current];
  document.getElementById('letter-box').textContent = q.letter;
  document.getElementById('question').textContent = q.question;
  document.getElementById('answer').value = '';
  document.getElementById('correct').textContent = correct;
  document.getElementById('wrong').textContent = wrong;
}

function markLetter(index, status) {
  const el = document.getElementById('letter-' + index);
  el.style.background = status === 1 ? 'green' : 'red';
}

function checkAnswer() {
  const q = questions[current];
  const input = document.getElementById('answer').value.trim().toLowerCase();
  if (input === q.answer.toLowerCase()) {
    q.status = 1;
    correct++;
    markLetter(current, 1);
  } else {
    q.status = -1;
    wrong++;
    markLetter(current, -1);
  }
  nextQuestion();
}

function pass() {
  nextQuestion();
}

function nextQuestion() {
  for (let i = 1; i <= questions.length; i++) {
    const idx = (current + i) % questions.length;
    if (questions[idx].status === 0) {
      current = idx;
      updateUI();
      return;
    }
  }
  clearInterval(timerInterval);
  endGame();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `⏱️ ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  const unanswered = questions.filter(q => q.status === 0).length;
  document.querySelector('.center-box').innerHTML = `
    <h2>⏰ Tiempo terminado</h2>
    <p>✅ Aciertos: ${correct}</p>
    <p>❌ Fallos: ${wrong}</p>
    <p>⚪ Sin responder: ${unanswered}</p>
    <button onclick="location.reload()">🔁 Jugar otra vez</button>
  `;
}

// Iniciar todo
createRosco();
updateUI();
startTimer();
