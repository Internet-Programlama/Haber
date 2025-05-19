import React, { useState } from 'react';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';

export const AddNews = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const categories = ['Güncel', 'Ekonomi', 'Spor', 'Teknoloji', 'Sağlık'];

    // Stil tanımlamaları
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#333'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '24px'
        },
        formGroup: {
            marginBottom: '1rem'
        },
        label: {
            display: 'block',
            fontWeight: '600',
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
            color: '#444'
        },
        input: {
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            transition: 'border-color 0.2s ease'
        },
        textarea: {
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            minHeight: '150px',
            resize: 'vertical',
            transition: 'border-color 0.2s ease'
        },
        select: {
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            transition: 'border-color 0.2s ease'
        },
        button: {
            marginTop: '16px',
            width: '100%',
            backgroundColor: '#b91c1c',
            color: 'white',
            fontWeight: '600',
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
        }
    };

    const handleSave = () => {
        if (!title || !content || !category) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        alert('Yeni haber başarıyla eklendi!');
        navigate('/editor');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>
                Yeni Haber Ekle
            </h2>
            <div style={styles.card}>
                <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.label}>
                        Başlık
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="content" style={styles.label}>
                        İçerik
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="category" style={styles.label}>
                        Kategori
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Kategori seçiniz</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <Button
                    variant="fullWidth"
                    onClick={handleSave}
                    style={styles.button}
                >
                    Kaydet
                </Button>
            </div>
        </div>
    );
};