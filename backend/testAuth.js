require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const testAuth = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Create a test user
    const testEmail = 'testuser@example.com';
    const testPassword = 'password123';
    
    // Check if user exists
    let user = await User.findOne({ email: testEmail });
    
    if (user) {
      console.log('🔍 Test user already exists');
    } else {
      // Create new test user
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      user = new User({
        email: testEmail,
        password: hashedPassword,
        role: 'user'
      });
      await user.save();
      console.log('✅ Test user created');
    }
    
    console.log('📧 Test credentials:');
    console.log('   Email:', testEmail);
    console.log('   Password:', testPassword);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

testAuth();