<?php

// if (($_SERVER['REQUEST_METHOD'] ?? '') != 'POST') {
//     header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed");
//     exit;
// }

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  // FIXXXX - add teams?
  'INSERT INTO games (gname, gfield, gdate, gtime, hteam, ateam)  
  VALUES (?, ?, ?, ?, ?, ?)' 
);

// ,glevel,ref1,stat1,ref2,stat2,ref3,stat3,ref4,stat4

$stmt->execute([
  //$_POST['id'],
  $_POST['gname'],
  $_POST['gfield'],
  $_POST['gdate'],
  $_POST['gtime'],
  $_POST['hteam'],
  $_POST['ateam'],
  // $_POST['glevel'],
  // $_POST['ref1'],
  // $_POST['stat1'],
  // $_POST['ref2'],
  // $_POST['stat2'],
  // $_POST['ref3'],
  // $_POST['stat3'],
  // $_POST['ref4'],
  // $_POST['stat4'],
  //FIXXX
  // $_POST['gdate'],
  // $_POST['gtime'],

]);

// Get auto-generated PK from DB
// https://www.php.net/manual/en/pdo.lastinsertid.php
// $pk = $db->lastInsertId();  

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it
header('HTTP/1.1 303 See Other');
header('Location: ../games/');