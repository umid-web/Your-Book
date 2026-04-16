import React from 'react';
import './ErrorMessage.scss';

const ErrorMessage = ({ 
  message, 
  variant = 'error', 
  dismissible = false, 
  onDismiss,
  className = '' 
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 7L13 13M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L18 16H2L10 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="14" r="1" fill="currentColor"/>
          </svg>
        );
      case 'info':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="6" r="1" fill="currentColor"/>
          </svg>
        );
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M6 10L9 13L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`error-message ${variant} ${className}`}>
      <div className="message-content">
        <div className="message-icon">
          {getIcon()}
        </div>
        <div className="message-text">
          {message}
        </div>
      </div>
      {dismissible && (
        <button 
          className="dismiss-btn"
          onClick={onDismiss}
          aria-label="Dismiss message"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
