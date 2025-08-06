# Choice Backend API

This is the backend server for the Choice driving license quiz application.

## 🚀 Quick Start

### Option 1: Using PowerShell Script (Recommended)
```powershell
.\start-backend.ps1
```

### Option 2: Using Batch File
```cmd
start-backend.bat
```

### Option 3: Manual Commands
```bash
npm install
npm start
```

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## 🔧 Environment Variables

Create a `.env` file in the backend directory with:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_secret
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Quiz
- `GET /api/quiz/questions/public` - Get quiz questions
- `POST /api/quiz/submit/public` - Submit quiz answers
- `GET /api/quiz/history` - Get quiz history

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Instructions
- `GET /api/instructions` - Get driving test instructions

### Results
- `GET /api/results` - Get quiz results
- `POST /api/results` - Save quiz results

## 🧪 Testing

Run the test script to verify all components:
```bash
node test-server.js
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── quizController.js    # Quiz logic
│   └── resultController.js  # Results logic
├── middleware/
│   └── auth.js              # JWT middleware
├── models/
│   ├── User.js              # User model
│   ├── Quiz.js              # Quiz model
│   └── QuizResult.js        # Quiz result model
├── routes/
│   ├── auth.js              # Auth routes
│   ├── quiz.js              # Quiz routes
│   ├── results.js           # Results routes
│   ├── dashboard.js         # Dashboard routes
│   ├── history.js           # History routes
│   └── instructions.js      # Instructions routes
├── .env                     # Environment variables
├── server.js                # Main server file
└── package.json             # Dependencies
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```
   Error: listen EADDRINUSE: address already in use :::5001
   ```
   Solution: Change the PORT in `.env` file or kill the process using port 5001

2. **MongoDB connection failed**
   ```
   Error: Failed to connect to MongoDB
   ```
   Solution: Check your MONGO_URI in `.env` file

3. **Missing dependencies**
   ```
   Error: Cannot find module 'express'
   ```
   Solution: Run `npm install`

### Debug Mode

Run with debug information:
```bash
DEBUG=* npm start
```

## 📊 Features

- ✅ User authentication with JWT
- ✅ Quiz management with 250+ questions
- ✅ Real-time quiz results
- ✅ Dashboard statistics
- ✅ Quiz history tracking
- ✅ Driving test instructions
- ✅ CORS enabled for frontend
- ✅ Error handling middleware
- ✅ MongoDB integration

## 🔒 Security

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation
- Error handling without exposing sensitive data

## 📈 Performance

- Database indexing for faster queries
- Efficient query optimization
- Caching strategies for static data
- Connection pooling with MongoDB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Run the test script: `node test-server.js`
3. Check server logs for detailed error messages
4. Ensure all environment variables are set correctly