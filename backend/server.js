const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
  console.log('⚠️ Server will continue without database connection');
});

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Allowed frontend origins
const allowedOrigins = [
  'https://choice-yfei-6y95wxdqy-mejuryzvarevashes-projects.vercel.app', // Main frontend
  'https://choice-gneg.onrender.com',        // Backend (optional)
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://localhost:5175',
  'http://127.0.0.1:5173',.
  'http://127.0.0.1:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5175',
];

// ✅ CORS Options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow curl/Postman

    if (
      process.env.NODE_ENV === 'production' &&
      origin.includes('vercel.app') &&
      origin.includes('driving-license-quiz')
    ) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

app.use(cors(corsOptions));
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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/quiz/history', historyRoutes);
app.use('/api/instructions', instructionsRoutes);

// Legacy endpoint
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
  try {
    res.json({
      message: "✅ CORS POST is working!",
      origin: req.headers.origin,
      body: req.body,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("❌ Test CORS POST error:", err);
    res.status(500).json({ error: "Test CORS POST failed" });
  }
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

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Internal server error:", err.stack);
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
  if (process.env.RENDER_EXTERNAL_URL) {
    // On Render
    const publicUrl = process.env.RENDER_EXTERNAL_URL;
    console.log(`🚀 Server running on ${publicUrl}`);
    console.log(`📚 API available at ${publicUrl}`);
  } else {
    // Local development
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}`);
  }
});
