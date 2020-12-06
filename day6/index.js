const { disconnect } = require("process");

const input = require("../parser.js")(__dirname + "/input.txt");

function checkDistinctYesPerGroup(groups) {
  let currentAnswers = "";
  let yesCount = 0;

  for (var i = 0; i < groups.length; i++) {
    let currentLine = groups[i];
    if (currentLine.length == 0) {
      // Password input ended check now
      yesCount += distinctYes(currentAnswers);
      currentAnswers = "";
    } else {
      currentAnswers = currentAnswers + "" + currentLine;
    }
  }
  if (currentAnswers) {
    yesCount += distinctYes(currentAnswers);
  }

  return yesCount;
}

function distinctYes(group) {
  let answers = group.split("");
  let distinctYes = 0;
  let distinctMap = {};

  for (var i = 0; i < answers.length; i++) {
    let currentQuestionId = answers[i];
    if (typeof distinctMap[currentQuestionId] == "undefined") {
      distinctMap[currentQuestionId] = true;
      distinctYes++;
    }
  }
  // console.log("Group", group, distinctYes);
  return distinctYes;
}

function checkCommonYesPerGroup(groups) {
  let currentAnswers = "";
  let numberOfPeoplePerGroup = 0;
  let yesCount = 0;

  for (var i = 0; i < groups.length; i++) {
    let currentLine = groups[i];
    if (currentLine.length == 0) {
      // Password input ended check now
      yesCount += commonYes(currentAnswers, numberOfPeoplePerGroup);
      currentAnswers = "";
      numberOfPeoplePerGroup = 0;
    } else {
      currentAnswers = currentAnswers + "" + currentLine;
      numberOfPeoplePerGroup++;
    }
  }
  if (currentAnswers) {
    yesCount += commonYes(currentAnswers, numberOfPeoplePerGroup);
  }

  return yesCount;
}

function commonYes(group, numberOfPeople) {
  let answers = group.split("");
  let commonYes = 0;
  let distinctMap = {};

  for (var i = 0; i < answers.length; i++) {
    let currentQuestionId = answers[i];
    if (typeof distinctMap[currentQuestionId] == "undefined") {
      distinctMap[currentQuestionId] = 1;
    } else {
      distinctMap[currentQuestionId] = distinctMap[currentQuestionId] + 1;
    }

    if (distinctMap[currentQuestionId] == numberOfPeople) {
      commonYes++;
    }
  }

  return commonYes;
}

console.log("--------------------------");
console.log("Task 1");
console.log("--------------------------");
console.log("Result", checkDistinctYesPerGroup(input));
console.log("Is Correct?", checkDistinctYesPerGroup(input) == 7027);

console.log("--------------------------");
console.log("Task 2");
console.log("--------------------------");
console.log("Result", checkCommonYesPerGroup(input));
console.log("Is Correct?", checkCommonYesPerGroup(input) == 3579);
console.log("###############################");
