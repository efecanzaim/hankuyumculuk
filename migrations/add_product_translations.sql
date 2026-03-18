-- =====================================================
-- ÜRÜN ÇEVİRİLERİ (EN/RU) - Products Translation
-- =====================================================
-- Bu dosya products tablosundaki name_en, name_ru alanlarını doldurur.
-- Subtitle'lar ürün kodlarıdır (YZ18001, KP18001 vb.), çeviriye gerek yoktur.
-- Description alanları tüm ürünlerde boştur.
-- =====================================================

-- =====================================================
-- 1. PIRLANTA YÜZÜKLER (Diamond Rings)
-- =====================================================
UPDATE products SET name_en = 'Diamond Ring', name_ru = 'Бриллиантовое кольцо' WHERE name = 'Pırlanta Yüzük';

-- =====================================================
-- 2. PIRLANTA KOLYELER (Diamond Necklaces)
-- =====================================================
UPDATE products SET name_en = 'Diamond Necklace', name_ru = 'Бриллиантовое колье' WHERE name = 'Pırlanta Kolye';

-- =====================================================
-- 3. PIRLANTA BİLEKLİKLER (Diamond Bracelets)
-- =====================================================
UPDATE products SET name_en = 'Diamond Bracelet', name_ru = 'Бриллиантовый браслет' WHERE name = 'Pırlanta Bileklik';

-- =====================================================
-- 4. PIRLANTA KÜPELER (Diamond Earrings)
-- =====================================================
UPDATE products SET name_en = 'Diamond Earrings', name_ru = 'Бриллиантовые серьги' WHERE name = 'Pırlanta Küpe';

-- =====================================================
-- 5. PIRLANTA SETLER (Diamond Sets)
-- =====================================================
UPDATE products SET name_en = 'Diamond Set', name_ru = 'Бриллиантовый комплект' WHERE name = 'Pırlanta Set';

-- =====================================================
-- 6. PIRLANTA KOL DÜĞMELERİ (Diamond Cufflinks)
-- =====================================================
UPDATE products SET name_en = 'Diamond Cufflinks', name_ru = 'Бриллиантовые запонки' WHERE name = 'Pırlanta Kol Düğmesi';

-- =====================================================
-- 7. ALTIN KOL DÜĞMELERİ (Gold Cufflinks)
-- =====================================================
UPDATE products SET name_en = 'Gold Cufflinks', name_ru = 'Золотые запонки' WHERE name = 'Altın Kol Düğmesi';

-- =====================================================
-- 8. ALTIN KOLYE (Gold Necklace)
-- =====================================================
UPDATE products SET name_en = 'Gold Necklace', name_ru = 'Золотое колье' WHERE id = 106;

-- =====================================================
-- 9. BAROK İNCİ KÜPE (Baroque Pearl Earrings)
-- =====================================================
UPDATE products SET name_en = 'Baroque Pearl Earrings', name_ru = 'Серьги с жемчугом барокко' WHERE id = 86;

-- =====================================================
-- 10. İNCİ TESBİH (Pearl Prayer Beads)
-- =====================================================
UPDATE products SET name_en = 'Pearl Prayer Beads', name_ru = 'Жемчужные чётки' WHERE id = 111;

-- =====================================================
-- 11. PRELOVED ÜRÜNLER (Branded/Preloved items)
-- Bunlar zaten İngilizce isimlidir, RU çevirileri eklenir.
-- =====================================================

-- DIVAS' DREAM NECKLACE (id=98)
UPDATE products SET name_en = 'DIVAS'' DREAM NECKLACE', name_ru = 'КОЛЬЕ DIVAS'' DREAM' WHERE id = 98;

-- B.ZERO1 NECKLACE (id=99)
UPDATE products SET name_en = 'B.ZERO1 NECKLACE', name_ru = 'КОЛЬЕ B.ZERO1' WHERE id = 99;

-- CARTIER D'AMOUR KOLYE ORTA MODEL (id=100)
UPDATE products SET name_en = 'CARTIER D''AMOUR NECKLACE MEDIUM MODEL', name_ru = 'КОЛЬЕ CARTIER D''AMOUR СРЕДНЯЯ МОДЕЛЬ' WHERE id = 100;

-- MUSKA DE CARTIER KOLYE (id=101)
UPDATE products SET name_en = 'AMULETTE DE CARTIER NECKLACE', name_ru = 'КОЛЬЕ AMULETTE DE CARTIER' WHERE id = 101;

