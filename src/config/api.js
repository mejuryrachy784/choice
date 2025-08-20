// // API Configuration for development and production

// const getApiUrl = () => {
//   // Check if we're in production (deployed on Vercel)
//   if (import.meta.env.PROD) {
//     // Production API URL - will be updated after backend deployment
//     return import.meta.env.VITE_API_URL || 'https://driving-license-quiz-backend.vercel.app';
//   }
  
//   // Development API URL
//   return 'https://choice-gneg.onrender.com';
// };

// export const API_BASE_URL = getApiUrl();
// export const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;
// export const QUIZ_BASE_URL = `${API_BASE_URL}/api/quiz`;

// // API endpoints
// export const API_ENDPOINTS = {
//   // Auth endpoints
//   LOGIN: `${AUTH_BASE_URL}/login`,
//   REGISTER: `${AUTH_BASE_URL}/register`,
//   FORGOT_PASSWORD: `${AUTH_BASE_URL}/forgot-password`,
//   PROFILE: `${AUTH_BASE_URL}/profile`,
  
//   // Quiz endpoints
//   QUIZ_QUESTIONS: `${QUIZ_BASE_URL}/questions`,
//   QUIZ_QUESTIONS_PUBLIC: `${QUIZ_BASE_URL}/questions/public`,
//   QUIZ_QUESTIONS_ABOUT: `${QUIZ_BASE_URL}/questions/about`,
//   QUIZ_SUBMIT: `${QUIZ_BASE_URL}/submit`,
//   QUIZ_SUBMIT_PUBLIC: `${QUIZ_BASE_URL}/submit/public`,
//   QUIZ_STATS: `${QUIZ_BASE_URL}/stats`,
//   QUIZ_HISTORY: `${QUIZ_BASE_URL}/history`,
  
//   // Health check
//   HEALTH: `${API_BASE_URL}/`,
// };

// console.log('🔧 API Configuration:', {
//   environment: import.meta.env.PROD ? 'production' : 'development',
//   apiBaseUrl: API_BASE_URL,
//   endpoints: Object.keys(API_ENDPOINTS).length
// });
// src/api.js

// API Configuration for development and production
const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://choice-gneg.onrender.com';
  }
  return 'https://choice-gneg.onrender.com'; 
};

export const API_BASE_URL = getApiUrl();
export const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;
export const QUIZ_BASE_URL = `${API_BASE_URL}/api/quiz`;

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: `${AUTH_BASE_URL}/login`,
  REGISTER: `${AUTH_BASE_URL}/register`,
  FORGOT_PASSWORD: `${AUTH_BASE_URL}/forgot-password`,
  PROFILE: `${AUTH_BASE_URL}/profile`,
  
  QUIZ_QUESTIONS: `${QUIZ_BASE_URL}/questions`,
  QUIZ_QUESTIONS_PUBLIC: `${QUIZ_BASE_URL}/questions/public`,
  QUIZ_QUESTIONS_ABOUT: `${QUIZ_BASE_URL}/questions/about`,
  QUIZ_SUBMIT: `${QUIZ_BASE_URL}/submit`,
  QUIZ_SUBMIT_PUBLIC: `${QUIZ_BASE_URL}/submit/public`,
  QUIZ_STATS: `${QUIZ_BASE_URL}/stats`,
  QUIZ_HISTORY: `${QUIZ_BASE_URL}/history`,
  
  HEALTH: `${API_BASE_URL}/`,
};

// Helper function for HTTP requests
const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'API request failed');
    }
    return await res.json();
  } catch (err) {
    console.error('❌ API Error:', err.message);
    throw err;
  }
};

// Auth API
export const authApi = {
  login: (email, password) =>
    request(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password) =>
    request(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  forgotPassword: (email) =>
    request(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  profile: (token) =>
    request(API_ENDPOINTS.PROFILE, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Quiz API
export const quizApi = {
  getQuestions: () => request(API_ENDPOINTS.QUIZ_QUESTIONS),
  getPublicQuestions: () => request(API_ENDPOINTS.QUIZ_QUESTIONS_PUBLIC),
  getAboutQuestions: () => request(API_ENDPOINTS.QUIZ_QUESTIONS_ABOUT),
  submitQuiz: (answers) =>
    request(API_ENDPOINTS.QUIZ_SUBMIT, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),
  submitQuizPublic: (answers) =>
    request(API_ENDPOINTS.QUIZ_SUBMIT_PUBLIC, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),
  getStats: () => request(API_ENDPOINTS.QUIZ_STATS),
  getHistory: () => request(API_ENDPOINTS.QUIZ_HISTORY),
};

// Health check
export const healthCheck = () => request(API_ENDPOINTS.HEALTH);

console.log('🔧 API Configuration:', {
  environment: import.meta.env.PROD ? 'production' : 'development',
  apiBaseUrl: API_BASE_URL,
  endpoints: Object.keys(API_ENDPOINTS).length,
});
