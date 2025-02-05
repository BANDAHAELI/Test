// Sarkar-MD
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yts from 'yt-search';

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
const fun = JSON.parse(fs.readFileSync(path.join(__dirname, 'fun.json')));
app.get('/fun', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomFun = fun[randomIndex];
    res.status(200).json({
      status: "success",
      code: 200,
      creator: "Sarkar-Bandaheali",
      Fun: randomFun
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
// Route to handle YouTube search
app.get("/api/yts", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Please provide a search query" });
    }

    // Perform YouTube search using yt-search
    const result = await ytSearch(query);

    // Extract video details
    const videos = result.videos.slice(0, 5).map((video) => ({
      title: video.title,
      url: video.url,
      duration: video.timestamp,
      views: video.views,
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
      
// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// POWERED BY BANDAHEALI
