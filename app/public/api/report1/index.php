<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
    gameId, 
    -- games.gdate, 
    COUNT(gameAssign.stat) AS unas 
    FROM gameAssign LEFT OUTER JOIN games ON gameAssign.gameId = games.id 
    WHERE gameAssign.stat = "Unassigned"
    --  AND games.gdate < CURRENT_DATE
    GROUP BY gameId';
// GROUP BY games.gname

$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');

    echo "Game Name,Game Date,Unassigned Count\r\n";

    foreach($offers as $o) {
        echo "\"".$o['gameId'] ."\","
            // .$o['games.gdate'] .','
            // .$o['maxSalary'] .','
            .$o['unas'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
