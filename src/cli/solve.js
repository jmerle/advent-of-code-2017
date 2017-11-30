const fs = require('fs');
const { getDayPath } = require('../utils');

if (process.argv.length === 3 && parseInt(process.argv[2]) !== NaN) {
  const dayPath = getDayPath(parseInt(process.argv[2]));

  if (fs.existsSync(dayPath)) {
    require(dayPath)();
  } else {
    console.error('There is no file available for the given day.');
    console.error(`Missing file: ${dayPath}`);
  }
} else {
  console.error('Usage: yarn solve <day>');
}
