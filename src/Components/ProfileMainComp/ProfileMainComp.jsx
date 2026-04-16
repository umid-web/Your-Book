import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import {
  Crown,
  Mail,
  Phone,
  TrendingUp,
  BookOpen,
  Award,
  Bell,
  Shield,
  CreditCard,
  Users,
  LogOut,
  ChevronRight,
  Trophy,
  Edit2
} from 'lucide-react';

import './ProfileMainComp.scss';

// These components are inside src/Components/ProfileMainComp/ProfileComp
import ProfileHeader from './ProfileComp/ProfileHeader/ProfileHeader';
import ProfileStats from './ProfileComp/ProfileStats/ProfileStats';
import ProfileAchievements from './ProfileComp/ProfileAchievements/ProfileAchievements';
import ProfileSettings from './ProfileComp/ProfileSettings/ProfileSettings';
import ProfilePremiumCard from './ProfileComp/ProfilePremiumCard/ProfilePremiumCard';
import ProfileActivity from './ProfileComp/ProfileActivity/ProfileActivity';
import ProfileAccountInfo from './ProfileComp/ProfileAccountInfo/ProfileAccountInfo';
import ProfileDangerZone from './ProfileComp/ProfileDangerZone/ProfileDangerZone';
import ProfileEditModal from './ProfileComp/ProfileEditModal/ProfileEditModal';

import { ToastContainer } from '../common/Toast/Toast';

