const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(nums) {
  return nums.reduce((sum, num) => (sum + num), 0);
};

const multiply = function(nums) {
  return nums.reduce((product, num) => (product * num), 1);
};

const power = function(a, b) {
	return a ** b;
};

const factorial = function(num) {
	let result = 1;

  for (let current = 2; current <= num; current++) {
    result *= current;
  }

  return result;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
