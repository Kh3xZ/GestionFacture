<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // allow Angular to call API
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config/db.php'; // your database connection

// Simple GET request to fetch all users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM users");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
    exit();
}

// Simple POST request to add a user
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("INSERT INTO users (name, email, password_hash, role) VALUES (:name, :email, :password, :role)");
    $stmt->execute([
        ':name' => $data['name'],
        ':email' => $data['email'],
        ':password' => $data['passwordHash'],
        ':role' => $data['role']
    ]);
    echo json_encode(["message" => "User added successfully"]);
    exit();
}
?>
