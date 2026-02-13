<?php
// getProfile.php
require 'config.php';
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 🔹 Ensure Authorization header is available (some servers strip it)
if (!isset($_SERVER['HTTP_AUTHORIZATION']) && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $_SERVER['HTTP_AUTHORIZATION'] = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
}

// Get JWT from Authorization header
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Token required"]);
    exit;
}
$jwt = $matches[1];

try {
    // 🔹 Use the same secret as login.php
    $secret_key = "your-secret-key"; // move to config.php if needed
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    $admin_id = $decoded->data->id ?? null;

    if (!$admin_id) throw new Exception("Invalid token");

    // 🔹 Fetch admin info
    $stmt = $conn->prepare("SELECT id, name, email, role, permissions, profile_image FROM admins WHERE id=? LIMIT 1");
    $stmt->bind_param("i", $admin_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Admin not found"]);
        exit;
    }

    $admin = $result->fetch_assoc();
    $permissions = !empty($admin['permissions']) ? json_decode($admin['permissions'], true) : [];

    echo json_encode([
        "success" => true,
        "admin" => [
            "id" => $admin['id'],
            "name" => $admin['name'],
            "email" => $admin['email'],
            "role" => $admin['role'],
            "permissions" => $permissions
        ]
    ]);

} catch (\Firebase\JWT\ExpiredException $e) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Token expired"]);
} catch (\Exception $e) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid token: " . $e->getMessage()]);
}
