/**
 * Creates the database schema.
 */

const createUser = (db) =>
    db.schema.createTableIfNotExists('users', (table) => {
        table.increments();
        
        table.string('username', 20).unique();
        
        table.string('password', 100);
        
        table.string('email', 100).unique();
        
        table.string('token').unique();
        
        table.timestamp('last_login', db.fn.now());
    });

const createFastaInfo = (db) =>
    db.schema.createTableIfNotExists('fasta_info', (table) => {
        table.increments();
        
        table.string('tag', 100);

        table.string('name', 100).unique();
        
        table.string('sequence', 10000);
    });

module.exports = {
    createUser: createUser,
    createFastaInfo: createFastaInfo,
}