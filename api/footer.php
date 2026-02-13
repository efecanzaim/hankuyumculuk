<?php
/**
 * Footer API
 * GET: Footer verilerini getir
 * PUT: Footer güncelle
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        // Footer verilerini getir
        $footer = getFooterData($db);
        jsonResponse($footer);
        break;

    case 'PUT':
        // Auth gerekli
        requireAuth();

        $data = getJsonBody();
        $section = $_GET['section'] ?? 'settings';

        switch ($section) {
            case 'settings':
                // Footer ayarlarını güncelle
                $stmt = $db->prepare('
                    UPDATE footer_settings SET
                        logo_image = ?, 
                        slogan = ?, slogan_en = ?, slogan_ru = ?,
                        copyright_text = ?, copyright_text_en = ?, copyright_text_ru = ?,
                        description = ?, description_en = ?, description_ru = ?
                    WHERE id = 1
                ');
                $stmt->execute([
                    $data['logoImage'] ?? $data['logo_image'] ?? null,
                    $data['slogan'] ?? null,
                    $data['slogan_en'] ?? null,
                    $data['slogan_ru'] ?? null,
                    $data['copyrightText'] ?? $data['copyright_text'] ?? null,
                    $data['copyright_text_en'] ?? $data['copyright_en'] ?? null,
                    $data['copyright_text_ru'] ?? $data['copyright_ru'] ?? null,
                    $data['description'] ?? null,
                    $data['description_en'] ?? null,
                    $data['description_ru'] ?? null
                ]);
                jsonResponse(['success' => true, 'message' => 'Footer ayarları güncellendi']);
                break;

            case 'column':
                // Sütun güncelle veya ekle
                if (isset($data['id'])) {
                    $stmt = $db->prepare('
                        UPDATE footer_columns SET title = ?, sort_order = ? WHERE id = ?
                    ');
                    $stmt->execute([
                        $data['title'],
                        $data['sortOrder'] ?? $data['sort_order'] ?? 0,
                        $data['id']
                    ]);
                } else {
                    $stmt = $db->prepare('
                        INSERT INTO footer_columns (title, sort_order) VALUES (?, ?)
                    ');
                    $stmt->execute([
                        $data['title'],
                        $data['sortOrder'] ?? $data['sort_order'] ?? 0
                    ]);
                    $data['id'] = $db->lastInsertId();
                }
                jsonResponse(['success' => true, 'id' => $data['id'], 'message' => 'Sütun güncellendi']);
                break;

            case 'link':
                // Link güncelle veya ekle
                if (isset($data['id'])) {
                    $stmt = $db->prepare('
                        UPDATE footer_links SET column_id = ?, text = ?, url = ?, sort_order = ? WHERE id = ?
                    ');
                    $stmt->execute([
                        $data['columnId'] ?? $data['column_id'],
                        $data['text'],
                        $data['url'],
                        $data['sortOrder'] ?? $data['sort_order'] ?? 0,
                        $data['id']
                    ]);
                } else {
                    $stmt = $db->prepare('
                        INSERT INTO footer_links (column_id, text, url, sort_order) VALUES (?, ?, ?, ?)
                    ');
                    $stmt->execute([
                        $data['columnId'] ?? $data['column_id'],
                        $data['text'],
                        $data['url'],
                        $data['sortOrder'] ?? $data['sort_order'] ?? 0
                    ]);
                    $data['id'] = $db->lastInsertId();
                }
                jsonResponse(['success' => true, 'id' => $data['id'], 'message' => 'Link güncellendi']);
                break;

            default:
                jsonResponse(['error' => 'Geçersiz section'], 400);
        }
        break;

    case 'DELETE':
        // Auth gerekli
        requireAuth();

        $section = $_GET['section'] ?? null;
        $id = $_GET['id'] ?? null;

        if (!$section || !$id) {
            jsonResponse(['error' => 'Section ve ID gerekli'], 400);
        }

        switch ($section) {
            case 'column':
                // Önce bu sütuna ait linkleri sil
                $stmt = $db->prepare('DELETE FROM footer_links WHERE column_id = ?');
                $stmt->execute([$id]);
                // Sonra sütunu sil
                $stmt = $db->prepare('DELETE FROM footer_columns WHERE id = ?');
                $stmt->execute([$id]);
                jsonResponse(['success' => true, 'message' => 'Sütun silindi']);
                break;

            case 'link':
                $stmt = $db->prepare('DELETE FROM footer_links WHERE id = ?');
                $stmt->execute([$id]);
                jsonResponse(['success' => true, 'message' => 'Link silindi']);
                break;

            default:
                jsonResponse(['error' => 'Geçersiz section'], 400);
        }
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}

/**
 * Footer verilerini getir
 */
function getFooterData($db) {
    // Footer ayarları
    $stmt = $db->query('SELECT * FROM footer_settings WHERE id = 1');
    $settings = $stmt->fetch();

    // Sütunlar
    $stmt = $db->query('SELECT * FROM footer_columns WHERE is_active = 1 ORDER BY sort_order ASC');
    $columns = $stmt->fetchAll();

    // Linkler
    $stmt = $db->query('SELECT * FROM footer_links WHERE is_active = 1 ORDER BY sort_order ASC');
    $allLinks = $stmt->fetchAll();

    // Linkleri sütunlara göre grupla
    $linksByColumn = [];
    foreach ($allLinks as $link) {
        $colId = $link['column_id'];
        if (!isset($linksByColumn[$colId])) {
            $linksByColumn[$colId] = [];
        }
        $linksByColumn[$colId][] = [
            'id' => (int)$link['id'],
            'text' => $link['text'],
            'url' => $link['url']
        ];
    }

    // Sütunları formatla
    $formattedColumns = array_map(function($col) use ($linksByColumn) {
        return [
            'id' => (int)$col['id'],
            'title' => $col['title'],
            'links' => $linksByColumn[$col['id']] ?? []
        ];
    }, $columns);

    // İletişim bilgileri
    $stmt = $db->query('SELECT * FROM contact_info WHERE id = 1');
    $contact = $stmt->fetch();

    // Sosyal medya
    $stmt = $db->query('SELECT * FROM social_media WHERE is_active = 1 ORDER BY sort_order ASC');
    $socialMedia = $stmt->fetchAll();

    return [
        'logoImage' => $settings['logo_image'] ?? null,
        'slogan' => $settings['slogan'] ?? null,
        'copyrightText' => $settings['copyright_text'] ?? null,
        'columns' => $formattedColumns,
        'contact' => $contact ? [
            'address' => $contact['address'],
            'phone' => $contact['phone'],
            'email' => $contact['email'],
            'workingHours' => $contact['working_hours']
        ] : null,
        'socialMedia' => array_map(function($sm) {
            return [
                'id' => (int)$sm['id'],
                'platform' => $sm['platform'],
                'url' => $sm['url'],
                'icon' => $sm['icon']
            ];
        }, $socialMedia)
    ];
}
?>
