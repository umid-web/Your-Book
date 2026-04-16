// App constants
export const APP_NAME = 'MebelUz';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  DASHBOARD: '/api/dashboard',
  ORDERS: '/api/orders',
  USERS: '/api/users',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?\d{10,15}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  UZBEK_PHONE: /^\+998\d{9}$/,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Tarmoq xatosi. Iltimos, internet aloqangizni tekshiring.',
  INVALID_CREDENTIALS: 'Email yoki parol noto\'g\'ri.',
  SESSION_EXPIRED: 'Sessiya muddati tugagan. Iltimos, qaytadan kirishingiz kerak.',
  GENERIC_ERROR: 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Muvaffaqiyatli kirdingiz!',
  REGISTER_SUCCESS: 'Ro\'yxatdan muvaffaqiyatli o\'tdingiz!',
  LOGOUT_SUCCESS: 'Muvaffaqiyatli chiqdingiz!',
};

// Theme colors
export const THEME_COLORS = {
  PRIMARY: '#6366f1',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: '768px',
  TABLET: '1024px',
  DESKTOP: '1200px',
};

// Animation durations
export const ANIMATIONS = {
  FAST: '0.2s',
  NORMAL: '0.3s',
  SLOW: '0.5s',
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'DD.MM.YYYY',
  INPUT: 'YYYY-MM-DD',
  TIME: 'HH:mm',
};
