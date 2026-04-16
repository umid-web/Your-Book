import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Yuklanmoqda...', 
  fullScreen = false,
  className = '' 
}) => {
  return (
    <div className={`loading-spinner ${fullScreen ? 'full-screen' : ''} ${className}`}>
      <div className="spinner-content">
        <svg 
          className={`spinner-icon ${size}`}
          viewBox="0 0 40 40" 
          fill="none"
        >
          <circle 
            cx="20" 
            cy="20" 
            r="16" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeDasharray="8 4" 
            opacity="0.3"
          />
          <path 
            d="M20 4C20 4 20 12 20 20C20 28 20 36 20 36" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
          >
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              from="0 20 20" 
              to="360 20 20" 
              dur="1s" 
              repeatCount="indefinite"
            />
          </path>
        </svg>
        {text && <span className="spinner-text">{text}</span>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
