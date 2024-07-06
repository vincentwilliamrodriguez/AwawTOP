import Ship from './ship.js';

export default class Gameboard {
  constructor() {
    this.init();
  }

  init() {
    // Initializes 10x10 arrays
    this.shots = Array.from({ length: 10 }, (e) => Array(10).fill(false));
    this.shipMap = Array.from({ length: 10 }, (e) => Array(10).fill(null));

    this.ships = [];
  }

  placeShip(shipName, coord, isVertical) {
    const shipCoords = this.getShipLocations(shipName, coord, isVertical);

    if (!this.areShipCoordsLegal(shipCoords)) {
      return false;
    }

    const newShip = new Ship({
      name: shipName,
      length: shipCoords.length,
      firstCoord: shipCoords[0],
      isVertical,
    });

    for (const [row, col] of shipCoords) {
      this.shipMap[row][col] = newShip;
    }

    this.ships.push(newShip);
    return true;
  }

  getShipLocations(shipName, coord, isVertical) {
    const res = [];
    const shipLengths = {
      Carrier: 5,
      Battleship: 4,
      Destroyer: 3,
      Submarine: 3,
      'Patrol Boat': 2,
    };

    const half = shipLengths[shipName] / 2;
    const startDec = Math.ceil(half) - 1;
    const endInc = Math.floor(half);

    // is isVertical is true, main axis is row (index 0 of coords)
    const mainAxis = +!isVertical;

    const cross = coord[1 - mainAxis];
    const mainStart = coord[mainAxis] - startDec;
    const mainEnd = coord[mainAxis] + endInc;

    for (let main = mainStart; main <= mainEnd; main++) {
      const coord = isVertical ? [main, cross] : [cross, main];
      res.push(coord);
    }

    return res;
  }

  areShipCoordsLegal(shipCoords) {
    for (const [row, col] of shipCoords) {
      // checks if out-of-bounds
      if (row < 0 || row >= 10 || col < 0 || col >= 10) {
        return false;
      }

      // checks if overlapping
      if (this.shipMap[row][col] !== null) {
        return false;
      }
    }

    return true;
  }

  receiveAttack([row, col]) {
    const shotBefore = this.shots[row][col];
    const target = this.shipMap[row][col];

    this.shots[row][col] = true;

    if (target instanceof Ship && !shotBefore) {
      target.hit();
      return true;
    }

    return false;
  }

  haveAllShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }

    return true;
  }

  textDisplay() {
    let res = '';

    const RESET = '\u001b[00m';
    const RED = '\u001b[31m';
    const BLACKBG = '\u001b[40m';
    const BLUEBG = '\u001b[44m';

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const char = this.shots[row][col] ? ' x' : '  ';
        res +=
          this.shipMap[row][col] === null
            ? `${BLUEBG}${char}`
            : `${BLACKBG}${RED}${char}`;
      }

      res += `${RESET}\n`;
    }

    res += RESET;
    return res;
  }

  randomlyPlaceShips() {
    this.init();

    const shipNames = [
      'Carrier',
      'Battleship',
      'Destroyer',
      'Submarine',
      'Patrol Boat',
    ];

    for (const shipName of shipNames) {
      let placeRes = false;

      while (!placeRes) {
        const randRow = parseInt(Math.random() * 10);
        const randCol = parseInt(Math.random() * 10);
        const randDir = Math.random() > 0.5;
        placeRes = this.placeShip(shipName, [randRow, randCol], randDir);
      }
    }
  }
}
