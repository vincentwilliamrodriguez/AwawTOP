console.log("Welcome to the console version of Awaw's Tic Tac Toe! To begin, make a move using the following:\ngame.playTurn(i, j)");

function Cell() {
  let state = " ";
  const setState = (val) => {state = val};
  const getState = () => state;

  return {
    getState,
    setState
  };
}

function Player(name, mark) {
  return {
    name,
    mark
  };
}

function Gameboard() {
  let board = new Array(3);
  const getBoard = () => board;

  for (let i = 0; i < 3; i++) {
    board[i] = new Array(3);

    for (let j = 0; j < 3; j++) {
      board[i][j] = Cell();
    }
  }

  function printBoard() {
    let output = "";

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        output += board[i][j].getState();
      }

      output += "\n";
    }

    console.log(output);
  }

  function placeMark(i, j, playerMark) {
    board[i][j].setState(playerMark);
  }

  return {
    getBoard,
    printBoard,
    placeMark
  }
}

const game = (function () {
  let board = Gameboard();
  const players = [Player("Player 1", "X"),
                   Player("Player 2", "O")];

  let turn = players[0];
  const getTurn = () => turn;
  const switchTurn = () => {
    turn = (turn === players[0]) ?
            players[1] :
            players[0];
  };

  let gameWinner = null;
  let setsOfThree = [];


  function playTurn(i, j) {
    if (isNaN(i) || isNaN(j)) {
      return;
    }
    
    if (!(0 <= i && i <= 2 && 0 <= j && j <= 2)) {
      return;
    }

    if (!(board.getBoard()[i][j].getState() == " ")) {
      return;
    }

    board.placeMark(i, j, turn.mark);
    board.printBoard();

    if (!checkGameOver()) {
      switchTurn();
      printNewTurn();
    }
  }

  function printNewTurn() {
    console.log(`Time for ${turn.name} (${turn.mark}) to play!\n`)
  }

  function initSetsOfThree() {
    for (let row = 0; row < 3; row++) {
      setsOfThree.push([[row, 0], [row, 1], [row, 2]]);
    }

    for (let col = 0; col < 3; col++) {
      setsOfThree.push([[0, col], [1, col], [2, col]]);
    }

    setsOfThree.push([[0, 0], [1, 1], [2, 2]],
                     [[2, 0], [1, 1], [0, 2]]
    );
  }

  function checkGameOver() {
    let isGameOver = false;
    let fullCheck = [];

    setsOfThree.forEach(set => {
      let values = set.map((pos) => {
        let [i, j] = pos;
        return board.getBoard()[i][j].getState();
      });

      let isLineSame = values.every(value => (value === values[0]));
      let isLineFull = values.every(value => (value != " "));

      fullCheck.push(isLineFull);

      if (isLineFull && isLineSame) {
        console.log(`Game over! ${turn.name} (${turn.mark}) wins!`);
        gameWinner = turn;
        isGameOver = true;
      }
    });

    if (!isGameOver && fullCheck.every(val => val)) {
      console.log(`Game over! It's a draw!`);
      gameWinner = Player("Tie", " ");
      isGameOver = true;
    }

    return isGameOver;
  }

  function restartGame() {
    board = Gameboard();
    turn = players[0];
    gameWinner = null;

    printNewTurn();
  }

  initSetsOfThree();
  restartGame();

  return {
    playTurn,
    getTurn,
    restartGame
  }
})();



