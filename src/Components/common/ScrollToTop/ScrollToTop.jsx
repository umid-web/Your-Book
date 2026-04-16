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
        const mainContent = document.querySelector('.main-content');
        
        const scrollElement = (element) => {
            if (!element) return;
            const currentScroll = element.scrollTop || window.pageYOffset;
            if (currentScroll > 0) {
                // Scroll in small chunks for a smoother, slower effect
                const scrollStep = currentScroll / 15; 
                if (element === window) {
                    window.scrollBy(0, -scrollStep);
                } else {
                    element.scrollTop = currentScroll - scrollStep;
                }
                requestAnimationFrame(() => scrollElement(element));
            }
        };

        if (mainContent && mainContent.scrollTop > 0) {
            scrollElement(mainContent);
        } else {
            scrollElement(window);
        }
    };

    useEffect(() => {
        // Keep it visible
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
