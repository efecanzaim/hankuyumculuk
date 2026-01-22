<?php
/**
 * Ürünler API
 * GET: Ürünleri getir
 * POST: Yeni ürün ekle
 * PUT: Ürün güncelle
 * DELETE: Ürün sil
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        // Ürünleri getir
        $categoryId = $_GET['categoryId'] ?? null;
        $slug = $_GET['slug'] ?? null;
        $id = $_GET['id'] ?? null;
        $featured = $_GET['featured'] ?? null;

        if ($id) {
            // Tek ürün getir (ID ile)
            $stmt = $db->prepare('
                SELECT p.*, c.name as category_name, c.slug as category_slug, c.parent_type
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.id = ? AND p.is_active = 1
            ');
            $stmt->execute([$id]);
            $product = $stmt->fetch();

            if ($product) {
                $product = formatProduct($product);
                jsonResponse($product);
            } else {
                jsonResponse(['error' => 'Ürün bulunamadı'], 404);
            }
        } elseif ($slug) {
            // Tek ürün getir (slug ile)
            $stmt = $db->prepare('
                SELECT p.*, c.name as category_name, c.slug as category_slug, c.parent_type
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.slug = ? AND p.is_active = 1
            ');
            $stmt->execute([$slug]);
            $product = $stmt->fetch();

            if ($product) {
                $product = formatProduct($product);
                jsonResponse($product);
            } else {
                jsonResponse(['error' => 'Ürün bulunamadı'], 404);
            }
        } elseif ($featured) {
            // Öne çıkan ürünleri getir (Ana sayfa için)
            $stmt = $db->query('
                SELECT fp.*, p.main_image, p.slug as product_slug
                FROM featured_products fp
                JOIN products p ON fp.product_id = p.id
                WHERE fp.is_active = 1 AND p.is_active = 1
                ORDER BY fp.sort_order ASC
            ');
            $featuredProducts = $stmt->fetchAll();

            $formatted = array_map(function($fp) {
                return [
                    'id' => (int)$fp['id'],
                    'productId' => (int)$fp['product_id'],
                    'image' => $fp['main_image'],
                    'name' => $fp['display_name'],
                    'category' => $fp['display_category'],
                    'link' => '/urun/' . $fp['product_slug']
                ];
            }, $featuredProducts);

            jsonResponse($formatted);
        } else {
            // Tüm ürünleri getir
            $sql = '
                SELECT p.*, c.name as category_name, c.slug as category_slug, c.parent_type
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.is_active = 1
            ';
            $params = [];

            if ($categoryId) {
                $sql .= ' AND p.category_id = ?';
                $params[] = $categoryId;
            }

            $sql .= ' ORDER BY p.sort_order ASC';

            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $products = $stmt->fetchAll();

            // Format products
            $formatted = array_map('formatProduct', $products);

            jsonResponse($formatted);
        }
        break;

    case 'POST':
        // Auth gerekli
        requireAuth();

        // Yeni ürün ekle
        $data = getJsonBody();

        if (empty($data['name'])) {
            jsonResponse(['error' => 'Ürün adı gerekli'], 400);
        }

        // Slug oluştur
        $slug = $data['slug'] ?? createSlug($data['name']);

        // Slug benzersiz mi kontrol et
        $stmt = $db->prepare('SELECT id FROM products WHERE slug = ?');
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug = $slug . '-' . time();
        }

        $galleryImages = isset($data['galleryImages']) ? json_encode($data['galleryImages']) :
                        (isset($data['gallery_images']) ? json_encode($data['gallery_images']) : null);

        $stmt = $db->prepare('
            INSERT INTO products (category_id, slug, name, subtitle, description, main_image, banner_image, gallery_images, is_featured, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $data['categoryId'] ?? $data['category_id'] ?? null,
            $slug,
            $data['name'],
            $data['subtitle'] ?? null,
            $data['description'] ?? null,
            $data['mainImage'] ?? $data['main_image'] ?? $data['image'] ?? null,
            $data['bannerImage'] ?? $data['banner_image'] ?? null,
            $galleryImages,
            $data['isFeatured'] ?? $data['is_featured'] ?? 0,
            $data['sortOrder'] ?? $data['sort_order'] ?? 0
        ]);

        $insertId = $db->lastInsertId();
        jsonResponse(['success' => true, 'id' => $insertId, 'slug' => $slug, 'message' => 'Ürün eklendi']);
        break;

    case 'PUT':
        // Auth gerekli
        requireAuth();

        // Ürün güncelle
        $data = getJsonBody();

        if (empty($data['id'])) {
            jsonResponse(['error' => 'Ürün ID gerekli'], 400);
        }

        $id = $data['id'];

        // Alanları maple (camelCase -> snake_case)
        $fieldMap = [
            'categoryId' => 'category_id',
            'mainImage' => 'main_image',
            'bannerImage' => 'banner_image',
            'galleryImages' => 'gallery_images',
            'isFeatured' => 'is_featured',
            'sortOrder' => 'sort_order',
            'isActive' => 'is_active'
        ];

        $fields = [];
        $values = [];

        foreach ($data as $key => $value) {
            if ($key === 'id') continue;

            // gallery_images varsa JSON'a çevir
            if ($key === 'galleryImages' || $key === 'gallery_images') {
                $value = json_encode($value);
            }

            // camelCase ise snake_case'e çevir
            $dbField = $fieldMap[$key] ?? $key;
            $fields[] = "$dbField = ?";
            $values[] = $value;
        }

        if (empty($fields)) {
            jsonResponse(['error' => 'Güncellenecek alan yok'], 400);
        }

        $values[] = $id;
        $sql = 'UPDATE products SET ' . implode(', ', $fields) . ' WHERE id = ?';

        $stmt = $db->prepare($sql);
        $stmt->execute($values);

        jsonResponse(['success' => true, 'message' => 'Ürün güncellendi']);
        break;

    case 'DELETE':
        // Auth gerekli
        requireAuth();

        // Ürün sil (soft delete)
        $id = $_GET['id'] ?? null;

        if (!$id) {
            jsonResponse(['error' => 'Ürün ID gerekli'], 400);
        }

        $stmt = $db->prepare('UPDATE products SET is_active = 0 WHERE id = ?');
        $stmt->execute([$id]);

        jsonResponse(['success' => true, 'message' => 'Ürün silindi']);
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}

/**
 * Ürün verisini frontend formatına çevir
 */
