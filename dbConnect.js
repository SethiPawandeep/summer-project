var pgp = require('pg-promise')({});

var credentials = {
    host: 'localhost',
    port: 5000,
    database: 'NIC_db',
    user: 'postgres',
    password: 'ips'
};

var db = pgp(credentials);

module.exports = db;
