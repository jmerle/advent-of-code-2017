const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const chars = input.split('');

  let score = 0;
  let amountOfOpenings = 0;
  let isGarbage = false;
  let amountOfCharactersInGarbage = 0;

  for (let i = 0; i < chars.length; i++) {
    switch (chars[i]) {
      case '{':
        if (!isGarbage) {
          amountOfOpenings++;
        } else {
          amountOfCharactersInGarbage++;
        }
        break;
      case '}':
        if (!isGarbage) {
          score += amountOfOpenings;
          amountOfOpenings--;
        } else {
          amountOfCharactersInGarbage++;
        }
        break;
      case '<':
        if (!isGarbage) {
          isGarbage = true;
        } else {
          amountOfCharactersInGarbage++;
        }
        break;
      case '>':
        isGarbage = false;
        break;
      case '!':
        i++;
        break;
      default:
        if (isGarbage) {
          amountOfCharactersInGarbage++;
        }
    }
  }

  console.log(`Total score for all groups: ${score}`);
  console.log(`Amount of characters in the garbage: ${amountOfCharactersInGarbage}`);
}

module.exports = solve;
