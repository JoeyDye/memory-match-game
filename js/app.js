
const deck = document.querySelector('.deck');
const cards = deck.children;
let score = 0;
let matchCount = 0;
let clicked;
let firstCard;
let firstCardClass
let secondCard;
let secondCardClass

// show selected card

function showCard(card) {
  card.classList.add('deck__card--open');
}

// Check for match

function correctMatch (card1, card2) {
  card1.classList.replace('deck__card--open', 'deck__card--match');
  card2.classList.add('deck__card--match');
  clicked = false;
  // Check for win
  score += 1;
  if (score > 7) { 
    alert('You win!');
  }
}

// Display incorrect match

function incorrectMatch (card1, card2) {
  card1.classList.replace('deck__card--open', 'deck__card--fail');
  card2.classList.add('deck__card--fail');
  setTimeout(function reset () {
    card1.classList.remove('deck__card--fail');
    card2.classList.remove('deck__card--fail');}, 1000)
    clicked = false;
}

// Display correct match

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
}

deck.addEventListener('click', cardMatch);