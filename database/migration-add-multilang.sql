-- =====================================================
-- HAN KUYUMCULUK - ÇOKLU DİL DESTEĞİ MİGRASYONI
-- Bu dosyayı cPanel > phpMyAdmin'de çalıştırın
-- Mevcut TR içerikler korunur, EN ve RU sütunları eklenir
-- =====================================================

SET NAMES utf8mb4;

-- =====================================================
-- 1. ÜST BANNER
-- =====================================================
ALTER TABLE top_banner
    ADD COLUMN text_en TEXT AFTER text,
    ADD COLUMN text_ru TEXT AFTER text_en;

-- =====================================================
-- 2. HERO SLIDES
-- =====================================================
ALTER TABLE hero_slides
    ADD COLUMN title_en VARCHAR(255) AFTER title,
    ADD COLUMN title_ru VARCHAR(255) AFTER title_en,
    ADD COLUMN subtitle_en VARCHAR(255) AFTER subtitle,
    ADD COLUMN subtitle_ru VARCHAR(255) AFTER subtitle_en,
    ADD COLUMN button_text_en VARCHAR(100) AFTER button_text,
    ADD COLUMN button_text_ru VARCHAR(100) AFTER button_text_en;

-- =====================================================
-- 3. TREND BÖLÜMÜ
-- =====================================================
ALTER TABLE homepage_trend_section
    ADD COLUMN left_title_en VARCHAR(255) AFTER left_title,
    ADD COLUMN left_title_ru VARCHAR(255) AFTER left_title_en,
    ADD COLUMN right_title_en VARCHAR(255) AFTER right_title,
    ADD COLUMN right_title_ru VARCHAR(255) AFTER right_title_en;

-- =====================================================
-- 4. HİKAYE BÖLÜMÜ
-- =====================================================
ALTER TABLE homepage_story_section
    ADD COLUMN title_en VARCHAR(255) AFTER title,
    ADD COLUMN title_ru VARCHAR(255) AFTER title_en,
    ADD COLUMN main_text_en TEXT AFTER main_text,
    ADD COLUMN main_text_ru TEXT AFTER main_text_en,
    ADD COLUMN sub_text_en TEXT AFTER sub_text,
    ADD COLUMN sub_text_ru TEXT AFTER sub_text_en,
    ADD COLUMN link_text_en VARCHAR(100) AFTER link_text,
    ADD COLUMN link_text_ru VARCHAR(100) AFTER link_text_en;

-- =====================================================
-- 5. ÖNE ÇIKAN ÜRÜNLER BÖLÜMÜ
-- =====================================================
ALTER TABLE homepage_featured_section
    ADD COLUMN title_part1_en VARCHAR(100) AFTER title_part1,
    ADD COLUMN title_part1_ru VARCHAR(100) AFTER title_part1_en,
    ADD COLUMN title_part2_en VARCHAR(100) AFTER title_part2,
    ADD COLUMN title_part2_ru VARCHAR(100) AFTER title_part2_en;

-- =====================================================
-- 6. ÖZEL TASARIM BÖLÜMÜ
-- =====================================================
ALTER TABLE homepage_special_section
    ADD COLUMN title_part1_en VARCHAR(100) AFTER title_part1,
    ADD COLUMN title_part1_ru VARCHAR(100) AFTER title_part1_en,
    ADD COLUMN title_part2_en VARCHAR(100) AFTER title_part2,
    ADD COLUMN title_part2_ru VARCHAR(100) AFTER title_part2_en;

-- =====================================================
-- 7. ANA SAYFA KARTLARI
-- =====================================================
ALTER TABLE homepage_cards
    ADD COLUMN title_en VARCHAR(100) AFTER title,
    ADD COLUMN title_ru VARCHAR(100) AFTER title_en,
    ADD COLUMN subtitle_en TEXT AFTER subtitle,
    ADD COLUMN subtitle_ru TEXT AFTER subtitle_en,
    ADD COLUMN button_text_en VARCHAR(50) AFTER button_text,
    ADD COLUMN button_text_ru VARCHAR(50) AFTER button_text_en;

-- =====================================================
-- 8. YATIRIM BÖLÜMÜ
-- =====================================================
ALTER TABLE homepage_investment_section
    ADD COLUMN title_en TEXT AFTER title,
    ADD COLUMN title_ru TEXT AFTER title_en,
    ADD COLUMN description_en TEXT AFTER description,
    ADD COLUMN description_ru TEXT AFTER description_en,
    ADD COLUMN button_text_en VARCHAR(100) AFTER button_text,
    ADD COLUMN button_text_ru VARCHAR(100) AFTER button_text_en;

-- =====================================================
-- 9. BLOG BÖLÜMÜ
-- =====================================================
ALTER TABLE homepage_blog_section
    ADD COLUMN title_en TEXT AFTER title,
    ADD COLUMN title_ru TEXT AFTER title_en,
    ADD COLUMN subtitle_en VARCHAR(100) AFTER subtitle,
    ADD COLUMN subtitle_ru VARCHAR(100) AFTER subtitle_en,
    ADD COLUMN description_en TEXT AFTER description,
    ADD COLUMN description_ru TEXT AFTER description_en,
    ADD COLUMN additional_text_en TEXT AFTER additional_text,
    ADD COLUMN additional_text_ru TEXT AFTER additional_text_en,
    ADD COLUMN link_text_en VARCHAR(100) AFTER link_text,
    ADD COLUMN link_text_ru VARCHAR(100) AFTER link_text_en;

