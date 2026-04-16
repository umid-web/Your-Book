import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import './LandingComp.scss';

const LandingComp = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const pricingPlans = [
        {
            title: '3 Oylik',
            price: '100,000',
            features: ['Barcha kitoblar', 'Asosiy testlar', 'Statistika', 'Reklamasiz interfeys'],
            recommended: false
        },
        {
            title: '6 Oylik',
            price: '180,000',
            features: ['Barcha kitoblar', 'Premium testlar', '1.5x Tilla bonus', 'Maxsus sovg\'alar'],
            recommended: true
        },
        {
            title: '12 Oylik',
            price: '340,000',
            features: ['Barcha kitoblar', 'Cheksiz testlar', '2.5x Tilla bonus', 'VIP podderjka', 'Offline mutolaa'],
            recommended: false
        }
    ];

    return (
        <div className="landing-comp">
            <motion.section 
                className="hero-section"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="hero-content">
                    <motion.h1 variants={itemVariants} className="hero-title">
                        Bilimingizni <span>Oltin</span>ga Aylantiring
                    </motion.h1>
                    <motion.p variants={itemVariants} className="hero-subtitle">
                        VoyKe - Bu bilim olish, kitob o'qish va daromad qilishning eng zamonaviy platformasi. 
                        O'qing, test topshiring va haqiqiy oltin grammlari bilan taqdirlaning!
                    </motion.p>
                    <motion.div variants={itemVariants} className="hero-cta">
                        <button className="btn-primary" onClick={() => navigate('/register')}>
                            Boshlash <ArrowRight size={20} />
                        </button>
                        <button className="btn-secondary" onClick={() => {
                            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Tariflar bilan tanishish
                        </button>
                    </motion.div>
                </div>
                <motion.div 
                    variants={itemVariants} 
                    className="hero-image"
                    animate={{ 
                        y: [0, -20, 0],
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                >
                    <div className="gold-card-mockup">
                        <div className="card-top">
                            <Zap color="#FFD700" fill="#FFD700" />
                            <span>Premium Access</span>
                        </div>
                        <div className="card-balance">
                            <p>Balans</p>
                            <h2>12.50 VKC</h2>
                        </div>
                        <div className="card-gold">
                            <p>Oltin</p>
                            <h3>0.5 gramm</h3>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            <section className="features-section">
                <div className="section-header">
                    <h2>Nega aynan VoyKe?</h2>
                    <p>Biz ta'lim va moliyani birlashtirdi</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-wrapper"><Rocket /></div>
                        <h3>Tezkor O'sish</h3>
                        <p>Har bir o'qilgan kitob sizning IQ va balansingizni oshiradi.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper"><Shield /></div>
                        <h3>Xavfsiz Tizim</h3>
                        <p>Sizning ma'lumotlaringiz va yig'gan mablag'ingiz to'liq himoyalangan.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper"><Zap /></div>
                        <h3>Aqlli Monitoring</h3>
                        <p>AI tizimi orqali kitob o'qish jarayoningiz nazorat qilinadi.</p>
                    </div>
                </div>
            </section>

            <section className="pricing-section" id="pricing">
                <div className="section-header">
                    <h2>Obuna Tariflari</h2>
                    <p>O'zingizga mos bo'lgan tarifni tanlang</p>
                </div>
                <div className="pricing-grid">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
                            {plan.recommended && <div className="recommended-badge">Tavsiya etiladi</div>}
                            <h3>{plan.title}</h3>
                            <div className="price">
                                <span>UZS</span> {plan.price}
                            </div>
                            <ul className="features-list">
                                {plan.features.map((feature, i) => (
                                    <li key={i}><CheckCircle size={16} color="#FFD700" /> {feature}</li>
                                ))}
                            </ul>
                            <button className={`btn-${plan.recommended ? 'primary' : 'outline'}`} onClick={() => navigate('/register')}>
                                Tanlash
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-logo">Voy<span>Ke</span></div>
                    <p>© 2026 VoyKe. Barcha huquqlar himoyalangan.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingComp;
