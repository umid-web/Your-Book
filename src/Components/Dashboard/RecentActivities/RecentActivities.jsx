import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ActivityItem from './Components/ActivityItem';
import './RecentActivities.scss';

const RecentActivities = ({
    title = "Proba",
    activities = []
}) => {
    console.log('RecentActivities received:', { title, activities });
    const [isOpen, setIsOpen] = useState(false);

    if (!activities || activities.length === 0) return null;

    return (
        <div className="recent-activities">
            <div className="section-header">
                <h2>{title}</h2>
                <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
                    <span>Geviş</span>
                    <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        className={isOpen ? 'rotated' : ''}
                    >
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            <div className="activities-list">
                {activities.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
};

RecentActivities.propTypes = {
    title: PropTypes.string,
    activities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string,
        value: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        tag: PropTypes.string,
        color: PropTypes.string,
    })),
};

export default RecentActivities;
