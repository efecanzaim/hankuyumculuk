<?php
/**
 * Kategori-Ürün İlişkisi API
 * GET: Kategorideki ürünleri getir
 * POST: Kategoriye ürün ekle/çıkar
 */

require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        // Kategorideki ürünleri getir
        $categoryId = $_GET['category_id'] ?? null;
        
        if (!$categoryId) {
            jsonResponse(['error' => 'category_id gerekli'], 400);
            exit;
        }
        
        $stmt = $db->prepare('
            SELECT cp.*, p.name, p.subtitle, p.main_image, p.slug
            FROM category_products cp
            INNER JOIN products p ON cp.product_id = p.id
            WHERE cp.category_id = ? AND cp.is_active = 1
            ORDER BY cp.sort_order ASC, p.name ASC
        ');
        $stmt->execute([$categoryId]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        jsonResponse($products);
        break;
        
    case 'POST':
        // Auth gerekli
        requireAuth();
        
        // Kategoriye ürün ekle/çıkar
        $data = getJsonBody();
        $categoryId = $data['category_id'] ?? null;
        $productIds = $data['product_ids'] ?? [];
        
        if (!$categoryId) {
            jsonResponse(['error' => 'category_id gerekli'], 400);
            exit;
        }
        
        if (!is_array($productIds)) {
            jsonResponse(['error' => 'product_ids array olmalı'], 400);
            exit;
        }
        
        try {
            $db->beginTransaction();
            
            // Mevcut ilişkileri sil
            $stmt = $db->prepare('DELETE FROM category_products WHERE category_id = ?');
            $stmt->execute([$categoryId]);
            
            // Yeni ilişkileri ekle
            if (!empty($productIds)) {
                $stmt = $db->prepare('
                    INSERT INTO category_products (category_id, product_id, sort_order, is_active)
                    VALUES (?, ?, ?, 1)
                ');
                
                foreach ($productIds as $index => $productId) {
                    $stmt->execute([$categoryId, $productId, $index]);
                }
            }
            
            $db->commit();
            jsonResponse(['success' => true, 'message' => 'Ürünler kaydedildi']);
        } catch (Exception $e) {
            $db->rollBack();
            jsonResponse(['error' => 'Kayıt hatası: ' . $e->getMessage()], 500);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
        break;
}

