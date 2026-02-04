-- =====================================================
-- HAN KUYUMCULUK - VERİTABANI ŞEMASI
-- Bu dosyayı cPanel > phpMyAdmin'de çalıştırın
-- =====================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- 1. ADMIN KULLANICILARI
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. GENEL AYARLAR (Tekil değerler için)
-- =====================================================
CREATE TABLE IF NOT EXISTS general_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(50) UNIQUE NOT NULL COMMENT 'Ayar anahtarı',
    setting_value TEXT COMMENT 'Ayar değeri',
    setting_type ENUM('text', 'textarea', 'image', 'boolean', 'json') DEFAULT 'text',
    description VARCHAR(255) COMMENT 'Ayar açıklaması',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. HEADER AYARLARI
-- =====================================================
CREATE TABLE IF NOT EXISTS header_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    logo_image VARCHAR(255) DEFAULT '/images/logo.png',
    logo_alt VARCHAR(100) DEFAULT 'Han Kuyumculuk',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3.1 Header Üst Linkler (Hakkımızda, Blog vb.)
CREATE TABLE IF NOT EXISTS header_top_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(100) NOT NULL COMMENT 'Link metni',
    url VARCHAR(255) NOT NULL COMMENT 'Link adresi',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3.2 Header Ana Menü Linkleri
