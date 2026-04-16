import React from 'react';
import GoldPriceCard from './ProbaComp/GoldPriceCard';
import IQProgressCard from './ProbaComp/IQProgressCard';
import YouBookCoinsCard from './ProbaComp/YouBookCoinsCard';
import './StatusCards.scss';

const StatusCards = ({ data }) => {
    if (!data) return null;

    return (
        <div className="status-cards-container">
            <GoldPriceCard data={data.goldPrice} />
            <IQProgressCard data={data.iqProgress} />
            <YouBookCoinsCard data={data.youbookCoins} />
        </div>
    );
};

export default StatusCards;
