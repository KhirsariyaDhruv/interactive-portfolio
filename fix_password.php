<?php
try {
    $conn = new PDO('mysql:host=localhost;dbname=portfolio_db', 'root', '');
    $hash = password_hash('password123', PASSWORD_DEFAULT);
    $conn->query("UPDATE admin_users SET password_hash='$hash' WHERE username='dhruv'");
    echo "Password updated!";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
