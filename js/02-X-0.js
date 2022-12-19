const stepX = [];
const step0 = [];

let player = 'X';

const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

const content = document.querySelector('.content');
const reset = document.querySelector('.reset');

content.addEventListener('click', onCellClick);
reset.addEventListener('click', onResetButtonClick);

function createMarkup() {
    let markup = '';

    for (let i = 1; i <= 9; i += 1) {
        markup += `<div class='item item-hover' data-id='${i}'></div>`;
    }

    content.innerHTML = markup;
}
createMarkup();

function onCellClick(evt) {
    evt.target.classList.remove('item-hover');

    if (!evt.target.classList.contains('item')) {
        return;
    }
    if (evt.target.textContent) {
        return;
    }

    const valueId = Number(evt.target.dataset.id);

    let result = false;

    if (player === 'X') {
        stepX.push(valueId);
        result = isWinner(stepX);
    } else {
        step0.push(valueId);
        result = isWinner(step0);
    }

    evt.target.textContent = player;

    if (result) {
        chempion(player);
        return;
    }
    player = player === 'X' ? '0' : 'X';
}

function isWinner(arr) {
    return wins.some(item => {
        return item.every(id => arr.includes(id));
    });
}


function chempion(player) {
    setTimeout(() => {
        alert(player);
        cleanArr(step0, stepX);
        createMarkup();
    }, 100);
}

function onResetButtonClick() {
    cleanArr(step0, stepX);
    createMarkup();
}

function cleanArr(arr1, arr2) {
    player = 'X';

    arr1.length = 0;
    arr2.length = 0;
}
