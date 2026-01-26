-- Hakkımızda sayfası Values (Vizyonumuz) bölümü için tablo
CREATE TABLE IF NOT EXISTS about_values (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL COMMENT 'Değer başlığı (Zarafet, Kalite vb.)',
    description TEXT COMMENT 'Değer açıklaması',
    image VARCHAR(255) COMMENT 'Değer görseli',
    sort_order INT DEFAULT 0 COMMENT 'Sıralama',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Varsayılan değerleri ekle
INSERT INTO about_values (title, description, image, sort_order) VALUES
('Zarafet', 'Her tasarımımızda zarafeti ön planda tutuyoruz.', '/images/about-value-1.jpg', 1),
('Kalite', 'Sertifikalı pırlantalar ve en kaliteli malzemelerle çalışıyoruz.', '/images/about-value-2.jpg', 2),
('Özgünlük', 'Her mücevher, kendine özgü bir hikâye taşır.', '/images/about-value-3.jpg', 3),
('Güven', 'Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir.', '/images/about-value-4.jpg', 4);

-- Hakkımızda sayfası için values başlığı ayarı
ALTER TABLE pages ADD COLUMN IF NOT EXISTS values_title VARCHAR(255) DEFAULT 'Vizyonumuz' COMMENT 'Values bölümü başlığı';

