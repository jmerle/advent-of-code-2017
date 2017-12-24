const { getInput } = require('../../utils');

class Program {
  constructor() {
    this.connections = new Set();
  }
}

function solve() {
  const input = getInput();

  const pipes = input.split('\n');

  const programs = [];

  for (let i = 0; i < pipes.length; i++) {
    programs.push(new Program());
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i]
      .split(' <-> ')[1]
      .split(', ')
      .map(Number)
      .forEach(id => {
        programs[i].connections.add(id);
        programs[id].connections.add(i);
      });
  }

  const connectedToZero = new Set();
  const toProcess = [...programs[0].connections];

  while (toProcess.length > 0) {
    const id = toProcess.shift();

    programs[id].connections.forEach(i => {
      if (!connectedToZero.has(i)) {
        connectedToZero.add(i);
        toProcess.push(i);
      }
    });
  }

  console.log(`Amount of programs connected to program 0: ${connectedToZero.size}`);
}

module.exports = solve;
