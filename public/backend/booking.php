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

$fullName    = trim($input['fullName'] ?? '');
$email       = trim($input['email'] ?? '');
$language    = trim($input['language'] ?? '');
$country     = trim($input['country'] ?? '');
$paymentMode = trim($input['paymentMode'] ?? '');
$travelDate  = trim($input['travelDate'] ?? '');
$partners    = (int)($input['partners'] ?? 1);
$children    = (int)($input['children'] ?? 0);
$packageName = trim($input['packageName'] ?? '');
$packageAmt  = trim($input['packageAmount'] ?? '');

if (!$fullName || !$email || !$packageName) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Required fields missing"]);
    exit;
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO bookings (full_name, email, language, country, payment_mode, travel_date, partners, children, package_name, package_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssiiss", $fullName, $email, $language, $country, $paymentMode, $travelDate, $partners, $children, $packageName, $packageAmt);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error"]);
    $stmt->close();
    $conn->close();
    exit;
}

$booking_id = $stmt->insert_id;
$stmt->close();

// Email setup
$placeholders = ["{{name}}", "{{package}}", "{{date}}", "{{partners}}", "{{children}}", "{{amount}}"];
$values = [$fullName, $packageName, $travelDate, $partners, $children, $packageAmt];

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
    $userMail->Subject = 'Booking Request Received - ' . $packageName;
    
    $template = @file_get_contents("booking_user_email.html");
    if ($template === false) {
        $userMail->Body = "Hi $fullName, thank you for booking $packageName with us. We will contact you soon.";
    } else {
        $userMail->Body = str_replace($placeholders, $values, $template);
    }
    $userMail->send();
} catch (Exception $e) {
    error_log("User booking email failed: " . $e->getMessage());
}

// 2. Send Notification to Admin
try {
    $adminMail = configureMailer($_ENV['NEWSLETTER_EMAIL'], $_ENV['NEWSLETTER_EMAIL_PASS']);
    $adminMail->setFrom($_ENV['NEWSLETTER_EMAIL'], 'Ndewedo Booking System');
    $adminMail->addAddress($_ENV['INTERNAL_EMAIL']);
    $adminMail->isHTML(true);
    $adminMail->Subject = 'NEW BOOKING: ' . $packageName;
    $adminMail->Body = "<h3>New Booking Details</h3>
        <p><b>Name:</b> $fullName</p>
        <p><b>Email:</b> $email</p>
        <p><b>Package:</b> $packageName ($packageAmt)</p>
        <p><b>Date:</b> $travelDate</p>
        <p><b>Travelers:</b> $partners adults, $children children</p>
        <p><b>Country:</b> $country</p>
        <p><b>Payment:</b> $paymentMode</p>";
    $adminMail->send();
} catch (Exception $e) {
    error_log("Admin booking notification failed: " . $e->getMessage());
}

echo json_encode(["success" => true, "message" => "Booking request submitted successfully!"]);
$conn->close();
?>
