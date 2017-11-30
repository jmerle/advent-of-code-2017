const fs = require('fs');
const { getDayPath } = require('../utils');

if (process.argv.length === 3 && !isNaN(parseInt(process.argv[2]))) {
  const day = parseInt(process.argv[2]);
  const dayPath = getDayPath(parseInt(process.argv[2]));

  if (fs.existsSync(dayPath)) {
    console.time(`Solving day ${day}`);
    require(dayPath)();
    console.timeEnd(`Solving day ${day}`);
  } else {
    console.error('There is no file available for the given day.');
    console.error(`Missing file: ${dayPath}`);
  }
} else {
  console.error('Usage: yarn solve <day>');
}
