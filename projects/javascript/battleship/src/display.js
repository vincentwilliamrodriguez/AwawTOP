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

class DisplayManager {
  constructor() {
    this.Game = Game;
    this.fogList = [
      Helper.generate2DArray(10, 10, null),
      Helper.generate2DArray(10, 10, null),
    ];
    this.init();
  }

  init() {
    for (let playerID = 0; playerID < 2; playerID++) {

      // Board initialization
      const boardMapElem = $(`.area--${playerID} .board__map`);
      const coorLinesElem = $(`.area--${playerID} .board__coor-lines`);

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

          // Coordinate lines
          cellElem.addEventListener('mouseover', () => {
            coorLinesElem.style.setProperty('--row', row);
            coorLinesElem.style.setProperty('--col', col);
          });

          boardMapElem.appendChild(cellElem);
        }
      }
    }

    this.restart();
  }

  restart() {
    // Restarts game
    Game.init({
      playersData: [
        { isAI: false, name: 'Awp1' },
        { isAI: false, name: 'Awp2' },
      ],
      thinkingAI: true,
    });

    for (let playerID = 0; playerID < 2; playerID++) {

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

        shipElem.classList.add(ship.isVertical ? 'ship--vertical' : 'ship--horizontal');

        boardShipsElem.appendChild(shipElem);
      }

      
      // Game panel ships hover effect
      for (const shipName of shipNames) {
        const panelShipImg = $(`.area--${playerID} .panel-ships img[src*="${shipName}"]`);
        const targetShipImg = $(`.area--${playerID} .ship[data-ship-name="${shipName}"]`);

        panelShipImg.addEventListener('mouseover', () => {
          targetShipImg.classList.add('ship--hover');
        })

        panelShipImg.addEventListener('mouseleave', () => {
          targetShipImg.classList.remove('ship--hover');
        })
      }

      // Fog in the beginning
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const fogElem = this.fogList[playerID][row][col];
          fogElem.className = 'fog';

          if (row === 0)  fogElem.classList.add('fog--top');
          if (row === 9)  fogElem.classList.add('fog--bottom');
          if (col === 0)  fogElem.classList.add('fog--left');
          if (col === 9)  fogElem.classList.add('fog--right');
        }
      }
    }

    this.update();
  }

  update() {
    for (let playerID = 0; playerID < 2; playerID++) {
      const boardData = this.Game.players[playerID].gameboard;
      const cellsList = $(`.area--${playerID} .board__map`).children;

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
              'fog--right': [0, -1]
            }

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
