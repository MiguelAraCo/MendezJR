<?php

header("Content-type:application/json");
  
require_once("Coneccion.php");
require_once("constants.php");

$con = new Coneccion();
$constants = new constants();
$queryS = $_GET["term"];
$array2 = array();

if ($queryS === null or empty($queryS)){
  echo json_encode($constants->operationError);
} else {
  $queryTBD = 'SELECT id, nombre as label, nombre as value, direccion, telefono, rfc, credito_limite, credito_periodo, credito_periodicidad, credito_pagos, credito_cerrado, nota, sucursal, estado FROM '.$constants->proveedoresTableName.' where nombre like "%'.$queryS.'%" and estado = '.$constants->estadoActivo.' and sucursal = '.$constants->sucursalActual;
  
  $result = $con->query($queryTBD,array("id", "label", "value", "direccion", "telefono", "rfc", "credito_limite", "credito_periodo", "credito_periodicidad", "credito_pagos", "credito_cerrado", "nota", "sucursal", "estado"));

  echo json_encode($result);
}

$con->coseConnection();
?>