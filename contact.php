<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://socka.sk');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

// Honeypot – bots fill this hidden field
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]); // pretend success
    exit;
}

// Sanitize inputs
function clean(string $s): string {
    return htmlspecialchars(strip_tags(trim($s)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$email   = clean($_POST['email']   ?? '');
$company = clean($_POST['company'] ?? '');
$interest = clean($_POST['interest'] ?? '');
$message = clean($_POST['message'] ?? '');

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Vyplňte povinné polia']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Neplatný e-mail']);
    exit;
}

// Build email
$to      = 'ahoj@socka.sk';
$subject = "Nový dopyt – socka.sk" . ($interest ? " ({$interest})" : '');

$body  = "Nová správa z kontaktného formulára na socka.sk\n";
$body .= str_repeat('─', 50) . "\n\n";
$body .= "Meno:      {$name}\n";
$body .= "E-mail:    {$email}\n";
if ($company) $body .= "Firma/web: {$company}\n";
if ($interest) $body .= "Záujem o:  {$interest}\n";
$body .= "\nSpráva:\n{$message}\n\n";
$body .= str_repeat('─', 50) . "\n";
$body .= "Odoslané: " . date('d.m.Y H:i') . "\n";

$headers  = "From: formulár <noreply@socka.sk>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true, 'message' => 'Správa odoslaná']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Chyba pri odoslaní']);
}
