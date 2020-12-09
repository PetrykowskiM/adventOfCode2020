const input = require("../parser.js")(__dirname + "/input.txt");

function getFirstNumberNotXMAS(numbers, checkLength) {
  for (var i = checkLength; i < numbers.length; i++) {
    let subArray = numbers.slice(i - checkLength, i);
    if (!hasSum(subArray, numbers[i])) {
      return [numbers[i], i];
    }
  }

  return [];
}

function hasSum(nums, sum) {
  let sumsFor2 = {};

  for (var i = 0; i < nums.length; i++) {
    let missingSumIndex = sumsFor2[sum - nums[i]];
    if (typeof missingSumIndex !== "undefined") {
      return true;
    }
    sumsFor2[nums[i]] = true;
  }

  return false;
}

function breakEncryption(nums, checkLength) {
  let [number, index] = getFirstNumberNotXMAS(nums, checkLength);
  number = parseInt(number);
  let subSums = [];
  let currSum = 0;

  for (var i = 0; i < index; i++) {
    currSum = currSum + parseInt(nums[i]);
    subSums.push(currSum);
    if (currSum > number) {
      for (var j = 1; j < i; j++) {
        subSum = subSums[i] - subSums[j - 1];
        if (subSum == number) {
          let [smallest, largest] = extremes(nums.slice(j, i));
          return smallest + largest;
        }
        if (subSum < number) {
          break;
        }
      }
    }
  }
  return -1;
}

function extremes(nums) {
  let smallest = null;
  let largest = null;
  for (var i = 0; i < nums.length; i++) {
    let curr = parseInt(nums[i]);
    if (smallest == null) {
      smallest = curr;
    }
    if (largest == null) {
      largest = curr;
    }
    if (curr < smallest) {
      smallest = curr;
    }
    if (curr > largest) {
      largest = curr;
    }
  }

  return [smallest, largest];
}

console.log("--------------------------");
console.log("Task 1");
console.log("--------------------------");
console.log("Result", getFirstNumberNotXMAS(input, 25));
console.log("Is Correct?", getFirstNumberNotXMAS(input, 25)[0] == 542529149);

console.log("--------------------------");
console.log("Task 2");
console.log("--------------------------");
console.log("Result", breakEncryption(input, 25));
console.log("Is Correct?", breakEncryption(input, 25) == 75678618);
console.log("###############################");
