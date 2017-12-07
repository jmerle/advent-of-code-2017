const { getInput } = require('../../utils');

class Node {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;

    this.children = [];
    this.parent = null;

    this._totalWeight = null;
    this._balanced = null;
  }

  get totalWeight() {
    if (this._totalWeight === null) {
      this._totalWeight = this.weight + this.children.reduce((acc, node) => acc + node.totalWeight, 0);
    }

    return this._totalWeight;
  }

  get balanced() {
    if (this._balanced === null) {
      this._balanced = [...new Set(this.children.map(n => n.totalWeight))].length <= 1;
    }

    return this._balanced;
  }
}

function* bfs(bottomNode) {
  const toProcess = [bottomNode];

  while (toProcess.length > 0) {
    const node = toProcess.shift();

    toProcess.push(...node.children);

    yield node;
  }
}

function solve() {
  const input = getInput();

  const data = input
    .split('\n')
    .map(line => {
      const [, name, weight] = /([a-z]+) \((\d+)\)/.exec(line);
      const [, children] = / -> (.*)$/.exec(line) || ['', ''];

      return [name, parseInt(weight), children.split(', ').filter(s => s !== '')];
    });

  const nodes = [];

  data.forEach(item => {
    nodes.push(new Node(item[0], item[1]));
  });

  data.forEach(item => {
    const node = nodes.find(n => n.name === item[0]);

    item[2].forEach(child => {
      const childNode = nodes.find(n => n.name === child);

      node.children.push(childNode);
      childNode.parent = node;
    });
  });

  const bottomNode = nodes.find(n => n.parent === null);

  console.log(`Bottom of tower: ${bottomNode.name}`);

  const nodesReversed = [...bfs(bottomNode)].reverse();

  for (let i = 0; i < nodesReversed.length; i++) {
    const node = nodesReversed[i];

    if (!node.balanced) {
      const weights = node.children.map(c => c.totalWeight);

      const occurences = weights.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      const mostCommon = parseInt(Object.keys(occurences).reduce((a, b) => occurences[a] > occurences[b] ? a : b));
      const leastCommon = parseInt(Object.keys(occurences).reduce((a, b) => occurences[a] < occurences[b] ? a : b));
      const toAdd = mostCommon - leastCommon;

      const child = node.children.find(n => n.totalWeight === leastCommon);

      console.log(`The height which the unbalanced tower needs to be: ${child.weight + toAdd}`);

      break;
    }
  }
}

module.exports = solve;
