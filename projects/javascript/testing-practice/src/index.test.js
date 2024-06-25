import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from './index.js';


function runTests(tests, func, isInputMultiple = false) {
  for (const { input, expected } of tests) {
    if (isInputMultiple) {
      expect(func(...input)).toStrictEqual(expected);
    } else {
      expect(func(input)).toStrictEqual(expected);
    }
  }
}


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

    runTests(tests, capitalize);
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

    runTests(tests, reverseString);
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

    runTests(tests, calculator.add, true);
  });

  it('should subtract correctly', () => {
    const tests = [
      { input: [1,1], expected: 0 },
      { input: [2,5], expected: -3 },
      { input: [-9, 10.7], expected: -19.7 },
    ];

    runTests(tests, calculator.subtract, true);
  });

  it('should multiply correctly', () => {
    const tests = [
      { input: [1,1], expected: 1 },
      { input: [2,5], expected: 10 },
      { input: [-9, 10.7], expected: -96.3 },
    ];

    runTests(tests, calculator.multiply, true);
  });

  it('should divide correctly', () => {
    const tests = [
      { input: [1,1], expected: 1 },
      { input: [2,5], expected: 0.4 },
      { input: [-9, 10.7], expected: -9/10.7 },
    ];

    runTests(tests, calculator.divide, true);
  });
});

describe('caesarCipher', () => {
  it('should accept empty input', () => {
    expect(caesarCipher()).toBe('');
    expect(caesarCipher('')).toBe('');
    expect(caesarCipher('awaw')).toBe('awaw');
  });

  it('should wrap letters', () => {
    const tests = [
      { input: ['zz', 1], expected: 'aa' },
      { input: ['zab', 3], expected: 'cde' }

    ];

    runTests(tests, caesarCipher, true);
  });

  it('should preserve case', () => {
    const tests = [
      { input: ['awAw', 3], expected: 'dzDz' },
      { input: ['HeLLo', 3], expected: 'KhOOr' }

    ];

    runTests(tests, caesarCipher, true);
  });

  it('should preserve non-letters', () => {
    const tests = [
      { input: ['aw aw!!!. ', 3], expected: 'dz dz!!!. ' },
      { input: ['Hello, World!', 3], expected: 'Khoor, Zruog!' }

    ];

    runTests(tests, caesarCipher, true);
  });

  it('can take large keys', () => {
    expect(caesarCipher('awaw', 53)).toStrictEqual('bxbx');
  });

  it('can take negative keys', () => {
    expect(caesarCipher('awaw', -1)).toStrictEqual('zvzv');
    expect(caesarCipher('awaw', -27)).toStrictEqual('zvzv');
    expect(caesarCipher('awaw', -52)).toStrictEqual('awaw');
  });
});

describe('analyzeArray', () => {
  it('should accept empty input', () => {
    const emptyResult = {
      average: null,
      min: null,
      max: null,
      length: 0,
    };

    expect(analyzeArray()).toStrictEqual(emptyResult);
    expect(analyzeArray([])).toStrictEqual(emptyResult);
  });

  it('should accept an array', () => {
    expect(() => analyzeArray(1)).toThrow('Please enter an array.');
    expect(() => analyzeArray('awp')).toThrow('Please enter an array.');
  });

  it('should accept only an array of numbers', () => {
    expect(() => analyzeArray([null, 1])).toThrow('Please enter an array of numbers.');
    expect(() => analyzeArray(['aw'])).toThrow('Please enter an array of numbers.');
  });


  it('should properly return values', () => {
    const tests = [
      {
        input: [1, 8, 3, 4, 2, 6],
        expected: {
          average: 4,
          min: 1,
          max: 8,
          length: 6,
        },
      },
    ];

    runTests(tests, analyzeArray);
  });
});