import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bell, Mail, Volume2, Vibrate, Moon, 
  Settings, X, Smartphone, Info, Shield, CheckCircle2
} from 'lucide-react';
import './NotificationsSettingsComp.scss';

// Inline Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div className={`psp-toast psp-toast--${type}`}>
    {type === 'success' ? <CheckCircle2 size={16} /> : <Shield size={16} />}
    <span>{message}</span>
    <button onClick={onClose}><X size={14} /></button>
  </div>
);

const NotificationsSettingsComp = () => {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);

  // Default states
  const defaultSettings = {
    push: { master: true, books: true, tests: true, achievements: true, wallet: false },
    email: { master: true, weekly: true, offers: false, iq: true, premium: true },
    sound: true,
    vibration: true,
    dnd: false,
    volume: 75,
    vibrationIntensity: "O'rta"
  };

  const defaultHistory = [
    { id: 1, type: 'blue', title: 'Sizning IQ darajangiz oshdi', msg: 'So\'nggi test natijasiga ko\'ra +15 ball to\'pladingiz.', time: '2 soat oldin' },
    { id: 2, type: 'green', title: 'Obuna muvaffaqiyatli', msg: 'Premium obuna 30 kunga faollashtirildi.', time: 'Ertalab 09:45' },
    { id: 3, type: 'amber', title: 'Tizim yangilandi', msg: 'Platformada yangi "Kutubxona" bo\'limi ishga tushdi.', time: 'Kecha' },
  ];

  const [settings, setSettings] = useState(defaultSettings);
  const [notificationHistory, setNotificationHistory] = useState(defaultHistory);

  // Load from storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) setSettings(JSON.parse(saved));
    const hist = localStorage.getItem('notificationHistory');
    if (hist) setNotificationHistory(JSON.parse(hist));
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const updateSettingAndSave = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const toggleSetting = (category, key = 'master') => {
    setSettings(prev => {
      let updated;
      if (typeof prev[category] === 'object') {
        updated = {
          ...prev,
          [category]: { ...prev[category], [key]: !prev[category][key] }
        };
      } else {
        updated = { ...prev, [category]: !prev[category] };
      }
      localStorage.setItem('notificationSettings', JSON.stringify(updated));
      addToast(`Sozlamalar saqlandi`, 'success');
      return updated;
    });
  };

  const handleVolumeChange = (e) => {
    const updated = { ...settings, volume: e.target.value };
    setSettings(updated);
  };
  
  const handleVolumeSave = (e) => {
    updateSettingAndSave({ ...settings, volume: e.target.value });
    addToast(`Ovoz darajasi saqlandi`, 'success');
  };

  const handleVibrationChange = (e) => {
    updateSettingAndSave({ ...settings, vibrationIntensity: e.target.value });
    addToast(`Vibratsiya darajasi saqlandi`, 'success');
  };

  const removeNotification = (id) => {
    const updated = notificationHistory.filter(n => n.id !== id);
    setNotificationHistory(updated);
    localStorage.setItem('notificationHistory', JSON.stringify(updated));
    addToast("Bildirishnoma o'chirildi", "info");
  };

  const clearAllHistory = () => {
    if (window.confirm("Barcha xabarlarni o'chirishni xohlaysizmi?")) {
      setNotificationHistory([]);
      localStorage.setItem('notificationHistory', JSON.stringify([]));
      addToast("Barcha xabarlar tozalandi", "success");
    }
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

  const CustomToggle = ({ checked, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`psp-toggle ${checked ? 'psp-toggle--on' : ''}`}
    />
  );

  return (
    <div className="notifications-page">
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
                  onChange={handleVolumeChange}
                  onMouseUp={handleVolumeSave}
                  onTouchEnd={handleVolumeSave}
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
                  onChange={handleVibrationChange}
                  disabled={!settings.vibration}
                  className="rounded-lg bg-gray-800 text-white border border-gray-700 p-1 outline-none focus:border-amber-500"
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
                <div className="time-range text-sm font-semibold">22:00 — 07:00</div>
                <Info size={16} className="text-amber-500 cursor-pointer ml-2" onClick={() => addToast("DND vaqtida barcha tovushlar va push xabarlar ekraningizga chiqmaydi", "info")} />
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
            {notificationHistory.length > 0 && (
              <button 
                onClick={clearAllHistory}
                className="text-xs text-red-400 font-bold hover:underline"
              >
                Barchasini tozalash
              </button>
            )}
          </div>
          
          <div className="history-list">
            {notificationHistory.length > 0 ? (
              notificationHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <div className={`item-indicator item-indicator--${item.type}`} />
                  <div className="item-content">
                    <h4>{item.title}</h4>
                    <p>{item.msg}</p>
                    <span className="item-time">{item.time}</span>
                  </div>
                  <button className="item-remove" onClick={() => removeNotification(item.id)}>
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '14px', padding: '1rem 0' }}>Sizda hozircha bildirishnomalar yo'q!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationsSettingsComp;

