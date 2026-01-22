<?php
/**
 * Han Kuyumculuk - Authentication API
 * Admin paneli için oturum yönetimi
 */

require_once 'config.php';

// Session başlat (sadece henüz başlamamışsa)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Oturum süresi (saniye) - 24 saat
define('SESSION_TIMEOUT', 86400);

/**
 * Oturum kontrolü
 */
function checkAuth() {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        return false;
    }

    // Oturum süresi kontrolü
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > SESSION_TIMEOUT)) {
        session_unset();
        session_destroy();
        return false;
    }

    // Son aktivite zamanını güncelle
    $_SESSION['last_activity'] = time();
    return true;
}

/**
 * Auth middleware - Diğer API'ler bu fonksiyonu çağıracak
 */
function requireAuth() {
    if (!checkAuth()) {
        jsonResponse(['error' => 'Oturum geçersiz veya süresi dolmuş', 'code' => 'UNAUTHORIZED'], 401);
    }
}

// Sadece doğrudan auth.php'ye istek atıldığında çalış
// Diğer dosyalar require_once ile dahil ettiğinde çalışmaz
if (basename($_SERVER['SCRIPT_FILENAME']) === 'auth.php') {
    
    // Request method'a göre işlem yap
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            // Login işlemi
            $data = getJsonBody();
            $username = $data['username'] ?? '';
            $password = $data['password'] ?? '';

            if (empty($username) || empty($password)) {
                jsonResponse(['error' => 'Kullanıcı adı ve şifre gerekli'], 400);
            }

            $db = getDB();

            // Kullanıcıyı veritabanından çek
            $stmt = $db->prepare('SELECT * FROM admin_users WHERE username = ? AND is_active = 1');
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if (!$user) {
                // Brute force koruması için gecikme
                sleep(1);
                jsonResponse(['error' => 'Kullanıcı adı veya şifre hatalı'], 401);
            }

            // Şifre kontrolü
            if (!password_verify($password, $user['password_hash'])) {
                sleep(1);
                jsonResponse(['error' => 'Kullanıcı adı veya şifre hatalı'], 401);
            }

            // Son giriş zamanını güncelle
            $stmt = $db->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?');
            $stmt->execute([$user['id']]);

            // Başarılı giriş
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['admin_full_name'] = $user['full_name'];
            $_SESSION['last_activity'] = time();
            $_SESSION['login_time'] = time();

            // Session token oluştur (JavaScript'te kullanılacak)
            $token = bin2hex(random_bytes(32));
            $_SESSION['csrf_token'] = $token;

            jsonResponse([
                'success' => true,
                'message' => 'Giriş başarılı',
                'user' => [
                    'id' => (int)$user['id'],
                    'username' => $user['username'],
                    'fullName' => $user['full_name'],
                    'email' => $user['email']
                ],
                'token' => $token
            ]);
            break;

        case 'GET':
            // Oturum durumu kontrolü
            if (checkAuth()) {
                $db = getDB();
                $stmt = $db->prepare('SELECT id, username, full_name, email FROM admin_users WHERE id = ?');
                $stmt->execute([$_SESSION['admin_user_id'] ?? 0]);
                $user = $stmt->fetch();

                jsonResponse([
                    'authenticated' => true,
                    'user' => $user ? [
                        'id' => (int)$user['id'],
                        'username' => $user['username'],
                        'fullName' => $user['full_name'],
                        'email' => $user['email']
                    ] : null,
                    'token' => $_SESSION['csrf_token'] ?? ''
                ]);
            } else {
                jsonResponse(['authenticated' => false], 200);
            }
            break;

        case 'DELETE':
            // Logout işlemi
            session_unset();
            session_destroy();
            jsonResponse(['success' => true, 'message' => 'Çıkış yapıldı']);
            break;

        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }
}
?>
