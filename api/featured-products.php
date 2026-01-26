<?php
/**
 * Öne Çıkan Ürünler API
 * GET: Öne çıkan ürünleri getir
 * POST: Yeni öne çıkan ürün ekle
 * PUT: Öne çıkan ürün güncelle
 * DELETE: Öne çıkan ürün sil
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        // Tüm öne çıkan ürünleri getir
        $stmt = $db->query('
            SELECT fp.*, p.main_image, p.slug as product_slug, p.name as product_name
            FROM featured_products fp
            JOIN products p ON fp.product_id = p.id
            WHERE p.is_active = 1
            ORDER BY fp.sort_order ASC
        ');
        $featuredProducts = $stmt->fetchAll();

        $formatted = array_map(function($fp) {
            return [
                'id' => (int)$fp['id'],
                'productId' => (int)$fp['product_id'],
                'productName' => $fp['product_name'],
                'image' => $fp['main_image'],
                'displayName' => $fp['display_name'],
                'displayCategory' => $fp['display_category'],
                'sortOrder' => (int)$fp['sort_order'],
                'isActive' => (bool)$fp['is_active'],
                'link' => '/urun/' . $fp['product_slug']
            ];
        }, $featuredProducts);

        jsonResponse($formatted);
        break;

    case 'POST':
        // Auth gerekli
        requireAuth();

        // Yeni öne çıkan ürün ekle
        $data = getJsonBody();

        if (empty($data['productId'])) {
            jsonResponse(['error' => 'Ürün ID gerekli'], 400);
        }

        // Ürünün var olup olmadığını kontrol et
        $stmt = $db->prepare('SELECT id FROM products WHERE id = ? AND is_active = 1');
        $stmt->execute([$data['productId']]);
        if (!$stmt->fetch()) {
            jsonResponse(['error' => 'Ürün bulunamadı veya aktif değil'], 404);
        }

        // Aynı ürün zaten öne çıkan listede var mı kontrol et
        $stmt = $db->prepare('SELECT id FROM featured_products WHERE product_id = ?');
        $stmt->execute([$data['productId']]);
        if ($stmt->fetch()) {
            jsonResponse(['error' => 'Bu ürün zaten öne çıkan listede'], 400);
        }

        // En yüksek sort_order'ı bul
        $stmt = $db->query('SELECT MAX(sort_order) as max_order FROM featured_products');
        $maxOrder = $stmt->fetch()['max_order'] ?? -1;
        $newOrder = $maxOrder + 1;

        $stmt = $db->prepare('
            INSERT INTO featured_products (product_id, display_name, display_category, sort_order, is_active)
            VALUES (?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $data['productId'],
            $data['displayName'] ?? null,
            $data['displayCategory'] ?? null,
            $newOrder,
            $data['isActive'] ?? true
        ]);

        $insertId = $db->lastInsertId();
        jsonResponse(['success' => true, 'id' => $insertId, 'message' => 'Öne çıkan ürün eklendi']);
        break;

    case 'PUT':
        // Auth gerekli
        requireAuth();

        // Öne çıkan ürün güncelle
        $data = getJsonBody();

        if (empty($data['id'])) {
            jsonResponse(['error' => 'ID gerekli'], 400);
        }

        $id = $data['id'];
        $fields = [];
        $values = [];

        if (isset($data['displayName'])) {
            $fields[] = 'display_name = ?';
            $values[] = $data['displayName'];
        }

        if (isset($data['displayCategory'])) {
            $fields[] = 'display_category = ?';
            $values[] = $data['displayCategory'];
        }

        if (isset($data['sortOrder'])) {
            $fields[] = 'sort_order = ?';
            $values[] = (int)$data['sortOrder'];
        }

        if (isset($data['isActive'])) {
            $fields[] = 'is_active = ?';
            $values[] = (bool)$data['isActive'];
        }

        if (empty($fields)) {
            jsonResponse(['error' => 'Güncellenecek alan yok'], 400);
        }

        $values[] = $id;
        $sql = 'UPDATE featured_products SET ' . implode(', ', $fields) . ' WHERE id = ?';

        $stmt = $db->prepare($sql);
        $stmt->execute($values);

        jsonResponse(['success' => true, 'message' => 'Öne çıkan ürün güncellendi']);
        break;

    case 'DELETE':
        // Auth gerekli
        requireAuth();

        // Öne çıkan ürün sil
        $id = $_GET['id'] ?? null;

        if (!$id) {
            jsonResponse(['error' => 'ID gerekli'], 400);
        }

        $stmt = $db->prepare('DELETE FROM featured_products WHERE id = ?');
        $stmt->execute([$id]);

        jsonResponse(['success' => true, 'message' => 'Öne çıkan ürün silindi']);
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}
?>

