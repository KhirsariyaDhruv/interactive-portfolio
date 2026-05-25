<?php
session_start();
require_once 'db_connect.php';

header('Content-Type: application/json');

function isAuthenticated() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Anyone can read certificates
    $stmt = $conn->query("SELECT * FROM certificates ORDER BY id DESC");
    $certs = $stmt->fetchAll();
    echo json_encode(["success" => true, "data" => $certs]);
    exit;
}

// All other methods require authentication
if (!isAuthenticated()) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if ($method === 'POST') {
    // We are uploading a file, so we check $_FILES and $_POST
    $title = $_POST['title'] ?? '';
    
    if (empty($title)) {
        echo json_encode(["success" => false, "message" => "Title is required"]);
        exit;
    }

    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(["success" => false, "message" => "Image upload failed"]);
        exit;
    }

    $uploadDir = '../certficats/'; // Note the spelling matches existing structure
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filename = basename($_FILES['image']['name']);
    // Basic sanitize
    $filename = preg_replace("/[^a-zA-Z0-9.\-_]/", "", $filename);
    $filename = time() . '_' . $filename;
    
    $targetPath = $uploadDir . $filename;
    
    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
        // Save relative path for database
        $dbPath = 'certficats/' . $filename;
        
        $stmt = $conn->prepare("INSERT INTO certificates (title, image_path) VALUES (:title, :image_path)");
        $success = $stmt->execute([
            'title' => $title,
            'image_path' => $dbPath
        ]);
        
        if ($success) {
            echo json_encode(["success" => true, "message" => "Certificate added", "id" => $conn->lastInsertId()]);
        } else {
            echo json_encode(["success" => false, "message" => "Database error"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Failed to move uploaded file"]);
    }
}
elseif ($method === 'DELETE') {
    // Delete certificate
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? 0;
    
    if (!$id) {
        echo json_encode(["success" => false, "message" => "ID required"]);
        exit;
    }
    
    // First get the image path to delete the file
    $stmt = $conn->prepare("SELECT image_path FROM certificates WHERE id=:id");
    $stmt->execute(['id' => $id]);
    $cert = $stmt->fetch();
    
    if ($cert) {
        $file = '../' . $cert['image_path'];
        if (file_exists($file)) {
            unlink($file); // Delete physical file
        }
        
        // Delete DB record
        $delStmt = $conn->prepare("DELETE FROM certificates WHERE id=:id");
        $success = $delStmt->execute(['id' => $id]);
        
        echo json_encode(["success" => $success, "message" => $success ? "Deleted" : "Failed to delete DB record"]);
    } else {
        echo json_encode(["success" => false, "message" => "Certificate not found"]);
    }
}
?>
