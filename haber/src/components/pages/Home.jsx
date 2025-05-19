import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { styles } from '../../basics/styles';

const sampleNewsData = [
    {
        id: 1,
        title: 'Yeni Teknoloji Devrimi Başlıyor',
        summary: 'Yapay zeka artık günlük hayatımızın vazgeçilmez bir parçası haline geliyor...',
        imageUrl: 'https://source.unsplash.com/random/800x400/?technology',
        publishTime: '2 saat önce',
        readCount: 2456,
        featured: true
    },
    {
        id: 2,
        title: 'Ekonomide Büyüme Beklentisi',
        summary: 'Uzmanlar bu yıl için ekonomik büyüme tahminlerini revize etti...',
        imageUrl: 'https://source.unsplash.com/random/800x400/?economy',
        publishTime: '5 saat önce',
        readCount: 1893
    },
    // Diğer 5-6 örnek haber...
];

export const Home = () => {
    const navigate = useNavigate();
    const [newsItems] = useState(sampleNewsData);

    const featuredNews = newsItems.find(n => n.featured) || newsItems[0];
    const topNews = newsItems.filter(n => n.id !== featuredNews.id).slice(0, 3);
    const otherNews = newsItems.filter(n => n.id !== featuredNews.id).slice(3);

    const goToDetail = (id) => navigate(`/news/${id}`);

    return (
        <div style={styles.homeContainer}>
            {/* Öne Çıkan Haber */}
            <section style={{ marginBottom: '3rem' }}>
                <div style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                }}>
                    <img
                        src={featuredNews.imageUrl}
                        alt={featuredNews.title}
                        style={{
                            width: '100%',
                            height: '500px',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        padding: '2rem',
                        color: 'white'
                    }}>
                        <div style={{
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            <span style={{
                                backgroundColor: '#e63946',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                marginBottom: '1rem',
                                display: 'inline-block'
                            }}>
                                ÖNE ÇIKAN
                            </span>
                            <h2 style={{
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                marginBottom: '1rem',
                                lineHeight: '1.2'
                            }}>{featuredNews.title}</h2>
                            <p style={{
                                fontSize: '1.125rem',
                                marginBottom: '1.5rem',
                                opacity: '0.9'
                            }}>{featuredNews.summary}</p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                marginBottom: '1rem'
                            }}>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.875rem'
                                }}>
                                    <Clock size={16} />
                                    {featuredNews.publishTime}
                                </span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.875rem'
                                }}>
                                    <Eye size={16} />
                                    {featuredNews.readCount} okunma
                                </span>
                            </div>
                            <button
                                onClick={() => goToDetail(featuredNews.id)}
                                style={{
                                    backgroundColor: '#e63946',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '4px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    ':hover': {
                                        backgroundColor: '#c1121f'
                                    }
                                }}
                            >
                                Haberi Oku
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Öne Çıkan 3'lü */}
            <section style={{ marginBottom: '3rem' }}>
                <h3 style={styles.sectionTitle}>Öne Çıkanlar</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {topNews.map(news => (
                        <div key={news.id} style={styles.newsCard}>
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{ padding: '1.5rem' }}>
                                <h4 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    marginBottom: '0.75rem',
                                    color: '#1a1a1a'
                                }}>
                                    {news.title}
                                </h4>
                                <p style={{
                                    color: '#555',
                                    marginBottom: '1rem',
                                    fontSize: '0.9375rem'
                                }}>
                                    {news.summary}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '0.8125rem',
                                        color: '#6c757d'
                                    }}>
                                        {news.publishTime}
                                    </span>
                                    <button
                                        onClick={() => goToDetail(news.id)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#e63946',
                                            border: '1px solid #e63946',
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '4px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            ':hover': {
                                                backgroundColor: '#e63946',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        Devamını Oku
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Diğer Haberler */}
            <section>
                <h3 style={styles.sectionTitle}>Tüm Haberler</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '2rem'
                }}>
                    {otherNews.map(news => (
                        <div key={news.id} style={{
                            ...styles.newsCard,
                            display: 'flex',
                            flexDirection: 'row',
                            maxHeight: '200px'
                        }}>
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                style={{
                                    width: '40%',
                                    height: '200px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                padding: '1rem',
                                width: '60%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <h4 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        marginBottom: '0.5rem',
                                        color: '#1a1a1a'
                                    }}>
                                        {news.title}
                                    </h4>
                                    <p style={{
                                        color: '#555',
                                        fontSize: '0.875rem',
                                        marginBottom: '1rem',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {news.summary}
                                    </p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '0.8125rem',
                                        color: '#6c757d'
                                    }}>
                                        {news.publishTime}
                                    </span>
                                    <button
                                        onClick={() => goToDetail(news.id)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#e63946',
                                            border: 'none',
                                            padding: '0.25rem 0',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            ':hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Haberi Oku →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};