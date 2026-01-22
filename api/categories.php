<?php
/**
 * Kategoriler API
 * GET: Kategorileri getir
 * POST: Yeni kategori ekle
 * PUT: Kategori güncelle
 * DELETE: Kategori sil
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        // Kategorileri getir
        $parentType = $_GET['parentType'] ?? null;
        $slug = $_GET['slug'] ?? null;
        $id = $_GET['id'] ?? null;
        $withProducts = isset($_GET['withProducts']);

        if ($id) {
            // Tek kategori getir (ID ile)
            $stmt = $db->prepare('SELECT * FROM categories WHERE id = ? AND is_active = 1');
            $stmt->execute([$id]);
            $category = $stmt->fetch();

            if ($category) {
                $formatted = formatCategory($category);

                // Ürünleri de getir
                if ($withProducts) {
                    $stmt2 = $db->prepare('SELECT * FROM products WHERE category_id = ? AND is_active = 1 ORDER BY sort_order ASC');
                    $stmt2->execute([$category['id']]);
                    $products = $stmt2->fetchAll();
                    $formatted['products'] = array_map('formatCategoryProduct', $products);
                }

                jsonResponse($formatted);
            } else {
                jsonResponse(['error' => 'Kategori bulunamadı'], 404);
            }
        } elseif ($slug) {
            // Tek kategori getir (slug ile)
            $stmt = $db->prepare('SELECT * FROM categories WHERE slug = ? AND is_active = 1');
            $stmt->execute([$slug]);
            $category = $stmt->fetch();

            if ($category) {
                $formatted = formatCategory($category);

                // Kategoriye ait ürünleri de getir
                $stmt2 = $db->prepare('SELECT * FROM products WHERE category_id = ? AND is_active = 1 ORDER BY sort_order ASC');
                $stmt2->execute([$category['id']]);
                $products = $stmt2->fetchAll();
                $formatted['products'] = array_map('formatCategoryProduct', $products);

                jsonResponse($formatted);
            } else {
                jsonResponse(['error' => 'Kategori bulunamadı'], 404);
            }
        } else {
            // Tüm kategorileri getir
            $sql = 'SELECT * FROM categories WHERE is_active = 1';
            $params = [];

            if ($parentType) {
                $sql .= ' AND parent_type = ?';
                $params[] = $parentType;
            }

            $sql .= ' ORDER BY sort_order ASC';

            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $categories = $stmt->fetchAll();

            // Format categories
            $formatted = array_map('formatCategory', $categories);

            // Eğer parentType verilmişse gruplu döndür
            if (!$parentType) {
                // Tüm kategorileri parent_type'a göre grupla
                $grouped = [];
                foreach ($formatted as $cat) {
                    $type = $cat['parentType'];
                    if (!isset($grouped[$type])) {
                        $grouped[$type] = [];
                    }
                    $grouped[$type][] = $cat;
                }
                jsonResponse($grouped);
            } else {
                jsonResponse($formatted);
            }
        }
        break;

    case 'POST':
        // Auth gerekli
        requireAuth();

        // Yeni kategori ekle
        $data = getJsonBody();

        if (empty($data['name']) || empty($data['parentType'])) {
            jsonResponse(['error' => 'Kategori adı ve parent type gerekli'], 400);
        }

        // Slug oluştur
        $slug = $data['slug'] ?? createCategorySlug($data['name']);

        // Slug benzersiz mi kontrol et
        $stmt = $db->prepare('SELECT id FROM categories WHERE slug = ?');
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug = $slug . '-' . time();
        }

        $stmt = $db->prepare('
            INSERT INTO categories (parent_type, name, slug, hero_image, hero_title, hero_subtitle, hero_description, list_title, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $data['parentType'] ?? $data['parent_type'],
            $data['name'],
            $slug,
            $data['heroImage'] ?? $data['hero_image'] ?? null,
            $data['heroTitle'] ?? $data['hero_title'] ?? null,
            $data['heroSubtitle'] ?? $data['hero_subtitle'] ?? null,
            $data['heroDescription'] ?? $data['hero_description'] ?? null,
            $data['listTitle'] ?? $data['list_title'] ?? null,
            $data['sortOrder'] ?? $data['sort_order'] ?? 0
        ]);

        $insertId = $db->lastInsertId();
        jsonResponse(['success' => true, 'id' => $insertId, 'slug' => $slug, 'message' => 'Kategori eklendi']);
        break;

    case 'PUT':
        // Auth gerekli
        requireAuth();

        // Kategori güncelle
        $data = getJsonBody();

        if (empty($data['id'])) {
            jsonResponse(['error' => 'Kategori ID gerekli'], 400);
        }

        $id = $data['id'];

        // Alanları maple (camelCase -> snake_case)
        $fieldMap = [
            'parentType' => 'parent_type',
            'heroImage' => 'hero_image',
            'heroTitle' => 'hero_title',
            'heroSubtitle' => 'hero_subtitle',
            'heroDescription' => 'hero_description',
            'listTitle' => 'list_title',
            'sortOrder' => 'sort_order',
            'isActive' => 'is_active'
        ];

        $fields = [];
        $values = [];

        foreach ($data as $key => $value) {
            if ($key === 'id') continue;

            // camelCase ise snake_case'e çevir
            $dbField = $fieldMap[$key] ?? $key;
            $fields[] = "$dbField = ?";
            $values[] = $value;
        }

        if (empty($fields)) {
            jsonResponse(['error' => 'Güncellenecek alan yok'], 400);
        }

        $values[] = $id;
        $sql = 'UPDATE categories SET ' . implode(', ', $fields) . ' WHERE id = ?';

        $stmt = $db->prepare($sql);
        $stmt->execute($values);

        jsonResponse(['success' => true, 'message' => 'Kategori güncellendi']);
        break;

    case 'DELETE':
        // Auth gerekli
        requireAuth();

        // Kategori sil (soft delete)
        $id = $_GET['id'] ?? null;

        if (!$id) {
            jsonResponse(['error' => 'Kategori ID gerekli'], 400);
        }

        $stmt = $db->prepare('UPDATE categories SET is_active = 0 WHERE id = ?');
        $stmt->execute([$id]);

        jsonResponse(['success' => true, 'message' => 'Kategori silindi']);
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}

/**
 * Kategori verisini frontend formatına çevir
 */
function formatCategory($category) {
    return [
        'id' => (int)$category['id'],
        'parentType' => $category['parent_type'],
        'name' => $category['name'],
        'slug' => $category['slug'],
        'heroImage' => $category['hero_image'],
        'heroTitle' => $category['hero_title'],
        'heroSubtitle' => $category['hero_subtitle'],
        'heroDescription' => $category['hero_description'],
        'listTitle' => $category['list_title'],
        'sortOrder' => (int)$category['sort_order']
    ];
}

/**
 * Kategori içindeki ürün verisini formatla
 */
function formatCategoryProduct($product) {
    return [
        'id' => (int)$product['id'],
        'slug' => $product['slug'],
        'name' => $product['name'],
        'subtitle' => $product['subtitle'],
        'image' => $product['main_image'],
        'link' => '/urun/' . $product['slug']
    ];
}

/**
 * Slug oluştur (Türkçe karakter desteği)
 */
function createCategorySlug($text) {
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