function formatProduct($product) {
    // gallery_images JSON olarak parse et
    $galleryImages = null;
    if (!empty($product['gallery_images'])) {
        $galleryImages = json_decode($product['gallery_images'], true);
    }

    return [
        'id' => (int)$product['id'],
        'categoryId' => $product['category_id'] ? (int)$product['category_id'] : null,
        'categoryName' => $product['category_name'] ?? null,
        'categorySlug' => $product['category_slug'] ?? null,
        'parentType' => $product['parent_type'] ?? null,
        'slug' => $product['slug'],
        'name' => $product['name'],
        'subtitle' => $product['subtitle'],
        'description' => $product['description'],
        'mainImage' => $product['main_image'],
        'bannerImage' => $product['banner_image'],
        'galleryImages' => $galleryImages,
        'isFeatured' => (bool)$product['is_featured'],
        'sortOrder' => (int)$product['sort_order'],
        'link' => '/urun/' . $product['slug']
    ];
}

/**
 * Slug oluştur (Türkçe karakter desteği)
 */
function createSlug($text) {
    // Türkçe karakterleri dönüştür
    $turkish = ['ı', 'ğ', 'ü', 'ş', 'ö', 'ç', 'İ', 'Ğ', 'Ü', 'Ş', 'Ö', 'Ç'];
    $english = ['i', 'g', 'u', 's', 'o', 'c', 'i', 'g', 'u', 's', 'o', 'c'];
    $text = str_replace($turkish, $english, $text);

    // Küçük harfe çevir
    $text = strtolower($text);

    // Alfanumerik olmayan karakterleri tire ile değiştir
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);

    // Baştaki ve sondaki tireleri kaldır
    $text = trim($text, '-');

    return $text;
}
?>
