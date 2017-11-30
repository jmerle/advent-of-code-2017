const { getInput } = require('../../utils');

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point) {
    return Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
  }
}

function solve() {
  const input = getInput();

  const moves = input.toLowerCase().split(', ');

  const markers = [];

  let x = 0;
  let y = 0;

  while (moves.length > 0) {
    const move = moves.shift();

    switch (move) {
      case 'left':
        x--;
        break;
      case 'right':
        x++;
        break;
      case 'up':
        y++;
        break;
      case 'down':
        y--;
        break;
      case 'a':
      case 'b':
        markers.push(new Point(x, y));
        break;
    }
  }

  const origin = new Point(0, 0);

  const maxDistanceToOrigin = markers
    .map(marker => marker.distanceTo(origin))
    .sort((a, b) => b - a)[0];

  let maxDistanceBetweenPairs = -1;

  for (let i = 0; i < markers.length; i++) {
    for (let j = 0; j < markers.length; j++) {
      if (i !== j) {
        maxDistanceBetweenPairs = Math.max(maxDistanceBetweenPairs, markers[i].distanceTo(markers[j]));
      }
    }
  }

  console.log(`Distance from origin to furthest marker: ${maxDistanceToOrigin}`);
  console.log(`Maximum distance between two markers: ${maxDistanceBetweenPairs}`);
}

module.exports = solve;
