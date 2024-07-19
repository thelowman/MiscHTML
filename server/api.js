const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json('Hello World!')
})

let pollAttempts = 0;
router.get('/poll', (req, res) => {
  pollAttempts++;
  if (pollAttempts < 10) {
    res.json({ status: 'pending' });
  }
  else {
    res.json({ status: 'success' });
    pollAttempts = 0;
  }
});

router.post('/noop', (req, res) => {
  res.json({ status: 'done' });
});

module.exports = router