import Gameboard from './gameboard.js';
import { generate2DArray } from './helper.mjs';

export default class Player {
  constructor(options) {
    this.gameboard = new Gameboard();
    this.gameboard.randomlyPlaceShips();

    Object.assign(
      this,
      {
        name: 'Awaw',
        isAI: false,
      },
      options
    );

    if (this.isAI) {
      this.activeHits = generate2DArray(10, 10, false);
      this.targetMap = generate2DArray(10, 10, false);
      this.targetStack = [];
      this.latestPriority = [-1, 0];
      this.randomMovesList = [];

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (row % 2 === col % 2) {
            this.randomMovesList.push([row, col]);
          }
        }
      }
    }
  }

  getAImove() {
    if (!this.isAI) {
      return null;
    }

    console.log(
      'awaw',
      this.randomMovesList,
      this.targetStack.map((item) => item.coor)
    );

    let move;

    if (this.targetStack.length === 0) {
      move = this.getRandomMove();
      console.log('random');
    } else {
      const prioritizedTarget = this.targetStack.pop();

      move = prioritizedTarget.coor;
      this.latestPriority = prioritizedTarget.priority;

      const [row, col] = move;
      this.targetMap[row][col] = false;
      console.log('from targetStack');
    }

    this.randomMovesList = this.randomMovesList.filter((legal) => {
      const [row1, col1] = legal;
      const [row2, col2] = move;
      return !(row1 === row2 && col1 === col2);
    });

    console.log(this.name, 'move', String(move), '\n');
    return move;
  }

  getRandomMove() {
    const randomInd = Math.floor(Math.random() * this.randomMovesList.length);
    return this.randomMovesList[randomInd];
  }

  isInBounds([row, col]) {
    return 0 <= row && row < 10 && 0 <= col && col < 10;
  }

  getNeighbors([row, col], priority) {
    let neighborDiffs;
    const neighbors = [];

    switch (String(priority)) {
      case '-1,0':
        neighborDiffs = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ];
        break;

      case '1,0':
        neighborDiffs = [
          [0, 1],
          [0, -1],
          [-1, 0],
          [1, 0],
        ];
        break;

      case '0,1':
        neighborDiffs = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ];
        break;

      case '0,-1':
        neighborDiffs = [
          [-1, 0],
          [1, 0],
          [0, 1],
          [0, -1],
        ];
        break;
    }

    for (const [rowDiff, colDiff] of neighborDiffs) {
      const newCoor = [row + rowDiff, col + colDiff];

      if (this.isInBounds(newCoor)) {
        neighbors.push({
          coor: newCoor,
          priority: [rowDiff, colDiff],
        });
      }
    }

    return neighbors;
  }

  addToTargetStack({ hitCoor, shotsOnEnemy }) {
    const neighbors = this.getNeighbors(hitCoor, this.latestPriority);
    const newTargets = [];

    for (const neighbor of neighbors) {
      const [row, col] = neighbor.coor;

      // Filters out those already in the stack or shot
      if (!this.targetMap[row][col] && !shotsOnEnemy[row][col]) {
        newTargets.push(neighbor);
        this.targetMap[row][col] = true;
      }
    }

    const firstPriority = newTargets.pop();
    const secondPriority = this.targetStack.pop();

    this.targetStack = [...this.targetStack, ...newTargets];

    for (const target of [secondPriority, firstPriority]) {
      if (target !== undefined) {
        this.targetStack.push(target);
      }
    }
  }

  updateActiveHits([row, col]) {
    this.activeHits[row][col] = true;
  }

  cleanTargetStack({ shipCoords }) {
    const targetFilter = generate2DArray(10, 10, false);

    // Disactivates hits covered by the sunk ship
    for (const [row, col] of shipCoords) {
      this.activeHits[row][col] = false;
    }

    // Creates a target filter based on surviving active hits
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.activeHits[row][col]) {
          const neighbors = this.getNeighbors([row, col], [-1, 0]);

          for (const {
            coor: [newRow, newCol],
          } of neighbors) {
            targetFilter[newRow][newCol] = true;
          }
        }
      }
    }

    // Updates current targetMap based on stack filter
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        this.targetMap[row][col] =
          this.targetMap[row][col] && targetFilter[row][col];
      }
    }

    // Cleans targetStack items not in targetMap
    const newTargetStack = [];

    for (const target of this.targetStack) {
      const [row, col] = target.coor;

      if (this.targetMap[row][col]) {
        newTargetStack.push(target);
      }
    }

    this.targetStack = structuredClone(newTargetStack);
  }
}
