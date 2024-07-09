import Game from './game.js';
import * as Helper from './helper.mjs';

import crossSVG from './assets/images/cross.svg';
import hitSVG from './assets/images/hit.svg';
import sunkSVG from './assets/images/sunk.svg';

import carrierBoard from './assets/images/ships-board/Carrier-board.png';
import battleshipBoard from './assets/images/ships-board/Battleship-board.png';
import destroyerBoard from './assets/images/ships-board/Destroyer-board.png';
import submarineBoard from './assets/images/ships-board/Submarine-board.png';
import patrolBoatBoard from './assets/images/ships-board/Patrol Boat-board.png';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const SHIP_IMAGES = {
  Carrier: carrierBoard,
  Battleship: battleshipBoard,
  Destroyer: destroyerBoard,
  Submarine: submarineBoard,
  'Patrol Boat': patrolBoatBoard,
};

const shipNames = [
  'Carrier',
  'Battleship',
  'Destroyer',
  'Submarine',
  'Patrol Boat',
];

const shipLengths = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  'Patrol Boat': 2,
};

class DisplayManager {
  constructor() {
    this.Game = Game;
    this.playersData = [
      { isAI: false, name: 'Chester' },
      { isAI: false, name: 'Wally' },
    ];
    this.fogList = [
      Helper.generate2DArray(10, 10, null),
      Helper.generate2DArray(10, 10, null),
    ];
  }

  get humanCount() {
    return this.playersData.filter((player) => !player.isAI).length;
  }

