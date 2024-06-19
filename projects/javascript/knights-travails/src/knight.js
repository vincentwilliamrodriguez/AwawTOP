const knightMovesList = [
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
];

const isInBounds = (pos) =>
  pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;

let boardGraph = [];
initBoardGraph();

function initBoardGraph() {
  boardGraph = [];

  for (let i = 0; i < 8; i++) {
    boardGraph.push([]);

    for (let j = 0; j < 8; j++) {
      const neighbors = [];

      for (const move of knightMovesList) {
        // New square coords
        const x = i + move[0];
        const y = j + move[1];

        if (isInBounds([x, y])) {
          neighbors.push([x, y]);
        }
      }
      boardGraph[i].push({
        discovered: false,
        neighbors,
      });
    }
  }
}

function resetdiscovered() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      boardGraph[i][j].discovered = false;
    }
  }
}

export default function knightMoves(start, end) {
  if (!(isInBounds(start) && isInBounds(end))) {
    console.log('\nPlease enter valid coordinates.');
    return;
  }

  const queue = [[start]];

  while (queue.length > 0) {
    const path = queue.shift();
    const square = path.at(-1);

    if (square[0] === end[0] && square[1] === end[1]) {
      console.log(`\nYou made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((square) => {
        console.log(square);
      });

      resetdiscovered();
      return;
    }

    const [i, j] = square;

    for (const neighborSquare of boardGraph[i][j].neighbors) {
      const [x, y] = neighborSquare;

      if (!boardGraph[x][y].discovered) {
        queue.push(path.concat([neighborSquare]));
        boardGraph[x][y].discovered = true;
      }
    }
  }
}