CREATE TABLE IF NOT EXISTS header_main_nav (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(100) NOT NULL COMMENT 'Menü metni',
    url VARCHAR(255) NOT NULL COMMENT 'Menü linki',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. ÜST BANNER (Duyuru Alanı)
-- =====================================================
CREATE TABLE IF NOT EXISTS top_banner (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL COMMENT 'Banner metni',
    link VARCHAR(255) COMMENT 'Tıklanınca gidilecek link',
    is_visible BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. HERO SLIDER (Ana Sayfa Slider)
-- =====================================================
CREATE TABLE IF NOT EXISTS hero_slides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    background_media VARCHAR(255) NOT NULL COMMENT 'Görsel veya video dosyası',
    media_type ENUM('image', 'video') DEFAULT 'image',
    title VARCHAR(255) COMMENT 'Başlık',
    subtitle VARCHAR(255) COMMENT 'Alt başlık',
    button_text VARCHAR(100) COMMENT 'Buton metni',
    button_link VARCHAR(255) COMMENT 'Buton linki',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. ANA SAYFA BÖLÜMLERİ
-- =====================================================

-- 6.1 Trend Bölümü (İki sütunlu görsel alan)
CREATE TABLE IF NOT EXISTS homepage_trend_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    left_image VARCHAR(255),
    left_title VARCHAR(255),
    left_title_link VARCHAR(255),
    left_link VARCHAR(255),
    right_image VARCHAR(255),
    right_title VARCHAR(255),
    right_title_link VARCHAR(255),
    right_link VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6.2 Parallax Bölümü
CREATE TABLE IF NOT EXISTS homepage_parallax_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    background_image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6.3 Hikaye Bölümü
CREATE TABLE IF NOT EXISTS homepage_story_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    main_text TEXT,
    sub_text TEXT,
    link_text VARCHAR(100),
    link_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6.4 Öne Çıkan Ürünler Bölümü
CREATE TABLE IF NOT EXISTS homepage_featured_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_part1 VARCHAR(100) DEFAULT 'SİZE ÖZEL',
    title_part2 VARCHAR(100) DEFAULT 'ÜRÜNLERİMİZ',
    banner_image1 VARCHAR(255),
    banner_image2 VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6.5 Özel Tasarım Kartları Bölümü
CREATE TABLE IF NOT EXISTS homepage_special_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_part1 VARCHAR(100) DEFAULT 'KENDİNİZİ',
    title_part2 VARCHAR(100) DEFAULT 'ÖZEL HİSSEDİN',
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6.6 Özel Tasarım Kartları
CREATE TABLE IF NOT EXISTS homepage_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_type ENUM('top', 'bottom') NOT NULL COMMENT 'Üst veya alt kartlar',
    title VARCHAR(100) NOT NULL,
    subtitle TEXT,
    image VARCHAR(255),
    link VARCHAR(255),
    button_text VARCHAR(50),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6.7 Yatırım Bölümü
CREATE TABLE IF NOT EXISTS homepage_investment_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    left_image VARCHAR(255),
    right_image VARCHAR(255),
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6.8 Blog Bölümü
CREATE TABLE IF NOT EXISTS homepage_blog_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    subtitle VARCHAR(100),
    description TEXT,
    additional_text TEXT,
    image VARCHAR(255),
    link_text VARCHAR(100),
    link_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. KATEGORİLER
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_type ENUM('mucevher', 'koleksiyon', 'hediye', 'erkek', 'preloved', 'yatirim', 'ozel_tasarim') NOT NULL COMMENT 'Ana kategori türü',
    name VARCHAR(100) NOT NULL COMMENT 'Kategori adı',
    slug VARCHAR(100) UNIQUE NOT NULL COMMENT 'URL için slug',
    -- Hero alanı
    hero_image VARCHAR(255) COMMENT 'Kategori hero görseli',
    hero_title VARCHAR(255) COMMENT 'Hero başlık',
    hero_subtitle VARCHAR(255) COMMENT 'Hero alt başlık',
    hero_description TEXT COMMENT 'Hero açıklama metni',
    -- Liste başlığı
    list_title VARCHAR(255) COMMENT 'Ürün listesi başlığı',
    -- Sıralama ve durum
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. ÜRÜNLER
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT COMMENT 'Bağlı olduğu kategori',
    slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'URL için slug',
    -- Temel bilgiler
    name VARCHAR(255) NOT NULL COMMENT 'Ürün adı',
    subtitle VARCHAR(255) COMMENT 'Alt başlık (ör: 0,55 Karat)',
    description TEXT COMMENT 'Ürün açıklaması',
    -- Görseller
    main_image VARCHAR(255) COMMENT 'Ana ürün görseli',
    banner_image VARCHAR(255) COMMENT 'Detay sayfası banner',
    gallery_images JSON COMMENT 'Galeri görselleri dizisi',
    -- Sertifika Bilgileri - Altın
    gold_weight DECIMAL(10,2) COMMENT 'Altın ağırlığı (gram)',
    gold_karat INT COMMENT 'Altın ayar (14, 18, 22 vb.)',
    -- Durum ve sıralama
    is_featured BOOLEAN DEFAULT FALSE COMMENT 'Ana sayfada gösterilsin mi',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8.1 ÜRÜN TAŞ BİLGİLERİ (Sertifika)
-- =====================================================
CREATE TABLE IF NOT EXISTS product_stones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL COMMENT 'Bağlı olduğu ürün',
    stone_type VARCHAR(100) NOT NULL COMMENT 'Taş türü (Pırlanta, Yakut vb.)',
    carat DECIMAL(10,2) COMMENT 'Karat değeri',
    quantity INT DEFAULT 1 COMMENT 'Taş adedi',
    color VARCHAR(20) COMMENT 'Renk (F, G, H vb.)',
    clarity VARCHAR(20) COMMENT 'Berraklık (VS, VVS, SI vb.)',
    cut VARCHAR(50) COMMENT 'Kesim (Yuvarlak, Baget, Prenses vb.)',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. ÖNE ÇIKAN ÜRÜNLER (Ana sayfa için seçilenler)
-- =====================================================
CREATE TABLE IF NOT EXISTS featured_products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    display_name VARCHAR(255) COMMENT 'Görüntülenecek isim (farklı olabilir)',
    display_category VARCHAR(100) COMMENT 'Görüntülenecek kategori etiketi',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9.1 KATEGORİ-ÜRÜN İLİŞKİSİ (Kategori sayfalarında gösterilecek ürünler)
-- =====================================================
CREATE TABLE IF NOT EXISTS category_products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL COMMENT 'Kategori ID',
    product_id INT NOT NULL COMMENT 'Ürün ID',
    sort_order INT DEFAULT 0 COMMENT 'Sıralama',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Aktif mi',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_category_product (category_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. FOOTER AYARLARI
-- =====================================================
CREATE TABLE IF NOT EXISTS footer_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    logo_image VARCHAR(255),
    slogan VARCHAR(255),
    copyright_text VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 11. FOOTER MENÜ SÜTUNLARI
-- =====================================================
CREATE TABLE IF NOT EXISTS footer_columns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL COMMENT 'Sütun başlığı',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 12. FOOTER MENÜ LİNKLERİ
-- =====================================================
CREATE TABLE IF NOT EXISTS footer_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    column_id INT NOT NULL,
    text VARCHAR(100) NOT NULL COMMENT 'Link metni',
    url VARCHAR(255) NOT NULL COMMENT 'Link adresi',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (column_id) REFERENCES footer_columns(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 13. İLETİŞİM BİLGİLERİ
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    working_hours VARCHAR(255),
    map_embed TEXT COMMENT 'Google Maps embed kodu',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 14. SOSYAL MEDYA HESAPLARI
-- =====================================================
CREATE TABLE IF NOT EXISTS social_media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    platform VARCHAR(50) NOT NULL COMMENT 'instagram, facebook, twitter vb.',
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(50) COMMENT 'İkon sınıfı',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 15. SAYFALAR (Hakkımızda, Özel Tasarım vb.)
-- =====================================================
CREATE TABLE IF NOT EXISTS pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL COMMENT 'URL için slug',
    title VARCHAR(255) NOT NULL COMMENT 'Sayfa başlığı',
    -- Hero alanı
    hero_image VARCHAR(255),
    hero_title VARCHAR(255),
    hero_subtitle VARCHAR(255),
    -- İçerik
    content LONGTEXT COMMENT 'Sayfa içeriği (HTML destekli)',
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    -- Durum
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 16. MEDYA GALERİSİ
-- =====================================================
CREATE TABLE IF NOT EXISTS media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) COMMENT 'image/jpeg, video/mp4 vb.',
    file_size INT COMMENT 'Dosya boyutu (byte)',
    width INT COMMENT 'Görsel genişliği',
    height INT COMMENT 'Görsel yüksekliği',
    alt_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 17. RANDEVULAR (Opsiyonel)
-- =====================================================
CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes TEXT,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 18. BLOG YAZILARI
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL COMMENT 'Blog başlığı',
    slug VARCHAR(255) NOT NULL UNIQUE COMMENT 'URL için benzersiz slug',
    excerpt TEXT COMMENT 'Kısa özet (liste görünümünde gösterilir)',
    content LONGTEXT COMMENT 'Blog içeriği (tam metin)',
    image VARCHAR(500) COMMENT 'Ana görsel',
    author VARCHAR(100) DEFAULT 'Han Kuyumculuk' COMMENT 'Yazar adı',
    status ENUM('draft', 'published') DEFAULT 'draft' COMMENT 'Durum (taslak/yayında)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Oluşturulma tarihi',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Güncellenme tarihi',
    published_at TIMESTAMP NULL COMMENT 'Yayınlanma tarihi'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INDEX'LER (Performans için)
-- =====================================================
CREATE INDEX idx_categories_parent ON categories(parent_type);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_hero_slides_order ON hero_slides(sort_order);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- BAŞLANGIÇ VERİLERİ
-- =====================================================

-- Admin kullanıcısı (şifre: hankuyumculuk2024)
INSERT INTO admin_users (username, password_hash, email, full_name) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@hankuyumculuk.com', 'Admin');

-- Header ayarları
INSERT INTO header_settings (logo_image, logo_alt) VALUES
('/images/logo.png', 'Han Kuyumculuk');

-- Üst banner
INSERT INTO top_banner (text, is_visible) VALUES
('Çok yakında sizlerle buluşuyoruz… Yeni koleksiyonlarımız için bizi takip edin!', TRUE);

-- Hero Slides
INSERT INTO hero_slides (background_media, media_type, title, subtitle, button_text, button_link, sort_order) VALUES
('/images/hero-bg.jpg', 'image', 'zarafet  sanatı', 'EŞSIZ TASARIMLAR, ZAMANSIZ DEĞERLER', 'MÜCEVHERLERİ KEŞFEDİN', '/mucevher', 1),
('/images/hero-bg2.mp4', 'video', 'sonsuz masal', 'HER PARÇADA BİR HİKÂYE SAKLANIYOR', 'KOLEKSİYONLARI KEŞFEDİN', '/koleksiyon', 2),
('/images/hero-bg3.jpg', 'image', 'özel  randevu', 'SİZE ÖZEL BİR DENEYİM İÇİN', 'RANDEVU OLUŞTURUN', '/randevu', 3),
('/images/hero-bg4.mp4', 'video', 'nadide  sanat', 'SADECE SİZE ÖZEL TASARIMLAR', 'SİZE ÖZEL', '/ozel-tasarim', 4);

-- Trend bölümü
INSERT INTO homepage_trend_section (left_image, left_title, left_title_link, left_link, right_image, right_title, right_title_link, right_link) VALUES
('/images/trend-left.jpg', 'Tasarımlarımızı Keşfedin', '/mucevher/yuzuk', '/mucevher/yuzuk', '/images/trend-right.jpg', 'Koleksiyonumuzu Keşfedin', '/koleksiyon/gozumun-nuru', '/koleksiyon/gozumun-nuru');

-- Parallax bölümü
INSERT INTO homepage_parallax_section (background_image) VALUES
('/images/parallax-bg.jpg');

-- Hikaye bölümü
INSERT INTO homepage_story_section (title, main_text, sub_text, link_text, link_url) VALUES
('Zarafetiyle Bir Hikaye',
'Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür.',
'Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır.',
'Işığın Aşka Dönüştüğü Hikâye', '/hikaye');

-- Öne çıkan ürünler bölümü
INSERT INTO homepage_featured_section (title_part1, title_part2, banner_image1, banner_image2) VALUES
('SİZE ÖZEL', 'ÜRÜNLERİMİZ', '/images/products/featured-large-1.jpg', '/images/products/featured-large-2.jpg');

-- Özel tasarım kartları bölümü
INSERT INTO homepage_special_section (title_part1, title_part2) VALUES
('KENDİNİZİ', 'ÖZEL HİSSEDİN');

-- Ana sayfa kartları (Üst)
INSERT INTO homepage_cards (section_type, title, image, link, button_text, sort_order) VALUES
('top', 'HEDİYE', '/images/categories/mucevher-card.jpg', '/hediye/dogum-gunu', 'KEŞFEDİN', 1),
('top', 'ERKEKLERE ÖZEL', '/images/categories/koleksiyon-card.jpg', '/erkek/tesbih', 'KEŞFEDİN', 2),
('top', 'ÖZEL TASARIM', '/images/categories/ozel-tasarim-card.jpg', '/ozel-tasarim', 'KEŞFEDİN', 3);

-- Ana sayfa kartları (Alt)
INSERT INTO homepage_cards (section_type, title, subtitle, image, link, button_text, sort_order) VALUES
('bottom', 'PRELOVED', 'Yeni sezon pırlanta\ntasarımları ile stilinizi aydınlatın.', '/images/promo/goz-alici.jpg', '/preloved', 'ÜRÜNLERİ İNCELEYİN', 1),
('bottom', 'RANDEVU OLUŞTURUN', 'Size özel bir deneyim için\nrandevu alın, sizi bekliyor olacağız.', '/images/promo/yeni-gelenler.jpg', '/randevu', 'RANDEVU ALIN', 2);

-- Yatırım bölümü
INSERT INTO homepage_investment_section (title, description, left_image, right_image, button_text, button_link) VALUES
('BUGÜNDEN\nYARINLARA\nGÜVENLE',
'Kalitesi sertifikalı yatırımlık altın ürünleriyle geleceğinizi güvenle şekillendirin. Her gram, istikrarlı bir adım demektir.',
'/images/investment.jpg', '/images/investment-product.jpg', 'YATIRIMLIK ÜRÜNLER', '/yatirim');

-- Blog bölümü
INSERT INTO homepage_blog_section (title, subtitle, description, additional_text, image, link_text, link_url) VALUES
('Pırlantanın Hikâyesi,\nZarafetin İlhamı', 'HAN BLOG',
'Gözümün Nuru Blog, pırlantanın yalnızca bir mücevher değil; anlam, duygu ve hikâye taşıyan bir değer olduğuna inananlar için hazırlandı.',
'Bu alanda; yüzüklerden kolyelere, özel gün hediyelerinden pırlanta seçme rehberlerine kadar merak edilen tüm detayları, ilham veren içerikler ve uzman bakış açılarıyla bulacaksınız.',
'/images/blog-featured.jpg', 'yazının devamı', '/blog/pirlanta-hikayeleri');

-- Footer ayarları
INSERT INTO footer_settings (logo_image, slogan, copyright_text) VALUES
('/images/1818-logo.svg', 'Seninle güzelleşir her şey…', '© 2025 Han Kuyumculuk, Tüm Hakları Saklıdır');

-- Footer sütunları
INSERT INTO footer_columns (title, sort_order) VALUES
('HAN KUYUMCULUK', 1),
('KOLEKSİYON', 2),
('MÜŞTERİ HİZMETLERİ', 3),
('YASAL', 4);

-- Footer linkleri
INSERT INTO footer_links (column_id, text, url, sort_order) VALUES
(1, 'Hakkımızda', '/hakkimizda', 1),
(1, 'İletişim', '/iletisim', 2),
(1, 'Blog', '/blog', 3),
(2, 'Gözümün Nuru', '/koleksiyon/gozumun-nuru', 1),
(3, 'Bakım ve Garanti', '/musteri-hizmetleri/bakim-garanti', 1),
(4, 'Çerez Politikası', '/yasal/cerez-politikasi', 1);

-- İletişim bilgileri
INSERT INTO contact_info (address, phone, email, working_hours) VALUES
('Liman Mahallesi, Akdeniz Bulvarı, No: 257 Fenix Center Konyaaltı/Antalya',
'+90 242 XXX XX XX', 'info@hankuyumculuk.com', 'Haftanın Her Günü: 10:00 - 20:00');

-- Sosyal medya hesapları
INSERT INTO social_media (platform, url, icon, sort_order) VALUES
('instagram', 'https://www.instagram.com/hankuyumculuk', 'instagram', 1),
('instagram', 'https://www.instagram.com/hankuyumculuk_', 'instagram', 2);

-- =====================================================
-- KATEGORİLER
-- =====================================================

-- Mücevher kategorileri
INSERT INTO categories (parent_type, name, slug, hero_image, hero_title, hero_subtitle, hero_description, list_title, sort_order) VALUES
('mucevher', 'Yüzük', 'yuzuk', '/images/mucevher-menu-hero.jpg', 'Aşkın En Değerli İmzası', 'Zamana meydan okuyan pırlanta imzalar.', 'Bu yüzük, eldeyken değilken de.\nBazen bakınca, bazen sadece hissedince…\nSöze gelmeyen bir yerden.\nYerine başka bir şey konmayan gibi.\nBirlikte kalan…', 'PIRLANTA YÜZÜKLERİMİZ', 1),
('mucevher', 'Kolye', 'kolye', '/images/mucevher-menu-hero.jpg', 'Zarafetin En Saf Hali', 'Her bakışta ışıldayan tasarımlar.', 'Bu kolye, bir bakışla başlayan şeyler için.\nYaklaştıkça hissedilen, adı konmadan kalan…\nGösterişten uzak, kalbe yakın.\nKorunmak istenen bir şeye benzer.\nHer an biraz daha…', 'PIRLANTA KOLYELERİMİZ', 2),
('mucevher', 'Bileklik', 'bileklik', '/images/mucevher-menu-hero.jpg', 'Bileğinizde Işık', 'Her harekette zarafet.', 'Bu bileklik, günün içinde sessizce eşlik edenler gibi.\nHareket ettikçe fark edilen, durdukça var olan…\nGündelik hayata karışır.\nUnutturmadan, bastırmadan.\nFarkındalığı taze tutar gibi…', 'PIRLANTA BİLEKLİKLERİMİZ', 3),
('mucevher', 'Küpe', 'kupe', '/images/mucevher-menu-hero.jpg', 'Işıltının Dokunuşu', 'Kulaklarınızda parıldayan zarafet.', 'Bu küpeler, ilk anda değil zamanla.\nYakınlaştıkça, alıştıkça…\nHafif ama izi kalan bir his.\nSade, sessiz.\nBakışların arasında…', 'PIRLANTA KÜPELERİMİZ', 4),
('mucevher', 'Set', 'set', '/images/mucevher-menu-hero.jpg', 'Kusursuz Uyum', 'Tamamlayıcı parçalarla bütünlük.', 'Bu set, bir bütün arayanlar için.\nTek başına değil, birlikte anlam bulan…\nParçalar ayrı ayrı güzel,\nama yan yana geldiklerinde başka.\nTamamlanmış hissettiren gibi…', 'PIRLANTA SETLERİMİZ', 5);

-- Koleksiyon kategorileri
INSERT INTO categories (parent_type, name, slug, hero_image, hero_title, hero_subtitle, hero_description, list_title, sort_order) VALUES
('koleksiyon', 'Gözümün Nuru', 'gozumun-nuru', '/images/collection-menu-hero.jpg', 'Gözümün Nuru', 'Sevdiklerinize özel, anlam dolu tasarımlar.', 'Gözümün Nuru koleksiyonu,\nsevgi ve değerin sembolü\nolarak tasarlandı.', 'GÖZÜMÜN NURU', 1);

-- Hediye kategorileri
INSERT INTO categories (parent_type, name, slug, hero_image, hero_title, hero_subtitle, hero_description, list_title, sort_order) VALUES
('hediye', 'Doğum Günü', 'dogum-gunu', '/images/hediye-menu-hero.jpg', 'Doğum Günü Işıltısı', 'En güzel doğum günü hediyesi.', 'Sevdiklerinizin doğum gününü özel kılacak hediye seçenekleri. Her yaşa ve tarza uygun pırlanta tasarımlar.', 'DOĞUM GÜNÜ HEDİYELERİ', 1),
('hediye', 'Anneler Günü', 'anneler-gunu', '/images/hediye-menu-hero.jpg', 'Anneler İçin Özel', 'En değerli kadına, en değerli hediye.', 'Annenize olan sevginizi ifade edecek özel pırlanta tasarımlar. Zarif, anlamlı ve kalıcı hediyeler.', 'ANNELER GÜNÜ HEDİYELERİ', 2),
('hediye', 'Kadınlar Günü', 'kadinlar-gunu', '/images/hediye-menu-hero.jpg', 'Kadınlara Özel', 'Güçlü ve zarif kadınlara.', 'Kadınlar gününde hayatınızdaki özel kadınlara anlamlı bir hediye verin. Şıklık ve zarafeti bir arada sunan tasarımlar.', 'KADINLAR GÜNÜ HEDİYELERİ', 3),
('hediye', 'Özel Günler', 'ozel-gunler', '/images/hediye-menu-hero.jpg', 'Özel Anlar İçin', 'Unutulmaz hediyeler.', 'Hayatınızın en özel anlarını kutlamak için tasarlanmış hediye seçenekleri. Nişan, düğün, yıldönümü veya herhangi bir özel gün için mükemmel seçimler.', 'ÖZEL GÜNLER HEDİYELERİ', 4),
('hediye', 'Yeni Doğan', 'yeni-dogan', '/images/hediye-menu-hero.jpg', 'Minik Melekler İçin', 'Yeni başlangıçlara özel hediyeler.', 'Yeni doğan bebeklere ve ailelerine özel, anlamlı hediye seçenekleri. Hayata hoş geldin hediyesi olarak mükemmel.', 'YENİ DOĞAN HEDİYELERİ', 5),
('hediye', 'Aksesuar', 'aksesuar', '/images/hediye-menu-hero.jpg', 'Tamamlayıcı Dokunuşlar', 'Stilinizi tamamlayın.', 'Mücevher koleksiyonunuzu tamamlayacak aksesuarlar. Saç tokalarından mücevher kutularına özel seçenekler.', 'AKSESUARLAR', 6);

-- Erkek kategorileri
INSERT INTO categories (parent_type, name, slug, hero_image, hero_title, hero_subtitle, hero_description, list_title, sort_order) VALUES
('erkek', 'Tesbih', 'tesbih', '/images/erkek-menu-hero.jpg', 'Geleneksel Zarafet', 'Her tanede huzur.', 'Elde tutunca ilk fark edilen şey sessizlik.\nZaman biraz gevşiyor, düşünce yavaşlıyor.\nSayılar değil, aralar kalıyor.\nBakarken değil, dururken anlamlı.\nBir süre sonra fark edilmiyor bile…', 'TESBİH KOLEKSİYONU', 1),
('erkek', 'Erkek Bileklik', 'erkek-bileklik', '/images/erkek-menu-hero.jpg', 'Erkek Şıklığı', 'Bileğinizde güç ve zarafet.', 'Göze gelmeden eşlik eden bir şey gibi.\nHareket ettikçe kendini belli ediyor.\nGünün içine karışıyor, geride kalmıyor.\nNe fazla, ne eksik.\nOradayken doğal…', 'ERKEK BİLEKLİKLERİ', 2),
('erkek', 'Erkek Yüzük', 'erkek-yuzuk', '/images/erkek-menu-hero.jpg', 'Erkek Yüzükleri', 'Güç ve karakterin simgesi.', 'Ele baktıkça değişen bir his.\nBazen alışkanlık, bazen ağırlık gibi.\nSöze gelmeyen bir yerden.\nNe anlatmak istiyor, ne saklamak.\nSadece duruyor…', 'ERKEK YÜZÜKLERİ', 3);

-- Preloved kategorisi
INSERT INTO categories (parent_type, name, slug, hero_image, hero_title, hero_subtitle, hero_description, list_title, sort_order) VALUES
('preloved', 'Preloved', 'preloved', '/images/mucevher-menu-hero.jpg', 'Preloved', 'Zamanla değerinden hiçbir şey kaybetmeyen parçalar.', 'Bazı mücevherler vardır;\nzamanla değerinden hiçbir şey kaybetmez.\nTasarımı, işçiliği ve duruşuyla hâlâ ilk günkü etkisini taşır.\n\nPreloved parçalar,\nözenle seçilmiş, özgünlüğü korunmuş\nve yeniden keşfedilmeyi bekleyen mücevherlerden oluşur.', 'PRELOVED KOLEKSİYONU', 1);

-- =====================================================
-- ÖRNEK ÜRÜNLER
-- =====================================================

-- Yüzük ürünleri
INSERT INTO products (category_id, slug, name, subtitle, description, main_image, banner_image, gallery_images, sort_order) VALUES
(1, 'sarmasik-inci-tanem', 'Sarmaşık İnci Tanem', '0,22 Karat Vintage Reina Pırlanta Yüzük',
'Sevginin en güçlü sembolünü zarafetle buluşturur. Özenle seçilmiş pırlantalar ve usta işçilikle hazırlanan her yüzük; evlilikten yıldönümüne, özel anlardan kalıcı hatıralara kadar hayatınızdaki en anlamlı \'evet\'lere eşlik etmek için tasarlandı.',
'/images/products/product-1.jpg', '/images/hero-bg.jpg',
'["/images/products/product-1.jpg", "/images/products/product-2.jpg", "/images/products/product-3.jpg"]', 1),

(1, 'baget-reina-yuzuk', 'Baget Reina Yüzük', '0,49 Karat Pırlanta Yüzük',
'Baget kesim pırlantaların geometrik zarafeti, modern çizgilerle buluşuyor. Her açıdan ışığı yakalayan özel tasarım, günlük şıklığınızı tamamlarken özel anlarda da göz kamaştırıcı bir etki yaratır.',
'/images/products/product-2.jpg', '/images/hero-bg.jpg',
'["/images/products/product-2.jpg", "/images/products/product-3.jpg", "/images/products/product-4.jpg"]', 2),

(1, 'lotus-tektas-yuzuk', 'Lotus Tektaş Pırlanta Yüzük', '0,34 Karat Lotus Tektaş',
'Lotus çiçeğinin zarif açılışından ilham alan bu tektaş yüzük, merkez pırlantayı benzersiz bir şekilde öne çıkarır. Yaprakların yumuşak kıvrımları, ışığın her açıdan dansını sergiler.',
'/images/products/product-3.jpg', '/images/hero-bg.jpg',
'["/images/products/product-3.jpg", "/images/products/product-4.jpg", "/images/products/product-1.jpg"]', 3),

(1, 'harmony-pirlanta-yuzuk', 'Harmony Pırlanta Yüzük', '0,55 Karat Tektaş',
'Zamansız elegans ve modern tasarımın buluştuğu nokta. Harmony serisi, pırlantanın doğal güzelliğini en saf haliyle ortaya koyar.',
'/images/products/product-4.jpg', '/images/hero-bg.jpg',
'["/images/products/product-4.jpg", "/images/products/product-1.jpg", "/images/products/product-2.jpg"]', 4);

-- Kolye ürünleri
INSERT INTO products (category_id, slug, name, subtitle, description, main_image, banner_image, gallery_images, sort_order) VALUES
(2, 'damla-pirlanta-kolye', 'Damla Pırlanta Kolye', '0,30 Karat Damla Pırlanta',
'Damla formundaki zarif tasarım, boynunuza doğal bir akış kazandırır. Merkez pırlanta, ışığı her açıdan yakalayarak büyüleyici bir parlaklık sunar.',
'/images/products/product-1.jpg', '/images/hero-bg.jpg',
'["/images/products/product-1.jpg", "/images/products/product-2.jpg", "/images/products/product-3.jpg"]', 1),

(2, 'su-yolu-kolye', 'Su Yolu Kolye', '0,55 Karat Su Yolu Pırlanta',
'Akan suyun zarafetinden ilham alan bu kolye, pırlantaların süzülüşünü yansıtır. Her bir taş, ışığın dansını sergilerken boynunuza eşsiz bir hareket katar.',
'/images/products/product-2.jpg', '/images/hero-bg.jpg',
'["/images/products/product-2.jpg", "/images/products/product-3.jpg", "/images/products/product-4.jpg"]', 2),

(2, 'tektas-pirlanta-kolye', 'Tektaş Pırlanta Kolye', '0,25 Karat Tektaş',
'Sadeliğin en zarif hali. Tek bir pırlantanın göz alıcı ışıltısı, minimalist tasarımla birleşerek zamansız bir şıklık sunar.',
'/images/products/product-3.jpg', '/images/hero-bg.jpg',
'["/images/products/product-3.jpg", "/images/products/product-4.jpg", "/images/products/product-1.jpg"]', 3);

-- Bileklik ürünleri
INSERT INTO products (category_id, slug, name, subtitle, description, main_image, banner_image, gallery_images, sort_order) VALUES
(3, 'su-yolu-bileklik', 'Su Yolu Bileklik', '1,00 Karat Su Yolu Pırlanta',
'Akan suyun zarafetinden ilham alan tasarım, bileğinizde ışıltılı bir hareket yaratır. Her pırlanta, ışığın büyüleyici dansını sergiler.',
'/images/products/product-1.jpg', '/images/hero-bg.jpg',
'["/images/products/product-1.jpg", "/images/products/product-2.jpg", "/images/products/product-3.jpg"]', 1),

(3, 'yakamoz-bileklik', 'Yakamoz Pırlanta Bileklik', '0,10 Karat Pırlanta',
'Deniz yüzeyindeki ışık oyunlarından ilham alan tasarım. Bileğinizde hafif ve zarif bir parıltı sunar.',
'/images/products/product-2.jpg', '/images/hero-bg.jpg',
'["/images/products/product-2.jpg", "/images/products/product-3.jpg", "/images/products/product-4.jpg"]', 2),

(3, 'baget-bileklik', 'Baget Pırlanta Bileklik', '0,31 Karat Baget Pırlanta',
'Baget kesim pırlantaların geometrik zarafeti, bileğinizde modern bir şıklık yaratır.',
'/images/products/product-3.jpg', '/images/hero-bg.jpg',
'["/images/products/product-3.jpg", "/images/products/product-4.jpg", "/images/products/product-1.jpg"]', 3);

-- Öne çıkan ürünler (Ana sayfa için)
INSERT INTO featured_products (product_id, display_name, display_category, sort_order) VALUES
(4, 'Harmony Pırlanta Yüzük 0,55 Karat', 'PIRLANTA YÜZÜK', 1),
(7, 'Su Yolu Bileklik 1,00 Karat Pırlanta', 'PIRLANTA BİLEKLİK', 2),
(8, 'Yakamoz Pırlanta Bileklik 0,10 Karat', 'PIRLANTA BİLEKLİK', 3),
(9, 'Baget Pırlanta Bileklik 0,31 Karat', 'PIRLANTA BİLEKLİK', 4);

-- Özel Tasarım sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content) VALUES
('ozel-tasarim', 'Özel Tasarım', '/images/ozel-tasarim-hero.jpg', 'Size Özel Tasarımlar', 'Hayalinizdeki mücevheri birlikte tasarlayalım',
'<p>Han Kuyumculuk olarak, sizin için özel tasarım mücevherler üretiyoruz. Hayalinizdeki yüzüğü, kolyeyi veya bilekliği birlikte tasarlayalım.</p>');

-- Preloved sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content) VALUES
('preloved', 'Preloved', '/images/preloved-hero.jpg', 'Preloved Koleksiyon', 'Zamana meydan okuyan parçalar',
'<p>Özenle seçilmiş, özgünlüğü korunmuş ve yeniden keşfedilmeyi bekleyen mücevherler.</p>');

