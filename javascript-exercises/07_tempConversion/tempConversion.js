const convertToCelsius = function(farenheit) {
  return roundOff((farenheit - 32) * (5 / 9));
};

const convertToFahrenheit = function(celsius) {
  return roundOff(celsius * (9 / 5) + 32);
};

function roundOff(num) {
  return Math.round(num * 10) / 10;
}

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
