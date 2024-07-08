import Player from './player.js';
import PubSub from './pubsub.js';

class Game {
  constructor () {
    this.PubSub = PubSub;
  }

  init({playersData, autoStart = true, thinkingAI = false}) {
    this.turn = 0;
    this.status = -1;
    this._message = '';
    this.players = [];

    for (const playerData of playersData) {
      this.players.push(new Player(playerData));
    }

    // If first player is AI, the first AI makes a move
    if (autoStart && this.players[0].isAI) {
      this.makeMove(1, this.players[0].getAImove());
    }

    this.thinkingAI = thinkingAI;
    this.message = `Welcome to the battle! Your move, Captain ${this.players[0].name}.`;
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    PubSub.publish('message changed', value);
  }

  async makeMove(targetInd, coor, mockAImove = null) {
    const enemyGameboard = this.oppPlayer.gameboard;
    const [row, col] = coor

    const isGameOver = this.status !== -1;
    const isTargetWrong = this.turn !== 1 - targetInd
    const isAttackDuplicate = enemyGameboard.shots[row][col]

    PubSub.publish('move attempted', {targetInd, coor});

    if (isGameOver || isTargetWrong || isAttackDuplicate) {
      console.log(this.status, isGameOver, isTargetWrong, isAttackDuplicate)
      return Promise.resolve(false);
    }


    const attackRes = enemyGameboard.receiveAttack(coor);

    if (!attackRes) {
      const enemy = this.players[1 - this.turn];
      this.message = enemy.isAI 
                      ? `It's a miss. Captain ${enemy.name} will strike soon.`
                      : `It's a miss. Your move, Captain ${enemy.name}.`
      this.turn ^= 1;

    } else if (enemyGameboard.haveAllShipsSunk()) {
      this.status = this.turn;

      PubSub.publish('gameover', this.turn);
      this.message = `Game over! Captain ${this.players[this.turn].name} has won the game.`;

      return Promise.resolve(true);

    } else if (enemyGameboard.shipMap[row][col].isSunk()) {
      const shipName = enemyGameboard.shipMap[row][col].name;
      this.message = this.players[this.turn].isAI 
                      ? `${shipName} down!`
                      : `${shipName} down! Keep going...`;
    } else {
      this.message = this.players[this.turn].isAI 
                      ? `It's a hit!`
                      : `It's a hit! Keep going...`;
    }

    PubSub.publish('move made', {targetInd, coor});


    if (this.curPlayer.isAI) {
      const targetID = 1 - this.turn;
      const AImove = mockAImove
        ? mockAImove(enemyGameboard)
        : this.curPlayer.getAImove();

      PubSub.publish('AI about to move', {targetID, AImove});

      // Wait for amount of time before AI makes a move
      const time = this.thinkingAI ? 2000 : 0

      return new Promise((resolve) => {
        setTimeout(() => {
          this.makeMove(targetID, AImove, mockAImove).then(resolve);
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
