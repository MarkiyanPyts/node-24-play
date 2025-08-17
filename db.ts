const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'play'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};