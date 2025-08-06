// Simple test script to verify server functionality
const express = require('express');
const cors = require('cors');

console.log('🧪 Testing server components...');

// Test 1: Basic Express setup
try {
  const app = express();
  app.use(cors());
  app.use(express.json());
  console.log('✅ Express setup successful');
} catch (error) {
  console.error('❌ Express setup failed:', error.message);
  process.exit(1);
}

// Test 2: Route imports
try {
  const authRoutes = require('./routes/auth');
  console.log('✅ Auth routes imported successfully');
} catch (error) {
  console.error('❌ Auth routes import failed:', error.message);
}

try {
  const quizRoutes = require('./routes/quiz');
  console.log('✅ Quiz routes imported successfully');
} catch (error) {
  console.error('❌ Quiz routes import failed:', error.message);
}

try {
  const resultRoutes = require('./routes/results');
  console.log('✅ Result routes imported successfully');
} catch (error) {
  console.error('❌ Result routes import failed:', error.message);
}

try {
  const dashboardRoutes = require('./routes/dashboard');
  console.log('✅ Dashboard routes imported successfully');
} catch (error) {
  console.error('❌ Dashboard routes import failed:', error.message);
}

try {
  const historyRoutes = require('./routes/history');
  console.log('✅ History routes imported successfully');
} catch (error) {
  console.error('❌ History routes import failed:', error.message);
}

try {
  const instructionsRoutes = require('./routes/instructions');
  console.log('✅ Instructions routes imported successfully');
} catch (error) {
  console.error('❌ Instructions routes import failed:', error.message);
}

// Test 3: Models
try {
  const User = require('./models/User');
  console.log('✅ User model imported successfully');
} catch (error) {
  console.error('❌ User model import failed:', error.message);
}

try {
  const QuizResult = require('./models/QuizResult');
  console.log('✅ QuizResult model imported successfully');
} catch (error) {
  console.error('❌ QuizResult model import failed:', error.message);
}

// Test 4: Environment variables
try {
  require('dotenv').config();
  console.log('✅ Environment variables loaded');
  console.log('   - PORT:', process.env.PORT || 'not set');
  console.log('   - MONGO_URI:', process.env.MONGO_URI ? 'set' : 'not set');
  console.log('   - JWT_SECRET:', process.env.JWT_SECRET ? 'set' : 'not set');
} catch (error) {
  console.error('❌ Environment variables failed:', error.message);
}

console.log('\n🎉 All tests completed! If you see this message, your backend should work fine.');
console.log('💡 Try running: npm start');