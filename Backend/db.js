// db.js — PostgreSQL Connection Pool

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'taskmanager.cqteocc2o10h.us-east-1.rds.amazonaws.com',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '<YOUR_RDS_PASSWORD>',
  database: process.env.DB_NAME || 'postgres',

  max: 10,
  idleTimeoutMillis: 30000,

  // Required for AWS RDS PostgreSQL
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL successfully!');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client:', err);
});

module.exports = pool;
