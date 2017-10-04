const fs = require('fs');
const request = require('request');

const BIONODE_BASE_URL = 'https://www.ncbi.nlm.nih.gov/protein/';
const RESULT_PREFIX_REGEX = /essential\d+: /;


const isBlank = field => field.trim() !== '';

const removeNewLine = field => field.replace('\n', '');

const splitOnWhitespace = field => field.split(' ');

const asKeyValuePair = field =>
    Object.assign({}, { key: field.split('|')[0], value: field.split("|")[1] })

const asProteinValue = field => asKeyValuePair(field).value;

const firstBeforeBarSeparator = field => asKeyValuePair(field).key;

const identityOrFalse = (previous, value) => (value !== previous ? false : value)

const hasMultipleKeysBeforeBarSeparator = vec =>
    !vec.map(firstBeforeBarSeparator).reduce(identityOrFalse);

const joinResults = vec => vec.join(' ');

const mapVecOfStringsToKeyValuePair = vec => vec.map(asKeyValuePair);

const mapVecOfStringsToProteinValue = vec => vec.map(asProteinValue);


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

const getFilteredResultAsProteinValue = file_name =>
    fs.readFileSync(file_name, 'UTF-8')
        .split('\n')
        .filter(isBlank)
        .map(splitOnWhitespace)
        .map(mapVecOfStringsToProteinValue);

const getProteinInfoAsync = protein_id =>
    new Promise((resolve, reject) =>
        request(BIONODE_BASE_URL + protein_id, { followRedirect: false }, (err, response, body) => {
            const result = {};
            result[protein_id] = (err || response.statusCode !== 200) ? null : BIONODE_BASE_URL + protein_id;
            
            resolve(result);
        }));

const getProteinInfoFromFileAsync = file_name =>
    new Promise((resolve, reject) => {
        const infoList = [].concat.apply([], getFilteredResultAsKeyValuePairs(file_name));
        
        const uniqueIds = {};
        
        for(index in infoList) {
            uniqueIds[infoList[index].value] = true;
        }

        const promises = [];
        for(key in uniqueIds) {
            promises.push(getProteinInfoAsync(key));
        }

        Promise.all(promises)
            .then(results => resolve(results));
    });


module.exports = {
    filterOnlyResultsWithMultipleOrganisms: filterOnlyResultsWithMultipleOrganisms,
    getFilteredResultAsKeyValuePairs: getFilteredResultAsKeyValuePairs,
    getFilteredResultAsProteinValue: getFilteredResultAsProteinValue,
    getProteinInfoFromFileAsync: getProteinInfoFromFileAsync
};