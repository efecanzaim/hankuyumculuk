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

        // Gold weight ve karat
        $goldWeight = null;
        if (isset($data['gold_weight']) && $data['gold_weight'] !== '') {
            $goldWeight = str_replace(',', '.', $data['gold_weight']);
            $goldWeight = floatval($goldWeight);
        }
        $goldKarat = isset($data['gold_karat']) && $data['gold_karat'] !== '' ? (int)$data['gold_karat'] : null;

        $stmt = $db->prepare('
            INSERT INTO products (category_id, slug, name, subtitle, description, main_image, banner_image, gallery_images, gold_weight, gold_karat, is_featured, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            $goldWeight,
            $goldKarat,
            $data['isFeatured'] ?? $data['is_featured'] ?? 0,
            $data['sortOrder'] ?? $data['sort_order'] ?? 0
        ]);

        $insertId = $db->lastInsertId();

        // Taş bilgilerini ekle (varsa)
        if (!empty($data['stones']) && is_array($data['stones'])) {
            $stoneStmt = $db->prepare('
                INSERT INTO product_stones (product_id, stone_type, carat, quantity, color, clarity, cut, sort_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ');
            foreach ($data['stones'] as $index => $stone) {
                $stoneCarat = null;
                if (isset($stone['carat']) && $stone['carat'] !== '') {
                    $stoneCarat = str_replace(',', '.', $stone['carat']);
                    $stoneCarat = floatval($stoneCarat);
                }
                $stoneStmt->execute([
                    $insertId,
                    $stone['stone_type'] ?? 'Pırlanta',
                    $stoneCarat,
                    $stone['quantity'] ?? 1,
                    $stone['color'] ?? '',
                    $stone['clarity'] ?? '',
                    $stone['cut'] ?? '',
                    $index
                ]);
            }
        }

        // Çoklu kategori ilişkilerini ekle (varsa)
        if (!empty($data['categories']) && is_array($data['categories'])) {
            $catStmt = $db->prepare('
                INSERT INTO category_products (category_id, product_id, sort_order, is_active)
                VALUES (?, ?, 0, 1)
            ');
            foreach ($data['categories'] as $categoryId) {
                $catStmt->execute([$categoryId, $insertId]);
            }
        }

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

        // Veritabanında gerçekten var olan alanlar (schema.sql'e göre)
        // Frontend'den gelen categoryName, categorySlug, link gibi formatlanmış alanlar burada yok
        $allowedDbFields = [
            'category_id', 'slug', 'name', 'subtitle', 'description',
            'main_image', 'banner_image', 'gallery_images',
            'gold_weight', 'gold_karat',
            'is_featured', 'sort_order', 'is_active'
        ];

        // Alanları maple (camelCase -> snake_case)
        $fieldMap = [
            'categoryId' => 'category_id',
            'mainImage' => 'main_image',
            'image' => 'main_image', // image alias'ı da main_image'e map edilebilir
            'bannerImage' => 'banner_image',
            'galleryImages' => 'gallery_images',
            'isFeatured' => 'is_featured',
            'sortOrder' => 'sort_order',
            'isActive' => 'is_active',
            'goldWeight' => 'gold_weight',
            'goldKarat' => 'gold_karat'
        ];

        // Taş bilgilerini ayır (ayrı tabloya kaydedilecek)
        $stones = null;
        if (isset($data['stones'])) {
            $stones = $data['stones'];
            unset($data['stones']);
        }

        // Kategorileri ayır (ayrı tabloya kaydedilecek)
        $categories = null;
        if (isset($data['categories'])) {
            $categories = $data['categories'];
            unset($data['categories']);
        }

        $fields = [];
        $values = [];

        foreach ($data as $key => $value) {
            // ID'yi atla
            if ($key === 'id') continue;

            // Frontend'den gelen formatlanmış alanları atla (veritabanında yok)
            // Bunlar: categoryName, categorySlug, parentType, link, image (alias)
            // image alias'ı main_image'e map edilecek, diğerleri atlanacak
            if (in_array($key, ['categoryName', 'categorySlug', 'parentType', 'parent_type', 'link'])) {
                continue;
            }

            // gallery_images varsa JSON'a çevir
            if ($key === 'galleryImages' || $key === 'gallery_images') {
                if (is_array($value)) {
                    $value = json_encode($value);
                }
            }

            // camelCase ise snake_case'e çevir
            $dbField = $fieldMap[$key] ?? $key;

            // Sadece veritabanında var olan alanları güncelle
            if (!in_array($dbField, $allowedDbFields)) {
                continue; // Veritabanında olmayan alanı atla
            }

            // gold_weight için özel işlem (virgülü noktaya çevir, float'a dönüştür)
            if ($dbField === 'gold_weight' && $value !== '' && $value !== null) {
                $value = str_replace(',', '.', $value);
                $value = floatval($value);
            }

            // gold_karat için özel işlem (integer'a dönüştür)
            if ($dbField === 'gold_karat' && $value !== '' && $value !== null) {
                $value = (int)$value;
            }

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

        // Taş bilgilerini güncelle (varsa)
        if ($stones !== null && is_array($stones)) {
            // Mevcut taşları sil
            $deleteStmt = $db->prepare('DELETE FROM product_stones WHERE product_id = ?');
            $deleteStmt->execute([$id]);

            // Yeni taşları ekle
            if (!empty($stones)) {
                $stoneStmt = $db->prepare('
                    INSERT INTO product_stones (product_id, stone_type, carat, quantity, color, clarity, cut, sort_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ');
                foreach ($stones as $index => $stone) {
                    $stoneCarat = null;
                    if (isset($stone['carat']) && $stone['carat'] !== '') {
                        $stoneCarat = str_replace(',', '.', $stone['carat']);
                        $stoneCarat = floatval($stoneCarat);
                    }
                    $stoneStmt->execute([
                        $id,
                        $stone['stone_type'] ?? 'Pırlanta',
                        $stoneCarat,
                        $stone['quantity'] ?? 1,
                        $stone['color'] ?? '',
                        $stone['clarity'] ?? '',
                        $stone['cut'] ?? '',
                        $index
                    ]);
                }
            }
        }

        // Kategori ilişkilerini güncelle (varsa)
        if ($categories !== null && is_array($categories)) {
            // Mevcut kategori ilişkilerini sil
            $deleteCatStmt = $db->prepare('DELETE FROM category_products WHERE product_id = ?');
            $deleteCatStmt->execute([$id]);

            // Yeni kategori ilişkilerini ekle
            if (!empty($categories)) {
                $catStmt = $db->prepare('
                    INSERT INTO category_products (category_id, product_id, sort_order, is_active)
                    VALUES (?, ?, 0, 1)
                ');
                foreach ($categories as $categoryId) {
                    $catStmt->execute([$categoryId, $id]);
                }
            }
        }

        // Güncellenmiş ürünü formatlanmış şekilde döndür
        // (categoryName, categorySlug, link gibi alanlar formatProduct tarafından otomatik oluşturulacak)
        $stmt = $db->prepare('
            SELECT p.*, c.name as category_name, c.slug as category_slug, c.parent_type
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        ');
        $stmt->execute([$id]);
        $updatedProduct = $stmt->fetch();
        
        if ($updatedProduct) {
            $formattedProduct = formatProduct($updatedProduct);
            jsonResponse(['success' => true, 'message' => 'Ürün güncellendi', 'product' => $formattedProduct]);
        } else {
            jsonResponse(['success' => true, 'message' => 'Ürün güncellendi']);
        }
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
    global $db;

    // gallery_images JSON olarak parse et
    $galleryImages = null;
    if (!empty($product['gallery_images'])) {
        $galleryImages = json_decode($product['gallery_images'], true);
    }

    // Taş bilgilerini getir
    $stones = [];
    if (!empty($product['id'])) {
        $stoneStmt = $db->prepare('SELECT * FROM product_stones WHERE product_id = ? ORDER BY sort_order ASC');
        $stoneStmt->execute([$product['id']]);
        $stonesData = $stoneStmt->fetchAll();
        foreach ($stonesData as $stone) {
            $stones[] = [
                'id' => (int)$stone['id'],
                'stone_type' => $stone['stone_type'],
                'carat' => $stone['carat'],
                'quantity' => (int)$stone['quantity'],
                'color' => $stone['color'],
                'clarity' => $stone['clarity'],
                'cut' => $stone['cut']
            ];
        }
    }

    // Çoklu kategori ilişkilerini getir
    $categories = [];
    if (!empty($product['id'])) {
        $catStmt = $db->prepare('SELECT category_id FROM category_products WHERE product_id = ? AND is_active = 1');
        $catStmt->execute([$product['id']]);
        $catData = $catStmt->fetchAll();
        foreach ($catData as $cat) {
            $categories[] = (int)$cat['category_id'];
        }
    }

    return [
        'id' => (int)$product['id'],
        'categoryId' => $product['category_id'] ? (int)$product['category_id'] : null,
        'category_id' => $product['category_id'] ? (int)$product['category_id'] : null,
        'categories' => $categories,
        'categoryName' => $product['category_name'] ?? null,
        'categorySlug' => $product['category_slug'] ?? null,
        'parentType' => $product['parent_type'] ?? null,
        'parent_type' => $product['parent_type'] ?? null,
        'slug' => $product['slug'],
        'name' => $product['name'],
        'subtitle' => $product['subtitle'],
        'description' => $product['description'],
        'mainImage' => $product['main_image'],
        'image' => $product['main_image'],
        'bannerImage' => $product['banner_image'],
        'banner_image' => $product['banner_image'],
        'galleryImages' => $galleryImages,
        'gallery_images' => $galleryImages ?? [],
        'gold_weight' => $product['gold_weight'] ?? null,
        'gold_karat' => $product['gold_karat'] ?? null,
        'stones' => $stones,
        'isFeatured' => (bool)$product['is_featured'],
        'is_featured' => (bool)$product['is_featured'],
        'sortOrder' => (int)$product['sort_order'],
        'sort_order' => (int)$product['sort_order'],
        'is_active' => isset($product['is_active']) ? (bool)$product['is_active'] : true,
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
