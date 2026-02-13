<?php
// -----------------------------
// 1️⃣ Database configuration (remote server)
// -----------------------------
$host = "sdb-86.hosting.stackcp.net";
$port = 3306; // default MySQL port, change if your hosting specifies another
$user = "david-45ab";
$pass = "ndewdo123*P"; // your actual DB password
$db   = "ndewedo-353130304733";

// Force mysqli to connect over TCP
$conn = @new mysqli($host, $user, $pass, $db, $port);
if ($conn->connect_error) {
    header("Content-Type: application/json");
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}
$conn->set_charset("utf8mb4");

// -----------------------------
// 2️⃣ Load .env variables for SMTP / emails / JWT secret
// -----------------------------
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
} else {
    header("Content-Type: application/json");
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => ".env file not found!"
    ]);
    exit;
}