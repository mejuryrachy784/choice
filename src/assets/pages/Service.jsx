import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import"./Service.css"
// import { CheckCircle, XCircle, ArrowRight, Clock } from "lucide-react"
// import TextToSpeechPlayer from "./TextToSpeechPlayer"

const getRandomQuestions = () => {
  // ...Keep your generateQuestions logic from your current code
}

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
  const navigate = useNavigate()

  useEffect(() => {
    const randomQuestions = getRandomQuestions()
    setQuizQuestions(randomQuestions)
    setIsLoading(false)
  }, [])

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

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const quizResults = {
        score,
        total: quizQuestions.length,
        answers,
        questions: quizQuestions,
        date: new Date().toISOString(),
        timeSpent: (quizQuestions.length * 30 - timeLeft) / 60,
      }

      const history = JSON.parse(localStorage.getItem("practiceHistory") || "[]")
      history.unshift(quizResults)
      localStorage.setItem("practiceHistory", JSON.stringify(history.slice(0, 50)))

      navigate(`/results?score=${score}&total=${quizQuestions.length}`)
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

  if (isLoading || !question) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Preparing your personalized quiz...</p>
        <small>Selecting 25 random questions from 250 available</small>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>VID Oral Exam Practice</h1>
        <div className="quiz-header-meta">
          <span><Clock size={16} /> {timeLeft}s</span>
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{question.category}</span>
        </div>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </header>

      <main className="quiz-content">
        <h2>Question {currentQuestion + 1}</h2>

        <TextToSpeechPlayer
          text={question.questionText}
          questionNumber={currentQuestion + 1}
          category={question.category}
          onPlayStateChange={setIsPlaying}
        />

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
              {showFeedback && option.id === question.correctAnswer && <CheckCircle size={20} color="green" />}
              {showFeedback && option.id === selectedAnswer && option.id !== question.correctAnswer && <XCircle size={20} color="red" />}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback-box ${selectedAnswer === question.correctAnswer ? "correct" : "incorrect"}`}>
            {selectedAnswer === question.correctAnswer ? (
              <>
                <CheckCircle size={20} color="green" /> Correct!
              </>
            ) : (
              <>
                <XCircle size={20} color="red" /> Incorrect
              </>
            )}
            <p>{question.explanation}</p>
          </div>
        )}

        <div className="quiz-footer">
          <span>
            Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)} | Remaining:{" "}
            {250 - JSON.parse(localStorage.getItem("usedQuestions") || "[]").length}
          </span>

          {!showFeedback ? (
            <button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>Submit Answer</button>
          ) : (
            <button onClick={handleNextQuestion}>
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "View Results"} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
