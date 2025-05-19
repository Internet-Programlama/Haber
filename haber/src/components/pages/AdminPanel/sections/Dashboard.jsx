import React from "react";

const Dashboard = () => {
    const stats = [
        { title: "Toplam Haber", value: 1250 },
        { title: "Onay Bekleyen", value: 35 },
        { title: "Aktif Kullanıcı", value: 450 },
        { title: "Yorum Sayısı", value: 870 },
    ];

    const weeklyTraffic = [120, 210, 180, 260, 300, 200, 170];

    const categories = [
        { name: "Spor", percent: 30 },
        { name: "Teknoloji", percent: 25 },
        { name: "Politika", percent: 20 },
        { name: "Ekonomi", percent: 15 },
        { name: "Diğer", percent: 10 },
    ];

    const notifications = [
        { id: 1, text: "Yeni haber onaylandı.", time: "2 saat önce" },
        { id: 2, text: "Sistem güncellemesi tamamlandı.", time: "1 gün önce" },
        { id: 3, text: "Yeni kullanıcı kaydı: Ahmet Y.", time: "3 gün önce" },
    ];

    const styles = {
        container: {
            maxWidth: 900,
            margin: "20px auto",
            fontFamily: "Arial, sans-serif",
            color: "#111", // koyu siyah yazı
            backgroundColor: "#fff",
            padding: "0 15px",
        },
        title: {
            textAlign: "center",
            color: "#b91c1c", // kırmızı
            marginBottom: 30,
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "1px 1px 2px #000", // hafif gölge
        },
        statsGrid: {
            display: "flex",
            justifyContent: "space-between",
            gap: 15,
            marginBottom: 40,
            flexWrap: "wrap",
        },
        statCard: {
            backgroundColor: "#fff",
            border: "2px solid #b91c1c",
            borderRadius: 8,
            flex: "1 1 200px",
            padding: 25,
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "default",
            userSelect: "none",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            marginBottom: 15,
        },
        statValue: {
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#b91c1c",
            marginBottom: 10,
        },
        statTitle: {
            fontSize: "1.1rem",
            color: "#111",
        },
        section: {
            marginBottom: 40,
        },
        sectionTitle: {
            color: "#b91c1c",
            marginBottom: 20,
            borderBottom: "2px solid #b91c1c",
            paddingBottom: 5,
            fontWeight: "600",
        },
        barChart: {
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            height: 100,
            borderLeft: "2px solid #b91c1c",
            borderBottom: "2px solid #b91c1c",
            paddingLeft: 5,
            backgroundColor: "#fff0f0",
            borderRadius: 5,
        },
        bar: {
            backgroundColor: "#b91c1c",
            width: 20,
            borderRadius: "3px 3px 0 0",
            transition: "background-color 0.3s ease",
        },
        categoryList: {
            listStyle: "none",
            padding: 0,
            maxWidth: 500,
            margin: "0 auto",
            color: "#111",
        },
        categoryItem: {
            display: "flex",
            alignItems: "center",
            marginBottom: 12,
            gap: 10,
        },
        progressBar: {
            flexGrow: 1,
            backgroundColor: "#eee",
            height: 18,
            borderRadius: 9,
            overflow: "hidden",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
        },
        progressFill: {
            height: "100%",
            backgroundColor: "#b91c1c",
            borderRadius: "9px 0 0 9px",
            transition: "width 0.4s ease",
            boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.4)",
            cursor: "default",
            userSelect: "none",
        },
        notificationsList: {
            listStyle: "none",
            padding: 0,
            maxWidth: 500,
            margin: "0 auto",
            color: "#111",
        },
        notificationItem: {
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
            color: "#111",
        },
        notificationText: {
            margin: 0,
        },
        notificationTime: {
            color: "#555",
            fontSize: "0.85rem",
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>İstatistikler</h1>

            <div style={styles.statsGrid}>
                {stats.map(({ title, value }, idx) => (
                    <div
                        key={idx}
                        style={styles.statCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#b91c1c";
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(185, 28, 28, 0.6)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.color = "#111";
                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                        }}
                    >
                        <h2 style={{ ...styles.statValue, color: "inherit" }}>{value}</h2>
                        <p style={{ ...styles.statTitle, color: "inherit" }}>{title}</p>
                    </div>
                ))}
            </div>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Haftalık Trafik</h2>
                <div style={styles.barChart}>
                    {weeklyTraffic.map((val, idx) => (
                        <div
                            key={idx}
                            style={{ ...styles.bar, height: `${val / 3}px` }}
                            title={`Gün ${idx + 1}: ${val} ziyaret`}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f1d1d")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
                        />
                    ))}
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Kategori Dağılımı</h2>
                <ul style={styles.categoryList}>
                    {categories.map(({ name, percent }, idx) => (
                        <li key={idx} style={styles.categoryItem}>
                            <span>{name}</span>
                            <div style={styles.progressBar}>
                                <div
                                    style={{ ...styles.progressFill, width: `${percent}%` }}
                                    title={`${percent}%`}
                                />
                            </div>
                            <span>{percent}%</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Son Bildirimler</h2>
                <ul style={styles.notificationsList}>
                    {notifications.map(({ id, text, time }) => (
                        <li key={id} style={styles.notificationItem}>
                            <p style={styles.notificationText}>{text}</p>
                            <small style={styles.notificationTime}>{time}</small>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export { Dashboard };
