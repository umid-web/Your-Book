import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Crown,
  BookOpen,
  Download,
  ShieldCheck,
  Zap,
  Check,
  Gift,
  Star
} from 'lucide-react';
import './PremiumSettingsComp.scss';

const PremiumSettingsComp = () => {
  const navigate = useNavigate();

  const subscriptionPlans = [
    { months: 3, price: 100000, discount: null, popular: false },
    { months: 6, price: 180000, discount: '10%', popular: false },
    { months: 9, price: 260000, discount: '15%', popular: true },
    { months: 12, price: 340000, discount: '20%', popular: false },
  ];

  const benefits = [
    { icon: BookOpen, title: 'Cheksiz Kutoblar', desc: 'Barcha pullik kitoblar bepul' },
    { icon: Download, title: "Offline Rejim", desc: 'Mutolaani yuklab olish' },
    { icon: ShieldCheck, title: 'Reklamasiz', desc: '100% toza interfeys' },
    { icon: Zap, title: 'Multiplikator', desc: 'Mukofotlar uchun 2.5x bonus' },
  ];

  return (
    <div className="premium-settings-v2">
      {/* Persuasive Header */}
      <div className="ps-onboarding-header">
        <button onClick={() => navigate('/profile')} className="ps-back-circle">
          <ArrowLeft size={20} />
        </button>
        <div className="ps-crown-glow">
          <Crown size={48} className="crown-icon" />
        </div>
        <h1 className="ps-promo-title">YouBook Premium</h1>
        <p className="ps-promo-subtitle">Bilim olamiga cheksiz kirish va tilla mukofotlar kutmoqda</p>
      </div>

      {/* Pricing Grid */}
      <section className="ps-pricing-section">
        <h2 className="ps-section-label">Tarifni tanlang</h2>
        <div className="ps-pricing-grid">
          {subscriptionPlans.map((plan, i) => (
            <div key={i} className={`ps-plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">TAVSIYA</div>}
              {plan.discount && <div className="discount-pill">-{plan.discount}</div>}
              
              <div className="plan-header">
                <span className="duration">{plan.months} Oylik</span>
              </div>
              
              <div className="plan-price">
                <span className="amount">{(plan.price / 1000)}k</span>
                <span className="unit">YBC</span>
              </div>

              <div className="plan-meta">
                ≈ {(plan.price).toLocaleString()} so'm
              </div>

              <button className="plan-select-btn">
                Sotib olish
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="ps-features-section">
        <h2 className="ps-section-label">Premium afzalliklari</h2>
        <div className="ps-features-list">
          {benefits.map((b, i) => (
            <div key={i} className="ps-feature-item">
              <div className="ps-feature-icon">
                <b.icon size={20} />
              </div>
              <div className="ps-feature-text">
                <h4 className="feat-title">{b.title}</h4>
                <p className="feat-desc">{b.desc}</p>
              </div>
              <Check size={18} className="check-icon" />
            </div>
          ))}
        </div>
      </section>

      {/* Retention / Info Section */}
      <div className="ps-info-footer">
        <div className="footer-card">
          <Gift size={24} className="gift-icon" />
          <div className="text-content">
            <p><strong>LTV Bonus:</strong> Platformada qancha uzoq bo'lsangiz, shuncha ko'p tilla mukofot olasiz!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSettingsComp;

