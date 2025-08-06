# 🚗 Driving License Quiz Application

A comprehensive web application for driving license test preparation with voice support, progress tracking, and interactive quizzes.

## ✨ Features

- 🔊 **Voice Support**: Questions can be read aloud with adjustable volume
- 📊 **Progress Tracking**: Track your performance and quiz history
- 🎯 **Targeted Practice**: Practice specific categories (road signs, traffic rules, etc.)
- ⏱️ **Timed Tests**: Simulate real exam conditions
- 👤 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful, intuitive interface

## 🏗️ Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **CSS3** - Styling with gradients and animations
- **Web Speech API** - Text-to-speech functionality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mejuryrachy784/driving-license-quiz.git
   cd driving-license-quiz
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp backend/.env.example backend/.env
   ```
   
   Then edit `backend/.env` with your actual values:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_SECRET=your_admin_secret
   ```

4. **Seed the database with questions**
   ```bash
   cd backend
   node seedFromAbout.js
   ```

5. **Create test users (optional)**
   ```bash
   node createTestUser.js
   ```

6. **Start the application**
   
   **Option 1: Start both servers separately**
   ```bash
   # Terminal 1 - Start backend
   cd backend
   npm start
   
   # Terminal 2 - Start frontend
   npm run dev
   ```
   
   **Option 2: Use the provided scripts**
   ```bash
   # Start backend
   npm run start:backend
   
   # Start frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5001

## 📚 Usage

### Test Credentials
After running the test user creation script, you can use:
- **Regular User**: `demo@example.com` / `demo123`
- **Admin User**: `admin@example.com` / `admin123`

### Available Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - User dashboard
- `/quiz` - Main quiz (25 questions)
- `/about` - About page with sample quiz (10 questions)
- `/history` - Quiz history and statistics
- `/service` - Service information

### Voice Features
- **Auto-speak**: Questions automatically read when displayed
- **Volume Control**: Adjustable speech volume (0-100%)
- **Multiple Speech Modes**:
  - 🔊 Normal speech
  - 📢 Super loud mode
  - 🎯 Read all (question + options)

## 🗂️ Project Structure

```
driving-license-quiz/
├── backend/                 # Backend server
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── .env.example       # Environment variables template
│   └── server.js          # Server entry point
├── src/                   # Frontend source
│   ├── assets/
│   │   ├── pages/         # React components/pages
│   │   └── Component/     # Reusable components
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── public/               # Static assets
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🎯 Question Categories

The application includes 250+ questions across 8 categories:

1. **Road Signs** (50 questions) - Traffic signs and their meanings
2. **Traffic Rules** (50 questions) - Traffic laws and regulations
3. **Speed Limits** (30 questions) - Speed limits in different zones
4. **Safety Rules** (40 questions) - Safe driving practices
5. **Parking Regulations** (20 questions) - Parking rules and restrictions
6. **Emergency Procedures** (15 questions) - Handling emergency situations
7. **Weather Conditions** (15 questions) - Driving in different weather
8. **Vehicle Maintenance** (10 questions) - Basic vehicle maintenance

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset
- `GET /api/auth/profile` - Get user profile

### Quiz
- `GET /api/quiz/questions/public` - Get quiz questions (no auth)
- `POST /api/quiz/submit/public` - Submit quiz (no auth)
- `GET /api/quiz/questions` - Get quiz questions (authenticated)
- `POST /api/quiz/submit` - Submit quiz (authenticated)
- `GET /api/quiz/stats` - Get user statistics
- `GET /api/quiz/history` - Get quiz history

## 🛠️ Development

### Running in Development Mode
```bash
# Frontend with hot reload
npm run dev

# Backend with nodemon
cd backend
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory with:
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_secret
```

### Database Seeding
```bash
cd backend
node seedFromAbout.js  # Seed questions
node createTestUser.js # Create test users
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the `backend` folder
3. Ensure MongoDB Atlas is accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mejury Rachy**
- GitHub: [@mejuryrachy784](https://github.com/mejuryrachy784)
- Email: mejuryrachy784@gmail.com

## 🙏 Acknowledgments

- Thanks to all contributors who helped improve this project
- Inspired by the need for better driving test preparation tools
- Built with modern web technologies for optimal user experience

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/mejuryrachy784/driving-license-quiz/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the problem

---

**Happy Learning! 🚗💨**