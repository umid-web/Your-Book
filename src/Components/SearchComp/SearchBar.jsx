import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

// Icons
const Icons = {
    Search: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    Close: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    Spinner: () => (
        <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2 L12 6" />
        </svg>
    )
};

const SearchBar = ({
    onSearch,
    onTagClick,
    onFocus,
    onBlur,
    placeholder = "Kitoblar, mualliflar yoki janrlarni qidiring...",
    initialValue = "",
    debounceTime = 500,
    minSearchLength = 2,
    maxSearchLength = 100,
    isLoading = false,
    className = "",
    recentSearches = [],
    popularSearches = [],
    showRecentSearches = true,
    showPopularSearches = true,
    showKeyboardHint = true,
    suggestions = [],
    onSuggestionClick,
    ...props
}) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const debounceTimerRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Qidiruvni tozalash
    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        inputRef.current?.focus();

        // Backendga bo'sh qidiruv yuborish
        if (onSearch) {
            onSearch('');
        }

        // Analytics event
        if (window.gtag) {
            window.gtag('event', 'search_cleared', {
                event_category: 'Search',
                event_label: 'Manual Clear'
            });
        }
    }, [onSearch]);

    // Backendga qidiruv so'rovini yuborish
    const performSearch = useCallback(async (query) => {
        if (!onSearch) return;

        try {
            // Qidiruvni backendga yuborish
            const searchParams = {
                query: query.trim(),
                filters: {
                    // Qo'shimcha filterlar
                },
                page: 1,
                limit: 20
            };

            await onSearch(searchParams);

        } catch (error) {
            console.error('Search error:', error);
            
            // Error tracking
            if (window.Sentry) {
                window.Sentry.captureException(error);
            }
        }
    }, [onSearch]);

    // Styles ni DOM ga qo'shish
    useEffect(() => {
        if (!document.getElementById('searchbar-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'searchbar-styles';
            styleElement.textContent = `
                .search-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                .search-container.focused {
                    border-color: #aaa;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                }
                
                .search-container.has-content {
                    padding-right: 30px;
                }
                
                .search-icon {
                    margin-right: 10px;
                }
                
                .search-input {
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                }
                
                .search-input:focus {
                    outline: none;
                }
                
                .suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                .suggestion {
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    cursor: pointer;
                }
                
                .suggestion:hover {
                    background-color: #f0f0f0;
                }
                
                .suggestion.active {
                    background-color: #e0e0e0;
                }
            `;
            document.head.appendChild(styleElement);
        }

        return () => {
            const styleElement = document.getElementById('searchbar-styles');
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    // Input fokusini boshqarish
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        
        // Uzunlik cheklovi
        if (value.length > maxSearchLength) return;
        
        setSearchTerm(value);
        setActiveSuggestionIndex(-1);

        // Suggestions ni ko'rsatish
        if (value.trim().length >= minSearchLength) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }

        // Debounced qidiruv
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            if (value.trim().length >= minSearchLength) {
                performSearch(value);
            } else if (value.trim().length === 0) {
                performSearch('');
            }
        }, debounceTime);
    }, [debounceTime, minSearchLength, maxSearchLength, performSearch]);

    // Tag bosilganda
    const handleTagClick = useCallback(async (tag) => {
        setSearchTerm(tag.label);
        setShowSuggestions(false);

        if (onTagClick) {
            onTagClick(tag);
        }

        // Backendga qidiruv yuborish
        await performSearch(tag.label);

        // Analytics
        if (window.gtag) {
            window.gtag('event', 'tag_search', {
                event_category: 'Search',
                event_label: tag.label,
                tag_category: tag.category
            });
        }
    }, [performSearch, onTagClick]);

    // Suggestion bosilganda
    const handleSuggestionClick = useCallback(async (suggestion) => {
        setSearchTerm(suggestion.label);
        setShowSuggestions(false);

        if (onSuggestionClick) {
            onSuggestionClick(suggestion);
        }

        await performSearch(suggestion.label);
    }, [performSearch, onSuggestionClick]);

    // Keyboard navigation for suggestions
    const handleKeyDown = useCallback((e) => {
        if (!showSuggestions || !suggestions.length) return;

        // Arrow down
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestionIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        }
        
        // Arrow up
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        }
        
        // Enter
        else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[activeSuggestionIndex]);
        }
        
        // Escape
        else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setActiveSuggestionIndex(-1);
        }
    }, [showSuggestions, suggestions, activeSuggestionIndex, handleSuggestionClick]);

    // Qidiruv formasini submit qilish
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (searchTerm.trim().length >= minSearchLength) {
            await performSearch(searchTerm);

            // Analytics
            if (window.gtag) {
                window.gtag('event', 'search_submit', {
                    event_category: 'Search',
                    event_label: searchTerm,
                    search_term: searchTerm,
                    search_length: searchTerm.length
                });
            }
        }
    }, [searchTerm, minSearchLength, performSearch]);

    // Keyboard shortcut (Ctrl+K)
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            
            if (e.key === 'Escape' && isFocused) {
                inputRef.current?.blur();
                setShowSuggestions(false);
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isFocused]);

    // Click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
                setShowSuggestions(false);
                
                if (onBlur) {
                    onBlur();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onBlur]);

    // Focus event
    const handleFocus = useCallback(() => {
        setIsFocused(true);
        if (onFocus) {
            onFocus();
        }
    }, [onFocus]);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    // Scroll active suggestion into view
    useEffect(() => {
        if (activeSuggestionIndex >= 0 && suggestionsRef.current) {
            const activeElement = suggestionsRef.current.children[activeSuggestionIndex];
            if (activeElement) {
                activeElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                });
            }
        }
    }, [activeSuggestionIndex]);

    // Memoized class names
    const searchContainerClasses = useMemo(() =>
        `search-container ${isFocused ? 'focused' : ''} ${searchTerm ? 'has-content' : ''} ${className}`,
        [isFocused, searchTerm, className]
    );

    return (
        <section
            className={`search-bar-section ${isLoading ? 'loading' : ''}`}
            aria-label="Qidiruv bo'limi"
            {...props}
        >
            <div className="container">
                <form
                    className={searchContainerClasses}
                    onSubmit={handleSubmit}
                    ref={searchRef}
                    role="search"
                >
                    <div className="search-icon">
                        <Icons.Search />
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        aria-label="Qidiruv matni"
                        aria-autocomplete="list"
                        aria-controls="search-suggestions"
                        aria-expanded={showSuggestions}
                        autoComplete="off"
                        disabled={isLoading}
                        maxLength={maxSearchLength}
                    />

                    {searchTerm && !isLoading && (
                        <button
                            type="button"
                            className="clear-btn"
                            onClick={handleClearSearch}
                            aria-label="Qidiruvni tozalash"
                        >
                            <Icons.Close />
                        </button>
                    )}

                    {isLoading && (
                        <div className="searching-indicator" aria-label="Qidirilmoqda...">
                            <Icons.Spinner />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="search-button"
                        aria-label="Qidirish"
                        disabled={isLoading || searchTerm.trim().length < minSearchLength}
                    >
                        <span>Qidirish</span>
                    </button>
                </form>

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div 
                        className="suggestions-dropdown"
                        id="search-suggestions"
                        role="listbox"
                        ref={suggestionsRef}
                        aria-label="Qidiruv takliflari"
                    >
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={suggestion.id || index}
                                className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                role="option"
                                aria-selected={index === activeSuggestionIndex}
                                tabIndex={-1}
                            >
                                {suggestion.icon && (
                                    <span className="suggestion-icon">{suggestion.icon}</span>
                                )}
                                <span className="suggestion-label">{suggestion.label}</span>
                                {suggestion.category && (
                                    <span className="suggestion-category">{suggestion.category}</span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Recent searches */}
                {showRecentSearches && recentSearches.length > 0 && isFocused && !searchTerm && (
                    <div className="recent-searches">
                        <h4 className="recent-searches-title">Oxirgi qidiruvlar</h4>
                        <div className="recent-searches-list">
                            {recentSearches.map((search, index) => (
                                <button
                                    key={index}
                                    className="recent-search-item"
                                    onClick={() => {
                                        setSearchTerm(search);
                                        performSearch(search);
                                    }}
                                >
                                    <Icons.Search />
                                    <span>{search}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Popular searches */}
                {showPopularSearches && popularSearches.length > 0 && isFocused && !searchTerm && (
                    <div className="popular-searches">
                        <h4 className="popular-searches-title">Ommabop qidiruvlar</h4>
                        <div className="popular-searches-list">
                            {popularSearches.map((search, index) => (
                                <button
                                    key={index}
                                    className="popular-search-item"
                                    onClick={() => {
                                        setSearchTerm(search);
                                        performSearch(search);
                                    }}
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Keyboard shortcut hint */}
                {showKeyboardHint && !isFocused && (
                    <div className="keyboard-hint" aria-hidden="true">
                        <kbd>⌘</kbd> + <kbd>K</kbd>
                    </div>
                )}
            </div>
        </section>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onTagClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSuggestionClick: PropTypes.func,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    debounceTime: PropTypes.number,
    minSearchLength: PropTypes.number,
    maxSearchLength: PropTypes.number,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
    recentSearches: PropTypes.arrayOf(PropTypes.string),
    popularSearches: PropTypes.arrayOf(PropTypes.string),
    showRecentSearches: PropTypes.bool,
    showPopularSearches: PropTypes.bool,
    showKeyboardHint: PropTypes.bool,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string.isRequired,
        icon: PropTypes.node,
        category: PropTypes.string
    }))
};

SearchBar.defaultProps = {
    onTagClick: () => { },
    onFocus: () => { },
    onBlur: () => { },
    onSuggestionClick: () => { },
    placeholder: "Kitoblar, mualliflar yoki janrlarni qidiring...",
    initialValue: "",
    debounceTime: 500,
    minSearchLength: 2,
    maxSearchLength: 100,
    isLoading: false,
    className: "",
    recentSearches: [],
    popularSearches: [],
    showRecentSearches: true,
    showPopularSearches: true,
    showKeyboardHint: true,
    suggestions: []
};

// Inline styles
const styles = `
.search-bar-section {
  padding: 2.5rem 0;
  padding-top: calc(80px + 2.5rem);
  background: #000b18;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.search-bar-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  background: #001529;
  border: 2px solid transparent;
  border-radius: 100px;
  padding: 0.6rem 0.8rem 0.6rem 1.7rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  gap: 1rem;
}

.search-container.focused {
  border-color: #FFD700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.15);
  transform: translateY(-2px);
  background: #000b18;
}

.search-container input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #ffffff;
  padding: 0.8rem 0;
  font-weight: 500;
  outline: none;
}

.search-container input::placeholder {
  color: #6c757d;
  transition: all 0.3s ease;
  font-weight: 400;
}

.search-container .search-button {
  background: linear-gradient(135deg, #FFD700, #D4AF37);
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.25);
}

.search-container .search-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  background: #000b18;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  overflow: hidden;
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.5rem;
  width: 100%;
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.suggestion-item:hover,
.suggestion-item.active {
  background: rgba(255, 215, 0, 0.1);
}

.suggestion-item .suggestion-label {
  color: #FFD700;
}

@media (max-width: 768px) {
  .search-bar-section {
    padding-top: calc(70px + 1.5rem);
    padding: 1.5rem 0;
  }
  
  .search-container {
    padding: 0.4rem 0.5rem 0.4rem 1.2rem;
    gap: 0.5rem;
  }
  
  .search-container .search-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.85rem;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

export default React.memo(SearchBar);
