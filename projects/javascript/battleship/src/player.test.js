import Player from './player';

const human = new Player();
const bot = new Player({
  isAI: true,
});

describe('getAImove()', () => {
  it('should be allowed for bots', () => {
    expect(bot.getAImove()).toBeTruthy();
    expect(bot.getAImove()).toBeInstanceOf(Array);
  });

  it('should be not allowed for humans', () => {
    expect(human.getAImove()).toBeFalsy();
  });
});
