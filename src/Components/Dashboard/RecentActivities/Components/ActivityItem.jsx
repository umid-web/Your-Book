import React from 'react';

const ActivityItem = ({ activity }) => (
    <div className="activity-item">
        <div className="activity-icon" style={{ backgroundColor: `${activity.color || 'var(--accent-primary)'}22` }}>
            {activity.image ? (
                <img src={activity.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
            ) : (
                <>
                    {activity.type === 'book' && '📚'}
                    {activity.type === 'wallet' && '💰'}
                    {activity.type === 'edu' && '📖'}
                    {activity.type === 'award' && '🏆'}
                </>
            )}
        </div>
        <div className="activity-value" style={{ color: activity.color || 'var(--accent-primary)' }}>
            {activity.value || '99,0.9'}
        </div>
        <div className="activity-details">
            <div className="activity-title">{activity.title}</div>
            <div className="activity-subtitle">{activity.subtitle}</div>
        </div>
        <div className="activity-tag">
            {activity.tag || 'Coral'}
        </div>
    </div>
);

export default ActivityItem;
