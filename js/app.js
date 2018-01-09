
const deck = document.querySelector('.deck');
let clicked;
let firstCard;
let firstCardClass
let secondCard;
let secondCardClass

function showCard(card) {
  card.classList.add('deck__card--show', 'deck__card--open');
}

function correctMatch () {
  secondCard.classList.add('deck__card--show', 'deck__card--match');
  firstCard.classList.replace('deck__card--open', 'deck__card--match');
}


function cardMatch (evt) {
  if (evt.target.nodeName === 'LI' && clicked === true) {
    secondCard = evt.target;
    secondCardClass = secondCard.children[0].classList[1];
    if (firstCardClass === secondCardClass) {
      correctMatch();
    }
  } else if (evt.target.nodeName === 'LI') {
    firstCard = evt.target;
    firstCardClass = firstCard.children[0].classList[1];
    showCard(firstCard);
    clicked = true;
  }
}

deck.addEventListener('click', cardMatch);

