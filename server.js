// backend/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createTableIfNotExists, insertFormData } = require('./model');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create the table if it does not exist
createTableIfNotExists();

// Endpoint to handle form submissions
app.post('/submit', async (req, res) => {
  const formData = req.body;

  try {
    const result = await insertFormData(formData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});