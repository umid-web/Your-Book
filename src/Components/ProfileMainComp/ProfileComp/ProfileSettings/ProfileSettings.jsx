import React from 'react';
import './ProfileSettings.scss';

const ProfileSettings = ({ settingsItems, onItemClick = () => {}, ChevronRight }) => {
  return (
    <div className="section-block">
      <h3 className="section-title">Sozlamalar</h3>
      <div className="settings-container">
        {settingsItems.map((item, i) => (
          <button
            className="setting-item"
            key={item.id || i}
            onClick={() => onItemClick(item.id)}
          >
            <div className="si-icon">
              <item.icon size={24} />
            </div>
            <div className="si-text">
              <div className="si-label">{item.label}</div>
              <div className="si-desc">{item.desc}</div>
            </div>
            <ChevronRight className="si-chevron" size={18} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
