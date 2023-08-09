const fibonacci = function(position) {
  if (position < 1) {
    return "OOPS";
  }

  let prev1 = 1;
  let prev2 = 1;

  for (let i = 2; i <= position; i++) {
    [prev1, prev2] = [prev2, prev1 + prev2];
  }

  return prev1;
};

console.log(fibonacci(3))

// Do not edit below this line
module.exports = fibonacci;
