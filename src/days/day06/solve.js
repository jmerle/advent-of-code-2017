const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const nums = input.split('\t').map(Number);

  const cycles = [nums.join(' ')];

  while (true) {
    let maxValue = -1;
    let maxIndex = -1;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > maxValue) {
        maxValue = nums[i];
        maxIndex = i;
      }
    }

    let blocksLeft = nums[maxIndex];
    nums[maxIndex] = 0;

    while (blocksLeft > 0) {
      maxIndex++;
      nums[maxIndex % nums.length]++;
      blocksLeft--;
    }

    const cycle = nums.join(' ');

    if (cycles.includes(cycle)) break;

    cycles.push(cycle);
  }

  const toMatch = nums.join(' ');
  let partTwo = 0;

  while (true) {
    let maxValue = -1;
    let maxIndex = -1;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > maxValue) {
        maxValue = nums[i];
        maxIndex = i;
      }
    }

    let blocksLeft = nums[maxIndex];
    nums[maxIndex] = 0;

    while (blocksLeft > 0) {
      maxIndex++;
      nums[maxIndex % nums.length]++;
      blocksLeft--;
    }

    const cycle = nums.join(' ');
    partTwo++;

    if (toMatch === cycle) break;
  }

  console.log(`Solution to part one: ${cycles.length}`);
  console.log(`Solution to part two: ${partTwo}`);
}

module.exports = solve;
