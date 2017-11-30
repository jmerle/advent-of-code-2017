const fs = require('fs');
const path = require('path');
const { getDayPath } = require('../utils');

const solveTemplate = `
const { getInput } = require('../../utils');

function solve() {
  const input = getInput();
}

module.exports = solve;
`.trim() + '\n';

const inputTemplate = '';

if (process.argv.length === 3 && !isNaN(parseInt(process.argv[2]))) {
  const dayPath = getDayPath(parseInt(process.argv[2]));
  const dayDir = path.dirname(dayPath);

  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir);

    const solvePath = path.resolve(dayDir, 'solve.js');
    const inputPath = path.resolve(dayDir, 'input.txt');

    fs.writeFileSync(solvePath, solveTemplate);
    fs.writeFileSync(inputPath, inputTemplate);
  } else {
    console.error('There already exists a directory for the given day.');
    console.error(`Directory: ${dayDir}`);
  }
} else {
  console.error('Usage: yarn new <day>');
}
