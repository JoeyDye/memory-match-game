
const deck = document.querySelector('.deck');
const cards = deck.children;
const rating = document.querySelector('.score__stars');
const stars = rating.children;
const moves = document.querySelector('.score__moves');
const modal = document.querySelector('.modal-body');
const timer = document.querySelector('#score__timer');
const reset = document.querySelector('.score__restart');
const playAgain = document.querySelector('.play-again');
let time;
let isTimerOn = false;
let timerVar;
let totalSeconds = 0;
let star;
let starCount = 3;
let score = 0;
let moveCount = 0;
let clicked;
let newCards = [];
let firstCard;
let firstCardClass
let secondCard;
let secondCardClass

/*
 * Timer
 */

const startTimer = () => {
  timerVar = setInterval(countTimer, 1000); // Start timer
}

const countTimer = () => {
  ++totalSeconds;
  let minutes = Math.floor(totalSeconds / 60); // Count minutes
  let seconds = totalSeconds - (minutes * 60); // Count seconds

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  time = timer.innerHTML = `${minutes}:${seconds}`; // Put results in div called timer
}

const stopTimer = () => {
  clearInterval(timerVar); // Stop timer
}

/*
 * Shuffle (reference: Fisher-Yates shuffle from https://www.frankmitchell.org/2015/01/fisher-yates/)
 */

const shuffle = array => {
  let i = 0;
  let j = 0;
  let temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/*
 * Shuffle cards
 */

const shuffleCards = () => {
  for (let val of cards) {
    let card = val.innerHTML;
    newCards.push(card);
  }

  shuffle(newCards);

  for (let i = 0; i < 16; i++) {
    cards[i].innerHTML = newCards[i];
  }
}

/*
 * Get current game time
 */

const getTime = () => {
  let finishTime = timer.innerText;
  return finishTime;
}

/*
 * Reset game
 */

const resetGame = () => {

  // Shuffle cards

  newCards = [];

  shuffleCards();

  // Reset cards

  for (let value of cards) {
    value.classList.remove('deck__card--open', 'deck__card--show', 'deck__card--match');
  }

  // Reset moves

  moveCount = 0;
  moves.innerText = moveCount;

  // Reset timer

  stopTimer();
  isTimerOn = false;
  timer.innerHTML = `00:00`;

  // Reset stars

  for (let val of stars) {
    val.removeChild(val.firstChild);
  }

  for (let val of stars) {
    val.innerHTML = '<i class="fas fa-star"></i>';
  }

  starCount = 3;

  // Reset score

  score = 0;

  // Hide modal

  $('#my-modal').modal('hide');

  // Reset clicks

  clicked = false;

}

/*
 * Keep score
 */

const starRating = () => {
  moveCount++;
  moves.innerText = moveCount;

  switch (moveCount) {
    case 20:
      star = stars[2].firstElementChild;
      star.remove();
      stars[2].innerHTML = '<i class="far fa-star"></i>';
      starCount--;
      break;
    case 25:
      star = stars[1].firstElementChild;
      star.remove();
      stars[1].innerHTML = '<i class="far fa-star"></i>'
      starCount--;
      break;
    case 30:
      star = stars[0].firstElementChild;
      star.remove();
      stars[0].innerHTML = '<i class="far fa-star"></i>';
      starCount--;
  }
}

/*
 * Show selected card
 */

const showCard = (card) => {
  card.classList.add('deck__card--open', 'deck__card--show');
}

/*
 * Display correct match
 */

const correctMatch = (card1, card2) => {
  card1.classList.add('deck__card--match');
  card2.classList.add('deck__card--show', 'deck__card--match');
  clicked = false;

  // Check for win

  score++;
  if (score > 7) {
    stopTimer();
    time = getTime();
    modal.innerHTML = `<p><strong>Time:</strong> ${time}</p><p><strong>Stars:</strong> ${starCount}</p><p><strong>Moves:</strong> ${moveCount}</p>`;
    $('#my-modal').modal('show');
    // alert(``);
  }
}

/*
 * Display incorrect match
 */

const incorrectMatch = (card1, card2)  => {
  card1.classList.add('deck__card--fail');
  card1.classList.remove('deck__card--open');
  card2.classList.add('deck__card--show', 'deck__card--fail');

  // Add delay

  setTimeout( () => {
    card1.classList.remove('deck__card--fail', 'deck__card--show');
    card2.classList.remove('deck__card--fail', 'deck__card--show');}, 500)
    clicked = false;
}

/*
 * Check for match
 */

const cardMatch = evt => {
  if (!isTimerOn) {
    totalSeconds = 0;
    startTimer();
    isTimerOn = true;
  }

  if (evt.target.nodeName === 'LI' && clicked === true && evt.target.classList.contains('deck__card--match') === false && evt.target.classList.contains('deck__card--show') === false) {
    secondCard = evt.target;
    secondCardClass = secondCard.children[0].classList[1];
    firstCardClass === secondCardClass ? correctMatch(firstCard, secondCard) : incorrectMatch(firstCard, secondCard);
    starRating();
  } else {
    if (evt.target.nodeName === 'LI') {
      firstCard = evt.target;
      firstCardClass = firstCard.children[0].classList[1];
      showCard(firstCard);
      clicked = true;
    }
   }
 }

shuffleCards();
deck.addEventListener('click', cardMatch);
reset.addEventListener('click', resetGame);
playAgain.addEventListener('click', resetGame);