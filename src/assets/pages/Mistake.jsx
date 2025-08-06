
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Mistake.css";

const API_BASE_URL = 'http://localhost:5001/api';

const Mistakes = () => {
  const navigate = useNavigate();
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizStats, setQuizStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    scorePercent: 0
  });

  // Fetch mistakes from backend or localStorage
  const fetchMistakes = async () => {
    try {
      setLoading(true);
      
      // Try to get from localStorage first (recent quiz)
      const recentMistakes = localStorage.getItem('recentQuizMistakes');
      const recentStats = localStorage.getItem('recentQuizStats');
      
      if (recentMistakes && recentStats) {
        const mistakesData = JSON.parse(recentMistakes);
        const statsData = JSON.parse(recentStats);
        
        setMistakes(mistakesData);
        setQuizStats(statsData);
      } else {
        // Fallback to sample data
        const sampleMistakes = [
          {
            questionIndex: 0,
            question: {
              questionText: "What should you do when approaching a zebra crossing?",
              options: [
                { id: 'a', text: "Speed up to cross before pedestrians" },
                { id: 'b', text: "Maintain current speed" },
                { id: 'c', text: "Slow down and prepare to stop" },
                { id: 'd', text: "Honk your horn" }
              ],
              correctAnswer: 'c',
              explanation: "You must slow down and prepare to stop to let pedestrians cross safely."
            },
            userAnswer: 'a',
            correctAnswer: 'c'
          },
          {
            questionIndex: 4,
            question: {
              questionText: "What is the maximum speed limit on a highway?",
              options: [
                { id: 'a', text: "100 km/h" },
                { id: 'b', text: "80 km/h" },
                { id: 'c', text: "110 km/h" },
                { id: 'd', text: "120 km/h" }
              ],
              correctAnswer: 'd',
              explanation: "The maximum speed limit on a highway is usually 120 km/h unless otherwise posted."
            },
            userAnswer: 'b',
            correctAnswer: 'd'
          }
        ];
        
        setMistakes(sampleMistakes);
        setQuizStats({
          totalQuestions: 25,
          correctAnswers: 23,
          scorePercent: 92
        });
      }
    } catch (err) {
      console.error('Error fetching mistakes:', err);
      setError('Failed to load mistakes data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMistakes();
  }, []);

  if (loading) {
    return (
      <div className="mistakes-container">
        <div className="loading">
          <h2>📋 Loading Your Mistakes...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mistakes-container">
        <div className="error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={fetchMistakes} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mistakes-container">
      <div className="mistakes-header">
        <h2 className="mistakes-title">❌ Your Mistakes Analysis</h2>
        <button onClick={() => navigate('/quiz')} className="back-to-quiz-btn">
          🔄 Take New Quiz
        </button>
      </div>

      <div className="score-summary">
        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-number">{quizStats.scorePercent}%</span>
            <span className="summary-label">Overall Score</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{quizStats.correctAnswers}</span>
            <span className="summary-label">Correct</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{mistakes.length}</span>
            <span className="summary-label">Mistakes</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{quizStats.totalQuestions}</span>
            <span className="summary-label">Total</span>
          </div>
        </div>
      </div>

      {mistakes.length === 0 ? (
        <div className="no-mistakes">
          <h3>🎉 Perfect Score!</h3>
          <p>Congratulations! You didn't make any mistakes in your last quiz.</p>
          <button onClick={() => navigate('/quiz')} className="new-quiz-btn">
            🆕 Take Another Quiz
          </button>
        </div>
      ) : (
        <div className="mistakes-list">
          <h3>📚 Review Your Mistakes ({mistakes.length} questions)</h3>
          {mistakes.map((mistake, index) => {
            const userAnswerText = mistake.question.options?.find(opt => opt.id === mistake.userAnswer)?.text || 'No answer selected';
            const correctAnswerText = mistake.question.options?.find(opt => opt.id === mistake.correctAnswer)?.text || 'Unknown';
            
            return (
              <div key={index} className="mistake-card">
                <div className="mistake-header">
                  <h4>Question {mistake.questionIndex + 1}</h4>
                  <span className="mistake-badge">❌ Incorrect</span>
                </div>
                
                <div className="mistake-question">
                  <p><strong>{mistake.question.questionText}</strong></p>
                </div>
                
                <div className="mistake-answers">
                  <div className="answer-item user-answer">
                    <span className="answer-label">Your Answer:</span>
                    <span className="answer-text">{mistake.userAnswer}. {userAnswerText}</span>
                  </div>
                  
                  <div className="answer-item correct-answer">
                    <span className="answer-label">Correct Answer:</span>
                    <span className="answer-text">{mistake.correctAnswer}. {correctAnswerText}</span>
                  </div>
                </div>
                
                {mistake.question.explanation && (
                  <div className="explanation">
                    <strong>💡 Explanation:</strong>
                    <p>{mistake.question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mistakes-actions">
        <button onClick={() => navigate('/history')} className="history-btn">
          📊 View History
        </button>
        <button onClick={() => navigate('/dashboard')} className="dashboard-btn">
          🏠 Dashboard
        </button>
        <button onClick={() => navigate('/quiz')} className="new-quiz-btn">
          🆕 New Quiz
        </button>
      </div>
    </div>
  );
};

export default Mistakes;

