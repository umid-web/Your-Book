import React from 'react';
import './IQProgressCard.scss';

const IQProgressCard = ({ data }) => {
    return (
        <article className="iq-progress-card premium">
            <div className="card-glow" />

            <header className="card-header">
                <div className="iq-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    IQ LEVEL
                </div>
                <h3>{data?.title || 'IQ Progress'}</h3>
                <p className="subtitle">{data?.subtitle || 'Sizning darajangiz'}</p>
            </header>

            <div className="card-body">
                <div className="stats-display">
                    <div className="main-stat">
                        <span className="current">{data?.current || 0}</span>
                        <span className="total">/ {data?.total || 1000}</span>
                    </div>
                    <div className="rank-indicator">
                        Gold Rank
                    </div>
                </div>

                <div className="progress-section">
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${data?.percentage || 0}%` }}
                        >
                            <span className="shimmer" />
                        </div>
                    </div>
                    <div className="progress-footer">
                        <span className="label">Progress to next level</span>
                        <span className="percentage">{data?.percentage || 0}%</span>
                    </div>
                </div>
            </div>

            <footer className="card-footer">
                <div className="achievement-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                </div>
                <div className="milestone-text">3 milestones reached this week</div>
            </footer>
        </article>
    );
};

export default IQProgressCard;
