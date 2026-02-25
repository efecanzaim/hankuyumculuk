-- Görsel konum ve zoom ayarları için sütunlar
-- Bu migration'ı HeidiSQL veya phpMyAdmin'de çalıştırın

-- Trend bölümü görselleri
ALTER TABLE homepage_trend_section
  ADD COLUMN left_image_position VARCHAR(50) DEFAULT '50% 50%',
  ADD COLUMN left_image_scale DECIMAL(3,2) DEFAULT 1.00,
  ADD COLUMN right_image_position VARCHAR(50) DEFAULT '50% 50%',
  ADD COLUMN right_image_scale DECIMAL(3,2) DEFAULT 1.00;

-- Özel tasarım kartları görselleri
ALTER TABLE homepage_cards
  ADD COLUMN image_position VARCHAR(50) DEFAULT '50% 50%',
  ADD COLUMN image_scale DECIMAL(3,2) DEFAULT 1.00;
