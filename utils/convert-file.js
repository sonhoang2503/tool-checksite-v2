const fs = require('fs');

module.exports = (filepath) => {
  const file = fs.readFileSync(filepath, 'utf8');
  return file.split(/\r?\n/);
};
