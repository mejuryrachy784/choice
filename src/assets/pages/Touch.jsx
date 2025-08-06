
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Touch.css";

const API_BASE_URL = 'http://127.0.0.1:5001/api';

const Touch = () => {
  const navigate = useNavigate();
  const [practiceData, setPracticeData] = useState([]);
  const [stats, setStats] = useState({
    totalPractices: 0,
    averageScore: 0,
    questionsUsed: 0,
    totalQuestions: 250
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get user's name from localStorage or use default
  const getUserName = () => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      // Extract name from email (part before @)
      let name = userEmail.split('@')[0];
      
      // Handle different email formats
      if (name.includes('.')) {
        // If email is like john.doe@example.com, take first part
        name = name.split('.')[0];
      }
      if (name.includes('_')) {
        // If email is like john_doe@example.com, take first part
        name = name.split('_')[0];
      }
      if (name.includes('-')) {
        // If email is like john-doe@example.com, take first part
        name = name.split('-')[0];
      }
      
      // Capitalize first letter and make rest lowercase
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return 'Driver';
  };

  // Fetch dashboard data from backend and localStorage
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to get recent quiz stats from localStorage
      const recentStats = localStorage.getItem('recentQuizStats');
      const recentMistakes = localStorage.getItem('recentQuizMistakes');
      
      let localStats = null;
      if (recentStats) {
        localStats = JSON.parse(recentStats);
      }

      // Try to fetch from backend
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          // Merge backend data with local data
          const mergedStats = {
            totalPractices: data.stats?.totalPractices || (localStats ? 1 : 0),
            averageScore: localStats?.scorePercent || data.stats?.averageScore || 0,
            questionsUsed: data.stats?.questionsUsed || 0,
            totalQuestions: data.stats?.totalQuestions || 250
          };
          
          setStats(mergedStats);
          setPracticeData(data.recentSessions || []);
        } else {
          throw new Error('Backend returned unsuccessful response');
        }
      } else {
        throw new Error('Failed to fetch from backend');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      
      // Use localStorage data if available, otherwise fallback
      const recentStats = localStorage.getItem('recentQuizStats');
      const recentMistakes = localStorage.getItem('recentQuizMistakes');
      
      if (recentStats) {
        const localStats = JSON.parse(recentStats);
        const mistakes = recentMistakes ? JSON.parse(recentMistakes) : [];
        
        setStats({
          totalPractices: 1,
          averageScore: localStats.scorePercent,
          questionsUsed: localStats.totalQuestions,
          totalQuestions: 250
        });
        
        // Create practice data from recent quiz
        const today = new Date().toISOString().split('T')[0];
        setPracticeData([
          {
            date: today,
            score: `${localStats.scorePercent}%`,
            questions: localStats.totalQuestions,
            time: "25m",
            mistakes: mistakes.length
          }
        ]);
      } else {
        // Complete fallback data
        setStats({
          totalPractices: 0,
          averageScore: 0,
          questionsUsed: 0,
          totalQuestions: 250
        });
        setPracticeData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <h2>🚗 Loading Dashboard...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h2>Welcome back, {getUserName()}!</h2>
          <p>Ready to continue your driving license exam preparation?</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={() => {
            // Clear user data from localStorage
            localStorage.removeItem('userEmail');
            localStorage.removeItem('authToken');
            localStorage.removeItem('recentQuizStats');
            localStorage.removeItem('recentQuizMistakes');
            navigate("/login");
          }}>
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
          <button onClick={() => navigate("/history")}>View History</button>
        </div>
        <div className="card mistakes">
          <h3>Review Mistakes</h3>
          <p>Practice questions you got wrong</p>
          <button onClick={() => navigate("/mistake")}>Review Now</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Practices</h4>
          <p>
            {stats.totalPractices} <span className="weekly-change">+3 this week</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>Average Score</h4>
          <p>{stats.averageScore}%</p>
        </div>
        <div className="stat-card">
          <h4>Questions Bank</h4>
          <p>
            {stats.totalQuestions} <span className="subtext">Total questions</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>Questions Used</h4>
          <p>
            {stats.questionsUsed} <span className="subtext">Out of {stats.totalQuestions}</span>
          </p>
        </div>
      </div>

      <section className="recent-section">
        <h3>Recent Practice Sessions</h3>
        <div className="recent-list">
          {practiceData.length > 0 ? (
            practiceData.map((session, index) => (
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
                {session.mistakes !== undefined && (
                  <p>
                    <strong>Mistakes:</strong> {session.mistakes}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="no-sessions">
              <p>🎯 No practice sessions yet</p>
              <p>Start your first quiz to see your progress here!</p>
              <button 
                className="start-first-quiz"
                onClick={() => navigate("/quiz")}
              >
                🚀 Start First Quiz
              </button>
            </div>
          )}
        </div>
        {practiceData.length > 0 && (
          <button
            className="view-history"
            onClick={() => navigate("/history")}
          >
            View All History
          </button>
        )}
      </section>

      <div className="question-status">
        <h4>Question Bank Status</h4>
        <p>
          Questions Used: <strong>{stats.questionsUsed} / {stats.totalQuestions}</strong>
        </p>
        <p className="subtext">All questions available for practice</p>
      </div>
    </div>
  );
};

export default Touch;
