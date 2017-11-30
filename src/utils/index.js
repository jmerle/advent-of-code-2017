const fs = require('fs');
const path = require('path');
const callsite = require('callsite');

function getDayPath(day) {
  const paddedDay = day < 10 ? '0' + day : day;
  return path.resolve(__dirname, '../days/', `day${paddedDay}`, 'solve.js');
}

function getFile(fileName, callsiteIndex = 1) {
  const directory = path.dirname(callsite()[callsiteIndex].getFileName());
  const filePath = path.resolve(directory, fileName);
  return fs.readFileSync(filePath).toString().replace(/(\r?\n)/g, '\n');
}

function getInput() {
  return getFile('input.txt', 2);
}

module.exports = {
  getDayPath,
  getInput,
  getFile,
};
