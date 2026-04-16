import React from 'react';
import './YouBookCoinsCard.scss';

const YouBookCoinsCard = ({ data }) => {
    return (
        <article className="youbook-coins-card premium">
            <div className="card-glow" />

            <header className="card-header">
                <div className="icon-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        <path d="M5 3v4" />
                        <path d="M19 17v4" />
                        <path d="M3 5h4" />
                        <path d="M17 19h4" />
                    </svg>
                </div>
                <div className="text-content">
                    <h3>{data?.title || 'YouBook Coins'}</h3>
                    <p className="subtitle">{data?.subtitle || 'Sizning balansingiz'}</p>
                </div>
            </header>

            <div className="card-body">
                <div className="balance-display">
                    <span className="value">{data?.value || 0}</span>
                    <span className="unit">{data?.unit || 'Coins'}</span>
                </div>
            </div>

            <footer className="card-footer">
                <div className="reward-info">
                    Earn more by reading books
                </div>
                <div className="action-button">
                    View History
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </footer>
        </article>
    );
};

export default YouBookCoinsCard;
