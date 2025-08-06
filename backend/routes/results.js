const express = require('express');
const { 
  getUserResults, 
  getSessionResults, 
  getUserMistakes,
  clearUserHistory 
} = require('../controllers/resultController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All result routes require authentication
router.use(authenticateToken);

// Get user results
router.get('/', getUserResults);

// Get specific session results
router.get('/session/:sessionId', getSessionResults);

// Get user mistakes for review
router.get('/mistakes', getUserMistakes);

// Clear user history
router.delete('/clear', clearUserHistory);

module.exports = router;