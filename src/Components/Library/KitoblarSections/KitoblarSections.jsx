import React, { useState, useEffect } from 'react';
import './KitoblarSections.scss';

import SectionModal from '../SectionModal/SectionModal';

const KitoblarSections = () => {
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const response = await fetch('http://localhost:3000/sections');
            const data = await response.json();
            setSections(data);
        } catch (error) {
            console.error('Sections ma\'lumotlarini olishda xatolik:', error);
            // Fallback ma'lumotlar
            setSections([
                { id: 1, karat: 375, state: 'done', progress: 100 },
                { id: 2, karat: 416, state: 'done', progress: 100 },
                { id: 3, karat: 500, state: 'active', progress: 45 },
                { id: 4, karat: 583, state: 'open', progress: 0 },
                { id: 5, karat: 585, state: 'locked', progress: 0 },
                { id: 6, karat: 750, state: 'locked', progress: 0 },
                { id: 7, karat: 833, state: 'locked', progress: 0 },
                { id: 8, karat: 875, state: 'locked', progress: 0 },
                { id: 9, karat: 916, state: 'locked', progress: 0 },
                { id: 10, karat: 958, state: 'locked', progress: 0 },
                { id: 11, karat: 990, state: 'locked', progress: 0 },
                { id: 12, karat: 999, state: 'locked', progress: 0 },
                { id: 13, karat: '999.5', state: 'locked', progress: 0 },
                { id: 14, karat: '999.9', state: 'locked', progress: 0 },
                { id: 15, karat: '999.9K', state: 'locked', progress: 0 },
                { id: 16, karat: 'MAX', state: 'locked', progress: 0 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionClick = (section) => {
        if (section.state === 'locked') return; // Qulflangan bo'lsa kirmaydi
        setSelectedSection(section);
    };

    const handleBuyBook = (sectionId, bookId) => {
        // Sotib olinganda blokirovka mantiqi: shu bo'lim active bo'ladi.
        setSections(prev => prev.map(sec => ({
            ...sec,
            state: sec.id === sectionId ? 'active' : (sec.id < sectionId ? 'done' : 'locked')
        })));
        setSelectedSection(null);
        alert(`Siz ${sectionId}-bo'limdan kitob sotib oldingiz! Boshqa bo'limlar bloklandi.`);
    };

    return (
        <div className="kitoblar-sections-wrap">
            <h2 className="ks-title">Sizning Bo'limlaringiz</h2>

            {loading ? (
                <div className="ks-loading">Yuklanmoqda...</div>
            ) : (
                <div className="ks-grid">
                    {sections.map(sec => (
                    <div
                        key={sec.id}
                        onClick={() => handleSectionClick(sec)}
                        className={`ks-section-card ks-state-${sec.state}`}
                    >
                        {sec.state === 'locked' && (
                            <div className="ks-lock-icon">🔒</div>
                        )}

                        <div className="ks-sec-top">
                            <span className="ks-sec-num">Bo'lim {sec.id}</span>
                            <span className="ks-sec-karat">{sec.karat} K</span>
                        </div>

                        <div className="ks-sec-progress">
                            <div className="ks-progress-bar">
                                <div
                                    className="ks-progress-fill"
                                    style={{ width: `${sec.progress}%` }}
                                />
                            </div>
                            <span className="ks-progress-text">{sec.progress}%</span>
                        </div>
                    </div>
                ))}
                </div>
            )}

            {selectedSection && (
                <SectionModal
                    section={selectedSection}
                    onClose={() => setSelectedSection(null)}
                    onBuy={handleBuyBook}
                />
            )}
        </div>
    );
};

export default KitoblarSections;
