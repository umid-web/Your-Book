import React, { useState, useRef } from 'react';
import { X, User, Mail, Phone, Save, Loader2, Camera, Calendar, MapPin, AlignLeft, Info } from 'lucide-react';
import './ProfileEditModal.scss';

const ProfileEditModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: data.first_name || '',
    last_name: data.last_name || '',
    username: data.username || '',
    email: data.email || '',
    phone_number: data.phone_number || '',
    gender: data.gender || '',
    date_of_birth: data.date_of_birth || '',
    bio: data.bio || '',
    address: data.address || ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(data.profile_image || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // FormData ishlatish kerak (rasm bo'lsa)
    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => {
        dataToSend.append(key, formData[key]);
    });
    if (imageFile) {
        dataToSend.append('profile_image', imageFile);
    }

    await onSave(dataToSend);
    setLoading(false);
    onClose();
  };

  return (
    <div className="pem-overlay" onClick={onClose}>
      <div className="pem-modal" onClick={e => e.stopPropagation()}>
        <div className="pem-header">
          <h2>Profilni tahrirlash</h2>
          <button className="pem-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="pem-form">
          <div className="pem-image-section">
            <div className="pem-avatar-preview" onClick={() => fileInputRef.current?.click()}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" />
              ) : (
                <User size={48} />
              )}
              <div className="pem-image-overlay">
                <Camera size={20} />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleImageChange}
            />
            <p>Rasm yuklash</p>
          </div>

          <div className="pem-fields-grid">
            <div className="pem-field">
              <label><User size={16} /> Ism</label>
              <input name="first_name" value={formData.first_name} onChange={handleChange} />
            </div>

            <div className="pem-field">
              <label><User size={16} /> Familiya</label>
              <input name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>

            <div className="pem-field">
              <label><Info size={16} /> Username</label>
              <input name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div className="pem-field">
              <label><Mail size={16} /> Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="pem-field">
              <label><Phone size={16} /> Telefon</label>
              <input name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </div>

            <div className="pem-field">
              <label><Calendar size={16} /> Tug'ilgan kun</label>
              <input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
            </div>

            <div className="pem-field">
              <label><User size={16} /> Jins</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Tanlang</option>
                <option value="male">Erkak</option>
                <option value="female">Ayol</option>
              </select>
            </div>

            <div className="pem-field">
              <label><MapPin size={16} /> Manzil</label>
              <input name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>

          <div className="pem-field full-width">
            <label><AlignLeft size={16} /> Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
          </div>

          <div className="pem-actions">
            <button type="button" className="pem-btn-cancel" onClick={onClose}>
              Bekor qilish
            </button>
            <button type="submit" className="pem-btn-save" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              <span>Saqlash</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;

