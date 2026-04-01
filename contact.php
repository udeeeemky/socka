<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

// Honeypot
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean(string $s): string {
    return htmlspecialchars(strip_tags(trim($s)), ENT_QUOTES, 'UTF-8');
}

$name     = clean($_POST['name']     ?? '');
$email    = clean($_POST['email']    ?? '');
$company  = clean($_POST['company']  ?? '');
$interest = clean($_POST['interest'] ?? '');
$message  = clean($_POST['message']  ?? '');

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

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.m1.websupport.sk';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'ahoj@socka.sk';
    $mail->Password   = 'Xg3>Uv-zu$';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('ahoj@socka.sk', 'socka.sk formulár');
    $mail->addAddress('ahoj@socka.sk', 'Adam');
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Nový dopyt – socka.sk' . ($interest ? " ({$interest})" : '');

    $body  = "Nová správa z kontaktného formulára na socka.sk\n";
    $body .= str_repeat('─', 50) . "\n\n";
    $body .= "Meno:      {$name}\n";
    $body .= "E-mail:    {$email}\n";
    if ($company)  $body .= "Firma/web: {$company}\n";
    if ($interest) $body .= "Záujem o:  {$interest}\n";
    $body .= "\nSpráva:\n{$message}\n\n";
    $body .= str_repeat('─', 50) . "\n";
    $body .= "Odoslané: " . date('d.m.Y H:i') . "\n";

    $mail->Body = $body;
    $mail->send();

    echo json_encode(['ok' => true, 'message' => 'Správa odoslaná']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Chyba: ' . $mail->ErrorInfo]);
}
