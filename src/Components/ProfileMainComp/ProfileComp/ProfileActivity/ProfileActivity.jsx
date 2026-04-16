import React from 'react';
import './ProfileActivity.scss';

const ProfileActivity = ({ activities }) => {
  return (
    <div className="widget-card">
      <h3 className="widget-title">So'nggi Faoliyat</h3>
      <div className="act-list">
        {activities.map((activity, index) => (
          <div key={index} className="act-item">
            <div className={`act-dot ${activity.color}`} />
            <div className="act-content">
              <div className="act-action">{activity.action}</div>
              <div className="act-title">{activity.title}</div>
            </div>
            <div className="act-time">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileActivity;
