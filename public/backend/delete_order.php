<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$order_id = isset($data['id']) ? (int)$data['id'] : 0;
if ($order_id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing or invalid order id"]);
    exit;
}

$sql = "DELETE FROM buyer_orders WHERE id=$order_id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Order deleted"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>
