<?php
// login.php

require 'config.php';          // database connection
require 'vendor/autoload.php'; // composer autoload (for JWT)

use Firebase\JWT\JWT;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read POSTed JSON
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email/Name and password required"]);
    exit;
}

$identifier = $conn->real_escape_string($data['email']); // can be email OR name
$password   = $data['password'];

// 🔹 Simulated login (for demo/testing only)
if (($identifier === 'admin@kostivinvestment.co.tz' || $identifier === 'Admin Demo') && $password === 'admin123') {
    $payload = [
        "iss" => "https://kostivinvestment.co.tz",
        "aud" => "https://kostivinvestment.co.tz",
        "iat" => time(),
        "exp" => time() + (60 * 60), // 1 hour expiry
        "data" => [
            "id"    => 1,
            "email" => "admin@kostivinvestment.co.tz",
            "name"  => "Admin Demo",
            "role"  => "super_admin"
        ]
    ];

    $secret_key = "your-secret-key"; // ⚠️ move to config.php
    $jwt = JWT::encode($payload, $secret_key, 'HS256');

    echo json_encode([
        "success" => true,
        "message" => "Login successful (simulated)",
        "token"   => $jwt
    ]);
    exit;
}

// 🔹 Check real database login (by email OR name)
$stmt = $conn->prepare("SELECT id, name, email, password, role, permissions 
                        FROM admins 
                        WHERE email=? OR name=? LIMIT 1");
$stmt->bind_param("ss", $identifier, $identifier);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

$admin = $result->fetch_assoc();

// 🔹 Verify password
if (!password_verify($password, $admin['password'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// ✅ Update last_login timestamp
$update = $conn->prepare("UPDATE admins SET last_login = NOW() WHERE id = ?");
$update->bind_param("i", $admin['id']);
$update->execute();

// 🔹 Generate JWT
$secret_key = "your-secret-key"; // ⚠️ store securely in config.php
$payload = [
    "iss" => "https://kostivinvestment.co.tz",
    "aud" => "https://kostivinvestment.co.tz",
    "iat" => time(),
    "exp" => time() + (60 * 60), // 1 hour expiry
    "data" => [
        "id"    => $admin['id'],
        "email" => $admin['email'],
        "name"  => $admin['name'],
        "role"  => $admin['role']
    ]
];

$jwt = JWT::encode($payload, $secret_key, 'HS256');

// 🔹 Success response
echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "token"   => $jwt
]);
