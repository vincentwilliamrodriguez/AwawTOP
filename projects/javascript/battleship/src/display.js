import Game from './game.js';

class DisplayManager {
  constructor() {
    this.Game = Game;

    Game.init({
      playersData: [
        { isAI: false, name: 'Awp'},
        { isAI: true, name: 'Bot'},
      ],
      thinkingAI: true,
    });
  }

  printBoardStates() {
    for (const player of Game.players) {
      console.log(player.name)
      console.log(player.gameboard.textDisplay())
      console.log(' ')
    }
  }
}

export default new DisplayManager();
