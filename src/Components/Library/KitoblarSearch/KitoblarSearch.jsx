import React, { useRef } from 'react';
import './KitoblarSearch.scss';

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const GridIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
);

const ListIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

const KitoblarSearch = ({ query, onQueryChange, viewMode, onViewModeChange }) => {
    const inputRef = useRef(null);

    const handleClear = () => {
        onQueryChange('');
        inputRef.current?.focus();
    };

    return (
        <div className="kitoblar-search-wrap">
            <div className="kitoblar-search-bar">
                <div className="ks-input-group">
                    <span className="ks-icon">
                        <SearchIcon />
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="ks-input"
                        placeholder="Kitob yoki muallif qidiring..."
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        aria-label="Kitob qidirish"
                    />
                    {query && (
                        <button className="ks-clear" onClick={handleClear} aria-label="Tozalash">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="ks-view-toggles">
                    <button
                        className={`ks-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => onViewModeChange('grid')}
                        aria-label="Grid ko'rinish"
                        title="Grid"
                    >
                        <GridIcon />
                    </button>
                    <button
                        className={`ks-toggle ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => onViewModeChange('list')}
                        aria-label="List ko'rinish"
                        title="List"
                    >
                        <ListIcon />
                    </button>
                </div>
            </div>

            {/* Live hint */}
            {query && (
                <p className="ks-hint">
                    <span className="ks-query">"{query}"</span> qidirilmoqda...
                </p>
            )}
        </div>
    );
};

export default KitoblarSearch;
