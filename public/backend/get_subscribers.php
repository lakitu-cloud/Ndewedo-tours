<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

// Fetch all subscribers
$sql = "SELECT id, name, email, unsubscribed, created_at, unsubscribed_at FROM newsletter_subscribers ORDER BY created_at DESC";
$result = $conn->query($sql);

$subscribers = [];
while ($row = $result->fetch_assoc()) {
    $subscribers[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $subscribers
]);

$conn->close();
