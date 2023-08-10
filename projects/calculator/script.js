
const add =       (a, b) => (a + b);
const subtract =  (a, b) => (a - b);
const multiply =  (a, b) => (a * b);
const divide =    (a, b) => (a / b);

function operate(first, operator, second) {
  first = +first;
  second = +second;
  
  switch (operator) {
    case '+':   return add(first, second);
    case '-':   return subtract(first, second);
    case '*':   return multiply(first, second);
    case '/':   return divide(first, second);
    default:    return "N/A";
  }
}