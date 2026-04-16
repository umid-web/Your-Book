import React from 'react';
import './ProfileDangerZone.scss';

const ProfileDangerZone = ({ LogOut, onLogout = () => {}, onDeleteAccount = () => {} }) => {
  return (
    <div className="danger-zone">
      <h3 className="dz-title">Xavfli Zona</h3>
      <div className="dz-buttons">
        <button className="dz-btn" onClick={onDeleteAccount}>
          Hisobni O'chirish
        </button>
        <button className="dz-btn" onClick={onLogout}>
          <LogOut size={16} /> Chiqish
        </button>
      </div>
    </div>
  );
};

export default ProfileDangerZone;
