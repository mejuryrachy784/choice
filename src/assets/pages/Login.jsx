// src/assets/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default is user
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!phone.trim() || !password.trim()) {
      alert("Phone and password are required");
      return;
    }

    console.log("Logging in:", { phone, password, role });

    if (role === 'admin') {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleSignUp = () => {
    if (!phone.trim() || !password.trim()) {
      alert("Phone and password are required");
      return;
    }

    console.log("Signing up:", { phone, password, role });

    // Simulate sending OTP and redirect to verification page
    navigate("/verify", { state: { phone } });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="box">
      <h2>Login</h2>

      <input
        type="tel"
        placeholder="Enter your phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="button-row">
        <button onClick={handleLogin} className="login-btn">Login</button>
        <button onClick={handleSignUp} className="signup-btn">Sign Up</button>
      </div>

      <p className="forgot-link" onClick={handleForgotPassword}>Forgot password?</p>
    </div>
  );
};

export default LoginPage;

