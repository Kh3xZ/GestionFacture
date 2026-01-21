<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['service'])) {
    $service = $data['service'];
    include('../config/db.php');

    try {
        $stmt = $conn->prepare("INSERT INTO facture_detail (facture_id, service, prix, description, type) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $service['facture_id'],
            $service['service'], 
            $service['prix'], 
            $service['description'], 
            $service['type']
        ]);
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}
?>