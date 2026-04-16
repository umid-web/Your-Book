import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.scss'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    useFaceId: false,
  })

  const [isFaceIdSettingUp, setIsFaceIdSettingUp] = useState(false)
  const [faceIdReady, setFaceIdReady] = useState(false)

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    setPasswordStrength(strength)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ism maydoni to'ldirilishi shart"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Familiya maydoni to'ldirilishi shart"
    }

    if (!formData.phone) {
      newErrors.phone = "Telefon raqami to'ldirilishi shart"
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Telefon raqami noto'g'ri formatda"
    }

    if (!formData.email) {
      newErrors.email = "Email maydoni to'ldirilishi shart"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email noto'g'ri formatda"
    }

    if (!formData.password) {
      newErrors.password = "Parol maydoni to'ldirilishi shart"
    } else if (formData.password.length < 8) {
      newErrors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak"
    } else if (passwordStrength < 3) {
      newErrors.password = 'Parol juda zaif. Kuchliroq parol tanlang.'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Parolni tasdiqlang'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parollar mos kelmadi'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        'Foydalanish shartlariga rozilik bildirishingiz kerak'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors({
        ...newErrors,
        form: "Iltimos, barcha maydonlarni to'g'ri to'ldiring."
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      console.log('🚀 Ro\'yxatdan o\'tish so\'rovi yuborilmoqda...', formData)
      const response = await axios.post('/auth/register/', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password,
        password_confirm: formData.confirmPassword,
      })

      if (response.status === 200 || response.status === 201) {
        console.log('✅ Ro\'yxatdan o\'tish muvaffaqiyatli!')
        const userData = response.data?.user || {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone
        }

        const tokens = response.data?.tokens || {
          access: 'temp_access',
          refresh: 'temp_refresh'
        }

        navigate('/verify-otp', {
          state: { userData, tokens }
        })
      }
    } catch (error) {
      console.error('❌ Xatolik yuz berdi:', error)

      const errorMessages = {}
      const globalMessages = []

      if (error.response && error.response.data) {
        const data = error.response.data
        console.log('📦 Backend xatolik ma\'lumotlari:', data)

        if (typeof data === 'object' && data !== null) {
          Object.keys(data).forEach(key => {
            const val = data[key]
            const msg = Array.isArray(val) ? val.join(' ') : (typeof val === 'object' ? JSON.stringify(val) : String(val))

            // Maydonlarga bog'lash
            const fieldMap = {
              email: 'email',
              phone: 'phone',
              phone_number: 'phone',
              password: 'password',
              password_confirm: 'confirmPassword',
              confirm_password: 'confirmPassword',
              first_name: 'firstName',
              last_name: 'lastName'
            }

            const localKey = fieldMap[key] || fieldMap[String(key).toLowerCase()]
            if (localKey) errorMessages[localKey] = msg

            // Global ro'yxatga qo'shish
            const labelMap = {
              email: 'Email',
              phone: 'Telefon',
              phone_number: 'Telefon',
              password: 'Parol',
              first_name: 'Ism',
              last_name: 'Familiya'
            }
            const label = labelMap[key] || key

            if (['detail', 'message', 'non_field_errors', 'error'].includes(String(key).toLowerCase())) {
              globalMessages.push(msg)
            } else {
              globalMessages.push(`• ${label}: ${msg}`)
            }
          })
        } else {
          globalMessages.push(String(data))
        }
      } else if (error.request) {
        globalMessages.push("Server bilan bog'lanishda xatolik yuz berdi. Internetni tekshiring.")
      } else {
        globalMessages.push("Kutilmagan xatolik: " + error.message)
      }

      errorMessages.form = globalMessages.join('\n') || "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      setErrors(errorMessages)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { text: 'Juda zaif', color: '#ef4444' }
      case 2:
        return { text: 'Zaif', color: '#f59e0b' }
      case 3:
        return { text: "O'rtacha", color: '#eab308' }
      case 4:
        return { text: 'Kuchli', color: '#22c55e' }
      case 5:
        return { text: 'Juda kuchli', color: '#10b981' }
      default:
        return { text: '', color: '#94a3b8' }
    }
  }

  const passwordStrengthInfo = getPasswordStrengthText()

  const [modalContent, setModalContent] = useState(null)

  const openPolicyModal = async (type) => {
    try {
      const response = await axios.get('/db.json')
      const data = response.data.policies[type]
      setModalContent(data)
    } catch (error) {
      console.error('Error fetching policy:', error)
      const fallbacks = {
        terms: {
          title: 'Foydalanish shartlari',
          content: 'Yuklashda xatolik yuz berdi...',
        },
        privacy: {
          title: 'Maxfiylik siyosati',
          content: 'Yuklashda xatolik yuz berdi...',
        },
      }
      setModalContent(fallbacks[type])
    }
  }

  const handleFaceIdSetup = async () => {
    setIsFaceIdSettingUp(true)
    
    // Simulate biometric setup
    try {
      if (window.PublicKeyCredential) {
        // This is where real WebAuthn would go
        // For now, we'll simulate the UX
        await new Promise(resolve => setTimeout(resolve, 1500))
        setFaceIdReady(true)
        setFormData(prev => ({ ...prev, useFaceId: true }))
      } else {
        alert("Sizning qurilmangiz biometrik kirishni qo'llab-quvvatlamaydi.")
      }
    } catch (err) {
      console.error("Face ID setup error:", err)
    } finally {
      setIsFaceIdSettingUp(false)
    }
  }

  return (
    <div className="register-container">
      {modalContent && (
        <div
          className="policy-modal-overlay"
          onClick={() => setModalContent(null)}
        >
          <div
            className="policy-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{modalContent.title}</h2>
              <button
                className="close-btn"
                onClick={() => setModalContent(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p style={{ whiteSpace: 'pre-wrap' }}>{modalContent.content}</p>
            </div>
            <div className="modal-footer">
              <button className="ok-btn" onClick={() => setModalContent(null)}>
                Tushunarli
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="register-background">
        <div className="register-card">
          <div className="register-header">
            <div className="logo-section">
              <div className="logo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 5L25 10L20 15L15 10L20 5Z" fill="currentColor" />
                  <path
                    d="M20 25L25 30L20 35L15 30L20 25Z"
                    fill="currentColor"
                  />
                  <path d="M5 20L10 15L15 20L10 25L5 20Z" fill="currentColor" />
                  <path
                    d="M25 20L30 15L35 20L30 25L25 20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="register-title">Ro'yxatdan o'tish</h1>
              <p className="register-subtitle">Yangi hisob yarating</p>
            </div>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {errors.form && (
              <ErrorMessage
                message={errors.form}
                variant="error"
                className="mb-4"
                dismissible
                onDismiss={() => setErrors(prev => ({ ...prev, form: '' }))}
              />
            )}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  Ism
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Ismingiz"
                    disabled={isLoading}
                  />
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M10 11C6.13401 11 3 14.134 3 18H17C17 14.134 13.866 11 10 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Familiya
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Familiyangiz"
                    disabled={isLoading}
                  />
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M10 11C6.13401 11 3 14.134 3 18H17C17 14.134 13.866 11 10 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Telefon raqam
              </label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+998 90 123 45 67"
                  disabled={isLoading}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 5C3 3.89543 3.89543 3 5 3H7C7.55228 3 8 3.44772 8 4V6C8 6.55228 7.55228 7 7 7H5C4.44772 7 4 7.44772 4 8V10C4 10.5523 4.44772 11 5 11H7C7.55228 11 8 10.5523 8 10V12C8 12.5523 7.55228 13 7 13H5C3.89543 13 3 12.1046 3 11V5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 5C12 3.89543 12.8954 3 14 3H16C17.1046 3 18 3.89543 18 5V11C18 12.1046 17.1046 13 16 13H14C12.8954 13 12 12.1046 12 11V10C12 10.5523 12.4477 11 13 11H15C15.5523 11 16 10.5523 16 10V8C16 7.44772 15.5523 7 15 7H13C12.4477 7 12 6.55228 12 6V4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email manzil
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 8L10 13L17 8V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5L10 11L3 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Parol
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Kamida 8 ta belgi"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="input-icon password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M2 5L7 10L2 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 5L13 10L18 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 2L10 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="5"
                        y="11"
                        width="10"
                        height="7"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="14.5" r="1" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
              {formData.password && (
                <div
                  className="password-strength"
                  style={{
                    '--strength-width': `${(passwordStrength / 5) * 100}%`,
                    '--strength-color': passwordStrengthInfo.color,
                  }}
                >
                  <div className="strength-bar">
                    <div className="strength-fill" />
                  </div>
                  <span className="strength-text">
                    {passwordStrengthInfo.text}
                  </span>
                </div>
              )}
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Parolni tasdiqlang
              </label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Parolni qayta kiriting"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="input-icon password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M2 5L7 10L2 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 5L13 10L18 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 2L10 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="5"
                        y="11"
                        width="10"
                        height="7"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="14.5" r="1" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-group face-id-section">
              <div className="face-id-card">
                <div className="face-id-info">
                  <div className="face-id-icon-wrapper">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M8 7v3m8-3v3M8 14h.01M16 14h.01M12 17a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" />
                    </svg>
                  </div>
                  <div className="face-id-text">
                    <span className="face-id-title">Face ID / Touch ID</span>
                    <p className="face-id-desc">Tez va xavfsiz kirish uchun biometriyadan foydalaning</p>
                  </div>
                </div>
                
                {faceIdReady ? (
                  <div className="face-id-status success">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="3" fill="none">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Tayyor</span>
                    <button 
                      type="button" 
                      className="face-id-remove"
                      onClick={() => {
                        setFaceIdReady(false)
                        setFormData(prev => ({ ...prev, useFaceId: false }))
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    className={`face-id-setup-btn ${isFaceIdSettingUp ? 'loading' : ''}`}
                    onClick={handleFaceIdSetup}
                    disabled={isFaceIdSettingUp || isLoading}
                  >
                    {isFaceIdSettingUp ? 'Sozlanmoqda...' : "O'rnatish"}
                  </button>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="checkbox-input"
                  disabled={isLoading}
                />
                <span className="checkbox-text">
                  Men{' '}
                  <span
                    className="policy-trigger"
                    onClick={() => openPolicyModal('terms')}
                  >
                    foydalanish shartlari
                  </span>{' '}
                  va{' '}
                  <span
                    className="policy-trigger"
                    onClick={() => openPolicyModal('privacy')}
                  >
                    maxfiylik siyosati
                  </span>{' '}
                  ga roziman
                </span>
              </label>
              {errors.agreeToTerms && (
                <span className="error-message">{errors.agreeToTerms}</span>
              )}
            </div>

            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      opacity="0.3"
                    />
                    <path
                      d="M10 2C10 2 10 6 10 10C10 14 10 18 10 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 10 10"
                        to="360 10 10"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                  <span>Ro'yxatdan o'tilmoqda...</span>
                </div>
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </button>
          </form>

          <div className="register-divider">
            <span className="divider-text">yoki</span>
          </div>

          <div className="register-footer">
            <p className="footer-text">
              Allaqachon hisobingiz bormi?{' '}
              <Link to="/login" className="login-link">
                Kirish
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
