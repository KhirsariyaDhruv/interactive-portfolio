<?php
// api/db_connect.php

$host = 'localhost';
$db_name = 'portfolio_db';
$username = 'root'; // Change if your phpMyAdmin uses a different username
$password = ''; // Change if your phpMyAdmin has a password

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
