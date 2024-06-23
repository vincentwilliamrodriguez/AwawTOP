export function capitalize(input = '') {
  return input.slice(0, 1).toUpperCase() + 
         input.slice(1);
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
    return Math.round(1000000 * n) / 1000000
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
    console.log(inp, curCode, newCode);
    return String.fromCharCode(newCode);
  });

  return res.join('');
}

export function analyzeArray() {}
