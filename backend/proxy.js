// backend/proxy.js
// Simple Express backend proxy for Interactive Brokers and JP Morgan APIs
// Place your real API credentials in environment variables or a .env file (never hardcode in production)

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Proxy for Interactive Brokers
app.get('/api/ibkr/account-pnl', async (req, res) => {
  try {
    const response = await fetch(
      process.env.IBKR_API_URL || 'https://your-ibkr-api-endpoint.com/v1/api/iserver/account/pnl/summary',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.IBKR_TOKEN || 'YOUR_IBKR_TOKEN'}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: 'IBKR API error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

// Proxy for JP Morgan
app.get('/api/jpmorgan/account-summary', async (req, res) => {
  try {
    const response = await fetch(
      process.env.JPMORGAN_API_URL || 'https://your-jpmorgan-api-endpoint.com/v1/account/summary',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.JPMORGAN_TOKEN || 'YOUR_JPMORGAN_TOKEN'}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: 'JP Morgan API error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
