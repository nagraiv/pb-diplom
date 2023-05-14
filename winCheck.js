function checkVertical(myArray, row, column) {
    const symbol = myArray[row][column];
    let ind = row;
    let current = symbol;
    let sequence = 0;
    // looking up
    while (current === symbol) {
        sequence += 1;
        ind -= 1;
        if (ind >= 0) {
            current = myArray[ind][column];
        }
        else {
            current = '';
        }
    }

    let array = [];
    array.push(sequence-1);
    ind = row;
    current = symbol;
    sequence = 0;
    // looking down
    while (current === symbol) {
        sequence += 1;
        ind += 1;
        if (ind < myArray.length) {
            current = myArray[ind][column];
        } else {
            current = '';
        }
    }
    array.push(sequence-1);
    return array;
}

function checkHorizontal(myArray, row, column) {
    const symbol = myArray[row][column];
    let ind = column;
    let current = symbol;
    let sequence = 0;
    // looking left
    while (current === symbol) {
        sequence += 1;
        ind -= 1;
        if (ind >= 0) {
            current = myArray[row][ind];
        }
        else {
            current = '';
        }
    }

    let array = [];
    array.push(sequence-1);
    ind = column;
    current = symbol;
    sequence = 0;
    // looking right
    while (current === symbol) {
        sequence += 1;
        ind += 1;
        if (ind < myArray.length) {
            current = myArray[row][ind];
        } else {
            current = '';
        }
    }
    array.push(sequence-1);
    return array;
}

function checkMainDiagonal(myArray, row, column) {
    const symbol = myArray[row][column];
    let current = symbol;
    let sequence = 0;
    let shift = 0;
    // looking up left
    while (current === symbol) {
        sequence += 1;
        shift += 1;
        if (row - shift >= 0 && column - shift >= 0) {
            current = myArray[row - shift][column - shift];
        }
        else {
            current = '';
        }
    }

    let array = [];
    array.push(sequence-1);
    shift = 0;
    current = symbol;
    sequence = 0;
    // looking down right
    while (current === symbol) {
        sequence += 1;
        shift += 1;
        if (row + shift < myArray.length && column + shift < myArray.length) {
            current = myArray[row + shift][column + shift];
        } else {
            current = '';
        }
    }
    array.push(sequence-1);
    return array;
}

function checkSideDiagonal(myArray, row, column) {
    const symbol = myArray[row][column];
    let current = symbol;
    let sequence = 0;
    let shift = 0;
    // looking up right
    while (current === symbol) {
        sequence += 1;
        shift += 1;
        if (row - shift >= 0 && column + shift < myArray.length) {
            current = myArray[row - shift][column + shift];
        }
        else {
            current = '';
        }
    }

    let array = [];
    array.push(sequence-1);
    shift = 0;
    current = symbol;
    sequence = 0;
    // looking down left
    while (current === symbol) {
        sequence += 1;
        shift += 1;
        if (row + shift < myArray.length && column - shift >= 0) {
            current = myArray[row + shift][column - shift];
        } else {
            current = '';
        }
    }
    array.push(sequence-1);
    return array;
}

function checkVictory(myBoard, i, j) {
    const row = parseInt(i);
    const col = parseInt(j);
    const vertical = checkVertical(myBoard, row, col);
    const horizontal = checkHorizontal(myBoard, row, col);
    const main = checkMainDiagonal(myBoard, row, col);
    const side = checkSideDiagonal(myBoard, row, col);

    if (vertical[0] + vertical[1] >= seria - 1) {
        const startEL = document.querySelector(`[data-row="${row-vertical[0]}"][data-col="${col}"]`);
        const top = startEL.offsetTop - 7;

        const endEL = document.querySelector(`[data-row="${row+vertical[1]}"][data-col="${col}"]`);
        const bottom = endEL.offsetTop + endEL.clientHeight + 7;

        const left = endEL.offsetLeft + endEL.clientWidth/2 - 2;

        const lineEL = document.querySelector('.line');
        lineEL.style.top = top + 'px';
        lineEL.style.left = left + 'px';
        lineEL.style.height = bottom - top + 'px';
        lineEL.style.width = '4px';
        lineEL.style.transition = 'height 1s ease-in-out';

        return true;
    }
    if (horizontal[0] + horizontal[1] >= seria - 1) {
        const startEL = document.querySelector(`[data-row="${row}"][data-col="${col-horizontal[0]}"]`);
        const left = startEL.offsetLeft - 7;

        const endEL = document.querySelector(`[data-row="${row}"][data-col="${col+horizontal[1]}"]`);
        const right = endEL.offsetLeft + endEL.clientWidth + 7;
        const top = endEL.offsetTop + endEL.clientHeight/2 - 2;

        const lineEL = document.querySelector('.line');
        lineEL.style.top = top + 'px';
        lineEL.style.left = left + 'px';
        lineEL.style.height = '4px';
        lineEL.style.width = right - left + 'px';
        lineEL.style.transition = 'width 1s ease-in-out';

        return true;
    }
    if (main[0] + main[1] >= seria - 1) {
        const startEL = document.querySelector(`[data-row="${row-main[0]}"][data-col="${col-main[0]}"]`);
        const left = startEL.offsetLeft - 7;
        const top = startEL.offsetTop - 9;

        const endEL = document.querySelector(`[data-row="${row+main[1]}"][data-col="${col+main[1]}"]`);
        const right = endEL.offsetLeft + endEL.clientWidth + 7;
        const bottom = endEL.offsetTop + endEL.clientHeight + 5;

        const lineEL = document.querySelector('.line');
        lineEL.style.top = top + 'px';
        lineEL.style.left = left + 'px';
        lineEL.style.height = '4px';
        lineEL.style.width = Math.sqrt(Math.pow(right - left, 2) + Math.pow(bottom - top, 2)) + 'px';
        lineEL.style.transformOrigin = 'left';
        lineEL.style.transform = 'rotate(45deg)';
        lineEL.style.transition = 'width 1s ease-in-out';

        return true;
    }
    if (side[0] + side[1] >= seria - 1) {
        const startEL = document.querySelector(`[data-row="${row-side[0]}"][data-col="${col+side[0]}"]`);
        const right = startEL.offsetLeft + startEL.clientWidth + 7;
        const top = startEL.offsetTop - 9;

        const endEL = document.querySelector(`[data-row="${row+side[1]}"][data-col="${col-side[1]}"]`);
        const left = endEL.offsetLeft - 7;
        const bottom = endEL.offsetTop + endEL.clientHeight + 5;

        const lineEL = document.querySelector('.line');
        lineEL.style.top = top + 'px';
        lineEL.style.left = right + 'px';
        lineEL.style.height = Math.sqrt(Math.pow(right - left, 2) + Math.pow(bottom - top, 2)) + 'px';
        lineEL.style.width = '4px';
        lineEL.style.transformOrigin = 'top';
        lineEL.style.transform = 'rotate(45deg)';
        lineEL.style.transition = 'height 1s ease-in-out';

        return true;
    }
    return false;
}
