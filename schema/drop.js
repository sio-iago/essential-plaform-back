/**
 * Creates the database schema.
 */

const dropUser = (db) =>
    db.schema.dropTableIfExists('users');

module.exports = {
    dropUser: dropUser,
}