# Copilot Instructions for Choice Driving License Quiz Application

## Big Picture Architecture
- **Frontend**: React (in `src/`), using React Router for navigation, custom CSS for styling, and Web Speech API for voice features.
- **Backend**: Node.js/Express (in `backend/`), MongoDB via Mongoose, JWT for authentication, bcrypt for password hashing.
- **Data Flow**: Frontend communicates with backend via REST API endpoints (see below). User authentication, quiz data, and history are managed server-side.
- **Service Boundaries**: Frontend and backend run as separate servers. Frontend on Vite (default port 5174), backend on Express (default port 5001).

## Developer Workflows
- **Install dependencies**:
  - Frontend: `npm install`
  - Backend: `cd backend && npm install`
- **Start servers**:
  - Backend: `cd backend && npm start` or use `start-backend.ps1` (PowerShell) or `start-backend.bat` (Batch)
  - Frontend: `npm run dev`
- **Seed database**: `cd backend && node seedFromAbout.js`
- **Create test users**: `cd backend && node createTestUser.js`
- **Run backend tests**: `cd backend && node test-server.js`
- **Debug backend**: `DEBUG=* npm start` (shows verbose logs)

## Project-Specific Conventions
- **Environment variables**: Backend requires `.env` file (see `.env.example`).
- **Frontend pages**: Located in `src/assets/pages/`, each page has a `.jsx` and `.css` file.
- **Reusable components**: In `src/assets/Component/`.
- **Backend structure**: Controllers, models, routes, and middleware are separated by concern.
- **Scripts**: PowerShell and Batch scripts provided for Windows users to simplify backend startup.
- **API endpoints**: All backend routes are prefixed with `/api/`.

## Integration Points & External Dependencies
- **MongoDB**: Connection string required in backend `.env`.
- **Web Speech API**: Used in frontend for voice features.
- **JWT**: Used for authentication; tokens stored client-side.
- **bcrypt**: Used for password hashing in backend.

## Cross-Component Communication
- **Frontend <-> Backend**: RESTful API calls (see below for key endpoints).
- **Quiz data**: Fetched from backend, submitted via POST requests.
- **User authentication**: Login/signup via `/api/auth/*` endpoints.

## Key Files & Directories
- `src/assets/pages/` — Main React pages
- `src/assets/Component/` — Reusable React components
- `backend/controllers/` — Express route controllers
- `backend/models/` — Mongoose models
- `backend/routes/` — API route definitions
- `backend/middleware/` — Custom Express middleware
- `backend/config/database.js` — MongoDB connection logic
- `backend/server.js` — Backend entry point

## Example API Endpoints
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/quiz/questions/public` — Get public quiz questions
- `POST /api/quiz/submit/public` — Submit public quiz answers
- `GET /api/quiz/history` — Get quiz history

## Patterns & Practices
- **Error handling**: Centralized in backend middleware.
- **CORS**: Enabled for frontend-backend communication.
- **Testing**: Use `test-server.js` for backend tests.
- **Database seeding**: Use provided scripts for initial data.

---

_If any section is unclear or missing, please provide feedback so this guide can be improved for future AI agents._
