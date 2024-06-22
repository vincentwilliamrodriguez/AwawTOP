import { sum } from './sum.js';

function awaw() {
  return ['doge', 'awaw'];
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).toBe(3);
});

describe('awaw()', () => {
  it('has awaw', () => {
    expect(awaw()).toContain('awaw');
  });
});
