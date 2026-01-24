<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
$data = json_decode(file_get_contents("php://input"), true);
if (isset($data['client'])) {
    $client = $data['client'];
    include('../config/db.php');

    try {
        $stmt = $conn->prepare("DELETE FROM clients WHERE id=?");
        $stmt->execute([
            $client['id']
        ]);
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}
?>