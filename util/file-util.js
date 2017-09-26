const path = require('path');
const fs = require('fs');

const getProjectRoot = () => path.join(__dirname, '..');

const createIfNotExists = dirPath => {
  if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const getFileNameAndExtension = fullQualifiedFilePath =>
  Object.assign({}, {
    extension: path.extname(fullQualifiedFilePath),
    name: path.basename(fullQualifiedFilePath, path.extname(fullQualifiedFilePath)),
    basedir: path.dirname(fullQualifiedFilePath),
  });

const fullQualifiedFilePath = file_info => 
  path.join(file_info.basedir, file_info.name + file_info.extension);

module.exports = {
    removeFileExtension: fileName => path.parse(fileName).name,
    getProjectRoot: getProjectRoot,
    getFilesDir: () => path.join(getProjectRoot(), 'files'),
    createIfNotExists: createIfNotExists,
    getFileNameAndExtension: getFileNameAndExtension,
    fullQualifiedFilePath: fullQualifiedFilePath,
};