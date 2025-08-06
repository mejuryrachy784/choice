// src/assets/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";

import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!phone.trim()) {
      setMessage("Please enter your phone number.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Password reset instructions sent!");
      } else {
        setMessage(data.message || "Reset failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="forgot-box">
      <h2>Forgot Password</h2>
      <p>Enter your phone number to reset your password.</p>

      <input
        type="tel"
        placeholder="Enter your phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handleReset} className="reset-btn">
        Reset Password
      </button>

      {message && <p className="reset-message">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
