const { disconnect } = require("process");

const input = require("../parser.js")(__dirname + "/input.txt");

function numberOfBagsContainingColor(bagsInput, color) {
  let currentAnswers = "";
  let bags = {};

  for (var i = 0; i < bagsInput.length; i++) {
    let [parentBag, childBags] = bagsInput[i].split("contain");
    let parentColor = parentBag.replace("bags", "").trim();

    bags[parentColor] = [];
    if (childBags.indexOf("no other bags") == -1) {
      childBags = childBags.split(",");
      for (var j = 0; j < childBags.length; j++) {
        let [amount, c1, c2] = childBags[j]
          .replace("bag", "")
          .trim()
          .split(" ");
        bags[parentColor].push(c1 + " " + c2);
      }
    }
  }

  let bagContainer = checkForColorContains(bags, color);
  let colors = {};
  bagContainer.map((c) => (colors[c] = true));
  return Object.keys(colors);
}

function checkForColorContains(bags, color) {
  let queue = getBagsThatContainColor(bags, color);
  let result = [...queue];
  while (queue.length > 0) {
    let [first] = queue.splice(0, 1);
    let furtherColors = getBagsThatContainColor(bags, first);
    queue.splice(queue.length, 0, ...furtherColors);
    result.splice(result.length, 0, ...furtherColors);
  }

  // console.log("Group", group, distinctYes);
  return result;
}

function getBagsThatContainColor(bags, color) {
  let resultBags = [];
  let bagColors = Object.keys(bags);

  for (var i = 0; i < bagColors.length; i++) {
    let currColor = bagColors[i];
    if (bags[currColor].indexOf(color) > -1) {
      resultBags.push(currColor);
    }
  }

  return resultBags;
}

function numberOfBagsIn(bagsInput, color) {
  let currentAnswers = "";
  let bags = {};

  for (var i = 0; i < bagsInput.length; i++) {
    let [parentBag, childBags] = bagsInput[i].split("contain");
    let parentColor = parentBag.replace("bags", "").trim();

    bags[parentColor] = {};
    if (childBags.indexOf("no other bags") == -1) {
      childBags = childBags.split(",");
      for (var j = 0; j < childBags.length; j++) {
        let [amount, c1, c2] = childBags[j]
          .replace("bag", "")
          .trim()
          .split(" ");
        bags[parentColor][c1 + " " + c2] = parseInt(amount);
      }
    }
  }

  let numberOfBags = getContaining(bags, color);

  return numberOfBags;
}

function getContaining(bags, color) {
  let queue = Object.keys(bags[color]);
  let amount = bags[color];
  let result = 0;
  if (queue.length == 0) {
    return result;
  }

  for (var i = 0; i < queue.length; i++) {
    let currContainingColor = queue[i];
    result +=
      amount[currContainingColor] +
      amount[currContainingColor] * getContaining(bags, currContainingColor);
  }

  // console.log("Group", group, distinctYes);
  return result;
}

// console.log("--------------------------");
// console.log("Task 1");
// console.log("--------------------------");
// console.log("Result", numberOfBagsContainingColor(input, "shiny gold").length);
// console.log(
//   "Is Correct?",
//   numberOfBagsContainingColor(input, "shiny gold").length == 235
// );

console.log("--------------------------");
console.log("Task 2");
console.log("--------------------------");
console.log("Result", numberOfBagsIn(input, "shiny gold"));
console.log("Is Correct?", numberOfBagsIn(input, "shiny gold") == 32);
console.log("###############################");
