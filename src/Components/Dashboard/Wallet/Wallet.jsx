import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet as WalletIcon, Coins, TrendingUp, Info, ArrowUpRight, DollarSign } from 'lucide-react';
import './Wallet.scss';

const Wallet = ({ stats = {} }) => {
    const navigate = useNavigate();
    const { 
        ybcBalance = 250000, // YouBook Coins
        goldGrams = 0.0045,   // Grams of Gold
    } = stats;

    const [uzsValue, setUzsValue] = useState(0);
    const [usdValue, setUsdValue] = useState(0);

    // Mock Conversion rates
    // 1 YBC = 1 UZS (for now), or whatever the logic is
    useEffect(() => {
        setUzsValue(ybcBalance);
        setUsdValue((ybcBalance / 12600).toFixed(2)); // $1 = 12600 UZS
    }, [ybcBalance]);

    const handleDeposit = () => {
        navigate('/coin-wallet');
    };

    return (
        <section className="wallet-section-v2">
            <div className="section-header">
                <h2 className="title">Mening Hamyonim</h2>
                <div className="market-badge">
                    <TrendingUp size={14} />
                    <span>Gold: 1,042,000 UZS / gr</span>
                </div>
            </div>

            <div className="wallet-grid">
                {/* Main YBC Wallet */}
                <div className="wallet-card-v2 ybc-card" onClick={handleDeposit} style={{ cursor: 'pointer' }}>
                    <div className="card-glare" />
                    <div className="card-top">
                        <div className="icon-box">
                            <Coins size={24} />
                        </div>
                        <span className="card-label">YBC Balansi</span>
                    </div>
                    
                    <div className="card-balance">
                        <h3 className="amount">{ybcBalance.toLocaleString()}</h3>
                        <span className="currency">YBC</span>
                    </div>

                    <div className="conversion-row">
                        <div className="conv-item">
                            <span className="conv-label">UZS</span>
                            <span className="conv-val">≈ {uzsValue.toLocaleString()} sōm</span>
                        </div>
                        <div className="conv-item">
                            <span className="conv-label">USD</span>
                            <span className="conv-val">≈ ${usdValue}</span>
                        </div>
                    </div>
                    
                    <button className="deposit-btn">
                        <Plus size={16} />
                        To'ldirish
                    </button>
                </div>

                {/* Gold Reserve Wallet */}
                <div className="wallet-card-v2 gold-card">
                    <div className="card-glare" />
                    <div className="card-top">
                        <div className="icon-box">
                            <TrendingUp size={24} />
                        </div>
                        <span className="card-label">Tilla Zaxirasi (999.9)</span>
                    </div>

                    <div className="card-balance">
                        <h3 className="amount">{goldGrams.toFixed(4)}</h3>
                        <span className="currency">gramm</span>
                    </div>

                    <div className="gold-value-badge">
                        <ArrowUpRight size={14} />
                        <span>Ekvivalent: {(goldGrams * 1042000).toLocaleString()} sōm</span>
                    </div>

                    <div className="card-footer">
                        <p className="footer-info">
                            <Info size={12} />
                            Mukofotlar tilla grammiga o'giriladi
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Plus = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default Wallet;

