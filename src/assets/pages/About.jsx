


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import"./About.css"


// // Generate 250 different and unique questions
// const generateQuestions = () => {
//   const questionBank = [
//     // Road Signs Questions (50 questions)
//     {
//       category: "Road Signs",
//       question: "What does a red octagonal sign mean?",
//       options: ["Stop completely", "Yield to traffic", "Slow down", "No entry"],
//       correct: 0,
//       explanation: "A red octagonal sign always means STOP. You must come to a complete stop.",
//     },
//     {
//       category: "Road Signs",
//       question: "What does a yellow diamond sign typically indicate?",
//       options: ["Construction zone", "Warning or caution", "Speed limit", "No parking"],
//       correct: 1,
//       explanation: "Yellow diamond signs are warning signs that alert drivers to potential hazards ahead.",
//     },
//     {
//       category: "Road Signs",
//       question: "What does a triangular sign with red border mean?",
//       options: ["Stop", "Yield", "Merge", "Exit"],
//       correct: 1,
//       explanation: "A triangular sign with red border means YIELD - give right of way to other traffic.",
//     },
//     {
//       category: "Road Signs",
//       question: "What color are regulatory signs typically?",
//       options: ["Yellow", "White with black text", "Blue", "Green"],
//       correct: 1,
//       explanation: "Regulatory signs are typically white with black text and tell you what you must or must not do.",
//     },
//     {
//       category: "Road Signs",
//       question: "What does a circular sign with a red slash mean?",
//       options: ["Caution ahead", "Prohibition or restriction", "Information", "Direction"],
//       correct: 1,
//       explanation: "A circular sign with a red slash indicates something is prohibited or restricted.",
//     },

//     // Traffic Rules Questions (50 questions)
//     {
//       category: "Traffic Rules",
//       question: "When should you signal before changing lanes?",
//       options: [
//         "Just before changing",
//         "At least 100 feet before",
//         "After checking mirrors",
//         "Only if traffic is present",
//       ],
//       correct: 1,
//       explanation: "You should signal at least 100 feet before changing lanes to give other drivers adequate warning.",
//     },
//     {
//       category: "Traffic Rules",
//       question: "What should you do when approaching a yellow traffic light?",
//       options: ["Speed up to get through", "Prepare to stop safely", "Continue at same speed", "Honk your horn"],
//       correct: 1,
//       explanation: "Yellow light means prepare to stop safely if you can do so without causing an accident.",
//     },
//     {
//       category: "Traffic Rules",
//       question: "Who has the right of way at a four-way stop?",
//       options: ["Largest vehicle", "First vehicle to arrive", "Vehicle turning right", "Vehicle going straight"],
//       correct: 1,
//       explanation: "At a four-way stop, the first vehicle to arrive and come to a complete stop has the right of way.",
//     },
//     {
//       category: "Traffic Rules",
//       question: "When is it legal to pass on the right?",
//       options: ["Never", "When the left lane is blocked", "On multi-lane highways", "Only in emergencies"],
//       correct: 2,
//       explanation: "Passing on the right is legal on multi-lane highways when it can be done safely.",
//     },
//     {
//       category: "Traffic Rules",
//       question: "What is the proper following distance in normal conditions?",
//       options: ["1 second", "2 seconds", "3-4 seconds", "5 seconds"],
//       correct: 2,
//       explanation: "The 3-4 second rule provides adequate stopping distance in normal driving conditions.",
//     },

