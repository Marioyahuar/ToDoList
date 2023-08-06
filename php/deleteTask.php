<?php

include('connect.php');

try 
{
    $dbh = new PDO('mysql:host='. $hostname .';dbname='. $database, $username, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->beginTransaction();
       
    $_id= $_POST['id'];

    $sth = $dbh->prepare("UPDATE `Tareas` SET `Active`=0 WHERE `ID` = :id");
    $sth->bindParam(':id', $_id, PDO::PARAM_STR); 
    
    $sth->execute(); 
    $dbh->commit();

    $response = array('success' => true, 'message' => 'Tarea creada exitosamente');
    echo json_encode($response);
}
catch(PDOException $e)
{
	$response = array('success' => false, 'error' => 'Error al crear la tarea: ' . $e->getMessage());
    echo json_encode($response);
}
   
?>