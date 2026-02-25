-- Hakkımızda sayfası için pages tablosuna gerekli sütunlar
-- Bu migration'ı phpMyAdmin'de çalıştırın

-- values_title sütunu (Vizyonumuz başlığı)
ALTER TABLE pages ADD COLUMN values_title VARCHAR(255) DEFAULT 'Vizyonumuz' AFTER content;

-- Hero görseli için konum ve zoom ayarları
ALTER TABLE pages ADD COLUMN hero_image_position VARCHAR(50) DEFAULT '50% 50%' AFTER hero_image;
ALTER TABLE pages ADD COLUMN hero_image_scale DECIMAL(3,2) DEFAULT 1.00 AFTER hero_image_position;
