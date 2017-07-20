/**
 * Some printing utils to have better logging.
 */
const colors = require('colors');

const shellDump = (input, contextPrefix='') =>
  console.log('%s %s'.white, contextPrefix, input);

const mapShellDump = (inputArray, contextPrefix='') => (
    Array.isArray(inputArray) ?
      inputArray.map(v =>  shellDump(v, contextPrefix)) :
      console.log('%s Not an array!'.magenta, contextPrefix)
);

module.exports = {
  shellDump: shellDump,
  mapShellDump: mapShellDump,
};