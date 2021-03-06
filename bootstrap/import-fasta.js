const colors = require('colors');
const fs = require('fs');
const path = require('path');

const annotation = require('./../model/annotation');
const db = require('./../services/database');

// Constants
const ANNOTATION_FILE_PATH = path.join(__dirname, '..', 'files', 'rawFasta', 'eukaryote', 'degannotation-e.dat');

const ANNOTATION_TABLE_NAME = 'fasta_annotation';

const SCER_PREFIX = 'DEG2001';
const ELEG_PREFIX = 'DEG2002';
const DANI_PREFIX = 'DEG2004';


// Functions
const readFileData = () =>
    fs.readFileSync(ANNOTATION_FILE_PATH, 'UTF-8').split('\n');

const readColumns = line => line.split('\t');

const readAnnotations = fileData =>
    fileData
        .slice(1, fileData.length)
        .map(readColumns)
        .map(annotation.createAnnotation);

const insertAnnotationsListToDB = annotationList =>
    annotationList.map(v => db.insert(ANNOTATION_TABLE_NAME, v));

// Main execution
console.log('[ANNOTATIONS] Reading annotation file'.green);

const annotationList = readAnnotations(readFileData());
const scerAnnotations = annotationList.filter(v => annotation.hasPrefix(v, SCER_PREFIX));
const elegAnnotations = annotationList.filter(v => annotation.hasPrefix(v, ELEG_PREFIX));
const daniAnnotations = annotationList.filter(v => annotation.hasPrefix(v, DANI_PREFIX));

console.log('[ANNOTATIONS] Data retrieved'.green);

console.log('[ANNOTATIONS] Importing to the database'.yellow);
const scerPromises = insertAnnotationsListToDB(scerAnnotations);
const elegPromises = insertAnnotationsListToDB(elegAnnotations);
const daniPromises = insertAnnotationsListToDB(daniAnnotations);

Promise.all([].concat(scerPromises, elegPromises, daniPromises))
    .then(res => {
        console.log('[ANNOTATIONS] Data imported!'.green);
        process.exit(0);
    })
    .catch((err) => {
        console.log(('[ANNOTATIONS] Error: ' + err.toString()).red);
        process.exit(255);
    });

