const fieldsArr = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const lines = document.querySelectorAll('.line');
let click = 0;
let symbol = 'x';
let msg = '';

const refreshBoard = () => {
  lines.forEach((line, index) => {
    const fields = line.querySelectorAll('div');
    fields.forEach((field, i) => {
      field.textContent = fieldsArr[index][i];
    });
  });
};
refreshBoard();

const checkWinner = line => {
  const lineLength = line.filter(f => f !== null).length;
  const unique = [...new Set(line)];

  if (lineLength === 3 && unique.length === 1) {
    msg = `Winner is ${unique[0]}`;
    createWinnerScreen();
  } else if (gameOver()) {
    msg = 'Game Over';
    createWinnerScreen();
  }
};

const createWinnerScreen = () => {
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  div.classList.add('winner');
  h1.textContent = msg;

  div.appendChild(h1);
  document.querySelector('body').appendChild(div);
};

const checkHorizontal = () => {
  fieldsArr.forEach(line => {
    checkWinner(line);
  });
};

const checkVertical = () => {
  for (let i = 0; i < 3; i++) {
    const line = [];
    for (let j = 0; j < 3; j++) {
      line.push(fieldsArr[j][i]);
    }
    checkWinner(line);
  }
};

const diagonalOne = () => {
  const line = [];
  for (let i = 0; i < 3; i++) {
    line.push(fieldsArr[i][i]);
  }
  checkWinner(line);
};

const diagonalTwo = () => {
  const lines = [];
  fieldsArr.forEach((line, index) => {
    const lineIndex = line.length - 1 - index;
    lines.push(line[lineIndex]);
  });
  checkWinner(lines);
};

const gameOver = () => {
  const lines = [];
  fieldsArr.forEach(line => {
    line = line.filter(f => f !== null);
    if (line.length >= 3) {
      lines.push(line);
    }
  });

  if (lines.length === 3) {
    return true;
  }
  return false;
};

const getWinner = () => {
  checkHorizontal();
  checkVertical();
  diagonalOne();
  diagonalTwo();
};

lines.forEach((line, index) => {
  line.addEventListener('click', e => {
    if (click % 2 === 1) {
      symbol = 'o';
    } else {
      symbol = 'x';
    }
    const value = e.target.getAttribute('value');

    if (fieldsArr[index][value] === null) {
      fieldsArr[index][value] = symbol;
      click++;
      refreshBoard();
      getWinner();
      gameOver();
    }
  });
});
