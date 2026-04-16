import React, { useState, useEffect } from 'react';
import './ScrollToTop.scss';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        // Since the layout has overflow-y: auto on .main-content
        const mainContent = document.querySelector('.main-content');
        if (mainContent && mainContent.scrollTop > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        // 1. Try scrolling the main dashboard container
        const mainContent = document.querySelector('.main-content');
        if (mainContent && mainContent.scrollTop > 0) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // 2. Fallback: Scroll the entire window (for Landing/Login pages)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            <button aria-label="Scroll to top">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>
        </div>
    );
};

export default ScrollToTop;
