import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Coins,
  Shield,
  CheckCircle2,
  Trash2,
  Lock,
  Smartphone,
  Info,
  ChevronRight,
  Loader2,
  DollarSign
} from 'lucide-react';
import './PaymentMethodsComp.scss';

const PaymentMethodsComp = () => {
  const navigate = useNavigate();
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const [cards, setCards] = useState([
    {
      id: 1,
      brand: 'VISA',
      last4: '4567',
      holder: 'AHLIDDIN SULTANOV',
      expiry: '12/25',
      primary: true,
      color: 'blue'
    },
    {
      id: 2,
      brand: 'MASTERCARD',
      last4: '1122',
      holder: 'AHLIDDIN SULTANOV',
      expiry: '08/24',
      primary: false,
      color: 'purple'
    },
  ]);

  const [newCard, setNewCard] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleCardInputChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'number') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    } else if (name === 'holder') {
      value = value.toUpperCase();
    }
    
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.number.length < 19 || newCard.expiry.length < 5 || newCard.cvv.length < 3) {
      addToast("Iltimos, barcha maydonlarni to'g'ri to'ldiring", "error");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const card = {
        id: Date.now(),
        brand: newCard.number.startsWith('4') ? 'VISA' : 'MASTERCARD',
        last4: newCard.number.slice(-4),
        holder: newCard.holder || 'KARTA EGASI',
        expiry: newCard.expiry,
        primary: cards.length === 0,
        color: cards.length % 2 === 0 ? 'blue' : 'purple'
      };
      setCards([...cards, card]);
      setIsAddCardOpen(false);
      setNewCard({ number: '', holder: '', expiry: '', cvv: '' });
      setIsProcessing(false);
      addToast("Karta muvaffaqiyatli bog'landi");
    }, 1500);
  };

  const handlePayment = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      addToast(`${card.brand} ****${card.last4} orqali to'lov amalga oshirildi`);
    }, 2000);
  };

  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
    addToast("Karta o'chirildi", "info");
  };

  return (
    <div className="profile-subpage payments-page">
      {/* Toast System */}
      <div className="payment-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`payment-toast ${t.type}`}>
            {t.type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <div className="psp-header">
        <button onClick={() => navigate('/profile')} className="psp-back">
          <ArrowLeft />
        </button>
        <div className="title-group">
          <h1 className="psp-title">To'lov va Hamyon</h1>
          <p className="psp-subtitle">Bank kartalari va to'lov usullarini boshqarish</p>
        </div>
      </div>

      <div className="payment-layout">
        <div className="payment-main">
          {/* Section: Cards */}
          <section className="payment-section">
            <div className="section-header">
              <h2 className="section-title">Mening kartalarim</h2>
              <button className="add-card-btn" onClick={() => setIsAddCardOpen(true)}>
                <Plus size={16} />
                <span>Biriktirish</span>
              </button>
            </div>

            <div className="cards-grid">
              {cards.map((card) => (
                <div key={card.id} className={`pro-card pro-card--${card.color}`}>
                  <div className="card-glass" />
                  <div className="card-header">
                    <div className="chip" />
                    <div className="brand">{card.brand}</div>
                  </div>
                  <div className="card-number">
                    <span>••••</span>
                    <span>••••</span>
                    <span>••••</span>
                    <span>{card.last4}</span>
                  </div>
                  <div className="card-footer">
                    <div className="info-item">
                      <span className="label">EGALIK</span>
                      <span className="value">{card.holder}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">AMAL QILISH</span>
                      <span className="value">{card.expiry}</span>
                    </div>
                  </div>
                  
                  <div className="card-actions-overlay">
                    <button className="btn-pay" onClick={() => handlePayment(card.id)} disabled={isProcessing}>
                      {isProcessing ? <Loader2 className="animate-spin" size={16} /> : "To'lash"}
                    </button>
                    <button className="btn-delete" onClick={() => removeCard(card.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {card.primary && <div className="primary-badge">Asosiy</div>}
                </div>
              ))}
              
              <button className="empty-card-slot" onClick={() => setIsAddCardOpen(true)}>
                <div className="dashed-circle">
                  <Plus size={24} />
                </div>
                <span>Yangi karta qo'shish</span>
              </button>
            </div>
          </section>

          {/* Section: History */}
          <section className="payment-section">
            <div className="section-header">
              <h2 className="section-title">Tranzaksiyalar tarixi</h2>
              <button className="view-all">Barchasi</button>
            </div>
            <div className="history-list">
              {[
                { id: 1, title: 'Premium obuna', date: 'Bugun, 22:45', amount: '-29,000 UZS', status: 'completed', icon: Shield },
                { id: 2, title: 'Hamyonni to\'ldirish', date: 'Kecha, 14:20', amount: '+100,000 UZS', status: 'completed', icon: Plus },
                { id: 3, title: 'IQ Test sotib olish', date: '21 Mart, 10:15', amount: '-15,000 UZS', status: 'failed', icon: Lock },
              ].map(item => (
                <div key={item.id} className="history-item">
                  <div className="history-icon">
                    <item.icon size={18} />
                  </div>
                  <div className="history-info">
                    <span className="item-title">{item.title}</span>
                    <span className="item-date">{item.date}</span>
                  </div>
                  <div className={`history-amount ${item.amount.startsWith('+') ? 'income' : ''}`}>
                    {item.amount}
                  </div>
                  <div className="history-status">
                    <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="payment-sidebar">
          {/* Section: Security */}
          <div className="security-card">
            <div className="security-icon">
              <Shield size={24} />
            </div>
            <h3>Xavfsizlik kafolati</h3>
            <p>Sizning to'lov ma'lumotlaringiz SSL himoya tizimi bilan himoyalangan va saqlangan.</p>
            <div className="pci-badges">
              <span>PCI DSS</span>
              <span>ISO 27001</span>
            </div>
          </div>

          {/* Section: Quick Actions */}
          <div className="quick-actions">
            <h4>Tezkor sozlamalar</h4>
            <div className="settings-list">
              <div className="setting-item">
                <span>Avto-to'lov</span>
                <div className="toggle active"></div>
              </div>
              <div className="setting-item">
                <span>E-Cheklar</span>
                <div className="toggle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {isAddCardOpen && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h2>Karta bog'lash</h2>
              <button className="close-modal" onClick={() => setIsAddCardOpen(false)}>&times;</button>
            </div>
            
            <div className="modal-body">
              {/* Card Preview */}
              <div className="card-preview">
                <div className="pro-card pro-card--blue">
                  <div className="card-glass" />
                  <div className="card-header">
                    <div className="chip" />
                    <div className="brand">{newCard.number.startsWith('4') ? 'VISA' : 'MASTERCARD'}</div>
                  </div>
                  <div className="card-number">
                    {newCard.number || '•••• •••• •••• ••••'}
                  </div>
                  <div className="card-footer">
                    <div className="info-item">
                      <span className="label">EGALIK</span>
                      <span className="value">{newCard.holder || 'ISMM FAMILIYA'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">AMAL QILISH</span>
                      <span className="value">{newCard.expiry || 'OO/YY'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <form className="add-card-form" onSubmit={handleAddCard}>
                <div className="form-group">
                  <label>Karta raqami</label>
                  <input 
                    type="text" 
                    name="number"
                    placeholder="0000 0000 0000 0000"
                    value={newCard.number}
                    onChange={handleCardInputChange}
                    maxLength="19"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Karta egasi</label>
                  <input 
                    type="text" 
                    name="holder"
                    placeholder="ISALAMBEK MAMATOV"
                    value={newCard.holder}
                    onChange={handleCardInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Amal qilish muddati</label>
                    <input 
                      type="text" 
                      name="expiry"
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={handleCardInputChange}
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input 
                      type="password" 
                      name="cvv"
                      placeholder="•••"
                      value={newCard.cvv}
                      onChange={handleCardInputChange}
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="submit-card-btn" disabled={isProcessing}>
                  {isProcessing ? <Loader2 className="animate-spin" /> : "Kartani bog'lash"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsComp;
