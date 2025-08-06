import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Service.css"

// API Configuration
const API_BASE_URL = 'http://localhost:5001/api';

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Fetch questions from backend
  const fetchQuestions = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/questions/public?limit=25`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      
      if (data.success && data.questions.length > 0) {
        setQuizQuestions(data.questions);
        console.log('✅ Loaded', data.questions.length, 'questions from backend');
      } else {
        throw new Error('No questions available');
      }
    } catch (err) {
      console.error('❌ Error fetching questions:', err);
      setError('Failed to load quiz questions. Please try again.');
      
      // Fallback to local questions if backend fails
      console.log('⚠️ Using fallback local questions');
      setQuizQuestions(getFallbackQuestions());
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback questions in case backend is not available
  const getFallbackQuestions = () => {
    return [
      {
        id: 1,
        questionText: "What does a red octagonal sign mean?",
        category: "Road Signs",
        options: [
          { id: "A", text: "Stop completely" },
          { id: "B", text: "Yield to traffic" },
          { id: "C", text: "Slow down" },
          { id: "D", text: "No entry" }
        ],
        correctAnswer: "A",
        explanation: "A red octagonal sign always means STOP. You must come to a complete stop."
      },
      {
        id: 2,
        questionText: "What should you do when approaching a yellow traffic light?",
        category: "Traffic Rules",
        options: [
          { id: "A", text: "Speed up to get through" },
          { id: "B", text: "Prepare to stop safely" },
          { id: "C", text: "Continue at same speed" },
          { id: "D", text: "Honk your horn" }
        ],
        correctAnswer: "B",
        explanation: "Yellow light means prepare to stop safely if you can do so without causing an accident."
      },
      {
        id: 3,
        questionText: "What is the typical speed limit in residential areas?",
        category: "Speed Limits",
        options: [
          { id: "A", text: "15 mph" },
          { id: "B", text: "25 mph" },
          { id: "C", text: "35 mph" },
          { id: "D", text: "45 mph" }
        ],
        correctAnswer: "B",
        explanation: "Most residential areas have a speed limit of 25 mph for safety of pedestrians and children."
      }
    ];
  };

  // Submit quiz results to backend
  const submitQuizResults = async (finalScore, finalAnswers) => {
    try {
      const quizData = {
        answers: finalAnswers,
        score: finalScore,
        total: quizQuestions.length,
        timeSpent: Math.round((quizQuestions.length * 30 - timeLeft) / 60 * 100) / 100,
        questions: quizQuestions
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
        console.log('✅ Quiz results submitted:', result);
      } else {
        console.log('⚠️ Failed to submit results to backend');
      }
    } catch (err) {
      console.error('❌ Error submitting results:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const question = quizQuestions[currentQuestion]
  const progress = quizQuestions.length > 0 ? ((currentQuestion + 1) / quizQuestions.length) * 100 : 0

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showFeedback && !isLoading) {
      handleSubmitAnswer()
    }
  }, [timeLeft, showFeedback, isLoading])

  useEffect(() => {
    if (!isLoading) {
      setTimeLeft(30)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }, [currentQuestion, isLoading])

  const handleAnswerSelect = (answerId) => {
    if (!showFeedback) {
      setSelectedAnswer(answerId)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer && timeLeft > 0) return

    const newAnswers = [...answers, selectedAnswer || ""]
    setAnswers(newAnswers)

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1)
    }

    setShowFeedback(true)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const handleNextQuestion = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed - submit results to backend
      const finalScore = score + (selectedAnswer === question.correctAnswer ? 1 : 0);
      const finalAnswers = [...answers, selectedAnswer || ""];
      
      await submitQuizResults(finalScore, finalAnswers);
      
      // Save to localStorage for compatibility
      const quizResults = {
        score: finalScore,
        total: quizQuestions.length,
        answers: finalAnswers,
        questions: quizQuestions,
        date: new Date().toISOString(),
        timeSpent: (quizQuestions.length * 30 - timeLeft) / 60,
      }

      const history = JSON.parse(localStorage.getItem("practiceHistory") || "[]")
      history.unshift(quizResults)
      localStorage.setItem("practiceHistory", JSON.stringify(history.slice(0, 50)))

      navigate(`/results?score=${finalScore}&total=${quizQuestions.length}`)
    }
  }

  const getOptionStyle = (optionId) => {
    if (!showFeedback) {
      return selectedAnswer === optionId ? "selected" : "normal"
    }

    if (optionId === question.correctAnswer) {
      return "correct"
    }

    if (optionId === selectedAnswer && optionId !== question.correctAnswer) {
      return "incorrect"
    }

    return "normal"
  }

  // Error state
  if (error && quizQuestions.length === 0) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <h2>⚠️ Error Loading Quiz</h2>
          <p>{error}</p>
          <button onClick={fetchQuestions} className="retry-button">
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading || !question) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Preparing your personalized quiz...</p>
        <small>Loading questions from database...</small>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>VID Oral Exam Practice</h1>
        <div className="quiz-header-meta">
          <span>⏰ {timeLeft}s</span>
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{question.category}</span>
        </div>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </header>

      <main className="quiz-content">
        <h2>Question {currentQuestion + 1}</h2>

        <div className="question-text">
          {question.questionText}
        </div>

        <div className="options-list">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              disabled={showFeedback}
              className={`option-button ${getOptionStyle(option.id)}`}
            >
              <span><strong>{option.id}.</strong> {option.text}</span>
              {showFeedback && option.id === question.correctAnswer && <span className="correct-icon">✅</span>}
              {showFeedback && option.id === selectedAnswer && option.id !== question.correctAnswer && <span className="incorrect-icon">❌</span>}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback-box ${selectedAnswer === question.correctAnswer ? "correct" : "incorrect"}`}>
            {selectedAnswer === question.correctAnswer ? (
              <>
                <span className="feedback-icon">✅</span> Correct!
              </>
            ) : (
              <>
                <span className="feedback-icon">❌</span> Incorrect
              </>
            )}
            <p>{question.explanation}</p>
          </div>
        )}

        <div className="quiz-footer">
          <span>
            Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)} | 
            Questions: {quizQuestions.length}
          </span>

          {!showFeedback ? (
            <button 
              onClick={handleSubmitAnswer} 
              disabled={!selectedAnswer}
              className="submit-button"
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestion < quizQuestions.length - 1 ? "Next Question ➡️" : "View Results 🎯"}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}