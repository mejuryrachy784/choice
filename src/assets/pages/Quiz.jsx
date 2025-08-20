import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';


const API_BASE_URL = 'https://choice-gneg.onrender.com/api';


const DrivingLicenseQuiz = () => {
  const navigate = useNavigate();
  
  // State management
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewMode, setReviewMode] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const [speechVolume, setSpeechVolume] = useState(1.0); // Volume control state
  const [autoSpeak, setAutoSpeak] = useState(true); // Auto-speak questions enabled by default
  
  const timerRef = useRef(null);
  const startTime = useRef(null);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Text-to-speech function with maximum loudness
  const speak = (text, isQuestion = false) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel(); // Cancel any ongoing speech
      
      // Create multiple utterances for extra loudness
      const speakLoud = (textToSpeak, delay = 0) => {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = 'en-US';
          utterance.rate = 0.7; // Optimal speed for clarity
          utterance.volume = 1.0; // Always maximum volume
          utterance.pitch = 1.2; // Higher pitch for better audibility
          
          // Find the best voice (usually the first one is loudest)
          const voices = synth.getVoices();
          if (voices.length > 0) {
            // Try to find a female voice (usually louder) or use the first available
            const preferredVoice = voices.find(voice => 
              voice.name.includes('Female') || 
              voice.name.includes('Zira') || 
              voice.name.includes('Hazel') ||
              voice.name.includes('Microsoft')
            ) || voices[0];
            utterance.voice = preferredVoice;
          }
          
          synth.speak(utterance);
        }, delay);
      };
      
      // Enhance text with emphasis and repetition for important words
      let enhancedText = text
        .replace(/\b(STOP|YIELD|SPEED LIMIT|WARNING|DANGER|CAUTION|NO|YES|MUST|SHOULD|ALWAYS|NEVER)\b/gi, 'ATTENTION! $1! $1!')
        .replace(/\b(\d+)\s*(mph|feet|yards|meters)\b/gi, '$1 $2! I repeat, $1 $2!')
        .replace(/\?/g, '? Listen carefully:')
        .replace(/\./g, '. ');
      
      // Add question prefix for questions
      if (isQuestion) {
        enhancedText = `Question ${currentIndex + 1}. LISTEN CAREFULLY! ${enhancedText}`;
      }
      
      // Speak the enhanced text with maximum volume
      speakLoud(enhancedText);
      
      // Add echo effect for extra emphasis on questions
      if (isQuestion) {
        speakLoud(text, 300);
      }
    }
  };

  // Extra loud text-to-speech function
  const speakExtraLoud = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel(); // Cancel any ongoing speech
      
      // Create an even more enhanced version for maximum loudness
      const speakVeryLoud = (textToSpeak, delay = 0) => {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = 'en-US';
          utterance.rate = 0.5; // Even slower for maximum clarity
          utterance.volume = 1.0; // Maximum volume
          utterance.pitch = 1.4; // Even higher pitch
          
          // Find the loudest voice available
          const voices = synth.getVoices();
          if (voices.length > 0) {
            // Prefer female voices as they tend to be louder and clearer
            const loudestVoice = voices.find(voice => 
              voice.name.includes('Zira') || 
              voice.name.includes('Hazel') ||
              voice.name.includes('Female') ||
              voice.name.includes('Microsoft')
            ) || voices[0];
            utterance.voice = loudestVoice;
          }
          
          synth.speak(utterance);
        }, delay);
      };
      
      // Triple emphasis on important words
      let superEnhancedText = text
        .replace(/\b(STOP|YIELD|SPEED LIMIT|WARNING|DANGER|CAUTION|NO|YES|MUST|SHOULD|ALWAYS|NEVER)\b/gi, 'ATTENTION! $1! $1! $1!')
        .replace(/\b(\d+)\s*(mph|feet|yards|meters)\b/gi, '$1 $2! I repeat, $1 $2!')
        .replace(/\?/g, '? Listen carefully to this question:')
        .replace(/\./g, '. Pay attention. ');
      
      // Speak with maximum emphasis
      speakVeryLoud(`LISTEN CAREFULLY! ${superEnhancedText}`);
      
      // Add an echo effect for extra emphasis
      speakVeryLoud(text, 200);
    }
  };

  // Fetch quiz questions from backend
  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/questions/public?limit=25`);

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      
      if (data.success && data.questions && data.questions.length > 0) {
        console.log('✅ Loaded questions:', data.questions.length);
        setQuestions(data.questions);
        setCurrentIndex(0);
        setUserAnswers([]);
        setScore(0);
        setShowScore(false);
        setQuizCompleted(false);
        setReviewMode(false);
      } else {
        throw new Error('No questions available');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load quiz questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Start quiz timer
  const startQuiz = () => {
    setQuizStarted(true);
    startTime.current = Date.now();
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Submit quiz to backend
  const submitQuiz = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const finalScore = calculateFinalScore();
    const calculatedMistakes = calculateMistakes();
    const timeSpent = startTime.current ? (Date.now() - startTime.current) / 1000 / 60 : 0;

    try {
      const quizData = {
        answers: userAnswers,
        score: finalScore,
        total: questions.length,
        timeSpent: Math.round(timeSpent * 100) / 100,
        questions: questions,
        mistakes: calculatedMistakes
      };

      const response = await fetch(`${API_BASE_URL}/quiz/submit/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData)
      });

      if (response.ok) {
        const result = await response.json();
        setQuizResults(result.results);
        console.log('✅ Quiz results submitted:', result);
      }
    } catch (err) {
      console.error('❌ Error submitting quiz:', err);
    }

    setScore(finalScore);
    setMistakes(calculatedMistakes);
    setShowScore(true);
    setQuizCompleted(true);

    // Save mistakes and stats to localStorage for the Mistake page
    localStorage.setItem('recentQuizMistakes', JSON.stringify(calculatedMistakes));
    localStorage.setItem('recentQuizStats', JSON.stringify({
      totalQuestions: questions.length,
      correctAnswers: finalScore,
      scorePercent: Math.round((finalScore / questions.length) * 100)
    }));
  };

  // Calculate final score
  const calculateFinalScore = () => {
    let correctCount = 0;
    for (let i = 0; i < Math.min(userAnswers.length, questions.length); i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }
    return correctCount;
  };

  // Calculate mistakes
  const calculateMistakes = () => {
    const mistakesList = [];
    for (let i = 0; i < Math.min(userAnswers.length, questions.length); i++) {
      if (userAnswers[i] !== questions[i].correctAnswer) {
        mistakesList.push({
          questionIndex: i,
          question: questions[i],
          userAnswer: userAnswers[i],
          correctAnswer: questions[i].correctAnswer
        });
      }
    }
    return mistakesList;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerId) => {
    if (!showFeedback) {
      setSelectedAnswer(answerId);
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    if (!quizStarted) {
      startQuiz();
    }
    
    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);

    // Show feedback
    setShowFeedback(true);

    // Auto-advance after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Quiz completed
        submitQuiz();
      }
    }, 2000);
  };

  // Start new quiz
  const startNewQuiz = () => {
    fetchQuestions();
    setTimeLeft(1800);
    setQuizStarted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Show review mode
  const showReview = () => {
    setReviewMode(true);
  };

  // Go back to results
  const backToResults = () => {
    setReviewMode(false);
  };

  // Load questions on component mount
  useEffect(() => {
    fetchQuestions();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Auto-speak questions when they change
  useEffect(() => {
    if (autoSpeak && questions.length > 0 && currentIndex < questions.length && !showScore && !reviewMode) {
      const currentQuestion = questions[currentIndex];
      if (currentQuestion && currentQuestion.questionText) {
        // Delay speech slightly to ensure UI is ready
        setTimeout(() => {
          speak(currentQuestion.questionText, true);
        }, 500);
      }
    }
  }, [currentIndex, questions, autoSpeak, showScore, reviewMode]);

  // Loading state
  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <h2>🚗 Loading Driving License Quiz...</h2>
          <p>Preparing 25 questions from our database of 250 questions</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="quiz-container">
        <div className="error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={fetchQuestions} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // Review mode
  if (reviewMode && questions.length > 0) {
    return (
      <div className="quiz-container">
        <div className="review-header">
          <h2>📋 Review Your Answers</h2>
          <p>Your Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
          <button onClick={backToResults} className="back-btn">← Back to Results</button>
        </div>
        
        <div className="review-questions">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id || index} className={`review-question ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="question-header">
                  <h3>Question {index + 1}</h3>
                  <span className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                  </span>
                </div>
                
                <p className="question-text">{question.questionText}</p>
                <div className="audio-controls">
                  <button 
                    onClick={() => speak(question.questionText, true)} 
                    className="speak-btn"
                    title="Read question aloud"
                  >
                    🔊 Speak Question
                  </button>
                  <button 
                    onClick={() => speakExtraLoud(question.questionText)} 
                    className="speak-loud-btn"
                    title="Read question EXTRA LOUD"
                  >
                    📢 SUPER LOUD!
                  </button>
                  <button 
                    onClick={() => {
                      const optionsText = question.options.map((opt) => `Option ${opt.id}: ${opt.text}`).join('. ');
                      speak(`Question: ${question.questionText}. Your options are: ${optionsText}`, true);
                    }} 
                    className="speak-all-btn"
                    title="Read question and all options"
                  >
                    🎯 Speak All
                  </button>
                </div>
                
                <div className="answer-review">
                  <p><strong>Your Answer:</strong> {userAnswer ? `${userAnswer}. ${question.options.find(opt => opt.id === userAnswer)?.text || 'Unknown'}` : 'No answer'}</p>
                  {!isCorrect && (
                    <p><strong>Correct Answer:</strong> {question.correctAnswer}. {question.options.find(opt => opt.id === question.correctAnswer)?.text}</p>
                  )}
                  {question.explanation && (
                    <p className="explanation"><strong>Explanation:</strong> {question.explanation}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="review-footer">
          <button onClick={startNewQuiz} className="new-quiz-btn">
            🆕 Take New Quiz
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showScore && quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70; // 70% to pass
    
    return (
      <div className="quiz-container">
        <div className="results-screen">
          <h2>🏁 Quiz Complete!</h2>
          
          <div className={`score-display ${passed ? 'passed' : 'failed'}`}>
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {questions.length}</span>
            </div>
            <div className="percentage">{percentage}%</div>
          </div>
          
          <div className="result-message">
            {timeLeft > 0 ? (
              <p className="time-bonus">🎉 Excellent! You finished with {formatTime(timeLeft)} remaining!</p>
            ) : (
              <p className="time-up">⏰ Time's up! But you completed the quiz.</p>
            )}
            
            {passed ? (
              <p className="pass-message">🎊 Congratulations! You passed the driving license quiz!</p>
            ) : (
              <p className="fail-message">📚 Keep studying! You need 70% to pass.</p>
            )}
          </div>
          
          <div className="quiz-summary">
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-number">{score}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{mistakes.length}</span>
                <span className="stat-label">Mistakes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{questions.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
          
          <div className="result-actions">
            <button onClick={showReview} className="review-btn">
              🔍 Review All Answers
            </button>
            <button onClick={() => navigate('/history')} className="history-btn">
              📊 View History
            </button>
            <button onClick={() => navigate('/mistake')} className="mistakes-btn">
              ❌ View Mistakes
            </button>
            <button onClick={startNewQuiz} className="new-quiz-btn">
              🆕 Take New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No questions loaded
  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="no-questions">
          <h2>📝 No Questions Available</h2>
          <p>Unable to load quiz questions.</p>
          <button onClick={fetchQuestions} className="retry-btn">
            🔄 Reload Questions
          </button>
        </div>
      </div>
    );
  }

  // Quiz interface
  const currentQuestion = questions[currentIndex];
  
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>🚗 Driving License Quiz</h2>
        <div className="quiz-info">
          <div className="timer">
            ⏱️ Time: {formatTime(timeLeft)}
          </div>
          <div className="progress">
            📊 Question {currentIndex + 1} of {questions.length}
          </div>
        </div>
        
        {/* Voice Controls */}
        <div className="voice-controls">
          <div className="voice-settings">
            <label className="auto-speak-toggle">
              <input
                type="checkbox"
                checked={autoSpeak}
                onChange={(e) => setAutoSpeak(e.target.checked)}
              />
              🔊 Auto-Speak Questions
            </label>
            
            <div className="volume-control">
              <label>🔊 Volume:</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={speechVolume}
                onChange={(e) => setSpeechVolume(parseFloat(e.target.value))}
                className="volume-slider"
              />
              <span className="volume-display">{Math.round(speechVolume * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {!quizStarted && (
        <div className="start-message">
          <p>🚦 Click "Submit Answer" to start your 30-minute timer!</p>
        </div>
      )}

      <div className="question-section">
        <div className="question-header">
          <h3>Question {currentIndex + 1}</h3>
          <div className="audio-controls">
            <button 
              onClick={() => speak(currentQuestion.questionText, true)} 
              className="speak-btn"
              title="Read question aloud"
            >
              🔊 Speak Question
            </button>
            <button 
              onClick={() => speakExtraLoud(currentQuestion.questionText)} 
              className="speak-loud-btn"
              title="Read question EXTRA LOUD"
            >
              📢 SUPER LOUD!
            </button>
            <button 
              onClick={() => {
                const optionsText = currentQuestion.options.map((opt, idx) => 
                  `Option ${opt.id}: ${opt.text}`
                ).join('. ');
                speak(`Question: ${currentQuestion.questionText}. Your options are: ${optionsText}`, true);
              }}
              className="speak-all-btn"
              title="Read question and all options"
            >
              🎯 Speak All
            </button>
          </div>
        </div>
        
        <p className="question-text">{currentQuestion.questionText}</p>
        
        <div className="options">
          {currentQuestion.options.map((option) => {
            let className = 'option';
            
            if (showFeedback && selectedAnswer !== null) {
              if (option.id === currentQuestion.correctAnswer) {
                className += ' correct';
              } else if (option.id === selectedAnswer && option.id !== currentQuestion.correctAnswer) {
                className += ' incorrect';
              }
            } else if (selectedAnswer === option.id) {
              className += ' selected';
            }
            
            return (
              <button
                key={option.id}
                className={className}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
              >
                <span className="option-letter">{option.id}.</span>
                <span className="option-text">{option.text}</span>
              </button>
            );
          })}
        </div>
        
        <div className="question-actions">
          <button 
            className="submit-btn"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null || showFeedback}
          >
            {showFeedback ? '⏳ Processing...' : '✅ Submit Answer'}
          </button>
        </div>
        
        {showFeedback && (
          <div className={`feedback ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <p>✅ Correct! Well done!</p>
            ) : (
              <p>❌ Incorrect. The correct answer is: {currentQuestion.options.find(opt => opt.id === currentQuestion.correctAnswer)?.text}</p>
            )}
            {currentQuestion.explanation && (
              <p className="explanation">{currentQuestion.explanation}</p>
            )}
          </div>
        )}
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};


export default DrivingLicenseQuiz;     