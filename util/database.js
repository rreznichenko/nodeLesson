const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'node',
    user: 'root',
    password:''
});

module.exports = pool.promise();