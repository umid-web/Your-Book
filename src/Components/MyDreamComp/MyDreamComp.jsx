import React, { useState, useEffect } from 'react';
import { Home, Car, TrendingUp, DollarSign, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './MyDreamComp.scss';

const MyDreamComp = () => {
    const [selectedDream, setSelectedDream] = useState(null); // 'house' or 'car'
    const [progress, setProgress] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const dreams = [
        {
            id: 'house',
            title: 'Orzudagi Uy',
            icon: <Home size={48} />,
            cost: 500000000, // 500 mln sum
            description: 'Shinam va zamonaviy hovli yoki kvartira'
        },
        {
            id: 'car',
            title: 'Orzudagi Mashina',
            icon: <Car size={48} />,
            cost: 250000000, // 250 mln sum
            description: 'Premium klassdagi zamonaviy avtomobil'
        }
    ];

    useEffect(() => {
        // Load dream from localStorage
        const savedDream = localStorage.getItem('user_dream');
        const savedPaid = localStorage.getItem('dream_paid');
        if (savedDream) {
            setSelectedDream(savedDream);
            const cost = dreams.find(d => d.id === savedDream)?.cost || 0;
            setTotalCost(cost);
            const paid = parseFloat(savedPaid) || 0;
            setPaidAmount(paid);
            setProgress((paid / cost) * 100);
        }
    }, []);

    const handleSelectDream = (dreamId) => {
        const cost = dreams.find(d => d.id === dreamId).cost;
        setSelectedDream(dreamId);
        setTotalCost(cost);
        localStorage.setItem('user_dream', dreamId);
        localStorage.setItem('dream_paid', '0');
        setPaidAmount(0);
        setProgress(0);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (!selectedDream) {
        return (
            <div className="my-dream-comp">
                <motion.div 
                    className="dream-selection"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <h1>Mening Orzum</h1>
                    <p>Maqsadingizni tanlang va unga bilimingiz bilan erishing</p>
                    
                    <div className="dream-options">
                        {dreams.map(dream => (
                            <div 
                                key={dream.id} 
                                className="dream-card"
                                onClick={() => handleSelectDream(dream.id)}
                            >
                                <div className="dream-icon">{dream.icon}</div>
                                <h3>{dream.title}</h3>
                                <p>{dream.description}</p>
                                <div className="dream-price">Taxminan: {dream.cost.toLocaleString()} UZS</div>
                                <button className="select-btn">Tanlash</button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentDream = dreams.find(d => d.id === selectedDream);

    return (
        <div className="my-dream-comp">
            <motion.div 
                className="dream-progress-container"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="dream-header">
                    <button className="back-btn" onClick={() => setSelectedDream(null)}>O'zgartirish</button>
                    <h1>{currentDream.title}</h1>
                </div>

                <div className="progress-card-main">
                    <div className="main-icon-wrap">{currentDream.icon}</div>
                    
                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="label">Umumiy qiymat</span>
                            <span className="value">{totalCost.toLocaleString()} UZS</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">To'langan</span>
                            <span className="value accent">{paidAmount.toLocaleString()} UZS</span>
                        </div>
                    </div>

                    <div className="progress-section">
                        <div className="progress-info">
                            <span className="percentage">{progress.toFixed(1)}%</span>
                            <span className="remaining">Qolgan: {(totalCost - paidAmount).toLocaleString()} UZS</span>
                        </div>
                        <div className="custom-progress-bar">
                            <motion.div 
                                className="progress-fill" 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                            <div className="progress-mark" style={{ left: '50%' }}>50%</div>
                        </div>
                    </div>

                    <div className="dream-tips">
                        <div className="tip">
                            <TrendingUp size={20} />
                            <p>Testlarni muvaffaqiyatli topshirib, orzuingizga tezroq erishing.</p>
                        </div>
                        <div className="tip">
                            <CheckCircle size={20} />
                            <p>Har safar oltin grammlarini konvertatsiya qilganingizda, maqsadingizga mablag' qo'shiladi.</p>
                        </div>
                    </div>
                </div>

                <div className="recent-contributions">
                    <h3>Oxirgi to'lovlar</h3>
                    <div className="contributions-list">
                        <div className="contribution-item">
                            <div className="c-info">
                                <span className="c-date">Bugun, 09:45</span>
                                <span className="c-type">Oltin konvertatsiyasi</span>
                            </div>
                            <span className="c-amount">+1,200,000 UZS</span>
                        </div>
                        <div className="contribution-item">
                            <div className="c-info">
                                <span className="c-date">Kecha, 18:20</span>
                                <span className="c-type">Premium bonus</span>
                            </div>
                            <span className="c-amount">+500,000 UZS</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MyDreamComp;
