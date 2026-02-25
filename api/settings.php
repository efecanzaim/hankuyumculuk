<?php
/**
 * Genel Ayarlar API - Düzeltilmiş Versiyon
 * MySQL subquery sorunları giderildi
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        $key = $_GET['key'] ?? null;
        if ($key) {
            $value = getSettingByKey($db, $key);
            if ($value !== null) {
                jsonResponse(['key' => $key, 'value' => $value]);
            } else {
                jsonResponse(['error' => 'Ayar bulunamadı'], 404);
            }
        } else {
            jsonResponse(['error' => 'Key parametresi gerekli'], 400);
        }
        break;

    case 'PUT':
    case 'POST':
        requireAuth();
        
        $data = getJsonBody();
        
        // Debug logging
        error_log('settings.php - Parsed data: ' . json_encode($data));

        if (empty($data['key'])) {
            jsonResponse([
                'error' => 'Ayar anahtarı gerekli', 
                'received_data' => $data,
                'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
                'request_method' => $_SERVER['REQUEST_METHOD']
            ], 400);
        }

        $key = $data['key'];
        $value = $data['value'] ?? null;

        try {
            $result = saveSettingByKey($db, $key, $value);
            if ($result) {
                jsonResponse(['success' => true, 'message' => 'Ayar güncellendi']);
            } else {
                jsonResponse(['error' => 'Ayar güncellenemedi', 'key' => $key], 500);
            }
        } catch (Exception $e) {
            jsonResponse(['error' => 'Kayıt hatası: ' . $e->getMessage(), 'key' => $key, 'trace' => $e->getTraceAsString()], 500);
        }
        break;

    default:
        jsonResponse(['error' => 'Geçersiz metod'], 405);
}

function getSettingByKey($db, $key) {
    if ($key === 'top_banner') {
        $stmt = $db->query('SELECT * FROM top_banner LIMIT 1');
        $row = $stmt->fetch();
        return $row ? ['text' => $row['text'], 'link' => $row['link'], 'visible' => (bool)$row['is_visible']] : null;
    }
    
    $stmt = $db->prepare('SELECT * FROM general_settings WHERE setting_key = ?');
    $stmt->execute([$key]);
    $setting = $stmt->fetch();
    return $setting ? parseSettingValue($setting) : null;
}

function saveSettingByKey($db, $key, $value) {
    switch ($key) {
        case 'top_banner':
            $text = $value['text'] ?? '';
            $link = $value['link'] ?? '';
            $visible = ($value['visible'] ?? true) ? 1 : 0;
            
            $stmt = $db->query('SELECT id FROM top_banner LIMIT 1');
            $existing = $stmt->fetch();
            
            if ($existing) {
                $stmt = $db->prepare('UPDATE top_banner SET text = ?, link = ?, is_visible = ? LIMIT 1');
                return $stmt->execute([$text, $link, $visible]);
            }
            $stmt = $db->prepare('INSERT INTO top_banner (text, link, is_visible) VALUES (?, ?, ?)');
            return $stmt->execute([$text, $link, $visible]);

        case 'header':
            $logo = $value['logo'] ?? '/images/logo.png';
            $logoAlt = $value['logoAlt'] ?? 'Han Kuyumculuk';
            
            $stmt = $db->query('SELECT id FROM header_settings LIMIT 1');
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE header_settings SET logo_image = ?, logo_alt = ? LIMIT 1');
                return $stmt->execute([$logo, $logoAlt]);
            }
            $stmt = $db->prepare('INSERT INTO header_settings (logo_image, logo_alt) VALUES (?, ?)');
            return $stmt->execute([$logo, $logoAlt]);

        case 'trend_section':
            $stmt = $db->query('SELECT id FROM homepage_trend_section LIMIT 1');
            // Konum/zoom sütunları var mı kontrol et
            $hasAdjustCols = false;
            try {
                $checkCol = $db->query("SHOW COLUMNS FROM homepage_trend_section LIKE 'left_image_position'");
                $hasAdjustCols = $checkCol->rowCount() > 0;
            } catch (Exception $e) {}

            if ($hasAdjustCols) {
                $params = [
                    $value['leftImage'] ?? '', $value['leftTitle'] ?? '', $value['leftTitleLink'] ?? '',
                    $value['leftImagePosition'] ?? '50% 50%', $value['leftImageScale'] ?? 1,
                    $value['rightImage'] ?? '', $value['rightTitle'] ?? '', $value['rightTitleLink'] ?? '',
                    $value['rightImagePosition'] ?? '50% 50%', $value['rightImageScale'] ?? 1
                ];
                if ($stmt->fetch()) {
                    $stmt = $db->prepare('UPDATE homepage_trend_section SET left_image=?, left_title=?, left_link=?, left_image_position=?, left_image_scale=?, right_image=?, right_title=?, right_link=?, right_image_position=?, right_image_scale=? LIMIT 1');
                    return $stmt->execute($params);
                }
                $stmt = $db->prepare('INSERT INTO homepage_trend_section (left_image, left_title, left_link, left_image_position, left_image_scale, right_image, right_title, right_link, right_image_position, right_image_scale) VALUES (?,?,?,?,?,?,?,?,?,?)');
                return $stmt->execute($params);
            } else {
                $params = [
                    $value['leftImage'] ?? '', $value['leftTitle'] ?? '', $value['leftTitleLink'] ?? '',
                    $value['rightImage'] ?? '', $value['rightTitle'] ?? '', $value['rightTitleLink'] ?? ''
                ];
                if ($stmt->fetch()) {
                    $stmt = $db->prepare('UPDATE homepage_trend_section SET left_image=?, left_title=?, left_link=?, right_image=?, right_title=?, right_link=? LIMIT 1');
                    return $stmt->execute($params);
                }
                $stmt = $db->prepare('INSERT INTO homepage_trend_section (left_image, left_title, left_link, right_image, right_title, right_link) VALUES (?,?,?,?,?,?)');
                return $stmt->execute($params);
            }

        case 'parallax_section':
            $bg = $value['backgroundImage'] ?? '';
            $stmt = $db->query('SELECT id FROM homepage_parallax_section LIMIT 1');
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_parallax_section SET background_image=? LIMIT 1');
                return $stmt->execute([$bg]);
            }
            $stmt = $db->prepare('INSERT INTO homepage_parallax_section (background_image) VALUES (?)');
            return $stmt->execute([$bg]);

        case 'story_section':
            $stmt = $db->query('SELECT id FROM homepage_story_section LIMIT 1');
            $params = [$value['title'] ?? '', $value['mainText'] ?? '', $value['subText'] ?? '', $value['linkText'] ?? '', $value['linkUrl'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_story_section SET title=?, main_text=?, sub_text=?, link_text=?, link_url=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO homepage_story_section (title, main_text, sub_text, link_text, link_url) VALUES (?,?,?,?,?)');
            return $stmt->execute($params);

        case 'featured_products_section':
            $stmt = $db->query('SELECT id FROM homepage_featured_section LIMIT 1');
            $params = [$value['titlePart1'] ?? '', $value['titlePart2'] ?? '', $value['bannerImage1'] ?? '', $value['bannerImage2'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_featured_section SET title_part1=?, title_part2=?, banner_image1=?, banner_image2=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO homepage_featured_section (title_part1, title_part2, banner_image1, banner_image2) VALUES (?,?,?,?)');
            return $stmt->execute($params);

        case 'special_design_section':
            // Başlık kaydet
            $stmt = $db->query('SELECT id FROM homepage_special_section LIMIT 1');
            $params = [$value['titlePart1'] ?? '', $value['titlePart2'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_special_section SET title_part1=?, title_part2=? LIMIT 1');
                $stmt->execute($params);
            } else {
                $stmt = $db->prepare('INSERT INTO homepage_special_section (title_part1, title_part2) VALUES (?,?)');
                $stmt->execute($params);
            }

            // Kartları kaydet - önce mevcut kartları temizle
            $db->exec('DELETE FROM homepage_cards');

            // Konum/zoom sütunları var mı kontrol et
            $hasCardAdjustCols = false;
            try {
                $checkCol = $db->query("SHOW COLUMNS FROM homepage_cards LIKE 'image_position'");
                $hasCardAdjustCols = $checkCol->rowCount() > 0;
            } catch (Exception $e) {}

            // Üst kartları ekle
            $topCards = $value['topCards'] ?? [];
            if ($hasCardAdjustCols) {
                $insertStmt = $db->prepare('INSERT INTO homepage_cards (title, subtitle, image, link, button_text, section_type, sort_order, is_active, image_position, image_scale) VALUES (?,?,?,?,?,?,?,1,?,?)');
            } else {
                $insertStmt = $db->prepare('INSERT INTO homepage_cards (title, subtitle, image, link, button_text, section_type, sort_order, is_active) VALUES (?,?,?,?,?,?,?,1)');
            }
            foreach ($topCards as $i => $card) {
                $params = [
                    $card['title'] ?? '',
                    $card['subtitle'] ?? '',
                    $card['image'] ?? '',
                    $card['link'] ?? '',
                    $card['buttonText'] ?? '',
                    'top',
                    $i + 1
                ];
                if ($hasCardAdjustCols) {
                    $params[] = $card['imagePosition'] ?? '50% 50%';
                    $params[] = $card['imageScale'] ?? 1;
                }
                $insertStmt->execute($params);
            }

            // Alt kartları ekle
            $bottomCards = $value['bottomCards'] ?? [];
            foreach ($bottomCards as $i => $card) {
                $params = [
                    $card['title'] ?? '',
                    $card['subtitle'] ?? '',
                    $card['image'] ?? '',
                    $card['link'] ?? '',
                    $card['buttonText'] ?? '',
                    'bottom',
                    $i + 1
                ];
                if ($hasCardAdjustCols) {
                    $params[] = $card['imagePosition'] ?? '50% 50%';
                    $params[] = $card['imageScale'] ?? 1;
                }
                $insertStmt->execute($params);
            }

            return true;

        case 'blog_section':
            $stmt = $db->query('SELECT id FROM homepage_blog_section LIMIT 1');
            $params = [$value['title'] ?? '', $value['subtitle'] ?? '', $value['description'] ?? '', $value['additionalText'] ?? '', $value['image'] ?? '', $value['linkText'] ?? '', $value['linkUrl'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_blog_section SET title=?, subtitle=?, description=?, additional_text=?, image=?, link_text=?, link_url=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO homepage_blog_section (title, subtitle, description, additional_text, image, link_text, link_url) VALUES (?,?,?,?,?,?,?)');
            return $stmt->execute($params);

        case 'footer':
            $stmt = $db->query('SELECT id FROM footer_settings LIMIT 1');
            $params = [$value['logo'] ?? '', $value['slogan'] ?? '', $value['copyright'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE footer_settings SET logo_image=?, slogan=?, copyright_text=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO footer_settings (logo_image, slogan, copyright_text) VALUES (?,?,?)');
            return $stmt->execute($params);

        case 'contact':
            $stmt = $db->query('SELECT id FROM contact_info LIMIT 1');
            $params = [
                $value['address'] ?? '', 
                $value['phone'] ?? '', 
                $value['email'] ?? '', 
                $value['workingHours'] ?? '', 
                $value['mapEmbed'] ?? '',
                $value['instagram1'] ?? '@gozumunnuru.antalya',
                $value['instagram1Url'] ?? 'https://www.instagram.com/gozumunnuru.antalya',
                $value['instagram2'] ?? '@hankuyumculuk_',
                $value['instagram2Url'] ?? 'https://www.instagram.com/hankuyumculuk_'
            ];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE contact_info SET address=?, phone=?, email=?, working_hours=?, map_embed=?, instagram1=?, instagram1_url=?, instagram2=?, instagram2_url=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO contact_info (address, phone, email, working_hours, map_embed, instagram1, instagram1_url, instagram2, instagram2_url) VALUES (?,?,?,?,?,?,?,?,?)');
            return $stmt->execute($params);

        case 'hero':
            // Hero slides güncelle
            $slides = $value['slides'] ?? [];

            // Gönderilen slide ID'lerini topla
            $sentIds = [];
            foreach ($slides as $slide) {
                if (!empty($slide['id'])) {
                    $sentIds[] = (int)$slide['id'];
                }
            }

            // Listede olmayan slide'ları sil
            if (!empty($sentIds)) {
                $placeholders = implode(',', array_fill(0, count($sentIds), '?'));
                $stmt = $db->prepare("DELETE FROM hero_slides WHERE id NOT IN ($placeholders)");
                $stmt->execute($sentIds);
            } else {
                // Hiç ID yoksa tümünü sil (hepsi yeni eklenecek)
                $db->exec('DELETE FROM hero_slides');
            }

            foreach ($slides as $index => $slide) {
                $id = $slide['id'] ?? null;
                $backgroundMedia = $slide['backgroundImage'] ?? $slide['backgroundMedia'] ?? '';
                $mediaType = $slide['mediaType'] ?? 'image';
                $title = $slide['title'] ?? '';
                $subtitle = $slide['subtitle'] ?? '';
                $buttonText = $slide['ctaText'] ?? $slide['buttonText'] ?? '';
                $buttonLink = $slide['ctaLink'] ?? $slide['buttonLink'] ?? '';
                $sortOrder = $index + 1;

                if ($id) {
                    // Mevcut slide'ı güncelle
                    $stmt = $db->prepare('UPDATE hero_slides SET background_media=?, media_type=?, title=?, subtitle=?, button_text=?, button_link=?, sort_order=? WHERE id=?');
                    $stmt->execute([$backgroundMedia, $mediaType, $title, $subtitle, $buttonText, $buttonLink, $sortOrder, $id]);
                } else {
                    // Yeni slide ekle
                    $stmt = $db->prepare('INSERT INTO hero_slides (background_media, media_type, title, subtitle, button_text, button_link, sort_order, is_active) VALUES (?,?,?,?,?,?,?,1)');
                    $stmt->execute([$backgroundMedia, $mediaType, $title, $subtitle, $buttonText, $buttonLink, $sortOrder]);
                }
            }
            return true;

        case 'featured_products':
        case 'yuzuk_category':
        case 'kolye_category':
        case 'bileklik_category':
        case 'kupe_category':
        case 'set_category':
        case 'gozumun_nuru_category':
        case 'dogum_gunu_category':
        case 'anneler_gunu_category':
        case 'kadinlar_gunu_category':
        case 'ozel_gunler_category':
        case 'yeni_dogan_category':
        case 'aksesuar_category':
        case 'tesbih_category':
        case 'erkek_bileklik_category':
        case 'erkek_yuzuk_category':
        case 'ozel_tasarim_page':
        case 'preloved_page':
        case 'yatirim_page':
        case 'iletisim_page':
            return true;

        default:
            $storedValue = is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE) : (string)$value;
            $type = is_array($value) ? 'json' : 'text';
            $stmt = $db->prepare('INSERT INTO general_settings (setting_key, setting_value, setting_type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value), setting_type=VALUES(setting_type)');
            return $stmt->execute([$key, $storedValue, $type]);
    }
}

function parseSettingValue($setting) {
    $value = $setting['setting_value'];
    $type = $setting['setting_type'];
    switch ($type) {
        case 'boolean': return filter_var($value, FILTER_VALIDATE_BOOLEAN);
        case 'json': return json_decode($value, true);
        default: return $value;
    }
}
?>
