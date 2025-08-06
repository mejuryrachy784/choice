const User = require('../models/User');
const Result = require('../models/Result');

// Get user results and history
const getUserResults = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).select('scores mistakes attempts');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      results: {
        scores: user.scores,
        mistakes: user.mistakes,
        totalAttempts: user.attempts
      }
    });
  } catch (err) {
    console.error("❌ Results fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching user results" 
    });
  }
};

// Get detailed results for a specific session
const getSessionResults = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    const results = await Result.find({ 
      userId, 
      sessionId 
    }).populate('quizId', 'question options correctAnswer explanation');

    res.json({
      success: true,
      sessionResults: results
    });
  } catch (err) {
    console.error("❌ Session results fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching session results" 
    });
  }
};

// Get user mistakes for review
const getUserMistakes = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 20 } = req.query;

    const user = await User.findById(userId).select('mistakes');
    
    // Get recent mistakes
    const recentMistakes = user.mistakes
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      mistakes: recentMistakes,
      total: user.mistakes.length
    });
  } catch (err) {
    console.error("❌ Mistakes fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching user mistakes" 
    });
  }
};

// Clear user history (optional feature)
const clearUserHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, {
      $set: {
        scores: [],
        mistakes: [],
        attempts: 0
      }
    });

    // Also clear detailed results
    await Result.deleteMany({ userId });

    res.json({
      success: true,
      message: "✅ User history cleared successfully"
    });
  } catch (err) {
    console.error("❌ Clear history error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error clearing user history" 
    });
  }
};

module.exports = {
  getUserResults,
  getSessionResults,
  getUserMistakes,
  clearUserHistory
};