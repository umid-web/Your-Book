import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.scss';

const ForgotPassword = () => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phone) {
            setError('Telefon raqamini kiriting');
            return;
        }

        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('/auth/forgot-password/', {
                phone_number: phone
            });

            if (response.data.status) {
                setMessage(response.data.message);
                setTimeout(() => {
                    navigate('/verify-otp', {
                        state: {
                            phone_number: phone,
                            type: 'password_reset'
                        }
                    });
                }, 1500);
            } else {
                setError(response.data.error || 'SMS yuborishda xatolik yuz berdi');
            }

        } catch (err) {
            console.error('Password reset initiation error:', err);

            const backendError = err.response?.data?.error ||
                err.response?.data?.detail ||
                'Bunday telefon raqami ro\'yxatdan o\'tmagan';
            setError(backendError);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <div className="forgot-password-header">
                    <h2>Parolni tiklash</h2>
                    <p>Hisobingizga tegishli telefon raqamingizni kiriting</p>
                </div>

                <form onSubmit={handleSubmit} className="forgot-password-form">
                    {error && <div className="error-alert">{error}</div>}
                    {message && <div className="success-alert">{message}</div>}

                    <div className="form-group">
                        <label htmlFor="phone">Telefon raqami</label>
                        <div className="input-wrapper">
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+998 90 123 45 67"
                                disabled={isLoading}
                                className={error ? 'error-input' : ''}
                            />
                            <div className="input-icon">📱</div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Yuborilmoqda...' : 'Kodni yuborish'}
                    </button>

                    <div className="back-to-login">
                        <Link to="/login">Login sahifasiga qaytish</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;