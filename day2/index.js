const input = require("./input.js");

let sumsFor2 = {};
function findInvalidPasswords(passwords, isPasswordValid) {
  let validPasswords = [];

  for (var i = 0; i < passwords.length; i++) {
    let [rule, password] = passwords[i].split(":");

    if (isPasswordValid(rule, password)) {
      validPasswords.push(password);
    }
  }

  return validPasswords;
}

function passwordPolicy1(rule, password) {
  let [amount, letter] = rule.split(" ");
  let [min, max] = amount.split("-");

  const charCount = password.match(new RegExp(letter, "g"));
  if (charCount && charCount.length <= max && charCount.length >= min) {
    return true;
  }

  return false;
}

function passwordPolicy2(rule, password) {
  let [amount, letter] = rule.split(" ");
  let [first, second] = amount.split("-");

  // passed index starts at 1 not zero
  first--;
  second--;

  if (
    (password.charAt(first) == letter && password.charAt(second) != letter) ||
    (password.charAt(first) != letter && password.charAt(second) == letter)
  ) {
    return true;
  }

  return false;
}

console.log("###############################");
console.log("Task 1");
console.log("Result", findInvalidPasswords(input, passwordPolicy1).length);
console.log(
  "Is Correct?",
  findInvalidPasswords(input, passwordPolicy1).length == 515
);
console.log("###############################");

console.log("Task 2");
console.log("Result", findInvalidPasswords(input, passwordPolicy2).length);
console.log(
  "Is Correct?",
  findInvalidPasswords(input, passwordPolicy2).length == 711
);
console.log("###############################");