  init() {
    // Home Screen
    $('.modal').showModal();
    $('.home').classList.add('home--active');

    const defaultNames = [
      ['Chester', 'Bobby'],
      ['Paul', 'Wally'],
    ];

    const nameEditHandler = (e) => {
      if (e.which === 13) {
        e.preventDefault();
        document.activeElement.blur();
      }
    };

    for (let playerID = 0; playerID < 2; playerID++) {
      // Regulates names to proper character length
      const nameElem = $(`.player--${playerID} .player__name`);
      nameElem.onkeyup = nameEditHandler;
      nameElem.onkeydown = nameEditHandler;
      nameElem.addEventListener('blur', () => {
        if (nameElem.textContent.length === 0) {
          nameElem.textContent = this.playersData[playerID].name;
        }

        if (nameElem.textContent.length > 12) {
          nameElem.textContent = nameElem.textContent.substring(0, 12);
        }

        this.playersData[playerID].name = nameElem.textContent;
      });

      // Sets name to default when user presses an isAI option
      for (let isAI = 0; isAI < 2; isAI++) {
        const boolString = isAI === 1 ? 'true' : 'false';
        const choiceElem = document.getElementById(
          `isAI-${playerID}-${boolString}`
        );

        choiceElem.addEventListener('click', () => {
          nameElem.textContent = defaultNames[playerID][isAI];
        });
      }
    }

    $('.play-btn').addEventListener('click', () => {
      $('.home').classList.remove('home--active');

      for (let playerID = 0; playerID < 2; playerID++) {
        const isAI =
          $(`input[name="isAI-${playerID}"]:checked`).value === 'true';
        const name = $(`.player--${playerID} .player__name`).textContent;

        this.playersData[playerID] = { isAI, name };
      }

      // Place Screen progression
      const switchToPlaceElem = (playerID, buttonText, next) => {
        const placeElem = $(`.place--${playerID}`);
        placeElem.classList.add('place--active');

        const placeBtnElem = placeElem.querySelector('.place-btn');
        placeBtnElem.textContent = buttonText;

        placeBtnElem.onclick = () => {
          placeElem.classList.remove('place--active');
          next();
        };
      };

      switch (this.humanCount) {
        // Two AIs: straight to Game Screen
        case 0:
          this.restart();
          break;

        // Singleplayer: Only one Place Screen
        case 1:
          for (let playerID = 0; playerID < 2; playerID++) {
            if (!this.playersData[playerID].isAI) {
              switchToPlaceElem(
                playerID,
                'Begin The Battle!',
                this.restart.bind(this)
              );
            }
          }
          break;

        // 1v1: Two Place Screens
        case 2:
          switchToPlaceElem(0, 'Next Player', () => {
            switchToPlaceElem(1, 'Begin The Battle!', this.restart.bind(this));
          });
          break;
      }
    });

    // Place Screen clones
    const placeScreenElem = $('.place');

    for (const playerID of [1, 0]) {
      const placeCloneElem = placeScreenElem.cloneNode(true);
      placeCloneElem.classList.add(`place--${playerID}`);
      placeScreenElem.after(placeCloneElem);

      const placeShips = placeCloneElem.querySelector('.board__ships');

      for (const name of shipNames) {
        const shipElem = Helper.makeElement('img', 'ship', '', {
          src: SHIP_IMAGES[name],
          'data-ship-name': name,
          'data-row': 0,
          'data-col': 0,
        });

        shipElem.style.setProperty('--row', 0);
        shipElem.style.setProperty('--col', 0);
        shipElem.style.setProperty('--length', shipLengths[name]);

        shipElem.classList.add(false ? 'ship--vertical' : 'ship--horizontal');
        shipElem.classList.add('ship--selected');
        shipElem.classList.add('ship--allowed');

        placeCloneElem
          .querySelector('.panel-ship:has(img[src*=Carrier])')
          .classList.add('panel-ship--selected');

        if (name !== 'Carrier') {
          shipElem.classList.add('ship--hidden');
        }

        placeShips.appendChild(shipElem);
      }
    }

    // Game Screen & Place Screen boards
    for (let playerID = 0; playerID < 2; playerID++) {
      // Board initialization
      const boardMapElem = $(`.area--${playerID} .board__map`);
      const coorLinesElem = $(`.area--${playerID} .board__coor-lines`);

      const placeBoardMapElem = $(`.place--${playerID} .board__map`);

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          // Board map cells
          const cellData = {
            'data-id': playerID,
            'data-row': row,
            'data-col': col,
          };
          const cellElem = Helper.makeElement('div', 'cell', '', cellData);

          // Cell state
          const cellStateElem = Helper.makeElement('img', 'cell__state');
          cellElem.appendChild(cellStateElem);

          // Fog
          const fogElem = Helper.makeElement('div', 'fog', '');
          this.fogList[playerID][row][col] = fogElem;
          cellElem.appendChild(fogElem);

          // Coordinate lines (only applies if opposing side is not AI)
          cellElem.addEventListener('mouseover', () => {
            if (!Game.players[1 - playerID].isAI) {
              coorLinesElem.style.setProperty('--row', row);
              coorLinesElem.style.setProperty('--col', col);
            }
          });

          boardMapElem.appendChild(cellElem);
          placeBoardMapElem.appendChild(cellElem.cloneNode(true));

          // Attack mechanism
          cellElem.addEventListener('click', () => {
            Game.makeMove(playerID, [row, col]);
          });
        }
      }
    }

    // Subscriptions
    Game.PubSub.subscribe('move attempted', (data) => {
      this.update();
    });

    Game.PubSub.subscribe('move made', (data) => {
      this.update();
    });

    Game.PubSub.subscribe('gameover', (winner) => {
      this.update();
      $('.game').classList.add('game--over')
    });

    Game.PubSub.subscribe('message changed', (value) => {
      const messageElem = $('.message-box__text');
      messageElem.style.animation = 'none'
        messageElem.textContent = value;
        messageElem.style.animation = 'none';
        messageElem.offsetHeight;
        messageElem.style.animation = null;
      
    });

    Game.PubSub.subscribe('AI about to move', ({newTarget, AImove: [row, col], time}) => {
      const coorLinesElem = $(`.area--${newTarget} .board__coor-lines`);
      coorLinesElem.style.setProperty('--speed', `${0.9 * time / 1000}s`);

      setTimeout(() => {
        coorLinesElem.style.setProperty('--row', row);
        coorLinesElem.style.setProperty('--col', col);
      }, 100);
    })
  }

  restart() {
    // Switches active screen to game screen
    $('.modal').close();
    $('.game').classList.add('game--active');

    // Restarts game
    Game.init({
      playersData: this.playersData,
      thinkingAI: true,
    });

    this.printBoardStates();

    for (let playerID = 0; playerID < 2; playerID++) {

      // Resets Game Screen elements
      $(`.game`).className = 'game game--active';

      $(`.area--${playerID} .board__ships`).textContent = '';
      $(`.area--${playerID} .area__name`).textContent = Game.players[playerID].name;

      const areaElem = $(`.area--${playerID}`)
      const isAItext = Game.players[1 - playerID].isAI ? 'ai' : 'human';
      areaElem.className = `area area--${playerID} area--vs-${isAItext}`;

      if (playerID === 0) {
        areaElem.classList.add('area--turn');
      }

      switch (this.humanCount) {
        case 1:
          if (!Game.players[playerID].isAI) {
            areaElem.classList.add('area--pov');
          }
          break;
        
        case 0:
        case 2:
          if (playerID === 0) {
            areaElem.classList.add('area--pov');
          }
          break;
      }


      $$(`.area--${playerID} .fog`).forEach((fogElem) => {
        fogElem.className = 'fog';
      });

      $$(`.game .panel-ship`).forEach((panelShipElem) => {
        panelShipElem.className = 'panel-ship';
      });

      // Places ships in the beginning
      const boardShipsElem = $(`.area--${playerID} .board__ships`);

      for (const ship of Game.players[playerID].gameboard.ships) {
        const shipElem = Helper.makeElement('img', 'ship', '', {
          src: SHIP_IMAGES[ship.name],
          'data-ship-name': ship.name,
          'data-row': ship.firstCoord[0],
          'data-col': ship.firstCoord[1],
        });

        shipElem.style.setProperty('--row', ship.firstCoord[0]);
        shipElem.style.setProperty('--col', ship.firstCoord[1]);
        shipElem.style.setProperty('--length', ship.length);

        shipElem.classList.add(
          ship.isVertical ? 'ship--vertical' : 'ship--horizontal'
        );

        boardShipsElem.appendChild(shipElem);
      }

      // Game panel ships hover effect
      for (const shipName of shipNames) {
        const panelShipImg = $(
          `.area--${playerID} .panel-ships img[src*="${shipName}"]`
        );
        const targetShipImg = $(
          `.area--${playerID} .ship[data-ship-name="${shipName}"]`
        );

        panelShipImg.addEventListener('mouseover', () => {
          targetShipImg.classList.add('ship--hover');
        });

        panelShipImg.addEventListener('mouseleave', () => {
          targetShipImg.classList.remove('ship--hover');
        });
      }

      // Fog in the beginning
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const fogElem = this.fogList[playerID][row][col];
          fogElem.className = 'fog';

          if (row === 0) fogElem.classList.add('fog--top');
          if (row === 9) fogElem.classList.add('fog--bottom');
          if (col === 0) fogElem.classList.add('fog--left');
          if (col === 9) fogElem.classList.add('fog--right');
        }
      }
    }

    this.update();
  }

  update() {
    for (let playerID = 0; playerID < 2; playerID++) {
      const boardData = this.Game.players[playerID].gameboard;
      const cellsList = $(`.area--${playerID} .board__map`).children;

      // Turn indicator
      $('.area--turn').classList.remove('area--turn');
      $$('.area')[Game.turn].classList.add('area--turn');

      if (this.humanCount !== 1) {
        $('.area--pov').classList.remove('area--pov');
        $$('.area')[Game.turn].classList.add('area--pov');
      }

      // Sunk
      for (const ship of Game.players[playerID].gameboard.ships) {
        if (ship.isSunk()) {
          const boardShipElem = $(`.area--${playerID} .ship[data-ship-name="${ship.name}"]`);
          const panelShipElem = $(`.area--${playerID} .panel-ship:has(img[src*="${ship.name}"])`);
          
          boardShipElem.classList.add('ship--sunk');
          panelShipElem.classList.add('panel-ship--sunk');
        }
      }


      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const cellElem = cellsList.item(10 * row + col);

          // Shots
          if (boardData.shots[row][col]) {
            const ship = boardData.shipMap[row][col];
            const newState =
              ship === null ? crossSVG : ship.isSunk() ? sunkSVG : hitSVG;

            cellElem
              .querySelector('.cell__state')
              .setAttribute('src', newState);

            // Updates fogs
            this.fogList[playerID][row][col].classList.add('fog--hidden');

            const fogDirections = {
              'fog--top': [1, 0],
              'fog--left': [0, 1],
              'fog--bottom': [-1, 0],
              'fog--right': [0, -1],
            };

            for (const [dirName, dir] of Object.entries(fogDirections)) {
              const rowNew = row + dir[0];
              const colNew = col + dir[1];

              if (!(rowNew < 0 || rowNew >= 10 || colNew < 0 || colNew >= 10)) {
                this.fogList[playerID][rowNew][colNew].classList.add(dirName);
              }
            }
          } else {
            cellElem.querySelector('.cell__state').setAttribute('src', '');
          }
        }
      }
    }
  }

  printBoardStates() {
    for (const player of Game.players) {
      console.log(player.name);
      console.log(player.gameboard.textDisplay());
      console.log(' ');
    }
  }
}

export default new DisplayManager();
