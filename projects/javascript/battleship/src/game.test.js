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
      thinkingAI: true,
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
    const mockAImove = jest.fn((enemyGameboard) => {
      return enemyGameboard === Game.players[1].gameboard ? [3, 3] : [4, 3];
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

describe('makeMove() for AI vs AI', () => {
  beforeAll(() => {
    const testGameboard1 = new Gameboard();
    testGameboard1.placeShip('Patrol Boat', [3, 3], true);

    const testGameboard2 = new Gameboard();
    testGameboard2.placeShip('Patrol Boat', [1, 2], false);

    Game.init({
      playersData: [
        { isAI: true, name: 'Bot1', gameboard: testGameboard1 },
        { isAI: true, name: 'Bot2', gameboard: testGameboard2 },
      ],
      autoStart: false,
    });
  });

  it('should eventually end', async () => {
    Game.makeMove(1, Game.players[0].getAImove()).then(() => {
      expect(Game.status).not.toBe(-1);
    });
  });
});