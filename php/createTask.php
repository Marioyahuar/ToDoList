<?php

include('connect.php');

try 
{
    $dbh = new PDO('mysql:host='. $hostname .';dbname='. $database, $username, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->beginTransaction();
       
    $_detalle = $_POST['detalle'];
    $_usuario = $_POST['usuario'];
    $_listo = $_POST['listo'];
    
    $sth = $dbh->prepare("INSERT INTO `Tareas` (`Detalle`, `Usuario`, `Listo`) VALUES (:detalle, :usuario, :listo)");
    $sth->bindParam(':detalle', $_detalle, PDO::PARAM_STR); //STR = string = varchar
    $sth->bindParam(':usuario', $_usuario, PDO::PARAM_STR);
    $sth->bindParam(':listo', $_listo, PDO::PARAM_INT); //INT = entero = numero
    
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