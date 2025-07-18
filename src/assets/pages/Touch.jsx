
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Touch.css";

const Touch = () => {
  const navigate = useNavigate();

  const practiceData = [
    { date: "2024-01-15", score: "85%", questions: 20, time: "15m" },
    { date: "2024-01-14", score: "72%", questions: 15, time: "12m" },
    { date: "2024-01-13", score: "90%", questions: 25, time: "18m" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h2>Welcome back, Rachy Rachy!</h2>
          <p>Ready to continue your VID oral exam preparation?</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </header>

      <div className="cards-row">
        <div className="card start-practice">
          <h3>Start Practice</h3>
          <p>Begin a new practice session</p>
          <button onClick={() => navigate("/quiz")}>Start Now</button>
        </div>
        <div className="card history">
          <h3>Practice History</h3>
          <p>Review your past attempts</p>
          <button onClick={() => navigate("/instructions")}>View History</button>
        </div>
        <div className="card mistakes">
          <h3>Review Mistakes</h3>
          <p>Practice questions you got wrong</p>
          <button onClick={() => navigate("/mistakes")}>Review Now</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Practices</h4>
          <p>
            15 <span className="weekly-change">+3 this week</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>Average Score</h4>
          <p>78%</p>
        </div>
        <div className="stat-card">
          <h4>Questions Bank</h4>
          <p>
            250 <span className="subtext">Total questions</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>Questions Used</h4>
          <p>
            0 <span className="subtext">Out of 250</span>
          </p>
        </div>
      </div>

      <section className="recent-section">
        <h3>Recent Practice Sessions</h3>
        <div className="recent-list">
          {practiceData.map((session, index) => (
            <div className="recent-card" key={index}>
              <p>
                <strong>Date:</strong> {session.date}
              </p>
              <p>
                <strong>Score:</strong> {session.score}
              </p>
              <p>
                <strong>Questions:</strong> {session.questions}
              </p>
              <p>
                <strong>Time:</strong> {session.time}
              </p>
            </div>
          ))}
        </div>
        <button
          className="view-history"
          onClick={() => navigate("/instructions")}
        >
          View All History
        </button>
      </section>

      <div className="question-status">
        <h4>Question Bank Status</h4>
        <p>
          Questions Used: <strong>0 / 250</strong>
        </p>
        <p className="subtext">All questions available for practice</p>
      </div>
    </div>
  );
};

export default Touch;
