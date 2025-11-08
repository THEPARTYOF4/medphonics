const express = require('express');
const router = express.Router();

// Example in-memory glossary and articles. Replace with DB/external API later.
const glossary = {
  "AI": "Artificial Intelligence - systems that perform tasks requiring human intelligence",
  "ML": "Machine Learning - algorithms that improve from experience",
  "NLP": "Natural Language Processing - processing human language"
};

const articles = [
  { id: 1, title: 'Intro to AI', url: 'https://example.com/intro-to-ai' },
  { id: 2, title: 'Getting started with ML', url: 'https://example.com/ml-start' }
];

// GET /api/glossary
router.get('/glossary', (req, res) => {
  res.json({ glossary });
});

// GET /api/articles
router.get('/articles', (req, res) => {
  res.json({ articles });
});

module.exports = router;
