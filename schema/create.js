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

module.exports = {
    createUser: createUser,
}