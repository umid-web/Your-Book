import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Copy,
  Share2,
  MessageCircle,
  Search,
  UserPlus,
  Send,
  Gift,
  CheckCircle2,
  Clock
} from 'lucide-react';
import './FriendsReferralComp.scss';

const FriendsReferralComp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const friends = [
    { id: 1, name: 'Sardor', iq: 720, books: 15, online: true },
    { id: 2, name: 'Aziza', iq: 680, books: 12, online: false },
    { id: 3, name: 'Otabek', iq: 450, books: 8, online: true },
    { id: 4, name: 'Diyora', iq: 910, books: 22, online: false },
  ];

  const requests = [
    { id: 1, name: 'Javlon', mutual: 5, time: '2 soat oldin' },
    { id: 2, name: 'Madina', mutual: 2, time: '1 kun oldin' },
  ];

  const invited = [
    { id: 1, contact: 'user1@example.com', status: "Yuborildi", date: '14 Mart', reward: null },
    { id: 2, contact: '+998 90 111 22 33', status: "Ro'yxatdan o'tdi", date: '13 Mart', reward: '+1,000 coins' },
  ];

  return (
    <div className="friends-referral-container">
      {/* Header */}
      <div className="fr-header">
        <button onClick={() => navigate('/profile')} className="fr-back-btn">
          <ArrowLeft size={20} />
        </button>
        <h1 className="fr-main-title">Do'stlar va Takliflar</h1>
      </div>

      {/* Referral Hero Card */}
      <div className="fr-hero-card">
        <div className="fr-hero-content">
          <div className="fr-hero-badge">REFERRAL PROGRAM</div>
          <h2 className="fr-hero-title">Do'stlarni taklif qiling va unga ega bo'ling!</h2>
          <p className="fr-hero-desc">Har bir ro'yxatdan o'tgan do'stingiz uchun <strong>1,000 coins</strong> taqdim etiladi.</p>
          
          <div className="fr-code-section">
            <div className="fr-code-box">
              <span className="label">SIZNING KODINGIZ</span>
              <span className="code">AHLI2024</span>
            </div>
            <button className="fr-copy-btn">
              <Copy size={16} />
              <span>Nusxa olish</span>
            </button>
          </div>

          <div className="fr-hero-stats">
            <div className="fr-stat">
              <span className="val">12</span>
              <span className="lbl">Takliflar</span>
            </div>
            <div className="fr-stat">
              <span className="val">8</span>
              <span className="lbl">Faollar</span>
            </div>
            <div className="fr-stat highlight">
              <span className="val">5,000</span>
              <span className="lbl">Mukofotlar</span>
            </div>
          </div>
        </div>
        <div className="fr-hero-visual">
          <Gift className="fr-gift-icon" />
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="fr-tabs-wrapper">
        <div className="fr-tabs">
          <button 
            className={`fr-tab ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            <Users size={16} />
            <span>Do'stlar (24)</span>
          </button>
          <button 
            className={`fr-tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <UserPlus size={16} />
            <span>So'rovlar (3)</span>
          </button>
          <button 
            className={`fr-tab ${activeTab === 'invited' ? 'active' : ''}`}
            onClick={() => setActiveTab('invited')}
          >
            <Send size={16} />
            <span>Takliflar</span>
          </button>
        </div>
      </div>

      {/* Search Bar - only for friends tab */}
      {activeTab === 'friends' && (
        <div className="fr-search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Do'stlarni qidirish..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Tab Content Areas */}
      <div className="fr-content-area">
        {activeTab === 'friends' && (
          <div className="fr-friends-grid">
            {friends.map((f) => (
              <div key={f.id} className="fr-friend-card">
                <div className="fr-avatar-area">
                  <div className="fr-avatar">{f.name[0]}</div>
                  {f.online && <div className="fr-online-dot"></div>}
                </div>
                <div className="fr-friend-info">
                  <h4 className="name">{f.name}</h4>
                  <div className="stats">
                    <span>IQ: {f.iq}</span>
                    <span className="divider">•</span>
                    <span>{f.books} Kitob</span>
                  </div>
                </div>
                <div className="fr-friend-actions">
                  <button className="fr-btn-icon" title="Xabar"><MessageCircle size={18} /></button>
                  <button className="fr-btn-secondary">Profil</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="fr-requests-list">
            {requests.map((r) => (
              <div key={r.id} className="fr-request-card">
                <div className="fr-req-user">
                  <div className="mini-avatar">{r.name[0]}</div>
                  <div className="info">
                    <span className="name">{r.name}</span>
                    <span className="mutual">{r.mutual} ta umumiy do'st</span>
                  </div>
                </div>
                <div className="fr-req-actions">
                  <span className="time">{r.time}</span>
                  <div className="btns">
                    <button className="btn-accept">Qabul qilish</button>
                    <button className="btn-reject">Rad etish</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'invited' && (
          <div className="fr-invited-list">
            {invited.map((i) => (
              <div key={i.id} className="fr-invited-card">
                <div className="invited-info">
                  <span className="contact">{i.contact}</span>
                  <div className="status-row">
                    {i.status === "Ro'yxatdan o'tdi" ? <CheckCircle2 size={12} className="success" /> : <Clock size={12} />}
                    <span className="status">{i.status}</span>
                    <span className="date">{i.date}</span>
                  </div>
                </div>
                {i.reward && <div className="invited-reward">{i.reward}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sharing Methods */}
      <section className="fr-share-section">
        <h3 className="share-title">Taklif qilish usullari</h3>
        <div className="share-grid">
          <button className="share-item">
            <div className="icon email"><Send size={18} /></div>
            <span>Email</span>
          </button>
          <button className="share-item">
            <div className="icon telegram"><MessageCircle size={18} /></div>
            <span>Telegram</span>
          </button>
          <button className="share-item">
            <div className="icon link"><Copy size={18} /></div>
            <span>Havola</span>
          </button>
          <button className="share-item">
            <div className="icon share"><Share2 size={18} /></div>
            <span>Boshqa</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default FriendsReferralComp;
