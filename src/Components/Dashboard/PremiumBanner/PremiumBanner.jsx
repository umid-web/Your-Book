import React from 'react';
import './PremiumBanner.scss';



import PropTypes from 'prop-types';

const PremiumBanner = ({ onClose, onUpgrade }) => {
    return (
        <div className="premium-ad-banner">
            <div className="ad-content">
                <div className="ad-icon-wrap">
                    <span>👑</span>
                </div>
                
                <div className="ad-text-container">
                    <h3 className="ad-title">Premium a'zolik</h3>
                    <p className="ad-desc">
                        Reklamasiz tajriba va <span className="highlight">cheksiz kitoblar</span> olamiga sho'ng'ing!
                    </p>
                </div>

                <div className="ad-actions">
                    <button className="ad-link" onClick={onUpgrade}>
                        Hoziroq ulaning →
                    </button>
                </div>
            </div>
            
            <button
                className="ad-close"
                onClick={onClose}
                aria-label="Yopish"
            >
                ✕
            </button>
        </div>
    );
};

PremiumBanner.propTypes = {
    onClose: PropTypes.func,
    onUpgrade: PropTypes.func,
};

PremiumBanner.defaultProps = {
    onClose: () => { },
    onUpgrade: () => { },
};

export default PremiumBanner;
