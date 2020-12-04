const input = require("../parser.js")(__dirname + "/input.txt");

function numberOfValidPassports(passports, validatePassport) {
  let currentPassport = "";
  let validPassports = 0;

  for (var i = 0; i < passports.length; i++) {
    let currentLine = passports[i];
    if (currentLine.length == 0) {
      // Password input ended check now
      if (validatePassport(currentPassport)) {
        validPassports++;
      }
      currentPassport = "";
    } else {
      currentPassport = currentPassport + " " + currentLine;
    }
  }
  if (currentPassport && validatePassport(currentPassport)) {
    validPassports++;
  }

  return validPassports;
}

function checkPassport(passport) {
  let expectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let fields = passport.split(" ");

  for (var i = 0; i < fields.length; i++) {
    const [name, _] = fields[i].split(":");
    let indexOfField = expectedFields.indexOf(name);
    if (indexOfField > -1) {
      expectedFields.splice(indexOfField, 1);
    }
  }

  return expectedFields.length == 0;
}

function checkPassportAndValues(passport) {
  let expectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let fields = passport.split(" ");
  let validations = {
    byr: checkYear(1920, 2002),
    iyr: checkYear(2010, 2020),
    eyr: checkYear(2020, 2030),
    hgt: checkHeight,
    hcl: (value) => value.match(/^\#([0-9|a-f]{6})$/) !== null,
    pid: (value) => value.match(/^([0-9]{9})$/) !== null,
    ecl: (value) => value.match(/^amb|blu|brn|gry|grn|hzl|oth$/) !== null,
  };

  for (var i = 0; i < fields.length; i++) {
    const [name, value] = fields[i].split(":");
    let indexOfField = expectedFields.indexOf(name);
    if (indexOfField > -1) {
      if (validations[name]) {
        let isValid = validations[name](value);
        if (isValid) expectedFields.splice(indexOfField, 1);
      } else {
        expectedFields.splice(indexOfField, 1);
      }
    }
  }

  return expectedFields.length == 0;
}

function checkYear(start, end) {
  return (value) => {
    if (value.match(/^([0-9]{4})$/)) {
      let year = parseInt(value);
      if (year <= end && year >= start) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
}

function checkHeight(value) {
  let isCm = value.endsWith("cm");
  let isIn = value.endsWith("in");
  if (isCm || isIn) {
    let height = value.replace("cm", "").replace("in", "");
    try {
      height = parseInt(height);
    } catch (err) {
      return false;
    }
    if (isIn) {
      return height >= 59 && height <= 76;
    } else {
      return height >= 150 && height <= 193;
    }
  }
  return false;
}

console.log("--------------------------");
console.log("Task 1");
console.log("--------------------------");
console.log("Result", numberOfValidPassports(input, checkPassport));
console.log("Is Correct?", numberOfValidPassports(input, checkPassport) == 239);

console.log("--------------------------");
console.log("Task 2");
console.log("--------------------------");
console.log("Result", numberOfValidPassports(input, checkPassportAndValues));
console.log(
  "Is Correct?",
  numberOfValidPassports(input, checkPassportAndValues) == 188
);
console.log("###############################");