//     // Speed Limits Questions (30 questions)
//     {
//       category: "Speed Limits",
//       question: "What is the typical speed limit in residential areas?",
//       options: ["15 mph", "25 mph", "35 mph", "45 mph"],
//       correct: 1,
//       explanation: "Most residential areas have a speed limit of 25 mph for safety of pedestrians and children.",
//     },
//     {
//       category: "Speed Limits",
//       question: "What is the maximum speed limit on most interstate highways?",
//       options: ["55 mph", "65 mph", "70-80 mph", "No limit"],
//       correct: 2,
//       explanation: "Most interstate highways have speed limits between 70-80 mph, varying by state.",
//     },
//     {
//       category: "Speed Limits",
//       question: "What should you do when no speed limit is posted?",
//       options: ["Drive as fast as you want", "Follow the basic speed law", "Drive 55 mph", "Ask a police officer"],
//       correct: 1,
//       explanation: "When no speed limit is posted, follow the basic speed law - drive at a safe speed for conditions.",
//     },
//     {
//       category: "Speed Limits",
//       question: "What is the speed limit in school zones when children are present?",
//       options: ["15 mph", "20 mph", "25 mph", "Same as regular limit"],
//       correct: 0,
//       explanation: "School zones typically have a 15 mph speed limit when children are present.",
//     },
//     {
//       category: "Speed Limits",
//       question: "When should you drive slower than the posted speed limit?",
//       options: ["Never", "Only at night", "In poor weather conditions", "Only in construction zones"],
//       correct: 2,
//       explanation:
//         "You should drive slower than the posted limit in poor weather, heavy traffic, or hazardous conditions.",
//     },

//     // Safety Rules Questions (40 questions)
//     {
//       category: "Safety Rules",
//       question: "When should you use your headlights?",
//       options: [
//         "Only at night",
//         "30 minutes before sunset to 30 minutes after sunrise",
//         "Only in rain",
//         "When you can't see clearly",
//       ],
//       correct: 1,
//       explanation: "Use headlights from 30 minutes before sunset to 30 minutes after sunrise, and in poor visibility.",
//     },
//     {
//       category: "Safety Rules",
//       question: "What should you do if your brakes fail?",
//       options: ["Pump the brakes", "Use the parking brake gradually", "Shift to lower gear", "All of the above"],
//       correct: 3,
//       explanation:
//         "If brakes fail, pump them, use parking brake gradually, shift to lower gear, and look for safe place to stop.",
//     },
//     {
//       category: "Safety Rules",
//       question: "How often should you check your mirrors while driving?",
//       options: ["Only when changing lanes", "Every 5-8 seconds", "Once per minute", "Only when backing up"],
//       correct: 1,
//       explanation: "You should check your mirrors every 5-8 seconds to maintain awareness of traffic around you.",
//     },
//     {
//       category: "Safety Rules",
//       question: "What is the safest way to handle a tire blowout?",
//       options: [
//         "Brake hard immediately",
//         "Grip wheel firmly and gradually slow down",
//         "Turn sharply to shoulder",
//         "Accelerate to maintain control",
//       ],
//       correct: 1,
//       explanation: "Grip the wheel firmly, keep straight, and gradually slow down. Don't brake hard or turn sharply.",
//     },
//     {
//       category: "Safety Rules",
//       question: "When should you use hazard lights?",
//       options: ["When parking illegally", "When your vehicle is disabled", "When driving slowly", "When it's raining"],
//       correct: 1,
//       explanation: "Use hazard lights when your vehicle is disabled or stopped in a dangerous location.",
//     },

//     // Parking Regulations Questions (20 questions)
//     {
//       category: "Parking Regulations",
//       question: "How far from a fire hydrant must you park?",
//       options: ["5 feet", "10 feet", "15 feet", "20 feet"],
//       correct: 2,
//       explanation: "You must park at least 15 feet away from a fire hydrant to allow emergency access.",
//     },
//     {
//       category: "Parking Regulations",
//       question: "When parking on a hill, which way should you turn your wheels?",
//       options: [
//         "Always toward the curb",
//         "Always away from the curb",
//         "Toward curb going down, away going up",
//         "It doesn't matter",
//       ],
//       correct: 2,
//       explanation: "Turn wheels toward curb when parking downhill, away from curb when parking uphill.",
//     },
//     {
//       category: "Parking Regulations",
//       question: "How close to a crosswalk can you legally park?",
//       options: ["Right up to it", "5 feet", "20 feet", "50 feet"],
//       correct: 2,
//       explanation: "You must park at least 20 feet from a crosswalk to maintain visibility for pedestrians.",
//     },
//     {
//       category: "Parking Regulations",
//       question: "When is it legal to park in a handicapped space?",
//       options: [
//         "If you're only stopping briefly",
//         "If no other spaces are available",
//         "Only with proper permit/placard",
//         "Never",
//       ],
//       correct: 2,
//       explanation: "You can only park in handicapped spaces with a valid handicapped permit or placard.",
//     },
//     {
//       category: "Parking Regulations",
//       question: "How far from a stop sign must you park?",
//       options: ["10 feet", "20 feet", "30 feet", "50 feet"],
//       correct: 2,
//       explanation: "You must park at least 30 feet from a stop sign to maintain visibility.",
//     },

