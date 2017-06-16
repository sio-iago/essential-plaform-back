/**
 * Bootstraps the application.
 * 
 * Run just the first time you
 * want to run the application.
 */
const db = require('./services/database');
const schemaCreate = require('./schema/create');
const schemaDrop = require('./schema/drop');
const colors = require('colors');
const process = require('process');

// Creating users table
console.log('[BOOTSTRAP] Creating users table'.yellow);
Promise.all(
    [
        schemaDrop.dropUser(db.connection),
        schemaCreate.createUser(db.connection)
    ]
)
.then(() => {
    console.log('[BOOTSTRAP] Your app is ready to be started!'.green);
    process.exit(0);
})
.catch((err) => {
    console.log(('[BOOTSTRAP] Error: ' + err.toString()).red);
    process.exit(255);
});



