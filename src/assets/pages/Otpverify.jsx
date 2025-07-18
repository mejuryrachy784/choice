import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Login.css";

const OTPVerify = () => {
  const location = useLocation();
  const phone = location?.state?.phone || ""; // ✅ safely read phone from state

  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return;
    }

    // Simulate verification
    alert(`Verifying OTP ${otp} for phone ${phone}`);
  };

  return (
    <div className="box">
      <h2>Verify Phone: {phone}</h2>
      <input
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
      />
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
};

export default OTPVerify;