-- TRINITY KOLYE (id=102)
UPDATE products SET name_en = 'TRINITY NECKLACE', name_ru = 'КОЛЬЕ TRINITY' WHERE id = 102;

-- LOVE BİLEZİK (id=103)
UPDATE products SET name_en = 'LOVE BRACELET', name_ru = 'БРАСЛЕТ LOVE' WHERE id = 103;

-- B.ZERO1 NECKLACE (id=107)
UPDATE products SET name_en = 'B.ZERO1 NECKLACE', name_ru = 'КОЛЬЕ B.ZERO1' WHERE id = 107;

-- LOVE PENDANT, 6 DIAMONDS (id=108)
UPDATE products SET name_en = 'LOVE PENDANT, 6 DIAMONDS', name_ru = 'ПОДВЕСКА LOVE, 6 БРИЛЛИАНТОВ' WHERE id = 108;

-- CARTIER D'AMOUR KOLYE KÜÇÜK MODEL (id=109)
UPDATE products SET name_en = 'CARTIER D''AMOUR NECKLACE SMALL MODEL', name_ru = 'КОЛЬЕ CARTIER D''AMOUR МАЛАЯ МОДЕЛЬ' WHERE id = 109;

-- =====================================================
-- 12. FEATURED PRODUCTS - Kategori Çevirileri
-- =====================================================
UPDATE featured_products SET display_category_en = 'Ring', display_category_ru = 'Кольцо' WHERE display_category = 'Yüzük';
UPDATE featured_products SET display_category_en = 'Bracelet', display_category_ru = 'Браслет' WHERE display_category = 'Bileklik';
UPDATE featured_products SET display_category_en = 'Necklace', display_category_ru = 'Колье' WHERE display_category = 'Kolye';
UPDATE featured_products SET display_category_en = 'Earrings', display_category_ru = 'Серьги' WHERE display_category = 'Küpe';
UPDATE featured_products SET display_category_en = 'Set', display_category_ru = 'Комплект' WHERE display_category = 'Set';

-- =====================================================
-- 13. PRODUCT_STONES - Taş ve Kesim Çevirileri
-- Önce _en/_ru sütunlarını ekle, sonra çevirileri yap
-- =====================================================

-- stone_type ve cut alanları için EN/RU sütunları ekle
ALTER TABLE product_stones
  ADD COLUMN stone_type_en VARCHAR(100) DEFAULT NULL AFTER stone_type,
  ADD COLUMN stone_type_ru VARCHAR(100) DEFAULT NULL AFTER stone_type_en,
  ADD COLUMN cut_en VARCHAR(50) DEFAULT NULL AFTER cut,
  ADD COLUMN cut_ru VARCHAR(50) DEFAULT NULL AFTER cut;

-- Taş türleri çevirileri
UPDATE product_stones SET stone_type_en = 'Diamond', stone_type_ru = 'Бриллиант' WHERE stone_type = 'Pırlanta';
UPDATE product_stones SET stone_type_en = 'Ruby', stone_type_ru = 'Рубин' WHERE stone_type = 'Yakut';
UPDATE product_stones SET stone_type_en = 'Sapphire', stone_type_ru = 'Сапфир' WHERE stone_type = 'Safir';
UPDATE product_stones SET stone_type_en = 'Emerald', stone_type_ru = 'Изумруд' WHERE stone_type = 'Zümrüt';
UPDATE product_stones SET stone_type_en = 'Tanzanite', stone_type_ru = 'Танзанит' WHERE stone_type = 'Tanzanit';
UPDATE product_stones SET stone_type_en = 'Tourmaline', stone_type_ru = 'Турмалин' WHERE stone_type = 'Turmalin';

-- Kesim türleri çevirileri
UPDATE product_stones SET cut_en = 'Round', cut_ru = 'Круглая' WHERE cut = 'Yuvarlak';
UPDATE product_stones SET cut_en = 'Pear', cut_ru = 'Грушевидная' WHERE cut = 'Armut';
UPDATE product_stones SET cut_en = 'Baguette', cut_ru = 'Багет' WHERE cut = 'Baget';
UPDATE product_stones SET cut_en = 'Marquise', cut_ru = 'Маркиз' WHERE cut = 'Markiz';
UPDATE product_stones SET cut_en = 'Oval', cut_ru = 'Овальная' WHERE cut = 'Oval';
UPDATE product_stones SET cut_en = 'Princess', cut_ru = 'Принцесса' WHERE cut = 'Prenses';
UPDATE product_stones SET cut_en = 'Trapeze', cut_ru = 'Трапеция' WHERE cut = 'Trapez';
