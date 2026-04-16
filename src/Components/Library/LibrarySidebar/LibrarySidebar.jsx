import React from 'react';
import './LibrarySidebar.scss';

const LibrarySidebar = () => {
    return (
        <aside className="library-sidebar">

            {/* 1. Your Balance */}
            <div className="ls-card ls-balance-card">
                <div className="ls-balance-icon">💎</div>
                <div className="ls-balance-info">
                    <p className="ls-label">Sizning Balansingiz</p>
                    <h3 className="ls-amount">4,250 <span>Coins</span></h3>
                </div>
            </div>

            {/* 2. Qanday ishlaydi */}
            <div className="ls-card ls-howto-card">
                <h4 className="ls-card-title">Qanday ishlaydi?</h4>
                <ul className="ls-steps">
                    <li>
                        <span className="ls-step-num">1</span>
                        <p>Ochiq bo'limni tanlang</p>
                    </li>
                    <li>
                        <span className="ls-step-num">2</span>
                        <p>Coins orqali kitob sotib oling</p>
                    </li>
                    <li>
                        <span className="ls-step-num">3</span>
                        <p>Mutolaa qiling va darajani oshiring</p>
                    </li>
                </ul>
            </div>

            {/* 3. Mashhur Kategoriyalar */}
            <div className="ls-card ls-categories-card">
                <h4 className="ls-card-title">Mashhur Kategoriyalar</h4>
                <div className="ls-cat-list">
                    <span className="ls-cat-pill">Klassik</span>
                    <span className="ls-cat-pill">Zamonaviy</span>
                    <span className="ls-cat-pill">Ilmiy</span>
                    <span className="ls-cat-pill">Badiiy</span>
                    <span className="ls-cat-pill">Tarixiy</span>
                </div>
            </div>

            {/* 4. Statistika */}
            <div className="ls-card ls-stat-card">
                <h4 className="ls-card-title">Sizning Statistikangiz</h4>
                <div className="ls-stat-row">
                    <span className="ls-stat-icon">📚</span>
                    <div className="ls-stat-texts">
                        <p className="ls-st-val">12 kitob</p>
                        <p className="ls-st-lbl">O'qilgan</p>
                    </div>
                </div>
                <div className="ls-stat-row">
                    <span className="ls-stat-icon">🪙</span>
                    <div className="ls-stat-texts">
                        <p className="ls-st-val">1,850 coins</p>
                        <p className="ls-st-lbl">Sarflangan</p>
                    </div>
                </div>
                <div className="ls-stat-row">
                    <span className="ls-stat-icon">⏱️</span>
                    <div className="ls-stat-texts">
                        <p className="ls-st-val">48 soat</p>
                        <p className="ls-st-lbl">Vaqt</p>
                    </div>
                </div>
            </div>

            {/* 5. Hozir O'qilmoqda */}
            <div className="ls-card ls-reading-card">
                <div className="ls-rc-top">
                    <span className="ls-rc-badge">Bo'lim 3 • 500 K</span>
                </div>
                <div className="ls-rc-content">
                    <div className="ls-rc-cover">📘</div>
                    <div className="ls-rc-info">
                        <h4 className="ls-rc-title">Mehrobdan Chayon</h4>
                        <p className="ls-rc-author">A. Qodiriy</p>
                    </div>
                </div>
                <div className="ls-rc-progress">
                    <div className="ls-rc-bar">
                        <div className="ls-rc-fill" style={{ width: '45%' }}></div>
                    </div>
                    <span className="ls-rc-pct">45% O'qildi</span>
                </div>
            </div>

        </aside>
    );
};

export default LibrarySidebar;
