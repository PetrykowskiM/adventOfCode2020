const input = require("../parser.js")(__dirname + "/input.txt");

function highestSeatId(boardingPasses) {
  let highestId = 0;

  for (var i = 0; i < boardingPasses.length; i++) {
    let boardingPass = boardingPasses[i];
    let id = getSeatId(boardingPass);
    if (id > highestId) {
      highestId = id;
      console.log(boardingPass, id);
    }
  }

  return highestId;
}

function missingSeatId(boardingPasses) {
  let highestId = 0;
  let rows = {};

  for (var i = 0; i < boardingPasses.length; i++) {
    let boardingPass = boardingPasses[i];
    let [row, col] = getRowCol(boardingPass);
    if (rows[row]) {
      rows[row].push(col);
    } else {
      rows[row] = [col];
    }
    if (row == 82) {
      console.log(boardingPass);
    }
  }

  console.log("missing", rows[82]);

  return highestId;
}

function getSeatId(boardingPass) {
  let fields = boardingPass.split("");
  let row = [0, 127];
  let col = [0, 7];

  for (var i = 0; i < fields.length; i++) {
    let numberOfRows = row[1] - row[0];
    let numberOfCols = col[1] - col[0];
    // console.log(fields[i], row, col);
    switch (fields[i]) {
      case "F":
        // lower half
        row[1] = row[1] - Math.ceil(numberOfRows / 2);
        break;
      case "B":
        // Upper half
        row[0] = row[0] + Math.ceil(numberOfRows / 2);
        break;
      case "R":
        // Upper half
        col[0] = col[0] + Math.ceil(numberOfCols / 2);
        break;
      case "L":
        // Lower half
        col[1] = col[1] - Math.ceil(numberOfCols / 2);
        break;
      default:
        break;
    }
  }
  console.log(row, col, row[0] * 8 + col[0]);

  return row[0] * 8 + col[0];
}

function getRowCol(boardingPass) {
  let fields = boardingPass.split("");
  let row = [0, 127];
  let col = [0, 7];

  for (var i = 0; i < fields.length; i++) {
    let numberOfRows = row[1] - row[0];
    let numberOfCols = col[1] - col[0];
    // console.log(fields[i], row, col);
    switch (fields[i]) {
      case "F":
        // lower half
        row[1] = row[1] - Math.ceil(numberOfRows / 2);
        break;
      case "B":
        // Upper half
        row[0] = row[0] + Math.ceil(numberOfRows / 2);
        break;
      case "R":
        // Upper half
        col[0] = col[0] + Math.ceil(numberOfCols / 2);
        break;
      case "L":
        // Lower half
        col[1] = col[1] - Math.ceil(numberOfCols / 2);
        break;
      default:
        break;
    }
  }

  return [row[0], col[0]];
}
console.log(getRowCol("BFBFFBFLLR"), getSeatId("BFBFFBFLLR"));
console.log("--------------------------");
console.log("Task 1");
console.log("--------------------------");
// console.log("Result", highestSeatId(input));
// console.log("Is Correct?", highestSeatId(input) == 820);

console.log("--------------------------");
console.log("Task 2");
console.log("--------------------------");
console.log("Result", missingSeatId(input));
console.log("Is Correct?", missingSeatId(input) == 657);
console.log("###############################");
