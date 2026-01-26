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

        $title = $data['title'];
        $description = $data['description'] ?? null;
        $image = $data['image'] ?? null;
        $sortOrder = $data['sortOrder'] ?? 0;

        $stmt = $db->prepare('
            INSERT INTO about_values (title, description, image, sort_order)
            VALUES (?, ?, ?, ?)
        ');
        $stmt->execute([$title, $description, $image, $sortOrder]);

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

        if (isset($data['title'])) { $fields[] = 'title = ?'; $values[] = $data['title']; }
        if (isset($data['description'])) { $fields[] = 'description = ?'; $values[] = $data['description']; }
        if (isset($data['image'])) { $fields[] = 'image = ?'; $values[] = $data['image']; }
        if (isset($data['sortOrder'])) { $fields[] = 'sort_order = ?'; $values[] = $data['sortOrder']; }
        if (isset($data['isActive'])) { $fields[] = 'is_active = ?'; $values[] = (bool)$data['isActive']; }

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
        'id' => (int)$value['id'],
        'title' => $value['title'],
        'description' => $value['description'],
        'image' => $value['image'],
        'sortOrder' => (int)$value['sort_order'],
        'isActive' => (bool)$value['is_active']
    ];
}
?>

