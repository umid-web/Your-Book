import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

// Ikonkalarni alohida komponentlar sifatida ajratish
const Icons = {
    AppStore: () => (
        <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
    ),

    GooglePlay: () => (
        <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
        </svg>
    ),

    Telegram: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
    ),

    Instagram: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    ),

    Facebook: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    ),

    Phone: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .62 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.62A2 2 0 0 1 22 16.92z" />
        </svg>
    ),

    Location: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
};

// Ma'lumotlarni alohida faylda saqlash mumkin
const FOOTER_LINKS = {
    company: [
        { to: '/about', label: 'Loyiha haqida' },
        { to: '/team', label: 'Bizning jamoa' },
        { to: '/news', label: 'Yangiliklar' },
        { to: '/careers', label: 'Vakansiyalar' }
    ],
    help: [
        { to: '/faq', label: 'FAQ' },
        { to: '/contact', label: 'Biz bilan aloqa' },
        { to: '/privacy', label: 'Maxfiylik siyosati' },
        { to: '/terms', label: 'Foydalanish shartlari' }
    ],
    contacts: [
        { icon: Icons.Phone, text: '+998 77 359 01 00' },
        { icon: Icons.Location, text: 'Alisher Navoiy 11A, Toshkent sh' },
        { icon: Icons.Location, text: 'Mustaqillik 7, Toshkent sh' }
    ],
    social: [
        { href: '#', label: 'Telegram', icon: Icons.Telegram },
        { href: '#', label: 'Instagram', icon: Icons.Instagram },
        { href: '#', label: 'Facebook', icon: Icons.Facebook }
    ]
};

// Download Button komponenti
const DownloadButton = memo(({ store, label, icon: Icon }) => (
    <a
        href="#"
        className={`download-btn ${store}`}
        aria-label={`${label} dan yuklab olish`}
        rel="noopener noreferrer"
    >
        <div className="btn-icon" aria-hidden="true">
            <Icon />
        </div>
        <div className="btn-text">
            <span>Yuklab olish</span>
            <strong>{label}</strong>
        </div>
    </a>
));

DownloadButton.displayName = 'DownloadButton';

// Social Link komponenti
const SocialLink = memo(({ href, label, icon: Icon }) => (
    <a
        href={href}
        aria-label={label}
        className="social-link"
        rel="noopener noreferrer"
        target="_blank"
    >
        <Icon />
    </a>
));

SocialLink.displayName = 'SocialLink';

// Footer Links komponenti
const FooterLinks = memo(({ title, links }) => (
    <div className="footer-links">
        <h3>{title}</h3>
        <ul>
            {links.map(({ to, label }) => (
                <li key={to}>
                    <Link to={to}>{label}</Link>
                </li>
            ))}
        </ul>
    </div>
));

FooterLinks.displayName = 'FooterLinks';

// Contact List komponenti
const ContactList = memo(() => (
    <div className="footer-contact">
        <h3>Bog'lanish</h3>
        <ul className="contact-list">
            {FOOTER_LINKS.contacts.map(({ icon: Icon, text }, index) => (
                <li key={index}>
                    <Icon aria-hidden="true" />
                    <span>{text}</span>
                </li>
            ))}
        </ul>
    </div>
));

ContactList.displayName = 'ContactList';

// Asosiy Footer komponenti
const Footer = memo(() => {
    const currentYear = new Date().getFullYear();

    const handleDownloadClick = (store) => {
        // Analytics event yuborish
        if (window.gtag) {
            window.gtag('event', 'download_click', {
                event_category: 'App Download',
                event_label: store
            });
        }
    };

    return (
        <footer className="footer" id="footer">
            {/* Download App Section */}
            <div className="download-section">
                <div className="container">
                    <div className="download-content">
                        <div className="download-text">
                            <h2>Ilovani platformalardan yuklab oling</h2>
                            <p>
                                Mobil ilovamizni qurilmangizda mavjud platformadan
                                bemalol yuklab olishingiz mumkin
                            </p>
                        </div>

                        <div className="download-buttons">
                            <DownloadButton
                                store="app-store"
                                label="App Store"
                                icon={Icons.AppStore}
                            />
                            <DownloadButton
                                store="google-play"
                                label="Google Play"
                                icon={Icons.GooglePlay}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="main-footer">
                <div className="container">
                    <div className="footer-grid">
                        {/* Logo & Info */}
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo" aria-label="Bosh sahifa">
                                <span className="logo-text">YouBook</span>
                                <span className="logo-badge">beta</span>
                            </Link>

                            <p className="footer-desc">
                                O'zbekistondagi eng yirik onlayn kutubxona platformasi.
                                Har qanday janrdagi kitoblarni biz bilan o'qing.
                            </p>

                            <div className="social-links">
                                {FOOTER_LINKS.social.map((link) => (
                                    <SocialLink key={link.label} {...link} />
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <FooterLinks title="Kompaniya" links={FOOTER_LINKS.company} />

                        {/* Resource Links */}
                        <FooterLinks title="Yordam" links={FOOTER_LINKS.help} />

                        {/* Contact Info */}
                        <ContactList />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="bottom-content">
                        <p>
                            ©{currentYear} “Mutolaaxona” MCHJ.
                            Barcha huquqlar himoyalangan.
                        </p>
                        <div className="legal-links">
                            <span>Barcha xizmatlar litsenziyalangan.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;