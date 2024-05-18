console.log("Welcome to the console version of Awaw's Tic Tac Toe! To begin, make a move using the following:\ngame.playTurn(i, j)");

const TextManager = (function () {
  const playerTurn = (turn) => `Time for ${turn.name} (${turn.mark}) to play!\n`;
  const win = (turn) => `Game over! ${turn.name} (${turn.mark}) wins!`;
  const draw = () => `Game over! It's a draw!`;

  return {
    playerTurn,
    win,
    draw
  }
})();

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
  const getBoardController = () => board;

  const players = [Player("Player 1", "X"),
                   Player("Player 2", "O")];
  const changePlayerName = (number, newName) => {
    players[number].name = newName;
  };

  let turn = players[0];
  const getTurn = () => turn;
  const switchTurn = () => {
    turn = (turn === players[0]) ?
            players[1] :
            players[0];
  };

  let gameStatus = null;
  const getGameStatus = () => gameStatus;

  let setsOfThree = [];

  let winningCombo = [];
  const getWinningCombo = () => winningCombo;

  function playTurn(i, j) {
    if (gameStatus !== null) {
      return false;
    }

    if (isNaN(i) || isNaN(j)) {
      return false;
    }
    
    if (!(0 <= i && i <= 2 && 0 <= j && j <= 2)) {
      return false;
    }

    if (!(board.getBoard()[i][j].getState() == " ")) {
      return false;
    }

    board.placeMark(i, j, turn.mark);
    board.printBoard();

    if (!checkGameOver()) {
      switchTurn();
      printNewTurn();
    }

    return true;
  }

  function printNewTurn() {
    console.log(TextManager.playerTurn(turn))
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
        console.log(TextManager.win(turn));
        winningCombo = set;
        gameStatus = turn;
        isGameOver = true;
      }
    });

    if (!isGameOver && fullCheck.every(val => val)) {
      console.log(TextManager.draw());
      gameStatus = Player("Tie", " ");
      isGameOver = true;
    }

    return isGameOver;
  }

  function restartGame() {
    board = Gameboard();
    turn = players[0];
    gameStatus = null;

    printNewTurn();
  }

  initSetsOfThree();
  restartGame();

  return {
    playTurn,
    getTurn,
    restartGame,
    getBoardController,
    getGameStatus,
    changePlayerName,
    getWinningCombo
  }
})();

function ScreenController() {
  const boardDiv = document.querySelector(".board");
  const cellDivTemplate = document.querySelector(".board__cell--template");
  const restartBtnDiv = document.querySelector(".restart-btn");
  const labelDiv = document.querySelector(".label");
  const playerDivs = document.querySelectorAll(".player");

  const posUnpacker = (cell) => cell.getAttribute("data-pos").split(" ");

  function initUI() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellDiv = cellDivTemplate.cloneNode(true);
        cellDiv.classList.remove("board__cell--template");
        cellDiv.addEventListener("click", clickHandler);
        cellDiv.setAttribute("data-pos", [i, j].join(" "));
        boardDiv.appendChild(cellDiv);
      }
    }

    playerDivs.forEach((element, i) => {
      const playerNameDiv = element.querySelector("p");
      playerNameDiv.addEventListener("input", (e) => {
        const newName = e.target.innerHTML;
        game.changePlayerName(i, newName);
        updateUI();
      });
    });

    updateUI();
  }

  function updateUI() {
    const boardDivChildren = [...boardDiv.children];
    boardDivChildren.forEach((cell) => {
      if (cell.classList.contains("board__cell") &&
          !cell.classList.contains("board__cell--template")) {
        
        const [i, j] = posUnpacker(cell);
        const state = game.getBoardController().getBoard()[i][j].getState();
        const path = {" ":"", "X": "assets/x.png", "O": "assets/o.png"}[state];
        cell.querySelector("img").src = path; 
        cell.classList.remove("board__cell--win");
      }
    });


    const turn = game.getTurn();

    playerDivs.forEach((element) => {
      element.classList.remove("player--turn");

      if (turn.mark === element.getAttribute("data-mark")) {
        element.classList.add("player--turn");
      }
    });


    const gameStatus = game.getGameStatus();

    if (gameStatus === null) {
      labelDiv.textContent = TextManager.playerTurn(turn);
    }
    else if (gameStatus.mark === " ") {
      labelDiv.textContent = TextManager.draw();
    }
    else {
      labelDiv.textContent = TextManager.win(gameStatus);

      const winningCombo = game.getWinningCombo();
      winningCombo.forEach((pos) => {
        const [i, j] = pos;
        const cell = boardDiv.children[3 * i + j + 2];
        cell.classList.add("board__cell--win");
      });
    }
  }

  function clickHandler(e) {
    if (e.target.classList.contains("board__cell")) {
      const [i, j] = posUnpacker(e.target);
      game.playTurn(i, j);
      updateUI();
    }
  }

  initUI();

  restartBtnDiv.addEventListener("click", () => {
    game.restartGame();
    updateUI();
  });
}

ScreenController();
