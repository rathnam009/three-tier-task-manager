// db.js — sets up a connection pool to the PostgreSQL database (Tier 3)

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppassword',
  database: process.env.DB_NAME || 'taskdb',
  max: 10,
  idleTimeoutMillis: 30000,

  // Required for AWS RDS PostgreSQL
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
});

module.exports = pool;
