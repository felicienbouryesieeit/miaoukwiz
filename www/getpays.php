<?php


$iswriting = $_POST['iswriting'];

function readdata(){
header("Content-Type: application/json");

$serveur = "localhost";
$utilisateur = "root";
$motDePasse = "";
$baseDeDonnees = "miaoukwiz";
$conn = mysqli_connect($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connexion échouée"]));
}
$iswriting = $_POST['iswriting'];
$result = $conn->query("SELECT translations FROM pays");
//$result = $conn->query("SELECT $iswriting2 FROM pays");
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($data);
$conn->close();
}













readdata();







function updatedata(){
    header("Content-Type: application/json");

    $serveur = "localhost";
    $utilisateur = "root";
    $motDePasse = "";
    $baseDeDonnees = "miaoukwiz";
    $conn = mysqli_connect($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

    if ($conn->connect_error) {
        die(json_encode(["error" => "Connexion échouée"]));
    }

    // Assuming 'iswriting' specifies the country (or row) to update. 
    // You should validate the input for security (e.g., sanitize and escape user input).
    $iswriting = $conn->real_escape_string($iswriting);
    $translation = $conn->real_escape_string($translation);
    
    // Update the 'translations' column in the 'pays' table where a condition is met (e.g., based on 'iswriting')
    $translation3=json_encode("u");
    $iswriting3=1;
    $sql = "UPDATE pays SET translations = '$translation3' WHERE id = '$iswriting3'";  // Adjust the condition as needed
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "La traduction a été mise à jour avec succès."]);
    } else {
        echo json_encode(["error" => "Erreur lors de la mise à jour: " . $conn->error]);
    }

    $conn->close();
}

updatedata();


?>