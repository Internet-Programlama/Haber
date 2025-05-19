// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// AdminSidebar ile aynı tema nesnesini kullanıyoruz
const theme = {
    colors: {
        primary: '#DC2626',    // Daha canlı kırmızı (red-700)
        secondary: '#F87171',  // İkincil kırmızı (red-400)
        light: '#FFFFFF',      // Beyaz
        dark: '#111827',       // Koyu siyah (gray-900)
        gray: '#E5E7EB',       // Gri (gray-200)
        midGray: '#9CA3AF',    // Orta gri (gray-400)
        darkGray: '#4B5563',   // Koyu gri (gray-600)
        highlight: '#FEF2F2'   // Çok açık kırmızı arka plan (red-50)
    }
};

export const Footer = () => {
    return (
        <footer style={{
            backgroundColor: theme.colors.dark,
            color: theme.colors.light,
            padding: '3rem 2rem',
            marginTop: '3rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
            }}>
                <div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: theme.colors.light
                    }}>
                        <span style={{ color: theme.colors.primary }}>HABER</span>PORTAL
                    </h3>
                    <p style={{
                        color: theme.colors.midGray,
                        lineHeight: '1.6',
                        marginBottom: '1rem'
                    }}>
                        En güncel haberler için doğru adres.
                    </p>
                </div>

                <div>
                    <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        color: theme.colors.light
                    }}>
                        Hızlı Linkler
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <QuickLink to="/" text="Ana Sayfa" />
                        <QuickLink to="/category" text="Kategoriler" />
                        <QuickLink to="/search" text="Arama" />
                    </ul>
                </div>

                <div>
                    <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        color: theme.colors.light
                    }}>
                        İletişim
                    </h4>
                    <p style={{ color: theme.colors.midGray, marginBottom: '0.5rem' }}>
                        info@haberportal.com
                    </p>
                    <p style={{ color: theme.colors.midGray, marginBottom: '0.5rem' }}>
                        +90 555 123 45 67
                    </p>
                </div>
            </div>

            <div style={{
                maxWidth: '1200px',
                margin: '2rem auto 0',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${theme.colors.darkGray}`,
                textAlign: 'center',
                color: theme.colors.midGray,
                fontSize: '0.875rem'
            }}>
                © {new Date().getFullYear()} HaberPortal. Tüm hakları saklıdır.
            </div>
        </footer>
    );
};

// Hover efektini düzgün çalıştırmak için ayrı bir bileşen kullanalım
const QuickLink = ({ to, text }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <li style={{ marginBottom: '0.5rem' }}>
            <Link
                to={to}
                style={{
                    color: isHovered ? theme.colors.primary : theme.colors.midGray,
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {text}
            </Link>
        </li>
    );
};