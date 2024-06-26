import Game from './game';
import * as Helper from './helper';

describe('initiatePlayers', () => {
  const testInitiatePlayers = (data) => {
    Game.initiatePlayers(...data.inputs);
    expect(Game.players[0].isAI).toStrictEqual(data.inputs[0].isAI);
    expect(Game.players[1].name).toStrictEqual(data.inputs[1].name);
  };

  Helper.runGeneralTests(testInitiatePlayers.bind(Game), [
    {
      it: 'should initiate human vs human',
      inputs: [
        { isAI: false, name: 'Awp' },
        { isAI: false, name: 'Awp2' },
      ],
    },
    {
      it: 'should initiate human vs AI',
      inputs: [
        { isAI: false, name: 'Awp' },
        { isAI: true, name: 'Bot' },
      ],
    },
    {
      it: 'should initiate AI vs AI',
      inputs: [
        { isAI: true, name: 'Bot1' },
        { isAI: true, name: 'Bot2' },
      ],
    },
  ]);
});
