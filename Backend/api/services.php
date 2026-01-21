<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
include('../config/db.php');

$stmt = $conn->prepare("SELECT * FROM facture_detail WHERE facture_id = ?");
$stmt->execute([$id]);
$services = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($services);
