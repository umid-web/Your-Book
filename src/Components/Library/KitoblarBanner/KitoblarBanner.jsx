import React, { useState } from 'react';
import './KitoblarBanner.scss';

const KitoblarBanner = () => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="kitoblar-banner" role="banner" aria-label="Premium takliflari">
            {/* Decorative blobs */}
            <div className="kb-blob kb-blob--1" aria-hidden="true" />
            <div className="kb-blob kb-blob--2" aria-hidden="true" />
            <div className="kb-blob kb-blob--3" aria-hidden="true" />

            {/* Floating book icons */}
            <div className="kb-floaters" aria-hidden="true">
                <span className="kb-float kb-float--1">📚</span>
                <span className="kb-float kb-float--2">✨</span>
                <span className="kb-float kb-float--3">📖</span>
                <span className="kb-float kb-float--4">🏆</span>
                <span className="kb-float kb-float--5">💡</span>
            </div>

            {/* Content */}
            <div className="kb-content">
                <div className="kb-left">
                    <div className="kb-badge">
                        <span className="kb-badge-dot" />
                        Yangi
                    </div>
                    <h2 className="kb-title">
                        Cheksiz kutubxona<br />
                        <span className="kb-title-accent">Premium bilan</span>
                    </h2>
                    <p className="kb-desc">
                        10,000+ kitob, audio kitoblar, va eksklyuziv kontentga to'liq kirish imkoniyati.
                        Bilimingizni cheksiz rivojlantiring.
                    </p>
                    <div className="kb-actions">
                        <button className="kb-btn-primary">
                            <span>Premium olish</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <button className="kb-btn-secondary">Bepul boshlash</button>
                    </div>
                    <div className="kb-features">
                        <div className="kb-feat">
                            <span className="kb-feat-icon">📗</span>
                            <span>10,000+ kitob</span>
                        </div>
                        <div className="kb-feat">
                            <span className="kb-feat-icon">🎧</span>
                            <span>Audio kitoblar</span>
                        </div>
                        <div className="kb-feat">
                            <span className="kb-feat-icon">🔒</span>
                            <span>Eksklyuziv kontent</span>
                        </div>
                    </div>
                </div>

                <div className="kb-right" aria-hidden="true">
                    <div className="kb-book-stack">
                        <div className="kb-book kb-book--back">
                            <span>📘</span>
                        </div>
                        <div className="kb-book kb-book--mid">
                            <span>📙</span>
                            <div className="kb-book-shine" />
                        </div>
                        <div className="kb-book kb-book--front">
                            <span>📕</span>
                            <div className="kb-book-shine" />
                            <div className="kb-badge-new">PRO</div>
                        </div>
                    </div>
                    <div className="kb-stat-cards">
                        <div className="kb-stat">
                            <span className="kb-stat-num">10K+</span>
                            <span className="kb-stat-label">Kitoblar</span>
                        </div>
                        <div className="kb-stat">
                            <span className="kb-stat-num">4.9★</span>
                            <span className="kb-stat-label">Reyting</span>
                        </div>
                        <div className="kb-stat">
                            <span className="kb-stat-num">50K</span>
                            <span className="kb-stat-label">Foydalanuvchi</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Close button */}
            <button className="kb-close" onClick={() => setDismissed(true)} aria-label="Yopish">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
};

export default KitoblarBanner;
