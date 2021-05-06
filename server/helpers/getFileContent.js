const fs = require('fs').promises;

function getFileContent(path) {
  return fs.readFile(path, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch();
}

module.exports = getFileContent;
