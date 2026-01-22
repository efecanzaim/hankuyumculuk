<?php
/**
 * Han Kuyumculuk - Veritabanı Yapılandırması
 * Bu dosyayı hosting'e yükledikten sonra bilgileri güncelleyin
 */

// Session ayarları (CORS için gerekli)
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', 'true');

// CORS ayarları (Admin panelinin erişimi için)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

// OPTIONS request için (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Veritabanı bilgileri
define('DB_HOST', 'localhost');
define('DB_USER', 'u2526296_admin');
define('DB_PASS', 'Clkg5y8NyQFlvT1U');
define('DB_NAME', 'u2526296_hankuyumculuk');

// Veritabanı bağlantısı
function getDB() {
    static $conn = null;
    
    if ($conn === null) {
        try {
            $conn = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Veritabanı bağlantı hatası: ' . $e->getMessage()]);
            exit();
        }
    }
    
    return $conn;
}

// JSON response helper
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// JSON body okuma - Raw input'u önbelleğe al
function getJsonBody() {
    static $cached = null;
    static $decoded = null;
    
    if ($cached === null) {
        $cached = file_get_contents('php://input');
        error_log('getJsonBody - Raw input: ' . substr($cached, 0, 1000));
        $decoded = json_decode($cached, true);
        
        // JSON decode hatası kontrolü
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log('JSON decode error: ' . json_last_error_msg() . ' - Input: ' . substr($cached, 0, 500));
            $decoded = [];
        }
    }
    
    return $decoded ?? [];
}

// Raw input'u almak için helper
function getRawInput() {
    static $cached = null;
    if ($cached === null) {
        $cached = file_get_contents('php://input');
    }
    return $cached;
}
?>

