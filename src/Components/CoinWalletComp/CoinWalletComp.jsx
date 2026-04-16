import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Coins, TrendingUp, TrendingDown, ShoppingCart, Gift,
    BookOpen, Award, Plus, History, ChevronRight,
    ArrowUpRight, ArrowDownLeft, Zap, Target,
    Star, Crown, Sparkles, Clock, Filter, X, CreditCard,
    CheckCircle2, AlertCircle, RefreshCcw
} from 'lucide-react';
import './CoinWalletComp.scss';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
    BookOpen,
    Award,
    Gift,
    Crown,
    ShoppingCart,
    Zap,
    Target,
    Star,
    Sparkles
};

const CoinWalletComp = () => {
    const navigate = useNavigate();
    const [txFilter, setTxFilter] = useState('Barchasi');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [purchaseStep, setPurchaseStep] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [bonusClaimed, setBonusClaimed] = useState(false);
    const [message, setMessage] = useState(null);

    const coinPackages = [
        { id: 1, amount: 1000, price: "10,000", bonus: "0", label: "Bronz" },
        { id: 2, amount: 5000, price: "45,000", bonus: "500", label: "Kumush", popular: true },
        { id: 3, amount: 12000, price: "100,000", bonus: "2,000", label: "Oltin" },
        { id: 4, amount: 25000, price: "200,000", bonus: "5,000", label: "Platina" }
    ];

    const showToast = (msg, type = 'success') => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Since this might run in a real environment, I'll add a fallback
                const res = await fetch('http://localhost:3000/coinWallet');
                if (!res.ok) throw new Error('Network response was not ok');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.warn('Error fetching coin wallet data, using mock data:', err);
                const mockData = {
                    balance: 12500,
                    transactions: [
                        { id: 1, type: "Test topshirildi", amount: 500, time: "Shu daqiqada", category: "income", icon: "Award" },
                        { id: 2, type: "Kitob xarid qilindi", amount: -1200, time: "2 soat oldin", category: "expense", icon: "ShoppingCart" },
                        { id: 3, type: "Kunlik bonus", amount: 100, time: "Bugun", category: "income", icon: "Gift" },
                        { id: 4, type: "IQ Reyting mukofoti", amount: 2500, time: "Kecha", category: "income", icon: "Crown" }
                    ],
                    earnMethods: [
                        { title: "Kitob o'qish", desc: "Har bir bet uchun", reward: "+5 coin", color: "blue", icon: "BookOpen" },
                        { title: "IQ Test", desc: "Muvaffaqiyatli topshirish", reward: "+500 coin", color: "purple", icon: "Award" }
                    ],
                    spendOptions: [
                        { title: "Premium obuna", desc: "10000 coin", color: "gold", icon: "Zap" },
                        { title: "Sovg'alar", desc: "2500 coin dan", color: "red", icon: "Gift" }
                    ],
                    stats: { totalEarned: 15200, totalSpent: 2700, weekly: 3200, today: 600, streakBonus: "+15%" }
                };
                setData(mockData);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const claimed = localStorage.getItem('dailyBonusClaimed');
        if (claimed === new Date().toDateString()) setBonusClaimed(true);
    }, []);

    const handleClaimBonus = () => {
        if (bonusClaimed) return;
        setIsProcessing(true);
        setTimeout(() => {
            const today = new Date().toDateString();
            localStorage.setItem('dailyBonusClaimed', today);
            setBonusClaimed(true);
            setData(prev => ({
                ...prev,
                balance: prev.balance + 100,
                transactions: [
                    { id: Date.now(), type: "Kunlik bonus", amount: 100, time: "Hozir", category: "income", icon: "Gift" },
                    ...prev.transactions
                ]
            }));
            setIsProcessing(false);
            showToast("100 Coin muvaffaqiyatli saqlandi!");
        }, 1200);
    };

    const handlePurchase = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setData(prev => ({
                ...prev,
                balance: prev.balance + selectedPackage.amount + (parseInt(selectedPackage.bonus.replace(',', '')) || 0),
                transactions: [
                    { id: Date.now(), type: "Coin xarid qilindi", amount: selectedPackage.amount, time: "Hozir", category: "income", icon: "ShoppingCart" },
                    ...prev.transactions
                ]
            }));
            setIsProcessing(false);
            setPurchaseStep(3);
            showToast("Xarid muvaffaqiyatli yakunlandi!");
        }, 2000);
    };

    if (loading) return <div className="cw-loading-comp">Yuklanmoqda...</div>;
    if (!data) return <div className="cw-error-comp">Ma'lumot topilmadi</div>;

    const { balance, transactions, earnMethods, spendOptions, stats } = data;

    const filteredTx = transactions.filter(tx => {
        if (txFilter === 'Kirim') return tx.category === 'income';
        if (txFilter === 'Chiqim') return tx.category === 'expense';
        return true;
    });

    const totalIn = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const totalOut = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const filters = ['Barchasi', 'Kirim', 'Chiqim'];

    return (
        <div className="coin-wallet-comp">
            <div className="cw-container">
                <div className="cw-page-header">
                    <div>
                        <h1 className="cw-page-title">
                            <Coins size={28} className="cw-title-icon" />
                            Coin Hamyon
                        </h1>
                        <p className="cw-page-sub">YouBook tanga tizimini boshqaring</p>
                    </div>
                    <div className="cw-header-badge">
                        <Crown size={16} />
                        Premium
                    </div>
                </div>

                <div className="cw-hero">
                    <div className="cw-hero-blur cw-blur-1"></div>
                    <div className="cw-hero-blur cw-blur-2"></div>
                    <div className="cw-hero-pattern"></div>

                    <div className="cw-hero-body">
                        <div className="cw-hero-left">
                            <div className="cw-hero-badge">
                                <Coins size={14} />
                                Asosiy balans
                            </div>
                            <div className="cw-hero-balance">
                                <span className="cw-hero-num">{balance.toLocaleString()}</span>
                                <span className="cw-hero-unit">coins</span>
                            </div>
                            <p className="cw-hero-usd">≈ ${(balance * 0.01).toFixed(2)} USD</p>

                            <div className="cw-hero-mini-stats">
                                <div className="cw-mini">
                                    <ArrowDownLeft size={14} className="mini-green" />
                                    <span className="mini-val">+{totalIn.toLocaleString()}</span>
                                    <span className="mini-lbl">Kirim (7 kun)</span>
                                </div>
                                <div className="cw-mini-divider"></div>
                                <div className="cw-mini">
                                    <ArrowUpRight size={14} className="mini-red" />
                                    <span className="mini-val">-{totalOut.toLocaleString()}</span>
                                    <span className="mini-lbl">Chiqim (7 kun)</span>
                                </div>
                            </div>
                        </div>

                        <div className="cw-hero-right">
                            <div className="cw-coin-ring">
                                <Coins size={48} className="cw-coin-ring-ic" />
                            </div>
                            <div className="cw-quick-btns">
                                <button className="cw-qbtn cw-qbtn-earn" onClick={() => {
                                    setPurchaseStep(1);
                                    setIsPurchaseModalOpen(true);
                                }}>
                                    <Plus size={16} /> Coin Olish
                                </button>
                                <button className="cw-qbtn cw-qbtn-spend" onClick={() => navigate('/store')}>
                                    <ShoppingCart size={16} /> Sarflash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cw-grid">
                    <div className="cw-col-left">
                        <div className="cw-card">
                            <div className="cw-card-header">
                                <div className="cw-card-title">
                                    <History size={20} />
                                    Tranzaksiyalar tarixi
                                </div>
                                <div className="cw-filter-tabs">
                                    {filters.map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setTxFilter(f)}
                                            className={`cw-filter-btn ${txFilter === f ? 'active' : ''}`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="cw-tx-list">
                                {filteredTx.map(tx => {
                                    const Icon = iconMap[tx.icon] || History;
                                    return (
                                        <div className="cw-tx-item" key={tx.id}>
                                            <div className={`cw-tx-ic ${tx.category === 'income' ? 'ic-income' : 'ic-expense'}`}>
                                                <Icon size={18} />
                                            </div>
                                            <div className="cw-tx-info">
                                                <p className="cw-tx-name">{tx.type}</p>
                                                <p className="cw-tx-time">
                                                    <Clock size={11} /> {tx.time}
                                                </p>
                                            </div>
                                            <div className={`cw-tx-amount ${tx.amount > 0 ? 'amt-pos' : 'amt-neg'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                                                <span className="cw-tx-coin">coins</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="cw-card">
                            <div className="cw-card-header">
                                <div className="cw-card-title">
                                    <Zap size={20} />
                                    Coin qanday topiladi?
                                </div>
                            </div>
                            <div className="cw-earn-grid">
                                {earnMethods.map((e, i) => {
                                    const Icon = iconMap[e.icon] || Zap;
                                    return (
                                        <div className={`cw-earn-card earn-${e.color}`} key={i}>
                                            <div className="cw-earn-ic">
                                                <Icon size={20} />
                                            </div>
                                            <div className="cw-earn-info">
                                                <h4 className="cw-earn-title">{e.title}</h4>
                                                <p className="cw-earn-desc">{e.desc}</p>
                                            </div>
                                            <div className="cw-earn-reward">{e.reward}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="cw-col-right">
                        <div className="cw-card">
                            <div className="cw-card-header">
                                <div className="cw-card-title">
                                    <TrendingUp size={20} />
                                    Statistika
                                </div>
                            </div>
                            <div className="cw-stats-list">
                                <div className="cw-stat-row">
                                    <span className="cw-stat-lbl">Jami topilgan</span>
                                    <span className="cw-stat-val stat-green">+{stats.totalEarned.toLocaleString()}</span>
                                </div>
                                <div className="cw-stat-row">
                                    <span className="cw-stat-lbl">Jami sarflangan</span>
                                    <span className="cw-stat-val stat-red">-{stats.totalSpent.toLocaleString()}</span>
                                </div>
                                <div className="cw-stat-row">
                                    <span className="cw-stat-lbl">Bu hafta</span>
                                    <span className="cw-stat-val stat-blue">+{stats.weekly.toLocaleString()}</span>
                                </div>
                                <div className="cw-stat-row">
                                    <span className="cw-stat-lbl">Bugun</span>
                                    <span className="cw-stat-val stat-amber">+{stats.today.toLocaleString()}</span>
                                </div>
                                <div className="cw-stat-row">
                                    <span className="cw-stat-lbl">Streak bonus</span>
                                    <span className="cw-stat-val stat-purple">{stats.streakBonus}</span>
                                </div>
                            </div>
                        </div>

                        <div className="cw-card">
                            <div className="cw-card-header">
                                <div className="cw-card-title">
                                    <ShoppingCart size={20} />
                                    Coin sarflash
                                </div>
                            </div>
                            <div className="cw-spend-list">
                                {spendOptions.map((sp, i) => {
                                    const Icon = iconMap[sp.icon] || ShoppingCart;
                                    return (
                                        <button 
                                            className={`cw-spend-item spend-${sp.color}`} 
                                            key={i}
                                            onClick={() => navigate('/store')}
                                        >
                                            <div className="cw-spend-ic">
                                                <Icon size={18} />
                                            </div>
                                            <div className="cw-spend-info">
                                                <p className="cw-spend-name">{sp.title}</p>
                                                <p className="cw-spend-price">{sp.desc}</p>
                                            </div>
                                            <ChevronRight size={18} className="cw-spend-arrow" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="cw-tip-card">
                            <div className="cw-tip-icon">🎁</div>
                            <h4 className="cw-tip-title">{bonusClaimed ? "Bonus qabul qilindi!" : "Kunlik bonus tayyor!"}</h4>
                            <p className="cw-tip-desc">
                                {bonusClaimed 
                                    ? "Siz bugungi bonusni olib bo'ldingiz. Ertaga qaytib keling!" 
                                    : "Bugungi 100 coinni olish uchun sahifaga kiring va 'Bonus qabul qilish' tugmasini bosing."}
                            </p>
                            <button 
                                className={`cw-tip-btn ${bonusClaimed ? 'cw-tip-btn--disabled' : ''}`}
                                onClick={handleClaimBonus}
                                disabled={bonusClaimed || isProcessing}
                            >
                                {isProcessing ? <RefreshCcw className="animate-spin" size={16} /> : (bonusClaimed ? <CheckCircle2 size={16} /> : <Gift size={16} />)}
                                {bonusClaimed ? "Qabul qilindi" : "Bonus qabul qilish"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Purchase Modal */}
            <AnimatePresence>
                {isPurchaseModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cw-modal-overlay"
                        onClick={() => !isProcessing && setIsPurchaseModalOpen(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="cw-modal-content"
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="cw-modal-close" onClick={() => setIsPurchaseModalOpen(false)}>
                                <X size={20} />
                            </button>

                            {purchaseStep === 1 && (
                                <div className="cw-p-step">
                                    <h2 className="cw-p-title">Coin paketlari</h2>
                                    <p className="cw-p-desc">O'zingizga ma'qul bo'lgan paketni tanlang</p>
                                    
                                    <div className="cw-p-grid">
                                        {coinPackages.map(pkg => (
                                            <div 
                                                key={pkg.id} 
                                                className={`cw-p-card ${pkg.popular ? 'popular' : ''}`}
                                                onClick={() => {
                                                    setSelectedPackage(pkg);
                                                    setPurchaseStep(2);
                                                }}
                                            >
                                                {pkg.popular && <span className="p-popular">Mashhur</span>}
                                                <div className="p-header">
                                                    <Coins size={24} className="p-icon" />
                                                    <span className="p-label">{pkg.label}</span>
                                                </div>
                                                <div className="p-amt">{pkg.amount.toLocaleString()}</div>
                                                <div className="p-bonus">+{pkg.bonus} bonus</div>
                                                <button className="p-price-btn">{pkg.price} so'm</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {purchaseStep === 2 && (
                                <div className="cw-p-step">
                                    <div className="cw-p-back" onClick={() => setPurchaseStep(1)}>
                                        <ArrowUpRight style={{ transform: 'rotate(-135deg)' }} size={16} /> Orqaga
                                    </div>
                                    <h2 className="cw-p-title">To'lovni tasdiqlang</h2>
                                    
                                    <div className="cw-payment-summary">
                                        <div className="s-row">
                                            <span>Paket:</span>
                                            <span>{selectedPackage?.label} ({selectedPackage?.amount.toLocaleString()} coins)</span>
                                        </div>
                                        <div className="s-row">
                                            <span>Xizmat haqi:</span>
                                            <span>0 so'm</span>
                                        </div>
                                        <div className="s-total">
                                            <span>Jami:</span>
                                            <span>{selectedPackage?.price} so'm</span>
                                        </div>
                                    </div>

                                    <div className="cw-card-select">
                                        <div className="c-item active">
                                            <CreditCard size={20} />
                                            <div className="c-info">
                                                <p className="c-name">Visa Classic</p>
                                                <p className="c-num">**** 4567</p>
                                            </div>
                                            <CheckCircle2 size={18} className="c-check" />
                                        </div>
                                    </div>

                                    <button 
                                        className="cw-p-big-btn" 
                                        onClick={handlePurchase}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? <RefreshCcw className="animate-spin" size={18} /> : "To'lovni amalga oshirish"}
                                    </button>
                                </div>
                            )}

                            {purchaseStep === 3 && (
                                <div className="cw-p-step cw-p-complete">
                                    <div className="cw-p-success-ic">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h2 className="cw-p-title">Muvaffaqiyatli!</h2>
                                    <p className="cw-p-desc">Coinalar hisobingizga muvaffaqiyatli tushirildi.</p>
                                    <div className="cw-p-summary-final">
                                        <div className="f-val">+{ (selectedPackage?.amount + (parseInt(selectedPackage?.bonus.replace(',', '')) || 0)).toLocaleString() }</div>
                                        <div className="f-lbl">coins qo'shildi</div>
                                    </div>
                                    <button className="cw-p-big-btn" onClick={() => setIsPurchaseModalOpen(false)}>
                                        Yopish
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Message */}
            <AnimatePresence>
                {message && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`cw-toast ${message.type}`}
                    >
                        {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span>{message.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CoinWalletComp;
