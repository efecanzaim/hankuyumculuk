<?php
/**
 * Toplu Ürün Yükleme API
 * POST: Birden fazla ürünü aynı anda ekle
 */

require_once 'config.php';
require_once 'auth.php';

// Sadece POST metodunu kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Sadece POST metodu desteklenir'], 405);
}

// Auth gerekli
requireAuth();

$data = getJsonBody();

if (empty($data['products']) || !is_array($data['products'])) {
    jsonResponse(['error' => 'Ürün listesi gerekli'], 400);
}

$db = getDB();
$products = $data['products'];
$inserted = 0;
$errors = [];

// Her ürünü ekle
foreach ($products as $index => $product) {
    try {
        // Ürün adı zorunlu
        if (empty($product['name'])) {
            $errors[] = "Satır " . ($index + 1) . ": Ürün adı gerekli";
            continue;
        }

        // Slug oluştur
        $slug = !empty($product['slug']) ? $product['slug'] : createSlug($product['name']);

        // Slug benzersiz mi kontrol et
        $stmt = $db->prepare('SELECT id FROM products WHERE slug = ?');
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            // Benzersiz yapmak için timestamp ekle
            $slug = $slug . '-' . time() . '-' . $inserted;
        }

        // Galeri görsellerini JSON'a çevir
        $galleryImages = null;
        if (isset($product['gallery_images']) && is_array($product['gallery_images'])) {
            $galleryImages = json_encode($product['gallery_images']);
        } elseif (isset($product['galleryImages']) && is_array($product['galleryImages'])) {
            $galleryImages = json_encode($product['galleryImages']);
        }

        // Kategori ID'yi kontrol et
        $categoryId = null;
        if (isset($product['category_id']) && $product['category_id'] !== '') {
            $categoryId = (int)$product['category_id'];
        } elseif (isset($product['categoryId']) && $product['categoryId'] !== '') {
            $categoryId = (int)$product['categoryId'];
        }

        // is_active değerini belirle
        $isActive = 1; // Varsayılan aktif
        if (isset($product['is_active'])) {
            $isActive = $product['is_active'] ? 1 : 0;
        } elseif (isset($product['isActive'])) {
            $isActive = $product['isActive'] ? 1 : 0;
        }

        // Gold weight ve karat değerlerini al
        $goldWeight = null;
        if (isset($product['gold_weight']) && $product['gold_weight'] !== '') {
            // Virgüllü formatı noktaya çevir
            $goldWeight = str_replace(',', '.', $product['gold_weight']);
            $goldWeight = floatval($goldWeight);
        }

        $goldKarat = null;
        if (isset($product['gold_karat']) && $product['gold_karat'] !== '') {
            $goldKarat = (int)$product['gold_karat'];
        }

        // Ürünü ekle
        $stmt = $db->prepare('
            INSERT INTO products (
                category_id,
                slug,
                name,
                subtitle,
                description,
                main_image,
                banner_image,
                gallery_images,
                gold_weight,
                gold_karat,
                is_featured,
                sort_order,
                is_active
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');

        $stmt->execute([
            $categoryId,
            $slug,
            $product['name'],
            $product['subtitle'] ?? '',
            $product['description'] ?? '',
            $product['image'] ?? $product['main_image'] ?? $product['mainImage'] ?? '',
            $product['banner_image'] ?? $product['bannerImage'] ?? '',
            $galleryImages,
            $goldWeight,
            $goldKarat,
            0, // is_featured varsayılan olarak 0
            $product['sort_order'] ?? $product['sortOrder'] ?? 0,
            $isActive
        ]);

        // Eklenen ürünün ID'sini al
        $productId = $db->lastInsertId();

        // Taş bilgilerini ekle
        if (!empty($product['stones']) && is_array($product['stones'])) {
            $stoneStmt = $db->prepare('
                INSERT INTO product_stones (
                    product_id,
                    stone_type,
                    carat,
                    quantity,
                    color,
                    clarity,
                    cut,
                    sort_order
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ');

            foreach ($product['stones'] as $stoneIndex => $stone) {
                $stoneCarat = null;
                if (isset($stone['carat']) && $stone['carat'] !== '') {
                    $stoneCarat = str_replace(',', '.', $stone['carat']);
                    $stoneCarat = floatval($stoneCarat);
                }

                $stoneStmt->execute([
                    $productId,
                    $stone['stone_type'] ?? 'Pırlanta',
                    $stoneCarat,
                    $stone['quantity'] ?? 1,
                    $stone['color'] ?? '',
                    $stone['clarity'] ?? '',
                    $stone['cut'] ?? '',
                    $stoneIndex
                ]);
            }
        }

        $inserted++;
    } catch (Exception $e) {
        $errors[] = "Satır " . ($index + 1) . " (" . ($product['name'] ?? 'İsimsiz') . "): " . $e->getMessage();
    }
}

// Sonuçları döndür
if ($inserted > 0) {
    $response = [
        'success' => true,
        'inserted' => $inserted,
        'message' => "$inserted ürün başarıyla eklendi"
    ];

    if (!empty($errors)) {
        $response['warnings'] = $errors;
        $response['message'] .= ", " . count($errors) . " hataya rastlandı";
    }

    jsonResponse($response);
} else {
    jsonResponse([
        'success' => false,
        'inserted' => 0,
        'errors' => $errors,
        'message' => 'Hiçbir ürün eklenemedi'
    ], 400);
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
