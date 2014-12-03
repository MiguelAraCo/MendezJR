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
  
  $queryTBD = 'SELECT a.id, b.descripcion, a.id_producto, a.id_producto_receta, a.cantidad, a.merma, a.sucursal, a.estado FROM receta a, productos b WHERE a.id_producto_receta = b.id and a.id_producto  = '.$queryS.' and a.estado = '.$constants->estadoActivo.' and a.sucursal = '.$constants->sucursalActual;
  $result = $con->query($queryTBD,array("id", "descripcion", "id_producto", "id_producto_receta", "cantidad", "merma"));
  echo json_encode($result);
}

$con->coseConnection();
?>