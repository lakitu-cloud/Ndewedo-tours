<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // ✅ Fetch all admins
    case 'GET':
        $result = $conn->query("SELECT id, name, email, role, status, last_login, created_at, permissions, profile_image FROM admins ORDER BY created_at DESC");
        $admins = [];
        while ($row = $result->fetch_assoc()) {
            $row['permissions'] = $row['permissions'] ? json_decode($row['permissions'], true) : [];
            $admins[] = $row;
        }
        echo json_encode(["success" => true, "admins" => $admins]);
        break;

    // ✅ Add new admin
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            echo json_encode(["success" => false, "message" => "Invalid JSON"]);
            exit;
        }

        $name = $conn->real_escape_string($data['name']);
        $email = $conn->real_escape_string($data['email']);
        $role = $conn->real_escape_string($data['role']);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $permissions = json_encode($data['permissions'] ?? []);

        // ✅ Handle profile image
        $profileImage = null;
        if (!empty($data['profile_image'])) {
            $imageData = $data['profile_image'];
            $imageParts = explode(";base64,", $imageData);
            if (count($imageParts) === 2) {
                $ext = explode("/", $imageParts[0])[1];
                $imageBase64 = base64_decode($imageParts[1]);
                $filename = uniqid() . "." . $ext;
                $uploadDir = __DIR__ . '/uploads/admins/';
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
                file_put_contents($uploadDir . $filename, $imageBase64);
                $profileImage = "uploads/admins/" . $filename;
            }
        }

        $stmt = $conn->prepare("INSERT INTO admins (name, email, password, role, permissions, profile_image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $name, $email, $password, $role, $permissions, $profileImage);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Admin created"]);
        } else {
            echo json_encode(["success" => false, "message" => $stmt->error]);
        }
        break;

    // ✅ Update admin
    case 'PUT':
        $id = intval($_GET['id'] ?? 0);
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$id || !$data) {
            echo json_encode(["success" => false, "message" => "Invalid request"]);
            exit;
        }

        $name = $conn->real_escape_string($data['name']);
        $email = $conn->real_escape_string($data['email']);
        $role = $conn->real_escape_string($data['role']);
        $status = $conn->real_escape_string($data['status']);
        $permissions = json_encode($data['permissions'] ?? []);

        // ✅ Handle profile image update
        $profileImage = "";
        if (!empty($data['profile_image'])) {
            $imageData = $data['profile_image'];
            $imageParts = explode(";base64,", $imageData);
            if (count($imageParts) === 2) {
                $ext = explode("/", $imageParts[0])[1];
                $imageBase64 = base64_decode($imageParts[1]);
                $filename = uniqid() . "." . $ext;
                $uploadDir = __DIR__ . '/uploads/admins/';
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
                file_put_contents($uploadDir . $filename, $imageBase64);
                $profileImage = "uploads/admins/" . $filename;
            }
        }

        $query = "UPDATE admins SET name='$name', email='$email', role='$role', status='$status', permissions='$permissions'";
        if (!empty($data['password'])) {
            $password = password_hash($data['password'], PASSWORD_DEFAULT);
            $query .= ", password='$password'";
        }
        if ($profileImage) {
            $query .= ", profile_image='$profileImage'";
        }
        $query .= " WHERE id=$id";

        if ($conn->query($query)) {
            echo json_encode(["success" => true, "message" => "Admin updated"]);
        } else {
            echo json_encode(["success" => false, "message" => $conn->error]);
        }
        break;

    // ✅ Delete admin
    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);
        if (!$id) {
            echo json_encode(["success" => false, "message" => "No ID provided"]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM admins WHERE id=? AND role!='super_admin'");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Admin deleted"]);
        } else {
            echo json_encode(["success" => false, "message" => $stmt->error]);
        }
        break;

    default:
        echo json_encode(["success" => false, "message" => "Invalid request"]);
}

$conn->close();
?>
