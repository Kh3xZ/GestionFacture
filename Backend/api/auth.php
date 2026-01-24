<?php
require __DIR__ . "/../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "efaeaff8e20b53d9e3eb387efa281c9a";

if (!isset($_COOKIE['token'])) {
    http_response_code(401);
    echo json_encode(["message" => "Not authenticated"]);
    exit;
}

try {
    $decoded = JWT::decode($_COOKIE['token'], new Key($secretKey, 'HS256'));
    $userId = $decoded->sub;
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid or expired token"]);
    exit;
}
