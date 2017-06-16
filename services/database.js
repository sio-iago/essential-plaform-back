const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'essential',
    },
    debug: true,
});

const selectAll = (table, filters) => 
    knex
        .select()
        .from(table)
        .where(filters);

const selectOne = (table, filters) =>
    selectAll(table, filters)
        .limit(1);

const insert = (table, data) => 
    knex(table)
        .returning(Object.keys(data))
        .insert(data);

const update = (table, filters, data) =>
    knex(table)
        .returning(Object.keys(data))
        .where(filters)
        .update(data);
        

module.exports = {
    connection: knex,
    selectAll: selectAll,
    selectOne: selectOne,
    insert: insert,
    update: update,
};