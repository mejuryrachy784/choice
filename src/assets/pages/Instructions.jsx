import React from "react";
import { useNavigate } from "react-router-dom";
import "./Test.css";

const InstructionsPage = () => {
  const navigate = useNavigate();
ls
  return (
    <div className="instructions-container">
      <h2>Important Instructions</h2>
      <ul>
        <li>Bring a valid government-issued ID on test day.</li>
        <li>Arrive at least 15 minutes before your scheduled time.</li>
        <li>Ensure your vehicle meets the safety standards.</li>
      </ul>

      <div className="button-group">
      <button className="left-button" onClick={() => navigate("/booking")}>Continue to Booking Page</button>
        <button className="right-button" onClick={() => window.open("https://wa.me/")}>Or Use WhatsApp</button>
      </div>
    </div>
  );
};

export default InstructionsPage;