-- =====================================================
-- 10. KATEGORİLER
-- =====================================================
ALTER TABLE categories
    ADD COLUMN name_en VARCHAR(100) AFTER name,
    ADD COLUMN name_ru VARCHAR(100) AFTER name_en,
    ADD COLUMN hero_title_en VARCHAR(255) AFTER hero_title,
    ADD COLUMN hero_title_ru VARCHAR(255) AFTER hero_title_en,
    ADD COLUMN hero_subtitle_en VARCHAR(255) AFTER hero_subtitle,
    ADD COLUMN hero_subtitle_ru VARCHAR(255) AFTER hero_subtitle_en,
    ADD COLUMN hero_description_en TEXT AFTER hero_description,
    ADD COLUMN hero_description_ru TEXT AFTER hero_description_en,
    ADD COLUMN list_title_en VARCHAR(255) AFTER list_title,
    ADD COLUMN list_title_ru VARCHAR(255) AFTER list_title_en;

-- =====================================================
-- 11. ÜRÜNLER
-- =====================================================
ALTER TABLE products
    ADD COLUMN name_en VARCHAR(255) AFTER name,
    ADD COLUMN name_ru VARCHAR(255) AFTER name_en,
    ADD COLUMN subtitle_en VARCHAR(255) AFTER subtitle,
    ADD COLUMN subtitle_ru VARCHAR(255) AFTER subtitle_en,
    ADD COLUMN description_en TEXT AFTER description,
    ADD COLUMN description_ru TEXT AFTER description_en;

-- =====================================================
-- 12. ÖNE ÇIKAN ÜRÜNLER
-- =====================================================
ALTER TABLE featured_products
    ADD COLUMN display_name_en VARCHAR(255) AFTER display_name,
    ADD COLUMN display_name_ru VARCHAR(255) AFTER display_name_en,
    ADD COLUMN display_category_en VARCHAR(100) AFTER display_category,
    ADD COLUMN display_category_ru VARCHAR(100) AFTER display_category_en;

-- =====================================================
-- 13. FOOTER AYARLARI
-- =====================================================
ALTER TABLE footer_settings
    ADD COLUMN slogan_en VARCHAR(255) AFTER slogan,
    ADD COLUMN slogan_ru VARCHAR(255) AFTER slogan_en,
    ADD COLUMN description TEXT AFTER copyright_text,
    ADD COLUMN description_en TEXT AFTER description,
    ADD COLUMN description_ru TEXT AFTER description_en,
    ADD COLUMN copyright_text_en VARCHAR(255) AFTER description_ru,
    ADD COLUMN copyright_text_ru VARCHAR(255) AFTER copyright_text_en;

-- =====================================================
-- 14. FOOTER SÜTUN BAŞLIKLARI
-- =====================================================
ALTER TABLE footer_columns
    ADD COLUMN title_en VARCHAR(100) AFTER title,
    ADD COLUMN title_ru VARCHAR(100) AFTER title_en;

-- =====================================================
-- 15. FOOTER LİNKLERİ
-- =====================================================
ALTER TABLE footer_links
    ADD COLUMN text_en VARCHAR(100) AFTER text,
    ADD COLUMN text_ru VARCHAR(100) AFTER text_en;

-- =====================================================
-- 16. SAYFALAR
-- =====================================================
ALTER TABLE pages
    ADD COLUMN title_en VARCHAR(255) AFTER title,
    ADD COLUMN title_ru VARCHAR(255) AFTER title_en,
    ADD COLUMN hero_title_en VARCHAR(255) AFTER hero_title,
    ADD COLUMN hero_title_ru VARCHAR(255) AFTER hero_title_en,
    ADD COLUMN hero_subtitle_en VARCHAR(255) AFTER hero_subtitle,
    ADD COLUMN hero_subtitle_ru VARCHAR(255) AFTER hero_subtitle_en,
    ADD COLUMN content_en LONGTEXT AFTER content,
    ADD COLUMN content_ru LONGTEXT AFTER content_en,
    ADD COLUMN meta_title_en VARCHAR(255) AFTER meta_title,
    ADD COLUMN meta_title_ru VARCHAR(255) AFTER meta_title_en,
    ADD COLUMN meta_description_en TEXT AFTER meta_description,
    ADD COLUMN meta_description_ru TEXT AFTER meta_description_en;

-- =====================================================
-- 17. İLETİŞİM BİLGİLERİ
-- =====================================================
ALTER TABLE contact_info
    ADD COLUMN address_en TEXT AFTER address,
    ADD COLUMN address_ru TEXT AFTER address_en,
    ADD COLUMN working_hours_en VARCHAR(255) AFTER working_hours,
    ADD COLUMN working_hours_ru VARCHAR(255) AFTER working_hours_en;

-- =====================================================
-- 18. BLOG YAZILARI
-- =====================================================
ALTER TABLE blog_posts
    ADD COLUMN title_en VARCHAR(255) AFTER title,
    ADD COLUMN title_ru VARCHAR(255) AFTER title_en,
    ADD COLUMN excerpt_en TEXT AFTER excerpt,
    ADD COLUMN excerpt_ru TEXT AFTER excerpt_en,
    ADD COLUMN content_en LONGTEXT AFTER content,
    ADD COLUMN content_ru LONGTEXT AFTER content_en;

-- =====================================================
-- 19. HAKKIMIZDA DEĞERLERİ (Eğer mevcut ise)
-- =====================================================
-- about_values tablonuz varsa:
-- ALTER TABLE about_values
--     ADD COLUMN title_en VARCHAR(100) AFTER title,
--     ADD COLUMN title_ru VARCHAR(100) AFTER title_en,
--     ADD COLUMN description_en TEXT AFTER description,
--     ADD COLUMN description_ru TEXT AFTER description_en;

-- =====================================================
-- MİGRASYON TAMAMLANDI
-- =====================================================
-- Not: Mevcut Türkçe içerikler korunur.
-- EN ve RU sütunları NULL olarak başlar.
-- Admin panelden bu alanları doldurabilirsiniz.
