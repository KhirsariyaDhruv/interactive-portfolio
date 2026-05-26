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
    $title = $_POST['title'] ?? '';
    $imagePath = $_POST['image_path'] ?? '';
    
    if (empty($title)) {
        echo json_encode(["success" => false, "message" => "Title is required"]);
        exit;
    }

    // Check if we are doing a manual image path insertion (e.g. for Vercel/serverless)
    if (!empty($imagePath)) {
        // Just save the specified path directly to the database
        $stmt = $conn->prepare("INSERT INTO certificates (title, image_path) VALUES (:title, :image_path)");
        $success = $stmt->execute([
            'title' => $title,
            'image_path' => $imagePath
        ]);
        
        if ($success) {
            echo json_encode(["success" => true, "message" => "Certificate saved successfully (Path registered)", "id" => $conn->lastInsertId()]);
        } else {
            echo json_encode(["success" => false, "message" => "Database error"]);
        }
        exit;
    }

    // Otherwise, perform the traditional file upload
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(["success" => false, "message" => "Image upload failed. Please upload a file or enter an image path."]);
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
        echo json_encode(["success" => false, "message" => "Failed to move uploaded file. Is the folder writable?"]);
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
