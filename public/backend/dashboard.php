<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

// --- 1. Total Subscribers ---
$subscribersCount = $conn->query("SELECT COUNT(*) as total FROM newsletter_subscribers WHERE unsubscribed = 0")
                        ->fetch_assoc()['total'];

// --- 2. Active Buyers ---
$buyersCount = $conn->query("SELECT COUNT(*) as total FROM buyers_list")->fetch_assoc()['total'];

// --- 3. Active Shipments ---
$shipmentsCount = $conn->query("SELECT COUNT(*) as total FROM shipments WHERE status != 'delivered'")->fetch_assoc()['total'];

// --- 4. New Messages (last 7 days) ---
$messagesCount = $conn->query("SELECT COUNT(*) as total FROM contact_messages WHERE created_at >= NOW() - INTERVAL 7 DAY")->fetch_assoc()['total'];

// --- 5. Recent Activity (last 10 entries) ---
$recentActivity = [];

// Recent buyers
$resBuyers = $conn->query("SELECT name, company, created_at FROM buyers_list ORDER BY created_at DESC LIMIT 5");
while ($row = $resBuyers->fetch_assoc()) {
    $recentActivity[] = [
        "action" => "New buyer registration",
        "name" => $row['name'] . " - " . $row['company'],
        "time" => $row['created_at'],
        "type" => "buyer"
    ];
}

// Recent newsletters
$resSubs = $conn->query("SELECT COUNT(*) as count, created_at FROM newsletter_subscribers GROUP BY DATE(created_at) ORDER BY created_at DESC LIMIT 3");
while ($row = $resSubs->fetch_assoc()) {
    $recentActivity[] = [
        "action" => "Newsletter sent",
        "name" => $row['count'] . " subscribers",
        "time" => $row['created_at'],
        "type" => "newsletter"
    ];
}

// Recent messages
$resMessages = $conn->query("SELECT name, subject, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5");
while ($row = $resMessages->fetch_assoc()) {
    $recentActivity[] = [
        "action" => "New inquiry",
        "name" => $row['name'] . " - " . $row['subject'],
        "time" => $row['created_at'],
        "type" => "message"
    ];
}

// --- 6. Shipment Status Summary ---
$shipmentStatus = [];
$resShipments = $conn->query("SELECT status, COUNT(*) as count FROM shipments GROUP BY status");
while ($row = $resShipments->fetch_assoc()) {
    $color = $row['status'] === 'pending' ? 'bg-yellow-500' : ($row['status'] === 'in_transit' ? 'bg-blue-500' : 'bg-green-500');
    $shipmentStatus[] = [
        "status" => $row['status'],
        "count" => (int)$row['count'],
        "color" => $color
    ];
}

// --- 7. Growth Data (Monthly Subscribers and Buyers) ---
$growthData = [];
$resGrowth = $conn->query("
    SELECT 
        DATE_FORMAT(created_at, '%b') as month,
        SUM(CASE WHEN unsubscribed = 0 THEN 1 ELSE 0 END) as subscribers,
        0 as buyers
    FROM newsletter_subscribers
    GROUP BY YEAR(created_at), MONTH(created_at)
    ORDER BY created_at ASC
");

// Fill buyers per month
$buyersGrowth = $conn->query("
    SELECT DATE_FORMAT(created_at, '%b') as month, COUNT(*) as buyers
    FROM buyers_list
    GROUP BY YEAR(created_at), MONTH(created_at)
    ORDER BY created_at ASC
");

$subscribersPerMonth = [];
while ($row = $resGrowth->fetch_assoc()) {
    $subscribersPerMonth[$row['month']] = (int)$row['subscribers'];
}

$buyersPerMonth = [];
while ($row = $buyersGrowth->fetch_assoc()) {
    $buyersPerMonth[$row['month']] = (int)$row['buyers'];
}

// Merge months
$months = array_unique(array_merge(array_keys($subscribersPerMonth), array_keys($buyersPerMonth)));

foreach ($months as $month) {
    $growthData[] = [
        "month" => $month,
        "subscribers" => $subscribersPerMonth[$month] ?? 0,
        "buyers" => $buyersPerMonth[$month] ?? 0
    ];
}

// --- Return Dashboard JSON ---
echo json_encode([
    "success" => true,
    "stats" => [
        ["title" => "Total Subscribers", "value" => $subscribersCount],
        ["title" => "Active Buyers", "value" => $buyersCount],
        ["title" => "Active Shipments", "value" => $shipmentsCount],
        ["title" => "New Messages", "value" => $messagesCount]
    ],
    "recentActivity" => $recentActivity,
    "shipmentStatus" => $shipmentStatus,
    "growthData" => $growthData
]);

$conn->close();
?>
