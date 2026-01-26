-- ==================================
-- PRODUCTS TABLOSUNU TEMİZLEME
-- ==================================
-- Bu script tüm ürünleri ve ilişkili verileri siler
-- Dikkat: Geri alınamaz!

-- Foreign key kontrolünü geçici olarak kapat
SET FOREIGN_KEY_CHECKS = 0;

-- İlişkili tabloları temizle
TRUNCATE TABLE category_products;
TRUNCATE TABLE featured_products;
TRUNCATE TABLE product_stones;

-- Ana ürün tablosunu temizle
TRUNCATE TABLE products;

-- Foreign key kontrolünü tekrar aç
SET FOREIGN_KEY_CHECKS = 1;

-- Başarı mesajı
SELECT 'Tüm ürünler başarıyla silindi! Yeni ürünler ID 1\'den başlayacak.' AS Sonuc;
