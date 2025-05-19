import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Eye } from 'lucide-react';

export const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('Hepsi');
    const navigate = useNavigate();

    const categories = ['Hepsi', 'Güncel', 'Ekonomi', 'Spor', 'Teknoloji', 'Sağlık'];

    const newsItems = [
        {
            id: 1,
            title: 'Son Dakika Haberi',
            summary: 'Önemli bir gelişme yaşandı ve tüm ülke gündemine bomba gibi düştü. Ayrıntılar haberimizde...',
            category: 'Güncel',
            imageUrl: '/api/placeholder/500/300',
            date: '12 Mayıs 2025',
            readCount: 1250
        },
        {
            id: 2,
            title: 'Ekonomi Raporu',
            summary: 'Ekonomide son durum ve piyasalardaki son gelişmeler. Uzmanlar durumu değerlendirdi...',
            category: 'Ekonomi',
            imageUrl: '/api/placeholder/500/300',
            date: '11 Mayıs 2025',
            readCount: 857
        },
        {
            id: 3,
            title: 'Spor Haberleri',
            summary: 'Milli takımdan müthiş zafer! Kritik maçta rakibini mağlup eden milliler gruptan çıkmayı garantiledi...',
            category: 'Spor',
            imageUrl: '/api/placeholder/500/300',
            date: '10 Mayıs 2025',
            readCount: 2103
        },
        {
            id: 4,
            title: 'Teknoloji Gelişmeleri',
            summary: 'Yeni teknolojik gelişmeler hayatımızı değiştirmeye devam ediyor. İşte geleceğe yön verecek son yenilikler...',
            category: 'Teknoloji',
            imageUrl: '/api/placeholder/500/300',
            date: '9 Mayıs 2025',
            readCount: 1678
        }
    ];

    const filteredNews = selectedCategory === 'Hepsi'
        ? newsItems
        : newsItems.filter((news) => news.category === selectedCategory);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#ffffff',
            padding: '2rem 1rem',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <div style={{
                    background: 'linear-gradient(to right, #e63946, #a4161a)',
                    padding: '1.5rem 2rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    boxShadow: '0 10px 15px -5px rgba(0, 0, 0, 0.1)'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: 0
                    }}>
                        HaberPortal <span style={{ fontWeight: 500, opacity: 0.9 }}>/ Kategoriler</span>
                    </h1>
                </div>

                <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #dddddd',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    boxShadow: '0 10px 15px -5px rgba(0, 0, 0, 0.05)'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#000000',
                        marginBottom: '1.25rem',
                        borderBottom: '2px solid #e63946',
                        paddingBottom: '0.5rem',
                        display: 'inline-block'
                    }}>
                        Kategoriye Göre Haberler
                    </h2>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                    }}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    backgroundColor: selectedCategory === category ? '#e63946' : '#f1f1f1',
                                    color: selectedCategory === category ? '#ffffff' : '#000000',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0.6rem 1.2rem',
                                    fontSize: '0.95rem',
                                    fontWeight: selectedCategory === category ? 600 : 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: selectedCategory === category
                                        ? '0 4px 6px rgba(0, 0, 0, 0.15)'
                                        : 'none'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {filteredNews.length > 0 ? (
                        filteredNews.map((news) => (
                            <div
                                key={news.id}
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #dddddd',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    boxShadow: '0 10px 15px -5px rgba(0, 0, 0, 0.05)'
                                }}
                                onClick={() => navigate(`/news/${news.id}`)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 20px -5px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -5px rgba(0, 0, 0, 0.05)';
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: '#e63946',
                                    color: 'white',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    zIndex: 2
                                }}>
                                    {news.category}
                                </div>

                                <div style={{
                                    position: 'relative',
                                    height: '200px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)',
                                        zIndex: 1
                                    }}></div>
                                    <img
                                        src={news.imageUrl}
                                        alt={news.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                <div style={{ padding: '1.25rem' }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#000000',
                                        marginBottom: '0.75rem',
                                        lineHeight: 1.3
                                    }}>
                                        {news.title}
                                    </h3>

                                    <p style={{
                                        color: '#444444',
                                        fontSize: '0.95rem',
                                        marginBottom: '1.5rem',
                                        lineHeight: 1.6
                                    }}>
                                        {news.summary.length > 120
                                            ? `${news.summary.substring(0, 120)}...`
                                            : news.summary}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderTop: '1px solid #dddddd',
                                        paddingTop: '1rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#444444',
                                            fontSize: '0.8rem'
                                        }}>
                                            <Clock size={14} />
                                            <span>{news.date}</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#444444',
                                            fontSize: '0.8rem'
                                        }}>
                                            <Eye size={14} />
                                            <span>{news.readCount}</span>
                                        </div>
                                    </div>

                                    <button style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        gap: '0.5rem',
                                        background: 'linear-gradient(to right, #e63946, #a4161a)',
                                        color: '#ffffff',
                                        fontWeight: 600,
                                        padding: '0.6rem',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        marginTop: '1rem'
                                    }}>
                                        <span>Devamını Oku</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{
                            gridColumn: '1 / -1',
                            backgroundColor: '#ffffff',
                            border: '1px solid #dddddd',
                            borderRadius: '12px',
                            padding: '2rem',
                            textAlign: 'center',
                            color: '#000000'
                        }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                marginBottom: '0.5rem'
                            }}>
                                Üzgünüz!
                            </h3>
                            <p style={{
                                color: '#444444',
                            }}>
                                Bu kategoride henüz haber bulunmuyor.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
