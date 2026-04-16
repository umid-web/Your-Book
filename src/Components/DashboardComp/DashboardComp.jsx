import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { 
  LayoutGrid, Rocket, BookOpen, Brain, 
  Crown, ChevronRight, TrendingUp, Zap, Target 
} from 'lucide-react';

import PremiumBanner from '../Dashboard/PremiumBanner/PremiumBanner';
import Wallet from '../Dashboard/Wallet/Wallet';
import StatusCards from '../Dashboard/StatusCards/StatusCards';
import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import RecentActivities from '../Dashboard/RecentActivities/RecentActivities';

import './DashboardComp.scss';
import axios from 'axios';

const DashboardComp = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showPremiumAd, setShowPremiumAd] = useState(true);
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goldBalance, setGoldBalance] = useState(localStorage.getItem('gold_balance') || '0.00');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        const mockResponse = {
          profile: { full_name: user?.firstName || 'Foydalanuvchi', is_premium: false },
          economy: { total_coins: 1250, gold_price_uzs: 1042000 },
          learning_stats: { streak_days: 5, iq_score: 450, iq_progress: 45, iq_rank_name: 'Bilimdon' },
          today_task: { pages_read: 8, pages_to_read: 20, progress_percentage: 40 },
          currently_reading: { title: "Al-Kimyogar", author: "Paulo Koelo", progress_percentage: 65 }
        };

        let homeData = mockResponse;
        
        if (token) {
          try {
            const response = await axios.get('/auth/home/', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            homeData = response.data;
          } catch (e) {
            console.warn('Backend API failed, using mock data.');
          }
        }
        
        setDbData({
          userProfile: {
            name: homeData.profile?.full_name || user?.firstName || 'Foydalanuvchi',
            isPremium: homeData.profile?.is_premium || false,
            stats: { 
              gold: goldBalance, 
              coins: homeData.economy?.total_coins || 0 
            }
          },
          dashboard: {
            header: {
              leftTabs: [
                { label: `${homeData.learning_stats?.streak_days || 0} kunlik streak`, active: true },
                { label: `Bugun: ${homeData.today_task?.pages_read || 0} bet`, active: false }
              ],
              rightTabs: [
                { label: `${homeData.economy?.total_coins || 0} MS`, id: 'MW' },
                { label: homeData.learning_stats?.iq_rank_name || 'IQ Rank', id: 'IK' }
              ]
            },
            activities: {
              title: "O'qishda davom eting",
              list: homeData.currently_reading 
                ? [{
                    id: 'current-book',
                    type: 'book',
                    value: `${homeData.currently_reading.progress_percentage || 0}%`,
                    title: homeData.currently_reading.title,
                    subtitle: homeData.currently_reading.author,
                    tag: "O'qilmoqda",
                    color: "var(--accent-primary)"
                  }]
                : []
            },
            statusCards: {
              goldPrice: {
                title: "Oltin Kursi",
                subtitle: "1 gramm (UZS)",
                value: (homeData.economy?.gold_price_uzs || 1042000).toLocaleString(),
                change: "+2.5%",
                isPositive: true
              },
              iqProgress: {
                title: "IQ Progress",
                subtitle: `${homeData.learning_stats?.iq_score || 0} / 1000`,
                current: homeData.learning_stats?.iq_score || 0,
                total: 1000,
                percentage: homeData.learning_stats?.iq_progress || 0
              },
              dailyTask: {
                title: "Kunlik Vazifa",
                subtitle: `O'qildi: ${homeData.today_task?.pages_read || 0} bet`,
                value: homeData.today_task?.progress_percentage || 0,
                unit: "%"
              }
            }
          }
        });
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [user, goldBalance]);

  if (loading) return <div className="dashboard-loading"><div className="loader">⌛</div></div>;

  const quickActions = [
    { name: 'Bo\'lim tanlash', icon: <LayoutGrid />, path: '/library', color: 'var(--accent-secondary)' },
    { name: 'Mening orzum', icon: <Rocket />, path: '/my-dream', color: 'var(--accent-primary)' },
    { name: 'Kitoblar', icon: <BookOpen />, path: '/library', color: 'var(--success)' },
    { name: 'Test topshirish', icon: <Brain />, path: '/iq-test', color: 'var(--text-primary)' },
  ];

  return (
    <div className="dashboard-container-comp">
      {showPremiumAd && (
        <PremiumBanner
          onClose={() => setShowPremiumAd(false)}
          onUpgrade={() => navigate('/profile/premium')}
        />
      )}

      <div className="global-journey-progress">
        <div className="progress-label">
          <span>Sening yo'ling</span>
          <span>45%</span>
        </div>
        <div className="p-bar-bg">
          <div className="p-bar-fill" style={{ width: '45%' }}></div>
        </div>
      </div>

      <Wallet
        user={user}
        stats={{
          goldWallet: goldBalance,
          coinWallet: dbData?.userProfile?.stats?.coins
        }}
      />

      <div className="quick-actions-grid">
        {quickActions.map((action, i) => (
          <button key={i} className="action-card" onClick={() => navigate(action.path)}>
            <div className="action-icon" style={{ color: action.color }}>{action.icon}</div>
            <span>{action.name}</span>
            <ChevronRight size={16} className="chevron" />
          </button>
        ))}
      </div>

      <DashboardHeader
        leftTabs={dbData?.dashboard?.header?.leftTabs}
        rightTabs={dbData?.dashboard?.header?.rightTabs}
      />
      
      <div className="dashboard-grid">
        <RecentActivities
          title={dbData?.dashboard?.activities?.title}
          activities={dbData?.dashboard?.activities?.list}
        />
        <StatusCards data={dbData?.dashboard?.statusCards} />
      </div>
    </div>
  );
};

export default DashboardComp;
