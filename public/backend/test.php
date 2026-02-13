<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.stackmail.com'; // your SMTP host
    $mail->SMTPAuth   = true;
    $mail->Username   = 'test@kostivinvestment.co.tz';
    $mail->Password   = '12345678p';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // or PHPMailer::ENCRYPTION_STARTTLS
    $mail->Port       = 465; // adjust to match SMTP_PORT

    $mail->setFrom('test@kostivinvestment.co.tz', 'Test');
    $mail->addAddress('davidpamphil@gmail.com'); // change to your personal email
    $mail->Subject = 'SMTP Test';
    $mail->Body = 'This is a test email';
    $mail->send();
    echo "Email sent!";
} catch (Exception $e) {
    echo "Mailer Error: " . $e->getMessage();
}
