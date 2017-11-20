/**
 * Creates the database schema.
 */

const dropUser = (db) =>
    db.schema.dropTableIfExists('users');

const dropFastaAnnotation = (db) =>
    db.schema.dropTableIfExists('fasta_annotation');

const dropJobInfo = (db) =>
    db.schema.dropTableIfExists('job_info');

module.exports = {
    dropUser: dropUser,
    dropFastaAnnotation: dropFastaAnnotation,
    dropJobInfo: dropJobInfo,
};