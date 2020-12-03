const input = require("./input.js");

let sumsFor2 = {};
function find2ForSum(nums, sum) {
  for (var i = 0; i < nums.length; i++) {
    let missingSumIndex = sumsFor2[sum - nums[i]];
    if (typeof missingSumIndex !== "undefined") {
      return [nums[missingSumIndex], nums[i]];
    }
    sumsFor2[nums[i]] = i;
  }

  return null;
}

function find3ForSum(nums, sum) {
  for (var i = 0; i < nums.length; i++) {
    let has2Sums = find2ForSum(nums, sum - nums[i]);
    if (has2Sums) {
      return [...has2Sums, nums[i]];
    }
  }
  return null;
}

console.log("###############################");
console.log("Task 1");
console.log(
  "Result",
  find2ForSum(input, 2020).reduce((prev, curr) => prev * curr, 1)
);
console.log("###############################");

console.log("Task 2");
console.log(
  "Result",
  find3ForSum(input, 2020).reduce((prev, curr) => prev * curr, 1)
);
console.log("###############################");
