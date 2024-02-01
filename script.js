let currentPlayer = 'Red';
let gameOver = false;
let board = [];
let currentColumnsBottomRow = [5, 5, 5, 5, 5, 5, 5];
const rows = 6, columns = 7;

for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
        row.push('');
        let cell = document.createElement('div');
        cell.id = r.toString() + '-' + c.toString();
        cell.classList.add('cell');
        cell.addEventListener('click', setPiece);
        document.getElementById('board').append(cell);
    }
    board.push(row);
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currentColumnsBottomRow[c]; 
    board[r][c] = currentPlayer;
    let cell = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer === 'Red') {
        cell.classList.add('red-piece');
        currentPlayer = 'Yellow';
    }
    else {
        cell.classList.add('yellow-piece');
        currentPlayer = 'Red';
    }
    currentColumnsBottomRow[c] -= 1;
    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != '' && board[r][c] === board[r][c+1] && board[r][c+1] === board[r][c+2] && board[r][c+2] === board[r][c+3]) {
                setWinner();
                return;
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != '' && board[r][c] === board[r+1][c] && board[r+1][c] === board[r+2][c] && board[r+2][c] === board[r+3][c]) {
                setWinner();
                return;
            } 
        }
    }
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '' && board[r][c] === board[r+1][c+1] && board[r+1][c+1] === board[r+2][c+2] && board[r+2][c+2] === board[r+3][c+3]) {
                setWinner();
                return;
            }
        }
    }
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 3; c <= columns; c++) {
            if (board[r][c] != '' && board[r][c] === board[r+1][c-1] && board[r+1][c-1] === board[r+2][c-2] && board[r+2][c-2] === board[r+3][c-3]) {
                setWinner();
                return;
            }
        }
    }
    let whiteCells = 0;
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < columns; ++c) {
            if (board[r][c] === '') {
                ++whiteCells;
            }
        }
    }
    if (whiteCells === 0) {
        winner.innerText = 'It\'s a draw!';
        gameOver = true;
    }
}

function setWinner() {
    let winner = document.getElementById('winner');
    if (currentPlayer !== 'Red') {
        winner.innerText = 'Red Wins!';             
    } else {
        winner.innerText = 'Yellow Wins!';
    }
    gameOver = true;
}