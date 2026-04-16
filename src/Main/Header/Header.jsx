import React, { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.scss'

const Icons = {
    ChevronLeft: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
        </svg>
    ),
    Search: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    Bell: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),
    Menu: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
        </svg>
    )
};

const Header = ({ onMenuClick, notificationCount = 0 }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isDashboard = location.pathname === '/dashboard' || location.pathname === '/';

    const pageTitle = useMemo(() => {
        const path = location.pathname.split('/')[1];
        if (!path || path === 'dashboard') return 'Asosiy';
        return path.charAt(0).toUpperCase() + path.slice(1);
    }, [location.pathname]);

    return (
        <header className="TopHeader">
            <div className="header-mobile-glass" />

            <div className="header-left">
                {!isDashboard ? (
                    <button 
                        className="header-back-btn" 
                        onClick={() => navigate(-1)}
                        title="Ortga qaytish"
                    >
                        <Icons.ChevronLeft />
                    </button>
                ) : (
                    <div className="header-branding">
                        <div className="logo-icon">👑</div>
                        <span className="brand-name">YouBook</span>
                    </div>
                )}

                <div className="header-desktop-info">
                    <span className="current-page-indicator">{pageTitle}</span>
                </div>
            </div>

            <div className="header-actions">
                <Link to="/search" className="header-action-btn" title="Qidiruv">
                    <Icons.Search />
                </Link>

                <Link to="/profile/notifications" className="header-action-btn" title="Xabarlar">
                    <Icons.Bell />
                    {notificationCount > 0 && (
                        <>
                            <span className="badge">{notificationCount}</span>
                            <span className="badge-ring" />
                        </>
                    )}
                </Link>

                <button className="mobile-menu-toggle" onClick={onMenuClick} aria-label="Open Menu">
                    <Icons.Menu />
                </button>
            </div>
        </header>
    )
}

export default Header
