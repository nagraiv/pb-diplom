const players = ['X', 'O'];
let activePlayer;
let startPlayer;
let round;

let board;
const seria = 5;

const spanEL = document.getElementById('seria');
spanEL.innerHTML = String(seria);

function generateStartBoard (size=10) {
  const startBoard = []
  for (let i = 0; i < size; i += 1) {
    let row = [];
    for (let j = 0; j < size; j += 1) {
      row.push('');
    }
    startBoard.push(row);
  }
  return startBoard;
}

function startGame() {
  board = generateStartBoard();
  startPlayer = Math.floor(Math.random()*2);
  activePlayer = startPlayer;
  round = 0;
  const span1EL = document.getElementById('startPlayer');
  span1EL.innerHTML = players[startPlayer];
  const span2EL = document.getElementById('activePlayer');
  span2EL.innerHTML = players[activePlayer];
  const span3EL = document.getElementById('round');
  span3EL.innerHTML = String(Math.floor(round / 2) + 1);
  renderBoard(board);
  // элемент line перечёркивает выигрышную комбинацию, с началом игры необходимо обнулить все стили для него
  const lineEL = document.querySelector('.line');
  lineEL.style.top = '0';
  lineEL.style.left = '0';
  lineEL.style.height = '0';
  lineEL.style.width = '0';
  lineEL.style.transformOrigin = 'initial';
  lineEL.style.transform = 'none';
  lineEL.style.transition = 'none';
}

function resizeBoard(row, col) {
  const oldSize = board.length;
  const newSize = oldSize + 1;
  let shiftRow = false;
  let shiftCol = false;
  const newRow = [];
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
  // if (row === oldSize - 1 && col < oldSize - 1) {
  //   let newEL = document.querySelector('.container');
  //   newEL.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  // }
  // if (col === oldSize - 1 && row < oldSize - 1) {
  //   let newEL = document.querySelector('.container');
  //   newEL.scrollIntoView({behavior: "smooth", block: "nearest", inline: "end"});
  // }
  // if (row === oldSize - 1 && col === oldSize - 1) {
  //   let newEL = document.querySelector('.container');
  //   newEL.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
  // }
  // let theEL = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  // theEL.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
  return [shiftRow, shiftCol];
}

function scrollToClick(row, col) {
  const theEl = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  const height = theEl.clientHeight + 5;
  const width = theEl.clientWidth + 5;
  const rect = theEl.getBoundingClientRect();
  if (rect.top < height) {
    // console.log('Надо двигать вверх!');
    window.scrollBy(0, rect.top - height);
  }
  if (rect.left < width) {
    // console.log('Надо двигать влево!');
    window.scrollBy(rect.left - width, 0);
  }
  if (rect.bottom > document.documentElement.clientHeight - height) {
    // console.log('Надо двигать вниз!');
    window.scrollBy(0, rect.bottom - document.documentElement.clientHeight + height);
  }
  if (rect.right > document.documentElement.clientWidth - width) {
    // console.log('Надо двигать вправо!');
    window.scrollBy(rect.right - document.documentElement.clientWidth + width, 0);
  }
}

function click(row, col) {
  let rowInd = parseInt(row);
  let colInd = parseInt(col);
  // const theEL = document.querySelector(`[data-row="${rowInd}"][data-col="${colInd}"]`);
  // theEL.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
  let shiftCoord = [];
  board[rowInd][colInd] = players[activePlayer];
  // если знак поставлен на границу доски, значит, игровое поле надо расширить
  // при добавлении строки вверху или столбца слева координаты последнего клика изменяются
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

  scrollToClick(rowInd, colInd);
  // если сложилась выигрышнаяя комбинация, то перечёркиваем её и выводим сообщение о победе с задержкой 3 сек
  if (checkVictory(board, rowInd, colInd)) {
    interruptModal = setTimeout(showWinner, 3000, activePlayer);
    // предотвращаем возможность дальнейших ходов после выигрыша и до появления модального окна с победителем
    const freeFields = document.querySelectorAll('.free')
    freeFields.forEach(item => {
      item.classList.remove('free');
      item.classList.add('busy');
    });
    // showWinner(activePlayer);
  } else {  // иначе ход переходит к следующему игроку
    round += 1;
    activePlayer = (startPlayer + round) % 2;

    const span2EL = document.getElementById('activePlayer');
    span2EL.innerHTML = players[activePlayer];
    const span3EL = document.getElementById('round');
    span3EL.innerHTML = String(Math.floor(round / 2) + 1);
  }
}

