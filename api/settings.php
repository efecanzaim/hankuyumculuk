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
        $locale = $data['locale'] ?? 'tr';
        if (!in_array($locale, ['tr', 'en', 'ru'])) $locale = 'tr';

        try {
            $result = saveSettingByKey($db, $key, $value, $locale);
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
        return $row ? ['text' => $row['text'], 'visible' => (bool)$row['is_visible']] : null;
    }
    
    $stmt = $db->prepare('SELECT * FROM general_settings WHERE setting_key = ?');
    $stmt->execute([$key]);
    $setting = $stmt->fetch();
    return $setting ? parseSettingValue($setting) : null;
}

function saveSettingByKey($db, $key, $value, $locale = 'tr') {
    // Locale suffix for _en / _ru columns
    $ls = ($locale !== 'tr') ? '_' . $locale : '';

    switch ($key) {
        case 'top_banner':
            $text = $value['text'] ?? '';
            if ($locale !== 'tr') {
                // Sadece çeviri alanını güncelle
                $stmt = $db->prepare("UPDATE top_banner SET text{$ls} = ? LIMIT 1");
                return $stmt->execute([$text]);
            }
            $visible = ($value['visible'] ?? true) ? 1 : 0;
            $stmt = $db->query('SELECT id FROM top_banner LIMIT 1');
            $existing = $stmt->fetch();
            if ($existing) {
                $stmt = $db->prepare('UPDATE top_banner SET text = ?, is_visible = ? LIMIT 1');
                return $stmt->execute([$text, $visible]);
            }
            $stmt = $db->prepare('INSERT INTO top_banner (text, is_visible) VALUES (?, ?)');
            return $stmt->execute([$text, $visible]);

        case 'header':
            // Header alanları dil bağımsız (logo, logoAlt)
            if ($locale !== 'tr') return true;
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
            if ($locale !== 'tr') {
                // left_link_en/ru kolonunun varlığını kontrol et
                $hasLinkCols = false;
                try {
                    $chk = $db->query("SHOW COLUMNS FROM homepage_trend_section LIKE 'left_link_en'");
                    $hasLinkCols = $chk->rowCount() > 0;
                } catch (Exception $e) {}

                if ($hasLinkCols) {
                    $stmt = $db->prepare("UPDATE homepage_trend_section SET left_title{$ls}=?, left_link{$ls}=?, left_button_text{$ls}=?, right_title{$ls}=?, right_link{$ls}=?, right_button_text{$ls}=? LIMIT 1");
                    return $stmt->execute([
                        $value['leftTitle'] ?? '',
                        $value['leftTitleLink'] ?? $value['leftLink'] ?? '',
                        $value['leftButtonText'] ?? '',
                        $value['rightTitle'] ?? '',
                        $value['rightTitleLink'] ?? $value['rightLink'] ?? '',
                        $value['rightButtonText'] ?? ''
                    ]);
                } else {
                    $stmt = $db->prepare("UPDATE homepage_trend_section SET left_title{$ls}=?, right_title{$ls}=?, left_button_text{$ls}=?, right_button_text{$ls}=? LIMIT 1");
                    return $stmt->execute([
                        $value['leftTitle'] ?? '',
                        $value['rightTitle'] ?? '',
                        $value['leftButtonText'] ?? '',
                        $value['rightButtonText'] ?? ''
                    ]);
                }
            }
            // Kolon varlıklarını kontrol et ve gerekirse ekle
            $hasAdjustCols = false;
            $hasButtonCols = false;
            try {
                $checkCol = $db->query("SHOW COLUMNS FROM homepage_trend_section LIKE 'left_image_position'");
                $hasAdjustCols = $checkCol->rowCount() > 0;
            } catch (Exception $e) {}
            try {
                $checkCol = $db->query("SHOW COLUMNS FROM homepage_trend_section LIKE 'left_button_text'");
                $hasButtonCols = $checkCol->rowCount() > 0;
            } catch (Exception $e) {}

            if (!$hasButtonCols) {
                try {
                    $db->exec("ALTER TABLE homepage_trend_section
                        ADD COLUMN left_button_text VARCHAR(100) DEFAULT 'KEŞFEDİN',
                        ADD COLUMN left_button_text_en VARCHAR(100) DEFAULT 'DISCOVER',
                        ADD COLUMN left_button_text_ru VARCHAR(100) DEFAULT 'ОТКРЫТЬ',
                        ADD COLUMN right_button_text VARCHAR(100) DEFAULT 'KEŞFEDİN',
                        ADD COLUMN right_button_text_en VARCHAR(100) DEFAULT 'DISCOVER',
                        ADD COLUMN right_button_text_ru VARCHAR(100) DEFAULT 'ОТКРЫТЬ'");
                    $hasButtonCols = true;
                } catch (Exception $e) {
                    error_log('trend_section button columns migration failed: ' . $e->getMessage());
                }
            }

            $stmt = $db->query('SELECT id FROM homepage_trend_section LIMIT 1');
            $existing = $stmt->fetch();

            if ($hasAdjustCols && $hasButtonCols) {
                $params = [
                    $value['leftImage'] ?? '', $value['leftTitle'] ?? '', $value['leftTitleLink'] ?? '',
                    $value['leftImagePosition'] ?? '50% 50%', $value['leftImageScale'] ?? 1,
                    $value['leftButtonText'] ?? 'KEŞFEDİN',
                    $value['rightImage'] ?? '', $value['rightTitle'] ?? '', $value['rightTitleLink'] ?? '',
                    $value['rightImagePosition'] ?? '50% 50%', $value['rightImageScale'] ?? 1,
                    $value['rightButtonText'] ?? 'KEŞFEDİN'
                ];
                if ($existing) {
                    $stmt = $db->prepare('UPDATE homepage_trend_section SET left_image=?, left_title=?, left_link=?, left_image_position=?, left_image_scale=?, left_button_text=?, right_image=?, right_title=?, right_link=?, right_image_position=?, right_image_scale=?, right_button_text=? LIMIT 1');
                    return $stmt->execute($params);
                }
                $stmt = $db->prepare('INSERT INTO homepage_trend_section (left_image, left_title, left_link, left_image_position, left_image_scale, left_button_text, right_image, right_title, right_link, right_image_position, right_image_scale, right_button_text) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
                return $stmt->execute($params);
            } elseif ($hasAdjustCols) {
                $params = [
                    $value['leftImage'] ?? '', $value['leftTitle'] ?? '', $value['leftTitleLink'] ?? '',
                    $value['leftImagePosition'] ?? '50% 50%', $value['leftImageScale'] ?? 1,
                    $value['rightImage'] ?? '', $value['rightTitle'] ?? '', $value['rightTitleLink'] ?? '',
                    $value['rightImagePosition'] ?? '50% 50%', $value['rightImageScale'] ?? 1
                ];
                if ($existing) {
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
                if ($existing) {
                    $stmt = $db->prepare('UPDATE homepage_trend_section SET left_image=?, left_title=?, left_link=?, right_image=?, right_title=?, right_link=? LIMIT 1');
                    return $stmt->execute($params);
                }
                $stmt = $db->prepare('INSERT INTO homepage_trend_section (left_image, left_title, left_link, right_image, right_title, right_link) VALUES (?,?,?,?,?,?)');
                return $stmt->execute($params);
            }

        case 'parallax_section':
            if ($locale !== 'tr') return true; // Görsel, çeviri yok
            $bg = $value['backgroundImage'] ?? '';
            $stmt = $db->query('SELECT id FROM homepage_parallax_section LIMIT 1');
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_parallax_section SET background_image=? LIMIT 1');
                return $stmt->execute([$bg]);
            }
            $stmt = $db->prepare('INSERT INTO homepage_parallax_section (background_image) VALUES (?)');
            return $stmt->execute([$bg]);

        case 'story_section':
            if ($locale !== 'tr') {
                $stmt = $db->prepare("UPDATE homepage_story_section SET title{$ls}=?, main_text{$ls}=?, sub_text{$ls}=? LIMIT 1");
                return $stmt->execute([$value['title'] ?? '', $value['mainText'] ?? '', $value['subText'] ?? '']);
            }
            $stmt = $db->query('SELECT id FROM homepage_story_section LIMIT 1');
            $params = [$value['title'] ?? '', $value['mainText'] ?? '', $value['subText'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_story_section SET title=?, main_text=?, sub_text=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO homepage_story_section (title, main_text, sub_text) VALUES (?,?,?)');
            return $stmt->execute($params);

        case 'featured_products_section':
            if ($locale !== 'tr') {
                $stmt = $db->prepare("UPDATE homepage_featured_section SET title_part1{$ls}=?, title_part2{$ls}=? LIMIT 1");
                return $stmt->execute([$value['titlePart1'] ?? '', $value['titlePart2'] ?? '']);
            }
            $stmt = $db->query('SELECT id FROM homepage_featured_section LIMIT 1');
            $params = [$value['titlePart1'] ?? '', $value['titlePart2'] ?? '', $value['bannerImage1'] ?? '', $value['bannerImage2'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_featured_section SET title_part1=?, title_part2=?, banner_image1=?, banner_image2=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO homepage_featured_section (title_part1, title_part2, banner_image1, banner_image2) VALUES (?,?,?,?)');
            return $stmt->execute($params);

        case 'special_design_section':
            if ($locale !== 'tr') {
                // Başlık çevirisi
                $stmt = $db->prepare("UPDATE homepage_special_section SET title_part1{$ls}=?, title_part2{$ls}=? LIMIT 1");
                $stmt->execute([$value['titlePart1'] ?? '', $value['titlePart2'] ?? '']);
                // Kart çevirileri - sort_order ile eşleştir
                $topCards = $value['topCards'] ?? [];
                foreach ($topCards as $i => $card) {
                    $sortOrder = $i + 1;
                    $stmt = $db->prepare("UPDATE homepage_cards SET title{$ls}=?, subtitle{$ls}=?, button_text{$ls}=? WHERE section_type='top' AND sort_order=?");
                    $stmt->execute([$card['title'] ?? '', $card['subtitle'] ?? '', $card['buttonText'] ?? '', $sortOrder]);
                }
                $bottomCards = $value['bottomCards'] ?? [];
                foreach ($bottomCards as $i => $card) {
                    $sortOrder = $i + 1;
                    $stmt = $db->prepare("UPDATE homepage_cards SET title{$ls}=?, subtitle{$ls}=?, button_text{$ls}=? WHERE section_type='bottom' AND sort_order=?");
                    $stmt->execute([$card['title'] ?? '', $card['subtitle'] ?? '', $card['buttonText'] ?? '', $sortOrder]);
                }
                return true;
            }
            // TR kayıt (mevcut davranış)
            $stmt = $db->query('SELECT id FROM homepage_special_section LIMIT 1');
            $params = [$value['titlePart1'] ?? '', $value['titlePart2'] ?? ''];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_special_section SET title_part1=?, title_part2=? LIMIT 1');
                $stmt->execute($params);
            } else {
                $stmt = $db->prepare('INSERT INTO homepage_special_section (title_part1, title_part2) VALUES (?,?)');
                $stmt->execute($params);
            }

            // Konum/zoom sütunları var mı kontrol et
            $hasCardAdjustCols = false;
            try {
                $checkCol = $db->query("SHOW COLUMNS FROM homepage_cards LIKE 'image_position'");
                $hasCardAdjustCols = $checkCol->rowCount() > 0;
            } catch (Exception $e) {}

            // Kartları upsert et (DELETE yapmıyoruz; aksi halde _en/_ru çevirileri kaybolur)
            // Her section_type için sort_order'a göre UPDATE; yoksa INSERT; fazlalık satırları DELETE.
            $upsertSection = function (string $sectionType) use ($db, $value, $hasCardAdjustCols) {
                $cards = $value[$sectionType === 'top' ? 'topCards' : 'bottomCards'] ?? [];

                // Mevcut kart sayısını öğren
                $existingStmt = $db->prepare('SELECT sort_order FROM homepage_cards WHERE section_type=? ORDER BY sort_order ASC');
                $existingStmt->execute([$sectionType]);
                $existingOrders = array_map('intval', array_column($existingStmt->fetchAll(), 'sort_order'));

                if ($hasCardAdjustCols) {
                    $updateSql = 'UPDATE homepage_cards SET title=?, subtitle=?, image=?, link=?, button_text=?, image_position=?, image_scale=?, is_active=1 WHERE section_type=? AND sort_order=?';
                    $insertSql = 'INSERT INTO homepage_cards (title, subtitle, image, link, button_text, section_type, sort_order, is_active, image_position, image_scale) VALUES (?,?,?,?,?,?,?,1,?,?)';
                } else {
                    $updateSql = 'UPDATE homepage_cards SET title=?, subtitle=?, image=?, link=?, button_text=?, is_active=1 WHERE section_type=? AND sort_order=?';
                    $insertSql = 'INSERT INTO homepage_cards (title, subtitle, image, link, button_text, section_type, sort_order, is_active) VALUES (?,?,?,?,?,?,?,1)';
                }
                $updateStmt = $db->prepare($updateSql);
                $insertStmt = $db->prepare($insertSql);

                foreach ($cards as $i => $card) {
                    $sortOrder = $i + 1;
                    $existsForOrder = in_array($sortOrder, $existingOrders, true);
                    if ($existsForOrder) {
                        $params = [
                            $card['title'] ?? '',
                            $card['subtitle'] ?? '',
                            $card['image'] ?? '',
                            $card['link'] ?? '',
                            $card['buttonText'] ?? '',
                        ];
                        if ($hasCardAdjustCols) {
                            $params[] = $card['imagePosition'] ?? '50% 50%';
                            $params[] = $card['imageScale'] ?? 1;
                        }
                        $params[] = $sectionType;
                        $params[] = $sortOrder;
                        $updateStmt->execute($params);
                    } else {
                        $params = [
                            $card['title'] ?? '',
                            $card['subtitle'] ?? '',
                            $card['image'] ?? '',
                            $card['link'] ?? '',
                            $card['buttonText'] ?? '',
                            $sectionType,
                            $sortOrder,
                        ];
                        if ($hasCardAdjustCols) {
                            $params[] = $card['imagePosition'] ?? '50% 50%';
                            $params[] = $card['imageScale'] ?? 1;
                        }
                        $insertStmt->execute($params);
                    }
                }

                // Fazlalık satırları temizle (yeni listede olmayan sort_order'lar)
                $newCount = count($cards);
                if ($newCount === 0) {
                    $db->prepare('DELETE FROM homepage_cards WHERE section_type=?')->execute([$sectionType]);
                } else {
                    $del = $db->prepare('DELETE FROM homepage_cards WHERE section_type=? AND sort_order>?');
                    $del->execute([$sectionType, $newCount]);
                }
            };

            $upsertSection('top');
            $upsertSection('bottom');

            return true;

        case 'blog_section':
            if ($locale !== 'tr') {
                // all_posts_link_{locale} kolonunu dinamik olarak ekle
                try {
                    $chk = $db->query("SHOW COLUMNS FROM homepage_blog_section LIKE 'all_posts_link{$ls}'");
                    if ($chk->rowCount() === 0) {
                        $db->exec("ALTER TABLE homepage_blog_section ADD COLUMN all_posts_link{$ls} VARCHAR(255) DEFAULT NULL");
                    }
                } catch (Exception $e) {
                    error_log('homepage_blog_section all_posts_link migration error: ' . $e->getMessage());
                }
                $stmt = $db->prepare("UPDATE homepage_blog_section SET title{$ls}=?, subtitle{$ls}=?, description{$ls}=?, intro_text{$ls}=?, all_posts_text{$ls}=?, all_posts_button_text{$ls}=?, all_posts_link{$ls}=? LIMIT 1");
                return $stmt->execute([
                    $value['title'] ?? '', $value['subtitle'] ?? '', $value['description'] ?? '',
                    $value['introText'] ?? '', $value['allPostsText'] ?? '', $value['allPostsButtonText'] ?? '',
                    $value['allPostsLink'] ?? ''
                ]);
            }
            $stmt = $db->query('SELECT id FROM homepage_blog_section LIMIT 1');
            $params = [
                $value['title'] ?? '', $value['subtitle'] ?? '', $value['description'] ?? '',
                $value['introText'] ?? '', $value['allPostsText'] ?? '', $value['allPostsButtonText'] ?? '',
                $value['allPostsLink'] ?? '/blog'
            ];
            if ($stmt->fetch()) {
                $stmt = $db->prepare('UPDATE homepage_blog_section SET title=?, subtitle=?, description=?, intro_text=?, all_posts_text=?, all_posts_button_text=?, all_posts_link=? LIMIT 1');
                return $stmt->execute($params);
            }
            $stmt = $db->prepare('INSERT INTO homepage_blog_section (title, subtitle, description, intro_text, all_posts_text, all_posts_button_text, all_posts_link) VALUES (?,?,?,?,?,?,?)');
            return $stmt->execute($params);

        case 'footer':
            // slogan_svg kolonu var mı kontrol et
            $hasSvgCol = false;
            try {
                $chk = $db->query("SHOW COLUMNS FROM footer_settings LIKE 'slogan_svg'");
                $hasSvgCol = $chk->rowCount() > 0;
            } catch (Exception $e) {}

            if ($locale !== 'tr') {
                // EN/RU: sadece çevirileri kaydet (slogan, copyright, sloganSvg, sütun başlıkları, link metinleri+URL'leri)
                if ($hasSvgCol) {
                    $stmt = $db->prepare("UPDATE footer_settings SET slogan{$ls}=?, copyright_text{$ls}=?, slogan_svg{$ls}=? LIMIT 1");
                    $stmt->execute([$value['slogan'] ?? '', $value['copyright'] ?? '', $value['sloganSvg'] ?? null]);
                } else {
                    $stmt = $db->prepare("UPDATE footer_settings SET slogan{$ls}=?, copyright_text{$ls}=? LIMIT 1");
                    $stmt->execute([$value['slogan'] ?? '', $value['copyright'] ?? '']);
                }

                // Link URL'leri için url_en/url_ru kolonlarının varlığını sağla
                try {
                    $chk = $db->query("SHOW COLUMNS FROM footer_links LIKE 'url{$ls}'");
                    if ($chk->rowCount() === 0) {
                        $db->exec("ALTER TABLE footer_links ADD COLUMN url{$ls} VARCHAR(255) DEFAULT NULL");
                    }
                } catch (Exception $e) {
                    error_log('footer_links url translation column migration error: ' . $e->getMessage());
                }

                // Sütun başlık çevirileri
                $columns = $value['columns'] ?? [];
                foreach ($columns as $column) {
                    if (!empty($column['id'])) {
                        $stmt = $db->prepare("UPDATE footer_columns SET title{$ls}=? WHERE id=?");
                        $stmt->execute([$column['title'] ?? '', (int)$column['id']]);
                        // Link çevirileri (text + url)
                        foreach (($column['links'] ?? []) as $link) {
                            if (!empty($link['id'])) {
                                $stmt = $db->prepare("UPDATE footer_links SET text{$ls}=?, url{$ls}=? WHERE id=?");
                                $stmt->execute([$link['text'] ?? '', $link['href'] ?? '', (int)$link['id']]);
                            }
                        }
                    }
                }
                return true;
            }

            // TR kaydı: footer_settings (logo, slogan, copyright, sloganSvg)
            $stmt = $db->query('SELECT id FROM footer_settings LIMIT 1');
            if ($hasSvgCol) {
                $params = [$value['logo'] ?? '', $value['slogan'] ?? '', $value['copyright'] ?? '', $value['sloganSvg'] ?? null];
                if ($stmt->fetch()) {
                    $stmt = $db->prepare('UPDATE footer_settings SET logo_image=?, slogan=?, copyright_text=?, slogan_svg=? LIMIT 1');
                    $stmt->execute($params);
                } else {
                    $stmt = $db->prepare('INSERT INTO footer_settings (logo_image, slogan, copyright_text, slogan_svg) VALUES (?,?,?,?)');
                    $stmt->execute($params);
                }
            } else {
                $params = [$value['logo'] ?? '', $value['slogan'] ?? '', $value['copyright'] ?? ''];
                if ($stmt->fetch()) {
                    $stmt = $db->prepare('UPDATE footer_settings SET logo_image=?, slogan=?, copyright_text=? LIMIT 1');
                    $stmt->execute($params);
                } else {
                    $stmt = $db->prepare('INSERT INTO footer_settings (logo_image, slogan, copyright_text) VALUES (?,?,?)');
                    $stmt->execute($params);
                }
            }

            // TR: sütunları + linkleri tam senkronla (CRUD)
            $columns = $value['columns'] ?? [];

            // Gönderilen sütun ID'lerini topla, listede olmayan sütunları sil
            $sentColumnIds = array_filter(array_map(fn($c) => isset($c['id']) ? (int)$c['id'] : null, $columns));
            if (!empty($sentColumnIds)) {
                $placeholders = implode(',', array_fill(0, count($sentColumnIds), '?'));
                $stmt = $db->prepare("DELETE FROM footer_columns WHERE id NOT IN ($placeholders)");
                $stmt->execute(array_values($sentColumnIds));
            } else {
                $db->exec('DELETE FROM footer_columns');
            }

            // Sütunları upsert et + linkleri yönet
            foreach ($columns as $i => $column) {
                $sortOrder = $i + 1;
                $title = $column['title'] ?? '';
                $columnId = !empty($column['id']) ? (int)$column['id'] : null;

                if ($columnId) {
                    $stmt = $db->prepare('UPDATE footer_columns SET title=?, sort_order=?, is_active=1 WHERE id=?');
                    $stmt->execute([$title, $sortOrder, $columnId]);
                } else {
                    $stmt = $db->prepare('INSERT INTO footer_columns (title, sort_order, is_active) VALUES (?,?,1)');
                    $stmt->execute([$title, $sortOrder]);
                    $columnId = (int)$db->lastInsertId();
                }

                // Linkler: bu sütundaki, gönderilmemiş linkleri sil
                $links = $column['links'] ?? [];
                $sentLinkIds = array_values(array_filter(array_map(fn($l) => isset($l['id']) ? (int)$l['id'] : null, $links)));
                if (!empty($sentLinkIds)) {
                    $placeholders = implode(',', array_fill(0, count($sentLinkIds), '?'));
                    $stmt = $db->prepare("DELETE FROM footer_links WHERE column_id = ? AND id NOT IN ($placeholders)");
                    $stmt->execute(array_merge([$columnId], $sentLinkIds));
                } else {
                    $stmt = $db->prepare('DELETE FROM footer_links WHERE column_id = ?');
                    $stmt->execute([$columnId]);
                }

                foreach ($links as $j => $link) {
                    $linkSort = $j + 1;
                    $text = $link['text'] ?? '';
                    $url = $link['href'] ?? '';
                    $linkId = !empty($link['id']) ? (int)$link['id'] : null;
                    if ($linkId) {
                        $stmt = $db->prepare('UPDATE footer_links SET text=?, url=?, sort_order=?, is_active=1 WHERE id=?');
                        $stmt->execute([$text, $url, $linkSort, $linkId]);
                    } else {
                        $stmt = $db->prepare('INSERT INTO footer_links (column_id, text, url, sort_order, is_active) VALUES (?,?,?,?,1)');
                        $stmt->execute([$columnId, $text, $url, $linkSort]);
                    }
                }
            }

            // Sosyal medya (TR'de global)
            $social = $value['socialLinks'] ?? [];
            if (is_array($social)) {
                foreach ($social as $platform => $url) {
                    $platform = (string)$platform;
                    $url = (string)$url;
                    // Mevcut platformu kontrol et
                    $stmt = $db->prepare('SELECT id FROM social_media WHERE platform = ? LIMIT 1');
                    $stmt->execute([$platform]);
                    $existing = $stmt->fetch();
                    if ($existing) {
                        if ($url === '') {
                            $stmt = $db->prepare('DELETE FROM social_media WHERE id = ?');
                            $stmt->execute([(int)$existing['id']]);
                        } else {
                            $stmt = $db->prepare('UPDATE social_media SET url = ?, is_active = 1 WHERE id = ?');
                            $stmt->execute([$url, (int)$existing['id']]);
                        }
                    } elseif ($url !== '') {
                        $stmt = $db->prepare('INSERT INTO social_media (platform, url, is_active) VALUES (?, ?, 1)');
                        $stmt->execute([$platform, $url]);
                    }
                }
            }

            return true;

        case 'contact':
            if ($locale !== 'tr') {
                $stmt = $db->prepare("UPDATE contact_info SET address{$ls}=?, working_hours{$ls}=? LIMIT 1");
                return $stmt->execute([$value['address'] ?? '', $value['workingHours'] ?? '']);
            }
            // Instagram sütunlarının varlığını kontrol et, yoksa ekle
            $hasInstagramCols = false;
            try {
                $checkCol = $db->query("SHOW COLUMNS FROM contact_info LIKE 'instagram1'");
                $hasInstagramCols = $checkCol->rowCount() > 0;
            } catch (Exception $e) {}

            if (!$hasInstagramCols) {
                try {
                    $db->exec("ALTER TABLE contact_info
                        ADD COLUMN instagram1 VARCHAR(100) DEFAULT '@gozumunnuru.antalya' AFTER map_embed,
                        ADD COLUMN instagram1_url VARCHAR(255) DEFAULT 'https://www.instagram.com/gozumunnuru.antalya' AFTER instagram1,
                        ADD COLUMN instagram2 VARCHAR(100) DEFAULT '@hankuyumculuk_' AFTER instagram1_url,
                        ADD COLUMN instagram2_url VARCHAR(255) DEFAULT 'https://www.instagram.com/hankuyumculuk_' AFTER instagram2");
                    $hasInstagramCols = true;
                } catch (Exception $e) {
                    error_log('contact_info instagram columns migration failed: ' . $e->getMessage());
                }
            }

            $stmt = $db->query('SELECT id FROM contact_info LIMIT 1');
            $existing = $stmt->fetch();

            if ($hasInstagramCols) {
                $params = [
                    $value['address'] ?? '',
                    $value['phone'] ?? '',
                    $value['email'] ?? '',
                    $value['workingHours'] ?? '',
                    $value['mapEmbed'] ?? '',
                    $value['instagram1'] ?? '',
                    $value['instagram1Url'] ?? '',
                    $value['instagram2'] ?? '',
                    $value['instagram2Url'] ?? ''
                ];
                if ($existing) {
                    $stmt = $db->prepare('UPDATE contact_info SET address=?, phone=?, email=?, working_hours=?, map_embed=?, instagram1=?, instagram1_url=?, instagram2=?, instagram2_url=? LIMIT 1');
                    return $stmt->execute($params);
                }
                $stmt = $db->prepare('INSERT INTO contact_info (address, phone, email, working_hours, map_embed, instagram1, instagram1_url, instagram2, instagram2_url) VALUES (?,?,?,?,?,?,?,?,?)');
                return $stmt->execute($params);
            } else {
                $params = [
                    $value['address'] ?? '',
                    $value['phone'] ?? '',
                    $value['email'] ?? '',
                    $value['workingHours'] ?? '',
                    $value['mapEmbed'] ?? ''
                ];
                if ($existing) {
                    $stmt = $db->prepare('UPDATE contact_info SET address=?, phone=?, email=?, working_hours=?, map_embed=? LIMIT 1');
                    return $stmt->execute($params);
                }
                $stmt = $db->prepare('INSERT INTO contact_info (address, phone, email, working_hours, map_embed) VALUES (?,?,?,?,?)');
                return $stmt->execute($params);
            }

        case 'hero':
            if ($locale !== 'tr') {
                // Sadece çeviri alanlarını güncelle (slide silme/ekleme yapmadan)
                // button_link kolonunu dinamik olarak ekle
                try {
                    $checkLink = $db->query("SHOW COLUMNS FROM hero_slides LIKE 'button_link{$ls}'");
                    if ($checkLink->rowCount() === 0) {
                        $db->exec("ALTER TABLE hero_slides ADD COLUMN button_link{$ls} VARCHAR(500) DEFAULT NULL");
                    }
                } catch (Exception $e) {
                    error_log('hero_slides button_link migration error: ' . $e->getMessage());
                }
                $slides = $value['slides'] ?? [];
                foreach ($slides as $slide) {
                    $id = $slide['id'] ?? null;
                    if ($id) {
                        $title = $slide['title'] ?? '';
                        $subtitle = $slide['subtitle'] ?? '';
                        $buttonText = $slide['ctaText'] ?? $slide['buttonText'] ?? '';
                        $buttonLink = $slide['ctaLink'] ?? $slide['buttonLink'] ?? '';
                        $stmt = $db->prepare("UPDATE hero_slides SET title{$ls}=?, subtitle{$ls}=?, button_text{$ls}=?, button_link{$ls}=? WHERE id=?");
                        $stmt->execute([$title, $subtitle, $buttonText, $buttonLink, $id]);
                    }
                }
                return true;
            }
            // TR kayıt (mevcut davranış)
            try {
                $checkCol = $db->query("SHOW COLUMNS FROM hero_slides LIKE 'image_position'");
                if ($checkCol->rowCount() === 0) {
                    $db->exec("ALTER TABLE hero_slides
                        ADD COLUMN image_position VARCHAR(50) DEFAULT '50% 50%' AFTER sort_order,
                        ADD COLUMN image_scale DECIMAL(3,2) DEFAULT 1.00 AFTER image_position");
                }
            } catch (Exception $e) {
                error_log('hero_slides migration error: ' . $e->getMessage());
            }

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
                $imagePosition = $slide['imagePosition'] ?? '50% 50%';
                $imageScale = (float)($slide['imageScale'] ?? 1);

                if ($id) {
                    $stmt = $db->prepare('UPDATE hero_slides SET background_media=?, media_type=?, title=?, subtitle=?, button_text=?, button_link=?, sort_order=?, image_position=?, image_scale=? WHERE id=?');
                    $stmt->execute([$backgroundMedia, $mediaType, $title, $subtitle, $buttonText, $buttonLink, $sortOrder, $imagePosition, $imageScale, $id]);
                } else {
                    $stmt = $db->prepare('INSERT INTO hero_slides (background_media, media_type, title, subtitle, button_text, button_link, sort_order, image_position, image_scale, is_active) VALUES (?,?,?,?,?,?,?,?,?,1)');
                    $stmt->execute([$backgroundMedia, $mediaType, $title, $subtitle, $buttonText, $buttonLink, $sortOrder, $imagePosition, $imageScale]);
                }
            }
            return true;

        case 'featured_products':
        case 'yuzuk_category':
            // Bunlar kendi tabloları (featured_products / categories) üzerinden yönetilir,
            // general_settings'e yazılmamalı.
            return true;

        case 'koleksiyon_sayfasi':
            if ($locale !== 'tr') {
                $localeData = json_encode([
                    'title' => $value['title'] ?? '',
                    'description' => $value['description'] ?? '',
                ], JSON_UNESCAPED_UNICODE);
                $stmt = $db->prepare('INSERT INTO general_settings (setting_key, setting_value, setting_type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)');
                return $stmt->execute(['koleksiyon_sayfasi_' . $locale, $localeData, 'json']);
            }
            $storedValue = json_encode($value, JSON_UNESCAPED_UNICODE);
            $stmt = $db->prepare('INSERT INTO general_settings (setting_key, setting_value, setting_type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)');
            return $stmt->execute(['koleksiyon_sayfasi', $storedValue, 'json']);

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
        case 'erkek_kol_category':
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
