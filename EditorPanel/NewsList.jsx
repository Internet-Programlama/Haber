import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../../basics/styles';

const NewsList = () => {
    const newsData = [
        { id: 1, title: "Haber 1", summary: "Bu birinci haberin özeti." },
        { id: 2, title: "Haber 2", summary: "Bu ikinci haberin özeti." },
    ];

    return (
        <div style={styles.homeContainer}>
            <h2 className="text-2xl font-bold mb-4">Editör Haber Listesi</h2>
            <div className="grid grid-cols-1 gap-4">
                {newsData.map(news => (
                    <div key={news.id} style={styles.newsCard} className="p-4">
                        <h3 className="text-xl font-semibold">{news.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                        <Link
                            to={`/news/${news.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            Haberi Görüntüle &rarr;
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;