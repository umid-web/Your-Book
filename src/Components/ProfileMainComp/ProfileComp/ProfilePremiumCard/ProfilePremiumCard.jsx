import React from 'react';
import './ProfilePremiumCard.scss';

const ProfilePremiumCard = ({ Crown, onOpenPremiumSettings = () => {} }) => {
  const features = [
    "Barcha kitoblarga kirish",
    "Cheksiz testlar",
    "Premium qo'llab-quvvatlash",
    "Tilla bonuslar"
  ];

  return (
    <div className="premium-card">
      <div className="pc-blur"></div>
      <div className="pc-content">
        <Crown className="pc-icon" size={40} />
        <h3 className="pc-title">Premium Status</h3>
        <p className="pc-desc">Barcha imkoniyatlardan cheksiz foydalaning!</p>
        
        <div className="pc-features">
          {features.map((feature, i) => (
            <div key={i} className="pcf-item">
              <div className="pcf-bullet"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <button className="pc-btn" onClick={onOpenPremiumSettings}>
          Premium Sozlamalari
        </button>
      </div>
    </div>
  );
};

export default ProfilePremiumCard;
