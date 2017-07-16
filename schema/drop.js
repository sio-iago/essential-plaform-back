/**
 * Creates the database schema.
 */

const dropUser = (db) =>
    db.schema.dropTableIfExists('users');

const dropFastaInfo = (db) =>
    db.schema.dropTableIfExists('fasta_info');

module.exports = {
    dropUser: dropUser,
    dropFastaInfo: dropFastaInfo,
}