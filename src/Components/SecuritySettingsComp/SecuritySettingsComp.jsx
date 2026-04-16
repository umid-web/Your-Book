import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Lock,
  Smartphone,
  Globe,
  Download,
  Trash2,
  CheckCircle2,
  LogOut,
  Monitor,
  Key,
  ShieldCheck
} from 'lucide-react';
import './SecuritySettingsComp.scss';

const SecuritySettingsComp = () => {
  const navigate = useNavigate();

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'Public',
    showOnline: true,
    showBooks: true,
    showAchievements: true,
    showIQ: false
  });

  const togglePrivacy = (key) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sessions = [
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
  ];

  const CustomToggle = ({ checked, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`psp-toggle ${checked ? 'psp-toggle--on' : ''}`}
    />
  );

  return (
    <div className="security-page">
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
            <button className="banner-btn">O'zgartirish</button>
          </div>
        </section>

        {/* 2FA Section */}
        <section className="security-card">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap" style={{ color: '#10b981' }}>
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
              <button className="method-action">Tahrirlash</button>
            </div>

            <div className="method-item">
              <div className="method-header">
                <Key size={18} className="text-sky-400" />
                <span>Authenticator</span>
              </div>
              <p>Google yoki Microsoft Authenticator ilovasidan foydalanish.</p>
              <button className="method-action">Sozlash</button>
            </div>

            <div className="method-item">
              <div className="method-header">
                <Shield size={18} className="text-amber-400" />
                <span>Zaxira kodlari</span>
              </div>
              <p>Telefoningiz yonida bo'lmaganida foydalanish uchun kodlar.</p>
              <button className="method-action">Kodlarni ko'rish</button>
            </div>
          </div>
        </section>

        {/* Active Sessions */}
        <section className="security-card">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap" style={{ color: '#3b82f6' }}>
                <Monitor size={24} />
              </div>
              <div className="title-area">
                <h2>Faol sessiyalar</h2>
                <p>Hisobingizga kirilgan barcha qurilmalar ro'yxati</p>
              </div>
            </div>
            <button className="text-xs text-red-400 font-bold hover:underline">Hammasidan chiqish</button>
          </div>

          <div className="session-list">
            {sessions.map((s) => (
              <div key={s.id} className={`session-item ${s.current ? 'session-item--current' : ''}`}>
                <div className="session-info">
                  <div className="device-icon">
                    {s.type === 'desktop' ? <Monitor size={20} /> : <Smartphone size={20} />}
                  </div>
                  <div className="text-content">
                    <h4>{s.device} {s.current && "(Hozirgi)"}</h4>
                    <p>{s.location} • {s.ip}</p>
                    <span className={`text-[10px] font-bold ${s.current ? 'text-emerald-400' : 'text-gray-500'}`}>
                      {s.lastActive}
                    </span>
                  </div>
                </div>
                {!s.current && (
                  <button className="session-action">
                    <LogOut size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Control */}
        <section className="security-card">
          <div className="card-header">
            <div className="header-info">
              <div className="icon-wrap" style={{ color: '#6366f1' }}>
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
              <div className="icon-wrap" style={{ color: '#f43f5e' }}>
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
              <p>Barcha ma'lumotlaringizni ZIP faylda yuklang.</p>
              <button className="method-action">Yuklab olish</button>
            </div>

            <div className="method-item">
              <div className="method-header">
                <Trash2 size={18} className="text-red-400" />
                <span>Keshni tozalash</span>
              </div>
              <p>Vaqtinchalik fayllar: 124.5 MB</p>
              <button className="method-action">Tozalash</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SecuritySettingsComp;

