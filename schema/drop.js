/**
 * Creates the database schema.
 */

const dropUser = (db) =>
    db.schema.dropTableIfExists('users');

const dropFastaInfo = (db) =>
    db.schema.dropTableIfExists('fasta_info');

const dropJobInfo = (db) =>
    db.schema.dropTableIfExists('job_info');

module.exports = {
    dropUser: dropUser,
    dropFastaInfo: dropFastaInfo,
    dropJobInfo: dropJobInfo,
}