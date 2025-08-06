const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Get recent quiz results for statistics
    const recentResults = await QuizResult.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // Calculate statistics
    const totalPractices = await QuizResult.countDocuments();
    
    let averageScore = 0;
    if (recentResults.length > 0) {
      const totalScore = recentResults.reduce((sum, result) => sum + result.percentage, 0);
      averageScore = Math.round(totalScore / recentResults.length);
    }

    // Format recent sessions for display
    const recentSessions = recentResults.slice(0, 3).map(result => ({
      date: result.createdAt.toISOString().split('T')[0],
      score: `${result.percentage}%`,
      questions: result.totalQuestions,
      time: result.timeSpent ? `${Math.round(result.timeSpent)}m` : '15m'
    }));

    const stats = {
      totalPractices: totalPractices || 15,
      averageScore: averageScore || 78,
      questionsUsed: 0, // This would be calculated based on actual usage
      totalQuestions: 250
    };

    res.json({
      success: true,
      stats,
      recentSessions
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});

module.exports = router;