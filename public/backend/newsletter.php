<?php 
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Update this to your actual domain in production
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

// Read POST data
$input = json_decode(file_get_contents('php://input'), true);
$name  = trim($conn->real_escape_string($input['name'] ?? ''));
$email = trim($conn->real_escape_string($input['email'] ?? ''));

if (!$name || !$email) {
    http_response_code(400);
    echo json_encode(["success"=>false,"message"=>"Name and email are required"]);
    exit;
}

// --- Check if subscriber exists ---
$stmt = $conn->prepare("SELECT id, unsubscribed FROM newsletter_subscribers WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$existing = $result->fetch_assoc();
$stmt->close();

if ($existing) {
    if ($existing['unsubscribed'] == 1) {
        // Re-subscribe user
        $token = bin2hex(random_bytes(16));
        $stmt = $conn->prepare("UPDATE newsletter_subscribers 
                                SET name = ?, unsubscribed = 0, unsubscribed_at = NULL, unsubscribe_token = ? 
                                WHERE id = ?");
        $stmt->bind_param("ssi", $name, $token, $existing['id']);
        $stmt->execute();
        $subscriber_id = $existing['id'];
        $stmt->close();
    } else {
        // Already subscribed and active
        echo json_encode([
            "success" => true,
            "message" => "You are already subscribed to Ndewedo Tours updates."
        ]);
        $conn->close();
        exit;
    }
} else {
    // New subscription
    $token = bin2hex(random_bytes(16));
    $stmt = $conn->prepare("INSERT INTO newsletter_subscribers (name,email,unsubscribe_token) VALUES (?,?,?)");
    $stmt->bind_param("sss", $name, $email, $token);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(["success"=>false,"message"=>"Database error"]);
        $stmt->close();
        $conn->close();
        exit;
    }

    $subscriber_id = $stmt->insert_id;
    $stmt->close();
}

// --- Respond to frontend ---
echo json_encode([
    "success" => true,
    "message" => "Thank you $name! You've successfully joined our newsletter."
]);

// --- Email logic ---
$unsubscribe_url = "https://ndewedotours.com/backend/unsubscribe.php?token=$token";
$placeholders = ["{{name}}", "{{unsubscribe_url}}"];
$values = [$name, $unsubscribe_url];

function configureMailer($username,$password){
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'] ?? 'localhost';
    $mail->SMTPAuth   = true;
    $mail->Username   = $username;
    $mail->Password   = $password;
    $mail->SMTPSecure = ($_ENV['SMTP_SECURE'] === 'ssl') ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int) ($_ENV['SMTP_PORT'] ?? 587);
    return $mail;
}

try {
    $mail = configureMailer($_ENV['NEWSLETTER_EMAIL'], $_ENV['NEWSLETTER_EMAIL_PASS']);
    $mail->setFrom($_ENV['NEWSLETTER_EMAIL'], 'Ndewedo Tours');
    $mail->addAddress($email, $name);
    $mail->isHTML(true);
    $mail->Subject = 'Welcome to Ndewedo Tours & Safaris';

    $template = @file_get_contents("newsletter_email_template.html");
    if ($template === false) {
        $mail->Body = "Hi $name, thank you for subscribing to Ndewedo Tours!";
    } else {
        $mail->Body = str_replace($placeholders, $values, $template);
    }
    
    $mail->send();
} catch(Exception $e) {
    error_log("Welcome email failed: " . $e->getMessage());
}

$conn->close();
?>
