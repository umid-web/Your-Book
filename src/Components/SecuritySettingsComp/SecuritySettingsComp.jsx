import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Shield, Lock, Smartphone, Globe, Download, Trash2, 
  CheckCircle2, LogOut, Monitor, Key, ShieldCheck, X, Eye, EyeOff
} from 'lucide-react';
import './SecuritySettingsComp.scss';

// A simple local inline Toast Container for convenience, 
// usually you'd import it, but we render it here to ensure it works isolated
const Toast = ({ message, type, onClose }) => (
  <div className={`psp-toast psp-toast--${type}`}>
    {type === 'success' ? <CheckCircle2 size={16} /> : <Shield size={16} />}
    <span>{message}</span>
    <button onClick={onClose}><X size={14} /></button>
  </div>
);

const SecuritySettingsComp = () => {
  const navigate = useNavigate();

  // State Management
  const [toasts, setToasts] = useState([]);
  const [cacheSize, setCacheSize] = useState(124.5);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pwdForm, setPwdForm] = useState({ old: '', new: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'Public',
    showOnline: true,
    showBooks: true,
    showAchievements: true,
    showIQ: false
  });

  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro 14"',
      location: 'Toshkent, O\'zbekiston',
      ip: '172.20.10.4',
      lastActive: "Hozir faol",
      type: 'desktop',
      current: true,
    },
    {
      id: 2,
      device: 'iPhone 15 Pro',
      location: 'Andijon, O\'zbekiston',
      ip: '213.230.126.34',
      lastActive: "2 soat oldin",
      type: 'mobile',
      current: false,
    },
  ]);

  // Load standard states from storage
  useEffect(() => {
    const savedPrivacy = localStorage.getItem('privacySettings');
    if (savedPrivacy) {
      setPrivacySettings(JSON.parse(savedPrivacy));
    }
    const storedCacheSize = sessionStorage.getItem('mockCacheSize');
    if (storedCacheSize !== null) {
      setCacheSize(parseFloat(storedCacheSize));
    }
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const togglePrivacy = (key) => {
    const newSettings = { ...privacySettings, [key]: !privacySettings[key] };
    setPrivacySettings(newSettings);
    localStorage.setItem('privacySettings', JSON.stringify(newSettings));
    addToast('Maxfiylik sozlamalari yangilandi', 'success');
  };

  // Cache & Export Functions
  const handleClearCache = () => {
    sessionStorage.clear();
    setCacheSize(0);
    sessionStorage.setItem('mockCacheSize', '0');
    addToast('Barcha xotira va kesh fayllari tozalandi!', 'success');
  };

  const handleExportData = () => {
    addToast("Ma'lumotlar arxivlanmoqda...", 'info');
    setTimeout(() => {
      const dummyData = JSON.stringify({ user: "Test", activity: "mock data" });
      const blob = new Blob([dummyData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my_voyke_iq_data.json';
      a.click();
      URL.revokeObjectURL(url);
      addToast("Eksport yakunlandi!", 'success');
    }, 1500);
  };

  // Sessions Functions
  const handleLogoutAll = () => {
    if (window.confirm("Barcha boshqa qurilmalardan chiqishni tasdiqlaysizmi?")) {
      setActiveSessions(prev => prev.filter(s => s.current));
      addToast('Barcha boshqa qurilmalardan chiqildi!', 'success');
    }
  };

  const handleEndSession = (id) => {
    setActiveSessions(prev => prev.filter(s => s.id !== id));
    addToast('Seans yakunlandi', 'success');
  };

  // Password Functions
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (pwdForm.new !== pwdForm.confirm) {
      addToast("Yangi parollar mos kelmadi", "error");
      return;
    }
    if (pwdForm.new.length < 6) {
      addToast("Parol 6 ta belgidan kam bo'lmasligi kerak", "error");
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPasswordModalOpen(false);
      setPwdForm({ old: '', new: '', confirm: '' });
      addToast("Parol muvaffaqiyatli o'zgartirildi!", "success");
    }, 1500);
  };

  const CustomToggle = ({ checked, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`psp-toggle ${checked ? 'psp-toggle--on' : ''}`}
    />
  );

  return (
    <div className="security-page">
      {/* Toast Overlay */}
      <div className="psp-toast-container">
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
        ))}
      </div>

      <header className="psp-header">
        <button onClick={() => navigate('/profile')} className="psp-back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="psp-title">Xavfsizlik</h1>
      </header>

      <div className="settings-grid">
        {/* Password Management */}
        <section className="security-card security-card--featured">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap">
                <Lock size={24} />
              </div>
              <div className="title-area">
                <h2>Parol boshqaruvi</h2>
                <p>Oxirgi marta 12 kun oldin yangilangan</p>
              </div>
            </div>
            <div className="status-badge status-badge--active">
              <CheckCircle2 size={12} />
              <span>Kuchli himoya</span>
            </div>
          </div>
          
          <div className="action-banner">
            <div className="banner-text">
              <h3>Xavfsiz paroldan foydalaning</h3>
              <p>Profilingizni yanada xavfsiz qilish uchun parolni muntazam yangilab turing.</p>
            </div>
            <button className="banner-btn" onClick={() => setIsPasswordModalOpen(true)}>O'zgartirish</button>
          </div>
        </section>

        {/* 2FA Section */}
        <section className="security-card">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap icon-wrap--success">
                <ShieldCheck size={24} />
              </div>
              <div className="title-area">
                <h2>Ikki bosqichli tasdiqlash (2FA)</h2>
                <p>Hisobingizga kirishda qo'shimcha tasdiqlash talab etiladi</p>
              </div>
            </div>
          </div>

          <div className="two-factor-grid">
            <div className="method-item">
              <div className="method-header">
                <Smartphone size={18} className="text-emerald-400" />
                <span>SMS orqali</span>
              </div>
              <p>+998 90 *** 67 89 raqamingizga kod yuboriladi.</p>
              <button className="method-action" onClick={() => addToast('SMS tekshiruv tez kunda qo\'shiladi', 'info')}>Tahrirlash</button>
            </div>

            <div className="method-item">
              <div className="method-header">
                <Key size={18} className="text-sky-400" />
                <span>Authenticator</span>
              </div>
              <p>Google yoki Microsoft Authenticator ilovasidan foydalanish.</p>
              <button className="method-action" onClick={() => addToast('Authenticator QR kod generatsiyasi boshlandi', 'success')}>Sozlash</button>
            </div>

            <div className="method-item">
              <div className="method-header">
                <Shield size={18} className="text-amber-400" />
                <span>Zaxira kodlari</span>
              </div>
              <p>Telefoningiz yonida bo'lmaganida foydalanish uchun kodlar.</p>
              <button className="method-action" onClick={() => addToast('Zaxira kodlari ekranga chiqarilmoqda', 'info')}>Ko'rish</button>
            </div>
          </div>
        </section>

        {/* Active Sessions */}
        <section className="security-card">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap icon-wrap--info">
                <Monitor size={24} />
              </div>
              <div className="title-area">
                <h2>Faol sessiyalar</h2>
                <p>Hisobingizga kirilgan barcha qurilmalar ro'yxati</p>
              </div>
            </div>
            {activeSessions.length > 1 && (
              <button onClick={handleLogoutAll} className="text-xs text-red-400 font-bold hover:underline">
                Hammasidan chiqish
              </button>
            )}
          </div>

          <div className="session-list">
            {activeSessions.map((s) => (
              <div key={s.id} className={`session-item ${s.current ? 'session-item--current' : ''}`}>
                <div className="session-info">
                  <div className="device-icon">
                    {s.type === 'desktop' ? <Monitor size={20} /> : <Smartphone size={20} />}
                  </div>
                  <div className="text-content">
                    <h4>{s.device} {s.current && "(Hozirgi)"}</h4>
                    <p>{s.location} • {s.ip}</p>
                    <span className={`session-status ${s.current ? 'session-status--online' : 'session-status--offline'}`}>
                      {s.lastActive}
                    </span>
                  </div>
                </div>
                {!s.current && (
                  <button className="session-action" onClick={() => handleEndSession(s.id)}>
                    <LogOut size={14} />
                  </button>
                )}
              </div>
            ))}
            {activeSessions.length === 0 && <p style={{ color: '#94a3b8', fontSize: '14px', padding: '1rem 0' }}>Boshqa faol seanslar yo'q</p>}
          </div>
        </section>

        {/* Privacy Control */}
        <section className="security-card">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap icon-wrap--indigo">
                <Globe size={24} />
              </div>
              <div className="title-area">
                <h2>Maxfiylik nazorati</h2>
                <p>Profilingiz qanday ko'rinishini boshqaring</p>
              </div>
            </div>
          </div>

          <div className="privacy-options">
            <div className="toggle-item">
              <span>Profilni hamma ko'ra olishi</span>
              <CustomToggle checked={privacySettings.showOnline} onToggle={() => togglePrivacy('showOnline')} />
            </div>
            <div className="toggle-item">
              <span>O'qilgan kitoblarim</span>
              <CustomToggle checked={privacySettings.showBooks} onToggle={() => togglePrivacy('showBooks')} />
            </div>
            <div className="toggle-item">
              <span>Mening yutuqlarim</span>
              <CustomToggle checked={privacySettings.showAchievements} onToggle={() => togglePrivacy('showAchievements')} />
            </div>
            <div className="toggle-item">
              <span>IQ darajam ochiq bo'lishi</span>
              <CustomToggle checked={privacySettings.showIQ} onToggle={() => togglePrivacy('showIQ')} />
            </div>
          </div>
        </section>

        {/* Data & Cache */}
        <section className="security-card">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap icon-wrap--danger">
                <Trash2 size={24} />
              </div>
              <div className="title-area">
                <h2>Ma'lumotlar va Kesh</h2>
                <p>Xotira va yuklangan ma'lumotlarni tozalash</p>
              </div>
            </div>
          </div>

          <div className="two-factor-grid">
            <div className="method-item">
              <div className="method-header">
                <Download size={18} className="text-sky-400" />
                <span>Eksport</span>
              </div>
              <p>Barcha ma'lumotlaringizni JSON faylda yuklang.</p>
              <button className="method-action" onClick={handleExportData}>Yuklab olish</button>
            </div>

            <div className="method-item">
              <div className="method-header">
                <Trash2 size={18} className="text-red-400" />
                <span>Keshni tozalash</span>
              </div>
              <p>Vaqtinchalik fayllar: {cacheSize.toFixed(1)} MB</p>
              <button 
                className={`method-action ${cacheSize === 0 ? 'opacity-50' : ''}`} 
                onClick={handleClearCache}
                disabled={cacheSize === 0}
              >
                {cacheSize === 0 ? 'Tozalangan' : 'Tozalash'}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="psp-modal-overlay" onClick={() => !isProcessing && setIsPasswordModalOpen(false)}>
          <div className="psp-modal" onClick={e => e.stopPropagation()}>
            <div className="psp-modal-header">
              <h2>Parolni o'zgartirish</h2>
              <button onClick={() => setIsPasswordModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="psp-form">
              <div className="input-group">
                <label>Joriy parol</label>
                <div className="input-with-icon">
                  <input 
                    type={showPwd ? 'text' : 'password'} 
                    required 
                    autoFocus
                    value={pwdForm.old} 
                    onChange={e => setPwdForm({...pwdForm, old: e.target.value})} 
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label>Yangi parol</label>
                <input 
                  type={showPwd ? 'text' : 'password'} 
                  required 
                  value={pwdForm.new} 
                  onChange={e => setPwdForm({...pwdForm, new: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Yangi parolni tasdiqlang</label>
                <input 
                  type={showPwd ? 'text' : 'password'} 
                  required 
                  value={pwdForm.confirm} 
                  onChange={e => setPwdForm({...pwdForm, confirm: e.target.value})} 
                />
              </div>
              <button type="submit" className="save-btn" disabled={isProcessing}>
                {isProcessing ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettingsComp;

