import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.scss';


const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <div className="quick-actions">
            <div className="section-header">
                <h2>⚡ Tezkor amallar</h2>
            </div>

            <div className="actions-grid">
                <div className="action-card" onClick={() => navigate('/store')}>
                    <div className="action-icon">🛒</div>
                    <div className="action-content">
                        <h3>Kitob do'koni</h3>
                        <p>Yangi kitoblar sotib olish</p>
                        <span className="action-reward">200+ 🪙 / kitob</span>
                    </div>
                </div>

                <div className="action-card" onClick={() => navigate('/daily-quest')}>
                    <div className="action-icon">🎯</div>
                    <div className="action-content">
                        <h3>Kunlik vazifalar</h3>
                        <p>Qo'shimcha tangalar</p>
                        <span className="action-badge">10-50 🪙</span>
                    </div>
                </div>

                <div className="action-card" onClick={() => navigate('/leaderboard')}>
                    <div className="action-icon">🏆</div>
                    <div className="action-content">
                        <h3>Reyting</h3>
                        <p>Eng yaxshi kitobxonlar</p>
                        <span className="action-reward">Top 10: 100 🪙</span>
                    </div>
                </div>

                <div className="action-card" onClick={() => navigate('/referral')}>
                    <div className="action-icon">👥</div>
                    <div className="action-content">
                        <h3>Taklif qilish</h3>
                        <p>Do'stlaringizni taklif qiling</p>
                        <span className="action-reward">50 🪙 / kishi</span>
                    </div>
                </div>
            </div>

            <div className="premium-teaser">
                <div className="teaser-content">
                    <span className="teaser-icon">👑</span>
                    <div className="teaser-text">
                        <h4>Premium a'zo bo'ling!</h4>
                        <p>2x tanga, maxsus kitoblar va bonuslar</p>
                    </div>
                </div>
                <button className="upgrade-btn" onClick={() => navigate('/premium')}>
                    Ulanish
                </button>
            </div>
        </div>
    );
};

export default QuickActions;
