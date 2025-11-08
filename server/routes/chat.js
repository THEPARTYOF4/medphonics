const express = require('express');
const router = express.Router();
const { validateBody } = require('../middleware/validate');
const chatSchema = require('../schemas/chat.request.json');

// POST /api/chat
// Expects { prompt: string, file?: { name: string, content?: string } }
// NOTE: This is a placeholder implementation — integrate with your AI service later.
router.post('/', validateBody(chatSchema), (req, res) => {
  const { prompt, file } = req.body || {};

  // For now, return a simple echo + placeholder reply
  const reply = {
    text: `Received prompt of length ${String(prompt).length}. (stub reply)`,
    tokens: Math.min(1024, String(prompt).length)
  };
  return res.json({ reply, prompt, fileReceived: !!file, id: `chat-${Date.now()}` });
});

module.exports = router;