-- Yatırım sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content, meta_title, meta_description) VALUES
('yatirim', 'Yatırımlık Ürünler', '/images/investment.jpg', 'DEĞER', 'KORUMA',
'<p>Geleceğe güvenle bakın. Yatırımlık altın ürünlerimizle birikimlerinizi değerli metallere dönüştürün. Güvenilir ve sertifikalı ürünler.</p><p>Gram altından tam altına, çeyrekten yarım altına kadar geniş ürün yelpazemizle tasarruflarınızı koruma altına alın. Her ürün, uluslararası standartlarda sertifikalıdır.</p><p>Altın, yüzyıllardır değerini koruyan en güvenilir yatırım aracı. Han Kuyumculuk güvencesiyle yatırımlarınızı şekillendirin.</p><p>Uzman danışmanlarımız, yatırım hedeflerinize uygun ürünleri seçmenizde size rehberlik eder. Güvenli saklama ve sigorta seçenekleriyle huzurlu bir yatırım deneyimi.</p>',
'Yatırımlık Ürünler - Han Kuyumculuk', 'Yatırımlık altın ürünleri, sertifikalı altın ve güvenli yatırım seçenekleri.');

-- =====================================================
-- HEADER MENÜ LİNKLERİ
-- =====================================================

-- Header üst linkler
INSERT INTO header_top_links (text, url, sort_order) VALUES
('Hakkımızda', '/hakkimizda', 1),
('Blog', '/blog', 2);

