import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from './index.js';

describe('capitalize', () => {
  it('should not throw error', () => {
    expect(() => capitalize()).not.toThrow(Error);
  });

  it('should accept empty input', () => {
    expect(capitalize()).toBe('');
    expect(capitalize('')).toBe('');
  })

  it('should make first letter uppercase', () => {
    const tests = [
      { input: 'awaw', expected: 'Awaw' },
      { input: 'hello', expected: 'Hello' },
      { input: 'What the dog doin', expected: 'What the dog doin' },
      { input: 'javAScript', expected: 'JavAScript' },
    ];

    for (const { input, expected } of tests) {
      expect(capitalize(input)).toStrictEqual(expected);
    }
  });
});
