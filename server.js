const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const SCORES_FILE = path.join(__dirname, 'scores.json');

// Middleware
app.use(express.json());

// CORS for API endpoints
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files
app.use(express.static(__dirname));

// Initialize scores.json if it doesn't exist
function initScoresFile() {
  if (!fs.existsSync(SCORES_FILE)) {
    fs.writeFileSync(SCORES_FILE, '[]', 'utf8');
  }
}

// Read scores from file
function readScores() {
  try {
    const data = fs.readFileSync(SCORES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Write scores to file
function writeScores(scores) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf8');
}

// GET /api/scores - Return top 10 scores sorted by score desc
app.get('/api/scores', (req, res) => {
  try {
    const scores = readScores();
    const sortedScores = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ name, score, date }) => ({ name, score, date }));
    res.json(sortedScores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read scores' });
  }
});

// POST /api/scores - Accept {name, score}, validate, and save
app.post('/api/scores', (req, res) => {
  const { name, score } = req.body;

  // Validate name: required, 1-10 chars
  if (!name || typeof name !== 'string' || name.length < 1 || name.length > 10) {
    return res.status(400).json({ error: 'Name is required and must be 1-10 characters' });
  }

  // Validate score: must be >= 0
  if (typeof score !== 'number' || score < 0 || !Number.isInteger(score)) {
    return res.status(400).json({ error: 'Score must be a non-negative integer' });
  }

  try {
    const scores = readScores();
    const newEntry = {
      name: name.trim(),
      score,
      date: new Date().toISOString().split('T')[0]
    };
    scores.push(newEntry);
    writeScores(scores);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Initialize and start server
initScoresFile();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Snake Game server running at http://localhost:${PORT}`);
});