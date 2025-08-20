import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AUTH_BASE_URL, API_BASE_URL } from "../../config/api";
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

  const BASE_URL = AUTH_BASE_URL;

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
      console.log("🔍 Attempting login to:", `${BASE_URL}/login`);
      console.log("📤 Login data:", { email, password: "***" });
      
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);

      if (!response.ok) {
        // Handle non-200 responses
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          errorData = { message: `HTTP ${response.status} - ${response.statusText}` };
        }
        console.log("❌ Error response:", errorData);
        setError(errorData.message || `Login failed (${response.status})`);
        return;
      }

      const data = await response.json();
      console.log("📄 Login response:", data);

      if (data.success && data.token) {
        setSuccess("✅ Login successful! Redirecting...");
        
        // Store user data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
        if (data.user && data.user.role) {
          localStorage.setItem('userRole', data.user.role);
        }
        
        console.log("💾 Stored in localStorage:", {
          token: data.token ? "✅" : "❌",
          email: email,
          role: data.user?.role || "not provided"
        });
        
        setTimeout(() => {
          navigate("/dashboard", { 
            state: { 
              email, 
              user: data.user,
              loginSuccess: true 
            } 
          });
        }, 1500);
      } else {
        setError(data.message || "Login failed. Invalid response from server.");
      }
    } catch (error) {
      console.error("🚨 Login error:", error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError(`❌ Cannot connect to server. Please check if the backend is running at ${BASE_URL}`);
      } else {
        setError(`❌ Network error: ${error.message}`);
      }
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
      console.log("🔍 Attempting signup to:", `${BASE_URL}/register`);
      
      const signupData = { email, password, role };
      if (role === "admin") {
        signupData.adminKey = adminKey;
      }

      console.log("📤 Signup data:", { ...signupData, password: "***", adminKey: adminKey ? "***" : undefined });

      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(signupData),
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          errorData = { message: `HTTP ${response.status} - ${response.statusText}` };
        }
        console.log("❌ Error response:", errorData);
        setError(errorData.message || `Registration failed (${response.status})`);
        return;
      }

      const data = await response.json();
      console.log("📄 Signup response:", data);

      if (data.success && data.token) {
        setSuccess("✅ Account created successfully! Redirecting...");
        
        // Store user data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
        if (data.user && data.user.role) {
          localStorage.setItem('userRole', data.user.role);
        }
        
        setTimeout(() => {
          navigate("/dashboard", { 
            state: { 
              email, 
              user: data.user,
              signupSuccess: true 
            } 
          });
        }, 1500);
      } else {
        setError(data.message || "Registration failed. Invalid response from server.");
      }
    } catch (error) {
      console.error("🚨 Signup error:", error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError(`❌ Cannot connect to server. Please check if the backend is running at ${BASE_URL}`);
      } else {
        setError(`❌ Network error: ${error.message}`);
      }
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
        setSuccess("✅ Password reset instructions sent to your email!");
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("🚨 Forgot password error:", error);
      setError("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Test Connection
  const testConnection = async () => {
    clearMessages();
    setLoading(true);
    
    try {
      console.log("🔧 Testing connection to backend...");
      
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Connection test successful:", data);
        setSuccess(`✅ Backend connection successful! Server: ${data.message || 'Running'}`);
        
        // Test auth endpoint
        try {
          const authTest = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@test.com', password: 'test' })
          });
          console.log("🔐 Auth endpoint test status:", authTest.status);
        } catch (authError) {
          console.log("🔐 Auth endpoint test failed:", authError.message);
        }
        
      } else {
        setError(`❌ Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("🔧 Connection test error:", error);
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
    setSuccess('✅ Demo credentials loaded! You can now login.');
  };

  // Use admin credentials
  const useAdminCredentials = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    setConfirmPassword('admin123');
    setRole('admin');
    setAdminKey('Assa1andonly');
    clearMessages();
    setSuccess('✅ Admin credentials loaded! You can now login.');
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
              <small style={{ color: '#666', fontSize: '12px' }}>
                Admin key: Assa1andonly
              </small>
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
              👤 Demo User
            </button>
            <button 
              onClick={useAdminCredentials} 
              className="btn utility"
              disabled={loading}
            >
              👑 Admin User
            </button>
            <Link to="/dashboard" className="btn utility">
              🏠 Skip to Dashboard
            </Link>
          </div>
        </div>

        <div className="login-footer">
          <p>🚗 Practice makes perfect! Start your driving test preparation today.</p>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
            Backend: {BASE_URL} | Frontend: {window.location.origin}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
// import React, { useState } from 'react';
// import { authApi } from '../../config/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

  // const handleLogin = async () => {
  //   setError('');
  //   setSuccess('');

  //   if (!email || !password) {
  //     setError('Please enter both email and password');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const data = await authApi.login(email, password);
  //     console.log('Login success:', data);

  //     if (data.token) {
  //       localStorage.setItem('authToken', data.token);
  //       setSuccess('Login successful! Redirecting...');
  //       setTimeout(() => navigate('/dashboard'), 1000);
  //     } else {
  //       setError('Login failed: Invalid response from server');
  //     }
  //   } catch (err) {
  //     console.error('Login failed:', err);
  //     setError(err.message || 'Login failed. Please try again.');
  //   } finally {
  //     setLoading(false);
    // }/  {/* <input 
//         type="email" 
//         placeholder="Email" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)} 
//         disabled={loading}
//         style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
//       />
//       <input 
//         type="password" 
//         placeholder="Password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//         disabled={loading}
//         style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
//       />
//       <button 
//         onClick={handleLogin} 
//         disabled={loading}
//         style={{ padding: '10px 20px', backgroundColor: '#1e90ff', color: '#fff', border: 'none', cursor: 'pointer' }}
//       >
//         {loading ? 'Logging in...' : 'Login'}
//       </button>
//     </div>
//   );
// };

// export default Login; */}
