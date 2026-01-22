<?php
/**
 * Ana Sayfa Bölümleri API
 * GET: Tüm ana sayfa bölümlerini veya belirli bir bölümü getir
 * PUT: Bölüm güncelle
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

// Hangi bölüm isteniyor
$section = $_GET['section'] ?? null;

switch ($method) {
    case 'GET':
        if ($section) {
            // Belirli bir bölümü getir
            $data = getSection($db, $section);
            if ($data === null) {
                jsonResponse(['error' => 'Bölüm bulunamadı'], 404);
            }
            jsonResponse($data);
        } else {
            // Tüm ana sayfa bölümlerini getir
            $homepage = getAllHomepageSections($db);
            jsonResponse($homepage);
        }
        break;

    case 'PUT':
        // Auth gerekli
        requireAuth();

        if (!$section) {
            jsonResponse(['error' => 'Bölüm belirtilmedi'], 400);
        }

        $data = getJsonBody();
        $result = updateSection($db, $section, $data);

        if ($result) {
            jsonResponse(['success' => true, 'message' => 'Bölüm güncellendi']);
        } else {
            jsonResponse(['error' => 'Güncelleme başarısız'], 500);
        }
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}

/**
 * Tüm ana sayfa bölümlerini getir
 */
function getAllHomepageSections($db) {
    return [
        'topBanner' => getSection($db, 'topBanner'),
        'header' => getSection($db, 'header'),
        'hero' => getSection($db, 'hero'),
        'trend' => getSection($db, 'trend'),
        'parallax' => getSection($db, 'parallax'),
        'story' => getSection($db, 'story'),
        'featured' => getSection($db, 'featured'),
        'special' => getSection($db, 'special'),
        'cards' => getSection($db, 'cards'),
        'investment' => getSection($db, 'investment'),
        'blog' => getSection($db, 'blog')
    ];
}

/**
 * Belirli bir bölümü getir
 */
