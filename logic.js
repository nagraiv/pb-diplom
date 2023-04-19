let players = ['X', 'O'];
let activePlayer;
let startPlayer;
let round;

let board;
let seria = 5;

let spanEL = document.getElementById('seria');
spanEL.innerHTML = seria;

    function generateStartBoard (size=10) {
  let startBoard = []
  for (let i = 0; i < size; i += 1) {
    let row = [];
    for (let j = 0; j < size; j += 1) {
      row.push('');
    }
    startBoard.push(row);
  }
  return startBoard;
}

function resizeBoard(row, col) {
  let oldSize = board.length;
  let newSize = oldSize + 1;
  let shiftRow = false;
  let shiftCol = false;
  let newRow = [];
  for (let i = 0; i < oldSize; i +=1) {
    newRow.push('');
  }
  if (row === 0) {
    shiftRow = true;
    board.unshift(newRow);
    if (col > 0 && col < oldSize / 2) {
      shiftCol = true;
      for (let i = 0; i < newSize; i +=1) {
        board[i].unshift('');
      }
    }
    if (col >= oldSize / 2 && col < oldSize - 1) {
      for (let i = 0; i < newSize; i +=1) {
        board[i].push('');
      }
    }
  }
  if (row === oldSize - 1) {
    board.push(newRow);
    if (col > 0 && col < oldSize / 2) {
      shiftCol = true;
      for (let i = 0; i < newSize; i +=1) {
        board[i].unshift('');
      }
    }
    if (col >= oldSize / 2 && col < oldSize - 1) {
      for (let i = 0; i < newSize; i +=1) {
        board[i].push('');
      }
    }
  }
  if (col === 0) {
    shiftCol = true;
    if (row > 0 && row < oldSize / 2) {
      shiftRow = true;
      board.unshift(newRow);
    }
    if (row >= oldSize / 2 && row < oldSize - 1) {
      board.push(newRow);
    }
    for (let i = 0; i < newSize; i += 1) {
      board[i].unshift('');
    }
  }
  if (col === oldSize - 1) {
    if (row > 0 && row < oldSize / 2) {
      shiftRow = true;
      board.unshift(newRow);
    }
    if (row >= oldSize / 2 && row < oldSize - 1) {
      board.push(newRow);
    }
    for (let i = 0; i < newSize; i += 1) {
      board[i].push('');
    }
  }
  if (row === oldSize - 1 && col < oldSize - 1) {
    let newEL = document.querySelector('.container');
    newEL.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  if (col === oldSize - 1 && row < oldSize - 1) {
    let newEL = document.querySelector('.container');
    newEL.scrollIntoView({behavior: "smooth", block: "nearest", inline: "end"});
  }
  if (row === oldSize - 1 && col === oldSize - 1) {
    let newEL = document.querySelector('.container');
    newEL.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
  }
  // let theEL = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  // theEL.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
  return [shiftRow, shiftCol];
}

function startGame() {
  board = generateStartBoard();
  startPlayer = Math.floor(Math.random()*2);
  activePlayer = startPlayer;
  round = 0;
  let span1EL = document.getElementById('startPlayer');
  span1EL.innerHTML = players[startPlayer];
  let span2EL = document.getElementById('activePlayer');
  span2EL.innerHTML = players[activePlayer];
  let span3EL = document.getElementById('round');
  span3EL.innerHTML = Math.floor(round / 2) + 1;
  renderBoard(board);

  let lineEL = document.querySelector('.line');
  lineEL.style.top = '0';
  lineEL.style.left = '0';
  lineEL.style.height = '0';
  lineEL.style.width = '0';
  lineEL.style.transformOrigin = 'initial';
  lineEL.style.transform = 'none';
  lineEL.style.transition = 'none';
}

function click(row, col) {
  let rowInd = parseInt(row);
  let colInd = parseInt(col);
  let shiftCoord = [];
  board[rowInd][colInd] = players[activePlayer];
  if (rowInd === 0 || colInd === 0 || rowInd === (board.length - 1) || colInd === (board.length - 1)) {
    shiftCoord = resizeBoard(rowInd, colInd);
  }
  renderBoard(board);
  if (shiftCoord[0]) {
    rowInd += 1;
  }
  if (shiftCoord[1]) {
    colInd += 1;
  }
  if (checkVictory(board, rowInd, colInd)) {
    setTimeout(function(){showWinner(activePlayer);}, 3000);
    let freeFields = document.querySelectorAll('.free')
    freeFields.forEach(item => {
      item.classList.remove('free');
      item.classList.add('busy');
    });
    // showWinner(activePlayer);
  } else {
    round += 1;
    activePlayer = (startPlayer + round) % 2;

    let span2EL = document.getElementById('activePlayer');
    span2EL.innerHTML = players[activePlayer];
    let span3EL = document.getElementById('round');
    span3EL.innerHTML = Math.floor(round / 2) + 1;
  }
}

