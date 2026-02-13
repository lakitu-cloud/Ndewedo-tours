<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

$input = json_decode(file_get_contents("php://input"), true);
$ids = $input['subscriber_ids'] ?? [];

if (empty($ids)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No subscriber IDs provided"]);
    exit;
}

$placeholders = implode(',', array_fill(0, count($ids), '?'));
$stmt = $conn->prepare("DELETE FROM newsletter_subscribers WHERE id IN ($placeholders)");

$types = str_repeat('i', count($ids));
$stmt->bind_param($types, ...$ids);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Subscribers deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete subscribers"]);
}

$stmt->close();
$conn->close();
