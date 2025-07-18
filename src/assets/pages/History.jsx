import React from "react";
import "./History.css";

const Instructions = () => {
  const sessions = [
    {
      topic: "Road Signs",
      datetime: "2024-01-15 at 14:30",
      duration: "15m 30s",
      scorePercent: 85,
      correctAnswers: 85,
      totalQuestions: 20,
      feedback: "Excellent",
    },
    {
      topic: "Traffic Rules",
      datetime: "2024-01-14 at 16:45",
      duration: "12m 15s",
      scorePercent: 72,
      correctAnswers: 72,
      totalQuestions: 15,
      feedback: "Good",
    },
    {
      topic: "Highway Code",
      datetime: "2024-01-13 at 10:20",
      duration: "18m 45s",
      scorePercent: 90,
      correctAnswers: 90,
      totalQuestions: 25,
      feedback: "Excellent",
    },
    {
      topic: "Safety Rules",
      datetime: "2024-01-12 at 19:15",
      duration: "16m 20s",
      scorePercent: 68,
      correctAnswers: 68,
      totalQuestions: 20,
      feedback: "Good",
    },
    {
      topic: "Road Signs",
      datetime: "2024-01-11 at 13:00",
      duration: "22m 10s",
      scorePercent: 95,
      correctAnswers: 95,
      totalQuestions: 30,
      feedback: "Excellent",
    },
  ];

  // Calculate summary stats
  const totalSessions = sessions.length;
  const avgScore =
    Math.round(
      sessions.reduce((acc, s) => acc + s.scorePercent, 0) / totalSessions
    );
  const totalTime = sessions
    .map((s) => {
      const parts = s.duration.match(/(\d+)m\s*(\d+)?s?/);
      const minutes = parts ? parseInt(parts[1], 10) : 0;
      const seconds = parts && parts[2] ? parseInt(parts[2], 10) : 0;
      return minutes * 60 + seconds;
    })
    .reduce((acc, seconds) => acc + seconds, 0);
  const totalTimeFormatted = `${Math.floor(totalTime / 60)}m ${totalTime % 60}s`;
  const bestScore = Math.max(...sessions.map((s) => s.scorePercent));

  return (
    <div className="instructions-container">
      <h2>Practice Summary</h2>
      <div className="summary-stats">
        <div className="stat">
          <h3>Total Sessions</h3>
          <p>{totalSessions}</p>
        </div>
        <div className="stat">
          <h3>Average Score</h3>
          <p>{avgScore}%</p>
        </div>
        <div className="stat">
          <h3>Total Time</h3>
          <p>{totalTimeFormatted}</p>
        </div>
        <div className="stat">
          <h3>Best Score</h3>
          <p>{bestScore}%</p>
        </div>
      </div>

      <h3>All Practice Sessions</h3>
      <div className="session-list">
        {sessions.map((session, idx) => (
          <div key={idx} className="session-card">
            <h4>{session.topic}</h4>
            <p>{session.datetime}</p>
            <p>Duration: {session.duration}</p>
            <p>Score: {session.scorePercent}%</p>
            <p>
              {session.correctAnswers}/{session.totalQuestions} correct
            </p>
            <p className={`feedback ${session.feedback.toLowerCase()}`}>
              {session.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;
