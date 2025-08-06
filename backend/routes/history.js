const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// GET /api/quiz/history - Get quiz history
router.get('/', historyController.getQuizHistory);

// GET /api/quiz/history/stats - Get quiz statistics
router.get('/stats', historyController.getQuizStatistics);

// GET /api/quiz/history/:id - Get detailed history for specific quiz
router.get('/:id', historyController.getQuizHistoryDetail);

// DELETE /api/quiz/history/:id - Delete a quiz history entry
router.delete('/:id', historyController.deleteQuizHistory);

module.exports = router;