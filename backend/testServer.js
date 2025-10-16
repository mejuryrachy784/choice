const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

console.log('🔍 Loading environment variables...');
dotenv.config();

console.log('🔍 Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', process.env.PORT);
console.log('- MONGO_URI exists:', !!process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

console.log('🔍 Setting up middleware...');
app.use(cors());
app.use(express.json());

console.log('🔍 Setting up routes...');
app.get('/', (req, res) => {
  console.log('📥 Root route accessed');
  res.json({ 
    message: "✅ Test server is running",
    timestamp: new Date().toISOString()
  });
});

app.get('/test', (req, res) => {
  console.log('📥 Test route accessed');
  res.json({ 
    message: "✅ Test endpoint working",
    timestamp: new Date().toISOString()
  });
});

console.log('🔍 Starting server...');
const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
  console.log(`🚀 Test server running on https://choice-gneg.onrender.com:${PORT}`);
  console.log(`📚 Test endpoint: https://choice-gneg.onrender.com:${PORT}/test`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled rejection:', err);
  process.exit(1);
});