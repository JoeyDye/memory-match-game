
const deck = document.querySelector('.deck');
const cards = deck.children;
const rating = document.querySelector('.score__stars');
const stars = rating.children;
const moves = document.querySelector('.score__moves');
const modal = document.querySelector('.modal-body');
const timer = document.querySelector('#timer');
const reset = document.querySelector('.score__restart');
const playAgain = document.querySelector('.play-again');
let win = false;
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

/** @description Start game timer */

const startTimer = () => {
  timerVar = setInterval(countTimer, 1000);
}

/** @description Create a count up timer and add time to div called timer */

const countTimer = () => {
  ++totalSeconds;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds - (minutes * 60);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  time = timer.innerHTML = `${minutes}:${seconds}`;
}

/** @description Stop game timer */

const stopTimer = () => {
  clearInterval(timerVar);
}

/**
 * @description Shuffle an array of items
 * Reference: Fisher-Yates shuffle from https://www.frankmitchell.org/2015/01/fisher-yates/)
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

/** @description Shuffle the deck */


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

/** @description Retrieve current game time */

const getTime = () => {
  let finishTime = timer.innerText;
  return finishTime;
}

/** @description Reset game */

const resetGame = () => {

  /** Reshuffle deck */

  newCards = [];

  shuffleCards();

  /** Flip cards face down */

  for (let value of cards) {
    value.classList.remove('deck__card--open', 'deck__card--show', 'deck__card--match');
  }

  /** Set move count back to 0 */

  moveCount = 0;
  moves.innerText = moveCount;

  /** Stop game timer */

  stopTimer();
  isTimerOn = false;
  timer.innerHTML = `00:00`;

  /** Set star total back to 3 */

  for (let val of stars) {
    val.removeChild(val.firstChild);
  }

  for (let val of stars) {
    val.innerHTML = '<i class="fas fa-star"></i>';
  }

  starCount = 3;

  /** Set score back to 0 */

  score = 0;

  /** Hide success modal */

  $('#success-modal').modal('hide');

  /** Set click value back to false */

  clicked = false;

}

/**
 * @description Keep track of game moves and reduce star count based on specified number of moves.
 * Switch provides a simple solution for evaluating the star count and makes it easy to change star rating conditions based on player feedback
 */

const starRating = () => {
  moveCount++;
  moves.innerText = moveCount;

  switch (moveCount) {
    case 15:
      star = stars[2].firstElementChild;
      star.remove();
      stars[2].innerHTML = '<i class="far fa-star"></i>';
      starCount--;
      break;
    case 20:
      star = stars[1].firstElementChild;
      star.remove();
      stars[1].innerHTML = '<i class="far fa-star"></i>'
      starCount--;
  }
}

/** @description Add open and show card modifier classes to clicked cards to enable flip animation and reveal  card value */

const showCard = (card) => {
  card.classList.add('deck__card--open', 'deck__card--show');
}

/** @description Add match and show card modifier classes to clicked cards, letting player know they have successfully matched a pair of cards. */

const correctMatch = (card1, card2) => {
  card1.classList.add('deck__card--match');
  card2.classList.add('deck__card--show', 'deck__card--match');
  clicked = false;

  /** Check to see if the player has matched all cards in the deck. If true, display a modal with player stats and option to play again. */

  score++;
  if (score > 7) {
    win = true;
    stopTimer();
    time = getTime();
    modal.innerHTML = `<p><strong>Time:</strong> ${time}</p><p><strong>Stars:</strong> ${starCount}</p><p><strong>Moves:</strong> ${moveCount}</p>`;
    $('#success-modal').modal('show');
  }
}

/** @description Add fail card modifier class to clicked cards, letting player know the selected cards to not match */

const incorrectMatch = (card1, card2)  => {
  card1.classList.add('deck__card--fail');
  card1.classList.remove('deck__card--open');
  card2.classList.add('deck__card--show', 'deck__card--fail');

  /** Remove fail and show card modifier classes after 0.5 seconds */

  setTimeout( () => {
    card1.classList.remove('deck__card--fail', 'deck__card--show');
    card2.classList.remove('deck__card--fail', 'deck__card--show');}, 500)
    clicked = false;
}

/** @description Start timer. For first selected card, call showCard function to flip card and reveal card value. Once second card selected, test to see if cards are a correct match. Update star rating and moves after every match test. */

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
    if (win === false) {
      starRating();
    }
  } else {
    if (evt.target.nodeName === 'LI' && evt.target.classList.contains('deck__card--match') === false) {
      firstCard = evt.target;
      firstCardClass = firstCard.children[0].classList[1];
      showCard(firstCard);
      clicked = true;
    }
   }
 }

/** Shuffle deck and add event listeners to deck, reset icon, and play again button on load */

shuffleCards();
deck.addEventListener('click', cardMatch);
reset.addEventListener('click', resetGame);
playAgain.addEventListener('click', resetGame);