<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['facture'])) {
    $facture = $data['facture'];
    include('../config/db.php');

    try {
        $stmt = $conn->prepare("INSERT INTO factures (client_id, issue_date, due_date, status) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $facture['client_id'],
            $facture['issue_date'], 
            $facture['due_date'], 
            $facture['status'], 
        ]);
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}
?>