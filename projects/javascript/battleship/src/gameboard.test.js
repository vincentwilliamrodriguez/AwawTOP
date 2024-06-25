import Gameboard from './gameboard';
import * as Helper from './helper.mjs';

describe('Gameboard', () => {
  const testGameboard = new Gameboard();

  describe('getShipLocations', () => {
    Helper.runEqualityTests(testGameboard.getShipLocations, [
      {
        it: 'should correctly locate horizontal ships',
        inputs: ['Patrol Boat', [0, 0], false],
        expected: [
          [0, 0],
          [0, 1],
        ],
      },
      {
        it: 'should correctly locate vertical ships',
        inputs: ['Patrol Boat', [1, 0], true],
        expected: [
          [1, 0],
          [2, 0],
        ],
      },
      {
        it: 'should correctly locate Submarine',
        inputs: ['Submarine', [1, 1], false],
        expected: [
          [1, 0],
          [1, 1],
          [1, 2],
        ],
      },
      {
        it: 'should correctly locate Destroyer',
        inputs: ['Destroyer', [1, 2], false],
        expected: [
          [1, 1],
          [1, 2],
          [1, 3],
        ],
      },
      {
        it: 'should correctly locate Battleship',
        inputs: ['Battleship', [1, 1], true],
        expected: [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
        ],
      },
      {
        it: 'should correctly locate Carrier',
        inputs: ['Carrier', [2, 1], true],
        expected: [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
        ],
      },
    ]);
  });

  describe('placeShip', () => {
    it('should place horizontal ships properly', () => {
      const placeRes = testGameboard.placeShip('Patrol Boat');

      // expect(placeRes).toBeTruthy();
      // expect(testGameboard.ships[0][0]).not.toBe(null);
      // expect(testGameboard.ships[0][1]).not.toBe(null);
      // expect(testGameboard.ships[0][2]).not.toBe(null);
    });
  });
});
