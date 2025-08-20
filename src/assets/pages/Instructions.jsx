import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Instructions.css";


const API_BASE_URL = 'https://choice-gneg.onrender.com/api';


const InstructionsPage = () => {
  const navigate = useNavigate();
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch instructions from backend
  const fetchInstructions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/instructions`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch instructions');
      }
      
      const data = await response.json();
      
      if (data.success && data.instructions) {
        setInstructions(data.instructions);
      } else {
        // Fallback to static data
        setInstructions([
          {
            id: 1,
            title: "Before the Test",
            items: [
              "Bring a valid government-issued ID on test day",
              "Arrive at least 15 minutes before your scheduled time",
              "Ensure your vehicle meets the safety standards",
              "Have all required documents ready"
            ]
          },
          {
            id: 2,
            title: "During the Test",
            items: [
              "Listen carefully to the examiner's instructions",
              "Stay calm and focused throughout the test",
              "Follow all traffic rules and regulations",
              "Ask for clarification if you don't understand something"
            ]
          },
          {
            id: 3,
            title: "Test Requirements",
            items: [
              "Valid learner's permit or license",
              "Proof of insurance for the test vehicle",
              "Vehicle registration documents",
              "Payment for test fees (if applicable)"
            ]
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching instructions:', err);
      setError('Failed to load instructions');
      // Set fallback data on error
      setInstructions([
        {
          id: 1,
          title: "Important Instructions",
          items: [
            "Bring a valid government-issued ID on test day",
            "Arrive at least 15 minutes before your scheduled time",
            "Ensure your vehicle meets the safety standards"
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructions();
  }, []);

  if (loading) {
    return (
      <div className="instructions-container">
        <div className="loading">
          <h2>📋 Loading Instructions...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="instructions-container">
        <div className="error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={fetchInstructions} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="instructions-container">
      <h2>📋 Driving Test Instructions</h2>
      
      {instructions.map((section) => (
        <div key={section.id} className="instruction-section">
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="button-group">
        <button className="left-button" onClick={() => navigate("/quiz")}>
          🚗 Start Practice Quiz
        </button>
        <button className="right-button" onClick={() => window.open("https://wa.me/", "_blank")}>
          💬 Contact via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default InstructionsPage;