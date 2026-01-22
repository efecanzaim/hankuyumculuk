<?php
/**
 * Content.json'dan Veritabanına Migration Script
 * Bu script content.json dosyasındaki tüm verileri veritabanına aktarır
 * 
 * Kullanım: php api/migrate-content.php
 * veya tarayıcıdan: http://yourdomain.com/api/migrate-content.php
 */

require_once 'config.php';

// content.json dosyasını oku
$contentJsonPath = __DIR__ . '/../src/data/content.json';
if (!file_exists($contentJsonPath)) {
    die("content.json dosyası bulunamadı: $contentJsonPath\n");
}

$content = json_decode(file_get_contents($contentJsonPath), true);
if (!$content) {
    die("content.json dosyası geçersiz JSON formatında\n");
}

$db = getDB();
$db->beginTransaction();

try {
    echo "Migration başlatılıyor...\n\n";
    
    // 1. Top Banner
    echo "1. Top Banner ayarları aktarılıyor...\n";
    $stmt = $db->prepare('
        INSERT INTO site_settings (setting_key, setting_value) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE setting_value = ?
    ');
    $stmt->execute([
        'top_banner',
        json_encode($content['topBanner'], JSON_UNESCAPED_UNICODE),
        json_encode($content['topBanner'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 2. Header
    echo "2. Header ayarları aktarılıyor...\n";
    $headerData = $content['header'];
    $stmt->execute([
        'header',
        json_encode($headerData, JSON_UNESCAPED_UNICODE),
        json_encode($headerData, JSON_UNESCAPED_UNICODE)
    ]);
    
    // 3. Hero Slides
    echo "3. Hero slides aktarılıyor...\n";
    $db->exec('DELETE FROM hero_slides'); // Önce temizle
    $stmt = $db->prepare('
        INSERT INTO hero_slides (background_image, title, subtitle, cta_text, cta_link, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ');
    foreach ($content['hero']['slides'] as $index => $slide) {
        $stmt->execute([
            $slide['backgroundImage'],
            $slide['title'],
            $slide['subtitle'],
            $slide['ctaText'],
            $slide['ctaLink'],
            $index,
            1
        ]);
    }
    
    // 4. Trend Section
    echo "4. Trend Section ayarları aktarılıyor...\n";
    $stmt = $db->prepare('
        INSERT INTO site_settings (setting_key, setting_value) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE setting_value = ?
    ');
    $stmt->execute([
        'trend_section',
        json_encode($content['trendSection'], JSON_UNESCAPED_UNICODE),
        json_encode($content['trendSection'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 5. Parallax Section
    echo "5. Parallax Section ayarları aktarılıyor...\n";
    $stmt->execute([
        'parallax_section',
        json_encode($content['parallaxSection'], JSON_UNESCAPED_UNICODE),
        json_encode($content['parallaxSection'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 6. Story Section
    echo "6. Story Section ayarları aktarılıyor...\n";
    $stmt->execute([
        'story_section',
        json_encode($content['storySection'], JSON_UNESCAPED_UNICODE),
        json_encode($content['storySection'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 7. Featured Products Section
    echo "7. Featured Products Section ayarları aktarılıyor...\n";
    $stmt->execute([
        'featured_products_section',
        json_encode($content['featuredProductsSection'], JSON_UNESCAPED_UNICODE),
        json_encode($content['featuredProductsSection'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 8. Featured Products
    echo "8. Featured Products aktarılıyor...\n";
    $stmt->execute([
        'featured_products',
        json_encode($content['featuredProducts'], JSON_UNESCAPED_UNICODE),
        json_encode($content['featuredProducts'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 9. Special Design Section
    echo "9. Special Design Section ayarları aktarılıyor...\n";
    $stmt->execute([
        'special_design_section',
        json_encode($content['specialDesignSection'], JSON_UNESCAPED_UNICODE),
        json_encode($content['specialDesignSection'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 10. Blog Section
    echo "10. Blog Section ayarları aktarılıyor...\n";
    $stmt->execute([
        'blog_section',
        json_encode($content['blogSection'], JSON_UNESCAPED_UNICODE),
        json_encode($content['blogSection'], JSON_UNESCAPED_UNICODE)
    ]);
    
    // 11. Footer
    echo "11. Footer ayarları aktarılıyor...\n";
    $footerData = $content['footer'];
    $stmt->execute([
        'footer',
        json_encode($footerData, JSON_UNESCAPED_UNICODE),
        json_encode($footerData, JSON_UNESCAPED_UNICODE)
    ]);
    
    // Footer columns ayrı olarak kaydet
    if (isset($footerData['columns'])) {
        $stmt->execute([
            'footer_columns',
            json_encode($footerData['columns'], JSON_UNESCAPED_UNICODE),
            json_encode($footerData['columns'], JSON_UNESCAPED_UNICODE)
        ]);
    }
    
    // 12. Mücevher Kategorileri
    echo "12. Mücevher kategorileri aktarılıyor...\n";
    $db->exec('DELETE FROM categories WHERE parent_type = "mucevher"');
    $stmt = $db->prepare('
        INSERT INTO categories (name, slug, parent_type, hero_image, hero_title, hero_subtitle, hero_description, category_title, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');
    
    $mucevherCategories = $content['mucevherCategories'] ?? [];
    foreach ($mucevherCategories as $slug => $category) {
        $stmt->execute([
            ucfirst($slug),
            $slug,
            'mucevher',
            $category['heroImage'] ?? null,
            $category['heroTitle'] ?? null,
            $category['heroSubtitle'] ?? null,
            $category['heroDescription'] ?? null,
            $category['categoryTitle'] ?? null,
            0,
            1
        ]);
        $categoryId = $db->lastInsertId();
        
        // Bu kategorinin ürünlerini ekle
        if (isset($category['products']) && is_array($category['products'])) {
            $productStmt = $db->prepare('
                INSERT INTO products (category_id, name, subtitle, image, link, sort_order, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ');
            foreach ($category['products'] as $pIndex => $product) {
                $productStmt->execute([
                    $categoryId,
                    $product['name'],
                    $product['subtitle'] ?? null,
                    $product['image'] ?? null,
                    $product['link'] ?? null,
                    $pIndex,
                    1
                ]);
            }
        }
    }
    
    // 13. Koleksiyon Kategorileri
    echo "13. Koleksiyon kategorileri aktarılıyor...\n";
    $db->exec('DELETE FROM categories WHERE parent_type = "koleksiyon"');
    // gozumunNuruCategory varsa onu ekle
    if (isset($content['gozumunNuruCategory'])) {
        $cat = $content['gozumunNuruCategory'];
        $stmt->execute([
            'Gözümün Nuru',
            'gozumun-nuru',
            'koleksiyon',
            $cat['heroImage'] ?? null,
            $cat['heroTitle'] ?? null,
            $cat['heroSubtitle'] ?? null,
            $cat['heroDescription'] ?? null,
            $cat['categoryTitle'] ?? null,
            0,
            1
        ]);
        $categoryId = $db->lastInsertId();
        
        if (isset($cat['products']) && is_array($cat['products'])) {
            $productStmt = $db->prepare('
                INSERT INTO products (category_id, name, subtitle, image, link, sort_order, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ');
            foreach ($cat['products'] as $pIndex => $product) {
                $productStmt->execute([
                    $categoryId,
                    $product['name'],
                    $product['subtitle'] ?? null,
                    $product['image'] ?? null,
                    $product['link'] ?? null,
                    $pIndex,
                    1
                ]);
            }
        }
    }
    
    // 14. Hediye Kategorileri
    echo "14. Hediye kategorileri aktarılıyor...\n";
    $db->exec('DELETE FROM categories WHERE parent_type = "hediye"');
    $hediyeCategories = $content['hediyeCategories'] ?? [];
    foreach ($hediyeCategories as $slug => $category) {
        $stmt->execute([
            ucfirst(str_replace('-', ' ', $slug)),
            $slug,
            'hediye',
            $category['heroImage'] ?? null,
            $category['heroTitle'] ?? null,
            $category['heroSubtitle'] ?? null,
            $category['heroDescription'] ?? null,
            $category['categoryTitle'] ?? null,
            0,
            1
        ]);
        $categoryId = $db->lastInsertId();
        
        if (isset($category['products']) && is_array($category['products'])) {
            $productStmt = $db->prepare('
                INSERT INTO products (category_id, name, subtitle, image, link, sort_order, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ');
            foreach ($category['products'] as $pIndex => $product) {
                $productStmt->execute([
                    $categoryId,
                    $product['name'],
                    $product['subtitle'] ?? null,
                    $product['image'] ?? null,
                    $product['link'] ?? null,
                    $pIndex,
                    1
                ]);
            }
        }
    }
    
    // 15. Erkek Kategorileri
    echo "15. Erkek kategorileri aktarılıyor...\n";
    $db->exec('DELETE FROM categories WHERE parent_type = "erkek"');
    $erkekCategories = $content['erkekCategories'] ?? [];
    foreach ($erkekCategories as $slug => $category) {
        $stmt->execute([
            ucfirst($slug),
            $slug,
            'erkek',
            $category['heroImage'] ?? null,
            $category['heroTitle'] ?? null,
            $category['heroSubtitle'] ?? null,
            $category['heroDescription'] ?? null,
            $category['categoryTitle'] ?? null,
            0,
            1
        ]);
        $categoryId = $db->lastInsertId();
        
        if (isset($category['products']) && is_array($category['products'])) {
            $productStmt = $db->prepare('
                INSERT INTO products (category_id, name, subtitle, image, link, sort_order, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ');
            foreach ($category['products'] as $pIndex => $product) {
                $productStmt->execute([
                    $categoryId,
                    $product['name'],
                    $product['subtitle'] ?? null,
                    $product['image'] ?? null,
                    $product['link'] ?? null,
                    $pIndex,
                    1
                ]);
            }
        }
    }
    
    // 16. Preloved Category
    echo "16. Preloved kategorisi aktarılıyor...\n";
    $db->exec('DELETE FROM categories WHERE parent_type = "preloved"');
    if (isset($content['prelovedCategory'])) {
        $cat = $content['prelovedCategory'];
        $stmt->execute([
            'Preloved',
            'preloved',
            'preloved',
            $cat['heroImage'] ?? null,
            $cat['heroTitle'] ?? null,
            $cat['heroSubtitle'] ?? null,
            $cat['heroDescription'] ?? null,
            $cat['categoryTitle'] ?? null,
            0,
            1
        ]);
        $categoryId = $db->lastInsertId();
        
        if (isset($cat['products']) && is_array($cat['products'])) {
            $productStmt = $db->prepare('
                INSERT INTO products (category_id, name, subtitle, image, link, sort_order, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ');
            foreach ($cat['products'] as $pIndex => $product) {
                $productStmt->execute([
                    $categoryId,
                    $product['name'],
                    $product['subtitle'] ?? null,
                    $product['image'] ?? null,
                    $product['link'] ?? null,
                    $pIndex,
                    1
                ]);
            }
        }
    }
    
    // 17. Product Details (ürün detay sayfaları için)
    echo "17. Product Details aktarılıyor...\n";
    if (isset($content['productDetails'])) {
        $stmt->execute([
            'product_details',
            json_encode($content['productDetails'], JSON_UNESCAPED_UNICODE),
            json_encode($content['productDetails'], JSON_UNESCAPED_UNICODE)
        ]);
    }
    
    $db->commit();
    
    echo "\n✅ Migration başarıyla tamamlandı!\n";
    echo "Toplam aktarılan:\n";
    echo "- Site ayarları: 11 bölüm\n";
    echo "- Hero slides: " . count($content['hero']['slides']) . " slide\n";
    echo "- Kategoriler: " . (
        count($content['mucevherCategories'] ?? []) +
        (isset($content['gozumunNuruCategory']) ? 1 : 0) +
        count($content['hediyeCategories'] ?? []) +
        count($content['erkekCategories'] ?? []) +
        (isset($content['prelovedCategory']) ? 1 : 0)
    ) . " kategori\n";
    
} catch (Exception $e) {
    $db->rollBack();
    echo "\n❌ Hata: " . $e->getMessage() . "\n";
    echo "Rollback yapıldı.\n";
    exit(1);
}
?>

