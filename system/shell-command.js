/**
 * @author Iago Oliveira da Silva
 * Runner a shell script command
 */

const process = require('process');
const childProcess = require('child_process');
const path = require('path');

/**
 * Runs the command.
 * 
 * @param {string} scriptName 
 * @param {function} onDataCallback 
 * @returns {Promise}
 */
const command = (scriptName, onDataCallback = null) =>
  new Promise((resolve, reject)=> {
    const { stdout, stderr } = childProcess.exec(scriptName);

    const results = [];

    stdout.on('data', data => { 
      results.push(data);
      
      if(onDataCallback) {
        onDataCallback(data);
      }
    });
    stdout.on('end', () => resolve(results));

    stderr.on('data', data => reject(data));
  });

/**
 * Runs a shell script asynchronously.
 * 
 * @param {string} scriptFullQualifiedName 
 * @param {function} onDataCallback 
 * @returns {Promise}
 */
const run = (scriptFullQualifiedName='', onDataCallback = null) => {
  if(!scriptFullQualifiedName || scriptFullQualifiedName.length <= 0) {
    throw new Exception('Script name must not be empty!');
  }

  return command(scriptFullQualifiedName, onDataCallback);
};


module.exports = {
  run: run,
}