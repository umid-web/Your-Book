import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle2, Clock, Trophy, Book, Brain, Star } from 'lucide-react';
import './ProfileAchievements.scss';

const ProfileAchievements = ({ achievements, onRefresh, addToast }) => {
  const [claimingId, setClaimingId] = useState(null);

  const handleClaimReward = async (achievementId) => {
    try {
      setClaimingId(achievementId);
      const token = localStorage.getItem('access_token');
      
      const response = await axios.post(`/auth/achievements/${achievementId}/claim/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status) {
        addToast(response.data.message, 'success');
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error('Error claiming achievement:', err);
      addToast(err.response?.data?.error || 'Mukofotni olishda xatolik yuz berdi', 'error');
    } finally {
      setClaimingId(null);
    }
  };

  const getAchievementIcon = (type, remoteIcon) => {
    if (remoteIcon) return <img src={remoteIcon} alt="Achievement" className="achv-img-remote" />;
    
    switch (type) {
      case 'first_book': return '📚';
      case 'streak_week': return '🔥';
      case 'iq_master': return '🧠';
      case 'gold_rank': return '🏆';
      default: return '🏅';
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Yaqinda';
    const date = new Date(isoString);
    return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="section-block">
      <h3 className="section-title">Yutuqlar va Mukofotlar</h3>
      <div className="achv-grid">
        {achievements && achievements.length > 0 ? (
          achievements.map((achv) => {
            const isCompleted = achv.is_completed;
            const isClaimed = achv.claimed;
            const canClaim = isCompleted && !isClaimed;

            return (
              <div 
                className={`achv-card ${isCompleted ? 'unlocked' : 'locked'} ${isClaimed ? 'claimed' : ''}`} 
                key={achv.id}
              >
                <div className="achv-visual">
                  <div className="achv-icon-wrap">
                    {getAchievementIcon(achv.achievement_type, achv.icon)}
                  </div>
                  {isCompleted && <div className="achv-check-badge"><CheckCircle2 size={14} /></div>}
                </div>

                <div className="achv-info">
                  <div className="achv-header">
                    <h4 className="achv-name">{achv.title}</h4>
                    {isCompleted && <span className="achv-date">{formatDate(achv.earned_at)}</span>}
                  </div>
                  
                  <p className="achv-desc">{achv.description}</p>
                  
                  <div className="achv-actions-area">
                    {isCompleted ? (
                      <div className="achv-completed-row">
                        {canClaim ? (
                          <button 
                            className="achv-claim-btn" 
                            onClick={() => handleClaimReward(achv.id)}
                            disabled={claimingId === achv.id}
                          >
                            {claimingId === achv.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <>
                                <Star size={14} />
                                <span>Mukofotni olish</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="achv-status-badge success">
                            <Trophy size={14} />
                            <span>Mukofot olingan</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="achv-progress-section">
                        <div className="achv-prog-meta">
                          <span className="achv-prog-label">Progress</span>
                          <span className="achv-prog-val">{achv.progress_percentage}%</span>
                        </div>
                        <div className="achv-prog-bar">
                          <div 
                            className="achv-prog-fill" 
                            style={{ width: `${achv.progress_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="achv-empty">
            <Trophy size={48} />
            <p>Hozircha hech qanday yutuq topilmadi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAchievements;
