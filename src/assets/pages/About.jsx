import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const API_BASE_URL = 'http://localhost:5001/api';

const About = () => {
  const navigate = useNavigate();
  
  // State management
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [speechVolume, setSpeechVolume] = useState(1.0);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Text-to-speech function with maximum loudness
  const speak = (text, isQuestion = false) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel(); // Cancel any ongoing speech
      
      const speakLoud = (textToSpeak, delay = 0) => {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = 'en-US';
          utterance.rate = 0.7;
          utterance.volume = speechVolume;
          utterance.pitch = 1.2;
          
          // Find the best voice
          const voices = synth.getVoices();
          if (voices.length > 0) {
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
      
      // Enhance text with emphasis
      let enhancedText = text
        .replace(/\b(STOP|YIELD|SPEED LIMIT|WARNING|DANGER|CAUTION|NO|YES|MUST|SHOULD|ALWAYS|NEVER)\b/gi, 'ATTENTION! $1! $1!')
        .replace(/\b(\d+)\s*(mph|feet|yards|meters)\b/gi, '$1 $2! I repeat, $1 $2!')
        .replace(/\?/g, '? Listen carefully:')
        .replace(/\./g, '. ');
      
      if (isQuestion) {
        enhancedText = `Question ${currentIndex + 1}. LISTEN CAREFULLY! ${enhancedText}`;
      }
      
      speakLoud(enhancedText);
      
      if (isQuestion) {
        speakLoud(text, 300);
      }
    }
  };

  // Extra loud speech function
  const speakExtraLoud = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel();
      
      const speakVeryLoud = (textToSpeak, delay = 0) => {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = 'en-US';
          utterance.rate = 0.5;
          utterance.volume = 1.0;
          utterance.pitch = 1.4;
          
          const voices = synth.getVoices();
          if (voices.length > 0) {
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
      
      let superEnhancedText = text
        .replace(/\b(STOP|YIELD|SPEED LIMIT|WARNING|DANGER|CAUTION|NO|YES|MUST|SHOULD|ALWAYS|NEVER)\b/gi, 'ATTENTION! $1! $1! $1!')
        .replace(/\b(\d+)\s*(mph|feet|yards|meters)\b/gi, '$1 $2! I repeat, $1 $2!')
        .replace(/\?/g, '? Listen carefully to this question:')
        .replace(/\./g, '. Pay attention. ');
      
      speakVeryLoud(`LISTEN CAREFULLY! ${superEnhancedText}`);
      speakVeryLoud(text, 200);
    }
  };

  // Fetch questions from backend
  const fetchQuestions = async (limit = 10) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/questions/public?limit=${limit}`);

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
        setQuizCompleted(false);
      } else {
        throw new Error('No questions available');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-speak questions when they change
  useEffect(() => {
    if (autoSpeak && questions.length > 0 && currentIndex < questions.length && isQuizMode && !quizCompleted) {
      const currentQuestion = questions[currentIndex];
      if (currentQuestion && currentQuestion.questionText) {
        setTimeout(() => {
          speak(currentQuestion.questionText, true);
        }, 500);
      }
    }
  }, [currentIndex, questions, autoSpeak, isQuizMode, quizCompleted]);

  // Handle answer selection
  const handleAnswerSelect = (answerId) => {
    if (!showFeedback) {
      setSelectedAnswer(answerId);
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);

    // Check if answer is correct
    if (selectedAnswer === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
      speak("Correct! Well done!", false);
    } else {
      const correctOption = questions[currentIndex].options.find(opt => opt.id === questions[currentIndex].correctAnswer);
      speak(`Incorrect. The correct answer is: ${correctOption?.text}`, false);
    }

    setShowFeedback(true);

    // Auto-advance after 3 seconds
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Quiz completed
        setQuizCompleted(true);
        speak(`Quiz completed! Your final score is ${score + (selectedAnswer === questions[currentIndex].correctAnswer ? 1 : 0)} out of ${questions.length}`, false);
      }
    }, 3000);
  };

  // Start quiz mode
  const startQuiz = () => {
    setIsQuizMode(true);
    fetchQuestions(10);
    speak("Welcome to the About Quiz! Let's test your knowledge with 10 questions.", false);
  };

  // Reset quiz
  const resetQuiz = () => {
    setIsQuizMode(false);
    setQuizCompleted(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setUserAnswers([]);
    setQuestions([]);
  };

  // Go to main quiz
  const goToMainQuiz = () => {
    navigate('/quiz');
  };

  if (loading) {
    return (
      <div className="about-container">
        <div className="loading">
          <h2>🚗 Loading Questions...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-container">
        <div className="error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={() => fetchQuestions(10)} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz completed view
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    let feedback = 'Good';
    
    if (percentage >= 90) feedback = 'Excellent';
    else if (percentage >= 80) feedback = 'Very Good';
    else if (percentage >= 70) feedback = 'Good';
    else if (percentage >= 60) feedback = 'Fair';
    else feedback = 'Needs Improvement';

    return (
      <div className="about-container">
        <div className="quiz-results">
          <h2>🎉 Quiz Completed!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
              <span className="score-text">{feedback}</span>
            </div>
          </div>
          <div className="score-details">
            <p>You scored <strong>{score}</strong> out of <strong>{questions.length}</strong> questions correctly!</p>
          </div>
          <div className="quiz-actions">
            <button onClick={resetQuiz} className="action-btn primary">
              🔄 Try Again
            </button>
            <button onClick={goToMainQuiz} className="action-btn secondary">
              🚗 Take Full Quiz
            </button>
            <button onClick={() => navigate('/dashboard')} className="action-btn tertiary">
              📊 Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz mode view
  if (isQuizMode && questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    
    return (
      <div className="about-container">
        <div className="quiz-header">
          <h2>📚 About Quiz - Sample Questions</h2>
          <div className="quiz-info">
            <div className="progress">
              📊 Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="score">
              🎯 Score: {score}/{questions.length}
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
                <p className="explanation"><strong>Explanation:</strong> {currentQuestion.explanation}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default About page view
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>📚 About Driving License Quiz</h1>
        <p className="about-subtitle">Learn about our comprehensive driving test preparation system</p>
      </div>

      <div className="about-content">
        <div className="info-section">
          <h2>🚗 What is this Quiz?</h2>
          <p>
            Our Driving License Quiz is a comprehensive test preparation system designed to help you 
            pass your driving license exam with confidence. We have a database of over 250 carefully 
            crafted questions covering all aspects of driving knowledge.
          </p>
        </div>

        <div className="features-section">
          <h2>✨ Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔊</div>
              <h3>Voice Support</h3>
              <p>Questions can be read aloud with adjustable volume and auto-speak functionality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Track your performance and see detailed statistics of your quiz attempts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Targeted Practice</h3>
              <p>Practice specific categories like road signs, traffic rules, and safety procedures</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>Timed Tests</h3>
              <p>Simulate real exam conditions with timed practice sessions</p>
            </div>
          </div>
        </div>

        <div className="categories-section">
          <h2>📋 Question Categories</h2>
          <div className="categories-grid">
            <div className="category-item">
              <span className="category-icon">🛑</span>
              <div className="category-info">
                <h4>Road Signs</h4>
                <p>50 questions about traffic signs and their meanings</p>
              </div>
            </div>
            <div className="category-item">
              <span className="category-icon">🚦</span>
              <div className="category-info">
                <h4>Traffic Rules</h4>
                <p>50 questions about traffic laws and regulations</p>
              </div>
            </div>
            <div className="category-item">
              <span className="category-icon">⚡</span>
              <div className="category-info">
                <h4>Speed Limits</h4>
                <p>30 questions about speed limits in different zones</p>
              </div>
            </div>
            <div className="category-item">
              <span className="category-icon">🛡️</span>
              <div className="category-info">
                <h4>Safety Rules</h4>
                <p>40 questions about safe driving practices</p>
              </div>
            </div>
            <div className="category-item">
              <span className="category-icon">🅿️</span>
              <div className="category-info">
                <h4>Parking Regulations</h4>
                <p>20 questions about parking rules and restrictions</p>
              </div>
            </div>
            <div className="category-item">
              <span className="category-icon">🚨</span>
              <div className="category-info">
                <h4>Emergency Procedures</h4>
                <p>15 questions about handling emergency situations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-section">
          <h2>🚀 Ready to Practice?</h2>
          <p>Try our sample quiz to experience the voice features and question format!</p>
          
          <div className="action-buttons">
            <button onClick={startQuiz} className="action-btn primary large">
              🎯 Try Sample Quiz (10 Questions)
            </button>
            <button onClick={goToMainQuiz} className="action-btn secondary large">
              🚗 Take Full Quiz (25 Questions)
            </button>
            <button onClick={() => navigate('/dashboard')} className="action-btn tertiary large">
              📊 Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;