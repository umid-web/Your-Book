import React from 'react';
import './GoldRateCard.scss';

const GoldRateCard = ({ data }) => {
    return (
        <article className="gold-rate-card premium">
            <div className="card-glow" />

            <header className="card-header">
                <div className="status-badge">
                    <span className="dot" />
                    Real-Time
                </div>
                <h3>{data?.title || 'Gold Rate Update'}</h3>
            </header>

            <div className="card-body">
                <div className="rate-display">
                    <span className="value">{data?.value || '0.00'}</span>
                </div>

                <div className="update-info">
                    <div className="icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div className="text-content">
                        <span className="label">Last Updated</span>
                        <span className="time">{data?.lastUpdate || 'Just now'}</span>
                    </div>
                </div>
            </div>

            <footer className="card-footer">
                <div className="market-indicator">
                    <span className="market-label">Market Status</span>
                    <span className={`market-value ${data?.marketOpen ? 'open' : 'closed'}`}>
                        {data?.marketOpen ? 'Open' : 'Closed'}
                    </span>
                </div>
            </footer>
        </article>
    );
};

export default GoldRateCard;
