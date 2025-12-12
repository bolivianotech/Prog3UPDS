// ------------ VARIABLES ------------
const board = document.getElementById("gameBoard");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");

let icons = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍑", "🍍"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lock = false;

let moves = 0;
let score = 0;
let time = 0;
let timer = null;

// ------------ INICIALIZAR JUEGO ------------
function startGame() {
  // Reiniciar variables
  moves = 0;
  score = 0;
  time = 0;
  firstCard = null;
  secondCard = null;
  lock = false;

  movesEl.textContent = moves;
  scoreEl.textContent = score;
  timerEl.textContent = "00:00";

  clearInterval(timer);
  startTimer();

  // Duplicar iconos y mezclarlos
  cards = [...icons, ...icons];
  shuffle(cards);

  // Renderizar tablero
  board.innerHTML = "";
  cards.forEach((icon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.textContent = "";

    board.appendChild(card);
  });
}

// ------------ SHUFFLE ------------
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ------------ TEMPORIZADOR ------------
function startTimer() {
  timer = setInterval(() => {
    time++;
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    timerEl.textContent = `${min}:${sec}`;
  }, 1000);
}

// ------------ MANEJAR CLICK EN CARTA ------------
board.addEventListener("click", (e) => {
  const card = e.target;

  if (!card.classList.contains("card")) return;
  if (lock) return;
  if (card.classList.contains("revealed")) return;

  revealCard(card);

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
});

// ------------ REVELAR CARTA ------------
function revealCard(card) {
  card.classList.add("revealed");
  card.textContent = card.dataset.icon;
}

// ------------ OCULTAR CARTA ------------
function hideCard(card) {
  card.classList.remove("revealed");
  card.textContent = "";
}

// ------------ VERIFICAR PAREJA ------------
function checkMatch() {
  lock = true;
  moves++;
  movesEl.textContent = moves;

  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    score += 10;
    scoreEl.textContent = score;

    resetSelection();
    checkWin();
  } else {
    setTimeout(() => {
      hideCard(firstCard);
      hideCard(secondCard);
      resetSelection();
    }, 900);
  }
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

// ------------ VERIFICAR SI GANÓ ------------
function checkWin() {
  const matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length === cards.length) {
    clearInterval(timer);
    alert(`🎉 ¡Ganaste!  
Movimientos: ${moves}  
Tiempo: ${timerEl.textContent}  
Puntuación: ${score}`);
  }
}

// ------------ REINICIAR ------------
resetBtn.addEventListener("click", startGame);

// Inicio automático
startGame();
