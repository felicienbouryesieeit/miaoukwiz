<?php
// Configuration de la base de données
$host = 'localhost';
$dbname = 'miaoukwiz';
$user = 'root';
$pass = '';
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

// Charger le fichier JSON
$json = file_get_contents('restcountries.json');
$data = json_decode($json, true);

if (!$data) {
    die("Erreur de lecture ou de décodage du fichier JSON.");
}

// Préparation de la requête SQL
$sql = "INSERT INTO countries (
    name_common, name_official, native_name, tld, cca2, ccn3, cca3, cioc,
    independent, status, un_member, currencies, idd_root, idd_suffixes,
    capital, alt_spellings, region, subregion, languages, translations,
    latlng, landlocked, area, demonyms, flag, google_maps, open_street_maps,
    population, fifa, car_signs, car_side, timezones, continents,
    flag_png, flag_svg, flag_alt, coat_of_arms_png, coat_of_arms_svg,
    start_of_week, capital_info, borders, gini, postal_code_format, postal_code_regex
) VALUES (
    :name_common, :name_official, :native_name, :tld, :cca2, :ccn3, :cca3, :cioc,
    :independent, :status, :un_member, :currencies, :idd_root, :idd_suffixes,
    :capital, :alt_spellings, :region, :subregion, :languages, :translations,
    :latlng, :landlocked, :area, :demonyms, :flag, :google_maps, :open_street_maps,
    :population, :fifa, :car_signs, :car_side, :timezones, :continents,
    :flag_png, :flag_svg, :flag_alt, :coat_of_arms_png, :coat_of_arms_svg,
    :start_of_week, :capital_info, :borders, :gini, :postal_code_format, :postal_code_regex
)";

$stmt = $pdo->prepare($sql);

// Boucle d'insertion
foreach ($data as $country) {
    $stmt->execute([
        ':name_common'         => $country['name']['common'] ?? null,
        ':name_official'       => $country['name']['official'] ?? null,
        ':native_name'         => json_encode($country['name']['nativeName'] ?? [], JSON_UNESCAPED_UNICODE),
        ':tld'                 => json_encode($country['tld'] ?? [], JSON_UNESCAPED_UNICODE),
        ':cca2'                => $country['cca2'] ?? null,
        ':ccn3'                => $country['ccn3'] ?? null,
        ':cca3'                => $country['cca3'] ?? null,
        ':cioc'                => $country['cioc'] ?? null,
        ':independent'         => json_encode($country['independent'] ?? null, JSON_UNESCAPED_UNICODE),
        ':status'              => $country['status'] ?? null,
        ':un_member'           => json_encode($country['unMember'] ?? null, JSON_UNESCAPED_UNICODE),
        ':currencies'          => json_encode($country['currencies'] ?? [], JSON_UNESCAPED_UNICODE),
        ':idd_root'            => $country['idd']['root'] ?? null,
        ':idd_suffixes'        => json_encode($country['idd']['suffixes'] ?? [], JSON_UNESCAPED_UNICODE),
        ':capital'             => json_encode($country['capital'] ?? [], JSON_UNESCAPED_UNICODE),
        ':alt_spellings'       => json_encode($country['altSpellings'] ?? [], JSON_UNESCAPED_UNICODE),
        ':region'              => $country['region'] ?? null,
        ':subregion'           => $country['subregion'] ?? null,
        ':languages'           => json_encode($country['languages'] ?? [], JSON_UNESCAPED_UNICODE),
        ':translations'        => json_encode($country['translations'] ?? [], JSON_UNESCAPED_UNICODE),
        ':latlng'              => json_encode($country['latlng'] ?? [], JSON_UNESCAPED_UNICODE),
        ':landlocked'          => json_encode($country['landlocked'] ?? null, JSON_UNESCAPED_UNICODE),
        ':area'                => json_encode($country['area'] ?? null, JSON_UNESCAPED_UNICODE),
        ':demonyms'            => json_encode($country['demonyms'] ?? [], JSON_UNESCAPED_UNICODE),
        ':flag'                => $country['flag'] ?? null,
        ':google_maps'         => $country['maps']['googleMaps'] ?? null,
        ':open_street_maps'    => $country['maps']['openStreetMaps'] ?? null,
        ':population'          => json_encode($country['population'] ?? null, JSON_UNESCAPED_UNICODE),
        ':fifa'                => $country['fifa'] ?? null,
        ':car_signs'           => json_encode($country['car']['signs'] ?? [], JSON_UNESCAPED_UNICODE),
        ':car_side'            => $country['car']['side'] ?? null,
        ':timezones'           => json_encode($country['timezones'] ?? [], JSON_UNESCAPED_UNICODE),
        ':continents'          => json_encode($country['continents'] ?? [], JSON_UNESCAPED_UNICODE),
        ':flag_png'            => $country['flags']['png'] ?? null,
        ':flag_svg'            => $country['flags']['svg'] ?? null,
        ':flag_alt'            => $country['flags']['alt'] ?? null,
        ':coat_of_arms_png'    => $country['coatOfArms']['png'] ?? null,
        ':coat_of_arms_svg'    => $country['coatOfArms']['svg'] ?? null,
        ':start_of_week'       => $country['startOfWeek'] ?? null,
        ':capital_info'        => json_encode($country['capitalInfo']['latlng'] ?? [], JSON_UNESCAPED_UNICODE),
        ':borders'             => json_encode($country['borders'] ?? [], JSON_UNESCAPED_UNICODE),
        ':gini'                => json_encode($country['gini'] ?? [], JSON_UNESCAPED_UNICODE),
        ':postal_code_format'  => $country['postalCode']['format'] ?? null,
        ':postal_code_regex'   => $country['postalCode']['regex'] ?? null,
    ]);
}

echo "Insertion terminée avec succès.";
?>
