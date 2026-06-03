import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import './ProfileStats.scss';

const ProfileStats = ({ stats }) => {
  const getProgressWidth = (stat) => {
    const fallbackProgress = 70;
    const rawValue = typeof stat?.value === 'string'
      ? parseFloat(stat.value)
      : Number(stat?.value);

    if (Number.isNaN(rawValue)) {
      return `${fallbackProgress}%`;
    }

    const isAccuracyStat = stat?.label?.includes('Accuracy');
    const normalizedValue = isAccuracyStat ? rawValue : Math.min(rawValue, fallbackProgress);
    const clampedValue = Math.max(0, Math.min(normalizedValue, 100));

    return `${clampedValue}%`;
  };

  return (
    <div className="section-block">
      <div className="stats-header">
        <h3 className="section-title">Ko'rsatkichlar</h3>
        <span className="stats-updated">So'nggi haftalik natijalar</span>
      </div>
      
      <div className="stats-grid">
        {stats && stats.length > 0 ? (
          stats.map((st, i) => (
            <div className={`stat-card-premium ${st.className || ''}`} key={i}>
              <div className="scp-content">
                <div className="scp-top">
                  <div className="scp-icon-wrap">
                    <st.icon className="scp-icon" size={24} />
                  </div>
                  <div className="scp-trend">
                    <ArrowUpRight size={14} />
                    <span>+2.4%</span>
                  </div>
                </div>
                
                <div className="scp-body">
                  <div className="scp-value">{st.value || '0'}</div>
                  <div className="scp-label">{st.label || 'Noma\'lum'}</div>
                </div>

                <div className="scp-footer">
                  <div className="scp-progress">
                    <div className="scp-bar" style={{ width: getProgressWidth(st) }}></div>
                  </div>
                </div>
              </div>
              
              <div className="scp-bg-glow"></div>
            </div>
          ))
        ) : (
          <div className="stats-empty">Hozircha ma'lumotlar mavjud emas.</div>
        )}
      </div>

      <div className="stats-insight">
        <div className="insight-icon">
          <TrendingUp size={20} />
        </div>
        <div className="insight-text">
          <strong>Ajoyib natija!</strong> Siz o'tgan haftaga qaraganda <strong>14%</strong> ko'proq savollarni to'g'ri topdingiz. Bilim olishda davom eting!
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
