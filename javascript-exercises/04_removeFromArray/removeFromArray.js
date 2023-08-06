const removeFromArray = function (array, ...removedValues) {
  for (const val of removedValues) {
    valIndex = array.indexOf(val);
    if (valIndex == -1) continue;
    array.splice(valIndex, 1);
  }

  return array;
};

// Do not edit below this line
module.exports = removeFromArray;
