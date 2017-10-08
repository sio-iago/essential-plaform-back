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

const createJobInfo = (db) =>
    db.schema.createTableIfNotExists('job_info', (table) => {
        table.increments();
        
        table.integer('user_id').unsigned();

        table.string('status', 12);
        
        table.string('input_file', 500);

        table.string('organism', 100);

        table.string('output_file', 500);

        table.timestamp('created_at').defaultTo(db.fn.now());

        table.foreign('user_id').references('users.id');
    });

module.exports = {
    createUser: createUser,
    createFastaInfo: createFastaInfo,
    createJobInfo: createJobInfo,
}