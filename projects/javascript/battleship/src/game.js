import Player from './player.js';
import PubSub from './pubsub.js';

class Game {
  constructor () {
    this.PubSub = PubSub;
  }

  init({playersData, autoStart = true, thinkingAI = false}) {
    this.turn = 0;
    this.status = -1;
    this.message = '';
    this.players = [];

    for (const playerData of playersData) {
      this.players.push(new Player(playerData));
    }

    // If both players are AI, the first AI makes a move
    if (autoStart && this.players.every((player) => player.isAI)) {
      this.makeMove(1, this.players[0].getAImove());
    }

    this.thinkingAI = thinkingAI;
  }

  async makeMove(targetInd, coor, mockAImove = null) {
    const enemyGameboard = this.oppPlayer.gameboard;
    const [row, col] = coor

    const isGameOver = this.status !== -1;
    const isTargetWrong = this.turn !== 1 - targetInd
    const isAttackDuplicate = enemyGameboard.shots[row][col]

    PubSub.publish('move made', {targetInd, coor});

    if (isGameOver || isTargetWrong || isAttackDuplicate) {
      console.log(this.status, isGameOver, isTargetWrong, isAttackDuplicate)
      return Promise.resolve(false);
    }

    const attackRes = enemyGameboard.receiveAttack(coor);


    if (!attackRes) {
      this.turn ^= 1;
    } else if (enemyGameboard.haveAllShipsSunk()) {

      this.status = this.turn;
      PubSub.publish('gameover', this.turn);

      return Promise.resolve(true);
    }

    if (this.curPlayer.isAI) {
      const AImove = mockAImove
        ? mockAImove(enemyGameboard)
        : this.curPlayer.getAImove();

      // Wait for amount of time before AI makes a move
      const time = this.thinkingAI ? 1000 : 0

      return new Promise((resolve) => {
        setTimeout(() => {
          this.makeMove(1 - this.turn, AImove, mockAImove).then(resolve);
        }, time);
      });
    } else {
      return Promise.resolve(true);
    }
  }

  get curPlayer() {
    return this.players[this.turn];
  }

  get oppPlayer() {
    return this.players[1 - this.turn];
  }
}

export default new Game();
