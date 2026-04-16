import React, { useState, useEffect } from 'react';
import { LuBookOpen, LuStar, LuTrendingUp, LuClock } from 'react-icons/lu';
import './KitoblarStats.scss';

const KitoblarStats = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        completedSections: 0,
        currentProgress: 0,
        readingTime: '0 soat'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:3000/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Stats ma\'lumotlarini olishda xatolik:', error);
            // Fallback ma'lumotlar
            setStats({
                totalBooks: 450,
                completedSections: 2,
                currentProgress: 45,
                readingTime: '12 soat'
            });
        } finally {
            setLoading(false);
        }
    };

    // Stat cards as per design requirements
    const statCards = [
        {
            key: 'total',
            icon: <LuBookOpen />,
            count: stats.totalBooks,
            label: 'Jami Kitoblar',
            color: 'amber'
        },
        {
            key: 'sections',
            icon: <LuStar />,
            count: stats.completedSections,
            label: "Bo'limlar",
            color: 'blue'
        },
        {
            key: 'progress',
            icon: <LuTrendingUp />,
            count: `${stats.currentProgress}%`,
            label: "Progress",
            color: 'green'
        },
        {
            key: 'reading',
            icon: <LuClock />,
            count: stats.readingTime,
            label: "O'qish vaqti",
            color: 'purple'
        },
    ];

    if (loading) {
        return <div className="library-stats-grid">Yuklanmoqda...</div>;
    }

    return (
        <div className="library-stats-grid">
            {statCards.map(card => (
                <div key={card.key} className={`lib-stat-card lib-stat-card--${card.color}`}>
                    <div className="lsc-top">
                        <div className="lsc-icon-wrap">
                            <span className="lsc-icon">{card.icon}</span>
                        </div>
                    </div>
                    <div className="lsc-main">
                        <span className="lsc-count">{card.count}</span>
                        <span className="lsc-label">{card.label}</span>
                    </div>
                    <div className="lsc-glow" />
                </div>
            ))}
        </div>
    );
};

export default KitoblarStats;
