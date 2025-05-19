import React, { useState, useEffect } from 'react';
import { FavoriteNews } from "./FavoriteNews";
import { FollowersList } from "./FollowersList";

export const Profile = ({ userId = '1' }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gerçek uygulamada API'den kullanıcı verilerini çekme
    useEffect(() => {
        // Simüle edilmiş API çağrısı
        const fetchUserData = () => {
            setLoading(true);

            // Örnek kullanıcı verileri (gerçek uygulamada API'den gelecek)
            setTimeout(() => {
                try {
                    // Farklı kullanıcılar için farklı veriler
                    const users = {
                        '1': {
                            id: '1',
                            name: 'Ali Veli',
                            title: 'Kıdemli Gazeteci',
                            profileImage: 'https://i.pravatar.cc/150?img=1',
                            coverImage: 'https://picsum.photos/800/200',
                            bio: 'Gazetecilik tutkunu. Gündemi yakından takip eder. 10+ yıllık deneyim.',
                            location: 'İstanbul, Türkiye',
                            joinDate: 'Ocak 2020',
                            articleCount: 156,
                            viewCount: 253400,
                            followers: [
                                { id: 1, name: 'Zeynep Kaya', avatar: 'https://i.pravatar.cc/50?img=5' },
                                { id: 2, name: 'Mehmet Yılmaz', avatar: 'https://i.pravatar.cc/50?img=3' },
                                { id: 3, name: 'Ayşe Demir', avatar: 'https://i.pravatar.cc/50?img=4' },
                            ],
                            favoriteArticles: [
                                { id: 1, title: 'Yapay Zeka Gazetecilikte Devrim Yaratıyor', date: '15 Nisan 2025', readCount: 1204 },
                                { id: 2, title: '2025 Seçimleri Öncesi Son Anketler', date: '3 Mart 2025', readCount: 3540 },
                                { id: 3, title: 'Yeni Teknoloji Trendleri ve Gelecek', date: '25 Şubat 2025', readCount: 2150 },
                            ]
                        },
                        '2': {
                            id: '2',
                            name: 'Ela Yıldız',
                            title: 'Teknoloji Editörü',
                            profileImage: 'https://i.pravatar.cc/150?img=9',
                            coverImage: 'https://picsum.photos/800/200?random=2',
                            bio: 'Teknoloji dünyasının en yeni gelişmelerini takip eden, 5 yıllık deneyime sahip teknoloji editörü.',
                            location: 'Ankara, Türkiye',
                            joinDate: 'Haziran 2022',
                            articleCount: 87,
                            viewCount: 145600,
                            followers: [
                                { id: 4, name: 'Ahmet Şahin', avatar: 'https://i.pravatar.cc/50?img=8' },
                                { id: 5, name: 'Deniz Kara', avatar: 'https://i.pravatar.cc/50?img=7' },
                                { id: 6, name: 'Mert Aydın', avatar: 'https://i.pravatar.cc/50?img=12' },
                            ],
                            favoriteArticles: [
                                { id: 4, title: 'Quantum Bilgisayarların Geleceği', date: '10 Mayıs 2025', readCount: 967 },
                                { id: 5, title: 'Yapay Zeka ve Etik Sorunlar', date: '22 Nisan 2025', readCount: 1823 },
                                { id: 6, title: '5G Teknolojisinin Etkileri', date: '13 Mart 2025', readCount: 1395 },
                            ]
                        }
                    };

                    const user = users[userId] || users['1']; // Varsayılan olarak ilk kullanıcı
                    setUserData(user);
                    setLoading(false);
                } catch (err) {
                    setError('Kullanıcı bilgileri yüklenirken bir hata oluştu.');
                    setLoading(false);
                }
            }, 500); // 500ms gecikme ile simülasyon
        };

        fetchUserData();
    }, [userId]);

    // Yükleme durumu
    if (loading) {
        return (
            <div style={{
                maxWidth: '1100px',
                margin: '2rem auto',
                padding: '2rem',
                textAlign: 'center',
                color: '#555'
            }}>
                <p>Profil yükleniyor...</p>
            </div>
        );
    }

    // Hata durumu
    if (error) {
        return (
            <div style={{
                maxWidth: '1100px',
                margin: '2rem auto',
                padding: '2rem',
                textAlign: 'center',
                color: '#d32f2f'
            }}>
                <p>{error}</p>
            </div>
        );
    }

    // Görünüm sayısını formatlama fonksiyonu
    const formatViewCount = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}B`;
        }
        return count;
    };

    // Ana içerik
    return (
        <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0',
            fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            color: '#333'
        }}>
            {/* Profil Başlık Alanı */}
            <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                marginBottom: '1.5rem'
            }}>
                {/* Kapak Fotoğrafı */}
                <div style={{
                    height: '220px',
                    backgroundImage: `url(${userData.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />

                {/* Profil Bilgileri */}
                <div style={{
                    padding: '1.5rem',
                    position: 'relative',
                    paddingTop: '4rem'
                }}>
                    {/* Profil Fotoğrafı */}
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        left: '2rem',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '4px solid white',
                        overflow: 'hidden',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}>
                        <img
                            src={userData.profileImage}
                            alt={userData.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* İsim ve Başlık */}
                    <div style={{
                        marginLeft: '7rem',
                        marginBottom: '1rem'
                    }}>
                        <h1 style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '1.75rem',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            {userData.name}
                        </h1>
                        <p style={{
                            margin: '0',
                            fontSize: '1rem',
                            color: '#666',
                            fontWeight: '500'
                        }}>
                            {userData.title}
                        </p>
                        <p style={{
                            margin: '0.5rem 0 0 0',
                            fontSize: '0.875rem',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                display: 'inline-block',
                                marginRight: '0.35rem',
                                width: '16px',
                                height: '16px'
                            }}>
                                <svg fill="#666" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </span>
                            {userData.location}
                        </p>
                    </div>

                    {/* Biyografi */}
                    <p style={{
                        margin: '1rem 0 0 0',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        color: '#444'
                    }}>
                        {userData.bio}
                    </p>

                    {/* Eylem Butonları */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '1rem',
                        gap: '0.75rem'
                    }}>
                        <button style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#1565c0',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}>
                            Takip Et
                        </button>
                        <button style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'transparent',
                            color: '#1565c0',
                            border: '1px solid #1565c0',
                            borderRadius: '4px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}>
                            Mesaj Gönder
                        </button>
                    </div>
                </div>
            </div>

            {/* Profil Detayları ve İçerik Alanı */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
                gap: '1.5rem',
                padding: '0 1rem',
                marginTop: '1.5rem'
            }}>
                <div>
                    {/* Profil İstatistikleri */}
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <h2 style={{
                            margin: '0 0 1rem 0',
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#333',
                            borderBottom: '1px solid #eee',
                            paddingBottom: '0.75rem'
                        }}>
                            Profil Detayları
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            <div>
                                <h3 style={{
                                    margin: '0 0 0.5rem 0',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#666'
                                }}>
                                    Üyelik Tarihi
                                </h3>
                                <p style={{
                                    margin: '0',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    {userData.joinDate}
                                </p>
                            </div>

                            <div>
                                <h3 style={{
                                    margin: '0 0 0.5rem 0',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#666'
                                }}>
                                    Yazılan Haber
                                </h3>
                                <p style={{
                                    margin: '0',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    {userData.articleCount}
                                </p>
                            </div>

                            <div>
                                <h3 style={{
                                    margin: '0 0 0.5rem 0',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#666'
                                }}>
                                    Toplam Okunma
                                </h3>
                                <p style={{
                                    margin: '0',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    {formatViewCount(userData.viewCount)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Favori Haberler */}
                    <FavoriteNews articles={userData.favoriteArticles} />
                </div>

                {/* Takipçiler */}
                <div>
                    <FollowersList followers={userData.followers} />
                </div>
            </div>
        </div>
    );
};
