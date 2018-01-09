
const deck = document.querySelector('.deck');


function cardMatch (evt) {
  if (evt.target.nodeName === 'LI') {
    evt.target.classList.add('deck__card--show', 'deck__card--open');
  }
}

deck.addEventListener('click', cardMatch);

