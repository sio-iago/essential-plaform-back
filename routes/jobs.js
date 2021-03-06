const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const fileUtils = require('./../util/file-util');
const jobInfo = require('./../model/job-info');


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

// Adding security
const auth = require('./../middlewares/auth').default;
router.use(auth);

// New job request
router.post('/new', (req, res, next) => {
    if (!req.files || !Array.isArray(req.files) || req.files.length < 1) {
        return res.status(422).send({error: 'You must upload just one file at a time!'});
    }

    const {username, id} = req.user;
    const rawFastaDir = createAndGetLoggedUserRawFastaDir(username);

    const multiFile = req.files.length === 2;

    if (multiFile) {

        console.log("TRYING MULTI UPLOAD");

        const uploadedModelFile = req.files[0];
        const uploadedTargetFile = req.files[1];

        const modelFullQualifiedFileName = path.join(rawFastaDir, uploadedModelFile.filename);
        const targetFullQualifiedFileName = path.join(rawFastaDir, uploadedTargetFile.filename);

        fs
            .createReadStream(uploadedModelFile.path)
            .pipe(fs.createWriteStream(modelFullQualifiedFileName))
            .on('close', () => fs.unlink(uploadedModelFile.path, () => null));

        fs
            .createReadStream(uploadedTargetFile.path)
            .pipe(fs.createWriteStream(targetFullQualifiedFileName))
            .on('close', () => fs.unlink(uploadedTargetFile.path, () => null));

        const newJobInfo = jobInfo.createJobMulti(targetFullQualifiedFileName, modelFullQualifiedFileName, id);

        router.services.db
            .insert('job_info', newJobInfo)
            .then(result => res.json({ok: true}))
            .catch(error => res.status(500).json({error: 'Error registering job on the database'}));

    } else {
        const organism = req.body.organism;

        const uploadedTargetFile = req.files[0];

        const targetFullQualifiedFileName = path.join(rawFastaDir, uploadedTargetFile.filename);

        fs
            .createReadStream(uploadedTargetFile.path)
            .pipe(fs.createWriteStream(targetFullQualifiedFileName))
            .on('close', () => fs.unlink(uploadedTargetFile.path, () => null));

        const newJobInfo = jobInfo.createJob(targetFullQualifiedFileName, organism, id);

        router.services.db
            .insert('job_info', newJobInfo)
            .then(result => res.json({ok: true}))
            .catch(error => res.status(500).json({error: 'Error registering job on the database'}));
    }
});

// Jobs listing request
router.get('/', (req, res, next) => {
    const id = req.user.id;

    router.services.db
        .selectAll('job_info', {user_id: id})
        .then(
            results => res.json(
                results.map(job =>
                    Object.assign(
                        {},
                        {
                            id: job.id,
                            status: jobInfo.getStatusMask(job.status),
                            createdAt: job.created_at,
                        })
                )
            )
        )
        .catch(error => res.status(500).json({error: 'Error retrieving jobs'}));
});

module.exports = router;