window.addEventListener('load', startGame);

const boardEl = document.getElementById('board');
const modalEl = document.getElementById('modal');
let interruptModal = false; // reset game without show winner timeout
const resetButtons = document.getElementsByClassName('reset');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
    }
    if (interruptModal) {
      clearTimeout(interruptModal);
    }
    startGame();
  });
}

boardEl.addEventListener('click', function (event) {
  const targetClasses = event.target.classList;
  const targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    click(targetData.row, targetData.col);
  }
});

function showWinner(winner) {
  const header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `Победил игрок "${players[winner]}"!`;
  modalEl.classList.remove('hidden');
}

function renderBoard(board) {
  const fields = [];
  for (let [i, row] of board.entries()) {
    for (let [j, value] of row.entries()) {
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}
