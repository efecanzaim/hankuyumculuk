<?php
/**
 * Görsel Yükleme API
 * POST: Görsel yükle
 */

require_once 'config.php';
require_once 'auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Sadece POST metodu kabul edilir'], 405);
}

// Auth gerekli
requireAuth();

// Dosya kontrolü
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'Dosya boyutu php.ini limitini aşıyor',
        UPLOAD_ERR_FORM_SIZE => 'Dosya boyutu form limitini aşıyor',
        UPLOAD_ERR_PARTIAL => 'Dosya kısmen yüklendi',
        UPLOAD_ERR_NO_FILE => 'Dosya yüklenmedi',
        UPLOAD_ERR_NO_TMP_DIR => 'Geçici klasör bulunamadı',
        UPLOAD_ERR_CANT_WRITE => 'Dosya yazılamadı',
        UPLOAD_ERR_EXTENSION => 'Uzantı hatası'
    ];
    
    $error = $_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE;
    $message = $errorMessages[$error] ?? 'Bilinmeyen hata';
    
    jsonResponse(['error' => $message], 400);
}

$file = $_FILES['file'];
$folder = $_POST['folder'] ?? 'uploads';

// İzin verilen dosya türleri
$allowedTypes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/gif' => 'gif',
    'image/webp' => 'webp',
    'video/mp4' => 'mp4'
];

// Dosya türü kontrolü
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!isset($allowedTypes[$mimeType])) {
    jsonResponse(['error' => 'Geçersiz dosya türü. Sadece JPG, PNG, GIF, WebP ve MP4 kabul edilir.'], 400);
}

// Dosya boyutu kontrolü (max 10MB)
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    jsonResponse(['error' => 'Dosya boyutu 10MB\'dan büyük olamaz.'], 400);
}

// Yükleme klasörünü oluştur
// __DIR__ = api/ klasörü, ../images/ = kök dizindeki images/ klasörü
// (Next.js static export'ta görseller doğrudan /images/ klasöründe)
$uploadDir = __DIR__ . '/../images/' . $folder;

// Klasör yoksa oluştur
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        jsonResponse([
            'error' => "Klasör oluşturulamadı: {$uploadDir}",
            'uploadDir' => $uploadDir,
            'parentDir' => dirname($uploadDir),
            'parentWritable' => is_writable(dirname($uploadDir))
        ], 500);
    }
}

// Klasör yazılabilir mi kontrol et
if (!is_writable($uploadDir)) {
    jsonResponse([
        'error' => "Klasör yazılabilir değil: {$uploadDir}. Lütfen klasör izinlerini kontrol edin (chmod 755 veya 775).",
        'uploadDir' => $uploadDir,
        'permissions' => substr(sprintf('%o', fileperms($uploadDir)), -4)
    ], 500);
}

// Benzersiz dosya adı oluştur
$extension = $allowedTypes[$mimeType];
$timestamp = time();
$randomString = bin2hex(random_bytes(4));
$originalName = pathinfo($file['name'], PATHINFO_FILENAME);
$safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $originalName);
$fileName = "{$timestamp}_{$randomString}_{$safeName}.{$extension}";
$filePath = $uploadDir . '/' . $fileName;

// Dosyayı taşı
if (move_uploaded_file($file['tmp_name'], $filePath)) {
    // Dosya izinlerini ayarla (okunabilir olması için)
    chmod($filePath, 0644);
    
    // Public URL (Next.js public klasörü root'tan erişilebilir)
    $publicUrl = "/images/{$folder}/{$fileName}";
    
    jsonResponse([
        'success' => true,
        'url' => $publicUrl,
        'fileName' => $fileName,
        'originalName' => $file['name'],
        'size' => $file['size'],
        'type' => $mimeType,
        'path' => $filePath // Debug için
    ]);
} else {
    // Detaylı hata mesajı
    $errorMsg = 'Dosya kaydedilemedi';
    if (!is_writable($uploadDir)) {
        $errorMsg = "Klasör yazılabilir değil: {$uploadDir}. Lütfen klasör izinlerini kontrol edin (chmod 755 veya 775).";
    } elseif (!file_exists($uploadDir)) {
        $errorMsg = "Klasör oluşturulamadı: {$uploadDir}";
    }
    
    jsonResponse([
        'error' => $errorMsg,
        'uploadDir' => $uploadDir,
        'filePath' => $filePath,
        'isWritable' => is_writable($uploadDir),
        'dirExists' => is_dir($uploadDir)
    ], 500);
}
?>