//     // Emergency Procedures Questions (15 questions)
//     {
//       category: "Emergency Procedures",
//       question: "What should you do if you're in an accident?",
//       options: [
//         "Leave immediately",
//         "Move vehicles if safe, call police",
//         "Only call insurance",
//         "Wait for someone else to call",
//       ],
//       correct: 1,
//       explanation: "Move vehicles to safety if possible, check for injuries, and call police and emergency services.",
//     },
//     {
//       category: "Emergency Procedures",
//       question: "If you see an emergency vehicle with flashing lights, you should:",
//       options: [
//         "Speed up to get out of the way",
//         "Pull over to the right and stop",
//         "Continue driving normally",
//         "Flash your lights back",
//       ],
//       correct: 1,
//       explanation: "Pull over to the right side of the road and stop to allow emergency vehicles to pass.",
//     },
//     {
//       category: "Emergency Procedures",
//       question: "What should you do if your car starts to skid?",
//       options: [
//         "Brake hard",
//         "Steer in the direction you want to go",
//         "Accelerate",
//         "Turn the wheel opposite to the skid",
//       ],
//       correct: 1,
//       explanation: "Steer gently in the direction you want the car to go and avoid sudden movements.",
//     },
//     {
//       category: "Emergency Procedures",
//       question: "If your engine overheats, you should:",
//       options: [
//         "Keep driving to get help",
//         "Turn off engine immediately",
//         "Add cold water to radiator",
//         "Rev the engine",
//       ],
//       correct: 1,
//       explanation: "Turn off the engine immediately and let it cool down before checking coolant levels.",
//     },
//     {
//       category: "Emergency Procedures",
//       question: "What items should be in your emergency kit?",
//       options: [
//         "Only a spare tire",
//         "Flares, first aid kit, jumper cables",
//         "Just a cell phone",
//         "Nothing is required",
//       ],
//       correct: 1,
//       explanation: "Emergency kits should include flares/reflectors, first aid kit, jumper cables, and basic tools.",
//     },

//     // Weather Conditions Questions (15 questions)
//     {
//       category: "Weather Conditions",
//       question: "How should you drive in heavy rain?",
//       options: [
//         "Drive faster to get through it",
//         "Reduce speed and increase following distance",
//         "Use cruise control",
//         "Turn off headlights",
//       ],
//       correct: 1,
//       explanation: "Reduce speed, increase following distance, and use headlights in heavy rain.",
//     },
//     {
//       category: "Weather Conditions",
//       question: "What should you do if you encounter fog?",
//       options: [
//         "Use high beams",
//         "Use low beams and slow down",
//         "Speed up to get through it",
//         "Follow other cars closely",
//       ],
//       correct: 1,
//       explanation: "Use low beam headlights and reduce speed in fog. High beams reflect back and reduce visibility.",
//     },
//     {
//       category: "Weather Conditions",
//       question: "How should you handle icy roads?",
//       options: ["Drive normally", "Accelerate slowly and brake gently", "Use cruise control", "Brake hard when needed"],
//       correct: 1,
//       explanation: "On icy roads, accelerate slowly, brake gently, and avoid sudden movements.",
//     },
//     {
//       category: "Weather Conditions",
//       question: "What is black ice?",
//       options: [
//         "Ice that is black in color",
//         "Thick ice on roads",
//         "Thin, nearly invisible ice",
//         "Ice mixed with dirt",
//       ],
//       correct: 2,
//       explanation: "Black ice is thin, nearly invisible ice that forms on road surfaces and is extremely dangerous.",
//     },
//     {
//       category: "Weather Conditions",
//       question: "When should you use windshield wipers?",
//       options: ["Only in heavy rain", "Whenever visibility is reduced", "Only at night", "Never while driving"],
//       correct: 1,
//       explanation: "Use windshield wipers whenever visibility is reduced by rain, snow, or debris.",
//     },

