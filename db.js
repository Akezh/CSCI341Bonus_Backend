const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'Leetcoder99',
    host: '34.64.105.194',
    port: 5432,
    database: "postgres"
})

module.exports = pool