import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Mail, 
  Volume2, 
  Vibrate, 
  Moon, 
  Settings, 
  X,
  Smartphone,
  Info
} from 'lucide-react';
import './NotificationsSettingsComp.scss';

const NotificationsSettingsComp = () => {
  const navigate = useNavigate();

  // Individual toggle states for better simulation
  const [settings, setSettings] = useState({
    push: {
      master: true,
      books: true,
      tests: true,
      achievements: true,
      wallet: false
    },
    email: {
      master: true,
      weekly: true,
      offers: false,
      iq: true,
      premium: true
    },
    sound: true,
    vibration: true,
    dnd: false,
    volume: 75,
    vibrationIntensity: "O'rta"
  });

  const toggleSetting = (category, key = 'master') => {
    setSettings(prev => {
      if (typeof prev[category] === 'object') {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [key]: !prev[category][key]
          }
        };
      }
      return {
        ...prev,
        [category]: !prev[category]
      };
    });
  };

  const pushOptions = [
    { id: 'books', title: 'Kitob yangiliklari', desc: "Yangi kitoblar qo'shilganda bildirishnoma olish" },
    { id: 'tests', title: 'Test natijalari', desc: 'IQ test yakunlanganda natijalarni darhol ko\'rish' },
    { id: 'achievements', title: 'Yutuqlar', desc: 'Yangi daraja va nishonlar haqida xabar berish' },
    { id: 'wallet', title: 'Tilla hamyonlar', desc: 'Hisobingizdagi o\'zgarishlar haqida bildirishnoma' },
  ];

  const emailOptions = [
    { id: 'weekly', title: 'Haftalik hisobot', desc: 'O\'qish statistikasi haqida umumiy tahlil' },
    { id: 'offers', title: 'Maxsus takliflar', desc: 'Platformadagi yangi aksiyalar haqida xabar olish' },
    { id: 'iq', title: 'IQ progress', desc: 'Zehn darajangizning oylik dinamikasi' },
    { id: 'premium', title: 'Premium materiallar', desc: 'Faqat premium obunachilar uchun yangiliklar' },
  ];

  const notificationHistory = [
    { id: 1, type: 'blue', title: 'Sizning IQ darajangiz oshdi', msg: 'So\'nggi test natijasiga ko\'ra +15 ball to\'pladingiz.', time: '2 soat oldin' },
    { id: 2, type: 'green', title: 'Obuna muvaffaqiyatli', msg: 'Premium obuna 30 kunga faollashtirildi.', time: 'Ertalab 09:45' },
    { id: 3, type: 'amber', title: 'Tizim yangilandi', msg: 'Platformada yangi "Kutubxona" bo\'limi ishga tushdi.', time: 'Kecha' },
  ];

  const CustomToggle = ({ checked, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`psp-toggle ${checked ? 'psp-toggle--on' : ''}`}
    />
  );

  return (
    <div className="notifications-page">
      <header className="psp-header">
        <button onClick={() => navigate('/profile')} className="psp-back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="psp-title">Bildirishnomalar</h1>
      </header>

      <div className="settings-grid">
        {/* Push Notifications Section */}
        <section className="settings-section settings-section--featured">
          <div className="section-header">
            <div className="header-info">
              <div className="icon-wrap">
                <Smartphone size={22} />
              </div>
              <div>
                <h2>Push Bildirishnomalar</h2>
                <p className="text-xs text-gray-400 mt-1">Qurilmangizga keladigan xabarlar</p>
              </div>
            </div>
            <CustomToggle 
              checked={settings.push.master} 
              onToggle={() => toggleSetting('push')} 
            />
          </div>

          <div className={`options-list ${!settings.push.master ? 'opacity-50 pointer-events-none' : ''}`}>
            {pushOptions.map((opt) => (
              <div key={opt.id} className="option-item">
                <div className="option-info">
                  <h3>{opt.title}</h3>
                  <p>{opt.desc}</p>
                </div>
                <CustomToggle 
                  checked={settings.push[opt.id]} 
                  onToggle={() => toggleSetting('push', opt.id)} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Email Notifications Section */}
        <section className="settings-section">
          <div className="section-header">
            <div className="header-info">
              <div className="icon-wrap">
                <Mail size={22} />
              </div>
              <div>
                <h2>Email Xabarnomalar</h2>
                <p className="text-xs text-gray-400 mt-1">Elektron pochtangizga keladigan statistikalar</p>
              </div>
            </div>
            <CustomToggle 
              checked={settings.email.master} 
              onToggle={() => toggleSetting('email')} 
            />
          </div>

          <div className={`options-list ${!settings.email.master ? 'opacity-50 pointer-events-none' : ''}`}>
            {emailOptions.map((opt) => (
              <div key={opt.id} className="option-item">
                <div className="option-info">
                  <h3>{opt.title}</h3>
                  <p>{opt.desc}</p>
                </div>
                <CustomToggle 
                  checked={settings.email[opt.id]} 
                  onToggle={() => toggleSetting('email', opt.id)} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Controls Section */}
        <section className="settings-section">
          <div className="section-header">
            <div className="header-info">
              <div className="icon-wrap" style={{ color: '#d4af37' }}>
                <Settings size={22} />
              </div>
              <h2>Qo'shimcha sozlamalar</h2>
            </div>
          </div>

          <div className="advanced-controls">
            <div className="control-item">
              <div className="control-label">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-gray-400" />
                  <span>Bildirishnoma ovozi</span>
                </div>
                <CustomToggle 
                  checked={settings.sound} 
                  onToggle={() => toggleSetting('sound')} 
                />
              </div>
              <div className="control-ui">
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={settings.volume}
                  onChange={(e) => setSettings({...settings, volume: e.target.value})}
                  disabled={!settings.sound}
                />
                <span className="text-xs font-bold w-8">{settings.volume}%</span>
              </div>
            </div>

            <div className="control-item">
              <div className="control-label">
                <div className="flex items-center gap-2">
                  <Vibrate size={16} className="text-gray-400" />
                  <span>Vibratsiya darajasi</span>
                </div>
                <CustomToggle 
                  checked={settings.vibration} 
                  onToggle={() => toggleSetting('vibration')} 
                />
              </div>
              <div className="control-ui">
                <select 
                  value={settings.vibrationIntensity}
                  onChange={(e) => setSettings({...settings, vibrationIntensity: e.target.value})}
                  disabled={!settings.vibration}
                >
                  <option>Yengil</option>
                  <option>O'rta</option>
                  <option>Kuchli</option>
                </select>
              </div>
            </div>

            <div className="control-item">
              <div className="control-label">
                <div className="flex items-center gap-2">
                  <Moon size={16} className="text-gray-400" />
                  <span>Bezovta qilinmasin (DND)</span>
                </div>
                <CustomToggle 
                  checked={settings.dnd} 
                  onToggle={() => toggleSetting('dnd')} 
                />
              </div>
              <div className="control-ui">
                <div className="time-range">22:00 — 07:00</div>
                <Info size={14} className="text-gray-500 cursor-help" />
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="settings-section">
          <div className="section-header">
            <div className="header-info">
              <div className="icon-wrap" style={{ color: '#ef4444' }}>
                <Bell size={22} />
              </div>
              <h2>So'nggi bildirishnomalar</h2>
            </div>
            <button className="text-xs text-blue-400 font-bold hover:underline">Barchasi</button>
          </div>
          
          <div className="history-list">
            {notificationHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className={`item-indicator item-indicator--${item.type}`} />
                <div className="item-content">
                  <h4>{item.title}</h4>
                  <p>{item.msg}</p>
                  <span className="item-time">{item.time}</span>
                </div>
                <button className="item-remove">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationsSettingsComp;

