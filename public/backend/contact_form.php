<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'config.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- Helper: Determine priority from subject ---
function determinePriorityFromSubject($subject) {
    switch (strtolower($subject)) {
        case 'wildlife safaris':
        case 'kilimanjaro trekking':
            return 'high';
        case 'cultural tours':
        case 'volunteer programs':
            return 'medium';
        case 'custom package':
        default:
            return 'low';
    }
}

// Read POST data
$input   = json_decode(file_get_contents('php://input'), true);
$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');
$priority = determinePriorityFromSubject($subject);

// Validate required fields
if (!$name || !$email || !$subject || !$message) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

// Insert into DB using prepared statement
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message, priority) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database prepare error: " . $conn->error
    ]);
    exit;
}
$stmt->bind_param("sssss", $name, $email, $subject, $message, $priority);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database execution error: " . $stmt->error
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$message_id = $stmt->insert_id;
$stmt->close();

// Placeholders for templates
$placeholders = ["{{name}}","{{email}}","{{subject}}","{{message}}"];
$values       = [$name,$email,$subject,nl2br($message)];

// Configure PHPMailer
function configureMailer($username, $password) {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'] ?? 'localhost';
    $mail->SMTPAuth   = true;
    $mail->Username   = $username;
    $mail->Password   = $password;

    $secure = strtolower($_ENV['SMTP_SECURE'] ?? '');
    if ($secure === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($secure === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        $mail->SMTPSecure = false;
    }

    $mail->Port = (int) ($_ENV['SMTP_PORT'] ?? 587);

    return $mail;
}

// --- User Confirmation Email ---
try {
    $userMail = configureMailer($_ENV['NEWSLETTER_EMAIL'], $_ENV['NEWSLETTER_EMAIL_PASS']);
    $userMail->setFrom($_ENV['NEWSLETTER_EMAIL'], 'Ndewedo Tours');
    $userMail->addAddress($email, $name);
    $userMail->isHTML(true);
    $userMail->Subject = 'We Received Your Message - Ndewedo Tours';

    $messageTemplate = @file_get_contents("contact_user_email.html");
    if ($messageTemplate === false) {
        $messageTemplate = "<p>Hi $name,</p><p>We received your message about <b>$subject</b>. Our team will get back to you shortly.</p>";
    }
    $userMail->Body = str_replace($placeholders, $values, $messageTemplate);
    $userMail->send();
} catch (Exception $e) {
    error_log("User email failed: {$e->getMessage()}");
}

// --- Admin Notification Email ---
try {
    $adminMail = configureMailer($_ENV['NEWSLETTER_EMAIL'], $_ENV['NEWSLETTER_EMAIL_PASS']);
    $adminMail->setFrom($_ENV['NEWSLETTER_EMAIL'], 'Ndewedo Website');
    $adminMail->addAddress($_ENV['INTERNAL_EMAIL']);
    $adminMail->isHTML(true);
    $adminMail->Subject = 'New Contact Form Submission: ' . $subject;

    $internalMessage = @file_get_contents("contact_admin_email.html");
    if ($internalMessage === false) {
        $internalMessage = "<p>New inquiry from <b>$name</b> ($email) about <b>$subject</b>.</p>
                            <p>Message:</p><p>$message</p>";
    }
    $adminMail->Body = str_replace($placeholders, $values, $internalMessage);
    $adminMail->send();
} catch (Exception $e) {
    error_log("Admin email failed: {$e->getMessage()}");
}

// Success response
echo json_encode([
    "success" => true,
    "id" => $message_id,
    "message" => "Thank you $name, we’ve received your message and will respond shortly."
]);

$conn->close();
?>
