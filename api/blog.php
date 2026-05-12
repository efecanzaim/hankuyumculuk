<?php
/**
 * Han Kuyumculuk - Blog API
 * Blog yazılarını yönetmek için CRUD işlemleri
 */

require_once 'config.php';

// Veritabanı bağlantısı
$db = getDB();

// Tabloyu oluştur (yoksa)
$db->exec("
    CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt TEXT,
        content LONGTEXT,
        image VARCHAR(500),
        author VARCHAR(100) DEFAULT 'Han Kuyumculuk',
        status ENUM('draft', 'published') DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        published_at TIMESTAMP NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Tek blog yazısı veya liste
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $post = $stmt->fetch();

            if ($post) {
                jsonResponse($post);
            } else {
                jsonResponse(['error' => 'Blog yazısı bulunamadı'], 404);
            }
        } elseif (isset($_GET['slug'])) {
            $lang = $_GET['lang'] ?? 'tr';
            $stmt = $db->prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'");
            $stmt->execute([$_GET['slug']]);
            $post = $stmt->fetch();

            if ($post) {
                if ($lang !== 'tr') {
                    $post = localizePost($post, $lang);
                }
                jsonResponse($post);
            } else {
                jsonResponse(['error' => 'Blog yazısı bulunamadı'], 404);
            }
        } elseif (isset($_GET['latest'])) {
            // En son yayınlanan blog yazısı (dile göre filtrele)
            $lang = $_GET['lang'] ?? 'tr';
            if ($lang === 'en') {
                $stmt = $db->query("SELECT * FROM blog_posts WHERE status = 'published' AND title_en IS NOT NULL AND title_en != '' ORDER BY published_at DESC LIMIT 1");
            } elseif ($lang === 'ru') {
                $stmt = $db->query("SELECT * FROM blog_posts WHERE status = 'published' AND title_ru IS NOT NULL AND title_ru != '' ORDER BY published_at DESC LIMIT 1");
            } else {
                $stmt = $db->query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC LIMIT 1");
            }
            $post = $stmt->fetch();
            if ($post && $lang !== 'tr') {
                $post = localizePost($post, $lang);
            }
            jsonResponse($post ?: null);
        } else {
            // Tüm blog yazıları
            $status = $_GET['status'] ?? null;
            $lang = $_GET['lang'] ?? 'tr';

            $params = [];
            $where = [];

            if ($status) {
                $where[] = 'status = ?';
                $params[] = $status;
            }

            // Dile göre sadece o dilde içeriği olan yazıları getir
            if ($lang === 'en') {
                $where[] = "title_en IS NOT NULL AND title_en != ''";
            } elseif ($lang === 'ru') {
                $where[] = "title_ru IS NOT NULL AND title_ru != ''";
            }

            $sql = "SELECT * FROM blog_posts";
            if (!empty($where)) $sql .= " WHERE " . implode(' AND ', $where);
            $sql .= " ORDER BY created_at DESC";

            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $posts = $stmt->fetchAll();

            // Lokalize alanları döndür
            if ($lang !== 'tr') {
                $posts = array_map(fn($p) => localizePost($p, $lang), $posts);
            }

            jsonResponse($posts);
        }
        break;

    case 'POST':
        // Yeni blog yazısı oluştur
        $data = getJsonBody();

        if (empty($data['title'])) {
            jsonResponse(['error' => 'Başlık gerekli'], 400);
        }

        // Slug oluştur
        $slug = $data['slug'] ?? createSlug($data['title']);

        // Slug benzersiz mi kontrol et
        $stmt = $db->prepare("SELECT id FROM blog_posts WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug = $slug . '-' . time();
        }

        $stmt = $db->prepare("
            INSERT INTO blog_posts (title, title_en, title_ru, slug, excerpt, excerpt_en, excerpt_ru, content, content_en, content_ru, image, author, status, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $status = $data['status'] ?? 'draft';
        $publishedAt = $status === 'published' ? date('Y-m-d H:i:s') : null;

        $stmt->execute([
            $data['title'],
            $data['title_en'] ?? null,
            $data['title_ru'] ?? null,
            $slug,
            $data['excerpt'] ?? null,
            $data['excerpt_en'] ?? null,
            $data['excerpt_ru'] ?? null,
            $data['content'] ?? null,
            $data['content_en'] ?? null,
            $data['content_ru'] ?? null,
            $data['image'] ?? null,
            $data['author'] ?? 'Han Kuyumculuk',
            $status,
            $publishedAt
        ]);

        $id = $db->lastInsertId();

        jsonResponse([
            'success' => true,
            'id' => $id,
            'slug' => $slug,
            'message' => 'Blog yazısı oluşturuldu'
        ]);
        break;

    case 'PUT':
        // Blog yazısı güncelle
        $data = getJsonBody();

        if (empty($data['id'])) {
            jsonResponse(['error' => 'ID gerekli'], 400);
        }

        // Mevcut veriyi al
        $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
        $stmt->execute([$data['id']]);
        $existing = $stmt->fetch();

        if (!$existing) {
            jsonResponse(['error' => 'Blog yazısı bulunamadı'], 404);
        }

        // Slug değiştiyse benzersizlik kontrolü
        $slug = $data['slug'] ?? $existing['slug'];
        if ($slug !== $existing['slug']) {
            $stmt = $db->prepare("SELECT id FROM blog_posts WHERE slug = ? AND id != ?");
            $stmt->execute([$slug, $data['id']]);
            if ($stmt->fetch()) {
                $slug = $slug . '-' . time();
            }
        }

        // Status değiştiyse published_at güncelle
        $status = $data['status'] ?? $existing['status'];
        $publishedAt = $existing['published_at'];
        if ($status === 'published' && $existing['status'] !== 'published') {
            $publishedAt = date('Y-m-d H:i:s');
        }

        $stmt = $db->prepare("
            UPDATE blog_posts SET
                title = ?,
                title_en = ?,
                title_ru = ?,
                slug = ?,
                excerpt = ?,
                excerpt_en = ?,
                excerpt_ru = ?,
                content = ?,
                content_en = ?,
                content_ru = ?,
                image = ?,
                author = ?,
                status = ?,
                published_at = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $data['title'] ?? $existing['title'],
            $data['title_en'] ?? $existing['title_en'] ?? null,
            $data['title_ru'] ?? $existing['title_ru'] ?? null,
            $slug,
            $data['excerpt'] ?? $existing['excerpt'],
            $data['excerpt_en'] ?? $existing['excerpt_en'] ?? null,
            $data['excerpt_ru'] ?? $existing['excerpt_ru'] ?? null,
            $data['content'] ?? $existing['content'],
            $data['content_en'] ?? $existing['content_en'] ?? null,
            $data['content_ru'] ?? $existing['content_ru'] ?? null,
            $data['image'] ?? $existing['image'],
            $data['author'] ?? $existing['author'],
            $status,
            $publishedAt,
            $data['id']
        ]);

        jsonResponse([
            'success' => true,
            'message' => 'Blog yazısı güncellendi'
        ]);
        break;

    case 'DELETE':
        // Blog yazısı sil
        $data = getJsonBody();

        if (empty($data['id'])) {
            jsonResponse(['error' => 'ID gerekli'], 400);
        }

        $stmt = $db->prepare("DELETE FROM blog_posts WHERE id = ?");
        $stmt->execute([$data['id']]);

        if ($stmt->rowCount() > 0) {
            jsonResponse(['success' => true, 'message' => 'Blog yazısı silindi']);
        } else {
            jsonResponse(['error' => 'Blog yazısı bulunamadı'], 404);
        }
        break;

    default:
        jsonResponse(['error' => 'Geçersiz method'], 405);
}