-- Header ana menü linkleri
INSERT INTO header_main_nav (text, url, sort_order) VALUES
('MÜCEVHER', '/mucevher', 1),
('KOLEKSİYON', '/koleksiyon', 2),
('ÖZEL TASARIM', '/ozel-tasarim', 3),
('HEDİYE', '/hediye', 4);

-- =====================================================
-- EKSİK SAYFALAR
-- =====================================================

-- İletişim sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content, meta_title, meta_description) VALUES
('iletisim', 'İletişim', '/images/contact-hero.jpg', 'İletişim', 'Sizinle tanışmak için sabırsızlanıyoruz',
'<p>Han Kuyumculuk olarak, size en iyi hizmeti sunmak için buradayız. Sorularınız, önerileriniz veya özel tasarım talepleriniz için bizimle iletişime geçebilirsiniz.</p>',
'İletişim - Han Kuyumculuk', 'Han Kuyumculuk iletişim bilgileri, adres, telefon ve çalışma saatleri.');

-- Randevu sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content, meta_title, meta_description) VALUES
('randevu', 'Randevu Oluşturun', '/images/categories/ozel-tasarim-card.jpg', 'Randevu Oluşturun', 'Özel tasarım süreciniz için bir adım atın. Size uygun bir zamanda buluşalım.',
'<p>Özel tasarım görüşmeleri ve kişiye özel alışveriş deneyimi için randevu alabilirsiniz. Size özel bir deneyim sunmak için sabırsızlanıyoruz.</p>',
'Randevu Oluşturun - Han Kuyumculuk', 'Han Kuyumculuk randevu sistemi. Özel tasarım görüşmeleri için randevu alın.');

