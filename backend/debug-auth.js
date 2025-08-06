// Debug authentication
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function debugAuth() {
  try {
    // Find the test user
    const user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      console.log('❌ Test user not found');
      return;
    }

    console.log('✅ User found:', {
      email: user.email,
      role: user.role,
      hasPassword: !!user.password
    });

    // Test password comparison
    const testPassword = 'test123';
    const isMatch = await bcrypt.compare(testPassword, user.password);
    console.log('🔑 Password test:', isMatch ? '✅ Match' : '❌ No match');

    if (!isMatch) {
      // Reset password
      console.log('🔄 Resetting password...');
      const hashedPassword = await bcrypt.hash('test123', 10);
      user.password = hashedPassword;
      await user.save();
      console.log('✅ Password reset complete');
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    mongoose.connection.close();
  }
}

debugAuth();