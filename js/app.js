
const deck = document.querySelector('.deck');
const cards = deck.children;
const rating = document.querySelector('.score__stars');
const stars = rating.children;
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

// Timer (from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript)
setInterval(setTime, 1000);

function setTime () {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad (val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// shuffle deck (Fisher-Yates shuffle from https://www.frankmitchell.org/2015/01/fisher-yates/)

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

// Get current game time

function getTime () {
  let minutes = minutesLabel.innerText;
  let seconds = secondsLabel.innerText;

  return `${minutes}:${seconds}`
}

// Keep score

function starRating () {
  moveCount += 1;

  switch (moveCount) {
    case 17:
      stars[0].removeChild(stars[0].firstChild);
      starCount--
      break;
    case 14:
      stars[1].removeChild(stars[1].firstChild);
      starCount--
      break;
    case 11:
      stars[2].removeChild(stars[2].firstChild);
      starCount--
  }
}

// Show selected card

function showCard(card) {
  card.classList.add('deck__card--open', 'deck__card--show');
}

// Display correct match

function correctMatch (card1, card2) {
  card1.classList.add('deck__card--match');
  card2.classList.add('deck__card--show', 'deck__card--match');
  clicked = false;
  // Check for win
  score += 1;
  if (score > 7) { 
    starRating()
    let time = getTime();
    alert(`Congratulations! You won! With ${moveCount} moves and ${starCount} stars. It took you ${time}. Woooooo!`);
  }
}

// Display incorrect match

function incorrectMatch (card1, card2) {
  card1.classList.add('deck__card--fail');
  card1.classList.remove('deck__card--open');
  card2.classList.add('deck__card--show', 'deck__card--fail');
  // Add delay
  setTimeout(function reset () {
    card1.classList.remove('deck__card--fail', 'deck__card--show');
    card2.classList.remove('deck__card--fail', 'deck__card--show');}, 500)
    clicked = false;
}

// Check for match

function cardMatch (evt) {
   if (evt.target.nodeName === 'LI' && clicked === true && evt.target.classList.contains('deck__card--match') === false && evt.target.classList.contains('deck__card--show') === false) {
     secondCard = evt.target;
     secondCardClass = secondCard.children[0].classList[1];
     if (firstCardClass === secondCardClass) {
       correctMatch(firstCard, secondCard);
     } else {
       incorrectMatch(firstCard, secondCard);
     }
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

deck.addEventListener('click', cardMatch);