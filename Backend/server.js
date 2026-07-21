// server.js — entry point for the backend
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'healthy',
      db: 'connected'
    });
  } catch (err) {
    res.status(503).json({
      status: 'unhealthy',
      db: 'disconnected',
      error: err.message
    });
  }
});

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running'
  });
});

app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});