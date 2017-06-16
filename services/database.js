const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        'database': 'essential'
    },
    debug: true,
});

module.exports = knex;