// backend/model.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to create the table if it does not exist
const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Table "submissions" is ready.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Function to insert form data into the table
const insertFormData = async (formData) => {
  const { fullName, email, username, content } = formData;
  const insertQuery = `
    INSERT INTO submissions (full_name, email, username, content)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  try {
    const result = await pool.query(insertQuery, [fullName, email, username, content]);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

module.exports = {
  createTableIfNotExists,
  insertFormData,
};