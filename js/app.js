
const deck = document.querySelector('.deck');
const cards = deck.children;
const rating = document.querySelector('.score__stars');
const stars = rating.children;
let star;
let starText = 'stars';
const moves = document.querySelector('.score__moves');
const modal = document.querySelector('.modal-body');
const timer = document.querySelector('.score__timer');
const reset = document.querySelector('.score__restart');
const playAgain = document.querySelector('.play-again');
let newCards = [];
let starCount = 3;
let score = 0;
let clicks = 0;
let moveCount = 0;
let attempts;
let clicked;
let matchCount = 0;
let firstCard;
let firstCardClass
let secondCard;
let secondCardClass
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

/*
 * Timer (reference: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript)
 */

const setTime = () => {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

const pad = val => {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

/*
 * shuffle (reference: Fisher-Yates shuffle from https://www.frankmitchell.org/2015/01/fisher-yates/)
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
  let minutes = minutesLabel.innerText;
  let seconds = secondsLabel.innerText;

  return `${minutes}:${seconds}`
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

  // Reset time 
  totalSeconds = 0;

  // Reset stars

  for (let val of stars) {
    val.removeChild(val.firstChild);
  }

  for (let val of stars) {
    val.innerHTML = '<i class="far fa-star"></i>';
  }

  starCount = 3;

  // Reset score

  score = 0;

  // Hide modal

  $('#myModal').modal('hide')

  // Reset clicks

  clicked = false;

}

/*
 * Keep score
 */

const starRating = () => {
  moveCount += 1;
  moves.innerText = moveCount;

  switch (moveCount) {
    case 20:
      star = stars[2].firstElementChild;
      star.remove();
      stars[2].innerHTML = '<i class="far fa-star"></i>'
      starCount--
      break;
    case 25:
      star = stars[1].firstElementChild;
      star.remove();
      stars[1].innerHTML = '<i class="far fa-star"></i>'
      starCount--
      break;
    case 30:
      star = stars[0].firstElementChild;
      star.remove();
      stars[0].innerHTML = '<i class="far fa-star"></i>'
      starCount--
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
  score += 1;
  if (score > 7) { 
    let time = getTime();
    if (starCount === 1) {
      starText = 'star';
    }
    modal.innerHTML = `<p><strong>With ${starCount} ${starText} in ${time}.</strong></p><p>Way to go!</p>`;
    $('#myModal').modal('show')
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

setInterval(setTime, 1000);
shuffleCards();
deck.addEventListener('click', cardMatch);
reset.addEventListener('click', resetGame);
playAgain.addEventListener('click', resetGame);