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

      <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-4 mb-6 flex items-start gap-3 text-sm">
        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
        <div>
          <div className="font-semibold mb-1">Diqqat! Bu amalni qaytarib bo&apos;lmaydi!</div>
          <div className="text-red-100 text-xs">
            Hisobni o&apos;chirsangiz, barcha ma&apos;lumotlar, yutuqlar va tilla balansingiz
            butunlay yo&apos;qoladi.
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4 mb-6 text-xs">
        <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-red-300" />
            <span className="font-semibold">Ma&apos;lumotlar yo&apos;qoladi</span>
          </div>
          <div className="text-gray-400">
            Barcha shaxsiy ma&apos;lumotlar va sozlamalar o&apos;chiriladi.
          </div>
        </div>
        <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-amber-300" />
            <span className="font-semibold">Yutuqlar</span>
          </div>
          <div className="text-gray-400">
            Barcha yutuqlar va progressingiz yo&apos;qoladi.
          </div>
        </div>
        <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Premium</span>
          </div>
          <div className="text-gray-400">
            Premium obuna bekor qilinadi va qaytarilmaydi.
          </div>
        </div>
        <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-yellow-300" />
            <span className="font-semibold">Tilla hamyonlar</span>
          </div>
          <div className="text-gray-400">
            Barcha tilla va coinlar balansidan voz kechiladi.
          </div>
        </div>
      </div>

      <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6 mb-6 text-xs">
        <div className="font-semibold mb-3">Ketishdan oldin tavsiyalar</div>
        <ul className="space-y-1 text-gray-300">
          <li>▪ Ma&apos;lumotlarni yuklab oling</li>
          <li>▪ Tilla hamyonlarni naqdlang</li>
          <li>▪ Premium obunani bekor qiling</li>
          <li>▪ Do&apos;stlarni ogohlantiring</li>
        </ul>
      </div>

      <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6 mb-6 text-xs space-y-4">
        <div className="space-y-1">
          <label className="block text-gray-300 mb-1">
            Parolingizni kiriting
          </label>
          <input
            type="password"
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-xs outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-gray-300 mb-1">
            DELETE so&apos;zini yozing
          </label>
          <input
            type="text"
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-xs outline-none"
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-gray-300 mb-1">
            Sabab tanlang
          </label>
          <select
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-xs outline-none"
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

        <div className="space-y-1">
          <label className="block text-gray-300 mb-1">
            Qo&apos;shimcha izoh (ixtiyoriy)
          </label>
          <textarea
            rows={3}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-xs outline-none resize-none"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <label className="flex items-start gap-2 text-xs text-gray-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            Men barcha oqibatlarni to&apos;liq tushundim va hisobimni o&apos;chirishga roziman.
          </span>
        </label>
      </div>

      <div className="flex justify-between gap-3 text-xs">
        <button
          onClick={() => navigate('/profile')}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
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
          className={`px-4 py-2 rounded-lg ${
            canDelete
              ? 'bg-red-700 hover:bg-red-600'
              : 'bg-red-900/40 text-red-300 cursor-not-allowed'
          }`}
        >
          Hisobni O&apos;chirish
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 text-xs">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h2 className="font-semibold text-sm">Oxirgi tasdiqlash</h2>
            </div>
            <p className="text-gray-300 mb-3">
              Rostdan ham hisobingizni butunlay o&apos;chirmoqchimisiz?
            </p>
            <p className="text-gray-400 mb-4">
              {countdown > 0
                ? `Tasdiqlash tugmasi ${countdown} soniyadan so'ng faollashadi.`
                : 'Tasdiqlash tugmasi faollashdi.'}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-2 rounded-lg bg-gray-800"
              >
                Yo&apos;q, Saqlab Qolish
              </button>
              <button
                disabled={countdown > 0}
                className={`px-3 py-2 rounded-lg ${
                  countdown > 0
                    ? 'bg-red-900/40 text-red-300 cursor-not-allowed'
                    : 'bg-red-700 hover:bg-red-600'
                }`}
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
