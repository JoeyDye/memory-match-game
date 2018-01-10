
const deck = document.querySelector('.deck');
const cards = deck.children;
const rating = document.querySelector('.score__stars');
const stars = rating.children;
let clicks = 0;
let attempts;
let clicked;
let matchCount = 0;
let firstCard;
let firstCardClass
let secondCard;
let secondCardClass

// Keep score

function score () {
  clicks += 1;

  switch (clicks) {
    case 34:
      stars[0].remove();
      break;
    case 28:
      stars[1].remove();
      break;
    case 22:
      stars[2].remove();
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
    alert('You win!');
  }
}

// Display incorrect match

function incorrectMatch (card1, card2) {
  card1.classList.add('deck__card--fail');
  card1.classList.remove('deck__card--open');
  card2.classList.add('deck__card--show', 'deck__card--fail');
  setTimeout(function reset () {
    card1.classList.remove('deck__card--fail', 'deck__card--show');
    card2.classList.remove('deck__card--fail', 'deck__card--show');}, 500)
    clicked = false;
}

// Check for match

function cardMatch (evt) {
  if (evt.target.classList.contains('deck__card--match')) {
    return
  }
  if (evt.target.nodeName === 'LI' && clicked === true) {
    secondCard = evt.target;
    secondCardClass = secondCard.children[0].classList[1];
    if (firstCardClass === secondCardClass) {
      correctMatch(firstCard, secondCard);
    } else {
      incorrectMatch(firstCard, secondCard);
    }
  } else {
    if (evt.target.nodeName === 'LI') {
      firstCard = evt.target;
      firstCardClass = firstCard.children[0].classList[1];
      showCard(firstCard);
      clicked = true;
    }
  }
  score();
}

deck.addEventListener('click', cardMatch);

// Timer

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}