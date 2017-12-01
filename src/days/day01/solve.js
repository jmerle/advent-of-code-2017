const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const nums = input.split('').map(Number);

  let totalPartOne = 0;
  let totalPartTwo = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[(i + 1) % nums.length]) {
      totalPartOne += nums[i];
    }

    if (nums[i] === nums[(i + (nums.length / 2)) % nums.length]) {
      totalPartTwo += nums[i];
    }
  }

  console.log(`Solution to part one: ${totalPartOne}`);
  console.log(`Solution to part two: ${totalPartTwo}`);
}

module.exports = solve;
