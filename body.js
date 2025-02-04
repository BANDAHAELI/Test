// Sarkar-MD
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load quotes from the JSON file
const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'quotes.json')));

// API Endpoint to fetch a random quote
app.get('/random-quote', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.status(200).json({
      status: "success",
      code: 200,
      creator: "Sarkar-Bandaheali",
      quote: randomQuote
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      creator: "Sarkar-Bandaheali",
      message: "An error occurred while fetching the quote."
    });
  }
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// POWERED BY BANDAHEALI
