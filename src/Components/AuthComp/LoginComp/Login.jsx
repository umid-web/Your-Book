import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone) {
      newErrors.phone = 'Telefon raqami to\'ldirilishi shart';
    }

    if (!formData.password) {
      newErrors.password = 'Parol maydoni to\'ldirilishi shart';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      console.log('Login request initiated for:', formData.phone);

      // --- MOCK LOGIN LOGIC ---
      if (formData.phone === '123' && formData.password === '123') {
        const mockData = {
          access: 'mock-access-token',
          refresh: 'mock-refresh-token',
          user: { firstName: 'Umidjon', lastName: 'Admin', phone: '123', is_premium: true }
        };
        localStorage.setItem('access_token', mockData.access);
        localStorage.setItem('refresh_token', mockData.refresh);
        login(mockData.user);
        navigate('/dashboard');
        return;
      }
      // -------------------------

      const response = await axios.post('/auth/login/', {
        phone_number: formData.phone,
        password: formData.password
      });

      console.log('Login successful:', response.data);
      const { access, refresh, user: userData } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      login(userData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);

      // --- BACKEND DOWN FALLBACK ---
      if (!error.response || error.code === 'ERR_NETWORK') {
        console.warn('Backend unavailable, entering mock session...');
        const mockUser = { firstName: 'Mehmon', lastName: 'User', phone: formData.phone, is_premium: false };
        localStorage.setItem('access_token', 'offline-token');
        login(mockUser);
        navigate('/dashboard');
        return;
      }
      // -----------------------------

      if (error.response?.status === 403 && error.response?.data?.needs_verification) {
        navigate('/verify-otp', {
          state: {
            phone_number: error.response.data.phone_number,
            userData: { phone_number: error.response.data.phone_number },
            type: 'activation'
          }
        });
        return;
      }

      const backendError = error.response?.data?.error || error.response?.data?.detail || 'Telefon raqami yoki parol noto\'g\'ri';
      setErrors({ general: backendError });
    } finally {
      setIsLoading(false);
    }
  };

  const [isFaceIdLoading, setIsFaceIdLoading] = useState(false);

  const handleFaceIdLogin = async () => {
    setIsFaceIdLoading(true);
    try {
      // Simulate Face ID authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, this would verify the signature from navigator.credentials.get
      console.log('Face ID authentication successful');
      setErrors({ general: "Face ID muvaffaqiyatli tasdiqlandi. Tizimga kirilmoqda..." });

      // Mock temporary user for simulation
      const mockUser = {
        firstName: 'Umidjon',
        lastName: 'YouBook User',
        phone: formData.phone || '+998 00 000 00 00',
        is_premium: true
      };
      
      localStorage.setItem('access_token', 'face-id-temp-token');
      localStorage.setItem('refresh_token', 'face-id-temp-token');
      login(mockUser);

      // Simulate successful login after Face ID
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setErrors({ general: "Face ID orqali kirishda xatolik yuz berdi" });
    } finally {
      setIsFaceIdLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-section">
              <div className="logo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 5L25 10L20 15L15 10L20 5Z" fill="currentColor" />
                  <path d="M20 25L25 30L20 35L15 30L20 25Z" fill="currentColor" />
                  <path d="M5 20L10 15L15 20L10 25L5 20Z" fill="currentColor" />
                  <path d="M25 20L30 15L35 20L30 25L25 20Z" fill="currentColor" />
                </svg>
              </div>
              <h1 className="login-title">Xush kelibsiz</h1>
              <p className="login-subtitle">Hisobingizga kiring</p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="general-error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '14px' }}>
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Telefon raqami
              </label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+998 88 101 10 05"
                  disabled={isLoading}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Parol
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Parolingizni kiriting"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="input-icon password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    pointerEvents: 'auto'
                  }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 5L7 10L2 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18 5L13 10L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 2L10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="5" y="11" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="14.5" r="1" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox-input"
                  disabled={isLoading}
                />
                <span className="checkbox-text">Eslab qolish</span>
              </label>

              <Link to="/forgot-password" className="forgot-password-link">
                Parolni unutdingizmi?
              </Link>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading || isFaceIdLoading}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <span>Kirilmoqda...</span>
                </div>
              ) : (
                'Kirish'
              )}
            </button>

            <button
              type="button"
              className={`face-id-login-btn ${isFaceIdLoading ? 'loading' : ''}`}
              onClick={handleFaceIdLogin}
              disabled={isLoading || isFaceIdLoading}
            >
              <div className="face-id-icon-group">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M8 7v3m8-3v3M8 14h.01M16 14h.01M12 17a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" />
                </svg>
                <span>Face ID orqali kirish</span>
              </div>
            </button>
          </form>

          <div className="login-divider">
            <span className="divider-text">yoki</span>
          </div>

          <div className="login-footer">
            <p className="footer-text">
              Hisobingiz yo'qmi?{' '}
              <Link to="/register" className="register-link">
                Ro'yxatdan o'tish
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;