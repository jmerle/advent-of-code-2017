const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const lengths = input
    .split('')
    .map(ch => ch.charCodeAt(0))
    .concat(17, 31, 73, 47, 23);

  let current = 0;
  let skip = 0;

  let nums = [];

  for (let i = 0; i < 256; i++) {
    nums.push(i);
  }

  for (let i = 0; i < 64; i++) {
    for (let i = 0; i < lengths.length; i++) {
      const length = lengths[i];

      const sub = getSubArray(nums, current, length);
      putSubArray(nums, sub.reverse(), current);

      current = (current + length + skip) % nums.length;
      skip++;
    }
  }

  const blocks = [];

  for (let i = 0; i < 16; i++) {
    const sub = [];

    for (let j = i * 16; j < i * 16 + 16; j++) {
      sub.push(nums[j]);
    }

    blocks.push(sub.reduce((a, b) => a ^ b));
  }

  const hash = blocks
    .map(block => block.toString(16))
    .map(s => s.length === 1 ? '0' + s : s)
    .join('');

  console.log(`Resulting Knot Hash: ${hash}`);
}

function getSubArray(nums, start, length) {
  const arr = [];

  let index = start;
  let i = 0;

  while (i < length) {
    arr.push(nums[index]);

    index = (index + 1) % nums.length;
    i++;
  }

  return arr;
}

function putSubArray(arr1, arr2, start) {
  let index = start;
  let i = 0;

  while (i < arr2.length) {
    arr1[index] = arr2[i];

    index = (index + 1) % arr1.length;
    i++;
  }
}

module.exports = solve;
