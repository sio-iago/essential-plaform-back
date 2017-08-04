/**
 * Imports fasta files to database.
 * 
 * Run just the first time you
 * want to run the application.
 */
const db = require('./../services/database');

const fasta = require('bionode-fasta');

const colors = require('colors');
const fs = require('fs');
const process = require('process');


const FASTA_FOLDER = '/../files/rawFasta/';


const convertToModel = (line) =>
    Object.assign({}, {
        tag: line.id.split('|')[0],
        name: line.id.split('|')[1],
        sequence: line.seq,
    });

const newInsertFastaLinePromise = (line) =>
    db.insert('fasta_info', convertToModel(line));

const appendInsertAction = (vect, action) => vect.push(action);



console.log('[IMPORTER] Importing fastas from fasta directory'.white);
const fastaFiles = fs.readdirSync(__dirname + FASTA_FOLDER);

// Actions to run after reading all
let importActions = [];

const importationPromises = fastaFiles.map( file => 
    new Promise(
        resolve =>
            fasta
                .obj(__dirname + FASTA_FOLDER + file)
                .on('data', line => appendInsertAction(importActions, newInsertFastaLinePromise(line)))
                .on('end', () => resolve() )));

console.log('[IMPORTER] %d files to import. Starting...\n\n'.yellow, importationPromises.length);

Promise
    .all(importationPromises)
    .then(() => {
        console.log('[IMPORTER] Files successfully read! Importing into the database...'.yellow);
        return Promise.all(importActions);
    })
    .then(() => {
        console.log('[IMPORTER] Success! You\'re all set!'.green);
        process.exit(0);
    })
    .catch((err) => {
        console.log(('[IMPORTER] ERROR: '+err).red)
        process.exit(255);
    });
