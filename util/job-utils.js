const fs = require('fs');

const RESULT_PREFIX_REGEX = /essential\d+: /;

const isBlank = field => field.trim() !== '';

const removeNewLine = field => field.replace('\n','');

const splitOnWhitespace = field => field.split(' ');

const asKeyValuePair = field =>
        Object.assign({}, { key: field.split('|')[0], value: field.split("|")[1]})

const firstBeforeBarSeparator = field => asKeyValuePair(field).key;

const identityOrFalse = (previous, value) => (value !== previous ? false : value) 

const hasMultipleKeysBeforeBarSeparator = vec =>
        !vec.map(firstBeforeBarSeparator).reduce(identityOrFalse);

const joinResults = vec => vec.join(' ');

const mapVecOfStringsToKeyValuePair = vec => vec.map(asKeyValuePair);


const filterOnlyResultsWithMultipleOrganisms = file_name =>
        fs.readFileSync(file_name, 'UTF-8')
            .split(RESULT_PREFIX_REGEX)
            .filter(isBlank)
            .map(removeNewLine)
            .map(splitOnWhitespace)
            .filter(hasMultipleKeysBeforeBarSeparator)
            .map(joinResults)
            .join('\n');


const getFilteredResultAsKeyValuePairs = file_name =>
        fs.readFileSync(file_name, 'UTF-8')
            .split('\n')
            .filter(isBlank)
            .map(splitOnWhitespace)
            .map(mapVecOfStringsToKeyValuePair);



module.exports = {
    filterOnlyResultsWithMultipleOrganisms: filterOnlyResultsWithMultipleOrganisms,
    getFilteredResultAsKeyValuePairs: getFilteredResultAsKeyValuePairs,
};