const QuizResult = require('../models/QuizResult');
const User = require('../models/User');

// Get quiz history for a user or all users
const getQuizHistory = async (req, res) => {
  try {
    const { userId, limit = 50 } = req.query;
    
    // Build query filter
    let filter = {};
    if (userId) {
      filter.userId = userId;
    }

    // Fetch quiz results from database
    const results = await QuizResult.find(filter)
      .populate('userId', 'name email') // Populate user info if available
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    // Format results for history display
    const history = results.map(result => {
      const percentage = result.percentage || Math.round((result.score / result.totalQuestions) * 100);
      let feedback = 'Good';
      
      if (percentage >= 90) feedback = 'Excellent';
      else if (percentage >= 80) feedback = 'Very Good';
      else if (percentage >= 70) feedback = 'Good';
      else if (percentage >= 60) feedback = 'Fair';
      else feedback = 'Needs Improvement';

      return {
        id: result._id,
        topic: result.topic || result.category || 'General Quiz',
        datetime: result.createdAt.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(',', ' at'),
        duration: result.timeSpent ? 
          `${Math.floor(result.timeSpent)}m ${Math.round((result.timeSpent % 1) * 60)}s` : 
          '15m 30s',
        scorePercent: percentage,
        correctAnswers: result.score,
        totalQuestions: result.totalQuestions,
        feedback: feedback,
        user: result.userId ? {
          name: result.userId.name,
          email: result.userId.email
        } : null,
        answers: result.answers || [],
        mistakes: result.mistakes || []
      };
    });

    // If no results in database, return sample data for demonstration
    if (history.length === 0) {
      const sampleHistory = [
        {
          id: 'sample-1',
          topic: "Road Signs",
          datetime: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).replace(',', ' at'),
          duration: "15m 30s",
          scorePercent: 85,
          correctAnswers: 17,
          totalQuestions: 20,
          feedback: "Very Good",
          user: null,
          answers: [],
          mistakes: []
        },
        {
          id: 'sample-2',
          topic: "Traffic Rules",
          datetime: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).replace(',', ' at'),
          duration: "12m 15s",
          scorePercent: 72,
          correctAnswers: 11,
          totalQuestions: 15,
          feedback: "Good",
          user: null,
          answers: [],
          mistakes: []
        },
        {
          id: 'sample-3',
          topic: "Highway Code",
          datetime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).replace(',', ' at'),
          duration: "18m 45s",
          scorePercent: 90,
          correctAnswers: 23,
          totalQuestions: 25,
          feedback: "Excellent",
          user: null,
          answers: [],
          mistakes: []
        }
      ];

      return res.json({
        success: true,
        message: 'No quiz history found, showing sample data',
        history: sampleHistory,
        total: sampleHistory.length
      });
    }

    res.json({
      success: true,
      message: 'Quiz history retrieved successfully',
      history: history,
      total: history.length
    });

  } catch (error) {
    console.error('Error fetching quiz history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz history',
      error: error.message
    });
  }
};

// Get detailed history for a specific quiz result
const getQuizHistoryDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await QuizResult.findById(id)
      .populate('userId', 'name email');

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Quiz result not found'
      });
    }

    const percentage = result.percentage || Math.round((result.score / result.totalQuestions) * 100);
    let feedback = 'Good';
    
    if (percentage >= 90) feedback = 'Excellent';
    else if (percentage >= 80) feedback = 'Very Good';
    else if (percentage >= 70) feedback = 'Good';
    else if (percentage >= 60) feedback = 'Fair';
    else feedback = 'Needs Improvement';

    const detailedHistory = {
      id: result._id,
      topic: result.topic || result.category || 'General Quiz',
      datetime: result.createdAt.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', ' at'),
      duration: result.timeSpent ? 
        `${Math.floor(result.timeSpent)}m ${Math.round((result.timeSpent % 1) * 60)}s` : 
        '15m 30s',
      scorePercent: percentage,
      correctAnswers: result.score,
      totalQuestions: result.totalQuestions,
      feedback: feedback,
      user: result.userId ? {
        name: result.userId.name,
        email: result.userId.email
      } : null,
      answers: result.answers || [],
      mistakes: result.mistakes || [],
      questions: result.questions || []
    };

    res.json({
      success: true,
      message: 'Quiz history detail retrieved successfully',
      history: detailedHistory
    });

  } catch (error) {
    console.error('Error fetching quiz history detail:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz history detail',
      error: error.message
    });
  }
};

// Delete a quiz history entry
const deleteQuizHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await QuizResult.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Quiz result not found'
      });
    }

    res.json({
      success: true,
      message: 'Quiz history deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting quiz history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quiz history',
      error: error.message
    });
  }
};

// Get quiz statistics
const getQuizStatistics = async (req, res) => {
  try {
    const { userId } = req.query;
    
    let filter = {};
    if (userId) {
      filter.userId = userId;
    }

    const results = await QuizResult.find(filter);

    if (results.length === 0) {
      return res.json({
        success: true,
        message: 'No quiz statistics available',
        statistics: {
          totalQuizzes: 0,
          averageScore: 0,
          bestScore: 0,
          totalTimeSpent: 0,
          categoryBreakdown: {},
          recentActivity: []
        }
      });
    }

    // Calculate statistics
    const totalQuizzes = results.length;
    const scores = results.map(r => r.percentage || Math.round((r.score / r.totalQuestions) * 100));
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const bestScore = Math.max(...scores);
    const totalTimeSpent = results.reduce((total, r) => total + (r.timeSpent || 0), 0);

    // Category breakdown
    const categoryBreakdown = {};
    results.forEach(result => {
      const category = result.topic || result.category || 'General';
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = {
          count: 0,
          averageScore: 0,
          totalScore: 0
        };
      }
      categoryBreakdown[category].count++;
      const score = result.percentage || Math.round((result.score / result.totalQuestions) * 100);
      categoryBreakdown[category].totalScore += score;
      categoryBreakdown[category].averageScore = Math.round(
        categoryBreakdown[category].totalScore / categoryBreakdown[category].count
      );
    });

    // Recent activity (last 10 quizzes)
    const recentActivity = results
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map(result => ({
        topic: result.topic || result.category || 'General Quiz',
        score: result.percentage || Math.round((result.score / result.totalQuestions) * 100),
        date: result.createdAt.toLocaleDateString()
      }));

    res.json({
      success: true,
      message: 'Quiz statistics retrieved successfully',
      statistics: {
        totalQuizzes,
        averageScore,
        bestScore,
        totalTimeSpent: Math.round(totalTimeSpent),
        categoryBreakdown,
        recentActivity
      }
    });

  } catch (error) {
    console.error('Error fetching quiz statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz statistics',
      error: error.message
    });
  }
};

module.exports = {
  getQuizHistory,
  getQuizHistoryDetail,
  deleteQuizHistory,
  getQuizStatistics
};