-- Blog sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content, meta_title, meta_description) VALUES
('blog', 'Blog', '/images/blog-featured.jpg', 'Pırlantanın Hikâyesi, Zarafetin İlhamı', 'HAN BLOG',
'<p>Gözümün Nuru Blog, pırlantanın yalnızca bir mücevher değil; anlam, duygu ve hikâye taşıyan bir değer olduğuna inananlar için hazırlandı.</p><p>Bu alanda; yüzüklerden kolyelere, özel gün hediyelerinden pırlanta seçme rehberlerine kadar merak edilen tüm detayları, ilham veren içerikler ve uzman bakış açılarıyla bulacaksınız.</p>',
'Blog - Han Kuyumculuk', 'Pırlanta hikâyeleri, mücevher bakımı, tasarım ipuçları ve daha fazlası.');

-- Hakkımızda sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content, meta_title, meta_description) VALUES
('hakkimizda', 'Hakkımızda', '/images/about-hero.jpg', 'Hakkımızda | Han Kuyumculuk', '1988 yılında İstanbul''da kurulan Han Kuyumculuk, mücevher üretimini bir zanaat değil; bir disiplin, bir süreklilik ve bir sorumluluk olarak gören köklü bir üretici kuruluştur.',
'<p>1988 yılında İstanbul''da kurulan Han Kuyumculuk, mücevher üretimini bir zanaat değil; bir disiplin, bir süreklilik ve bir sorumluluk olarak gören köklü bir üretici kuruluştur.</p><p>Kuruluşundan bu yana geçen yıllar boyunca Han Kuyumculuk, tasarımdan üretime uzanan tüm süreçlerde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır. İstanbul''un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek markanın karakterini oluşturur.</p><p>Han, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir. Her tasarımında zarafeti ön planda tutarken, sertifikalı pırlantalar ve en kaliteli malzemelerle çalışır.</p><p>Her mücevher, kendine özgü bir hikâye taşır. Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir. Tasarımlar; dönemsel etkilerden bağımsız, uzun yıllar değerini koruyacak bir estetik anlayışla şekillendirilir.</p><p>Zamansızlığı esas alan Han, her parçada duyguyu detaya çevirir. Gösterişten ziyade, hissettirmeyi merkeze alan bir yaklaşımla, her ışıltının arkasında bir bağlantı, bir anlam, bir sevgi saklı olmasını sağlar.</p><p>Han Kuyumculuk, değerini yitirmeyen yakınlıklardan doğan koleksiyonlarıyla, seçilmiş, düşünülmüş ve uzun vadeli bir değerin sembolü olarak sanat ve zanaatle hizmet vermektedir.</p>',
'Hakkımızda - Han Kuyumculuk', 'Han Kuyumculuk hikâyesi, kuruluşu 1988''de, değerlerimiz ve vizyonumuz.');

