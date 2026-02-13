<?php
// auth.php – simple reusable token-based access control (reads .env directly)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(["success" => true]));
}

// -----------------------------
// Load .env file
// -----------------------------
$envFile = __DIR__ . '/.env';
$env = [];
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (trim($line) === '' || str_starts_with(trim($line), '#')) continue;
        [$key, $value] = explode('=', $line, 2);
        $env[trim($key)] = trim($value);
    }
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => ".env file not found!"
    ]);
    exit;
}

// -----------------------------
// Get Authorization header
// -----------------------------
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

// Check if token exists and matches Bearer pattern
if (!$authHeader || !preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized: Missing or invalid token"
    ]);
    exit;
}

$token = $matches[1];

// -----------------------------
// Validate token from .env
// -----------------------------
$expectedToken = $env['API_SECRET_TOKEN'] ?? "supersecrettoken123";

if ($token !== $expectedToken) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized: Invalid token"
    ]);
    exit;
}


