const JOB_STATUS = {
  NEW_JOB: 'NEW_JOB',
  RUNNING: 'RUNNING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

const JOB_STATUS_MASK = {
  NEW_JOB: 'Received',
  RUNNING: 'Running',
  ERROR: 'Error',
  SUCCESS: 'Success',
};

const getStatusMask = status => JOB_STATUS_MASK[status];

const createJob = (filePath, organism, userId) =>
  Object.assign({}, {
    input_file: filePath,
    organism: organism,
    user_id: userId,
     multi_file: false,
    status: JOB_STATUS.NEW_JOB,
  });

const createJobMulti = (filePath, modelPath, userId) =>
    Object.assign({}, {
        input_file: filePath,
        organism: modelPath,
        user_id: userId,
        multi_file: true,
        status: JOB_STATUS.NEW_JOB,
    });


module.exports = {
  JOB_STATUS: JOB_STATUS,
  getStatusMask: getStatusMask,
  createJob: createJob,
  createJobMulti: createJobMulti,
};