import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Library, Wallet, User, Settings, Crown, Bell, BrainCircuit, BookOpen, Search as SearchIcon } from 'lucide-react'
import './Search.scss'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  // Navigation Pages Data
  const navigationPages = [
    { id: 'p1', type: 'page', title: 'Asosiy Sahifa', path: '/dashboard', icon: LayoutDashboard, desc: 'Boshqaruv paneli va statistika' },
    { id: 'p2', type: 'page', title: 'Kutubxona', path: '/library', icon: Library, desc: 'Barcha kitoblar va audio kitoblar' },
    { id: 'p3', type: 'page', title: 'Hamyon', path: '/coin-wallet', icon: Wallet, desc: 'YBC, UZS va Gold balansi' },
    { id: 'p4', type: 'page', title: 'Profil', path: '/profile', icon: User, desc: 'Shaxsiy ma\'lumotlar va yutuqlar' },
    { id: 'p5', type: 'page', title: 'Sozlamalar', path: '/profile/settings', icon: Settings, desc: 'Xavfsizlik va xabarnomalar' },
    { id: 'p6', type: 'page', title: 'Premium', path: '/profile/premium', icon: Crown, desc: 'Obuna va tariflar' },
    { id: 'p7', type: 'page', title: 'Xabarnomalar', path: '/profile/notifications', icon: Bell, desc: 'Tizim xabarlari' },
    { id: 'p8', type: 'page', title: 'IQ Test', path: '/iq-test', icon: BrainCircuit, desc: 'Bilimingizni sinab ko\'ring' },
  ];

  // Mock Books Data
  const mockBooks = [
    { id: 1, type: 'book', title: "Alpomish", author: "Qudratulla Abdullayev", genre: "Fantastika", desc: "O'zbek xalq qahramonlik eposi", cover: "https://kitobxon.com/img_u/s_main/3565.jpg", rating: 4.8 },
    { id: 2, type: 'book', title: "Yulduzli tunlar", author: "Pirimqul Qodirov", genre: "Tarixiy Roman", desc: "Boburning hayoti va sarguzashtlari", cover: "https://kitobxon.com/img_u/s_main/1000.jpg", rating: 4.9 },
    { id: 3, type: 'book', title: "O'tkan kunlar", author: "Abdulla Qodiriy", genre: "Roman", desc: "O'zbek adabiyotining cho'qqi asari", cover: "https://kitobxon.com/img_u/s_main/1.jpg", rating: 4.7 },
    { id: 4, type: 'book', title: "Sariq devni minib", author: "Xudoyberdi To'xtaboyev", genre: "Sarguzasht", desc: "Bolalar uchun ajoyib sarguzasht", cover: "https://kitobxon.com/img_u/s_main/200.jpg", rating: 4.6 },
  ];

  const performSearch = useCallback(async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      
      const pageResults = navigationPages.filter(p => 
        p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );

      const bookResults = mockBooks.filter(b => 
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q)
      );

      setSearchResults([...pageResults, ...bookResults]);
      setIsLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams, performSearch]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
    performSearch(searchQuery);
  };

  return (
    <div className="search-page-v2">
      <div className="search-hero">
        <div className="search-container">
          <form onSubmit={onSearchSubmit} className="search-bar-wrap">
            <SearchIcon className="s-icon" size={24} />
            <input 
              type="text" 
              placeholder="Kitoblar, bo'limlar yoki sahifalarni qidiring..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="s-btn">Qidirish</button>
          </form>
        </div>
      </div>

      <div className="search-body">
        <div className="search-container">
          {isLoading ? (
            <div className="search-state">
              <div className="loading-dots"><span></span><span></span><span></span></div>
              <p>Ma'lumotlar to'planmoqda...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="results-wrapper">
              <h2 className="results-count">{searchResults.length} ta natija topildi</h2>
              
              <div className="results-grid">
                {searchResults.map(res => (
                  <div key={res.id} className={`result-card ${res.type}`} onClick={() => res.type === 'page' && navigate(res.path)}>
                    {res.type === 'page' ? (
                      <div className="page-result-content">
                        <div className="p-icon-wrap">
                          <res.icon size={28} />
                        </div>
                        <div className="p-info">
                          <span className="p-type">SAHIFA</span>
                          <h3 className="p-title">{res.title}</h3>
                          <p className="p-desc">{res.desc}</p>
                        </div>
                        <div className="p-action">O'tish →</div>
                      </div>
                    ) : (
                      <div className="book-result-content">
                        <div className="b-cover">
                          <img src={res.cover} alt={res.title} />
                          <div className="b-rating">⭐ {res.rating}</div>
                        </div>
                        <div className="b-info">
                          <span className="b-type">{res.genre}</span>
                          <h3 className="b-title">{res.title}</h3>
                          <p className="b-author">{res.author}</p>
                          <p className="b-desc">{res.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="search-state empty">
              <div className="empty-icon">📂</div>
              <h3>Natija topilmadi</h3>
              <p>"{searchQuery}" bo'yicha hech qanday ma'lumot yo'q. Imloviy xatolarni tekshirib ko'ring.</p>
            </div>
          ) : (
            <div className="search-state welcome">
              <div className="welcome-tabs">
                <span>Mashhur qidiruvlar:</span>
                <button onClick={() => {setSearchQuery('Kutubxona'); setSearchParams({q:'Kutubxona'})}}>#Kutubxona</button>
                <button onClick={() => {setSearchQuery('Hamyon'); setSearchParams({q:'Hamyon'})}}>#Hamyon</button>
                <button onClick={() => {setSearchQuery('Premium'); setSearchParams({q:'Premium'})}}>#Premium</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search