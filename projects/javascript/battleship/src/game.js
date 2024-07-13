import Player from './player.js';
import PubSub from './pubsub.js';

class Game {
  constructor () {
    this.PubSub = PubSub;
  }

  init({playersData, autoStart = true, thinkingAI = false, thinkingTime = 2000}) {
    this.turn = 0;
    this.status = -1;
    this._message = '';
    this.players = [];

    for (let i = 0; i < 2; i++) {
      const playerData = playersData[i];
      const playerObject = new Player(playerData);

      if (playerData.isAI) {
        
        PubSub.subscribe('AI hit', (data) => {
          if (data.turn === i) {
            playerObject.addToTargetStack(data);
          }
        });

        PubSub.subscribe('AI sinks ship', (data) => {
          if (data.turn === i) {
            playerObject.cleanTargetStack(data);
          }
        });
      }

      this.players.push(playerObject);
    }

    // If first player is AI, the first AI makes a move
    if (autoStart && this.players[0].isAI) {
      setTimeout(() => {
        this.makeAImove({ targetInd: 1 });
      }, 2000);
    }


    this.thinkingAI = thinkingAI;
    this.thinkingTime = thinkingTime;
    this.message = this.players[0].isAI
                    ? `Welcome to the battle! It is Captain ${this.players[0].name}'s turn.`
                    : `Welcome to the battle! Your move, Captain ${this.players[0].name}.`;
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
      console.log('Move blocked: ', isGameOver, isTargetWrong, isAttackDuplicate, coor)
      return Promise.resolve(false);
    }


    const attackRes = enemyGameboard.receiveAttack(coor);

    if (this.curPlayer.isAI && attackRes) {
      this.curPlayer.updateActiveHits(coor);
    }

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
      const shipCoords = enemyGameboard.shipMap[row][col].shipCoords;
      this.message = this.players[this.turn].isAI 
                      ? `${shipName} down!`
                      : `${shipName} down! Keep going...`;
      
      PubSub.publish('AI sinks ship', {
        hitCoor: coor,
        shipCoords,
        turn: this.turn
      });

    } else {
      this.message = this.players[this.turn].isAI 
                      ? `It's a hit!`
                      : `It's a hit! Keep going...`;
      
      PubSub.publish('AI hit', {
        hitCoor: coor,
        shotsOnEnemy: enemyGameboard.shots,
        turn: this.turn
      });
    }

    PubSub.publish('move made', {targetInd, coor, hasTurnChanged: !attackRes});


    if (this.curPlayer.isAI) {
      return this.makeAImove({targetInd, mockAImove, hasTurnChanged: !attackRes});
    } else {
      return Promise.resolve(true);
    }
  }

  makeAImove({targetInd, mockAImove = null, hasTurnChanged = false}) {
    const newTarget = 1 - this.turn;
    const AImove = mockAImove
      ? mockAImove(targetInd === this.turn)
      : this.curPlayer.getAImove();

    // Wait for amount of time before AI makes a move
    const time = !this.thinkingAI 
                  ? 0 
                  : targetInd === this.turn 
                    ? this.thinkingTime 
                    : 0.5 * this.thinkingTime;

    PubSub.publish('AI about to move', { newTarget, AImove, time, hasTurnChanged });

    return new Promise((resolve) => {
      setTimeout(() => {
        this.makeMove(newTarget, AImove, mockAImove).then(resolve);
      }, time);
    });
  }

  get curPlayer() {
    return this.players[this.turn];
  }

  get oppPlayer() {
    return this.players[1 - this.turn];
  }
}

export default new Game();
