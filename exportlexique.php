<?php
// Configuration de la base de données
$host = 'mysql-boury.alwaysdata.net';
$dbname = 'boury_miaoukwiz';
$user = 'boury';
$pass = 'kaaris270';
$charset = 'utf8mb4';

// Connexion PDO
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Chargement du fichier JSON
$json = file_get_contents('Lexique383.json');
$dataArray = json_decode($json, true);

if (!$dataArray) {
    die("Erreur de lecture ou de décodage du fichier JSON.");
}

// Liste des colonnes (basées sur le JSON)
$columns = array_keys($dataArray[0]);
$placeholders = array_map(fn($col) => ':' . $col, $columns);

// Préparation de la requête SQL dynamique
$sql = "INSERT INTO lexique (" . implode(", ", $columns) . ")
        VALUES (" . implode(", ", $placeholders) . ")";
$stmt = $pdo->prepare($sql);

// Insertion en boucle
$inserted = 0;
foreach ($dataArray as $entry) {
    // Nettoyage des valeurs nulles
    foreach ($entry as $key => $value) {
        $entry[$key] = $value === '' ? null : $value;
    }

    // Exécution
    try {
        $stmt->execute($entry);
        $inserted++;
    } catch (PDOException $e) {
        echo "Erreur à l'insertion d'une ligne : " . $e->getMessage() . "<br>";
    }
}

echo "Insertion terminée : $inserted lignes ajoutées.";
?>
