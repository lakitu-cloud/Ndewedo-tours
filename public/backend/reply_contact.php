<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Or your frontend URL
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Enable error reporting (for debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'config.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Read POST data
$input = json_decode(file_get_contents('php://input'), true);
$id = isset($input['id']) ? (int)$input['id'] : 0;
$reply_message = isset($input['reply_message']) ? trim($input['reply_message']) : '';

if (!$id || !$reply_message) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Message ID and reply message are required."
    ]);
    exit;
}

// Fetch original contact message
$stmt = $conn->prepare("SELECT name, email, subject, message FROM contact_messages WHERE id = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database prepare error: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Contact message not found."]);
    $stmt->close();
    $conn->close();
    exit;
}

$contact = $result->fetch_assoc();
$stmt->close();

// Prepare email placeholders
$placeholders = ["{{name}}", "{{email}}", "{{subject}}", "{{message}}", "{{reply_message}}"];
$values = [
    $contact['name'],
    $contact['email'],
    $contact['subject'],
    nl2br($contact['message']),
    nl2br($reply_message)
];

// Configure PHPMailer
function configureMailer($username, $password) {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'] ?? 'localhost';
    $mail->SMTPAuth = true;
    $mail->Username = $username;
    $mail->Password = $password;

    $secure = strtolower($_ENV['SMTP_SECURE'] ?? '');
    if ($secure === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($secure === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mail->Port = (int)($_ENV['SMTP_PORT'] ?? 587);
    return $mail;
}

// Send reply email
try {
    $mail = configureMailer($_ENV['BUYERS_EMAIL'], $_ENV['BUYERS_EMAIL_PASS']);
    $mail->setFrom($_ENV['BUYERS_EMAIL'], 'Kostiv Investment');
    $mail->addAddress($contact['email'], $contact['name']);
    $mail->isHTML(true);
    $mail->Subject = "Re: " . $contact['subject'];

    $replyTemplate = @file_get_contents("contact_reply_email.html");
    if ($replyTemplate === false) {
        $replyTemplate = "
            <p>Hi {{name}},</p>
            <p>Thank you for contacting us regarding <b>{{subject}}</b>.</p>
            <p>Your original message:</p>
            <blockquote>{{message}}</blockquote>
            <p>Our reply:</p>
            <blockquote>{{reply_message}}</blockquote>
            <p>Best regards,<br>Kostiv Investment Team</p>
        ";
    }

    $mail->Body = str_replace($placeholders, $values, $replyTemplate);
    $mail->send();
} catch (Exception $e) {
    error_log("Reply email failed: {$e->getMessage()}");
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send reply email: " . $e->getMessage()]);
    $conn->close();
    exit;
}

// Update message status and save admin reply
$updateStmt = $conn->prepare("UPDATE contact_messages SET status = 'replied', admin_reply = ? WHERE id = ?");
if (!$updateStmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database prepare error: " . $conn->error]);
    $conn->close();
    exit;
}

$updateStmt->bind_param("si", $reply_message, $id);

if (!$updateStmt->execute()) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to update message: " . $updateStmt->error]);
    $updateStmt->close();
    $conn->close();
    exit;
}

$updateStmt->close();
$conn->close();

echo json_encode(["success" => true, "message" => "Reply sent successfully."]);
?>