//     // Vehicle Maintenance Questions (10 questions)
//     {
//       category: "Vehicle Maintenance",
//       question: "How often should you check your tire pressure?",
//       options: ["Once a year", "Monthly", "Only when tires look flat", "Never"],
//       correct: 1,
//       explanation: "Check tire pressure monthly to ensure proper inflation and safe driving.",
//     },
//     {
//       category: "Vehicle Maintenance",
//       question: "What does it mean when your oil pressure light comes on?",
//       options: ["Time for oil change", "Engine may be damaged", "Normal operation", "Check gas level"],
//       correct: 1,
//       explanation: "Oil pressure light indicates potential engine damage. Stop driving immediately and check oil.",
//     },
//     {
//       category: "Vehicle Maintenance",
//       question: "How often should you replace windshield wipers?",
//       options: ["Every month", "Every 6-12 months", "Every 5 years", "Only when they break"],
//       correct: 1,
//       explanation: "Replace windshield wipers every 6-12 months or when they start streaking or chattering.",
//     },
//     {
//       category: "Vehicle Maintenance",
//       question: "What should you do if your temperature gauge shows overheating?",
//       options: ["Keep driving", "Stop immediately", "Turn on air conditioning", "Add water while engine runs"],
//       correct: 1,
//       explanation: "Stop immediately if temperature gauge shows overheating to prevent engine damage.",
//     },
//     {
//       category: "Vehicle Maintenance",
//       question: "When should you replace your vehicle's air filter?",
//       options: ["Never", "Every 12,000-15,000 miles", "Every oil change", "Only if it looks dirty"],
//       correct: 1,
//       explanation: "Replace air filter every 12,000-15,000 miles or according to manufacturer recommendations.",
//     },

//     // Pedestrian Safety Questions (15 questions)
//     {
//       category: "Pedestrian Safety",
//       question: "When must you yield to pedestrians?",
//       options: ["Never", "Only at crosswalks", "At crosswalks and when turning", "Only when they have walk signal"],
//       correct: 2,
//       explanation: "You must yield to pedestrians at crosswalks and when making turns across their path.",
//     },
//     {
//       category: "Pedestrian Safety",
//       question: "What should you do when you see a pedestrian with a white cane?",
//       options: ["Honk to warn them", "Give them extra space and time", "Drive around quickly", "Flash your lights"],
//       correct: 1,
//       explanation: "A white cane indicates a visually impaired person. Give them extra space and time to cross.",
//     },
//     {
//       category: "Pedestrian Safety",
//       question: "When approaching a school bus with flashing red lights, you should:",
//       options: ["Slow down", "Stop at least 20 feet away", "Pass carefully", "Honk your horn"],
//       correct: 1,
//       explanation: "Stop at least 20 feet away from a school bus with flashing red lights - children may be crossing.",
//     },
//     {
//       category: "Pedestrian Safety",
//       question: "In a school zone, you should:",
//       options: [
//         "Drive the posted speed limit",
//         "Reduce speed and watch for children",
//         "Honk frequently",
//         "Drive faster to get through quickly",
//       ],
//       correct: 1,
//       explanation: "Reduce speed and be extra alert for children in school zones, especially during school hours.",
//     },
//     {
//       category: "Pedestrian Safety",
//       question: "What should you do if you see children playing near the road?",
//       options: [
//         "Honk to warn them",
//         "Slow down and be prepared to stop",
//         "Speed up to pass quickly",
//         "Flash your lights",
//       ],
//       correct: 1,
//       explanation: "Slow down and be prepared to stop when children are near the road as they may run into traffic.",
//     },
//   ]

