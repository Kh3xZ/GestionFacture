<?php
header("Access-Control-Allow-Origin: http://localhost:4200"); // frontend origin
header("Access-Control-Allow-Credentials: true");             // allow cookies
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "auth.php";

echo json_encode([
    "loggedIn" => true,
    "userId" => $userId
]);
