const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const offsets = input.split('\n').map(Number);
  const offsets1 = [...offsets];
  const offsets2 = [...offsets];

  let steps1 = 0;
  let steps2 = 0;

  for (let i = 0; i >= 0 && i < offsets1.length; steps1++) {
    const newIndex = i + offsets1[i];
    offsets1[i]++;
    i = newIndex;
  }

  for (let i = 0; i >= 0 && i < offsets2.length; steps2++) {
    const newIndex = i + offsets2[i];

    if (offsets2[i] < 3) {
      offsets2[i]++;
    } else {
      offsets2[i]--;
    }

    i = newIndex;
  }

  console.log(`Solution to part one: ${steps1}`);
  console.log(`Solution to part two: ${steps2}`);
}

module.exports = solve;
