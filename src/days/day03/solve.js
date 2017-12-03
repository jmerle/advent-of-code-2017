const { getInput } = require('../../utils');

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = -1;
  }

  distanceTo(point) {
    return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
  }

  clone() {
    return new Point(this.x, this.y);
  }
}

function* spiral() {
  let current = new Point(0, 0);
  let ring = 0;

  while (true) {
    yield current;

    current = current.clone();

    if (current.x === ring && current.y === -ring) {
      ring++;
      current.x++;
    } else {
      if (current.x === ring && current.y < ring) {
        current.y++;
      } else if (current.y === ring && current.x > -ring) {
        current.x--;
      } else if (current.x === -ring && current.y > -ring) {
        current.y--;
      } else {
        current.x++;
      }
    }
  }
}

function* normalSpiral() {
  let i = 1;

  for (const point of spiral()) {
    point.value = i++;

    yield point;
  }
}

function* summedSpiral() {
  const points = [];

  const neighbors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (const point of normalSpiral()) {
    point.value = neighbors
      .map(n => points.find(p => p.x === point.x + n[0] && p.y === point.y + n[1]))
      .filter(point => point !== undefined)
      .map(p => p.value)
      .reduce((a, b) => a + b, 0);

    if (point.value === 0) {
      point.value = 1;
    }

    points.push(point);

    yield point;
  }
}

function solve() {
  const input = parseInt(getInput());

  for (const point of normalSpiral()) {
    if (point.value === input) {
      const distanceToAccessPort = point.distanceTo(new Point(0, 0, 1));
      console.log(`Distance from input square to access port: ${distanceToAccessPort}`);
      break;
    }
  }

  for (const point of summedSpiral()) {
    if (point.value > input) {
      console.log(`First value larger than puzzle input in summed spiral: ${point.value}`);
      break;
    }
  }
}

module.exports = solve;
