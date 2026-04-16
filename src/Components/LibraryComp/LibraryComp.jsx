import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Star, TrendingUp, Clock, Lock, Coins, Filter, Grid, List, ChevronRight, Award, BarChart3 } from 'lucide-react';
import axios from 'axios';
import './LibraryComp.scss';

const LibraryComp = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [libraryData, setLibraryData] = useState({
    stats: { totalBooks: 0, sections: 0, openSections: 0, reading: 0 },
    sections: [],
    categories: [],
    currentReading: null,
    userStats: { booksRead: 0, coinsSpent: 0, hoursSpent: 0 }
  });

  const loadLibraryData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('Library: No token found');
        setLoading(false);
        return;
      }

      console.log('Fetching Django library data...');
      let sectionsData = [];
      let categoriesData = [];
      
      try {
        const [sectionsRes, categoriesRes] = await Promise.all([
          axios.get('/api/library/sections/', { headers: { 'Authorization': `Bearer ${token}` } }),
          axios.get('/api/library/categories/', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);
        sectionsData = sectionsRes.data;
        categoriesData = categoriesRes.data;
      } catch (e) {
        console.warn('Backend failed, using mock library sections...');
        const baseKarats = [375, 416, 500, 583, 625, 666, 750, 791, 833, 875, 916, 958, 990, 999.9];
        sectionsData = baseKarats.map((k, i) => ({
          id: i + 1,
          karat_requirement: k,
          is_locked: i >= 3,
          is_completed: i < 2,
          progress: i === 2 ? 45 : 0,
          book_count: parseInt(localStorage.getItem(`sec_${i+1}_books`) || '4')
        }));
        categoriesData = [
          { id: 1, name: 'Biznes' }, { id: 2, name: 'Psixologiya' }, { id: 3, name: 'Badiiy' }
        ];
      }
      
      const mappedSections = sectionsData.map(sec => ({
        id: sec.id || 0,
        karat: sec.karat_requirement || 0,
        progress: sec.progress || 0,
        status: sec.is_locked ? 'locked' : (sec.is_completed ? 'open' : 'active'),
        book_count: sec.book_count || 4
      }));

      setLibraryData(prev => ({
        ...prev,
        sections: mappedSections,
        categories: categoriesData,
        stats: {
          totalBooks: mappedSections.reduce((acc, sec) => acc + (sec.book_count || 0), 0),
          sections: mappedSections.length,
          openSections: mappedSections.filter(s => s.status !== 'locked').length,
          reading: mappedSections.filter(s => s.status === 'active').length
        }
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error in library flow:', error);
      setLoading(false);
    }
  };

  const updateBookCount = (sectionId, delta) => {
    setLibraryData(prev => {
      const updated = prev.sections.map(sec => {
        if (sec.id === sectionId) {
          const newCount = Math.max(1, Math.min(20, sec.book_count + delta));
          localStorage.setItem(`sec_${sectionId}_books`, newCount);
          return { ...sec, book_count: newCount };
        }
        return sec;
      });
      return { ...prev, sections: updated };
    });
  };

  useEffect(() => {
    loadLibraryData();
  }, []);



  const formatKarat = (karat) => {
    // If karat is already a string like "999.9K", return as is
    if (typeof karat === 'string' && karat.includes('K')) {
      return karat;
    }
    // Convert number to string with K suffix
    const num = parseFloat(karat);
    return `${num}K`;
  };

  const generateSections = () => {
    return Array.from({ length: 16 }, (_, i) => {
      const baseKarats = [375, 416, 500, 583, 625, 666, 750, 791, 833, 875, 916, 958, 990, 999.5, 999.9];
      const karat = baseKarats[i] || Math.floor(Math.random() * (999900 - 375) + 375) / 10;
      return {
        id: i + 1,
        karat: karat,
        progress: Math.floor(Math.random() * 100),
        status: i < 8 ? 'open' : i === 8 ? 'active' : 'locked',
        books: generateBooksForSection(i + 1)
      };
    });
  };

  const generateBooksForSection = (sectionId) => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: `${sectionId}-${i + 1}`,
      title: `Kitob ${sectionId}.${i + 1}`,
      author: `Muallif ${sectionId}`,
      cover: `/images/books/book${sectionId}${i + 1}.jpg`,
      price: Math.floor(Math.random() * 500) + 50,
      rating: 4 + Math.random()
    }));
  };

  const handleSectionClick = async (section) => {
    if (section.status === 'locked') {
      const confirmPurchase = window.confirm(`Bo'lim ${section.id} ni ${section.karat} Karat evaziga ochasizmi?`);
      if (confirmPurchase) {
        try {
          const token = localStorage.getItem('access_token');
          const response = await axios.post('/api/library/buy-section/', 
            { section_id: section.id },
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          
          if (response.data.status === 'success') {
            alert(response.data.message);
            // Ma'lumotlarni qayta yuklash
            loadLibraryData(); 
          }

        } catch (error) {
          console.error('Purchase error:', error);
          alert(error.response?.data?.error || 'Xatolik yuz berdi');
        }
      }
      return;
    }
    
    // Agar bo'lim ochiq bo'lsa, uning kitoblarini backenddan yuklash
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`/api/library/section-books/${section.id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const sectionWithBooks = {
        ...section,
        books: response.data
      };
      
      setSelectedSection(sectionWithBooks);
      setShowBookDialog(true);
    } catch (error) {
      console.error('Error fetching section books:', error);
      if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          window.location.href = '/login';
          return;
      }
      alert('Bo\'lim kitoblarini yuklab bo\'lmadi');
    }
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setCategoryBooks([]);
    setCategoryLoading(true);
    setShowCategoryDialog(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`/api/library/categories/${category.id}/books/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCategoryBooks(response.data || []);
    } catch (error) {
      console.error('Category books error:', error);
      setCategoryBooks([]);
    } finally {
      setCategoryLoading(false);
    }
  };


  const handleBookSelect = async (book) => {
    console.log('Opening book:', book);
    const token = localStorage.getItem('access_token');
    
    // Kitobni yangi tabda ochish (PDF stream)
    const readUrl = `/api/library/read/${book.id}/`;
    
    // Tokenni header orqali yuborish uchun blob dan foydalanishimiz mumkin 
    // yoki URL ga token qo'shish (Xavfsizlik uchun blob yaxshi)
    try {
      const response = await axios.get(readUrl, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const fileUrl = URL.createObjectURL(response.data);
      window.open(fileUrl, '_blank');
      
      // O'qish progressini yangilash (ixtiyoriy, masalan 1 bet deb hisoblaymiz hozircha)
      await axios.post('/api/library/update-progress/', 
        { pages_read: 1 },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
    } catch (error) {
      console.error('Error reading book or updating progress:', error);
      if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          window.location.href = '/login';
          return;
      }
      alert(error.response?.status === 403 ? "Avval bo'limni sotib oling" : "Kitobni ochib bo'lmadi");
    }
  };


  // Search effect (Debounced)
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timer = setTimeout(async () => {
        try {
          const token = localStorage.getItem('access_token');
          const res = await axios.get(`/api/library/search/?q=${searchQuery}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          console.log('Search results:', res.data);
          // Topilgan kitoblarni konsolga chiqarish (test uchun)
        } catch (err) {
          console.error('Search error:', err);
          if (err.response?.status === 401) {
              localStorage.removeItem('access_token');
              window.location.href = '/login';
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const filteredSections = libraryData.sections.filter(section =>
    section.id.toString().includes(searchQuery) ||
    (section.karat && section.karat.toString().includes(searchQuery))
  );

  return (
    <div className="library-comp">
      <div className="library-content">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Kitob yoki muallif qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card amber-gradient">
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{libraryData.stats.totalBooks}</div>
              <div className="stat-label">Jami Kitoblar</div>
            </div>
          </div>

          <div className="stat-card blue-gradient">
            <div className="stat-icon">
              <Star size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{libraryData.stats.sections}</div>
              <div className="stat-label">Bo'limlar</div>
            </div>
          </div>

          <div className="stat-card green-gradient">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{libraryData.stats.openSections}</div>
              <div className="stat-label">Ochiq Bo'lim</div>
            </div>
          </div>

          <div className="stat-card purple-gradient">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{libraryData.stats.reading}</div>
              <div className="stat-label">O'qilmoqda</div>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="sections-container">
          <div className={`sections-grid ${viewMode}`}>
            {filteredSections.map((section) => (
              <div
                key={section.id}
                className={`section-card ${section.status}`}
                onClick={() => handleSectionClick(section)}
              >
                {section.status === 'locked' && (
                  <div className="lock-overlay">
                    <Lock size={32} />
                  </div>
                )}

                <div className="section-header">
                  <span className="section-number">Bo'lim {section.id}</span>
                  {section.status === 'locked' && <Lock size={16} />}
                </div>

                <div className="section-karat">{formatKarat(section.karat)} Karat</div>

                <div className="book-count-selector" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => updateBookCount(section.id, -1)} disabled={section.status === 'locked'}>-</button>
                  <div className="count-display">
                    <span className="count-val">{section.book_count}</span>
                    <span className="count-label">kitob</span>
                  </div>
                  <button onClick={() => updateBookCount(section.id, 1)} disabled={section.status === 'locked'}>+</button>
                </div>

                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${section.progress}%` }}
                    />
                  </div>
                  <span className="progress-text">{section.progress}%</span>
                </div>

                <button className="start-sec-btn" onClick={() => navigate('/reader')}>
                  Boshlash
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Book Selection Dialog */}
        {showBookDialog && selectedSection && (
          <div className="book-dialog-overlay" onClick={() => setShowBookDialog(false)}>
            <div className="book-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="dialog-header">
                <h3>Bo'lim {selectedSection.id} - Kitoblar</h3>
                <button className="close-btn" onClick={() => setShowBookDialog(false)}>
                  ×
                </button>
              </div>

              <div className="books-grid">
                {selectedSection.books.map((book) => (
                  <div
                    key={book.id}
                    className="book-card"
                    onClick={() => handleBookSelect(book)}
                  >
                    <div className="book-cover">
                      <img src={book.cover} alt={book.title} onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${book.id}/160/224.jpg`;
                      }} />
                    </div>
                    <div className="book-info">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-author">{book.author}</p>
                      <div className="book-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < Math.floor(book.rating) ? 'filled' : 'empty'}
                          />
                        ))}
                      </div>
                      <div className="book-price">
                        <Coins size={14} />
                        <span>{book.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="purchase-btn">
                Sotib Olish
              </button>
            </div>
          </div>
        )}
      </div>

        {/* Category Books Dialog */}
        {showCategoryDialog && selectedCategory && (
          <div className="book-dialog-overlay" onClick={() => setShowCategoryDialog(false)}>
            <div className="book-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="dialog-header">
                <h3>{selectedCategory.name} — Kitoblar</h3>
                <button className="close-btn" onClick={() => setShowCategoryDialog(false)}>×</button>
              </div>
              {categoryLoading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Yuklanmoqda...</div>
              ) : categoryBooks.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Bu kategoriyada kitob topilmadi.</div>
              ) : (
                <div className="books-grid">
                  {categoryBooks.map((book) => (
                    <div key={book.id} className="book-card" onClick={() => handleBookSelect(book)}>
                      <div className="book-cover">
                        <img src={book.cover} alt={book.title} onError={(e) => {
                          e.target.src = `https://picsum.photos/seed/${book.id}/160/224`;
                        }} />
                      </div>
                      <div className="book-info">
                        <h4 className="book-title">{book.title}</h4>
                        <p className="book-author">{book.author}</p>
                        <div className="book-rating">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={12} className={i < Math.floor(book.rating || 4) ? 'filled' : 'empty'} />
                          ))}
                        </div>
                        <div className="book-price">
                          <Coins size={14} />
                          <span>{book.price || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      {/* Right Sidebar */}
      <div className="library-sidebar">
        {/* Your Balance */}
        <div className="balance-card blue-purple-gradient">
          <div className="balance-header">
            <span className="balance-label">Your Balance</span>
            <Coins size={24} />
          </div>
          <div className="balance-amount">{libraryData.userStats.coinsSpent}</div>
          <div className="balance-coins">Coins</div>
        </div>

        {/* How it Works */}
        <div className="how-it-works">
          <h3>Qanday ishlaydi</h3>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <span>Bo'lim tanla</span>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <span>Sotib ol</span>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <span>O'qi</span>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="categories">
          <h3>Mashhur Kategoriyalar</h3>
          <div className="category-list">
            {libraryData.categories.map((category, index) => (
              <div
                key={category.id || index}
                className="category-item"
                onClick={() => handleCategoryClick(category)}
                style={{ cursor: 'pointer' }}
              >
                <span>{category.name}</span>
                <ChevronRight size={14} />
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="user-stats">
          <h3>Statistika</h3>
          <div className="stats-list">
            <div className="stat-item">
              <BookOpen size={16} />
              <span>O'qilgan: {libraryData.userStats.booksRead} kitob</span>
            </div>
            <div className="stat-item">
              <Coins size={16} />
              <span>Sarflangan: {libraryData.userStats.coinsSpent} coins</span>
            </div>
            <div className="stat-item">
              <Clock size={16} />
              <span>Vaqt: {libraryData.userStats.hoursSpent} soat</span>
            </div>
          </div>
        </div>

        {/* Currently Reading */}
        {libraryData.currentReading && (
          <div className="current-reading blue-purple-gradient">
            <div className="reading-header">
              <h3>Hozir O'qilmoqda</h3>
            </div>
            <div className="reading-content">
              <div className="reading-cover">
                <img src={libraryData.currentReading.cover} alt={libraryData.currentReading.title} />
              </div>
              <div className="reading-info">
                <h4>{libraryData.currentReading.title}</h4>
                <p>{libraryData.currentReading.author}</p>
                <div className="reading-badges">
                  <span className="badge">Bo'lim {libraryData.currentReading.section}</span>
                  <span className="badge">{formatKarat(libraryData.currentReading.karat)} Karat</span>
                </div>
                <div className="reading-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${libraryData.currentReading.progress}%` }}
                    />
                  </div>
                  <span>{libraryData.currentReading.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryComp;
