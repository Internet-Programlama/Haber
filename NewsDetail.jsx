import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styles } from '../../basics/styles';

export const NewsDetail = () => {
    const { newsId } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div style={styles.homeContainer}>
            <h2 className="text-2xl font-bold mb-4">Haber Detayı - {newsId}</h2>
            <div className="p-4" style={styles.newsCard}>
                <p><strong>Haber ID:</strong> {newsId}</p>
                <p><strong>Haber İçeriği:</strong> Bu, haberin detaylı içeriği olacak.</p>
                <button onClick={handleBack} className="text-blue-500">
                    Geri Dön
                </button>
            </div>
        </div>
    );
};
