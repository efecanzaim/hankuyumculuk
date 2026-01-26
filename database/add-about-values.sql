-- =====================================================
-- HAKKIMIZDA SAYFASI VALUES (VİZYONUMUZ) BÖLÜMÜ
-- =====================================================

-- 1. About Values tablosunu oluştur
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

-- 2. Pages tablosuna values_title kolonu ekle (eğer yoksa)
ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS values_title VARCHAR(255) DEFAULT 'Vizyonumuz' COMMENT 'Values bölümü başlığı';

-- 3. Varsayılan değerleri ekle (sadece tablo boşsa)
INSERT INTO about_values (title, description, image, sort_order) 
SELECT 'Zarafet', 'Her tasarımımızda zarafeti ön planda tutuyoruz.', '/images/about-value-1.jpg', 1
WHERE NOT EXISTS (SELECT 1 FROM about_values WHERE title = 'Zarafet');

INSERT INTO about_values (title, description, image, sort_order) 
SELECT 'Kalite', 'Sertifikalı pırlantalar ve en kaliteli malzemelerle çalışıyoruz.', '/images/about-value-2.jpg', 2
WHERE NOT EXISTS (SELECT 1 FROM about_values WHERE title = 'Kalite');

INSERT INTO about_values (title, description, image, sort_order) 
SELECT 'Özgünlük', 'Her mücevher, kendine özgü bir hikâye taşır.', '/images/about-value-3.jpg', 3
WHERE NOT EXISTS (SELECT 1 FROM about_values WHERE title = 'Özgünlük');

INSERT INTO about_values (title, description, image, sort_order) 
SELECT 'Güven', 'Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir.', '/images/about-value-4.jpg', 4
WHERE NOT EXISTS (SELECT 1 FROM about_values WHERE title = 'Güven');

-- 4. Hakkımızda sayfasının values_title'ını güncelle (eğer sayfa varsa)
UPDATE pages 
SET values_title = 'Vizyonumuz' 
WHERE slug = 'hakkimizda' AND (values_title IS NULL OR values_title = '');

