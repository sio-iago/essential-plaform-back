const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const fileUtils = require('./../util/file-util');


const createAndGetUsersDir = () => {
  const filesDir = fileUtils.getFilesDir();
  const usersRootDir = path.join(filesDir, 'users');

  fileUtils.createIfNotExists(usersRootDir);
  
  return usersRootDir;
};

const createAndGetLoggedUserDir = (username) => {
  const usersRootDir = createAndGetUsersDir();
  const loggedUserDir = path.join(usersRootDir, username);

  fileUtils.createIfNotExists(loggedUserDir);

  return loggedUserDir;
}

const createAndGetLoggedUserRawFastaDir = (username) => {
  const loggedUserDir = createAndGetLoggedUserDir(username);
  const rawFastaDir = path.join(loggedUserDir, 'rawFasta');

  fileUtils.createIfNotExists(rawFastaDir);

  return rawFastaDir;
};

const auth = require('./../middlewares/auth').default;
router.use(auth);

// single('fastaFile')
router.post('/new', (req, res, next) => {
  if(!req.files || !Array.isArray(req.files) || req.files.length != 1) {
    return res.status(422).send({error: 'You must upload just one file at a time!'});
  }

  const uploadedFastaFile = req.files[0];
  
  const username = req.user.username;
  const rawFastaDir = createAndGetLoggedUserRawFastaDir(username);

  const targetFullQualifiedFileName = path.join(rawFastaDir, uploadedFastaFile.filename);

  fs
    .createReadStream(uploadedFastaFile.path)
    .pipe(fs.createWriteStream(targetFullQualifiedFileName));

  res.json({ok:true});
});

module.exports = router;