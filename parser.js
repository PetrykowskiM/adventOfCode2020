const fs = require("fs");

module.exports = (fileName) => {
  const input = fs.readFileSync(fileName, { encoding: "utf8" });
  return input.split("\n");
};
