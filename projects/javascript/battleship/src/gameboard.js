import Ship from './ship.js';

export default class Gameboard {
  constructor() {
    // Initializes 10x10 arrays
    this.ships = Array(10).fill(Array(10).fill(null));
    this.shots = Array(10).fill(Array(10).fill(false));
  }

  placeShip(shipName, coords, isVertical) {
    return true;
  }

  getShipLocations(shipName, coords, isVertical) {
    const res = []
    const shipLengths = {
      'Carrier': 5,
      'Battleship': 4,
      'Destroyer': 3,
      'Submarine': 3,
      'Patrol Boat': 2,
    }

    const half = shipLengths[shipName] / 2;
    const startDec = Math.ceil(half) - 1;
    const endInc = Math.floor(half);

    // is isVertical is true, main axis is row (index 0 of coords)
    const mainAxis = +!isVertical;

    const cross = coords[1 - mainAxis];
    const mainStart = coords[mainAxis] - startDec;
    const mainEnd = coords[mainAxis] + endInc;

    for (let main = mainStart; main <= mainEnd; main++) {
      const coord = isVertical
                      ? [main, cross]
                      : [cross, main]
      res.push(coord)
    }

    return res;
  }
}
