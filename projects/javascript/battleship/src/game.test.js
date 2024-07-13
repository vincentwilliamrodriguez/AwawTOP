import Game from './game';
import Gameboard from './gameboard';
import * as Helper from './helper';
import { jest } from '@jest/globals';

describe('init()', () => {
  const testInit = (data) => {
    Game.init(...data.inputs);
    expect(Game.players[0].isAI).toStrictEqual(
      data.inputs[0].playersData[0].isAI
    );
    expect(Game.players[1].name).toStrictEqual(
      data.inputs[0].playersData[1].name
    );
  };

  Helper.runGeneralTests(testInit.bind(Game), [
    {
      it: 'should initiate human vs human',
      inputs: [
        {
          playersData: [
            { isAI: false, name: 'Awp' },
            { isAI: false, name: 'Awp2' },
          ],
        },
      ],
    },
    {
      it: 'should initiate human vs AI',
      inputs: [
        {
          playersData: [
            { isAI: false, name: 'Awp' },
            { isAI: true, name: 'Bot' },
          ],
        },
      ],
    },
    {
      it: 'should initiate AI vs AI',
      inputs: [
        {
          playersData: [
            { isAI: true, name: 'Bot1' },
            { isAI: true, name: 'Bot2' },
          ],
          autoStart: false,
        },
      ],
    },
  ]);
});

describe('makeMove() for human vs AI', () => {
  beforeAll(() => {
    const testGameboard1 = new Gameboard();
    testGameboard1.placeShip('Patrol Boat', [3, 3], true);

    const testGameboard2 = new Gameboard();
    testGameboard2.placeShip('Patrol Boat', [1, 2], false);

    Game.init({
      playersData: [
        { isAI: false, name: 'Awp', gameboard: testGameboard1 },
        { isAI: true, name: 'Bot', gameboard: testGameboard2 },
      ],
      thinkingAI: false,
    });
  });

  it('should register a valid move', () => {
    Game.makeMove(1, [1, 2]);
    expect(Game.players[1].gameboard.shots[1][2]).toBeTruthy();
  });

  it('should repeat when a hit is made', () => {
    expect(Game.turn).toBe(0);
  });

  it('should let AI move when the move missed', async () => {
    const mockAImove = jest.fn((isTurnRepeated) => {
      return isTurnRepeated ? [3, 3] : [4, 3];
    });

    await Game.makeMove(1, [2, 2], mockAImove);

    expect(Game.players[0].gameboard.shots[3][3]).toBeTruthy();
    expect(Game.players[0].gameboard.shots[4][3]).toBeTruthy();
  });

  it('should register victory by one side', () => {
    expect(Game.status).toBe(1);
  });

  it('should not make move when the game is over', async () => {
    expect(await Game.makeMove(1, [5, 5])).toBeFalsy();
  });
});

// describe('makeMove() for AI vs AI', () => {
//   beforeAll(() => {
//     const testGameboard1 = new Gameboard();
//     testGameboard1.placeShip('Patrol Boat', [3, 3], true);

//     const testGameboard2 = new Gameboard();
//     testGameboard2.placeShip('Patrol Boat', [1, 2], false);

//     Game.init({
//       playersData: [
//         { isAI: true, name: 'Bot1', gameboard: testGameboard1 },
//         { isAI: true, name: 'Bot2', gameboard: testGameboard2 },
//       ],
//       autoStart: false,
//       thinkingAI: false
//     });
//   });

//   it('should eventually end', async () => {
//     Game.makeMove(1, Game.players[0].getAImove()).then(() => {
//       expect(Game.status).not.toBe(-1);
//     });
//   });
// });

describe('AI algorithm', () => {
  const AImoveHistory = [];

  beforeAll(() => {
    const testGameboard1 = new Gameboard();
    testGameboard1.placeShip('Carrier', [1, 2], false);
    testGameboard1.placeShip('Battleship', [3, 1], true);
    testGameboard1.placeShip('Patrol Boat', [7, 1], false);

    const testGameboard2 = new Gameboard();
    testGameboard2.placeShip('Patrol Boat', [1, 2], false);

    Game.init({
      playersData: [
        { isAI: false, name: 'Awp', gameboard: testGameboard1 },
        { isAI: true, name: 'Bot', gameboard: testGameboard2 },
      ],
      autoStart: false,
      thinkingAI: false,
    });

    Game.PubSub.subscribe('move made', ({ targetInd, coor }) => {
      if (targetInd === 0) {
        AImoveHistory.push(coor);
      }
    });
  });


  it('should add to the targetStack correctly', async () => {
    let isMockDone = false;

    const mockAImove = jest.fn(() => {
      const res = isMockDone ? Game.curPlayer.getAImove() : [3, 1];

      isMockDone = true;
      return res;
    });

    await Game.makeMove(1, [0, 0], mockAImove);

    const stack = Game.players[1].targetStack.slice(0, 2);
    const stackCoords = stack.map((datum) => datum.coor);
    const stackPriorities = stack.map((datum) => datum.priority);

    expect(stackCoords).toStrictEqual([
      [3, 2],
      [3, 0],
    ]);
    expect(stackPriorities).toStrictEqual([
      [0, 1],
      [0, -1],
    ]);
  });


  it('should correctly pick moves', () => {
    expect(AImoveHistory).toStrictEqual([
      [3, 1],
      [2, 1],
      [1, 1],
      [0, 1],
    ]);
  });

  it('should prioritize old second priority moves', async () => {
    await Game.makeMove(1, [0, 1]);

    expect(AImoveHistory.slice(4, 6)).toStrictEqual([
      [4, 1],
      [5, 1],
    ]);
  })

  it('should update targets correctly when a ship sinks', async () => {
    const mockAImove = jest.fn(() => {
      return (AImoveHistory.length < 11) ? Game.curPlayer.getAImove() : [9, 9];
    });


    await Game.makeMove(1, [0, 2], mockAImove);

    expect(AImoveHistory.slice(8, 11)).toStrictEqual([
      [1, 2],
      [1, 3],
      [1, 4],
    ]);
  });

  it('should know 2-tile parity', () => {
    let res = true;

    for (let i = 0; i < 1000; i++) {
      const [row, col] = Game.players[1].getRandomMove();

      if ((row % 2) !== (col % 2)) {
        res = false;
        break;
      }
    }

    expect(res).toBeTruthy();
  })
});
