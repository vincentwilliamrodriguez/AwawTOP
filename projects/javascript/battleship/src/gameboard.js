import Ship from './ship.js';

export default class Gameboard {
  constructor() {
    // Initializes 10x10 arrays
    this.shipMap = Array.from({ length: 10 }, (e) => Array(10).fill(null));
    this.shots = Array.from({ length: 10 }, (e) => Array(10).fill(false));

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
    this.shots[row][col] = true;

    const target = this.shipMap[row][col];

    if (target instanceof Ship) {
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
    let res = ''

    const RESET = "\u001b[00m";
    const RED = "\u001b[31m";
    const BLACKBG = "\u001b[40m";
    const BLUEBG = "\u001b[44m";

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const char = this.shots[row][col] ? ' x ' : '   '
        res += (this.shipMap[row][col] === null)
                  ? `${BLUEBG}${char}`
                  : `${BLACKBG}${RED}${char}`
      }

      res += `${RESET}\n`
    }
    
    res += RESET;
    return res;
  }
}
