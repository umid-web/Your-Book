import React from 'react';
import { ArrowUpRight, TrendingUp, Info } from 'lucide-react';
import './ProfileStats.scss';

const ProfileStats = ({ stats }) => {
  return (
    <div className="section-block">
      <div className="stats-header">
        <h3 className="section-title">Ko'rsatkichlar</h3>
        <span className="stats-updated">Sho'ng'i haftalik natijalar</span>
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
                    <div className="scp-bar" style={{ width: st.label?.includes('Accuracy') ? st.value : '70%' }}></div>
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
