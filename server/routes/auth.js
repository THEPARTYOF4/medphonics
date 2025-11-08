const express = require('express');
const router = express.Router();
const { validateBody } = require('../middleware/validate');
const signupSchema = require('../schemas/signup.request.json');
const loginSchema = require('../schemas/login.request.json');

// Simple in-memory users store for demo purposes only.
// DO NOT use this in production. Passwords are stored in plaintext here for simplicity.
const users = [];
let nextId = 1;

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

// POST /api/signup
// Expects { username, password }
router.post('/signup', validateBody(signupSchema), (req, res) => {
  const { username, password, email } = req.body || {};
  if (findUserByUsername(username)) {
    return res.status(409).json({ error: 'username already exists' });
  }

  const user = { id: nextId++, username, password, email: email || null, createdAt: new Date().toISOString() };
  users.push(user);
  const safeUser = { id: user.id, username: user.username, createdAt: user.createdAt };
  return res.status(201).json({ user: safeUser });
});

// POST /api/login
// Expects { username, password }
router.post('/login', validateBody(loginSchema), (req, res) => {
  const { username, password } = req.body || {};
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  // Return a simple token placeholder (not secure)
  const token = `token-${user.id}-${Date.now()}`;
  return res.json({ user: { id: user.id, username: user.username }, token });
});

module.exports = router;
