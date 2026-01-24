<?php
require __DIR__ . "/../vendor/autoload.php";

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:4200"); // frontend origin
header("Access-Control-Allow-Credentials: true");             // allow cookies
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$mdp   = $data['mdp'] ?? '';

include('../config/db.php');

$stmt = $conn->prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user && !($user["password_hash"] === $mdp)) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

$secretKey = "efaeaff8e20b53d9e3eb387efa281c9a";

$payload = [
    "sub" => $user['id'],
    "email" => $user['email'],
    "iat" => time(),
    "exp" => time() + 3600
];

$jwt = JWT::encode($payload, $secretKey, 'HS256');


setcookie(
    "token",
    $jwt,
    [
        "expires" => time() + 3600,
        "path" => "/",
        "secure" => false,   // ok for localhost
        "httponly" => true,
        "samesite" => "Lax"  // change from Strict → Lax allows sending cookie on cross-origin GET
    ]
);


echo json_encode([
    "success" => true,
    "name" => $user['name'],
    "email" => $user['email']
]);
