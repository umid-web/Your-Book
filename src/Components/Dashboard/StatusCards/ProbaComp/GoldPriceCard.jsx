import React from 'react';
import './GoldPriceCard.scss';

const GoldPriceCard = ({ data }) => {
    return (
        <article className="gold-price-card premium" aria-label="Gold price card">
            <div className="card-glow" />

            <header className="card-header">
                <div>
                    <h3 className="card-title">{data?.title || 'Gold Price'}</h3>
                    <p className="card-subtitle">{data?.subtitle || 'per gram'}</p>
                </div>
                <div className="coin-large" aria-hidden="true">
                    <span className="coin-emoji">🪙</span>
                    <span className="coin-shine" />
                </div>
            </header>

            <div className="card-body">
                <div className="value-section">
                    <div className="main-value">
                        {data?.value || '0.00'}
                    </div>
                    {data?.change && (
                        <div className={`trend-badge ${data?.isPositive ? 'positive' : 'negative'}`}>
                            <span className="trend-arrow">{data?.isPositive ? '▲' : '▼'}</span>
                            {data?.change}
                        </div>
                    )}
                </div>

                <div className="meta-info">
                    <span className="karat-badge">{data?.footer || 'Karat Info'}</span>
                </div>
            </div>

            <footer className="card-footer">
                <span className="update-time">
                    <svg className="clock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Updated {data?.lastUpdated || 'Recently'}
                </span>
                <span className="market-status">● Live</span>
            </footer>
        </article>
    );
};

export default GoldPriceCard;