// Blog yazısını verilen dile göre lokalize et
function localizePost($post, $lang) {
    if ($lang === 'en') {
        if (!empty($post['title_en']))   $post['title']   = $post['title_en'];
        if (!empty($post['excerpt_en'])) $post['excerpt'] = $post['excerpt_en'];
        if (!empty($post['content_en'])) $post['content'] = $post['content_en'];
    } elseif ($lang === 'ru') {
        if (!empty($post['title_ru']))   $post['title']   = $post['title_ru'];
        if (!empty($post['excerpt_ru'])) $post['excerpt'] = $post['excerpt_ru'];
        if (!empty($post['content_ru'])) $post['content'] = $post['content_ru'];
    }
    return $post;
}

// Slug oluşturma fonksiyonu
function createSlug($text) {
    // Türkçe karakterleri dönüştür
    $turkish = ['ı', 'ğ', 'ü', 'ş', 'ö', 'ç', 'İ', 'Ğ', 'Ü', 'Ş', 'Ö', 'Ç'];
    $english = ['i', 'g', 'u', 's', 'o', 'c', 'i', 'g', 'u', 's', 'o', 'c'];
    $text = str_replace($turkish, $english, $text);

    // Küçük harfe çevir
    $text = mb_strtolower($text, 'UTF-8');

    // Alfanümerik olmayan karakterleri tire ile değiştir
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);

    // Baştaki ve sondaki tireleri kaldır
    $text = trim($text, '-');

    return $text;
}
?>
