-- Migration: Add Instagram columns to contact_info table
-- İletişim sayfasında Instagram hesaplarını dinamik olarak göstermek için

ALTER TABLE contact_info 
ADD COLUMN instagram1 VARCHAR(100) DEFAULT '@gozumunnuru.antalya' AFTER map_embed,
ADD COLUMN instagram1_url VARCHAR(255) DEFAULT 'https://www.instagram.com/gozumunnuru.antalya' AFTER instagram1,
ADD COLUMN instagram2 VARCHAR(100) DEFAULT '@hankuyumculuk_' AFTER instagram1_url,
ADD COLUMN instagram2_url VARCHAR(255) DEFAULT 'https://www.instagram.com/hankuyumculuk_' AFTER instagram2;
