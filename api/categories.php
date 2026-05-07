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

// content kolonu yoksa ekle (migration)
try {
    $cols = $db->query("SHOW COLUMNS FROM categories LIKE 'content'")->fetchAll();
    if (empty($cols)) {
        $db->exec("ALTER TABLE categories ADD COLUMN content LONGTEXT AFTER hero_description");
    }
} catch (Exception $e) {
    error_log('Migration content column error: ' . $e->getMessage());
}

// Eksik varsayılan kategorileri otomatik oluştur
try {
    $defaultCategories = [
        ['name' => 'Kol Düğmesi', 'slug' => 'kol', 'parent_type' => 'erkek', 'sort_order' => 4],
    ];
    foreach ($defaultCategories as $cat) {
        $check = $db->prepare('SELECT id FROM categories WHERE slug = ? AND parent_type = ?');
        $check->execute([$cat['slug'], $cat['parent_type']]);
        if (!$check->fetch()) {
            $db->prepare('INSERT INTO categories (name, slug, parent_type, sort_order, is_active) VALUES (?, ?, ?, ?, 1)')
               ->execute([$cat['name'], $cat['slug'], $cat['parent_type'], $cat['sort_order']]);
        }
    }
} catch (Exception $e) {
    error_log('Auto-create categories error: ' . $e->getMessage());
}

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
                    $products = [];
                    $tableExistsId = false;
                    try {
                        $checkStmt = $db->query("SHOW TABLES LIKE 'category_products'");
                        $tableExistsId = $checkStmt->rowCount() > 0;
                    } catch (Exception $e) {
                        error_log('category_products check error: ' . $e->getMessage());
                    }
                    if ($tableExistsId) {
                        try {
                            $stmt2 = $db->prepare('
                                SELECT p.*, cp.sort_order AS cp_sort_order
                                FROM category_products cp
                                INNER JOIN products p ON cp.product_id = p.id
                                WHERE cp.category_id = ? AND cp.is_active = 1 AND p.is_active = 1
                                ORDER BY CASE WHEN cp.sort_order = 0 THEN 999999 ELSE cp.sort_order END ASC, p.name ASC
                            ');
                            $stmt2->execute([$category['id']]);
                            $products = $stmt2->fetchAll();
                        } catch (PDOException $e) {
                            error_log('category_products id query error: ' . $e->getMessage());
                            $products = [];
                        }
                    }
                    if (empty($products)) {
                        $stmt2 = $db->prepare('SELECT * FROM products WHERE category_id = ? AND is_active = 1 ORDER BY CASE WHEN sort_order = 0 THEN 999999 ELSE sort_order END ASC, name ASC');
                        $stmt2->execute([$category['id']]);
                        $products = $stmt2->fetchAll();
                    }
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

                // Kategoriye ait ürünleri getir - önce pivot tablodan (çoklu kategori), sonra fallback
                $products = [];
                $tableExists = false;
                try {
                    $checkStmt = $db->query("SHOW TABLES LIKE 'category_products'");
                    $tableExists = $checkStmt->rowCount() > 0;
                } catch (Exception $e) {
                    error_log('category_products check error: ' . $e->getMessage());
                }

                if ($tableExists) {
                    try {
                        $stmt2 = $db->prepare('
                            SELECT p.*, cp.sort_order AS cp_sort_order
                            FROM category_products cp
                            INNER JOIN products p ON cp.product_id = p.id
                            WHERE cp.category_id = ? AND cp.is_active = 1 AND p.is_active = 1
                            ORDER BY CASE WHEN cp.sort_order = 0 THEN 999999 ELSE cp.sort_order END ASC, p.name ASC
                        ');
                        $stmt2->execute([$category['id']]);
                        $products = $stmt2->fetchAll();
                    } catch (PDOException $e) {
                        error_log('category_products slug query error: ' . $e->getMessage());
                        $products = [];
                    }
                }

                // Fallback: direkt category_id ile
                if (empty($products)) {
                    $stmt2 = $db->prepare('SELECT * FROM products WHERE category_id = ? AND is_active = 1 ORDER BY CASE WHEN sort_order = 0 THEN 999999 ELSE sort_order END ASC, name ASC');
                    $stmt2->execute([$category['id']]);
                    $products = $stmt2->fetchAll();
                }

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

        // Her iki format da kabul et (camelCase ve snake_case)
        if (!isset($data['parentType']) && isset($data['parent_type'])) {
            $data['parentType'] = $data['parent_type'];
        }
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
            INSERT INTO categories (parent_type, name, name_en, name_ru, slug, hero_image, hero_title, hero_title_en, hero_title_ru, hero_subtitle, hero_subtitle_en, hero_subtitle_ru, hero_description, hero_description_en, hero_description_ru, content, list_title, list_title_en, list_title_ru, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $data['parentType'] ?? $data['parent_type'],
            $data['name'],
            $data['name_en'] ?? null,
            $data['name_ru'] ?? null,
            $slug,
            $data['heroImage'] ?? $data['hero_image'] ?? null,
            $data['heroTitle'] ?? $data['hero_title'] ?? null,
            $data['hero_title_en'] ?? null,
            $data['hero_title_ru'] ?? null,
            $data['heroSubtitle'] ?? $data['hero_subtitle'] ?? null,
            $data['hero_subtitle_en'] ?? null,
            $data['hero_subtitle_ru'] ?? null,
            $data['heroDescription'] ?? $data['hero_description'] ?? null,
            $data['hero_description_en'] ?? null,
            $data['hero_description_ru'] ?? null,
            $data['content'] ?? null,
            $data['listTitle'] ?? $data['list_title'] ?? null,
            $data['list_title_en'] ?? null,
            $data['list_title_ru'] ?? null,
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
            'isActive' => 'is_active',
            'nameEn' => 'name_en',
            'nameRu' => 'name_ru',
            'heroTitleEn' => 'hero_title_en',
            'heroTitleRu' => 'hero_title_ru',
            'heroSubtitleEn' => 'hero_subtitle_en',
            'heroSubtitleRu' => 'hero_subtitle_ru',
            'heroDescriptionEn' => 'hero_description_en',
            'heroDescriptionRu' => 'hero_description_ru',
            'listTitleEn' => 'list_title_en',
            'listTitleRu' => 'list_title_ru'
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
        'nameEn' => $category['name_en'] ?? null,
        'nameRu' => $category['name_ru'] ?? null,
        'slug' => $category['slug'],
        'heroImage' => $category['hero_image'],
        'heroTitle' => $category['hero_title'],
        'heroTitleEn' => $category['hero_title_en'] ?? null,
        'heroTitleRu' => $category['hero_title_ru'] ?? null,
        'heroSubtitle' => $category['hero_subtitle'],
        'heroSubtitleEn' => $category['hero_subtitle_en'] ?? null,
        'heroSubtitleRu' => $category['hero_subtitle_ru'] ?? null,
        'heroDescription' => $category['hero_description'],
        'heroDescriptionEn' => $category['hero_description_en'] ?? null,
        'heroDescriptionRu' => $category['hero_description_ru'] ?? null,
        'listTitle' => $category['list_title'],
        'listTitleEn' => $category['list_title_en'] ?? null,
        'listTitleRu' => $category['list_title_ru'] ?? null,
        'content' => $category['content'] ?? null,
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
        'nameEn' => $product['name_en'] ?? null,
        'nameRu' => $product['name_ru'] ?? null,
        'subtitle' => $product['subtitle'],
        'subtitleEn' => $product['subtitle_en'] ?? null,
        'subtitleRu' => $product['subtitle_ru'] ?? null,
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
