const path = require('path');

module.exports = {
    removeFileExtension: fileName => path.parse(fileName).name,
};