-- Bakım ve Garanti sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content, meta_title, meta_description) VALUES
('musteri-hizmetleri/bakim-garanti', 'Bakım ve Garanti Koşulları', NULL, 'Bakım ve Garanti Koşulları', NULL,
'<h2>Değerli Taş ve İnci Mücevher</h2><h3>1. Günlük Kullanım ve Bakım Uyarıları</h3><p>Elmas, değerli taş ve inci içeren mücevherler; doğal yapıları ve montaj hassasiyetleri nedeniyle özenli kullanım gerektirir.</p><h3>2. Temizlik Talimatları</h3><p>Temizlik işlemi, yalnızca ürüne uygun bakım kitleri ve yumuşak kıllı fırçalar kullanılarak yapılmalıdır.</p><h3>3. Garanti Kapsamı</h3><p>Mücevherler, teslim tarihinden itibaren garanti kapsamındadır.</p><h2>Altın ve Platin Mücevher</h2><h3>1. Ürün Bakımına İlişkin Bilgilendirme</h3><p>Altın ve platin mücevherler; doğal özellikleri, el işçiliği ve değerli taş içermeleri sebebiyle hassas ürünlerdir.</p>',
'Bakım ve Garanti - Han Kuyumculuk', 'Han Kuyumculuk bakım ve garanti koşulları, mücevher bakımı ve garanti kapsamı.');

