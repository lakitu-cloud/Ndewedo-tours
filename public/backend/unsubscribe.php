<?php
require 'config.php';

// Determine request type
$isApi = $_SERVER['REQUEST_METHOD'] === 'POST';
$token = '';

if ($isApi) {
    // Read JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $token = trim($input['token'] ?? '');
} else {
    // Get token from URL
    $token = $_GET['token'] ?? '';
}

if (!$token) {
    if ($isApi) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Token is required."]);
    } else {
        die("Invalid unsubscribe link.");
    }
    exit;
}

// Find subscriber by token
$stmt = $conn->prepare("SELECT id, name, email, unsubscribed FROM newsletter_subscribers WHERE unsubscribe_token = ? LIMIT 1");
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();
$subscriber = $result->fetch_assoc();
$stmt->close();

if (!$subscriber) {
    if ($isApi) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Subscriber not found or invalid token."]);
    } else {
        die("Invalid or expired unsubscribe link.");
    }
    exit;
}

// Check if already unsubscribed
if ($subscriber['unsubscribed'] == 1) {
    $message = "You are already unsubscribed from Kostiv Updates.";
} else {
    // Mark subscriber as unsubscribed and save timestamp
    $stmt = $conn->prepare("UPDATE newsletter_subscribers SET unsubscribed = 1, unsubscribed_at = NOW() WHERE id = ?");
    $stmt->bind_param("i", $subscriber['id']);
    $stmt->execute();
    $stmt->close();
    $message = "Hi {$subscriber['name']}, you have successfully unsubscribed from Kostiv Updates.";
}

$conn->close();

if ($isApi) {
    // Return JSON response
    echo json_encode(["success" => true, "message" => $message]);
} else {
    // Show HTML confirmation (newsletter style)
    ?>
    <!doctype html>
    <html lang="en" style="margin:0;padding:0;background:#f4f1ea;">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>You're Unsubscribed</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f1ea;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid rgba(18,77,40,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background:#124d28;padding:28px 24px;text-align:center;">
                    <img src="https://kostivinvestment.co.tz/logo/logo.webp" 
                         alt="Kostiv Investment" width="50" height="50"
                         style="display:block;margin:0 auto;border-radius:50%;">
                    <div style="color:#f4f1ea;font-size:18px;line-height:24px;margin-top:10px;font-weight:500;">
                      Growing Avocados, Growing Communities
                    </div>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding:32px 28px 8px 28px;background:#ffffff;">
                    <h1 style="margin:0 0 12px 0;color:#124d28;font-size:22px;line-height:28px;font-weight:700;">
                      <?php echo htmlspecialchars("Goodbye, {$subscriber['name']} 👋"); ?>
                    </h1>
                    <p style="margin:0;color:#717182;font-size:16px;line-height:24px;">
                      <?php echo htmlspecialchars($message); ?>
                    </p>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding:20px 28px 28px 28px;">
                    <a href="https://kostivinvestment.co.tz" 
                       style="display:inline-block;background:#124d28;color:#f4f1ea;text-decoration:none;
                              font-size:15px;line-height:20px;font-weight:600;padding:12px 22px;border-radius:8px;">
                      Return to Website
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:20px 28px 28px 28px;">
                    <p style="margin:0 0 8px 0;color:#717182;font-size:13px;line-height:20px;">
                      Sent by <strong style="color:#124d28;">Kostiv Investment Tanzania Ltd</strong><br>
                      Moivoi, Arusha, Tanzania • +255 765 687 331 • info@kostivinvestment.co.tz
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    <?php
}
?>
