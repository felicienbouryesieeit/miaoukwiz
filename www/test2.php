<?php

$iswriting = $_POST['iswriting'];

/*
function senddata(){
    $conn = connect();
    // Vérifier la connexion
    //$pawnsvar = "u";//$_POST['pawnsvar'];
    
    
    
    if (!$conn) {
        die("Échec de la connexion : " . mysqli_connect_error());
    }
    
    $textevar = "é";//$_POST['textetowrite'];
    $sql = "UPDATE pays SET name_common = '".$textetowrite."' WHERE id = 1";//"INSERT INTO games (pawns) VALUES ('zaza')"; //"INSERT INTO games (pawns) VALUES ('".$pawnsvar."')";
    
    if (mysqli_query($conn, $sql)) {
        echo "Nouvel enregistrement ajouté avec succès";
    } else {
        echo "Erreur : " . $sql . "<br>" . mysqli_error($conn);
    }
    
    mysqli_close($conn);
}
*/

if ($iswriting==1) {
    //senddata();
} 

if ($iswriting==0) {
    
    readdata();
    
}

if ($iswriting==2) {
    
    //filldata();
    
}

if ($iswriting==3) {
    
    tablesize();
    
}

function readdata(){
header("Content-Type: application/json");

$conn = connect();

if ($conn->connect_error) {
    die(json_encode(["error" => "Connexion échouée"]));
}

$currenttable = $_POST['currenttable'];
$textevar = $_POST['textevar']; //currenttableindex
$currenttableindex = "u";//$_POST['currenttableindex'];

$result = $conn->query("SELECT " . $textevar . " FROM " . $currenttable . ""); //WHERE id = " . $currenttableindex . " //" . $textevar . "
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($data, JSON_UNESCAPED_UNICODE);
$conn->close();
}


function tablesize() {
    header("Content-Type: application/json");

    $conn = connect();
    
    if ($conn->connect_error) {
        die(json_encode(["error" => "Connexion échouée"]));
    }
    
    $currenttable = $_POST['currenttable'];
    $textevar = $_POST['textevar']; //currenttableindex
    $currenttableindex = 'u';//$_POST['currenttableindex'];
    
    $result = $conn->query("SELECT COUNT(*) FROM " . $currenttable . "");
    $data = $result->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    $conn->close();
}


/*
function filltable(){
    $conn = connect();
    // Vérifier la connexion
    //$pawnsvar = "u";//$_POST['pawnsvar'];
    
    
    
    if (!$conn) {
        die("Échec de la connexion : " . mysqli_connect_error());
    }
    
    $textetowrite = "é";//$_POST['textetowrite'];
    $currenttable = "i";//$_POST['currenttable'];
    $sql = "ALTER TABLE '".$currenttable."' ADD COLUMN '".$textetowrite."' TEXT DEFAULT 'oui'"; //"UPDATE pays SET name_common = '".$textetowrite."' WHERE id = 1";//"INSERT INTO games (pawns) VALUES ('zaza')"; //"INSERT INTO games (pawns) VALUES ('".$pawnsvar."')";
    
    if (mysqli_query($conn, $sql)) {
        echo "Nouvel enregistrement ajouté avec succès";
    } else {
        echo "Erreur : " . $sql . "<br>" . mysqli_error($conn);
    }
    
    mysqli_close($conn);
    }
*/




function connect() {
    $serveur = 'mysql-boury.alwaysdata.net';
    $utilisateur = 'boury';
    $motDePasse = 'kaaris270';
    $baseDeDonnees = 'boury_miaoukwiz';
    //$conn
    return mysqli_connect($serveur, $utilisateur, $motDePasse, $baseDeDonnees);
}

?>