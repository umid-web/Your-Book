import React, { useState } from 'react';
import {
    Coins, Lock, DollarSign, Sparkles,
    TrendingUp, ChevronDown, Eye, Settings, X,
    AlertTriangle, CheckCircle2, ArrowRightLeft, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import YouBookWallet from './YouBookWallet/YouBookWallet';
import './VaultComp.scss';

const karatLevels = [375, 416, 500, 583, 625, 666, 750, 791, 833, 875, 916, 958, 990, 995, 999, 999.9];

const defaultWallets = karatLevels.map((k, i) => ({
    id: i + 1,
    karats: k,
    amount: 0,
    unlocked: i === 0   // only first wallet unlocked by default
}));

const transactions = [
    { type: 'Sotib olish', amount: '+50g', karat: '16K', time: '2 soat oldin', positive: true },
    { type: 'Naqdlashtirish', amount: '-20g', karat: '24K', time: '1 kun oldin', positive: false },
    { type: "Sovg'a", amount: '+10g', karat: '16K', time: '3 kun oldin', positive: true },
];

const VaultComp = () => {
    const [wallets, setWallets] = useState(defaultWallets);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [youBookCoins, setYouBookCoins] = useState(12500);
    const [isCashoutModalOpen, setIsCashoutModalOpen] = useState(false);
    const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [cashoutStep, setCashoutStep] = useState(1);
    const [notification, setNotification] = useState(null);

    const showNotify = (text, type = 'success') => {
        setNotification({ text, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const unlockedCount = wallets.filter(w => w.unlocked).length;

    const filteredWallets = wallets.filter(w => {
        if (activeFilter === 'unlocked') return w.unlocked;
        if (activeFilter === 'locked') return !w.unlocked;
        return true;
    });

    const selectedWalletData = wallets.find(w => w.id === selectedWallet);

    const handleCashOut = (e, wallet) => {
        e.stopPropagation();
        if (wallet.amount <= 0) {
            showNotify("Hamyon bo'sh, naqdlashtirish uchun tilla yetarli emas!", "error");
            return;
        }
        setSelectedWallet(wallet.id);
        setCashoutStep(1);
        setIsCashoutModalOpen(true);
    };

    const confirmCashout = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const wallet = wallets.find(w => w.id === selectedWallet);
            setWallets(prev => prev.map(w => w.id === selectedWallet ? { ...w, amount: 0 } : w));
            setIsProcessing(false);
            setCashoutStep(3);
            showNotify(`${wallet.amount}g tilla naqdlashtirildi!`);
        }, 2000);
    };

    const handleUnlock = (wallet) => {
        const reqIq = wallet.id * 10;
        showNotify(`Ushbu hamyonni ochish uchun IQ darajangiz ${reqIq} bo'lishi kerak!`, "info");
    };

    const handleExchange = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setYouBookCoins(prev => prev + 1000);
            setIsProcessing(false);
            setIsExchangeModalOpen(false);
            showNotify("1,000 Coin muvaffaqiyatli xarid qilindi!");
        }, 1500);
    };

    return (
        <div className="vault-container">


            {/* ── MOBILE HEADER ── */}
            <div className="vault-mobile-header">
                <div>
                    <h1 className="vmh-title">The Vault</h1>
                    <p className="vmh-sub">17 ta hamyon</p>
                </div>
                <button className="vmh-settings-btn">
                    <Settings size={20} />
                </button>
            </div>

            {/* ── STATS OVERVIEW ── */}
            <div className="vault-stats">
                {/* Card 1 – Total Gold Value */}
                <div className="vs-card vs-amber">
                    <div className="vs-blur"></div>
                    <div className="vs-body">
                        <div className="vs-header">
                            <Sparkles size={20} className="icon-amber" />
                            <span>Total Gold Value</span>
                        </div>
                        <div className="vs-val text-amber">1,234.5</div>
                        <div className="vs-lbl">gramm tilla</div>
                    </div>
                </div>

                {/* Card 2 – Active Wallets */}
                <div className="vs-card vs-blue">
                    <div className="vs-blur"></div>
                    <div className="vs-body">
                        <div className="vs-header">
                            <Eye size={20} className="icon-blue" />
                            <span>Active Wallets</span>
                        </div>
                        <div className="vs-val text-blue">{unlockedCount}</div>
                        <div className="vs-lbl">/ 16 ta hamyon</div>
                    </div>
                </div>

                {/* Card 3 – YouBook Coins */}
                <div className="vs-card vs-purple">
                    <div className="vs-blur"></div>
                    <div className="vs-body">
                        <div className="vs-header">
                            <Coins size={20} className="icon-purple" />
                            <span>YouBook Coins</span>
                        </div>
                        <div className="vs-val text-purple">{youBookCoins}</div>
                        <div className="vs-lbl">coins</div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="vault-main">

                {/* ── LEFT COLUMN ── */}
                <div className="vault-left">

                    {/* YouBook Coin Wallet */}
                    <YouBookWallet coins={youBookCoins} />

                    {/* Gold Wallets Section */}
                    <div className="gw-section">
                        {/* Header */}
                        <div className="gw-header">
                            <div>
                                <h2 className="gw-title">Tilla Hamyonlari</h2>
                                <p className="gw-subtitle">16 ta maxsus hamyon</p>
                            </div>
                            <div className="gw-filters">
                                {[
                                    { key: 'all', label: 'Barchasi' },
                                    { key: 'unlocked', label: 'Ochiq' },
                                    { key: 'locked', label: 'Qulflangan' },
                                ].map(f => (
                                    <button
                                        key={f.key}
                                        onClick={() => setActiveFilter(f.key)}
                                        className={`gw-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Wallets Grid */}
                        <div className="gw-grid">
                            {filteredWallets.map(wallet => (
                                <div
                                    key={wallet.id}
                                    onClick={() => wallet.unlocked && setSelectedWallet(wallet.id)}
                                    className={`gw-card ${wallet.unlocked ? 'unlocked' : 'locked'} ${selectedWallet === wallet.id ? 'selected' : ''}`}
                                >
                                    {/* Lock overlay */}
                                    {!wallet.unlocked && (
                                        <div className="gw-lock-overlay" onClick={(e) => {
                                            e.stopPropagation();
                                            handleUnlock(wallet);
                                        }}>
                                            <Lock size={32} />
                                            <span className="lock-req">IQ {wallet.id * 10}+</span>
                                        </div>
                                    )}

                                    {/* Card content */}
                                    <div className={`gw-card-inner ${!wallet.unlocked ? 'dimmed' : ''}`}>
                                        <div className="gw-card-top">
                                            <div>
                                                <p className="gw-wallet-num">Hamyon #{wallet.id}</p>
                                                <p className="gw-karat">{wallet.karats} K</p>
                                            </div>
                                            <div className={`gw-gold-bar ${!wallet.unlocked ? 'bar-locked' : ''}`}>
                                                <span>GOLD</span>
                                            </div>
                                        </div>

                                        <div className="gw-amount-section">
                                            <span className="gw-amount">{wallet.amount}</span>
                                            <span className="gw-amount-lbl">gramm</span>
                                        </div>

                                        {wallet.unlocked && (
                                            <div className="gw-actions">
                                                <button
                                                    className="gw-btn btn-cashout"
                                                    onClick={(e) => handleCashOut(e, wallet)}
                                                >
                                                    <DollarSign size={12} />
                                                    Naqdlashtirish
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="vault-right">

                    {/* 1. Gold Price Card */}
                    <div className="vr-card">
                        <div className="vr-price-header">
                            <TrendingUp size={20} className="icon-amber" />
                            <span>Live Gold Price</span>
                        </div>
                        <div className="vr-price-val">999.9</div>
                        <div className="vr-price-lbl">Karat / 24K</div>
                        <div className="vr-price-badge">
                            +2.5% bugun
                        </div>
                    </div>

                    {/* 2. Transaction History */}
                    <div className="vr-card">
                        <div className="vr-tx-header">
                            <h3>So'nggi Tranzaksiyalar</h3>
                            <button className="vr-exchange-btn" onClick={() => setIsExchangeModalOpen(true)}>
                                <ArrowRightLeft size={14} /> Exchange
                            </button>
                        </div>
                        <div className="vr-tx-list">
                            {transactions.map((tx, i) => (
                                <div className="vr-tx-item" key={i}>
                                    <div>
                                        <p className="vr-tx-type">{tx.type}</p>
                                        <p className="vr-tx-time">{tx.time}</p>
                                    </div>
                                    <div className="vr-tx-right">
                                        <span className={`vr-tx-amount ${tx.positive ? 'positive' : 'negative'}`}>{tx.amount}</span>
                                        <span className="vr-tx-karat">{tx.karat}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Selected Wallet Info */}
                    {selectedWalletData && (
                        <div className="vr-card selected-wallet-card">
                            <div className="sw-header">
                                <Sparkles size={20} className="icon-amber" />
                                <span className="sw-header-txt">Tanlangan Hamyon</span>
                            </div>
                            <h3 className="sw-title">{selectedWalletData.karats} Karat</h3>
                            <p className="sw-id">Hamyon #{selectedWalletData.id}</p>
                            <div className="sw-rows">
                                <div className="sw-row">
                                    <span>Balans:</span>
                                    <span className="text-white">{selectedWalletData.amount}g</span>
                                </div>
                                <div className="sw-row">
                                    <span>Status:</span>
                                    <span className="text-green">Faol</span>
                                </div>
                                <div className="sw-row">
                                    <span>Qiymati:</span>
                                    <span className="text-amber">${(selectedWalletData.amount * 60).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. Info Tip */}
                    <div className="vr-info-tip">
                        <h4 className="tip-title">💡 Maslahat</h4>
                        <p className="tip-desc">
                            Kitob o'qib, testlardan o'tib IQ darajangizni oshiring.
                            Har bir yangi daraja sizga yangi tilla hamyonini ochadi!
                        </p>
                    </div>
                </div>
            </div>

            {/* Cashout Modal */}
            <AnimatePresence>
                {isCashoutModalOpen && (
                    <div className="v-modal-overlay" onClick={() => !isProcessing && setIsCashoutModalOpen(false)}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="v-modal-card"
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="v-modal-close" onClick={() => setIsCashoutModalOpen(false)}>
                                <X size={20} />
                            </button>

                            {cashoutStep === 1 && (
                                <div className="v-m-step">
                                    <h2 className="v-m-title">Naqdlashtirish</h2>
                                    <p className="v-m-desc">Tilla qiymatini bankingizga o'tkazing</p>
                                    
                                    <div className="v-m-summary">
                                        <div className="v-m-row">
                                            <span>Mavjud:</span>
                                            <span>{selectedWalletData?.amount}g / {selectedWalletData?.karats}K</span>
                                        </div>
                                        <div className="v-m-row">
                                            <span>Kurs (24K):</span>
                                            <span>$60.00 / g</span>
                                        </div>
                                        <div className="v-m-total">
                                            <span>Qiymati:</span>
                                            <span>${(selectedWalletData?.amount * 60).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="v-card-input">
                                        <label>Karta raqami</label>
                                        <div className="v-c-box">
                                            <CreditCard size={18} />
                                            <span>**** 4567</span>
                                        </div>
                                    </div>

                                    <button className="v-m-btn" onClick={() => setCashoutStep(2)}>
                                        Davom etish
                                    </button>
                                </div>
                            )}

                            {cashoutStep === 2 && (
                                <div className="v-m-step">
                                    <h2 className="v-m-title">Tasdiqlash</h2>
                                    <div className="v-m-warn">
                                        <AlertTriangle size={24} />
                                        <p>Ushbu amalni ortga qaytarib bo'lmaydi. Tilla darhol hamyondan yechiladi.</p>
                                    </div>
                                    <button className="v-m-btn v-m-btn-confirm" onClick={confirmCashout} disabled={isProcessing}>
                                        {isProcessing ? "Amal bajarilmoqda..." : "Tasdiqlash va Yuborish"}
                                    </button>
                                    <button className="v-m-btn v-m-btn-cancel" onClick={() => setCashoutStep(1)}>Orqaga</button>
                                </div>
                            )}

                            {cashoutStep === 3 && (
                                <div className="v-m-step v-m-success">
                                    <div className="v-m-success-ic">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h2 className="v-m-title">Bajarildi!</h2>
                                    <p className="v-m-desc">Sizning so'rovingiz qabul qilindi. Mablag' 24 soat ichida kartangizga tushadi.</p>
                                    <button className="v-m-btn" onClick={() => setIsCashoutModalOpen(false)}>Yopish</button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Exchange Modal */}
            <AnimatePresence>
                {isExchangeModalOpen && (
                    <div className="v-modal-overlay" onClick={() => !isProcessing && setIsExchangeModalOpen(false)}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="v-modal-card v-exchange-card"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="v-m-title">Coin Exchange</h2>
                            <p className="v-m-desc">Tillani YouBook Coinlariga almashtiring</p>
                            
                            <div className="v-ex-grid">
                                <div className="v-ex-box">
                                    <div className="l">Yuboriladi</div>
                                    <div className="v">1.0g Tilla</div>
                                </div>
                                <ArrowRightLeft className="v-ex-arrow" />
                                <div className="v-ex-box">
                                    <div className="l">Olinadi</div>
                                    <div className="v">1,000 Coins</div>
                                </div>
                            </div>
                            
                            <button className="v-m-btn" onClick={handleExchange} disabled={isProcessing}>
                                {isProcessing ? "Processing..." : "Exchange Now"}
                            </button>
                            <button className="v-m-btn v-m-btn-cancel" onClick={() => setIsExchangeModalOpen(false)}>Bekor qilish</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Notifications */}
            <AnimatePresence>
                {notification && (
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`v-notify ${notification.type}`}
                    >
                        {notification.type === 'success' ? <CheckCircle2 size={18} /> : (notification.type === 'error' ? <AlertTriangle size={18} /> : <Eye size={18} />)}
                        <span>{notification.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VaultComp;
