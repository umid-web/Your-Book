import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Coins, Crown, BookOpen, FileCheck, Gift,
    TrendingUp, ShoppingCart, Sparkles, Plus,
    ShoppingBag, ChevronRight, Award
} from 'lucide-react';
import goldCoin from '../../../assets/gold_coin.png';
import './YouBookWallet.scss';

const recentActivities = [
    { icon: BookOpen, action: 'Kitob sotib olindi', time: '2 soat oldin',  amount: -500 },
    { icon: Award,    action: 'Test mukofoti',       time: '5 soat oldin',  amount:  250 },
    { icon: Gift,     action: 'Kunlik bonus',         time: '1 kun oldin',   amount:  100 },
];

const quickStats = [
    { icon: TrendingUp,   value: '+250',  label: 'Bugun' },
    { icon: ShoppingCart, value: '1,200', label: 'Hafta'  },
    { icon: Sparkles,     value: '25K',   label: 'Jami'   },
];

const featureTags = [
    { icon: BookOpen,  label: 'Kitoblar', path: '/library'  },
    { icon: FileCheck, label: 'Testlar',  path: '/iq-test'  },
    { icon: Crown,     label: 'Premium',  path: '/profile/premium'   },
    { icon: Gift,      label: "Sovg'alar", path: '/coin-wallet' },
];

const YouBookWallet = ({ coins = 15000 }) => {
    const navigate = useNavigate();

    const handleEarnCoins = () => {
        navigate('/coin-wallet');
    };

    const handleSpendCoins = () => {
        navigate('/store');
    };

    return (
        <div className="ybw-card">

            {/* ─── BG Decorations ─── */}
            <div className="ybw-blur ybw-blur-1" />
            <div className="ybw-blur ybw-blur-2" />

            {/* Coin image – top right */}
            <img
                src={goldCoin}
                alt="Coin decoration"
                className="ybw-coin-img"
            />

            {/* Pattern overlay */}
            <div className="ybw-pattern" />

            {/* ─── Content ─── */}
            <div className="ybw-content">

                {/* 1. Header */}
                <div className="ybw-header">
                    <div className="ybw-left">
                        <span className="ybw-badge">
                            <Crown size={14} className="crown-yellow" />
                            Premium Wallet
                        </span>
                        <h2 className="ybw-main-title">YouBook Coin</h2>
                        <p className="ybw-subtitle">Asosiy hamyon</p>
                    </div>
                    <div className="ybw-coin-wrap">
                        <Coins size={38} className="ybw-coin-icon" />
                    </div>
                </div>

                {/* 2. Balance */}
                <div className="ybw-balance-block">
                    <p className="ybw-bal-label">Balans</p>
                    <div className="ybw-bal-row">
                        <span className="ybw-bal-num">{coins.toLocaleString()}</span>
                        <span className="ybw-bal-unit">coins</span>
                    </div>
                    <p className="ybw-usd">≈ ${(coins * 0.01).toFixed(2)} USD</p>
                </div>

                <div className="ybw-features">
                    <p className="ybw-feat-label">Ishlatish uchun:</p>
                    <div className="ybw-tags">
                        {featureTags.map((t, i) => (
                            <span 
                                className="ybw-tag" 
                                key={i} 
                                onClick={() => navigate(t.path)}
                                style={{ cursor: 'pointer' }}
                            >
                                <t.icon size={13} />
                                {t.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 4. Quick Stats */}
                <div className="ybw-stats">
                    {quickStats.map((s, i) => (
                        <div className="ybw-stat" key={i}>
                            <s.icon size={22} className="ybw-stat-ic" />
                            <div className="ybw-stat-val">{s.value}</div>
                            <div className="ybw-stat-lbl">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* 5. Action Buttons */}
                <div className="ybw-btns">
                    <button className="ybw-btn" onClick={handleEarnCoins}>
                        <Plus size={18} /> Coin Olish
                    </button>
                    <button className="ybw-btn" onClick={handleSpendCoins}>
                        <ShoppingBag size={18} /> Sarflash
                    </button>
                </div>

                {/* 6. Recent Activity */}
                <div className="ybw-activity">
                    <div className="ybw-act-header">
                        <span className="ybw-act-title">So'nggi faoliyat</span>
                        <button className="ybw-act-more">
                            Hammasi <ChevronRight size={12} />
                        </button>
                    </div>
                    <div className="ybw-act-list">
                        {recentActivities.map((a, i) => (
                            <div className="ybw-act-item" key={i}>
                                <div className="ybw-act-left">
                                    <div className="ybw-act-ic">
                                        <a.icon size={16} />
                                    </div>
                                    <div className="ybw-act-info">
                                        <p className="ybw-act-name">{a.action}</p>
                                        <p className="ybw-act-time">{a.time}</p>
                                    </div>
                                </div>
                                <span className={`ybw-act-amount ${a.amount > 0 ? 'pos' : 'neg'}`}>
                                    {a.amount > 0 ? '+' : ''}{a.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default YouBookWallet;
