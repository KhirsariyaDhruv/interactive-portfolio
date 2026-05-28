<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        // Anyone can read projects
        $stmt = $conn->query("SELECT * FROM projects ORDER BY id DESC");
        $projects = $stmt->fetchAll();
        echo json_encode(["success" => true, "data" => $projects]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database query failed: " . $e->getMessage()]);
    }
    exit;
}

// All other methods require authentication
if (!isAuthenticated()) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if ($method === 'POST') {
    // Create new project
    $data = json_decode(file_get_contents('php://input'), true);
    
    $title = $data['title'] ?? '';
    $version = $data['version'] ?? 'v1.0.0';
    $status = $data['status'] ?? 'STATUS: ACTIVE';
    $description = $data['description'] ?? '';
    $tags = $data['tags'] ?? '';
    $folder_link = $data['folder_link'] ?? '#';
    $code_link = $data['code_link'] ?? '#';
    $live_link = $data['live_link'] ?? '#';

    if (empty($title) || empty($description)) {
        echo json_encode(["success" => false, "message" => "Title and description are required"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO projects (title, version, status, description, tags, folder_link, code_link, live_link) VALUES (:title, :version, :status, :description, :tags, :folder, :code, :live)");
    
    $success = $stmt->execute([
        'title' => $title,
        'version' => $version,
        'status' => $status,
        'description' => $description,
        'tags' => $tags,
        'folder' => $folder_link,
        'code' => $code_link,
        'live' => $live_link
    ]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Project created", "id" => $conn->lastInsertId()]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to create project"]);
    }
}
elseif ($method === 'PUT') {
    // Edit project
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? 0;
    
    if (!$id) {
        echo json_encode(["success" => false, "message" => "Project ID required"]);
        exit;
    }

    $title = $data['title'] ?? '';
    $version = $data['version'] ?? 'v1.0.0';
    $status = $data['status'] ?? 'STATUS: ACTIVE';
    $description = $data['description'] ?? '';
    $tags = $data['tags'] ?? '';
    $folder_link = $data['folder_link'] ?? '#';
    $code_link = $data['code_link'] ?? '#';
    $live_link = $data['live_link'] ?? '#';

    $stmt = $conn->prepare("UPDATE projects SET title=:title, version=:version, status=:status, description=:description, tags=:tags, folder_link=:folder, code_link=:code, live_link=:live WHERE id=:id");
    
    $success = $stmt->execute([
        'id' => $id,
        'title' => $title,
        'version' => $version,
        'status' => $status,
        'description' => $description,
        'tags' => $tags,
        'folder' => $folder_link,
        'code' => $code_link,
        'live' => $live_link
    ]);

    echo json_encode(["success" => $success, "message" => $success ? "Project updated" : "Failed to update"]);
}
elseif ($method === 'DELETE') {
    // Delete project
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? 0;
    
    if (!$id) {
        echo json_encode(["success" => false, "message" => "Project ID required"]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM projects WHERE id=:id");
    $success = $stmt->execute(['id' => $id]);
    
    echo json_encode(["success" => $success, "message" => $success ? "Project deleted" : "Failed to delete"]);
}
?>
