const multer  = require('multer');
const path = require('path');

const TEMPORARY_STORAGE_DIR = path.join(__dirname, '..', 'files', 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, TEMPORARY_STORAGE_DIR);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '.fasta');
  }
});
const upload = multer({ storage: storage });

module.exports = {
  registerAllUploadedFiles: () => upload.any(),
}