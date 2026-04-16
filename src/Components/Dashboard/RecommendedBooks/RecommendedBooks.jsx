import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './RecommendedBooks.scss';

const RecommendedBooks = ({
    books = [
        { id: 4, title: 'Kecha va kunduz', author: 'Cho\'lpon', pages: 380, price: 500, cover: '📙', coinReward: 50 },
        { id: 5, title: 'Sarob', author: 'Said Ahmad', pages: 290, price: 400, cover: '📗', coinReward: 40 },
        { id: 6, title: 'Ulug\'bek xazinasi', author: 'Odil Yoqubov', pages: 410, price: 550, cover: '📒', coinReward: 55 },
    ],
    totalCoins = 1250,
    onBuy = () => { }
}) => {
    const navigate = useNavigate();

    if (!books || books.length === 0) return null;

    return (
        <div className="recommended-section">
            <div className="section-header">
                <h2>🛒 Tavsiya qilingan kitoblar</h2>
                <button className="view-all-btn" onClick={() => navigate('/store')}>
                    Barchasi →
                </button>
            </div>

            <div className="books-grid recommended">
                {books.map(book => (
                    <div key={book.id} className="book-card recommended">
                        <div className="book-cover">{book.cover}</div>
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">{book.author}</p>
                            <div className="book-meta">
                                <span className="book-pages">{book.pages} bet</span>
                                <span className="book-reward">🪙 {book.coinReward}</span>
                            </div>

                            <div className="price-section">
                                <span className="price">
                                    <span className="coin-icon">🪙</span>
                                    {book.price}
                                </span>
                                <button
                                    className={`buy-btn ${totalCoins >= book.price ? '' : 'disabled'}`}
                                    onClick={() => onBuy(book)}
                                    disabled={totalCoins < book.price}
                                >
                                    {totalCoins >= book.price ? 'Sotib olish' : 'Tangalar yetarli emas'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

RecommendedBooks.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        pages: PropTypes.number,
        price: PropTypes.number,
        cover: PropTypes.string,
        coinReward: PropTypes.number,
    })),
    totalCoins: PropTypes.number,
    onBuy: PropTypes.func,
};

export default RecommendedBooks;
