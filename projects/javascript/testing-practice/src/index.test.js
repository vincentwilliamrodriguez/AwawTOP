import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from './index.js';


describe('capitalize', () => {
  it('should accept empty input', () => {
    expect(capitalize()).toBe('');
    expect(capitalize('')).toBe('');
  });

  it('should make first letter uppercase', () => {
    const tests = [
      { input: 'awaw', expected: 'Awaw' },
      { input: 'hello', expected: 'Hello' },
      { input: 'What the dog doin', expected: 'What the dog doin' },
      { input: 'javAScript', expected: 'JavAScript' },
      { input: '!!avAScript', expected: '!!avAScript' },
    ];

    for (const { input, expected } of tests) {
      expect(capitalize(input)).toStrictEqual(expected);
    }
  });
});

describe('reverseString', () => {
  it('should accept empty input', () => {
    expect(reverseString()).toBe('');
    expect(reverseString('')).toBe('');
  });

  it('should reverse string', () => {
    const tests = [
      { input: 'awaw', expected: 'wawa' },
      { input: 'hello', expected: 'olleh' },
      { input: 'sco1obY', expected: 'Ybo1ocs' },
      { input: 'javAScript', expected: 'tpircSAvaj' },
    ];

    for (const { input, expected } of tests) {
      expect(reverseString(input)).toStrictEqual(expected);
    }
  });
});

describe('calculator', () => {
  it('should take two numbers', () => {
    const tests = [[], [''], ['', ''], ['', 5], [null]];

    for (const input of tests) {
      for (const operation of Object.values(calculator)) {
        expect(() => operation(...input)).toThrow('Please input two numbers.');
      }
    }
  });

  it('should add correctly', () => {
    const tests = [
      { input: [1,1], expected: 2 },
      { input: [2,5], expected: 7 },
      { input: [-9, 10.7], expected: 1.7 },
    ];

    for (const { input, expected } of tests) {
      expect(calculator.add(...input)).toStrictEqual(expected);
    }
  });

  it('should subtract correctly', () => {
    const tests = [
      { input: [1,1], expected: 0 },
      { input: [2,5], expected: -3 },
      { input: [-9, 10.7], expected: -19.7 },
    ];

    for (const { input, expected } of tests) {
      expect(calculator.subtract(...input)).toStrictEqual(expected);
    }
  });

  it('should multiply correctly', () => {
    const tests = [
      { input: [1,1], expected: 1 },
      { input: [2,5], expected: 10 },
      { input: [-9, 10.7], expected: -96.3 },
    ];

    for (const { input, expected } of tests) {
      expect(calculator.multiply(...input)).toStrictEqual(expected);
    }
  });

  it('should divide correctly', () => {
    const tests = [
      { input: [1,1], expected: 1 },
      { input: [2,5], expected: 0.4 },
      { input: [-9, 10.7], expected: -9/10.7 },
    ];

    for (const { input, expected } of tests) {
      expect(calculator.divide(...input)).toStrictEqual(expected);
    }
  });
});