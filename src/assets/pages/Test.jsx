
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Test.css";


const Test = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    nationalId: "",
    email: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.fullName && form.contact && form.nationalId && form.email && form.date) {
      navigate("/quiz");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="test-container">
      <div className="warning-banner">Your details haven't been captured yet. Complete the form below to continue.</div>
      <div className="form-wrapper">
        <div className="left-form">
          <label>Full Name:</label>
          <input type="text" name="fullName" onChange={handleChange} />

          <label>Contact:</label>
          <input type="text" name="contact" onChange={handleChange} />
          <label>National ID:</label>
          <input type="text" name="nationalId" onChange={handleChange} />
        </div>

        <div className="right-form">
          <label>Email Address:</label>
          <input type="email" name="email" onChange={handleChange} />

          <label>Date:</label>
          <input type="date" name="date" onChange={handleChange} />
        </div>
      </div>

      <div className="button-group">
        <button className="left-button" onClick={() => navigate("/instructions")}>Instructions</button>
        <button className="right-button" onClick={handleSubmit}>Submit Booking</button>
      </div>
    </div>
  );
};

export default Test;



