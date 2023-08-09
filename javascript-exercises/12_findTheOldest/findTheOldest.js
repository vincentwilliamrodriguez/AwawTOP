const findTheOldest = function(people) {
  const getAge = (person) => {
    let end = (person.yearOfDeath !== undefined) ? person.yearOfDeath
                                                 : (new Date()).getFullYear();
    return (end - person.yearOfBirth);
  };

  return people.reduce((oldest, person) => {
    return (getAge(person) > getAge(oldest)) ? person : oldest;
  });
};

findTheOldest([
  {
    name: "Carly",
    yearOfBirth: 1942,
    yearOfDeath: 1970,
  },
  {
    name: "Ray",
    yearOfBirth: 1962,
    yearOfDeath: 2011,
  },
  {
    name: "Jane",
    yearOfBirth: 1912,
    yearOfDeath: 1941,
  },
]);

// Do not edit below this line
module.exports = findTheOldest;
