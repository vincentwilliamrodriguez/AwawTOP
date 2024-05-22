const findTheOldest = function(people) {
  return people.reduce((oldest, person) => {
    return (getAge(person) > getAge(oldest)) ? person : oldest;
  });
};

const getAge = (person) => {
  let end = (person.yearOfDeath !== undefined) ? person.yearOfDeath
                                               : (new Date()).getFullYear();
  return (end - person.yearOfBirth);
};

// Do not edit below this line
module.exports = findTheOldest;
