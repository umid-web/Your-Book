import React from 'react';
import './DashboardHeader.scss';

const DashboardHeader = ({ leftTabs = [], rightTabs = [] }) => {
    return (
        <div className="dashboard-header-tabs">
            <div className="left-tabs">
                {leftTabs.map((tab, index) => (
                    <button key={index} className={`tab ${tab.active ? 'active' : ''}`}>
                        {tab.label || tab.id || tab.icon || tab}
                    </button>
                ))}
            </div>
            <div className="right-tabs">
                {rightTabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab ${tab.id === 'IK' ? 'highlight' : ''}`}
                    >
                        {tab.label || tab.icon || tab.id || tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashboardHeader;
