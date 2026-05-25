<?php
// api/track_visitor.php
require_once 'db_connect.php';

// Check if we want to retrieve logs (admin only) or insert a log (public)
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch logs (requires auth)
    session_start();
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Unauthorized"]);
        exit;
    }
    
    // Limit to last 100 for performance
    $stmt = $conn->query("SELECT * FROM visitor_logs ORDER BY visit_time DESC LIMIT 100");
    $logs = $stmt->fetchAll();
    
    echo json_encode(["success" => true, "data" => $logs]);
    exit;
} 
elseif ($method === 'POST') {
    // Log a new visitor
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Get IP address reliably
    $ip = $_SERVER['REMOTE_ADDR'];
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    $pageUrl = $data['url'] ?? 'Unknown';
    $terminalName = $data['terminal_name'] ?? null;
    $terminalClearance = $data['terminal_clearance'] ?? null;
    
    $stmt = $conn->prepare("INSERT INTO visitor_logs (ip_address, user_agent, page_url, terminal_name, terminal_clearance) VALUES (:ip, :ua, :url, :tname, :tclearance)");
    $success = $stmt->execute([
        'ip' => $ip,
        'ua' => $userAgent,
        'url' => $pageUrl,
        'tname' => $terminalName,
        'tclearance' => $terminalClearance
    ]);
    
    // Don't send back errors for tracking pixel to avoid exposing backend
    echo json_encode(["success" => true]);
}
?>
