const sumAll = function (a, b) {
  const isInvalid = (input) => 
    typeof input != "number" || 
    input < 0;
  
  if ([a, b].some(isInvalid)) return "ERROR";

  let n = Math.min(a, b);
  let max = Math.max(a, b);
  let sum = 0;

  while (n <= max) {
    sum += n;
    n++;
  }
  return sum;
};

// Do not edit below this line
module.exports = sumAll;
