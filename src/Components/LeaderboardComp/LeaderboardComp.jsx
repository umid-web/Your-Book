import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Medal, BrainCircuit, Coins, TrendingUp, User, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './LeaderboardComp.scss';

const LeaderboardComp = () => {
    const [activeTab, setActiveTab] = useState('iq'); // 'iq' | 'karat'
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeaderboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('access_token');
            const endpoint = activeTab === 'iq' ? '/auth/leaderboard/iq/' : '/auth/leaderboard/karat/';
            
            const response = await axios.get(endpoint, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log(`Leaderboard ${activeTab} data:`, response.data);
            setData(response.data || []);
        } catch (err) {
            console.error('Leaderboard error:', err);
            setError(err.response?.data?.detail || 'Reyting ma\'lumotlarini yuklashda xatolik yuz berdi');
            setData([]);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchLeaderboardData();
    }, [fetchLeaderboardData]);

    const getMedalColor = (rank) => {
        if (rank === 1) return '#FFD700'; // Gold
        if (rank === 2) return '#C0C0C0'; // Silver
        if (rank === 3) return '#CD7F32'; // Bronze
        return null;
    };

    const myStatus = data.find(item => item.is_me);

    return (
        <div className="leaderboard-comp">
            <div className="lb-header">
                <div className="lb-header-content">
                    <Trophy className="lb-trophy-icon" size={48} />
                    <h1 className="lb-title">Peshqadamlar Jadvali</h1>
                    <p className="lb-subtitle">YouBook hamjamiyatining eng kuchli foydalanuvchilari</p>
                </div>

                <div className="lb-tabs">
                    <button 
                        className={`lb-tab ${activeTab === 'iq' ? 'active' : ''}`}
                        onClick={() => setActiveTab('iq')}
                    >
                        <BrainCircuit size={18} />
                        IQ Reytingi
                    </button>
                    <button 
                        className={`lb-tab ${activeTab === 'karat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('karat')}
                    >
                        <Coins size={18} />
                        Karat Reytingi
                    </button>
                </div>
            </div>

            <div className="lb-container">
                {isLoading ? (
                    <div className="lb-loading">
                        <div className="lb-spinner"></div>
                        <p>Reyting yuklanmoqda...</p>
                    </div>
                ) : error ? (
                    <div className="lb-error-state">
                        <AlertCircle size={48} color="#ef4444" />
                        <h3>Xatolik yuz berdi</h3>
                        <p>{error}</p>
                        <button onClick={fetchLeaderboardData} className="retry-btn">Qayta urinish</button>
                    </div>
                ) : (
                    <div className="lb-list">
                        {data.map((item) => (
                            <div key={item.rank} className={`lb-item ${item.is_me ? 'is-me' : ''} ${item.rank <= 3 ? 'top-three' : ''}`}>
                                <div className="lb-rank-col">
                                    {item.rank <= 3 ? (
                                        <Medal color={getMedalColor(item.rank)} size={24} />
                                    ) : (
                                        <span className="lb-rank-num">#{item.rank}</span>
                                    )}
                                </div>
                                
                                <div className="lb-user-col">
                                    <div className="lb-avatar">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt="" />
                                        ) : (
                                            <User size={20} />
                                        )}
                                    </div>
                                    <div className="lb-info">
                                        <span className="lb-name">{item.full_name || item.name}</span>
                                        {item.is_me && <span className="lb-me-tag">Siz</span>}
                                    </div>
                                </div>

                                <div className="lb-score-col">
                                    <span className="lb-score-val">
                                        {item.iq_point || item.karat}
                                    </span>
                                    <span className="lb-score-unit">
                                        {activeTab === 'iq' ? '% IQ' : 'Karat'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {myStatus && !isLoading && (
                <div className="lb-my-status">
                    <div className="lb-container">
                        <div className="lb-my-inner">
                            <div className="my-rank-info">
                                <span className="lbl">Sizning o'rningiz</span>
                                <span className="val">#{myStatus.rank}</span>
                            </div>
                            <div className="my-score-info">
                                <span className="lbl">Sizning natijangiz</span>
                                <span className="val">
                                    {myStatus.iq_point || myStatus.karat} 
                                    <small> {activeTab === 'iq' ? '% IQ' : ' Karat'}</small>
                                </span>
                            </div>
                            <button className="my-action-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <TrendingUp size={16} />
                                Yuqoriga chiqish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderboardComp;
