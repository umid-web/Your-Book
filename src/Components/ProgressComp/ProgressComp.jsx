import React from 'react';
import './ProgressComp.scss';

const ProgressComp = () => {
    return (
        <div className="progress-page">
            <div className="container">
                <h1>Sizning natijalaringiz</h1>
                <p>O'sish va rivojlanish jarayonini kuzatib boring.</p>
                <div className="placeholder-content">
                    <div className="placeholder-icon">📈</div>
                    <p>Statistika va grafiklar tez kunda tayyor bo'ladi.</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressComp;
