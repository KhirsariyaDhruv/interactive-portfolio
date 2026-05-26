<?php
// api/db_connect.php

$is_localhost = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', '[::1]']);

if ($is_localhost) {
    $host = 'localhost';
    $db_name = 'portfolio_db';
    $username = 'root'; // Default XAMPP username
    $password = '';     // Default XAMPP password (empty)
} else {
    // Live Server Credentials - Reads from Environment Variables (Vercel / Render)
    // or falls back to your manual config if environment variables are not set.
    $host = getenv('DB_HOST') ?: 'YOUR_DB_HOSTNAME';
    $db_name = getenv('DB_NAME') ?: 'YOUR_DB_NAME';
    $username = getenv('DB_USER') ?: 'YOUR_DB_USERNAME';
    $password = getenv('DB_PASS') ?: 'YOUR_DB_PASSWORD';
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password);
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
?>
