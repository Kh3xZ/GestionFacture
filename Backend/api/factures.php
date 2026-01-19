<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");
include('../config/db.php');

$stmt = $conn->prepare("SELECT * FROM factures");
$stmt->execute();
$factures = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($factures);
?>
