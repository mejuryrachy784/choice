const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'road_signs', 'traffic_rules', 'speed_limits', 'safety_rules',
      'parking_regulations', 'emergency_procedures', 'weather_conditions',
      'vehicle_maintenance', 'pedestrian_safety',
      'traffic_signals', 'traffic_signs', 'following_distance',
      'parking', 'right_of_way', 'safety', 'alcohol_drugs', 'road_markings',
      'intersections', 'weather', 'emergency', 'maintenance', 'general_safety',
      'general', 'science', 'history', 'sports', 'technology'
    ],
    default: 'general'
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  explanation: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);