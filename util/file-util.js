const path = require('path');
const fs = require('fs');

const getProjectRoot = () => path.join(__dirname, '..');

const createIfNotExists = dirPath => {
  if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = {
    removeFileExtension: fileName => path.parse(fileName).name,
    getProjectRoot: getProjectRoot,
    getFilesDir: () => path.join(getProjectRoot(), 'files'),
    createIfNotExists: createIfNotExists,
};