const palindromes = function (text) {
  const filtered = text.toLowerCase()
                       .split('')
                       .filter(char => /^[a-z0-9]+$/.test(char));
  
  return filtered.join('') === filtered.reverse().join('');
};

// Do not edit below this line
module.exports = palindromes;
