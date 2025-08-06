// API Configuration for development and production

const getApiUrl = () => {
  // Check if we're in production (deployed on Vercel)
  if (import.meta.env.PROD) {
    // Production API URL - will be updated after backend deployment
    return import.meta.env.VITE_API_URL || 'https://driving-license-quiz-backend.vercel.app';
  }
  
  // Development API URL
  return 'http://localhost:5001';
};

export const API_BASE_URL = getApiUrl();
export const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;
export const QUIZ_BASE_URL = `${API_BASE_URL}/api/quiz`;

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${AUTH_BASE_URL}/login`,
  REGISTER: `${AUTH_BASE_URL}/register`,
  FORGOT_PASSWORD: `${AUTH_BASE_URL}/forgot-password`,
  PROFILE: `${AUTH_BASE_URL}/profile`,
  
  // Quiz endpoints
  QUIZ_QUESTIONS: `${QUIZ_BASE_URL}/questions`,
  QUIZ_QUESTIONS_PUBLIC: `${QUIZ_BASE_URL}/questions/public`,
  QUIZ_QUESTIONS_ABOUT: `${QUIZ_BASE_URL}/questions/about`,
  QUIZ_SUBMIT: `${QUIZ_BASE_URL}/submit`,
  QUIZ_SUBMIT_PUBLIC: `${QUIZ_BASE_URL}/submit/public`,
  QUIZ_STATS: `${QUIZ_BASE_URL}/stats`,
  QUIZ_HISTORY: `${QUIZ_BASE_URL}/history`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/`,
};

console.log('🔧 API Configuration:', {
  environment: import.meta.env.PROD ? 'production' : 'development',
  apiBaseUrl: API_BASE_URL,
  endpoints: Object.keys(API_ENDPOINTS).length
});