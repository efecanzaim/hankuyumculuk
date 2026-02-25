<?php
/**
 * Sayfalar API
 * GET: Sayfaları getir
 * POST: Yeni sayfa ekle
 * PUT: Sayfa güncelle
 * DELETE: Sayfa sil
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

// Debug: Versiyon kontrolü
if (isset($_GET['version'])) {
    jsonResponse(['version' => '2026-02-18-v3', 'method' => $method, 'time' => date('Y-m-d H:i:s')]);
}

switch ($method) {
    case 'GET':
        $slug = $_GET['slug'] ?? null;
        $id = $_GET['id'] ?? null;

        if ($id) {
            // Tek sayfa getir (ID ile)
            $stmt = $db->prepare('SELECT * FROM pages WHERE id = ? AND is_active = 1');
            $stmt->execute([$id]);
            $page = $stmt->fetch();

            if ($page) {
                jsonResponse(formatPage($page));
            } else {
                jsonResponse(['error' => 'Sayfa bulunamadı'], 404);
            }
        } elseif ($slug) {
            // Tek sayfa getir (slug ile)
            $stmt = $db->prepare('SELECT * FROM pages WHERE slug = ? AND is_active = 1');
            $stmt->execute([$slug]);
            $page = $stmt->fetch();

            if ($page) {
                jsonResponse(formatPage($page));
            } else {
                jsonResponse(['error' => 'Sayfa bulunamadı'], 404);
            }
        } else {
            // Tüm sayfaları getir
            $stmt = $db->query('SELECT * FROM pages WHERE is_active = 1 ORDER BY title ASC');
            $pages = $stmt->fetchAll();

            jsonResponse(array_map('formatPage', $pages));
        }
        break;

    case 'POST':
        // Auth gerekli
        requireAuth();

        $data = getJsonBody();

        if (empty($data['title'])) {
            jsonResponse(['error' => 'Sayfa başlığı gerekli'], 400);
        }

        // Slug oluştur
        $slug = $data['slug'] ?? createPageSlug($data['title']);

        // Slug benzersiz mi kontrol et
        $stmt = $db->prepare('SELECT id FROM pages WHERE slug = ?');
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug = $slug . '-' . time();
        }

        $stmt = $db->prepare('
            INSERT INTO pages (slug, title, hero_image, hero_image_position, hero_image_scale, hero_title, hero_subtitle, content, values_title, meta_title, meta_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $slug,
            $data['title'],
            $data['heroImage'] ?? $data['hero_image'] ?? null,
            $data['heroImagePosition'] ?? $data['hero_image_position'] ?? '50% 50%',
            $data['heroImageScale'] ?? $data['hero_image_scale'] ?? 1.0,
            $data['heroTitle'] ?? $data['hero_title'] ?? null,
            $data['heroSubtitle'] ?? $data['hero_subtitle'] ?? null,
            $data['content'] ?? null,
            $data['valuesTitle'] ?? $data['values_title'] ?? 'Vizyonumuz',
            $data['metaTitle'] ?? $data['meta_title'] ?? null,
            $data['metaDescription'] ?? $data['meta_description'] ?? null
        ]);

        $insertId = $db->lastInsertId();
        jsonResponse(['success' => true, 'id' => $insertId, 'slug' => $slug, 'message' => 'Sayfa oluşturuldu']);
        break;

    case 'PUT':
        // Auth gerekli
        requireAuth();

        $data = getJsonBody();

        // ID veya slug ile sayfa bul
        $id = $data['id'] ?? null;
        $slug = $data['slug'] ?? null;

        if (empty($id) && empty($slug)) {
            jsonResponse(['error' => 'Sayfa ID veya slug gerekli'], 400);
        }

        // Slug ile ID bul (ID yoksa)
        if (empty($id) && !empty($slug)) {
            $stmt = $db->prepare('SELECT id FROM pages WHERE slug = ?');
            $stmt->execute([$slug]);
            $page = $stmt->fetch();
            if ($page) {
                $id = $page['id'];
            } else {
                // Sayfa yoksa oluştur
                try {
                    $stmt = $db->prepare('
                        INSERT INTO pages (slug, title, hero_image, hero_title, content, values_title)
                        VALUES (?, ?, ?, ?, ?, ?)
                    ');
                    $stmt->execute([
                        $slug,
                        $data['title'] ?? 'Hakkımızda',
                        $data['heroImage'] ?? null,
                        $data['heroTitle'] ?? null,
                        $data['heroParagraph2'] ?? $data['content'] ?? null,
                        $data['valuesTitle'] ?? 'Vizyonumuz'
                    ]);
                    $insertId = $db->lastInsertId();
                    jsonResponse(['success' => true, 'id' => $insertId, 'slug' => $slug, 'message' => 'Sayfa oluşturuldu']);
                } catch (PDOException $e) {
                    jsonResponse(['error' => 'Veritabanı hatası: ' . $e->getMessage()], 500);
                }
                break;
            }
        }

        // Alanları maple (camelCase -> snake_case)
        $fieldMap = [
            'title' => 'title',
            'heroImage' => 'hero_image',
            'heroTitle' => 'hero_title',
            'heroSubtitle' => 'hero_subtitle',
            'heroParagraph2' => 'content',
            'content' => 'content',
            'valuesTitle' => 'values_title',
            'metaTitle' => 'meta_title',
            'metaDescription' => 'meta_description',
            'isActive' => 'is_active'
        ];

        // Veritabanında hangi sütunlar var kontrol et
        try {
            $colStmt = $db->query('SHOW COLUMNS FROM pages');
            $existingColumns = array_column($colStmt->fetchAll(), 'Field');
        } catch (PDOException $e) {
            $existingColumns = ['id','slug','title','hero_image','hero_title','hero_subtitle','content','values_title','meta_title','meta_description','is_active'];
        }

        // hero_image_position ve hero_image_scale varsa ekle
        if (in_array('hero_image_position', $existingColumns)) {
            $fieldMap['heroImagePosition'] = 'hero_image_position';
        }
        if (in_array('hero_image_scale', $existingColumns)) {
            $fieldMap['heroImageScale'] = 'hero_image_scale';
        }

        $fields = [];
        $values = [];

        foreach ($data as $key => $value) {
            // id ve slug'ı atla
            if ($key === 'id' || $key === 'slug') continue;
            
            // Sadece fieldMap'te olan alanları güncelle
            if (!isset($fieldMap[$key])) continue;

            $dbField = $fieldMap[$key];
            
            // Aynı DB sütunu zaten eklenmişse atla (content çakışması)
            $alreadyAdded = false;
            foreach ($fields as $f) {
                if ($f === "$dbField = ?") { $alreadyAdded = true; break; }
            }
            if ($alreadyAdded) continue;

            // Sütun DB'de var mı kontrol et
            if (!in_array($dbField, $existingColumns)) continue;

            $fields[] = "$dbField = ?";
            $values[] = $value;
        }

        if (empty($fields)) {
            jsonResponse(['error' => 'Güncellenecek alan yok. Gönderilen anahtarlar: ' . implode(', ', array_keys($data))], 400);
        }

        $values[] = $id;
        $sql = 'UPDATE pages SET ' . implode(', ', $fields) . ' WHERE id = ?';

        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($values);
            jsonResponse(['success' => true, 'id' => $id, 'message' => 'Sayfa güncellendi']);
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Veritabanı hatası: ' . $e->getMessage() . ' SQL: ' . $sql], 500);
        }
        break;

    case 'DELETE':
        // Auth gerekli
        requireAuth();

        $id = $_GET['id'] ?? null;

        if (!$id) {
            jsonResponse(['error' => 'Sayfa ID gerekli'], 400);
        }

        $stmt = $db->prepare('UPDATE pages SET is_active = 0 WHERE id = ?');
        $stmt->execute([$id]);

        jsonResponse(['success' => true, 'message' => 'Sayfa silindi']);
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}

/**
 * Sayfa verisini frontend formatına çevir
 */
function formatPage($page) {
    return [
        'id' => (int)$page['id'],
        'slug' => $page['slug'],
        'title' => $page['title'],
        'heroImage' => $page['hero_image'],
        'heroImagePosition' => $page['hero_image_position'] ?? '50% 50%',
        'heroImageScale' => isset($page['hero_image_scale']) ? (float)$page['hero_image_scale'] : 1.0,
        'heroTitle' => $page['hero_title'],
        'heroSubtitle' => $page['hero_subtitle'],
        'heroParagraph2' => $page['content'],
        'content' => $page['content'],
        'valuesTitle' => $page['values_title'] ?? 'Vizyonumuz',
        'metaTitle' => $page['meta_title'],
        'metaDescription' => $page['meta_description']
    ];
}

/**
 * Slug oluştur (Türkçe karakter desteği)
 */
function createPageSlug($text) {
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