//   // Shuffle the question bank and take 250 questions
//   const shuffledQuestions = [...questionBank].sort(() => Math.random() - 0.5)

//   // If we need more questions, duplicate and modify some
//   const questions = []
//   for (let i = 0; i < 250; i++) {
//     const baseQuestion = shuffledQuestions[i % shuffledQuestions.length]
//     const questionNumber = i + 1

//     questions.push({
//       id: questionNumber,
//       questionText: baseQuestion.question,
//       category: baseQuestion.category,
//       options: baseQuestion.options.map((option, index) => ({
//         id: String.fromCharCode(65 + index), // A, B, C, D
//         text: option,
//       })),
//       correctAnswer: String.fromCharCode(65 + baseQuestion.correct), // Convert 0,1,2,3 to A,B,C,D
//       explanation: baseQuestion.explanation,
//     })
//   }

//   return questions
// }

// const ALL_QUESTIONS = generateQuestions()

// // Function to get random 25 questions without repeats
// const getRandomQuestions = () => {
//   // Get used questions from localStorage
//   const usedQuestions = JSON.parse(localStorage.getItem("usedQuestions") || "[]")

//   // Get available questions (not used yet)
//   const availableQuestions = ALL_QUESTIONS.filter((q) => !usedQuestions.includes(q.id))

//   // If less than 25 available, reset the used questions
//   if (availableQuestions.length < 25) {
//     localStorage.setItem("usedQuestions", "[]")
//     return getRandomQuestions() // Recursive call with reset
//   }

//   // Shuffle and get 25 random questions
//   const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5)
//   const selectedQuestions = shuffled.slice(0, 25)

//   // Update used questions
//   const newUsedQuestions = [...usedQuestions, ...selectedQuestions.map((q) => q.id)]
//   localStorage.setItem("usedQuestions", JSON.stringify(newUsedQuestions))

//   return selectedQuestions
// }

// export default function QuizPage() {
//   const [quizQuestions, setQuizQuestions] = useState([])
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState(null)
//   const [showFeedback, setShowFeedback] = useState(false)
//   const [score, setScore] = useState(0)
//   const [timeLeft, setTimeLeft] = useState(30)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [answers, setAnswers] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   // Initialize quiz with random questions
//   useEffect(() => {
//     const randomQuestions = getRandomQuestions()
//     setQuizQuestions(randomQuestions)
//     setIsLoading(false)
//   }, [])

//   const question = quizQuestions[currentQuestion]
//   const progress = quizQuestions.length > 0 ? ((currentQuestion + 1) / quizQuestions.length) * 100 : 0

//   // Timer countdown
//   useEffect(() => {
//     if (timeLeft > 0 && !showFeedback && !isLoading) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
//       return () => clearTimeout(timer)
//     } else if (timeLeft === 0 && !showFeedback && !isLoading) {
//       handleSubmitAnswer()
//     }
//   }, [timeLeft, showFeedback, isLoading])

//   // Reset timer for new question
//   useEffect(() => {
//     if (!isLoading) {
//       setTimeLeft(30)
//       setSelectedAnswer(null)
//       setShowFeedback(false)
//     }
//   }, [currentQuestion, isLoading])

//   const handleAnswerSelect = (answerId) => {
//     if (!showFeedback) {
//       setSelectedAnswer(answerId)
//     }
//   }

//   const handleSubmitAnswer = () => {
//     if (!selectedAnswer && timeLeft > 0) return

//     const newAnswers = [...answers, selectedAnswer || ""]
//     setAnswers(newAnswers)

//     if (selectedAnswer === question.correctAnswer) {
//       setScore(score + 1)
//     }

//     setShowFeedback(true)

//     // Stop speech when answer is submitted
//     if (typeof window !== "undefined" && "speechSynthesis" in window) {
//       speechSynthesis.cancel()
//       setIsPlaying(false)
//     }
//   }

