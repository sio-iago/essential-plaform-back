const express = require('express');
const router = express.Router();
const fs = require('fs');

const fileUtil = require('./../util/file-util');
const jobHandler = require('./../util/job-utils');

// Downloading finished jobs
router.get('/jobResults/:jobId', (req, res, next) => {
  router.services.db
    .selectOne('job_info', {id: req.params.jobId})
    .then(jobArray => {
      if(jobArray.length !== 1 || jobArray[0].output_file === null) {
        throw Error('Results not available');
      }

      const fileInfo = fileUtil.getFileNameAndExtension(jobArray[0].output_file);

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-disposition', 'inline; filename=' + fileInfo.name + fileInfo.extension);
      fs.createReadStream(jobArray[0].output_file).pipe(res);
      return res;
    })
    .catch(error => res.status(404).json({error: 'Results not found!'}));
});

router.get('/jobDetails/:jobId', (req, res, next) => {
  router.services.db
  .selectOne('job_info', {id: req.params.jobId})
  .then(jobArray => {
    if(jobArray.length !== 1 || jobArray[0].output_file === null) {
      throw Error('Results not available');
    }

    const fileName = fileUtil.fullQualifiedFilePath(fileUtil.getFileNameAndExtension(jobArray[0].output_file));

    jobHandler.getProteinInfoFromFileAsync(fileName)
        .then(data => res.json({
          groups: jobHandler.getFilteredResultAsProteinValue(fileName),
          references: data,
        }))
        .catch(error => { console.log(error); return res.status(404).json({error: 'Results not found!'}) });
  })
  .catch(error => res.status(404).json({error: 'Results not found!'}));
});



module.exports = router;
