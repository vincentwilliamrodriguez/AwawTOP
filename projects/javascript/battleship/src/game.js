import Player from './player';

class Game {
  constructor() {
    this.turn = -1;
  }

  initiatePlayers(...playersData) {
    this.players = [];

    for (const playerData of playersData) {
      this.players.push(
        new Player({
          name: playerData.name,
          isAI: playerData.isAI,
        })
      );
    }
  }
}

export default new Game();
