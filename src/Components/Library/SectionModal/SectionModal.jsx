import React, { useState } from 'react';

const mockBooks = [
    { id: 1, title: 'Al-Kimyogar', author: 'Paulo Koelo', price: 150, rating: 5, cover: '📘' },
    { id: 2, title: 'Chol va Dengiz', author: 'Ernest Xeminguey', price: 120, rating: 4, cover: '📕' },
    { id: 3, title: 'Martin Iden', author: 'Jek London', price: 180, rating: 5, cover: '📓' },
    { id: 4, title: 'Ruhlar Isyoni', author: 'Erkin Vohidov', price: 200, rating: 5, cover: '📗' },
];

const SectionModal = ({ section, onClose, onBuy }) => {
    const [selectedBook, setSelectedBook] = useState(null);

    return (
        <div className="ks-modal-overlay" onClick={onClose}>
            <div className="ks-modal" onClick={e => e.stopPropagation()}>
                <button className="ks-modal-close" onClick={onClose}>✕</button>

                <div className="ks-modal-header">
                    <h3>{section.id}-chi Bo'lim</h3>
                    <div className="ks-badge">Karat {section.karat}</div>
                </div>

                <div className="ks-books-grid">
                    {mockBooks.map(book => (
                        <div
                            key={book.id}
                            className={`ks-book-card ${selectedBook === book.id ? 'selected' : ''}`}
                            onClick={() => setSelectedBook(book.id)}
                        >
                            <div className="ks-book-cover">{book.cover}</div>
                            <div className="ks-book-info">
                                <h4 className="ks-book-title">{book.title}</h4>
                                <p className="ks-book-author">{book.author}</p>
                                <div className="ks-book-price">
                                    <span className="coin-icon">🪙</span> {book.price}
                                </div>
                                <div className="ks-book-rating">
                                    {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ks-modal-footer">
                    <button
                        className="ks-buy-btn"
                        disabled={!selectedBook}
                        onClick={() => {
                            if (selectedBook) {
                                onBuy(section.id, selectedBook);
                            }
                        }}
                    >
                        Sotib Olish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionModal;
