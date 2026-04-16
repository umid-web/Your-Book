import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { useTheme } from '../../Context/ThemeContext'
import './Navbar.scss'

const Icons = {
    Home: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    Library: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    ),
    Tests: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
    ),
    Wallet: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
    ),
    Coins: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="6" />
            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
            <path d="M7 6h1v4" />
        </svg>
    ),
    User: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Logout: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),
    Search: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    ChevronDown: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    ),
    Sun: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    ),
    Moon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    ),
    Command: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
    ),
    X: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    Activity: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    )
}

const Navbar = ({ onMobileClose = () => { }, isCollapsed, onToggleCollapse, onWalletFill }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const { isDarkMode, toggleTheme } = useTheme()

    const [searchQuery, setSearchQuery] = useState('')
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [userStatus, setUserStatus] = useState('online')
    const [expandedGroups, setExpandedGroups] = useState(['Asosiy', 'Moliya', 'Xizmatlar'])
    const [recentPaths, setRecentPaths] = useState([])
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [userProgress, setUserProgress] = useState({ label: 'PRO', percentage: 0 })
    const profileMenuRef = useRef(null)
    const searchInputRef = useRef(null)

    // Fetch IQ progress from backend for progress card
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = localStorage.getItem('access_token')
                if (!token) return
                const res = await axios.get('/auth/home/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const stats = res.data?.learning_stats
                if (stats) {
                    setUserProgress({
                        label: stats.iq_rank_name || `IQ Lv.${stats.iq_level || 1}`,
                        percentage: stats.iq_progress || stats.iq_progress_percentage || 0
                    })
                }
            } catch (e) {
                // silently fail
            }
        }
        fetchProgress()
    }, [user])

    // Track recent navigation
    useEffect(() => {
        const path = location.pathname
        if (path && path !== '/login' && path !== '/register') {
            setRecentPaths(prev => {
                const filtered = prev.filter(p => p !== path)
                return [path, ...filtered].slice(0, 3)
            })
        }
    }, [location.pathname])

    // Focus search input when sidebar expands
    useEffect(() => {
        if (!isCollapsed && searchQuery === '') {
            const timer = setTimeout(() => searchInputRef.current?.focus(), 200)
            return () => clearTimeout(timer)
        }
    }, [isCollapsed, searchQuery])

    // Keyboard shortcut for search (Ctrl+K / Cmd+K)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault()
            if (isCollapsed) {
                onToggleCollapse()
            } else {
                searchInputRef.current?.focus()
            }
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isCollapsed, onToggleCollapse])

    const isActive = useCallback((path) => {
        const currentPath = location.pathname
        if (path === '/dashboard') {
            return currentPath === '/dashboard' || currentPath === '/'
        }
        return currentPath === path || currentPath.startsWith(path + '/')
    }, [location.pathname])

    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true)
        try {
            await logout()
            navigate('/login')
        } catch (err) {
            console.error('Logout failed:', err)
            setIsLoggingOut(false)
        }
    }, [logout, navigate])

    const toggleGroup = (title) => {
        if (isCollapsed) return
        setExpandedGroups(prev =>
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        )
    }

    const navigationGroups = useMemo(() => [
        {
            title: 'Asosiy',
            items: [
                { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: Icons.Home, count: null },
                { id: 'library', name: 'Kutubxona', path: '/library', icon: Icons.Library, count: 12 },
            ]
        },
        {
            title: 'Moliya',
            items: [
                { id: 'vault', name: 'Hamyon', path: '/vault', icon: Icons.Wallet, count: null },
                { id: 'wallet-coin', name: 'Coin Hamyon', path: '/coin-wallet', icon: Icons.Coins, count: null },
                { id: 'fill-coin', name: 'To\'ldirish', action: 'fill', icon: Icons.Activity, count: 'New' },
            ]
        },
        {
            title: 'Xizmatlar',
            items: [
                { id: 'tests', name: 'IQ Testlar', path: '/iq-test', icon: Icons.Tests, count: 'Hot' },
                { id: 'profile', name: 'Profil', path: '/profile', icon: Icons.User, count: null },
            ]
        }
    ], [])

    const filteredGroups = useMemo(() => {
        if (!searchQuery) return navigationGroups
        return navigationGroups.map(group => ({
            ...group,
            items: group.items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(group => group.items.length > 0)
    }, [searchQuery, navigationGroups])

    const getPathName = (path) => {
        for (const group of navigationGroups) {
            const item = group.items.find(i => i.path === path)
            if (item) return item.name
        }
        return path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)
    }

    return (
        <aside className={`nav-sidebar ${isCollapsed ? 'nav-sidebar--collapsed' : ''}`}>
            {/* 01. Glass Header with Advanced Logo */}
            <div className="nav-sidebar__header">
                <div className="nav-sidebar__logo" onClick={() => navigate('/dashboard')}>
                    <div className="logo-orb" />
                    <div className="logo-icon">👑</div>
                    <div className="logo-stack">
                        <span className="brand">YouBook</span>
                        <span className="suffix">Empire v2</span>
                    </div>
                </div>
                <div className="nav-sidebar__header-actions">
                    <button
                        className="nav-sidebar__close-btn"
                        onClick={onMobileClose}
                        title="Close Sidebar"
                    >
                        <Icons.X />
                    </button>
                    <div className="nav-sidebar__command-icon">
                        <Icons.Command />
                    </div>
                </div>
            </div>

            {/* 02. Interactive Search Area */}
            <div className={`nav-sidebar__search-wrap ${isCollapsed ? 'nav-sidebar__search-wrap--mini' : ''}`}>
                <div className="search-box" onClick={() => isCollapsed && onToggleCollapse()}>
                    <Icons.Search />
                    {!isCollapsed && (
                        <>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Navigate anywhere..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <kbd>⌘K</kbd>
                        </>
                    )}
                </div>
            </div>

            {/* 03. Scrollable Navigation Core */}
            <div className="nav-sidebar__scroller">
                {/* Collapsible Groups */}
                {filteredGroups.map((group, gIdx) => (
                    <div key={gIdx} className={`nav-sidebar__group ${!expandedGroups.includes(group.title) ? 'nav-sidebar__group--collapsed' : ''}`}>
                        {!isCollapsed && (
                            <button className="group-header" onClick={() => toggleGroup(group.title)}>
                                <span className="title">{group.title}</span>
                                <span className="arrow"><Icons.ChevronDown /></span>
                            </button>
                        )}
                        <div className="group-content">
                            {group.items.map((item) => {
                                const isAction = item.action === 'fill';
                                const content = (
                                    <>
                                        <div className="nav-item__icon">
                                            <item.icon />
                                            {isCollapsed && item.count && <div className="dot-indicator" />}
                                        </div>
                                        {!isCollapsed && (
                                            <>
                                                <span className="nav-item__text">{item.name}</span>
                                                {item.count && <span className="nav-item__badge">{item.count}</span>}
                                            </>
                                        )}
                                        {isCollapsed && <div className="floating-hint">{item.name}</div>}
                                    </>
                                );

                                if (isAction) {
                                    return (
                                        <button
                                            key={item.id}
                                            className="nav-item nav-item--action"
                                            onClick={() => {
                                                onWalletFill();
                                                onMobileClose();
                                            }}
                                            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                                        >
                                            {content}
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.id}
                                        to={item.path}
                                        className={`nav-item ${isActive(item.path) ? 'nav-item--active' : ''}`}
                                        onClick={onMobileClose}
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Advanced: Recent Activity Section */}
                {!isCollapsed && recentPaths.length > 0 && !searchQuery && (
                    <div className="nav-sidebar__recent">
                        <h4 className="section-label">Oxirgi harakatlar</h4>
                        <div className="recent-list">
                            {recentPaths.map(path => (
                                <Link key={path} to={path} className="recent-item">
                                    <Icons.Activity />
                                    <span>{getPathName(path)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 04. Premium Footer Experience */}
            <div className="nav-sidebar__footer">
                {/* Advanced Progress Card Integration (Conditional) */}
                {!isCollapsed && (
                    <div className="nav-sidebar__progress-card">
                        <div className="progress-info">
                            <span>Sizning darajangiz</span>
                            <strong>{userProgress.label} • {userProgress.percentage}%</strong>
                        </div>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar-fill" style={{ width: `${userProgress.percentage}%` }} />
                        </div>
                    </div>
                )}

                <div className="footer-actions">
                    <button className={`theme-btn ${isDarkMode ? 'is-dark' : 'is-light'}`} onClick={toggleTheme}>
                        <div className="btn-inner">
                            {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
                            {!isCollapsed && <span>{isDarkMode ? 'Yorug\' rejim' : 'Tungi rejim'}</span>}
                        </div>
                    </button>

                    <div 
                        className={`profile-segment ${isProfileMenuOpen ? 'profile-segment--active' : ''}`} 
                        ref={profileMenuRef}
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        <div className="avatar-wrap">
                            <span className="avatar-initials">
                                {user?.first_name?.[0] || user?.full_name?.[0] || 'U'}
                            </span>
                            <div className={`status-orb status-orb--${userStatus}`} />
                        </div>
                        {!isCollapsed && (
                            <div className="user-details">
                                <span className="name">
                                    {user?.full_name || user?.first_name || user?.username || 'Foydalanuvchi'}
                                </span>
                                <span className="status-text">{userStatus === 'online' ? 'ONLINE' : 'Band'}</span>
                            </div>
                        )}

                        {/* Professional Dropdown Menu */}
                        <div className={`dropdown-menu ${isProfileMenuOpen ? 'dropdown-menu--open' : ''}`}>
                            <div className="dropdown-header">
                                <div className="header-info">
                                    <span className="full-name">
                                        {user?.full_name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'Foydalanuvchi'}
                                    </span>
                                    <span className="user-email">{user?.email || user?.phone_number}</span>
                                </div>
                                <div className="badge-premium">{user?.is_premium ? 'PREMIUM' : 'FREE'}</div>
                            </div>
                            
                            <div className="dropdown-divider" />
                            
                            <div className="dropdown-body">
                                <button className="dropdown-item" onClick={() => navigate('/profile')}>
                                    <div className="item-icon"><Icons.User /></div>
                                    <div className="item-text">
                                        <span className="label">Mening profilim</span>
                                        <span className="desc">Shaxsiy ma'lumotlar</span>
                                    </div>
                                </button>
                                
                                <button className="dropdown-item" onClick={() => navigate('/vault')}>
                                    <div className="item-icon"><Icons.Wallet /></div>
                                    <div className="item-text">
                                        <span className="label">Hamyon</span>
                                        <span className="desc">Tranzaksiyalar va hisob</span>
                                    </div>
                                </button>
                                
                                <button className="dropdown-item" onClick={() => navigate('/profile/security')}>
                                    <div className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </div>
                                    <div className="item-text">
                                        <span className="label">Xavfsizlik</span>
                                        <span className="desc">Parol va himoya</span>
                                    </div>
                                </button>
                                
                                <button className="dropdown-item" onClick={() => navigate('/profile/notifications')}>
                                    <div className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                        </svg>
                                    </div>
                                    <div className="item-text">
                                        <span className="label">Bildirishnomalar</span>
                                        <span className="desc">Xabarlar va sozlamalar</span>
                                    </div>
                                </button>
                            </div>
                            
                            <div className="dropdown-divider" />
                            
                            <div className="dropdown-footer">
                                <button className="logout-action" onClick={(e) => { e.stopPropagation(); handleLogout(); }} disabled={isLoggingOut}>
                                    <Icons.Logout />
                                    <span>Tizimdan chiqish</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default React.memo(Navbar)