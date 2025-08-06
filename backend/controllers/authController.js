const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register user
const register = async (req, res) => {
  console.log("🔍 Registration request received:", req.body);
  const { email, password, role, adminKey } = req.body;

  try {
    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Protect admin registration
    if (role === "admin" && adminKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorized to register as admin" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists" 
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "✅ User registered successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error during registration" 
    });
  }
};

// Login user
const login = async (req, res) => {
  console.log("🔍 Login request received:", req.body);
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Incorrect password" 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "✅ Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error during login" 
    });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error fetching profile" 
    });
  }
};

// Forgot password (simplified version)
const forgotPassword = async (req, res) => {
  console.log("🔍 Forgot password request received:", req.body);
  const { email } = req.body;

  try {
    // Validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // In a real application, you would:
    // 1. Generate a reset token
    // 2. Save it to the database with expiration
    // 3. Send an email with the reset link
    
    // For now, we'll just return success
    res.json({
      success: true,
      message: "✅ Password reset instructions sent to your email"
    });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error during password reset request" 
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  forgotPassword
};