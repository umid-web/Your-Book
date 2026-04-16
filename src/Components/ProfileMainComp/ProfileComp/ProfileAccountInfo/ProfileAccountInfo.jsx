import React from 'react';
import './ProfileAccountInfo.scss';

const ProfileAccountInfo = ({ data }) => {
  if (!data) return null;

  return (
    <div className="widget-card">
      <h3 className="widget-title">Hisob Ma'lumotlari</h3>
      <div className="acc-info-rows">
        <div className="acc-row">
          <span className="acc-label">Ro'yxatdan o'tgan:</span>
          <span className="acc-val">{data.joinDate}</span>
        </div>
        <div className="acc-row">
          <span className="acc-label">Oxirgi faoliyat:</span>
          <span className="acc-val">{data.lastSeen}</span>
        </div>
        <div className="acc-row">
          <span className="acc-label">Status:</span>
          <span className={`acc-val status-${(data.status || 'faol').toString().toLowerCase() === 'faol' ? 'active' : 'inactive'}`}>
            {data.status || 'Noma\'lum'}
          </span>
        </div>
        <div className="acc-row">
          <span className="acc-label">ID:</span>
          <span className="acc-val val-mono">{data.id}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccountInfo;