function getSection($db, $section) {
    switch ($section) {
        case 'topBanner':
            $stmt = $db->query('SELECT * FROM top_banner WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'text' => $row['text'],
                'link' => $row['link'],
                'visible' => (bool)$row['is_visible']
            ] : null;

        case 'header':
            $stmt = $db->query('SELECT * FROM header_settings WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'logoImage' => $row['logo_image'],
                'logoAlt' => $row['logo_alt']
            ] : null;

        case 'hero':
            $stmt = $db->query('SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC');
            $slides = $stmt->fetchAll();
            return [
                'slides' => array_map(function($slide) {
                    return [
                        'id' => (int)$slide['id'],
                        'backgroundMedia' => $slide['background_media'],
                        'mediaType' => $slide['media_type'],
                        'title' => $slide['title'],
                        'subtitle' => $slide['subtitle'],
                        'buttonText' => $slide['button_text'],
                        'buttonLink' => $slide['button_link']
                    ];
                }, $slides)
            ];

        case 'trend':
            $stmt = $db->query('SELECT * FROM homepage_trend_section WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'leftImage' => $row['left_image'],
                'leftTitle' => $row['left_title'],
                'leftLink' => $row['left_link'],
                'rightImage' => $row['right_image'],
                'rightTitle' => $row['right_title'],
                'rightLink' => $row['right_link']
            ] : null;

        case 'parallax':
            $stmt = $db->query('SELECT * FROM homepage_parallax_section WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'backgroundImage' => $row['background_image']
            ] : null;

        case 'story':
            $stmt = $db->query('SELECT * FROM homepage_story_section WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'title' => $row['title'],
                'mainText' => $row['main_text'],
                'subText' => $row['sub_text'],
                'linkText' => $row['link_text'],
                'linkUrl' => $row['link_url']
            ] : null;

        case 'featured':
            $stmt = $db->query('SELECT * FROM homepage_featured_section WHERE id = 1');
            $row = $stmt->fetch();

            // Öne çıkan ürünleri de getir
            $stmt2 = $db->query('
                SELECT fp.*, p.main_image, p.slug as product_slug
                FROM featured_products fp
                JOIN products p ON fp.product_id = p.id
                WHERE fp.is_active = 1 AND p.is_active = 1
                ORDER BY fp.sort_order ASC
            ');
            $products = $stmt2->fetchAll();

            return [
                'titlePart1' => $row['title_part1'] ?? 'SİZE ÖZEL',
                'titlePart2' => $row['title_part2'] ?? 'ÜRÜNLERİMİZ',
                'bannerImage1' => $row['banner_image1'],
                'bannerImage2' => $row['banner_image2'],
                'products' => array_map(function($p) {
                    return [
                        'id' => (int)$p['id'],
                        'productId' => (int)$p['product_id'],
                        'image' => $p['main_image'],
                        'name' => $p['display_name'],
                        'category' => $p['display_category'],
                        'link' => '/urun/' . $p['product_slug']
                    ];
                }, $products)
            ];

        case 'special':
            $stmt = $db->query('SELECT * FROM homepage_special_section WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'titlePart1' => $row['title_part1'],
                'titlePart2' => $row['title_part2']
            ] : null;

        case 'cards':
            $stmt = $db->query('SELECT * FROM homepage_cards WHERE is_active = 1 ORDER BY section_type, sort_order ASC');
            $allCards = $stmt->fetchAll();

            $topCards = [];
            $bottomCards = [];

            foreach ($allCards as $card) {
                $formatted = [
                    'id' => (int)$card['id'],
                    'title' => $card['title'],
                    'subtitle' => $card['subtitle'],
                    'image' => $card['image'],
                    'link' => $card['link'],
                    'buttonText' => $card['button_text']
                ];

                if ($card['section_type'] === 'top') {
                    $topCards[] = $formatted;
                } else {
                    $bottomCards[] = $formatted;
                }
            }

            return [
                'topCards' => $topCards,
                'bottomCards' => $bottomCards
            ];

        case 'investment':
            $stmt = $db->query('SELECT * FROM homepage_investment_section WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'title' => $row['title'],
                'description' => $row['description'],
                'leftImage' => $row['left_image'],
                'rightImage' => $row['right_image'],
                'buttonText' => $row['button_text'],
                'buttonLink' => $row['button_link']
            ] : null;

        case 'blog':
            $stmt = $db->query('SELECT * FROM homepage_blog_section WHERE id = 1');
            $row = $stmt->fetch();
            return $row ? [
                'title' => $row['title'],
                'subtitle' => $row['subtitle'],
                'description' => $row['description'],
                'additionalText' => $row['additional_text'],
                'image' => $row['image'],
                'linkText' => $row['link_text'],
                'linkUrl' => $row['link_url']
            ] : null;

        default:
            return null;
    }
}

/**
 * Bölümü güncelle
 */
function updateSection($db, $section, $data) {
    switch ($section) {
        case 'topBanner':
            $stmt = $db->prepare('
                UPDATE top_banner SET text = ?, link = ?, is_visible = ? WHERE id = 1
            ');
            return $stmt->execute([
                $data['text'] ?? '',
                $data['link'] ?? null,
                $data['visible'] ?? true
            ]);

        case 'header':
            $stmt = $db->prepare('
                UPDATE header_settings SET logo_image = ?, logo_alt = ? WHERE id = 1
            ');
            return $stmt->execute([
                $data['logoImage'] ?? $data['logo_image'] ?? '/images/logo.png',
                $data['logoAlt'] ?? $data['logo_alt'] ?? 'Han Kuyumculuk'
            ]);

        case 'trend':
            $stmt = $db->prepare('
                UPDATE homepage_trend_section SET
                    left_image = ?, left_title = ?, left_link = ?,
                    right_image = ?, right_title = ?, right_link = ?
                WHERE id = 1
            ');
            return $stmt->execute([
                $data['leftImage'] ?? $data['left_image'] ?? null,
                $data['leftTitle'] ?? $data['left_title'] ?? null,
                $data['leftLink'] ?? $data['left_link'] ?? null,
                $data['rightImage'] ?? $data['right_image'] ?? null,
                $data['rightTitle'] ?? $data['right_title'] ?? null,
                $data['rightLink'] ?? $data['right_link'] ?? null
            ]);

        case 'parallax':
            $stmt = $db->prepare('
                UPDATE homepage_parallax_section SET background_image = ? WHERE id = 1
            ');
            return $stmt->execute([
                $data['backgroundImage'] ?? $data['background_image'] ?? null
            ]);

        case 'story':
            $stmt = $db->prepare('
                UPDATE homepage_story_section SET
                    title = ?, main_text = ?, sub_text = ?,
                    link_text = ?, link_url = ?
                WHERE id = 1
            ');
            return $stmt->execute([
                $data['title'] ?? null,
                $data['mainText'] ?? $data['main_text'] ?? null,
                $data['subText'] ?? $data['sub_text'] ?? null,
                $data['linkText'] ?? $data['link_text'] ?? null,
                $data['linkUrl'] ?? $data['link_url'] ?? null
            ]);

        case 'featured':
            $stmt = $db->prepare('
                UPDATE homepage_featured_section SET
                    title_part1 = ?, title_part2 = ?,
                    banner_image1 = ?, banner_image2 = ?
                WHERE id = 1
            ');
            return $stmt->execute([
                $data['titlePart1'] ?? $data['title_part1'] ?? 'SİZE ÖZEL',
                $data['titlePart2'] ?? $data['title_part2'] ?? 'ÜRÜNLERİMİZ',
                $data['bannerImage1'] ?? $data['banner_image1'] ?? null,
                $data['bannerImage2'] ?? $data['banner_image2'] ?? null
            ]);

        case 'special':
            $stmt = $db->prepare('
                UPDATE homepage_special_section SET
                    title_part1 = ?, title_part2 = ?
                WHERE id = 1
            ');
            return $stmt->execute([
                $data['titlePart1'] ?? $data['title_part1'] ?? 'KENDİNİZİ',
                $data['titlePart2'] ?? $data['title_part2'] ?? 'ÖZEL HİSSEDİN'
            ]);

        case 'investment':
            $stmt = $db->prepare('
                UPDATE homepage_investment_section SET
                    title = ?, description = ?,
                    left_image = ?, right_image = ?,
                    button_text = ?, button_link = ?
                WHERE id = 1
            ');
            return $stmt->execute([
                $data['title'] ?? null,
                $data['description'] ?? null,
                $data['leftImage'] ?? $data['left_image'] ?? null,
                $data['rightImage'] ?? $data['right_image'] ?? null,
                $data['buttonText'] ?? $data['button_text'] ?? null,
                $data['buttonLink'] ?? $data['button_link'] ?? null
            ]);

        case 'blog':
            $stmt = $db->prepare('
                UPDATE homepage_blog_section SET
                    title = ?, subtitle = ?, description = ?,
                    additional_text = ?, image = ?,
                    link_text = ?, link_url = ?
                WHERE id = 1
            ');
            return $stmt->execute([
                $data['title'] ?? null,
                $data['subtitle'] ?? null,
                $data['description'] ?? null,
                $data['additionalText'] ?? $data['additional_text'] ?? null,
                $data['image'] ?? null,
                $data['linkText'] ?? $data['link_text'] ?? null,
                $data['linkUrl'] ?? $data['link_url'] ?? null
            ]);

        default:
            return false;
    }
}
?>
