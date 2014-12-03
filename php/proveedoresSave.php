<?php

header("Content-type:application/json");
require_once("Coneccion.php");
require_once("constants.php");
$con = new Coneccion();
$constants = new constants();

if ($con->isConnectionUp()){
  
  $usuario = $_GET["usuario"];
  $nombre = $con->escapeStringForQuery($_GET["nombre"]);
  $direccion = $con->escapeStringForQuery($_GET["direccion"]);
  $telefono = $con->escapeStringForQuery($_GET["telefono"]);
  $rfc = $_GET["rfc"];
  $limite= $_GET["limite"];
  $periodo = $_GET["periodo"];
  $periodoa = $_GET["periodoa"];
  $pagos = $_GET["pagos"];
  $cerrado = $_GET["cerrado"];
  $notas = $con->escapeStringForQuery($_GET["notas"]);
  
  $warning = false;
  
  $queryString = "INSERT INTO ".$constants->proveedoresTableName." (id, nombre, direccion, telefono, rfc, credito_limite, credito_periodo, credito_periodicidad, credito_pagos, credito_cerrado, nota, sucursal, estado) VALUES (NULL, '".$nombre."', '".$direccion."', '".$telefono."', '".$rfc."', '".$limite."', '".$periodo."', '".$periodoa."', '".$pagos."', '".$cerrado."', '".$notas."', '".$constants->sucursalActual."', '".$constants->estadoActivo."')";
  
  if ($con->insert($queryString)){
    
    $lastIDCliente = $con->getLastInserID();
    
    if ($lastIDCliente == 0){
      echo $constants->operationError;
    } else {
      $con->insetActionLog($usuario, $constants->proveedoresTableName, $lastIDCliente, $constants->operacionGeneralInsercion);
      echo json_encode($constants->operationSuccess);
    }
  } else {
    echo json_encode($constants->operationError);
  }
  
} else {
  echo json_encode($constants->noDBJSON);
}
$con->coseConnection();

?>