const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB (with error handling)
connectDB().catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
  console.log('⚠️ Server will continue without database connection');
});

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',  // Added for Vite
    'http://localhost:3000', 
    'http://localhost:5175',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',  // Added for Vite
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5175',
    'http://[::1]:5173',
    'http://[::1]:5174',      // Added for Vite
    'http://[::1]:3000',
    'http://[::1]:5175'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const resultRoutes = require('./routes/results');
const dashboardRoutes = require('./routes/dashboard');
const historyRoutes = require('./routes/history');
const instructionsRoutes = require('./routes/instructions');
const User = require('./models/User');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/quiz/history', historyRoutes);
app.use('/api/instructions', instructionsRoutes);

// Legacy endpoint for dashboard compatibility
app.get("/api/userdata", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ error: "Email query parameter is required" });
    }

    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CORS test endpoint
app.get("/api/test-cors", (req, res) => {
  res.json({
    message: "✅ CORS is working!",
    origin: req.headers.origin,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
});

app.post("/api/test-cors", (req, res) => {
  res.json({
    message: "✅ CORS POST is working!",
    origin: req.headers.origin,
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "✅ Choice Quiz API is running",
    version: "2.0.0",
    endpoints: {
      auth: "/api/auth",
      quiz: "/api/quiz", 
      results: "/api/results",
      dashboard: "/api/dashboard",
      history: "/api/quiz/history",
      instructions: "/api/instructions",
      testCors: "/api/test-cors"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Something went wrong!" 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Route not found" 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});