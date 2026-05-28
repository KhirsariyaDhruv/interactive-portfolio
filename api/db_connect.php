<?php
// api/db_connect.php

$is_localhost = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', '[::1]']);

if ($is_localhost) {
    $host = 'localhost';
    $db_name = 'portfolio_db';
    $username = 'root'; // Default XAMPP username
    $password = '';     // Default XAMPP password (empty)
    $port = '3306';
    $options = [];
} else {
    // Live Server Credentials - Reads from Environment Variables (Vercel / Render)
    // or falls back to your manual config if environment variables are not set.
    $host = getenv('DB_HOST') ?: 'YOUR_DB_HOSTNAME';
    $db_name = getenv('DB_NAME') ?: 'YOUR_DB_NAME';
    $username = getenv('DB_USER') ?: 'YOUR_DB_USERNAME';
    $password = getenv('DB_PASS') ?: 'YOUR_DB_PASSWORD';
    $port = getenv('DB_PORT') ?: '3306';
    $options = [
        1014 => false // 1014 is PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT
    ];
}

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$db_name;charset=utf8mb4", $username, $password, $options);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // In production, log this error rather than displaying it
    die(json_encode([
        "status" => "error", 
        "message" => "Database Connection Failed: " . $e->getMessage()
    ]));
}

function isAuthenticated() {
    $token = $_COOKIE['admin_token'] ?? '';
    if (empty($token)) {
        return false;
    }
    $decoded = json_decode(base64_decode($token), true);
    if (!$decoded || !isset($decoded['username']) || !isset($decoded['expiry']) || !isset($decoded['signature'])) {
        return false;
    }
    if (time() > $decoded['expiry']) {
        return false;
    }
    $secret = getenv('JWT_SECRET') ?: 'some_default_secure_secret_key_123';
    $expectedSignature = hash_hmac('sha256', $decoded['username'] . '|' . $decoded['expiry'], $secret);
    
    return hash_equals($expectedSignature, $decoded['signature']);
}
?>
