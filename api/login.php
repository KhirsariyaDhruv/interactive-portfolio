<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Determine action: login, logout, check
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Fallback for form data
    if (!$data) {
        $data = $_POST;
    }

    $action = $data['action'] ?? '';

    if ($action === 'login') {
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($username) || empty($password)) {
            echo json_encode(["success" => false, "message" => "Username and password required"]);
            exit;
        }

        $stmt = $conn->prepare("SELECT id, password_hash FROM admin_users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            // Success - Create token and set cookie
            $secret = getenv('JWT_SECRET') ?: 'some_default_secure_secret_key_123';
            $expiry = time() + 86400 * 7; // 7 days
            $signature = hash_hmac('sha256', $username . '|' . $expiry, $secret);
            $token = base64_encode(json_encode([
                'username' => $username,
                'expiry' => $expiry,
                'signature' => $signature
            ]));
            
            $is_localhost = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', '[::1]']);
            setcookie('admin_token', $token, [
                'expires' => $expiry,
                'path' => '/',
                'secure' => !$is_localhost,
                'httponly' => true,
                'samesite' => 'Lax'
            ]);
            
            echo json_encode(["success" => true, "message" => "Login successful"]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid credentials"]);
        }
    } 
    else if ($action === 'logout') {
        $is_localhost = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', '[::1]']);
        setcookie('admin_token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'secure' => !$is_localhost,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        echo json_encode(["success" => true, "message" => "Logged out"]);
    }
    else if ($action === 'check') {
        if (isAuthenticated()) {
            echo json_encode(["success" => true, "message" => "Authenticated"]);
        } else {
            echo json_encode(["success" => false, "message" => "Not authenticated"]);
        }
    }
    else {
        echo json_encode(["success" => false, "message" => "Invalid action"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
