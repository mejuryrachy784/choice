const express = require('express');
const { register, login, getProfile, forgotPassword } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

module.exports = router;