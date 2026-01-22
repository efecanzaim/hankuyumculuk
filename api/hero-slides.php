<?php
/**
 * Hero Slides API
 * GET: Slide'ları getir
 * POST: Yeni slide ekle
 * PUT: Slide güncelle
 * DELETE: Slide sil
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        // Slide'ları getir
        $stmt = $db->query('SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC');
        $slides = $stmt->fetchAll();

        // Frontend için format dönüşümü
        $formattedSlides = array_map(function($slide) {
            return [
                'id' => (int)$slide['id'],
                'backgroundMedia' => $slide['background_media'],
                'mediaType' => $slide['media_type'],
                'title' => $slide['title'],
                'subtitle' => $slide['subtitle'],
                'buttonText' => $slide['button_text'],
                'buttonLink' => $slide['button_link'],
                'sortOrder' => (int)$slide['sort_order']
            ];
        }, $slides);

        jsonResponse($formattedSlides);
        break;

    case 'POST':
        // Auth gerekli
        requireAuth();

        // Yeni slide ekle
        $data = getJsonBody();

        $stmt = $db->prepare('
            INSERT INTO hero_slides (background_media, media_type, title, subtitle, button_text, button_link, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $data['backgroundMedia'] ?? $data['background_media'] ?? null,
            $data['mediaType'] ?? $data['media_type'] ?? 'image',
            $data['title'] ?? null,
            $data['subtitle'] ?? null,
            $data['buttonText'] ?? $data['button_text'] ?? null,
            $data['buttonLink'] ?? $data['button_link'] ?? null,
            $data['sortOrder'] ?? $data['sort_order'] ?? 0
        ]);

        $insertId = $db->lastInsertId();
        jsonResponse(['success' => true, 'id' => $insertId, 'message' => 'Slide eklendi']);
        break;

    case 'PUT':
        // Auth gerekli
        requireAuth();

        // Slide güncelle
        $data = getJsonBody();

        if (empty($data['id'])) {
            jsonResponse(['error' => 'Slide ID gerekli'], 400);
        }

        $id = $data['id'];

        // Alanları maple (camelCase -> snake_case)
        $fieldMap = [
            'backgroundMedia' => 'background_media',
            'mediaType' => 'media_type',
            'buttonText' => 'button_text',
            'buttonLink' => 'button_link',
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
        $sql = 'UPDATE hero_slides SET ' . implode(', ', $fields) . ' WHERE id = ?';

        $stmt = $db->prepare($sql);
        $stmt->execute($values);

        jsonResponse(['success' => true, 'message' => 'Slide güncellendi']);
        break;

    case 'DELETE':
        // Auth gerekli
        requireAuth();

        // Slide sil (soft delete)
        $id = $_GET['id'] ?? null;

        if (!$id) {
            jsonResponse(['error' => 'Slide ID gerekli'], 400);
        }

        $stmt = $db->prepare('UPDATE hero_slides SET is_active = 0 WHERE id = ?');
        $stmt->execute([$id]);

        jsonResponse(['success' => true, 'message' => 'Slide silindi']);
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}
?>
