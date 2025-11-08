const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Routers
const chatRouter = require('./routes/chat');
const contentRouter = require('./routes/content');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

app.use('/api/chat', chatRouter);
app.use('/api', contentRouter);
app.use('/api', authRouter);
app.use('/api', profileRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hackathon_2026 backend (dev only) - try /api/glossary' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
