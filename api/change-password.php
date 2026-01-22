<?php
/**
 * Han Kuyumculuk - Şifre Değiştirme API
 */

require_once 'config.php';
require_once 'auth.php';

// Sadece giriş yapmış kullanıcılar şifre değiştirebilir
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$data = getJsonBody();
$currentPassword = $data['currentPassword'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (empty($currentPassword) || empty($newPassword)) {
    jsonResponse(['error' => 'Mevcut şifre ve yeni şifre gerekli'], 400);
}

if (strlen($newPassword) < 8) {
    jsonResponse(['error' => 'Yeni şifre en az 8 karakter olmalı'], 400);
}

// Mevcut şifreyi kontrol et
$db = getDB();
$stmt = $db->prepare("SELECT setting_value FROM site_settings WHERE setting_key = 'admin_password_hash'");
$stmt->execute();
$result = $stmt->fetch();

$storedHash = $result ? json_decode($result['setting_value'], true) : null;

// Varsayılan şifre kontrolü
if (!$storedHash && $currentPassword === 'hankuyumculuk2024') {
    // İlk kez şifre değiştiriliyor
} elseif (!$storedHash || !password_verify($currentPassword, $storedHash)) {
    jsonResponse(['error' => 'Mevcut şifre hatalı'], 401);
}

// Yeni şifreyi kaydet
$newHash = password_hash($newPassword, PASSWORD_DEFAULT);
$hashJson = json_encode($newHash);

$stmt = $db->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES ('admin_password_hash', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
$stmt->execute([$hashJson, $hashJson]);

jsonResponse(['success' => true, 'message' => 'Şifre başarıyla değiştirildi']);
?>