const ProfileMainComp = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);
  const [dbProfile, setDbProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('Profile: No access token found');
        navigate('/login');
        return;
      }

      const [profileRes, achvRes] = await Promise.all([
        axios.get('/auth/profile/', { headers: { 'Authorization': `Bearer ${token}` } }),
        axios.get('/auth/achievements/', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      const backendProfile = profileRes.data;
      const achievementsList = achvRes.data;

      const mappedProfile = {
        ...backendProfile,
        name: backendProfile.full_name || (backendProfile.first_name ? `${backendProfile.first_name} ${backendProfile.last_name || ''}` : 'Foydalanuvchi'),
        phone: backendProfile.phone_number || 'Raqam kiritilmagan',
        isPremium: backendProfile.is_premium || false,
        
        coins: backendProfile.coins?.total_coins || 0,
        todayCoins: backendProfile.coins?.today_earned || 0,
        karat: backendProfile.coins?.total_karat || 0,

        iqLevel: backendProfile.stats?.accuracy || 0,
        maxIQ: 100,
        booksRead: backendProfile.stats?.books_completed || 0,
        streak: backendProfile.stats?.streak_days || 0,
        totalQuestions: backendProfile.stats?.total_questions || 0,

        joinDate: backendProfile.created_at ? new Date(backendProfile.created_at).toLocaleDateString() : 'Noma\'lum',
        lastSeen: 'Hozirgina',
        status: backendProfile.is_active ? 'Faol' : 'Faol emas',
        
        achievements: achievementsList || [],
        activities: backendProfile.activities || []
      };
      
      setDbProfile(mappedProfile);
      setLoading(false);

    } catch (err) {
      console.error('Error loading profile from Django:', err);
      
      if (err.response?.status === 401) {
        addToast('Sessiya muddati tugadi, iltimos qayta kiring', 'error');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        try {
           const fallbackRes = await axios.get('http://localhost:3000/userProfile');
           setDbProfile(fallbackRes.data);
        } catch (fbErr) {
           setLoading(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [navigate]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('access_token');
      const isFormData = updatedData instanceof FormData;
      
      const response = await axios.patch('/auth/profile/', updatedData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
        }
      });
      
      const newProfile = response.data;
      setDbProfile(prev => ({
        ...prev,
        ...newProfile,
        name: newProfile.full_name || (newProfile.first_name ? `${newProfile.first_name} ${newProfile.last_name || ''}` : prev.name),
        phone: newProfile.phone_number || prev.phone,
        profile_image: newProfile.profile_image || prev.profile_image
      }));
      
      addToast('Profil muvaffaqiyatli yangilandi', 'success');
    } catch (err) {
      console.error('Error updating profile:', err);
      addToast(err.response?.data?.error || 'Profilni yangilab bo\'lmadi', 'error');
    }
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) return <div className="profile-loading">Yuklanmoqda...</div>;
  if (!dbProfile) return <div className="profile-error">Profil ma'lumotlari topilmadi</div>;

  const stats = [
    { label: "Aniqlik (Accuracy)", value: `${dbProfile.iqLevel}%`, icon: TrendingUp, className: 'stat-blue' },
    { label: "O'qilgan Kitoblar", value: dbProfile.booksRead, icon: BookOpen, className: 'stat-green' },
    { label: "Jami Savollar", value: dbProfile.totalQuestions, icon: Award, className: 'stat-purple' },
    { label: "Kun Streak", value: dbProfile.streak, icon: Crown, className: 'stat-amber' }
  ];

  const settingsItems = [
    { id: 'leaderboard', icon: Trophy, label: 'Peshqadamlar', desc: 'Global reyting va yutuqlar' },
    { id: 'notifications', icon: Bell, label: 'Bildirishnomalar', desc: 'Push va email bildirishnomalar' },
    { id: 'security', icon: Shield, label: 'Xavfsizlik', desc: 'Parol va autentifikatsiya' },
    { id: 'payments', icon: CreditCard, label: "To'lov usullari", desc: 'Karta va hamyonlar' },
    { id: 'friends', icon: Users, label: "Do'stlar", desc: "Do'stlarni taklif qiling" },
  ];

  const handleSettingClick = (id) => {
    if (id === 'leaderboard') {
        navigate('/leaderboard');
        return;
    }
    addToast(`${id.charAt(0).toUpperCase() + id.slice(1)} sahifasiga o'tyapsiz`, 'info');
    setTimeout(() => {
      navigate(`/profile/${id}`);
    }, 500);
  };

  const handleLogout = async () => {
    addToast('Tizimdan chiqilmoqda...', 'info');
    await logout();
    navigate('/login');
  };

  const handlePremiumSettings = () => {
    addToast('Premium sozlamalari yuklanmoqda', 'info');
    navigate('/profile/premium');
  };

  return (
    <div className="profile-container-comp">
      <div className="profile-grid">
        <div className="profile-left">
          <ProfileHeader
            name={dbProfile.name}
            email={dbProfile.email}
            phone={dbProfile.phone}
            isPremium={dbProfile.isPremium}
            iqLevel={dbProfile.iqLevel}
            maxIQ={dbProfile.maxIQ}
            Crown={Crown}
            Mail={Mail}
            Phone={Phone}
            EditIcon={Edit2}
            onEdit={() => setIsEditModalOpen(true)}
            profileImage={dbProfile.profile_image}
            username={dbProfile.username}
            bio={dbProfile.bio}
            gender={dbProfile.gender}
            address={dbProfile.address}
            dob={dbProfile.date_of_birth}
            status={dbProfile.status}
          />

          <ProfileStats stats={stats} />

          <ProfileAchievements 
            achievements={dbProfile.achievements} 
            Award={Award} 
            onRefresh={loadProfileData}
            addToast={addToast}
          />

          <ProfileSettings 
            settingsItems={settingsItems} 
            onItemClick={handleSettingClick} 
            ChevronRight={ChevronRight}
          />
        </div>

        <div className="profile-right">
          <ProfilePremiumCard
            isPremium={dbProfile.isPremium}
            Crown={Crown}
            onOpenPremiumSettings={handlePremiumSettings}
          />

          <ProfileActivity activities={dbProfile.activities} />

          <ProfileAccountInfo data={dbProfile} />

          <ProfileDangerZone
            LogOut={LogOut}
            onLogout={handleLogout}
            onDeleteAccount={() => navigate('/profile/delete-account')}
          />
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {dbProfile && (
        <ProfileEditModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          data={dbProfile}
          onSave={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default ProfileMainComp;
