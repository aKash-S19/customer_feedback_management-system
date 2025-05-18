const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback - Submit new feedback
router.post('/', async (req, res) => {
  const { rating, comment, serviceType } = req.body;

  if (!rating || !comment || !serviceType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const feedback = new Feedback({ rating, comment, serviceType });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET /api/feedback - return all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: 1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

module.exports = router;
