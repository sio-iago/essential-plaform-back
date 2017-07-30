const path = require('path');
const colors = require('colors');

const shellCommand = require('./system/shell-command');
const printUtil = require('./util/print-util');
const fileUtil = require('./util/file-util');


const jobInfo = require('./model/job-info');
const JOB_STATUS = jobInfo.JOB_STATUS;


const db = require('./services/database');
const connection = db.connection;


const contextPrefix = '[WATCHER]';
const WATCH_INTERVAL = process.env.WATCH_INTERVAL || 10000;
const orthoMCLBasePath = path.join(__dirname, 'scripts/orthomcl.sh');
const userFilesBasePath = path.join(__dirname, "files", "users");


const printErrorsToConsole = error =>
  console.log('%s Error: %s'.red, contextPrefix, error.message)


const getNewRegisteredJobs = () =>
  db.selectAll('job_info', { status: JOB_STATUS.NEW_JOB });

const getRunningJobs = () =>
  db.selectAll('job_info', { status: JOB_STATUS.RUNNING });

const changeJobStatusToRunning = job =>
  db.update('job_info', { id: job.id }, Object.assign(job, { status: JOB_STATUS.RUNNING }));

const getExecutionInfo = nextJob => {
  console.log('%s Running job @%s', contextPrefix, nextJob.id);

  const inputFileInfo = fileUtil.getFileNameAndExtension(nextJob.input_file);

  return {
    jobInfo: nextJob,
    inputFileInfo: inputFileInfo
  };
}

const watch = () => {
  console.log('%s Watching for new Jobs...'.white, contextPrefix);
  
  setInterval(() => {
    console.log('%s Checking new jobs'.white, contextPrefix);
    
    getRunningJobs()
      .then(runningJobs => {
        if(runningJobs.length === 0) {

          getNewRegisteredJobs()
            .then(results => {
              if (results.length > 0) {
                const nextJob = results[0];
                
                changeJobStatusToRunning(nextJob)
                  .then(() => getExecutionInfo(nextJob))
                  .then(execution => {
                    const baseUserDirectory = execution.inputFileInfo.basedir.split('/rawFasta')[0];
                    const resultsUserDirectory = path.join(baseUserDirectory, 'results');
                    const fullQualifiedResultFilePath = path.join(resultsUserDirectory, execution.inputFileInfo.name + '.csv');

                    const scriptFullQualifiedName = orthoMCLBasePath
                                                        + ' ' + baseUserDirectory
                                                        + ' ' + execution.inputFileInfo.name
                                                        + ' ' + execution.inputFileInfo.name.substr(0, 3);

                    shellCommand
                      .run(scriptFullQualifiedName, printUtil.shellDump)
                      .then(() => {
                        printUtil.shellDump("OrthoMCL job done!", contextPrefix);
                        db.update(
                          'job_info',
                          {id: execution.jobInfo.id},
                          {
                            status: JOB_STATUS.SUCCESS,
                            output_file: fullQualifiedResultFilePath,
                          }
                        )
                        .then(result => console.log('%s Job @%s done!'.green, contextPrefix, execution.jobInfo.id))
                        .catch(printErrorsToConsole);
                      })
                      .catch(printErrorsToConsole);
                      
                  })
                  .catch(printErrorsToConsole);
              }
            })
            .catch(printErrorsToConsole);

        }
      })
      .catch(printErrorsToConsole);

    },
    WATCH_INTERVAL
  );
};


watch();