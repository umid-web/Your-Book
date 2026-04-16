// import React, { useState, useEffect, useRef } from 'react';
// import './SearchBar.scss';

// const SearchBar = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isFocused, setIsFocused] = useState(false);
//     const searchRef = useRef(null);

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleClearSearch = () => {
//         setSearchTerm('');
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setIsFocused(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <section className="SearchBarSection">
//             <div className="container">
//                 <div
//                     ref={searchRef}
//                     className={`search-container ${isFocused ? 'focused' : ''} ${searchTerm ? 'has-content' : ''}`}
//                 >
//                     <div className="search-icon">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <circle cx="11" cy="11" r="8"></circle>
//                             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//                         </svg>
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Kitoblar, mualliflar yoki janrlarni qidiring..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         onFocus={() => setIsFocused(true)}
//                     />
//                     {searchTerm && (
//                         <button className="clear-btn" onClick={handleClearSearch}>
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                                 <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                         </button>
//                     )}
//                     <button className="search-button">
//                         <span>Qidirish</span>
//                     </button>
//                 </div>

//                 <div className="quick-tags">
//                     <span className="tag-label">O'tkir qidiruvlar:</span>
//                     <button className="tag">Fantastika</button>
//                     <button className="tag">Detektiv</button>
//                     <button className="tag">Biznes</button>
//                     <button className="tag">Psixologiya</button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SearchBar;
