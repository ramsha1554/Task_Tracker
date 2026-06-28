const express = require('express');
const router = express.Router();

// Health check — useful for Render's uptime checks
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;