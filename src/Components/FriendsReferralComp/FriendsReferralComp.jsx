import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Copy,
  Share2,
  MessageCircle,
  Search,
  Send,
  Gift,
  CheckCircle2,
  Clock,
  QrCode,
  Check,
  Heart,
  BookOpen,
  UserPlus,
  X,
  ShieldAlert,
  Trash2
} from 'lucide-react';
import './FriendsReferralComp.scss';

// Simple Toast component snippet for internal use
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg z-50 text-sm font-bold animate-fade-in ${type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
    {type === 'success' ? <CheckCircle2 size={18} /> : (type === 'error' ? <ShieldAlert size={18} /> : <Trash2 size={18} />)}
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-70"><X size={14} /></button>
  </div>
);

const FriendsReferralComp = () => {
  const PLAN_RULES = {
    family: { label: "Oila", min: 3 },
    team: { label: "Jamoaviy", min: 5 },
    duo: { label: "Do'stim bilan", min: 2 },
  };
  const PREMIUM_CASH_REWARD = 25000;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('family');
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
  // Toast State
  const [toasts, setToasts] = useState([]);

  // Mock data for the user's referral configuration
  const userId = "AHLI2024";
  const referralLink = `https://voyke.uz/ref/${userId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}&bgcolor=111827&color=ffffff`;

  // Application States
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Sardor', role: 'Oila boshi', iq: 720, books: 15, online: true, progress: 85 },
    { id: 2, name: 'Aziza', role: 'Turmush o\'rtog\'im', iq: 680, books: 12, online: false, progress: 60 },
    { id: 3, name: 'Diyora', role: 'Farzandim', iq: 910, books: 22, online: true, progress: 95 },
  ]);

  const [invited, setInvited] = useState([
    { id: 1, contact: '@sardor_10', status: "Ro'yxatdan o'tdi", date: '14 Mart', reward: '+1,000 coins', premiumPurchased: false },
    { id: 2, contact: '+998 90 111 22 33', status: "Ro'yxatdan o'tdi", date: '13 Mart', reward: '+1,000 coins', premiumPurchased: true },
    { id: 3, contact: 'user1@example.com', status: "Kutilmoqda", date: 'Bugun', reward: null, premiumPurchased: false },
  ]);

  // Modal State for Adding Family Member
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Farzandim',
    phone: '',
    planType: 'family',
    peopleCount: 3,
  });

  const isRegistered = (status) => status === "Ro'yxatdan o'tdi" || status === "Premium oldi";
  const totalRegistered = invited.filter(i => isRegistered(i.status)).length;
  const totalPremiumBought = invited.filter(i => i.premiumPurchased).length;
  const totalCashReward = totalPremiumBought * PREMIUM_CASH_REWARD;

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Havola nusxalandi!', 'success');
  };

  const handeAddMember = (e) => {
    e.preventDefault();
    if (newMember.name.trim() === '') return;
    const selectedPlan = PLAN_RULES[newMember.planType];

    if (!selectedPlan) {
      showToast("Noto'g'ri tarif turi tanlandi.", 'error');
      return;
    }

    const peopleCount = Number(newMember.peopleCount);
    if (Number.isNaN(peopleCount) || peopleCount < selectedPlan.min) {
      showToast(`${selectedPlan.label} rejasi uchun kamida ${selectedPlan.min} kishi kerak.`, 'error');
      return;
    }

    const addedMember = {
      id: Date.now(),
      name: newMember.name,
      role: newMember.role,
      planType: newMember.planType,
      peopleCount,
      iq: 0,
      books: 0,
      online: false,
      progress: 0,
    };

    setFamilyMembers([addedMember, ...familyMembers]);
    setIsModalOpen(false);
    setNewMember({ name: '', role: 'Farzandim', phone: '', planType: 'family', peopleCount: 3 });
    showToast(`${newMember.name} qo'shildi (${selectedPlan.label} - ${peopleCount} kishi).`, 'success');
  };

  const removeMember = (id, name) => {
    if (window.confirm(`${name}ni oilaviy tarifdan o'chirishga ishonchingiz komilmi?`)) {
      setFamilyMembers(familyMembers.filter(m => m.id !== id));
      showToast(`${name} oila ro'yxatidan o'chirildi.`, 'error');
    }
  };

  const markInviteAsPremium = (id) => {
    setInvited(prev => prev.map(item => {
      if (item.id !== id || item.premiumPurchased || !isRegistered(item.status)) {
        return item;
      }
      return {
        ...item,
        premiumPurchased: true,
        status: "Premium oldi",
        reward: `${item.reward ? `${item.reward} + ` : ''}+${PREMIUM_CASH_REWARD.toLocaleString()} so'm`,
      };
    }));
    showToast(`Premium xarid tasdiqlandi. Sizga +${PREMIUM_CASH_REWARD.toLocaleString()} so'm berildi.`, 'success');
  };

  const currentMessage = `VoyKe IQ platformasiga mening havolam orqali qo'shiling va 1000 Coin bonusga ega bo'ling! \n\nKodni kiriting: ${userId} \nYoki havolani bosing:`;
  const tmeShareLink = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(currentMessage)}`;
  const whatsappShareLink = `https://wa.me/?text=${encodeURIComponent(currentMessage + ' ' + referralLink)}`;

  return (
    <div className="friends-referral-container relative">
      {/* Toasts */}
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
      ))}

      {/* Header */}
      <div className="fr-header">
        <button onClick={() => navigate('/profile')} className="fr-back-btn">
          <ArrowLeft size={20} />
        </button>
        <h1 className="fr-main-title">Tarmog'im va Oilam</h1>
      </div>

      {/* Referral Hero Card */}
      <div className="fr-hero-card">
        <div className="fr-hero-content">
          <div className="fr-hero-badge">REFERRAL DASTURI</div>
          <h2 className="fr-hero-title">Taklif qiling va mukofot oling!</h2>
          <p className="fr-hero-desc">Sizning noyob havolangiz orqali ro'yxatdan o'tgan har bir foydalanuvchi uchun <strong>1,000 coins</strong> taqdim etiladi. Agar taklif qilgan odamingiz premium olsa, sizga qo'shimcha <strong>{PREMIUM_CASH_REWARD.toLocaleString()} so'm</strong> beriladi. Hozirgacha <b>{totalRegistered} ta</b> a'zo sizning tarmog'ingiz orqali qo'shildi.</p>
          
          <div className="fr-link-generator">
            <div className="fr-ref-box">
              <span className="label">SIZNING SHAXSIY HAVOLANGIZ</span>
              <div className="ref-url-wrapper">
                <span className="url-text">{referralLink}</span>
                <button className={`ref-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopyLink}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            
            <button className="fr-qr-btn" onClick={() => setShowQrCode(!showQrCode)}>
              <QrCode size={18} />
              <span>QR Kod</span>
            </button>
          </div>

          {showQrCode && (
            <div className="fr-qr-display animate-fade-in mt-4 border border-gray-700 bg-gray-900/50 p-4 rounded-xl max-w-fit flex flex-col items-center gap-2 transition-all">
              <img src={qrCodeUrl} alt="Referral QR Code" className="w-[150px] h-[150px] rounded-lg border border-gray-600" />
              <span className="text-xs text-gray-400 font-medium">Skanerlash uchun qulay</span>
            </div>
          )}

          <div className="fr-hero-stats">
            <div className="fr-stat">
              <span className="val">{invited.length}</span>
              <span className="lbl">Jami Takliflar</span>
            </div>
            <div className="fr-stat">
              <span className="val">{totalRegistered}</span>
              <span className="lbl">Ro'yxatdan o'tgan</span>
            </div>
            <div className="fr-stat highlight">
              <span className="val">{totalRegistered * 1000}</span>
              <span className="lbl">Jami Mukofot</span>
            </div>
            <div className="fr-stat highlight">
              <span className="val">{totalCashReward.toLocaleString()} so'm</span>
              <span className="lbl">Premium bonus</span>
            </div>
          </div>
        </div>
        <div className="fr-hero-visual relative flex items-center justify-center min-h-[150px]">
          <Gift className="fr-gift-icon absolute drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]" size={120} color="#FFD700" />
        </div>
      </div>

      {/* Sharing Methods */}
      <section className="fr-share-section mb-6">
        <h3 className="share-title">Havolani Tarqatish</h3>
        <div className="share-grid">
          <a href={tmeShareLink} target="_blank" rel="noopener noreferrer" className="share-item share-telegram">
            <div className="icon telegram"><Send size={18} /></div>
            <span>Telegram</span>
          </a>
          <a href={whatsappShareLink} target="_blank" rel="noopener noreferrer" className="share-item share-whatsapp">
            <div className="icon email"><MessageCircle size={18} /></div>
            <span>WhatsApp</span>
          </a>
          <button className="share-item" onClick={handleCopyLink}>
            <div className="icon link">{copied ? <Check size={18} /> : <Copy size={18} />}</div>
            <span>{copied ? "Nusxa olindi" : "Nusxa olish"}</span>
          </button>
          <button className="share-item" onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'VoyKe IQ Taklif',
                text: currentMessage,
                url: referralLink,
              })
            }
          }}>
            <div className="icon share"><Share2 size={18} /></div>
            <span>Ulashish</span>
          </button>
        </div>
      </section>

      {/* Tabs Menu */}
      <div className="fr-tabs-wrapper">
        <div className="fr-tabs">
          <button 
            className={`fr-tab ${activeTab === 'family' ? 'active' : ''}`}
            onClick={() => setActiveTab('family')}
          >
            <Heart size={16} />
            <span>Oila a'zolari ({familyMembers.length})</span>
          </button>
          <button 
            className={`fr-tab ${activeTab === 'invited' ? 'active' : ''}`}
            onClick={() => setActiveTab('invited')}
          >
            <Send size={16} />
            <span>Mening tarmog'im ({invited.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Content Areas */}
      <div className="fr-content-area">
        {activeTab === 'family' && (
          <>
            <div className="fr-family-banner">
              <div className="ambient-glow-1"></div>
              <div className="ambient-glow-2"></div>

              <div className="banner-content-wrap">
                <div className="banner-icon-box group">
                  <div className="icon-glow"></div>
                  <BookOpen size={32} />
                </div>
                
                <div className="banner-text-content">
                  <div className="badge-row">
                    <div className="dot"></div>
                    <span className="badge-text">Family Plan</span>
                  </div>
                  <h3 className="banner-title">Oila bo'lib o'qish</h3>
                  <p className="banner-desc">
                    Tarif qoidalari asosida guruhni shakllantiring va oilangiz yoki do'stlaringiz bilan bitta rejada birga o'qing.
                  </p>
                  
                  <div className="banner-tags">
                    <div className="tag">
                      <Users size={14} />
                      <span>Oila: 3+ kishi</span>
                    </div>
                    <div className="tag">
                      <Users size={14} />
                      <span>Jamoaviy: 5+ kishi</span>
                    </div>
                    <div className="tag">
                      <Users size={14} />
                      <span>Duo: 2+ kishi</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="banner-action">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-add"
                >
                  <UserPlus size={18} />
                  <span>Yangi a'zo qo'shish</span>
                </button>
              </div>
            </div>

            <div className="fr-friends-grid">
              {familyMembers.map((member) => (
                <div key={member.id} className="fr-friend-card">
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeMember(member.id, member.name)}
                    className="btn-remove"
                    title="A'zoni o'chirish"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="member-info-top">
                    <div className="avatar-wrap">
                      <div className="avatar-box">
                        {member.name[0]}
                      </div>
                      {member.online && <div className="online-indicator"></div>}
                    </div>
                    
                    <div className="member-details">
                      <div className="name-row">
                        <h4>{member.name}</h4>
                        <span className="role-badge">{member.role}</span>
                      </div>
                      <div className="stats-row">
                        <span className="stat-item">IQ: {member.iq}</span>
                        <span className="dot"></span>
                        <span className="stat-item">{member.books} Kitob</span>
                      </div>
                      {member.planType && (
                        <div className="plan-badge">
                          Tarif: {PLAN_RULES[member.planType]?.label} ({member.peopleCount} kishi)
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Reading Progress */}
                  <div className="reading-progress">
                    <div className="progress-header">
                      <span>Reja bajarilishi</span>
                      <span className="percent">{member.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${member.progress}%` }}>
                        <div className="progress-glow"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {familyMembers.length === 0 && (
                <div className="col-span-full py-8 text-center text-gray-500">
                  <p>Hozircha oila a'zolari qo'shilmagan.</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'invited' && (
          <div className="fr-invited-list">
            <div className="fr-invited-header">
              <h3>
                Tarmog'imdagi a'zolar 
              </h3>
              <span className="success-count">
                {totalRegistered} ta muvaffaqiyatli
              </span>
            </div>
            {invited.map((i) => (
              <div key={i.id} className="fr-invited-card">
                <div className="card-indicator"></div>
                
                <div className="invited-info">
                  <span className="contact">{i.contact}</span>
                  <div className="status-row">
                    {isRegistered(i.status) ? (
                      <div className="status-badge success">
                        <CheckCircle2 size={12} />
                        <span>{i.status}</span>
                      </div>
                    ) : (
                      <div className="status-badge pending">
                        <Clock size={12} />
                        <span>{i.status}</span>
                      </div>
                    )}
                    <span className="date">{i.date}</span>
                  </div>
                </div>
                
                <div className="invited-actions">
                  {i.reward && (
                    <div className="invited-reward">
                      <Gift size={12} /> {i.reward}
                    </div>
                  )}
                  {!i.premiumPurchased && isRegistered(i.status) && (
                    <button
                      onClick={() => markInviteAsPremium(i.id)}
                      className="btn-premium"
                    >
                      Premium Tasdiqlash
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Modal UI */}
      {isModalOpen && (
        <div className="fr-add-modal-overlay">
          <div className="fr-add-modal animate-fade-in">
            <div className="modal-top-accent"></div>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="btn-close"
            >
              <X size={18} />
            </button>
            
            <div className="modal-header">
              <div className="modal-icon">
                <UserPlus size={24} />
              </div>
              <div>
                <h2>Yangi A'zo Qo'shish</h2>
                <p>Oila yoki jamoangizni kengaytiring</p>
              </div>
            </div>

            <form onSubmit={handeAddMember} className="modal-form">
              <div className="form-group">
                <label>A'zo ismi / tahallusi</label>
                <div className="relative">
                  <input 
                    type="text" 
                    autoFocus
                    required
                    placeholder="Ism kiriting..." 
                    className="form-input"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Rol</label>
                  <select 
                    className="form-select"
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  >
                    <option value="Farzandim">Farzandim</option>
                    <option value="Turmush o'rtog'im">Turmush o'rtog'im</option>
                    <option value="Ota-onam">Ota-onam</option>
                    <option value="Boshqa o'qiydigan">Boshqa o'qiydigan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tarif turi</label>
                  <select
                    className="form-select"
                    value={newMember.planType}
                    onChange={(e) => {
                      const planType = e.target.value;
                      setNewMember({
                        ...newMember,
                        planType,
                        peopleCount: PLAN_RULES[planType].min,
                      });
                    }}
                  >
                    <option value="family">Oila (3+ kishi)</option>
                    <option value="team">Jamoaviy (5+)</option>
                    <option value="duo">Duo (2+ kishi)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>A'zoning raqami yoki emaili (Ixtiyoriy)</label>
                <input 
                  type="text" 
                  placeholder="+998 90..." 
                  className="form-input"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                />
              </div>

              <div className="modal-alert">
                <ShieldAlert size={20} className="alert-icon" />
                <p>
                  Yangi a'zoga tizimga kirish kodlari avtomatik uzatiladi. Har qanday xarajatlar tilla hamyoningizdagi <span>"Oilaviy Limit"</span> doirasida yopiladi.
                </p>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cancel"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                >
                  Qo'shish <UserPlus size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsReferralComp;
