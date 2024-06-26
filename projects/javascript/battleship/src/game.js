import Player from './player';

class Game {
  constructor() {
    this.turn = 0;
    this.status = -1;
    this.message = '';
  }

  initiatePlayers(...playersData) {
    this.players = [];

    for (const playerData of playersData) {
      this.players.push(new Player(playerData));
    }
  }

  makeMove(coor, mockAImove = null) {
    if (this.status !== -1) {
      return false;
    }

    const enemyGameboard = this.oppPlayer.gameboard;
    const attackRes = enemyGameboard.receiveAttack(coor);

    if (!attackRes) {
      const prevPlayer = this.curPlayer
      this.turn ^= 1;

      if (prevPlayer.isAI) {
        return true;
      }

    } else if (enemyGameboard.haveAllShipsSunk()) {
      this.status = this.turn;
      return true;
    }

    if (this.curPlayer.isAI) {
      const AImove = mockAImove
                      ? mockAImove(enemyGameboard)
                      : this.curPlayer.getAImove();

      this.makeMove(AImove, mockAImove);
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
