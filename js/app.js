
//Shake card on click
const cardContainer = document.querySelector('.grid');

function shakeCell (evt) {
  if (evt.target.nodeName === 'DIV') {
    evt.target.classList.add('grid__img--shake');
  }
}

cardContainer.addEventListener('click', shakeCell);