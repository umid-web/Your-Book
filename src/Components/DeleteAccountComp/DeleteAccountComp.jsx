import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Database, Award, Crown, Coins } from 'lucide-react';
import './DeleteAccountComp.scss';

const DeleteAccountComp = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const canDelete =
    password.length > 0 && confirmText === 'DELETE' && reason && agreed;

  useEffect(() => {
    if (!modalOpen) return;
    if (countdown <= 0) return;

    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [modalOpen, countdown]);

  return (
    <div className="profile-subpage delete-account-page">
      <div className="psp-header">
        <button
          onClick={() => navigate('/profile')}
          className="psp-back"
        >
          <ArrowLeft />
        </button>
        <h1 className="psp-title">Hisobni O&apos;chirish</h1>
      </div>

      <div className="da-alert-banner">
        <AlertTriangle className="alert-icon" />
        <div className="alert-content">
          <div className="alert-title">Diqqat! Bu amalni qaytarib bo&apos;lmaydi!</div>
          <div className="alert-desc">
            Hisobni o&apos;chirsangiz, barcha ma&apos;lumotlar, yutuqlar va tilla balansingiz
            butunlay yo&apos;qoladi.
          </div>
        </div>
      </div>

      <div className="da-consequences-grid">
        <div className="consequence-card">
          <div className="card-header">
            <Database style={{ color: '#fca5a5' }} />
            <span>Ma&apos;lumotlar yo&apos;qoladi</span>
          </div>
          <div className="card-desc">
            Barcha shaxsiy ma&apos;lumotlar va sozlamalar o&apos;chiriladi.
          </div>
        </div>
        <div className="consequence-card">
          <div className="card-header">
            <Award style={{ color: '#fcd34d' }} />
            <span>Yutuqlar</span>
          </div>
          <div className="card-desc">
            Barcha yutuqlar va progressingiz yo&apos;qoladi.
          </div>
        </div>
        <div className="consequence-card">
          <div className="card-header">
            <Crown style={{ color: '#fbbf24' }} />
            <span>Premium</span>
          </div>
          <div className="card-desc">
            Premium obuna bekor qilinadi va qaytarilmaydi.
          </div>
        </div>
        <div className="consequence-card">
          <div className="card-header">
            <Coins style={{ color: '#fde047' }} />
            <span>Tilla hamyonlar</span>
          </div>
          <div className="card-desc">
            Barcha tilla va coinlar balansidan voz kechiladi.
          </div>
        </div>
      </div>

      <div className="da-recommendations">
        <h3>Ketishdan oldin tavsiyalar</h3>
        <ul>
          <li>Ma&apos;lumotlarni yuklab oling</li>
          <li>Tilla hamyonlarni naqdlang</li>
          <li>Premium obunani bekor qiling</li>
          <li>Do&apos;stlarni ogohlantiring</li>
        </ul>
      </div>

      <div className="da-form-section">
        <div className="form-group">
          <label>Parolingizni kiriting</label>
          <input
            type="password"
            placeholder="Parolingizni kiriting..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>DELETE so&apos;zini yozing</label>
          <input
            type="text"
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Sabab tanlang</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Tanlang...</option>
            <option value="use">Foydalana olmayapman</option>
            <option value="price">Juda qimmat</option>
            <option value="tech">Texnik muammolar</option>
            <option value="other">Boshqa sabablar</option>
          </select>
        </div>

        <div className="form-group">
          <label>Qo&apos;shimcha izoh (ixtiyoriy)</label>
          <textarea
            rows={3}
            placeholder="Ixtiyoriy fikr-mulohazalar..."
            style={{ resize: 'vertical', minHeight: '80px' }}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            Men barcha oqibatlarni to&apos;liq tushundim va hisobimni o&apos;chirishga roziman.
          </span>
        </label>
      </div>

      <div className="da-actions">
        <button
          onClick={() => navigate('/profile')}
          className="btn-back"
        >
          Orqaga Qaytish
        </button>
        <button
          disabled={!canDelete}
          onClick={() => {
            if (!canDelete) return;
            setModalOpen(true);
            setCountdown(10);
          }}
          className="btn-delete"
        >
          Hisobni O&apos;chirish
        </button>
      </div>

      {modalOpen && (
        <div className="da-modal-overlay">
          <div className="da-modal">
            <div className="modal-header">
              <AlertTriangle />
              <h2>Oxirgi tasdiqlash</h2>
            </div>
            <div className="modal-body">
              <p className="primary-text">
                Rostdan ham hisobingizni butunlay o&apos;chirmoqchimisiz?
              </p>
              <p className="countdown-text">
                {countdown > 0
                  ? `Tasdiqlash tugmasi ${countdown} soniyadan so'ng faollashadi.`
                  : 'Tasdiqlash tugmasi faollashdi.'}
              </p>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setModalOpen(false)}
                className="btn-keep"
              >
                Yo&apos;q, Saqlab Qolish
              </button>
              <button
                disabled={countdown > 0}
                className="btn-confirm"
              >
                Ha, O&apos;chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountComp;
