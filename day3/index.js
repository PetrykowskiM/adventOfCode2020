const input = require("../parser.js")(__dirname + "/input.txt");

function treesInSlope(map, [slopeX, slopeY]) {
  let currentX = 0,
    currentY = 0;
  let numberOfTreesSeen = 0;

  while (currentY <= map.length) {
    currentX += slopeX;
    currentY += slopeY;
    let hasTree = getValueAtPos(map, currentX, currentY) == "#";

    if (hasTree) {
      numberOfTreesSeen++;
    }
  }

  return numberOfTreesSeen;
}

function getValueAtPos(map, x, y) {
  let adjustedX = x % map[0].length;

  if (y >= map.length) {
    return null;
  }

  return map[y][adjustedX];
}

console.log("--------------------------");
console.log("Task 1");
console.log("--------------------------");
console.log("Result", treesInSlope(input, [3, 1]));
console.log("Is Correct?", treesInSlope(input, [3, 1]) == 272);

console.log("--------------------------");
console.log("Task 2");
console.log("--------------------------");
console.log(
  "Result",
  treesInSlope(input, [1, 1]) *
    treesInSlope(input, [3, 1]) *
    treesInSlope(input, [5, 1]) *
    treesInSlope(input, [7, 1]) *
    treesInSlope(input, [1, 2])
);
console.log(
  "Is Correct?",
  treesInSlope(input, [1, 1]) *
    treesInSlope(input, [3, 1]) *
    treesInSlope(input, [5, 1]) *
    treesInSlope(input, [7, 1]) *
    treesInSlope(input, [1, 2]) ==
    3898725600
);
console.log("###############################");
