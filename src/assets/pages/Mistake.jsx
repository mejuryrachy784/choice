
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mistake.css";

const Mistakes = () => {
  const mistakes = [
    {
      question: "What should you do when approaching a zebra crossing?",
      yourAnswer: "a) Speed up to cross before pedestrians",
      correctAnswer: "c) Slow down and prepare to stop",
      explanation: "You must slow down and prepare to stop to let pedestrians cross safely.",
    },
    {
      question: "What is the maximum speed limit on a highway?",
      yourAnswer: "b) 80 km/h",
      correctAnswer: "d) 120 km/h",
      explanation: "The maximum speed limit on a highway is usually 120 km/h unless otherwise posted.",
    },
  ];

  const totalQuestions = 25;
  const correctAnswers = totalQuestions - mistakes.length;
  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="mistakes-container">
      <h2 className="mistakes-title">Your Mistakes</h2>

      <div className="score-summary">
        <p>
          Score: <strong>{scorePercent}%</strong> ({correctAnswers}/{totalQuestions} correct)
        </p>
        <p>
          Mistakes: <strong>{mistakes.length}</strong>
        </p>
      </div>

      <div className="mistakes-list">
        {mistakes.map((mistake, index) => (
          <div key={index} className="mistake-card">
            <h3 className="mistake-question">{mistake.question}</h3>
            <p><strong>Your Answer:</strong> {mistake.yourAnswer}</p>
            <p><strong>Correct Answer:</strong> {mistake.correctAnswer}</p>
            <p className="explanation"><em>{mistake.explanation}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mistakes;