-- Çerez Politikası sayfası
INSERT INTO pages (slug, title, hero_image, hero_title, hero_subtitle, content, meta_title, meta_description) VALUES
('yasal/cerez-politikasi', 'Çerez Politikası', NULL, 'Çerez Politikası', NULL,
'<h2>Han Kuyumculuk Çerez Politikası</h2><p>Han Kuyumculuk olarak çerezler kullanmaktayız. Çerezler, internet sitemiz üzerinden bilgi topladığımız ve bazı durumlarda internet sitemizi kullanımınıza ilişkin bilgileri takip edebildiğimiz otomatik araçlardır.</p><h2>Çerezler hangi amaçlarla kullanılır?</h2><h3>1. Çerezler İnternet Sitesinin Temel İşlevlerini Destekler</h3><p>Bazı çerezler, internet sitemizin temel işlevlerinin çalışabilmesi için gerekli olan zorunlu ve işlevsel çerezlerdir.</p><h3>2. Çerezler İnternet Sitemizin ve Hizmetlerimizin Kalitesini Artırmaya Yardımcı Olur</h3><p>Çerezler internet sitemizi nasıl kullandığınıza ilişkin bilgiler toplar.</p>',
'Çerez Politikası - Han Kuyumculuk', 'Han Kuyumculuk çerez politikası ve gizlilik bildirimi.');

