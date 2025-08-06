const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  attempts: { 
    type: Number, 
    default: 0 
  },
  scores: [{
    date: { type: Date, default: Date.now },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true }
  }],
  mistakes: [{
    questionId: { type: String, required: true },
    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    userAnswer: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }],
  isVerified: { 
    type: Boolean, 
    default: false 
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);