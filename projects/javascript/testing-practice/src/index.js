import { Exception } from 'sass';

export function capitalize(input = '') {
  return input.slice(0, 1).toUpperCase() + input.slice(1);
}

export function reverseString(input = '') {
  const arr = input.split('');
  arr.reverse();

  return arr.join('');
}

export const calculator = (() => {
  function checkInputs(a, b) {
    const isValid = typeof a === 'number' && typeof b === 'number';

    if (!isValid) {
      throw new Error('Please input two numbers.');
    }
  }

  function round(n) {
    return Math.round(1000000 * n) / 1000000;
  }

  function add(a, b) {
    checkInputs(a, b);
    return round(a + b);
  }

  function subtract(a, b) {
    checkInputs(a, b);
    return round(a - b);
  }

  function multiply(a, b) {
    checkInputs(a, b);
    return a * b;
  }

  function divide(a, b) {
    checkInputs(a, b);
    return a / b;
  }

  return {
    add,
    subtract,
    divide,
    multiply,
  };
})();

export function caesarCipher(inp = '', key = 0) {
  const ranges = {
    uppercase: [65, 90],
    lowercase: [97, 122],
  };

  function shiftCode(code) {
    for (const [low, high] of Object.values(ranges)) {
      if (low <= code && code <= high) {
        let newCode = code + key;

        // wraps letter
        if (newCode > high) {
          newCode -= high - low + 1;
        }

        return newCode;
      }
    }

    return code;
  }

  const res = inp.split('').map((char) => {
    const curCode = char.charCodeAt(0);
    const newCode = shiftCode(curCode);
    return String.fromCharCode(newCode);
  });

  return res.join('');
}

export function analyzeArray(array = []) {
  if (!Array.isArray(array)) {
    throw new Error('Please enter an array.');
  }

  if (array.length === 0) {
    return {
      average: null,
      min: null,
      max: null,
      length: 0,
    };
  }

  if (array.some((value) => typeof value !== 'number')) {
    throw new Error('Please enter an array of numbers.');
  }

  const totalSum = array.reduce((total, value) => total + value, 0);

  return {
    average: totalSum / array.length,
    min: Math.min(...array),
    max: Math.max(...array),
    length: array.length,
  };
}
