import React, { useState, useEffect, useRef } from 'react';
import { 
    X, 
    Coins, 
    ShieldCheck, 
    ChevronRight, 
    CheckCircle2, 
    CreditCard, 
    Zap, 
    ArrowLeft,
    Lock,
    Plus,
    Smartphone,
    RefreshCw,
    Clock
} from 'lucide-react';
import './WalletFillModal.scss';

const WalletFillModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1); // 1: Amount, 2: Card Entry, 3: OTP, 4: Processing, 5: Success
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const otpRefs = useRef([]);
    
    const [newCard, setNewCard] = useState({
        number: '',
        holder: '',
        expiry: '',
        cvv: '',
        phone: '+998 '
    });

    const [cards, setCards] = useState([]);

    const amounts = [
        { id: 1, coins: 1500, price: '15,000', bonus: null, label: 'Starter', color: '#3b82f6' },
        { id: 2, coins: 5500, price: '50,000', bonus: '+10%', label: 'Popular', color: '#10b981', popular: true },
        { id: 3, coins: 12500, price: '100,000', bonus: '+25%', label: 'Diamond', color: '#f59e0b' },
        { id: 4, coins: 30000, price: '220,000', bonus: '+40%', label: 'Empire', color: '#8b5cf6' },
    ];

    useEffect(() => {
        let interval;
        if (step === 3 && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setSelectedAmount(null);
                setOtp(['', '', '', '', '', '']);
                setTimer(60);
            }, 300);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setStep(2);
    };

    const handleCardSubmit = (e) => {
        e.preventDefault();
        setStep(3); // Go to OTP
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value[value.length - 1];
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }

        if (newOtp.every(digit => digit !== '')) {
            setTimeout(() => {
                setStep(4);
                simulateProcessing();
            }, 500);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const simulateProcessing = () => {
        setTimeout(() => {
            setStep(5);
        }, 3000);
    };

    const handleCardInputChange = (e) => {
        let { name, value } = e.target;
        if (name === 'number') {
            value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
        } else if (name === 'expiry') {
            value = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
        } else if (name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 3);
        } else if (name === 'phone') {
            if (!value.startsWith('+998 ')) value = '+998 ';
            const numbers = value.replace(/[^\d]/g, '').slice(3);
            if (numbers.length <= 9) {
                let formatted = '+998 ';
                if (numbers.length > 0) formatted += numbers.slice(0, 2) + (numbers.length > 2 ? ' ' : '');
                if (numbers.length > 2) formatted += numbers.slice(2, 5) + (numbers.length > 5 ? ' ' : '');
                if (numbers.length > 5) formatted += numbers.slice(5, 7) + (numbers.length > 7 ? ' ' : '');
                if (numbers.length > 7) formatted += numbers.slice(7, 9);
                value = formatted;
            } else return;
        }
        setNewCard(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={`wallet-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="wallet-modal-window" onClick={e => e.stopPropagation()}>
                <div className="modal-top">
                    <div className="modal-branding">
                        <div className="branding-icon"><Coins size={20} /></div>
                        <span className="branding-text">YouBook Coin Market</span>
                    </div>
                    <button className="modal-close-trigger" onClick={onClose}><X size={20} /></button>
                </div>

                {step < 5 && (
                    <div className="modal-stepper">
                        {[1, 2, 3, 4].map(i => (
                            <React.Fragment key={i}>
                                <div className={`step-node ${step >= i ? 'active' : ''} ${step > i ? 'done' : ''}`}>
                                    {step > i ? <CheckCircle2 size={12} /> : i}
                                </div>
                                {i < 4 && <div className={`step-path ${step > i ? 'active' : ''}`} />}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                <div className="modal-body-wrapper">
                    {step === 1 && (
                        <div className="step-content animate-in">
                            <div className="content-intro">
                                <h1>Coins Balansini To'ldirish</h1>
                                <p>Sizga mos paketni tanlang va YouBook Empire imkoniyatlaridan foydalaning</p>
                            </div>
                            <div className="topup-grid">
                                {amounts.map(item => (
                                    <button key={item.id} className={`topup-card ${item.popular ? 'is-popular' : ''}`} onClick={() => handleAmountSelect(item)}>
                                        {item.popular && <div className="popular-ribbon">Eng Kop Tanlangan</div>}
                                        <div className="topup-card-header">
                                            <span className="package-label" style={{ color: item.color }}>{item.label}</span>
                                            {item.bonus && <span className="bonus-badge">{item.bonus} Bonus</span>}
                                        </div>
                                        <div className="topup-coins">
                                            <Coins size={24} color="#FFD700" />
                                            <span className="coin-count">{item.coins.toLocaleString()}</span>
                                            <span className="coin-suffix">Coins</span>
                                        </div>
                                        <div className="topup-price-action">
                                            <span className="price-text">{item.price} UZS</span>
                                            <div className="action-circle"><ChevronRight size={18} /></div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="modal-footer-info">
                                <div className="info-pill"><Zap size={14} /><span>Tezkor o'tkazma</span></div>
                                <div className="info-pill"><Lock size={14} /><span>Xavfsiz to'lov</span></div>
                                <div className="info-pill"><ShieldCheck size={14} /><span>Kafolatlangan</span></div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-content animate-in">
                            <div className="content-intro-flex">
                                <button className="back-arrow-btn" onClick={() => setStep(1)}><ArrowLeft size={18} /></button>
                                <div className="intro-text-center">
                                    <h1>Karta Ma'lumotlari</h1>
                                    <p>{selectedAmount?.price} UZS miqdoridagi to'lov uchun</p>
                                </div>
                            </div>
                            <form className="mini-card-form" onSubmit={handleCardSubmit}>
                                <div className="direct-card-section">
                                    <div className="form-group">
                                        <label>Karta raqami</label>
                                        <div className="input-with-icon">
                                            <CreditCard size={18} className="input-icon" />
                                            <input type="text" name="number" placeholder="0000 0000 0000 0000" value={newCard.number} onChange={handleCardInputChange} maxLength="19" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Ullangan telefon raqami</label>
                                        <div className="input-with-icon">
                                            <Smartphone size={18} className="input-icon" />
                                            <input type="text" name="phone" placeholder="+998 90 123 45 67" value={newCard.phone} onChange={handleCardInputChange} required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Muddati</label>
                                            <input type="text" name="expiry" placeholder="MM/YY" value={newCard.expiry} onChange={handleCardInputChange} maxLength="5" required />
                                        </div>
                                        <div className="form-group">
                                            <label>CVV/CVC</label>
                                            <input type="password" name="cvv" placeholder="•••" value={newCard.cvv} onChange={handleCardInputChange} maxLength="3" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Karta egasi</label>
                                        <input type="text" name="holder" placeholder="CARDHOLDER NAME" value={newCard.holder} onChange={handleCardInputChange} required />
                                    </div>
                                </div>
                                <div className="form-actions-extended">
                                    <button type="submit" className="btn-primary-pay">Davom Etish</button>
                                    <p className="security-guarantee"><Lock size={12} /> Ma'lumotlar bank serverida himoyalangan</p>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-content animate-in otp-step">
                            <div className="content-intro-flex">
                                <button className="back-arrow-btn" onClick={() => setStep(2)}><ArrowLeft size={18} /></button>
                                <div className="intro-text-center">
                                    <h1>Tasdiqlash Kodi</h1>
                                    <p>Sizning telefon raqamingizga SMS kod yuborildi</p>
                                </div>
                            </div>
                            
                            <div className="otp-container">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => otpRefs.current[index] = el}
                                        type="text"
                                        className="otp-input"
                                        value={digit}
                                        onChange={e => handleOtpChange(index, e.target.value)}
                                        onKeyDown={e => handleKeyDown(index, e)}
                                        maxLength={1}
                                    />
                                ))}
                            </div>

                            <div className="otp-footer">
                                {timer > 0 ? (
                                    <p className="otp-timer"><Clock size={14} /> Kodni <span>{timer}s</span> ichida kiritishingiz kerak</p>
                                ) : (
                                    <button className="resend-btn" onClick={() => { setTimer(60); setOtp(['','','','','','']); }}>
                                        <RefreshCw size={14} /> Kodni qayta yuborish
                                    </button>
                                )}
                            </div>

                            <div className="security-badge-mini">
                                <ShieldCheck size={16} color="#10b981" />
                                <span>3D Secure himoyasi faol</span>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-content processing-state animate-in">
                            <div className="lottie-simulation">
                                <div className="spinner-orbit"><div className="orbit-dot" /></div>
                                <div className="center-payment-icon"><CreditCard size={40} color="#3b82f6" /></div>
                            </div>
                            <div className="processing-status">
                                <h2>To'lov Tasdiqlanmoqda</h2>
                                <p>Xavfsiz tranzaksiya amalga oshirilmoqda, iltimos sahifani yopmang...</p>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="step-content success-state animate-in">
                            <div className="success-visual"><div className="success-check-pulse"><CheckCircle2 size={60} color="#10b981" /></div></div>
                            <div className="success-summary">
                                <h1>To'lov Muvaffaqiyatli!</h1>
                                <p><b>{selectedAmount?.coins.toLocaleString()} Coins</b> balansingizga qo'shildi.</p>
                                <div className="summary-card">
                                    <div className="summary-row"><span>Summa:</span> <span>{selectedAmount?.price} UZS</span></div>
                                    <div className="summary-row"><span>Status:</span> <span style={{color: '#10b981'}}>TASDIQLANDI</span></div>
                                </div>
                            </div>
                            <button className="done-action-btn" onClick={onClose}>Asosiy Sahifaga Qaytish</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletFillModal;
