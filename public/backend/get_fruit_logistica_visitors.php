<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
    exit;
}

require 'config.php';

// Fetch all visitors ordered by newest first, now including meeting fields
$sql = "SELECT 
            id, name, email, company, phone, interest, message, event, status,
            want_meeting, meeting_timing, preferred_day, follow_up_method, follow_up_timing,
            replied_by, admin_reply, created_at
        FROM fruit_logistica_visitors
        ORDER BY created_at DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $conn->error
    ]);
    $conn->close();
    exit;
}

$visitors = [];
while ($row = $result->fetch_assoc()) {
    // Convert want_meeting from 0/1 to boolean for convenience
    $row['want_meeting'] = (bool)$row['want_meeting'];
    $visitors[] = $row;
}

echo json_encode([
    "success" => true,
    "visitors" => $visitors
]);

$conn->close();
?>
