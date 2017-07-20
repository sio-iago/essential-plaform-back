const orthomclWatcher = require('./system/orthomcl-watcher');
const printUtil = require('./util/print-util');

const contextPrefix = '[WATCHER]';

printUtil.shellDump('Starting to watch OrthoMCL jobs...',contextPrefix)
orthomclWatcher
  .main(printUtil.shellDump)
  .then((result) => printUtil.shellDump("OrthoMCL job done!",contextPrefix))
  .catch((err)=> printUtil.shellDump(err,contextPrefix));;