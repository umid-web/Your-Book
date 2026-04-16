import React from 'react';
import './ReaderComp.scss';

const ReaderComp = () => {
    return (
        <div className="reader-page">
            <div className="container">
                <h1>Kitoblar paneli</h1>
                <p>Sizning sevimli kitoblaringiz va qo'llanmalaringiz shu yerda.</p>
                <div className="placeholder-content">
                    <div className="placeholder-icon">📚</div>
                    <p>Kutubxona moduli integratsiya qilinmoqda...</p>
                </div>
            </div>
        </div>
    );
};

export default ReaderComp;
