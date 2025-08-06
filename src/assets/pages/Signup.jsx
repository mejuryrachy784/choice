import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Reuse the same CSS

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5001/api/auth";

  // Clear messages
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    clearMessages();
    
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (role === "admin" && !adminKey) {
      setError("Admin key is required for admin registration");
      return;
    }

    setLoading(true);

    try {
      console.log("🔍 Attempting signup...");
      
      const signupData = { email, password, role };
      if (role === "admin") {
        signupData.adminKey = adminKey;
      }

      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log("📄 Signup response:", data);

      if (response.ok && data.success) {
        setSuccess("Account created successfully! Redirecting to dashboard...");
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', data.user.role);
        
        setTimeout(() => {
          navigate("/dashboard", { state: { email, user: data.user } });
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("🚨 Signup error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Use demo credentials
  const useDemoCredentials = () => {
    const timestamp = Date.now();
    setEmail(`demo${timestamp}@example.com`);
    setPassword('demo123');
    setConfirmPassword('demo123');
    setRole('user');
    setAdminKey('');
    clearMessages();
    setSuccess('Demo credentials loaded! Click "Create Account" to register.');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🚗 Driving License Quiz</h1>
          <h2>Create Your Account</h2>
          <p className="login-subtitle">
            Join thousands of students preparing for their driving test
          </p>
        </div>

        <div className="login-form">
          {/* Error/Success Messages */}
          {error && (
            <div className="message error">
              <span className="message-icon">❌</span>
              <span className="message-text">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="message success">
              <span className="message-icon">✅</span>
              <span className="message-text">{success}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Role Selection */}
          <div className="input-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="user">👤 Regular User (Recommended)</option>
              <option value="admin">👑 Administrator</option>
            </select>
          </div>

          {/* Admin Key (only when admin role selected) */}
          {role === "admin" && (
            <div className="input-group">
              <label htmlFor="adminKey">Admin Key</label>
              <input
                id="adminKey"
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                disabled={loading}
              />
              <small style={{ color: '#666', fontSize: '12px' }}>
                Contact your administrator for the admin key
              </small>
            </div>
          )}

          {/* Action Buttons */}
          <div className="button-group">
            <button 
              onClick={handleSignUp} 
              className="btn primary"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "🚀 Create Account"}
            </button>
            
            <div className="secondary-actions">
              <Link to="/login" className="btn link">
                Already have an account? Sign In
              </Link>
            </div>
          </div>

          {/* Utility Buttons */}
          <div className="utility-buttons">
            <button 
              onClick={useDemoCredentials} 
              className="btn utility"
              disabled={loading}
            >
              📝 Generate Demo Account
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn utility"
              disabled={loading}
            >
              🏠 Skip to Dashboard
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p>🚗 Start your journey to becoming a safe and confident driver!</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;