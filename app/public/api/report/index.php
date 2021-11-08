<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
    ref, 
    gameId, 
    -- MAX(salary) AS maxSalary, 
    COUNT(gameId) AS DateCount
FROM gameAssign LEFT OUTER JOIN games ON gameAssign.gameId = games.id
-- FROM gameAssign RIGHT OUTER JOIN reffs ON gameAssign.ref = reffs.rname
-- WHERE edate > CURRENT_DATE AND sdate < CURRENT_DATE
GROUP BY ref
ORDER BY ref';

$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');

    echo "Referee-Username,Game,DateCount\r\n";

    foreach($offers as $o) {
        echo "\"".$o['ref'] ."\","
            .$o['gameId'] .','
            // .$o['maxSalary'] .','
            .$o['DateCount'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
