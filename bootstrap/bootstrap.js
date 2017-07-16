/**
 * Bootstraps the application.
 * 
 * Run just the first time you
 * want to run the application.
 */
const db = require('./../services/database');
const schemaCreate = require('./../schema/create');
const schemaDrop = require('./../schema/drop');
const colors = require('colors');
const process = require('process');

// Creating users table
console.log('[BOOTSTRAP] Dropping tables'.yellow);
Promise.all([
    // Drops all
    schemaDrop.dropUser(db.connection),
    schemaDrop.dropFastaInfo(db.connection),
])
.then(() => {
    console.log('[BOOTSTRAP] Creating tables'.yellow);
    // Creates all
    return Promise.all([
        schemaCreate.createUser(db.connection),
        schemaCreate.createFastaInfo(db.connection),
    ]);
})
.then(() => {
    console.log('[BOOTSTRAP] Your app is ready to be started!'.green);
    process.exit(0);
})
.catch((err) => {
    console.log(('[BOOTSTRAP] Error: ' + err.toString()).red);
    process.exit(255);
});



