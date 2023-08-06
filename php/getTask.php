<?php

include('connect.php');

try 
{
    $dbh = new PDO('mysql:host='. $hostname .';dbname='. $database, $username, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->beginTransaction();

    $userName = $_GET['userName'];
    
    $sth = $dbh->prepare('SELECT * FROM `Tareas` WHERE `Usuario` = :userName');
    $sth->bindParam(':userName', $userName, PDO::PARAM_STR);
    $sth->execute();

    $sth->setFetchMode(PDO::FETCH_ASSOC); 
    $result = $sth->fetchAll();
    
    if (count($result) >= 0 ) 
    {
        //print_r($result);
        echo json_encode($result);
    }
    else
    {
        echo 'no se encontro la tarea';
    }
    $dbh->commit();
}
catch(PDOException $e)
{
	echo "Error: " . $e->getMessage();
}
   
?>

