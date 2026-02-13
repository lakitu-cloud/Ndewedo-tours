<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

$input = json_decode(file_get_contents("php://input"), true);
$id = (int)($input['id'] ?? 0);

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID required"]);
    exit;
}

$stmt = $conn->prepare("UPDATE contact_messages SET status = 'read' WHERE id = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => $conn->error]);
    $conn->close();
    exit;
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Marked as read"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
