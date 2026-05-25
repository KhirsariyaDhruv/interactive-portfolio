<?php
session_start();
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
            // Success
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $user['id'];
            echo json_encode(["success" => true, "message" => "Login successful"]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid credentials"]);
        }
    } 
    else if ($action === 'logout') {
        session_destroy();
        echo json_encode(["success" => true, "message" => "Logged out"]);
    }
    else if ($action === 'check') {
        if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
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
