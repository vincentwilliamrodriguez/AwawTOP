import Gameboard from './gameboard.js';

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
      this.legalMoves = []

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          this.legalMoves.push([row, col])
        }
      }
    }
  }

  getAImove() {
    if (!this.isAI) {
      return null;
    }

    const randomInd = parseInt(Math.random() * this.legalMoves.length)

    return this.legalMoves[randomInd];
  }
}
