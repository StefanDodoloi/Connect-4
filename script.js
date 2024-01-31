const cells = document.querySelectorAll('.cell');
const gameOver = document.querySelector('#gameOver');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options;
let currentPlayer = 'X';

newGame();

function newGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    gameOver.textContent = '';
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex'); 
    if (options[cellIndex] !== '' || gameOver.textContent !== '') {
        return;
    }
    options[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;
    checkWinner();
}

function checkWinner() {
    let gameEnd = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if (cellA == cellB && cellB == cellC && cellA !== '') {
            gameEnd = true;
            break;
        }
    }
    if (gameEnd) {
        gameOver.textContent = `${currentPlayer} wins!`;
    } else if (!options.includes('')) {
        gameOver.textContent = `Draw!`;
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}