<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

// Fetch all contacts ordered by newest first
$sql = "SELECT 
            id, name, email, subject, message, created_at AS date, status, priority, admin_reply
        FROM contact_messages
        ORDER BY created_at DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database query error: " . $conn->error
    ]);
    $conn->close();
    exit;
}

$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

echo json_encode([
    "success" => true,
    "contacts" => $contacts
]);

$conn->close();
