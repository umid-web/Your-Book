import React from 'react';
import { Mail, Phone, Camera, Award, User } from 'lucide-react';
import './ProfileHeader.scss';

const ProfileHeader = ({
  name, email, phone, isPremium, iqLevel, maxIQ, Crown, EditIcon, onEdit, profileImage, bio
}) => {
  const iq = iqLevel || 0;
  const max = maxIQ || 100;
  const progressPercent = Math.min(100, Math.round((iq / max) * 100));

  return (
    <div className="profile-header">
      <div className="ph-glow-1"></div>
      <div className="ph-glow-2"></div>
      <div className="ph-glass-card">
        <button className="ph-master-edit" onClick={onEdit} title="Tahrirlash">
          <EditIcon size={20} />
        </button>

        <div className="ph-grid">
          <div className="ph-avatar-sect">
            <div className="ph-avatar-wrapper" onClick={onEdit}>
              {profileImage ? (
                <img src={profileImage} alt={name} onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name); }} />
              ) : (
                <div className="ph-avatar-placeholder">
                  <User size={64} color="rgba(255,255,255,0.2)" />
                </div>
              )}
              <div className="ph-avatar-edit-hint">
                <Camera size={24} />
              </div>
            </div>
            {isPremium && (
              <div className="ph-premium-chip">
                <Crown size={14} />
                <span>Premium Member</span>
              </div>
            )}
          </div>

          <div className="ph-info-sect">
            <h1 className="ph-full-name">{name}</h1>
            <p className="ph-user-bio">
              {bio || "Empire Hub Platformasining qadrli foydalanuvchisi."}
            </p>

            <div className="ph-contact-grid">
              <div className="ph-contact-box">
                <Mail size={16} />
                <div className="ph-contact-val">
                  <label>Email</label>
                  <span>{email}</span>
                </div>
              </div>
              <div className="ph-contact-box">
                <Phone size={16} />
                <div className="ph-contact-val">
                  <label>Telefon</label>
                  <span>{phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ph-progress-sect">
            <div className="ph-prog-header">
              <div className="ph-prog-title">
                <Award size={20} />
                <span>Umumiy natija</span>
              </div>
              <span className="ph-prog-percent">{progressPercent}%</span>
            </div>

            <div className="ph-prog-rail">
              <div className="ph-prog-fill" style={{ width: `${progressPercent}%` }}>
                <div className="ph-prog-shimmer"></div>
              </div>
            </div>

            <div className="ph-prog-stats">
              <div className="ph-p-stat">
                <label>Hozirgi IQ</label>
                <span>{iqLevel}</span>
              </div>
              <div className="ph-p-stat">
                <label>Maqsad</label>
                <span>{maxIQ}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfileHeader;
