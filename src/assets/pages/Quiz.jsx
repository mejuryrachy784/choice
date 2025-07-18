import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';

const questions = [
  {
    id: 1,
    text: 'What should you do when approaching a zebra crossing?',
    options: {
      a: 'Speed up to cross before pedestrians',
      b: 'Stop and wave pedestrians across',
      c: 'Slow down and prepare to stop',
      d: 'Honk to warn pedestrians',
    },
    correct: 'c',
  },
  {
    id: 2,
    text: 'What does a red traffic light mean?',
    options: {
      a: 'Go if it’s clear',
      b: 'Slow down',
      c: 'Stop',
      d: 'Stop only for buses',
    },
    correct: 'c',
  },
  {
    id: 3,
    text: 'What does a solid white line on the road mean?',
    options: {
      a: 'You may overtake',
      b: 'No overtaking',
      c: 'One-way traffic',
      d: 'Bus lane',
    },
    correct: 'b',
  },
  {
    id: 4,
    text: 'What is the legal blood alcohol concentration (BAC) limit for driving?',
    options: {
      a: '0.08%',
      b: '0.05%',
      c: '0.02%',
      d: '0.10%',
    },
    correct: 'b',
  },
  {
    id: 5,
    text: 'What should you do when you see a yield sign?',
    options: {
      a: 'Stop regardless of traffic',
      b: 'Give way to other vehicles and pedestrians',
      c: 'Speed up to merge quickly',
      d: 'Ignore it',
    },
    correct: 'b',
  },
  {
    id: 6,
    text: 'How far should you keep from the vehicle in front of you?',
    options: {
      a: 'At least one car length',
      b: 'Two seconds behind',
      c: 'Five seconds behind',
      d: 'It doesn’t matter',
    },
    correct: 'b',
  },
  {
    id: 7,
    text: 'What does a flashing yellow traffic light mean?',
    options: {
      a: 'Stop completely',
      b: 'Speed up to clear the intersection',
      c: 'Proceed with caution',
      d: 'Traffic light malfunction',
    },
    correct: 'c',
  },
  {
    id: 8,
    text: 'When can you use your horn?',
    options: {
      a: 'To greet a friend',
      b: 'To warn others of danger',
      c: 'When you are angry',
      d: 'Anytime you want',
    },
    correct: 'b',
  },
  {
    id: 9,
    text: 'What does a double yellow line mean?',
    options: {
      a: 'You may overtake',
      b: 'No parking allowed',
      c: 'No overtaking allowed',
      d: 'Bus lane only',
    },
    correct: 'c',
  },
  {
    id: 10,
    text: 'When parking uphill with a curb, which way should you turn your wheels?',
    options: {
      a: 'Toward the curb',
      b: 'Away from the curb',
      c: 'Straight ahead',
      d: 'It doesn’t matter',
    },
    correct: 'b',
  },
  {
    id: 11,
    text: 'What does a green traffic light indicate?',
    options: {
      a: 'Go if safe',
      b: 'Stop',
      c: 'Yield',
      d: 'Pedestrian crossing',
    },
    correct: 'a',
  },
  {
    id: 12,
    text: 'What should you do if you see an emergency vehicle with flashing lights behind you?',
    options: {
      a: 'Speed up and keep driving',
      b: 'Stop immediately where you are',
      c: 'Move to the side and stop',
      d: 'Ignore it',
    },
    correct: 'c',
  },
  {
    id: 13,
    text: 'What is the meaning of a triangular traffic sign?',
    options: {
      a: 'Warning',
      b: 'Stop',
      c: 'Yield',
      d: 'Information',
    },
    correct: 'a',
  },
  {
    id: 14,
    text: 'When is it safe to overtake another vehicle?',
    options: {
      a: 'When the road ahead is clear and allowed',
      b: 'On a solid yellow line',
      c: 'Near a pedestrian crossing',
      d: 'At intersections',
    },
    correct: 'a',
  },
  {
    id: 15,
    text: 'What does a broken white line on the road mean?',
    options: {
      a: 'You may change lanes',
      b: 'No changing lanes',
      c: 'Bus lane',
      d: 'Pedestrian crossing',
    },
    correct: 'a',
  },
  {
    id: 16,
    text: 'When should you use your headlights?',
    options: {
      a: 'Only at night',
      b: 'During rain, fog, or poor visibility',
      c: 'Only in tunnels',
      d: 'Whenever you want',
    },
    correct: 'b',
  },
  {
    id: 17,
    text: 'What is the main purpose of seat belts?',
    options: {
      a: 'To keep you comfortable',
      b: 'To prevent ejection during a crash',
      c: 'To avoid speeding tickets',
      d: 'To avoid airbags deploying',
    },
    correct: 'b',
  },
  {
    id: 18,
    text: 'What should you do at a stop sign?',
    options: {
      a: 'Slow down and proceed',
      b: 'Stop completely and look both ways',
      c: 'Stop only if other cars are present',
      d: 'Yield to pedestrians only',
    },
    correct: 'b',
  },
  {
    id: 19,
    text: 'What does a no-entry sign indicate?',
    options: {
      a: 'Do not enter the road',
      b: 'No parking here',
      c: 'Pedestrian zone',
      d: 'Bus lane',
    },
    correct: 'a',
  },
  {
    id: 20,
    text: 'What is the correct hand signal for a left turn?',
    options: {
      a: 'Arm straight out horizontally',
      b: 'Arm bent upward',
      c: 'Arm bent downward',
      d: 'Waving arm',
    },
    correct: 'a',
  },
];

const DriveLessonQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [showStartMsg, setShowStartMsg] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const timerStarted = useRef(false);
  const intervalRef = useRef(null);

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    synth.cancel();
    synth.speak(utter);
  };

  const handleSubmit = () => {
    if (!timerStarted.current) {
      timerStarted.current = true;
      setShowStartMsg(true);
      setTimeout(() => setShowStartMsg(false), 2000);

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setShowScore(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    const isCorrect = selected === questions[current].correct;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      { question: questions[current], selected },
    ]);

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelected('');
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setShowScore(true);
        clearInterval(intervalRef.current);
      }
    }, 1500);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleReveal = () => {
    setReviewMode(true);
  };

  if (showScore && reviewMode) {
    return (
      <div className="quiz-container">
        <h2>Review Your Answers</h2>
        <p>Your score: {score} / {questions.length}</p>
        {userAnswers.map(({ question, selected }, index) => {
          const isCorrect = selected === question.correct;
          return (
            <div key={index} className={`review-question ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p><strong>Q{index + 1}:</strong> {question.text}</p>
              <p>Your answer: <strong>{question.options[selected] || 'None'}</strong></p>
              {!isCorrect && (
                <p>Correct answer: <strong>{question.options[question.correct]}</strong></p>
              )}
              <hr />
            </div>
          );
        })}
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="quiz-container">
        <h2>Quiz Complete</h2>
        <p>Your score: {score} / {questions.length}</p>
        {timeLeft > 0 ? (
          <p className="success">🎉 Excellent! You finished in time!</p>
        ) : (
          <p className="error">⏰ You ran out of time!</p>
        )}
        <button onClick={handleReveal}>🔍 Reveal Mistakes</button>
      </div>
    );
  }

  const currentQ = questions[current];

  return (
    <div className="quiz-container">
      <h2>Driving Lesson Oral Quiz</h2>
      <div className="timer">Time Left: {formatTime()}</div>
      {showStartMsg && <p className="start-msg">🚦 Your time starts now!</p>}
      <p><strong>Question {current + 1}:</strong> {currentQ.text}</p>
      <button onClick={() => speak(currentQ.text)}>🔊 Speak Aloud</button>

      <div className="options">
        {Object.entries(currentQ.options).map(([key, val]) => {
          const isSelected = selected === key;
          const isCorrect = key === currentQ.correct;

          let className = '';
          if (showFeedback && isSelected && isCorrect) className = 'correct';
          else if (showFeedback && isSelected && !isCorrect) className = 'incorrect';

          return (
            <label key={key} className={`option ${className}`}>
              <input
                type="radio"
                name="answer"
                value={key}
                checked={isSelected}
                disabled={showFeedback}
                onChange={(e) => setSelected(e.target.value)}
              />
              <span>{key.toUpperCase()}. {val}</span>
            </label>
          );
        })}
      </div>

      <button className="submit-btn" onClick={handleSubmit} disabled={!selected || showFeedback}>
        Submit Answer
      </button>
    </div>
  );
};

export default DriveLessonQuiz; 

