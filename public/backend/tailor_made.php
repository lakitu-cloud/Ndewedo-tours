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
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents('php://input'), true);

$fullName       = trim($input['fullName'] ?? '');
$email          = trim($input['email'] ?? '');
$phone          = trim($input['phone'] ?? '');
$countries      = implode(", ", $input['countries'] ?? []);
$parks          = implode(", ", $input['parks'] ?? []);
$activities     = implode(", ", $input['activities'] ?? []);
$duration       = trim($input['duration'] ?? '');
$startDate      = trim($input['startDate'] ?? '');
$budget         = trim($input['budget'] ?? '');
$additionalInfo = trim($input['additionalInfo'] ?? '');

if (!$fullName || !$email || !$countries) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Required fields missing"]);
    exit;
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO tailor_made_requests (full_name, email, phone, countries, parks, activities, duration, start_date, budget, additional_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssss", $fullName, $email, $phone, $countries, $parks, $activities, $duration, $startDate, $budget, $additionalInfo);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error"]);
    $stmt->close();
    $conn->close();
    exit;
}

$request_id = $stmt->insert_id;
$stmt->close();

// Email Setup
$placeholders = ["{{name}}", "{{countries}}", "{{duration}}", "{{budget}}", "{{date}}"];
$values = [$fullName, $countries, $duration, $budget, $startDate];

function configureMailer($username, $password) {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->SMTPSecure = ($_ENV['SMTP_SECURE'] === 'ssl') ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int)$_ENV['SMTP_PORT'];
    return $mail;
}

// 1. Send Confirmation to User
try {
    $userMail = configureMailer($_ENV['NEWSLETTER_EMAIL'], $_ENV['NEWSLETTER_EMAIL_PASS']);
    $userMail->setFrom($_ENV['NEWSLETTER_EMAIL'], 'Ndewedo Tours');
    $userMail->addAddress($email, $fullName);
    $userMail->isHTML(true);
    $userMail->Subject = 'Custom Safari Request Received - Ndewedo Tours';
    
    $template = @file_get_contents("tailor_made_user_email.html");
    if ($template === false) {
        $userMail->Body = "Hi $fullName, we received your custom safari request for $countries. We will contact you soon.";
    } else {
        $userMail->Body = str_replace($placeholders, $values, $template);
    }
    $userMail->send();
} catch (Exception $e) {
    error_log("Tailor-made user email failed: " . $e->getMessage());
}

// 2. Send Notification to Admin
try {
    $adminMail = configureMailer($_ENV['NEWSLETTER_EMAIL'], $_ENV['NEWSLETTER_EMAIL_PASS']);
    $adminMail->setFrom($_ENV['NEWSLETTER_EMAIL'], 'Ndewedo Request System');
    $adminMail->addAddress($_ENV['INTERNAL_EMAIL']);
    $adminMail->isHTML(true);
    $adminMail->Subject = 'NEW TAILOR-MADE REQUEST: ' . $fullName;
    $adminMail->Body = "<h3>New Tailor-Made Safari Request</h3>
        <p><b>Client:</b> $fullName</p>
        <p><b>Email:</b> $email</p>
        <p><b>Phone:</b> $phone</p>
        <p><b>Countries:</b> $countries</p>
        <p><b>Parks:</b> $parks</p>
        <p><b>Activities:</b> $activities</p>
        <p><b>Duration:</b> $duration days</p>
        <p><b>Start Date:</b> $startDate</p>
        <p><b>Budget:</b> $budget</p>
        <p><b>Info:</b> $additionalInfo</p>";
    $adminMail->send();
} catch (Exception $e) {
    error_log("Admin tailor-made notification failed: " . $e->getMessage());
}

echo json_encode(["success" => true, "message" => "Request submitted! Our team will contact you soon."]);
$conn->close();
?>
