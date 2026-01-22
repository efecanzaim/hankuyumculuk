<?php
/**
 * Tüm İçerik API
 * Frontend için tüm site içeriğini tek seferde döndürür
 * Yeni veritabanı şemasına göre güncellenmiştir
 */

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Sadece GET metodu kabul edilir'], 405);
}

$db = getDB();

try {
    // =====================================================
    // HEADER AYARLARI
    // =====================================================
    $stmt = $db->query('SELECT * FROM header_settings LIMIT 1');
    $headerSettings = $stmt->fetch() ?: [];
    
    // =====================================================
    // ÜST BANNER
    // =====================================================
    $stmt = $db->query('SELECT * FROM top_banner WHERE is_visible = 1 LIMIT 1');
    $topBanner = $stmt->fetch();
    
    // =====================================================
    // HERO SLIDES
    // =====================================================
    $stmt = $db->query('SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC');
    $heroSlides = $stmt->fetchAll();
    
    // =====================================================
    // TREND BÖLÜMÜ
    // =====================================================
    $stmt = $db->query('SELECT * FROM homepage_trend_section WHERE is_active = 1 LIMIT 1');
    $trendSection = $stmt->fetch();
    
    // =====================================================
    // PARALLAX BÖLÜMÜ
    // =====================================================
    $stmt = $db->query('SELECT * FROM homepage_parallax_section WHERE is_active = 1 LIMIT 1');
    $parallaxSection = $stmt->fetch();
    
    // =====================================================
    // HİKAYE BÖLÜMÜ
    // =====================================================
    $stmt = $db->query('SELECT * FROM homepage_story_section WHERE is_active = 1 LIMIT 1');
    $storySection = $stmt->fetch();
    
    // =====================================================
    // ÖNE ÇIKAN ÜRÜNLER BÖLÜMÜ
    // =====================================================
    $stmt = $db->query('SELECT * FROM homepage_featured_section WHERE is_active = 1 LIMIT 1');
    $featuredSection = $stmt->fetch();
    
    // =====================================================
    // ÖZEL TASARIM BÖLÜMÜ
    // =====================================================
    $stmt = $db->query('SELECT * FROM homepage_special_section WHERE is_active = 1 LIMIT 1');
    $specialSection = $stmt->fetch();
    
    // =====================================================
    // ANA SAYFA KARTLARI
    // =====================================================
    $stmt = $db->query('SELECT * FROM homepage_cards WHERE is_active = 1 ORDER BY section_type, sort_order ASC');
    $allCards = $stmt->fetchAll();
    
    $topCards = [];
    $bottomCards = [];
    foreach ($allCards as $card) {
        $formattedCard = [
            'id' => (int)($card['id'] ?? 0),
            'title' => $card['title'] ?? '',
            'subtitle' => $card['subtitle'] ?? '',
            'image' => $card['image'] ?? '',
            'link' => $card['link'] ?? '',
            'buttonText' => $card['button_text'] ?? ''
        ];
        if ($card['section_type'] === 'top') {
            $topCards[] = $formattedCard;
        } else {
            $bottomCards[] = $formattedCard;
        }
    }
    
    // =====================================================
    // BLOG BÖLÜMÜ
    // =====================================================
    $stmt = $db->query('SELECT * FROM homepage_blog_section WHERE is_active = 1 LIMIT 1');
    $blogSection = $stmt->fetch();
    
    // =====================================================
    // FOOTER AYARLARI
    // =====================================================
    $stmt = $db->query('SELECT * FROM footer_settings LIMIT 1');
    $footerSettings = $stmt->fetch() ?: [];
    
    // Footer sütunları ve linkleri
    $stmt = $db->query('SELECT * FROM footer_columns WHERE is_active = 1 ORDER BY sort_order ASC');
    $footerColumns = $stmt->fetchAll();
    
    $stmt = $db->query('SELECT * FROM footer_links WHERE is_active = 1 ORDER BY column_id, sort_order ASC');
    $footerLinks = $stmt->fetchAll();
    
    // Linkleri sütunlara göre grupla
    $linksByColumn = [];
    foreach ($footerLinks as $link) {
        $colId = $link['column_id'];
        if (!isset($linksByColumn[$colId])) {
            $linksByColumn[$colId] = [];
        }
        $linksByColumn[$colId][] = [
            'text' => $link['text'],
            'href' => $link['url']
        ];
    }
    
    // Sütunları formatla
    $formattedColumns = [];
    foreach ($footerColumns as $column) {
        $formattedColumns[] = [
            'title' => $column['title'],
            'links' => $linksByColumn[$column['id']] ?? []
        ];
    }
    
    // =====================================================
    // İLETİŞİM BİLGİLERİ
    // =====================================================
    $stmt = $db->query('SELECT * FROM contact_info LIMIT 1');
    $contactInfo = $stmt->fetch() ?: [];
    
    // =====================================================
    // SOSYAL MEDYA
    // =====================================================
    $stmt = $db->query('SELECT * FROM social_media WHERE is_active = 1 ORDER BY sort_order ASC');
    $socialMedia = $stmt->fetchAll();
    
    $socialLinks = [];
    foreach ($socialMedia as $social) {
        $socialLinks[$social['platform']] = $social['url'];
    }
    
    // =====================================================
    // KATEGORİLER
    // =====================================================
    $stmt = $db->query('SELECT * FROM categories WHERE is_active = 1 ORDER BY parent_type, sort_order ASC');
    $categories = $stmt->fetchAll();
    
    // =====================================================
    // ÜRÜNLER
    // =====================================================
    $stmt = $db->query('SELECT * FROM products WHERE is_active = 1 ORDER BY category_id, sort_order ASC');
    $products = $stmt->fetchAll();
    
    // Ürünleri kategorilere göre grupla
    $productsByCategory = [];
    foreach ($products as $product) {
        $catId = $product['category_id'];
        if (!isset($productsByCategory[$catId])) {
            $productsByCategory[$catId] = [];
        }
        if ($product['gallery_images']) {
            $product['gallery_images'] = json_decode($product['gallery_images'], true);
        }
        $productsByCategory[$catId][] = $product;
    }
    
    // Kategorileri formatla ve ürünlerini ekle
    $categoriesByType = [];
    foreach ($categories as $category) {
        $catProducts = $productsByCategory[$category['id']] ?? [];
        $formattedProducts = array_map(function($p) {
            return [
                'id' => (int)$p['id'],
                'slug' => $p['slug'] ?? '',
                'image' => $p['main_image'] ?? '',
                'name' => $p['name'] ?? '',
                'subtitle' => $p['subtitle'] ?? '',
                'link' => '/urun/' . ($p['slug'] ?? '')
            ];
        }, $catProducts);
        
        $formattedCategory = [
            'id' => (int)$category['id'],
            'slug' => $category['slug'] ?? '',
            'name' => $category['name'] ?? '',
            'heroImage' => $category['hero_image'] ?? '',
            'heroTitle' => $category['hero_title'] ?? '',
            'heroSubtitle' => $category['hero_subtitle'] ?? '',
            'heroDescription' => $category['hero_description'] ?? '',
            'categoryTitle' => $category['list_title'] ?? '',
            'products' => $formattedProducts
        ];
        
        $parentType = $category['parent_type'];
        if (!isset($categoriesByType[$parentType])) {
            $categoriesByType[$parentType] = [];
        }
        $categoriesByType[$parentType][$category['slug']] = $formattedCategory;
    }
    
    // =====================================================
    // ÖNE ÇIKAN ÜRÜNLER (Ana sayfa için)
    // =====================================================
    $stmt = $db->query('
        SELECT fp.*, p.main_image, p.slug as product_slug, p.name as product_name, p.subtitle as product_subtitle
        FROM featured_products fp
        JOIN products p ON fp.product_id = p.id
        WHERE fp.is_active = 1 AND p.is_active = 1
        ORDER BY fp.sort_order ASC
    ');
    $featuredProducts = $stmt->fetchAll();
    
    $formattedFeaturedProducts = array_map(function($fp) {
        return [
            'id' => (int)($fp['id'] ?? 0),
            'image' => $fp['main_image'] ?? '',
            'name' => $fp['display_name'] ?: ($fp['product_name'] ?? ''),
            'category' => $fp['display_category'] ?? '',
            'link' => '/urun/' . ($fp['product_slug'] ?? '')
        ];
    }, $featuredProducts);
    
    // =====================================================
    // TÜM VERİYİ BİRLEŞTİR
    // =====================================================
    $content = [
        // Top Banner
        'topBanner' => [
            'text' => $topBanner['text'] ?? '',
            'link' => $topBanner['link'] ?? '',
            'visible' => (bool)($topBanner['is_visible'] ?? false)
        ],
        
        // Header
        'header' => [
            'logo' => $headerSettings['logo_image'] ?? '/images/logo.png',
            'logoAlt' => $headerSettings['logo_alt'] ?? 'Han Kuyumculuk',
            'topLinks' => [
                ['text' => 'Hakkımızda', 'href' => '/hakkimizda'],
                ['text' => 'Blog', 'href' => '/blog']
            ],
            'mainNav' => [
                ['text' => 'MÜCEVHER', 'href' => '/mucevher'],
                ['text' => 'KOLEKSİYON', 'href' => '/koleksiyon'],
                ['text' => 'ÖZEL TASARIM', 'href' => '/ozel-tasarim'],
                ['text' => 'HEDİYE', 'href' => '/hediye']
            ]
        ],
        
        // Hero Slider
        'hero' => [
            'slides' => array_map(function($slide) {
                return [
                    'id' => (int)$slide['id'],
                    'backgroundImage' => $slide['background_media'] ?? '',
                    'mediaType' => $slide['media_type'] ?? 'image',
                    'title' => $slide['title'] ?? '',
                    'subtitle' => $slide['subtitle'] ?? '',
                    'ctaText' => $slide['button_text'] ?? '',
                    'ctaLink' => $slide['button_link'] ?? ''
                ];
            }, $heroSlides)
        ],
        
        // Trend Section
        'trendSection' => $trendSection ? [
            'leftImage' => $trendSection['left_image'] ?? '',
            'leftTitle' => $trendSection['left_title'] ?? '',
            'leftTitleLink' => $trendSection['left_link'] ?? '',
            'rightImage' => $trendSection['right_image'] ?? '',
            'rightTitle' => $trendSection['right_title'] ?? '',
            'rightTitleLink' => $trendSection['right_link'] ?? ''
        ] : null,
        
        // Parallax Section
        'parallaxSection' => $parallaxSection ? [
            'backgroundImage' => $parallaxSection['background_image'] ?? '/images/parallax-bg.jpg'
        ] : ['backgroundImage' => '/images/parallax-bg.jpg'],
        
        // Story Section
        'storySection' => $storySection ? [
            'title' => $storySection['title'] ?? '',
            'mainText' => $storySection['main_text'] ?? '',
            'subText' => $storySection['sub_text'] ?? '',
            'linkText' => $storySection['link_text'] ?? '',
            'linkUrl' => $storySection['link_url'] ?? ''
        ] : null,
        
        // Featured Products Section
        'featuredProductsSection' => $featuredSection ? [
            'titlePart1' => $featuredSection['title_part1'] ?? 'SİZE ÖZEL',
            'titlePart2' => $featuredSection['title_part2'] ?? 'ÜRÜNLERİMİZ',
            'bannerImage1' => $featuredSection['banner_image1'] ?? '/images/products/featured-large-1.jpg',
            'bannerImage2' => $featuredSection['banner_image2'] ?? '/images/products/featured-large-2.jpg'
        ] : [
            'titlePart1' => 'SİZE ÖZEL',
            'titlePart2' => 'ÜRÜNLERİMİZ',
            'bannerImage1' => '/images/products/featured-large-1.jpg',
            'bannerImage2' => '/images/products/featured-large-2.jpg'
        ],
        
        // Featured Products (Ana sayfada gösterilen ürünler)
        'featuredProducts' => $formattedFeaturedProducts,
        
        // Special Design Section
        'specialDesignSection' => [
            'titlePart1' => $specialSection['title_part1'] ?? 'KENDİNİZİ',
            'titlePart2' => $specialSection['title_part2'] ?? 'ÖZEL HİSSEDİN',
            'topCards' => $topCards,
            'bottomCards' => $bottomCards
        ],
        
        // Blog Section
        'blogSection' => $blogSection ? [
            'title' => $blogSection['title'] ?? '',
            'subtitle' => $blogSection['subtitle'] ?? '',
            'description' => $blogSection['description'] ?? '',
            'additionalText' => $blogSection['additional_text'] ?? '',
            'image' => $blogSection['image'] ?? '',
            'linkText' => $blogSection['link_text'] ?? '',
            'linkUrl' => $blogSection['link_url'] ?? ''
        ] : null,
        
        // Footer
        'footer' => [
            'logo' => $footerSettings['logo_image'] ?? '/images/1818-logo.svg',
            'slogan' => $footerSettings['slogan'] ?? 'Işıltının anlama dönüştüğü yer.',
            'copyright' => $footerSettings['copyright_text'] ?? '© 2025 Han Kuyumculuk, Tüm Hakları Saklıdır',
            'columns' => $formattedColumns,
            'socialLinks' => $socialLinks
        ],
        
        // Contact
        'contact' => [
            'address' => $contactInfo['address'] ?? '',
            'phone' => $contactInfo['phone'] ?? '',
            'email' => $contactInfo['email'] ?? '',
            'workingHours' => $contactInfo['working_hours'] ?? '',
            'mapEmbed' => $contactInfo['map_embed'] ?? ''
        ],
        
        // Kategoriler (content.json formatında)
        'mucevherCategories' => $categoriesByType['mucevher'] ?? [],
        'koleksiyonCategories' => $categoriesByType['koleksiyon'] ?? [],
        'hediyeCategories' => $categoriesByType['hediye'] ?? [],
        'erkekCategories' => $categoriesByType['erkek'] ?? [],
        'prelovedCategory' => $categoriesByType['preloved']['preloved'] ?? null,
        'yatirimCategory' => $categoriesByType['yatirim']['yatirim'] ?? null,
        'ozelTasarimCategory' => $categoriesByType['ozel_tasarim']['ozel-tasarim'] ?? null,
        
        // Meta bilgiler
        '_meta' => [
            'generatedAt' => date('c'),
            'totalProducts' => count($products),
            'totalCategories' => count($categories)
        ]
    ];
    
    jsonResponse($content);
    
} catch (Exception $e) {
    jsonResponse(['error' => 'İçerik yüklenemedi: ' . $e->getMessage()], 500);
}
?>
