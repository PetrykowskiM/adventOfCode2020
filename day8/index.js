const { exec } = require("child_process");
const { disconnect } = require("process");

const input = require("../parser.js")(__dirname + "/input.txt");

function execInstructionsWithLoopPrevention(code, withStack) {
  let currentLine = 0;
  let visitedLines = {};
  let acc = 0;
  let execStack = [];

  while (
    currentLine < code.length &&
    typeof visitedLines[currentLine] == "undefined"
  ) {
    const [command, arg] = code[currentLine].split(" ");
    execStack.push([command, arg, currentLine]);
    visitedLines[currentLine] = true;
    if (command == "acc") {
      acc = acc + parseInt(arg);
      currentLine++;
    } else if (command == "jmp") {
      currentLine = currentLine + parseInt(arg);
    } else if (command == "nop") {
      currentLine++;
    }
  }
  if (withStack) return [acc, currentLine < code.length, execStack];
  else return [acc, currentLine < code.length];
}

function execInstructionsWithLoopFix(code) {
  let [_, hasLoop, execStack] = execInstructionsWithLoopPrevention(code, true);
  execStack = execStack.filter(([cmd, arg]) => cmd == "jmp" || cmd == "nop");
  let workingAcc = null;

  while (hasLoop && execStack.length > 0) {
    let [cmd, arg, line] = execStack.pop();
    let replacedCommand = cmd == "jmp" ? "nop" : "jmp";
    let newCode = [...code];
    newCode[line] = newCode[line].replace(cmd, replacedCommand);

    let execResult = execInstructionsWithLoopPrevention(newCode);
    if (!execResult[1]) {
      workingAcc = execResult[0];
      break;
    }
  }

  return workingAcc;
}

console.log("--------------------------");
console.log("Task 1");
console.log("--------------------------");
console.log("Result", execInstructionsWithLoopPrevention(input));
console.log(
  "Is Correct?",
  execInstructionsWithLoopPrevention(input)[0] == 1810
);

console.log("--------------------------");
console.log("Task 2");
console.log("--------------------------");
console.log("Result", execInstructionsWithLoopFix(input));
console.log("Is Correct?", execInstructionsWithLoopFix(input) == 969);
console.log("###############################");
