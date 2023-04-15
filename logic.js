let players = ['x', 'o'];
let activePlayer;
let startPlayer;
let round;

let board;

function startGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  startPlayer = Math.floor(Math.random()*2);
  activePlayer = startPlayer;
  round = 0;
  renderBoard(board);
}

function checkVictory(myBoard) {
  let symbol = players[activePlayer];
  return (symbol === myBoard[0][0] && symbol === myBoard[0][1] && symbol === myBoard[0][2] ||
      symbol === myBoard[1][0] && symbol === myBoard[1][1] && symbol === myBoard[1][2] ||
      symbol === myBoard[2][0] && symbol === myBoard[2][1] && symbol === myBoard[2][2] ||
      symbol === myBoard[0][0] && symbol === myBoard[1][0] && symbol === myBoard[2][0] ||
      symbol === myBoard[0][1] && symbol === myBoard[1][1] && symbol === myBoard[2][1] ||
      symbol === myBoard[0][2] && symbol === myBoard[1][2] && symbol === myBoard[2][2] ||
      symbol === myBoard[0][0] && symbol === myBoard[1][1] && symbol === myBoard[2][2] ||
      symbol === myBoard[0][2] && symbol === myBoard[1][1] && symbol === myBoard[2][0]);
}

function click(rowInd, colInd) {  
  board[rowInd][colInd] = players[activePlayer];
  renderBoard(board);
  if (checkVictory(board)) {
    showWinner(activePlayer);
  }
  round += 1;
  activePlayer = (startPlayer + round) % 2;
}

