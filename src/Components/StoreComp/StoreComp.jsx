import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Zap, ShoppingCart, Check, X } from 'lucide-react';
import './StoreComp.scss';

const StoreComp = () => {
    const [balance, setBalance] = useState(1250); // VKC
    const [cart, setCart] = useState([]);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const categories = ['Hammasi', 'Gadjetlar', 'Kitoblar', 'Aksessuarlar'];
    const [activeCategory, setActiveCategory] = useState('Hammasi');

    const products = [
        { id: 1, name: 'Kindle Paperwhite', price: 150, image: 'https://m.media-amazon.com/images/I/51v68M79p9L._AC_SL1000_.jpg', category: 'Gadjetlar', rating: 4.8 },
        { id: 2, name: 'Apple AirPods Pro', price: 250, image: 'https://m.media-amazon.com/images/I/61SUj2W5yXL._AC_SL1500_.jpg', category: 'Gadjetlar', rating: 4.9 },
        { id: 3, name: 'Atomic Habits', price: 45, image: 'https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg', category: 'Kitoblar', rating: 5.0 },
        { id: 4, name: 'Leather Notebook', price: 30, image: 'https://m.media-amazon.com/images/I/81A+Hn5HHSL._AC_SL1500_.jpg', category: 'Aksessuarlar', rating: 4.6 },
        { id: 5, name: 'Bose QuietComfort', price: 320, image: 'https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SL1500_.jpg', category: 'Gadjetlar', rating: 4.7 },
        { id: 6, name: 'Deep Work', price: 40, image: 'https://m.media-amazon.com/images/I/81fH+03oRmL.jpg', category: 'Kitoblar', rating: 4.9 },
        { id: 7, name: 'VoyKe Gold Sticker', price: 10, image: 'https://images.unsplash.com/photo-1572375927902-1c09367552d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Aksessuarlar', rating: 5.0 },
        { id: 8, name: 'Smart Reading Light', price: 25, image: 'https://m.media-amazon.com/images/I/610tQ8Jv5iL._AC_SL1500_.jpg', category: 'Aksessuarlar', rating: 4.5 },
    ];

    const filteredProducts = activeCategory === 'Hammasi' 
        ? products 
        : products.filter(p => p.category === activeCategory);

    const handleBuy = (product) => {
        if (balance >= product.price) {
            setBalance(prev => prev - product.price);
            setPurchaseSuccess(true);
            setTimeout(() => setPurchaseSuccess(false), 3000);
        } else {
            alert('Mablag\' yetarli emas!');
        }
    };

    return (
        <div className="store-comp">
            <header className="store-header">
                <div className="header-info">
                    <h1>VoyKe Do'kon</h1>
                    <p>VKC tangalaringizga foydali narsalar oling</p>
                </div>
                <div className="store-balance-card">
                    <Zap size={20} color="#FFD700" fill="#FFD700" />
                    <div className="balance-info">
                        <span>Sizning balans:</span>
                        <h2>{balance} VKC</h2>
                    </div>
                </div>
            </header>

            <div className="store-filters">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <motion.div 
                        key={product.id} 
                        className="product-card"
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <div className="product-category">{product.category}</div>
                        </div>
                        <div className="product-info">
                            <div className="rating">
                                <Star size={14} fill="#FFD700" color="#FFD700" />
                                <span>{product.rating}</span>
                            </div>
                            <h3>{product.name}</h3>
                            <div className="product-footer">
                                <div className="price">
                                    <Zap size={16} color="#FFD700" />
                                    <span>{product.price} VKC</span>
                                </div>
                                <button className="buy-btn" onClick={() => handleBuy(product)}>
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {purchaseSuccess && (
                    <motion.div 
                        className="success-toast"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <div className="toast-content">
                            <Check size={24} color="#22c55e" />
                            <span>Muvaffaqiyatli xarid qilindi!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StoreComp;
