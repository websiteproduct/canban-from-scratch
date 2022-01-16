const card = document.querySelector('.card');
const cardCopy = card.cloneNode();
const placeholders = document.querySelectorAll('.placeholder');
let lastCardPlace;

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover);
    placeholder.addEventListener('dragenter', dragenter);
    placeholder.addEventListener('dragleave', dragleave);
    placeholder.addEventListener('drop', dragdrop);

    if (placeholder.children.length) placeholder.classList.add('has-card');
}

card.addEventListener('dragstart', dragstart)
card.addEventListener('dragend', dragend)

function dragstart(event) {
    this.style.opacity = '0.4';
    event.target.classList.add('hold');
    lastCardPlace = event.target.parentElement;
    setTimeout(() => {
        event.target.classList.add('hide');
        revertPlaceholderState();
    }, 0);
}

function dragend(event) {
    this.style.opacity = '1';
    event.target.classList.remove('hold', 'hide');
    console.log('that\'s all', event);
}

function dragover(event) {
    event.preventDefault();
}

function dragenter(event) {
    event.target.classList.add('hovered');
}

function dragleave(event) {
    event.target.classList.remove('hovered');
}

function dragdrop(event) {
    event.target.innerText = '';
    event.target.classList.remove('hovered');

    if (event.target.classList.contains('placeholder')) {
        event.target.append(card);
        card.parentElement.classList.add('has-card');
    } else {
        lastCardPlace.append(cardCopy);
    }
}

function revertPlaceholderState() {
    for (const placeholder of placeholders) {
        placeholder.classList.remove('has-card');
        placeholder.innerText = 'Drag a card here';
    }
}