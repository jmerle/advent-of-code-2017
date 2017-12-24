const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const directions = input.split(',');

  let x = 0;
  let y = 0;
  let z = 0;

  const dists = [];

  for (let i = 0; i < directions.length; i++) {
    switch (directions[i]) {
      case 'n':
        y++;
        z--;
        break;
      case 'ne':
        x++;
        z--;
        break;
      case 'se':
        x++;
        y--;
        break;
      case 's':
        y--;
        z++;
        break;
      case 'sw':
        x--;
        z++;
        break;
      case 'nw':
        x--;
        y++;
        break;
    }

    dists.push((Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2);
  }

  const distance = dists[dists.length - 1];
  const furthest = dists.reduce((a, b) => a > b ? a : b);

  console.log(`Number of steps required to get back to the start: ${distance}`);
  console.log(`Furthest distance away from the start: ${furthest}`);
}

module.exports = solve;
