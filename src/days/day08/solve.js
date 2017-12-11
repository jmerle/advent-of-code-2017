const { getInput } = require('../../utils');

function solve() {
  const input = getInput();

  const pattern = /^([a-z0-9]+) (inc|dec) (-?\d+) if ([a-z0-9]+) (.+) (-?\d+)$/;
  const register = {};
  let maxEver = -1;

  input
    .split('\n')
    .forEach(instruction => {
      const [, opKey, op, opAmount, ifKey, ifOp, ifAmount] = pattern.exec(instruction);

      if (!(opKey in register)) {
        register[opKey] = 0;
      }

      if (!(ifKey in register)) {
        register[ifKey] = 0;
      }

      if (eval(`${register[ifKey]} ${ifOp} ${ifAmount}`)) {
        if (op === 'inc') {
          register[opKey] += parseInt(opAmount);
        } else {
          register[opKey] -= parseInt(opAmount);
        }
      }

      maxEver = Math.max(maxEver, Object.values(register).sort((a, b) => b - a)[0]);
    });

  const biggestRegister = Object.values(register).sort((a, b) => b - a)[0];

  console.log(`The largest value in any register: ${biggestRegister}`);
  console.log(`The largest value in any register while processing: ${maxEver}`);
}

module.exports = solve;
