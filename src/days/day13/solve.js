const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const layers = [];

  input
    .split('\n')
    .map(line => line.split(': ').map(Number))
    .forEach(layer => {
      layers[layer[0]] = {
        range: layer[1],
        current: 0,
        goingDown: true,
      };
    });

  let severity = 0;

  for (let i = 0; i < layers.length; i++, tick(layers)) {
    if (layers[i] && layers[i].current === 0) {
      severity += i * layers[i].range;
    }
  }

  console.log(`Severity after the whole trip: ${severity}`);
}

function tick(layers) {
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];

    if (layer) {
      if (layer.goingDown) {
        if (layer.current === layer.range - 1) {
          layer.goingDown = false;
          layer.current--;
        } else {
          layer.current++;
        }
      } else {
        if (layer.current === 0) {
          layer.goingDown = true;
          layer.current++;
        } else {
          layer.current--;
        }
      }
    }
  }
}

module.exports = solve;
