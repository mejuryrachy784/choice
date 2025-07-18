// src/assets/pages/Dashboard.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || 'User';

  const handleStartPractice = () => {
    navigate('/quiz', { state: { phone } }); // Navigate to quiz
  };

  const handleViewResults = () => {
    navigate('/touch', { state: { phone } }); // Navigate to results history
  };

  const handleLogout = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="dashboard-box">
      <h2>Welcome, {phone}!</h2>
      <p className="subtitle">Quick Access</p>

      <div className="quick-access">
        <button onClick={handleStartPractice} className="primary-btn">
          Start Practice
        </button>
        <button onClick={handleViewResults} className="secondary-btn">
          View Results
        </button>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 
