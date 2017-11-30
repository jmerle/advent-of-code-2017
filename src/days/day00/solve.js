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

  let x = 0;
  let y = 0;

  const origin = new Point(0, 0);
  let maxDistanceToOrigin = -1;

  const markersA = [];
  const markersB = [];

  for (let i = 0; i < moves.length; i++) {
    switch (moves[i]) {
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
        const marker = new Point(x, y);

        maxDistanceToOrigin = Math.max(maxDistanceToOrigin, origin.distanceTo(marker));
        (moves[i] === 'a' ? markersA : markersB).push(marker);
        break;
    }
  }

  let maxDistanceBetweenPairs = -1;

  for (let i = 0; i < markersA.length; i++) {
    for (let j = 0; j < markersB.length; j++) {
      maxDistanceBetweenPairs = Math.max(maxDistanceBetweenPairs, markersA[i].distanceTo(markersB[j]));
    }
  }

  console.log(`Distance from origin to furthest marker: ${maxDistanceToOrigin}`);
  console.log(`Maximum distance between two markers: ${maxDistanceBetweenPairs}`);
}

module.exports = solve;
