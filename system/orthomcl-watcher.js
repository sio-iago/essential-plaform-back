/**
 * Watches the database for new orthomcl jobs to run.
 */
const colors = require('colors');

const process = require('process');
const childProcess = require('child_process');
const path = require('path');

const command = (scriptName, onDataCallback = null) =>
  new Promise((resolve, reject)=> {
    const { stdout, stderr } = childProcess.exec(scriptName);

    const results = [];

    stdout.on('data', data => { results.push(data); if(onDataCallback) onDataCallback(data); });
    stdout.on('end', () => resolve(results));

    stderr.on('data', data => reject(data));
  });


const main = (onDataCallback = null) => {
  const args = process.argv;
  
  if(!args || args.length < 3 || args.length >=4 ) {
    throw new Exception('You must provide only the filename');
  } 

  const currentWorkingDirectory = process.cwd();
  const scriptName = args[2];

  const scriptFullQualifiedName = path.join(currentWorkingDirectory, scriptName);

  return command(scriptFullQualifiedName, onDataCallback);
};


module.exports = {
  main: main,
}