-- =====================================================
-- İLETİŞİM BİLGİLERİ GÜNCELLEMESİ
-- =====================================================

-- İletişim bilgilerini güncelle (mevcut kaydı güncelle)
UPDATE contact_info SET 
    address = 'Liman Mahallesi, Akdeniz Bulvarı, No: 257 Fenix Center Konyaaltı/Antalya',
    phone = '+90 (242) 212 34 56',
    email = 'info@hankuyumculuk.com',
    working_hours = 'Haftanın Her Günü: 10:00 - 20:00',
    map_embed = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8477013417514!2d30.602089575529437!3d36.84612336511002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39303a734f60f%3A0xe343a4fa77583d88!2sFenix%20Center%20AVM!5e0!3m2!1str!2str!4v1768831178229!5m2!1str!2str" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
WHERE id = 1;

-- =====================================================
-- SOSYAL MEDYA GÜNCELLEMESİ
-- =====================================================

-- Sosyal medya hesaplarını güncelle
UPDATE social_media SET 
    url = 'https://www.instagram.com/gozumunnuru.antalya',
    icon = 'instagram',
    sort_order = 1
WHERE id = 1;

UPDATE social_media SET 
    url = 'https://www.instagram.com/hankuyumculuk_',
    icon = 'instagram',
    sort_order = 2
WHERE id = 2;
