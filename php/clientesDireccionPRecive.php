<?php

header("Content-type:application/json");
  
require_once("Coneccion.php");
require_once("constants.php");

$con = new Coneccion();
$constants = new constants();
$queryS = $_GET["id"];
$array2 = array();

if ($queryS === null or empty($queryS)){
  echo json_encode($constants->operationError);
} else {
  $queryTBD = 'SELECT id, precive, sucursal, estado FROM clientesprecive WHERE id_cliente = '.$queryS.' and estado = '.$constants->estadoActivo.' and sucursal = '.$constants->sucursalActual;
  $result = $con->query($queryTBD,array("id", "precive", "sucursal", "estado"));
  echo json_encode($result);
}

$con->coseConnection();
?>