//   const handleNextQuestion = () => {
//     if (currentQuestion < quizQuestions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//     } else {
//       // Quiz completed, save results and go to results page
//       const quizResults = {
//         score,
//         total: quizQuestions.length,
//         answers,
//         questions: quizQuestions,
//         date: new Date().toISOString(),
//         timeSpent: (quizQuestions.length * 30 - timeLeft) / 60, // approximate time in minutes
//       }

//       // Save to practice history
//       const history = JSON.parse(localStorage.getItem("practiceHistory") || "[]")
//       history.unshift(quizResults)
//       localStorage.setItem("practiceHistory", JSON.stringify(history.slice(0, 50))) // Keep last 50 attempts

//       router.push(/results?score=${score}&total=${quizQuestions.length})
//     }
//   }

//   const getOptionStyle = (optionId) => {
//     if (!showFeedback) {
//       return selectedAnswer === optionId ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
//     }

//     if (optionId === question.correctAnswer) {
//       return "border-green-500 bg-green-50"
//     }

//     if (optionId === selectedAnswer && optionId !== question.correctAnswer) {
//       return "border-red-500 bg-red-50"
//     }

//     return "border-gray-200"
//   }

//   if (isLoading || !question) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Preparing your personalized quiz...</p>
//           <p className="text-sm text-gray-500 mt-2">Selecting 25 random questions from 250 available</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-semibold">VID Oral Exam Practice</h1>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-sm text-gray-600">
//                 <Clock className="h-4 w-4 mr-1" />
//                 {timeLeft}s
//               </div>
//               <div className="text-sm text-gray-600">
//                 Question {currentQuestion + 1} of {quizQuestions.length}
//               </div>
//               <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{question.category}</div>
//             </div>
//           </div>
//           <Progress value={progress} className="mt-2" />
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <span>Question {currentQuestion + 1}</span>
//               <div className="text-sm text-green-600 font-medium">🤖 AI Text-to-Speech Enabled</div>
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Text-to-Speech Player */}
//             <TextToSpeechPlayer
//               text={question.questionText}
//               questionNumber={currentQuestion + 1}
//               category={question.category}
//               onPlayStateChange={setIsPlaying}
//             />
          

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-lg font-medium text-gray-900">{question.questionText}</h3>
//             </div>

//             {/* Answer Options */}
//             <div className="space-y-3">
//               {question.options.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={() => handleAnswerSelect(option.id)}
//                   disabled={showFeedback}
//                   className={w-full p-4 text-left border-2 rounded-lg transition-colors ${getOptionStyle(option.id)}}
//                 >
//                   <div className="flex items-center">
//                     <span className="font-semibold mr-3 text-lg">{option.id}.</span>
//                     <span>{option.text}</span>
//                     {showFeedback && option.id === question.correctAnswer && (
//                       <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
//                     )}
//                     {showFeedback && option.id === selectedAnswer && option.id !== question.correctAnswer && (
//                       <XCircle className="h-5 w-5 text-red-600 ml-auto" />
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {/* Feedback */}
//             {showFeedback && (
//               <div
//                 className={p-4 rounded-lg ${selectedAnswer === question.correctAnswer ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}}
//               >
//                 <div className="flex items-center mb-2">
//                   {selectedAnswer === question.correctAnswer ? (
//                     <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
//                   ) : (
//                     <XCircle className="h-5 w-5 text-red-600 mr-2" />
//                   )}
//                   <span className="font-semibold">
//                     {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
//                   </span>
//                 </div>
//                 <p className="text-gray-700">{question.explanation}</p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-between">
//               <div className="text-sm text-gray-600">
//                 Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)} | Questions Remaining:{" "}
//                 {250 - JSON.parse(localStorage.getItem("usedQuestions") || "[]").length}
//               </div>

//               <div className="space-x-3">
//                 {!showFeedback ? (
//                   <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="flex items-center">
//                     Submit Answer
//                   </Button>
//                 ) : (
//                   <Button onClick={handleNextQuestion} className="flex items-center">
//                     {currentQuestion < quizQuestions.length - 1 ? (
//                       <>
//                         Next Question
//                         <ArrowRight className="h-4 w-4 ml-1" />
//                       </>
//                     ) : (
//                       "View Results"
//                     )}
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }