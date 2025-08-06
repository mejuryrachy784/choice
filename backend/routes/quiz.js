const express = require('express');
const { 
  getQuizQuestions, 
  submitQuiz, 
  getQuizStats,
  getQuizHistory 
} = require('../controllers/quizController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  console.log('📥 Quiz test route accessed');
  res.json({ message: 'Quiz routes are working!' });
});

// Public route for testing (no auth required) - Perfect for your Service.jsx
router.get('/questions/public', getQuizQuestions);

// Public route for About page sample questions
router.get('/questions/about', getQuizQuestions);

// Public route for submitting quiz without auth (for guest users)
router.post('/submit/public', submitQuiz);

// All other quiz routes require authentication
router.use(authenticateToken);

// Get quiz questions (authenticated)
router.get('/questions', getQuizQuestions);

// Submit quiz answers (authenticated)
router.post('/submit', submitQuiz);

// Get user quiz statistics
router.get('/stats', getQuizStats);

// Get user quiz history
router.get('/history', getQuizHistory);

module.exports = router;