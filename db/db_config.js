const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD
});

module.exports = pool;