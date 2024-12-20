const correctOrder = ["Меркурий", "Венера", "Земля", "Марс", "Юпитер", "Сатурн", "Уран", "Нептун"];
const planetElements = document.querySelectorAll('.planet');
const dropSlots = document.querySelectorAll('.drop-slot');
const winMessage = document.getElementById('win-message');

planetElements.forEach(planet => {
    planet.addEventListener('dragstart', dragStart);
});

dropSlots.forEach(slot => {
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', drop);
    slot.addEventListener('dblclick', removePlanet);
});

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.dataset.name);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    const planetName = event.dataTransfer.getData('text');
    const slot = event.target;

    if (!slot.classList.contains('planet')) {
        slot.textContent = planetName;
        slot.classList.add('planet');
        slot.dataset.name = planetName;

        checkWinCondition();
    }
}

function removePlanet(event) {
    const slot = event.target;

    if (slot.classList.contains('planet')) {
        slot.textContent = '';
        slot.classList.remove('planet');
        slot.removeAttribute('data-name');
    }

    checkWinCondition();
}

function checkWinCondition() {
    let correct = true;

    dropSlots.forEach((slot, index) => {
        if (slot.dataset.name !== correctOrder[index]) {
            correct = false;
        }
    });

    if (correct) {
        winMessage.style.display = 'block';
    } else {
        winMessage.style.display = 'none';
    }
}