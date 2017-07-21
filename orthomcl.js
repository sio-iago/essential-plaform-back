const shellCommand = require('./system/shell-command');
const printUtil = require('./util/print-util');
const path = require('path');

const contextPrefix = '[WATCHER]';

const scriptFullQualifiedName = path.join(__dirname, 'scripts/orthomcl.sh');
console.log(scriptFullQualifiedName);

printUtil.shellDump('Starting to watch OrthoMCL jobs...', contextPrefix)
shellCommand
  .run(scriptFullQualifiedName, printUtil.shellDump)
  .then((result) => printUtil.shellDump("OrthoMCL job done!",contextPrefix))
  .catch((err)=> printUtil.shellDump(err,contextPrefix));