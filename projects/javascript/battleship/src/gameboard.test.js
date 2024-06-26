import Gameboard from './gameboard';
import * as Helper from './helper.mjs';

describe('Gameboard', () => {
  const gameboard = new Gameboard();

  describe('getShipLocations()', () => {
    Helper.runEqualityTests(gameboard.getShipLocations.bind(gameboard), [
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

  describe('areShipCoordsLegal()', () => {
    beforeAll(() => {
      gameboard.shipMap[0][2] = 1;
    });

    // afterAll(() => {
    //   gameboard.shipMap[0][2] = null;
    // });

    Helper.runEqualityTests(gameboard.areShipCoordsLegal.bind(gameboard), [
      {
        it: 'should recognize inbounds',
        inputs: [
          [
            [0, 0],
            [1, 0],
          ],
        ],
        expected: true,
      },
      {
        it: 'should recognize out-of-bounds #1',
        inputs: [
          [
            [-1, 0],
            [0, 0],
          ],
        ],
        expected: false,
      },
      {
        it: 'should recognize out-of-bounds #2',
        inputs: [
          [
            [0, 9],
            [0, 10],
          ],
        ],
        expected: false,
      },
      {
        it: 'should recognize overlapping',
        inputs: [
          [
            [0, 1],
            [0, 2],
          ],
        ],
        expected: false,
      },
    ]);
  });

  describe('placeShip()', () => {
    const testPlaceShip = (test) => {
      const placeRes = gameboard.placeShip(...test.inputs);
      const shipCoords = gameboard.getShipLocations(...test.inputs);

      expect(placeRes).toStrictEqual(test.expected);

      if (test.expected === true) {
        for (const [row, col] of shipCoords) {
          expect(gameboard.shipMap[row][col]).not.toBe(null);
          expect(gameboard.shipMap[row][col].name).toBe(test.inputs[0]);
        }

        expect(gameboard.ships.length).toBeGreaterThan(0);
      }
    };

    Helper.runGeneralTests(testPlaceShip.bind(gameboard), [
      {
        it: 'should place horizontal ships properly',
        inputs: ['Patrol Boat', [0, 0], false],
        expected: true,
      },
      {
        it: 'should place vertical ships properly',
        inputs: ['Carrier', [3, 0], true],
        expected: true,
      },
      {
        it: 'should not overlap ships',
        inputs: ['Carrier', [3, 2], false],
        expected: false,
      },
    ]);
  });

  describe('receiveAttack()', () => {
    const testReceiveAttack = (test) => {
      const attackResult = gameboard.receiveAttack(...test.inputs);
      const [row, col] = test.inputs[0];

      expect(attackResult).toStrictEqual(test.expected);
      expect(gameboard.shots[row][col]).toBeTruthy();

      if (test.expected === true) {
        expect(gameboard.shipMap[row][col].hits).toBeGreaterThan(0);
      }
    };

    Helper.runGeneralTests(testReceiveAttack.bind(gameboard), [
      {
        it: 'should register hits',
        inputs: [[0, 0]],
        expected: true,
      },
      {
        it: 'should register misses',
        inputs: [[2, 2]],
        expected: false,
      },
    ]);
  });

  describe('haveAllShipsSunk()', () => {
    it('should correctly report false', () => {
      expect(gameboard.haveAllShipsSunk()).toBeFalsy();
    });

    it('should correctly report true', () => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          gameboard.receiveAttack([i, j]);
        }
      }
      expect(gameboard.haveAllShipsSunk()).toBeTruthy();
    });
  });
});
