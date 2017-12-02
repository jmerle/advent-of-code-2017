const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const rows = input
    .split('\n')
    .map(row => row
      .split('\t')
      .map(Number));

  const checksum = rows
    .map(row => Math.max(...row) - Math.min(...row))
    .reduce((a, b) => a + b);

  const sumPartTwo = rows
    .map(row => {
      for (let i = 0; i < row.length; i++) {
        for (let j = 0; j < row.length; j++) {
          if (i !== j && row[i] / row[j] % 1 === 0) {
            return row[i] / row[j];
          }
        }
      }
    })
    .reduce((a, b) => a + b);

  console.log(`Checksum: ${checksum}`);
  console.log(`Solution to part two: ${sumPartTwo}`);
}

module.exports = solve;
