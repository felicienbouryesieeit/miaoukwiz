<?php
// Paramètres de connexion à la base de données
$host = 'mysql-boury.alwaysdata.net';
$dbname = 'boury_miaoukwiz';
$username = 'kaaris270';
$password = 'votre_mot_de_passe';

/*
$host = 'mysql-boury.alwaysdata.net';
$dbname = 'boury_miaoukwiz';
$user = 'boury';
$pass = 'kaaris270';
$charset = 'utf8mb4';

*/
try {
    // Connexion à la base de données avec PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    // Configuration des options PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Lecture du fichier JSON
    $json = file_get_contents('questions_histoire_50_vraies.json.json');
    $questions = json_decode($json, true);

    // Préparation de la requête d'insertion
    $stmt = $pdo->prepare("
        INSERT INTO quiz_histoire (
            question,
            bonne_reponse,
            mauvaise_reponse_1,
            mauvaise_reponse_2,
            mauvaise_reponse_3
        ) VALUES (
            :question,
            :bonne_reponse,
            :mauvaise_reponse_1,
            :mauvaise_reponse_2,
            :mauvaise_reponse_3
        )
    ");

    // Insertion de chaque question dans la base de données
    foreach ($questions as $q) {
        $stmt->execute([
            ':question' => $q['question'],
            ':bonne_reponse' => $q['bonne_reponse'],
            ':mauvaise_reponse_1' => $q['mauvaise_reponse_1'],
            ':mauvaise_reponse_2' => $q['mauvaise_reponse_2'],
            ':mauvaise_reponse_3' => $q['mauvaise_reponse_3']
        ]);
    }

    echo "Importation réussie de " . count($questions) . " questions.";
} catch (PDOException $e) {
    echo "Erreur lors de l'importation : " . $e->getMessage();
}
?>
