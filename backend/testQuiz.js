require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');

const testQuiz = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Test aggregation
    const questions = await Quiz.aggregate([
      { $sample: { size: 2 } },
      { $project: { 
        question: 1, 
        options: 1, 
        category: 1, 
        difficulty: 1,
        explanation: 1
      }}
    ]);
    
    console.log('Aggregated questions:', questions.length);
    if (questions.length > 0) {
      console.log('Sample question:', questions[0].question);
      console.log('Options:', questions[0].options);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

testQuiz();