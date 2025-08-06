import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminKey, setAdminKey] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
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

  // Handle Login
  const handleLogin = async () => {
    clearMessages();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      console.log("🔍 Attempting login...");
      
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📄 Login response:", data);

      if (response.ok && data.success) {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', data.user.role);
        
        setTimeout(() => {
          navigate("/dashboard", { state: { email, user: data.user } });
        }, 1000);
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("🚨 Login error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
        setSuccess("Account created successfully! Redirecting...");
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', data.user.role);
        
        setTimeout(() => {
          navigate("/dashboard", { state: { email, user: data.user } });
        }, 1000);
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

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    clearMessages();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Password reset instructions sent to your email!");
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("🚨 Forgot password error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Test Connection
  const testConnection = async () => {
    clearMessages();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5001/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuccess(`✅ Backend connection successful! Server: ${data.message || 'Running'}`);
      } else {
        setError(`❌ Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      setError(`❌ Cannot connect to backend: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Use demo credentials
  const useDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('demo123');
    setConfirmPassword('demo123');
    setRole('user');
    setAdminKey('');
    clearMessages();
    setSuccess('Demo credentials loaded! You can now login or signup.');
  };

  // Reset form
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("user");
    setAdminKey("");
    clearMessages();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🚗 Driving License Quiz</h1>
          <h2>
            {forgotMode ? "Reset Password" : isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="login-subtitle">
            {forgotMode 
              ? "Enter your email to receive reset instructions" 
              : isSignUp 
                ? "Sign up to start practicing for your driving test"
                : "Sign in to continue your driving test preparation"
            }
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

          {/* Password Input (not shown in forgot mode) */}
          {!forgotMode && (
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          {/* Confirm Password (only in signup mode) */}
          {isSignUp && !forgotMode && (
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
          )}

          {/* Role Selection (only in signup mode) */}
          {isSignUp && !forgotMode && (
            <div className="input-group">
              <label htmlFor="role">Account Type</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
              >
                <option value="user">👤 Regular User</option>
                <option value="admin">👑 Administrator</option>
              </select>
            </div>
          )}

          {/* Admin Key (only when admin role selected) */}
          {isSignUp && !forgotMode && role === "admin" && (
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
            </div>
          )}

          {/* Action Buttons */}
          <div className="button-group">
            {forgotMode ? (
              <>
                <button 
                  onClick={handleForgotPassword} 
                  className="btn primary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "📧 Send Reset Link"}
                </button>
                <button 
                  onClick={() => {
                    setForgotMode(false);
                    clearMessages();
                  }} 
                  className="btn secondary"
                  disabled={loading}
                >
                  ← Back to Login
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={isSignUp ? handleSignUp : handleLogin} 
                  className="btn primary"
                  disabled={loading}
                >
                  {loading 
                    ? (isSignUp ? "Creating Account..." : "Signing In...") 
                    : (isSignUp ? "🚀 Create Account" : "🔑 Sign In")
                  }
                </button>
                
                <div className="secondary-actions">
                  <button 
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      resetForm();
                    }} 
                    className="btn link"
                    disabled={loading}
                  >
                    {isSignUp 
                      ? "Already have an account? Sign In" 
                      : "Don't have an account? Sign Up"
                    }
                  </button>
                  
                  {!isSignUp && (
                    <button 
                      onClick={() => {
                        setForgotMode(true);
                        clearMessages();
                      }} 
                      className="btn link"
                      disabled={loading}
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Utility Buttons */}
          <div className="utility-buttons">
            <button 
              onClick={testConnection} 
              className="btn utility"
              disabled={loading}
            >
              🔧 Test Connection
            </button>
            <button 
              onClick={useDemoCredentials} 
              className="btn utility"
              disabled={loading}
            >
              📝 Use Demo Account
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
          <p>🚗 Practice makes perfect! Start your driving test preparation today.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;