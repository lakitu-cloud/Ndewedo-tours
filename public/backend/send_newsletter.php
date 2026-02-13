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
$subject = trim($input['subject'] ?? '');
$content = trim($input['content'] ?? '');
$ids = $input['subscriber_ids'] ?? [];

if (!$subject || !$content || empty($ids)) {
    http_response_code(400);
    echo json_encode(["success"=>false,"message"=>"Subject, content, and subscriber IDs are required"]);
    exit;
}

// Fetch subscribers
$placeholders = implode(',', array_fill(0, count($ids), '?'));
$stmt = $conn->prepare("SELECT id, name, email, unsubscribe_token FROM newsletter_subscribers WHERE id IN ($placeholders)");
$types = str_repeat('i', count($ids));
$stmt->bind_param($types, ...$ids);
$stmt->execute();
$result = $stmt->get_result();
$subscribers = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

// Configure PHPMailer
function configureMailer($username, $password){
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'] ?? 'localhost';
    $mail->SMTPAuth   = true;
    $mail->Username   = $username;
    $mail->Password   = $password;

    $secure = strtolower($_ENV['SMTP_SECURE'] ?? '');
    if($secure==='ssl') $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    elseif($secure==='tls') $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    else $mail->SMTPSecure = false;

    $mail->Port = (int)($_ENV['SMTP_PORT'] ?? 587);

    return $mail;
}

$mailer = configureMailer($_ENV['NEWSLETTER_EMAIL'], $_ENV['NEWSLETTER_EMAIL_PASS']);
$mailer->setFrom($_ENV['NEWSLETTER_EMAIL'], 'Kostiv Newsletter');
$mailer->isHTML(true);
$mailer->Subject = $subject;

// Send emails
$errors = [];
foreach($subscribers as $sub){
    try{
        $unsubscribe_url = "https://kostivinvestment.co.tz/backend/unsubscribe.php?token={$sub['unsubscribe_token']}";
        $body = str_replace(
            ["{{name}}","{{unsubscribe_url}}"],
            [$sub['name'], $unsubscribe_url],
            $content
        );
        $mailer->clearAddresses();
        $mailer->addAddress($sub['email'], $sub['name']);
        $mailer->Body = $body;
        $mailer->send();
    } catch(Exception $e){
        $errors[] = "Failed for {$sub['email']}: ".$e->getMessage();
    }
}

echo json_encode([
    "success" => empty($errors),
    "message" => empty($errors) ? "Newsletter sent successfully!" : "Some emails failed.",
    "errors" => $errors
]);

$conn->close();
