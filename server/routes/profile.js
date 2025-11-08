const express = require('express');
const router = express.Router();
const { validateParams } = require('../middleware/validate');
const profileParamsSchema = require('../schemas/profile.params.json');

// This shares the same in-memory users array as auth.js. For a real app,
// users would be stored in a shared DB or service. To keep this file self-contained
// for the demo, we'll recreate a small users collection and provide a few sample profiles.

const sampleProfiles = {
  1: { id: 1, username: 'alice', name: 'Alice Example', bio: 'Demo user' },
  2: { id: 2, username: 'bob', name: 'Bob Example', bio: 'Another demo' }
};

// GET /api/profile/:userID
router.get('/profile/:userID', validateParams(profileParamsSchema), (req, res) => {
  const { userID } = req.params;
  const id = Number(userID);
  if (!id || !sampleProfiles[id]) {
    return res.status(404).json({ error: 'user not found' });
  }
  return res.json({ profile: sampleProfiles[id] });
});

module.exports = router;
