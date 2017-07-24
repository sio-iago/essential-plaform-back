const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');

const TEMPORARY_STORAGE_DIR = path.join(__dirname, '..', 'files', 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, TEMPORARY_STORAGE_DIR);
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + '.fasta');
  }
});
const upload = multer({ storage: storage });

const auth = require('./../middlewares/auth').default;
//router.use(auth);


router.post('/new', upload.single('fastaFile'), function(req, res, next) {
  res.json({ok:true});
});

module.exports = router;