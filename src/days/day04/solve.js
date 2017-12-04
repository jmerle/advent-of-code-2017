const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const phrases = input
    .split('\n')
    .map(line => line.split(' '));

  const validPassphrases = phrases
    .filter(phrase => phrase.join(' ') === [...new Set(phrase)].join(' '))
    .length;

  const validWithoutAnagrams = phrases
    .filter(phrase => {
      phrase = phrase
        .map(word => word.split('').sort().join(''))
        .sort();

      for (let i = 0; i < phrase.length - 1; i++) {
        if (phrase[i] === phrase[i + 1]) {
          return false;
        }
      }

      return true;
    })
    .length;

  console.log(`Amount of valid passphrases: ${validPassphrases}`);
  console.log(`Amount of valid passphrases without anagrams: ${validWithoutAnagrams}`);
}

module.exports = solve;
