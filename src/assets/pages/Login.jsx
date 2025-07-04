import React, { useState } from "react";
import { supabase } from "./supabase";
import Login 
const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login");
  const [error, setError] = useState("");

  
  const handleLogin = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      phone: "+263" + phone,
    });

    if (error) {
      setError("Failed to send OTP.");
    } else {
      setStep("verify");
    }
  };

  
  const handleVerify = async () => {
    setError("");
    const { error } = await supabase.auth.verifyOtp({
      phone: "+263" + phone,
      token: otp,
      type: "sms",
    });

    if (error) {
      setError("Invalid OTP.");
    } else {
      alert("Login successful!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {step === "login" ? "Welcome back!" : "Verify Your Account"}
        </h2>

        {step === "login" ? (
          <>
            <label className="block mb-2">Phone Number</label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="771653563"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-700 text-white py-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2">OTP Code</label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter 6-digit code"
            />
            <button
              onClick={handleVerify}
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
