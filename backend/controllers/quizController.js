const Quiz = require('../models/Quiz');
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');

// Get random quiz questions for your Service.jsx
const getQuizQuestions = async (req, res) => {
  try {
    console.log("🔍 Quiz request received:", req.query);
    const { limit = 25, category, difficulty } = req.query;
    
    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    console.log("🔍 Filter:", filter);
    console.log("🔍 Limit:", parseInt(limit));

    // First check if we have any questions at all
    const totalCount = await Quiz.countDocuments(filter);
    console.log("🔍 Total questions matching filter:", totalCount);
    
    if (totalCount === 0) {
      return res.json({
        success: true,
        questions: [],
        total: 0,
        message: "No questions found matching criteria"
      });
    }

    // Get random questions
    let questions;
    try {
      questions = await Quiz.aggregate([
        { $match: filter },
        { $sample: { size: parseInt(limit) } },
        { $project: { 
          question: 1, 
          options: 1, 
          category: 1, 
          difficulty: 1,
          explanation: 1,
          correctAnswer: 1  // Include for Service.jsx compatibility
        }}
      ]);
    } catch (aggregateError) {
      console.log("⚠️ Aggregate failed, using fallback method:", aggregateError.message);
      // Fallback to simple find
      questions = await Quiz.find(filter)
        .select('question options category difficulty explanation correctAnswer')
        .limit(parseInt(limit));
    }

    // Transform questions to match your Service.jsx format
    const transformedQuestions = questions.map((q, index) => ({
      id: index + 1,
      questionText: q.question,
      category: q.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      options: q.options.map((option, optIndex) => ({
        id: String.fromCharCode(65 + optIndex), // A, B, C, D
        text: option,
      })),
      correctAnswer: String.fromCharCode(65 + q.correctAnswer), // Convert 0,1,2,3 to A,B,C,D
      explanation: q.explanation,
      difficulty: q.difficulty
    }));

    console.log("✅ Questions found:", transformedQuestions.length);
    
    res.json({
      success: true,
      questions: transformedQuestions,
      total: transformedQuestions.length
    });
  } catch (err) {
    console.error("❌ Quiz fetch error:", err);
    console.error("❌ Error stack:", err.stack);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching quiz questions",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Submit quiz results (for when user completes quiz)
const submitQuiz = async (req, res) => {
  try {
    const { answers, score, total, timeSpent, questions } = req.body;
    
    // If user is authenticated, save to database
    const token = req.headers.authorization?.split(' ')[1];
    let userId = null;
    
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (tokenError) {
        console.log("⚠️ Invalid token, proceeding without user association");
      }
    }

    // Calculate detailed results
    const results = [];
    let correctCount = 0;
    
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = answers[i];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) correctCount++;
      
      results.push({
        questionId: question.id,
        questionText: question.questionText,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        category: question.category
      });
    }

    const percentage = Math.round((correctCount / total) * 100);
    const mistakes = results.filter(r => !r.isCorrect);

    // Save result if user is authenticated
    if (userId) {
      const quizResult = new QuizResult({
        userId,
        score: correctCount,
        totalQuestions: total,
        percentage,
        timeSpent,
        answers: results,
        completedAt: new Date()
      });
      
      await quizResult.save();
      console.log("✅ Quiz result saved for user:", userId);
    }

    res.json({
      success: true,
      message: "✅ Quiz completed successfully",
      results: {
        correct: correctCount,
        total,
        percentage,
        mistakes: mistakes.length,
        timeSpent,
        detailed: results
      }
    });
  } catch (err) {
    console.error("❌ Quiz submission error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error submitting quiz" 
    });
  }
};

// Get user quiz statistics
const getQuizStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const stats = await QuizResult.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalQuizzes: { $sum: 1 },
          averageScore: { $avg: "$percentage" },
          bestScore: { $max: "$percentage" },
          totalTimeSpent: { $sum: "$timeSpent" }
        }
      }
    ]);

    const recentResults = await QuizResult.find({ userId })
      .sort({ completedAt: -1 })
      .limit(10)
      .select('score totalQuestions percentage completedAt timeSpent');

    res.json({
      success: true,
      stats: stats[0] || {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalTimeSpent: 0
      },
      recentResults
    });
  } catch (err) {
    console.error("❌ Stats fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching quiz statistics" 
    });
  }
};

// Get quiz history for user
const getQuizHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query;
    
    const history = await QuizResult.find({ userId })
      .sort({ completedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('score totalQuestions percentage completedAt timeSpent');

    const total = await QuizResult.countDocuments({ userId });

    res.json({
      success: true,
      history,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        hasNext: page * limit < total
      }
    });
  } catch (err) {
    console.error("❌ History fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching quiz history" 
    });
  }
};

module.exports = {
  getQuizQuestions,
  submitQuiz,
  getQuizStats,
  getQuizHistory
};