<?php
/**
 * Hakkımızda Sayfası Values (Vizyonumuz) API
 * GET: Tüm değerleri getir
 * POST: Yeni değer ekle
 * PUT: Değer güncelle
 * DELETE: Değer sil
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

// Migration: EN/RU kolonlarını ekle
$migrateColumns = [
    'title_en'       => 'VARCHAR(255)',
    'title_ru'       => 'VARCHAR(255)',
    'description_en' => 'TEXT',
    'description_ru' => 'TEXT',
    'image_position' => "VARCHAR(50) DEFAULT '50% 50%'",
    'image_scale'    => 'DECIMAL(4,2) DEFAULT 1.00',
];
foreach ($migrateColumns as $col => $type) {
    try {
        $exists = $db->query("SHOW COLUMNS FROM about_values LIKE '$col'")->fetchAll();
        if (empty($exists)) {
            $db->exec("ALTER TABLE about_values ADD COLUMN $col $type");
        }
    } catch (Exception $e) {
        error_log("about_values migration $col: " . $e->getMessage());
    }
}

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;

        if ($id) {
            // Tek değer getir
            $stmt = $db->prepare('SELECT * FROM about_values WHERE id = ? AND is_active = 1');
            $stmt->execute([$id]);
            $value = $stmt->fetch();

            if ($value) {
                jsonResponse(formatValue($value));
            } else {
                jsonResponse(['error' => 'Değer bulunamadı'], 404);
            }
        } else {
            // Tüm değerleri getir
            $stmt = $db->query('SELECT * FROM about_values WHERE is_active = 1 ORDER BY sort_order ASC');
            $values = $stmt->fetchAll();

            jsonResponse(array_map('formatValue', $values));
        }
        break;

    case 'POST':
        requireAuth();
        $data = getJsonBody();

        if (empty($data['title'])) {
            jsonResponse(['error' => 'Başlık gerekli'], 400);
        }

        $stmt = $db->prepare('
            INSERT INTO about_values (title, title_en, title_ru, description, description_en, description_ru, image, image_position, image_scale, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $data['title'],
            $data['title_en'] ?? null,
            $data['title_ru'] ?? null,
            $data['description'] ?? null,
            $data['description_en'] ?? null,
            $data['description_ru'] ?? null,
            $data['image'] ?? null,
            $data['imagePosition'] ?? '50% 50%',
            $data['imageScale'] ?? 1,
            $data['sortOrder'] ?? 0,
        ]);

        jsonResponse(['success' => true, 'id' => $db->lastInsertId(), 'message' => 'Değer eklendi']);
        break;

    case 'PUT':
        requireAuth();
        $data = getJsonBody();

        if (empty($data['id'])) {
            jsonResponse(['error' => 'Değer ID gerekli'], 400);
        }

        $id = $data['id'];
        $fields = [];
        $values = [];

        if (isset($data['title']))          { $fields[] = 'title = ?';          $values[] = $data['title']; }
        if (isset($data['title_en']))       { $fields[] = 'title_en = ?';       $values[] = $data['title_en']; }
        if (isset($data['title_ru']))       { $fields[] = 'title_ru = ?';       $values[] = $data['title_ru']; }
        if (isset($data['description']))    { $fields[] = 'description = ?';    $values[] = $data['description']; }
        if (isset($data['description_en'])) { $fields[] = 'description_en = ?'; $values[] = $data['description_en']; }
        if (isset($data['description_ru'])) { $fields[] = 'description_ru = ?'; $values[] = $data['description_ru']; }
        if (isset($data['image']))          { $fields[] = 'image = ?';          $values[] = $data['image']; }
        if (isset($data['imagePosition']))  { $fields[] = 'image_position = ?'; $values[] = $data['imagePosition']; }
        if (isset($data['imageScale']))     { $fields[] = 'image_scale = ?';    $values[] = $data['imageScale']; }
        if (isset($data['sortOrder']))      { $fields[] = 'sort_order = ?';     $values[] = $data['sortOrder']; }
        if (isset($data['isActive']))       { $fields[] = 'is_active = ?';      $values[] = (bool)$data['isActive']; }

        if (empty($fields)) {
            jsonResponse(['error' => 'Güncellenecek alan yok'], 400);
        }

        $values[] = $id;
        $sql = 'UPDATE about_values SET ' . implode(', ', $fields) . ' WHERE id = ?';
        $stmt = $db->prepare($sql);
        $stmt->execute($values);

        jsonResponse(['success' => true, 'message' => 'Değer güncellendi']);
        break;

    case 'DELETE':
        requireAuth();
        $id = $_GET['id'] ?? null;

        if (!$id) {
            jsonResponse(['error' => 'Değer ID gerekli'], 400);
        }

        $stmt = $db->prepare('UPDATE about_values SET is_active = 0 WHERE id = ?');
        $stmt->execute([$id]);

        jsonResponse(['success' => true, 'message' => 'Değer silindi']);
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}

/**
 * Değer verisini frontend formatına çevir
 */
function formatValue($value) {
    return [
        'id'             => (int)$value['id'],
        'title'          => $value['title'],
        'title_en'       => $value['title_en'] ?? null,
        'title_ru'       => $value['title_ru'] ?? null,
        'description'    => $value['description'],
        'description_en' => $value['description_en'] ?? null,
        'description_ru' => $value['description_ru'] ?? null,
        'image'          => $value['image'],
        'imagePosition'  => $value['image_position'] ?? '50% 50%',
        'imageScale'     => (float)($value['image_scale'] ?? 1),
        'sortOrder'      => (int)$value['sort_order'],
        'isActive'       => (bool)$value['is_active'],
    ];
}
?>

