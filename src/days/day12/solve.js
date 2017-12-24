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

  let amountOfGroups = 0;
  let notConnected = new Set();

  for (let i = 0; i < programs.length; i++) {
    notConnected.add(i);
  }

  while (notConnected.size > 0) {
    const connected = new Set();
    const toProcess = [...programs[[...notConnected][0]].connections];

    while (toProcess.length > 0) {
      const id = toProcess.shift();

      programs[id].connections.forEach(i => {
        if (!connected.has(i)) {
          connected.add(i);
          toProcess.push(i);
        }
      });
    }

    connected.forEach(i => {
      notConnected.delete(i);
    });

    amountOfGroups++;
  }

  console.log(`Amount of groups: ${amountOfGroups}`);
}

module.exports = solve;
