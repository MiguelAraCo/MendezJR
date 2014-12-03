<?php

header("Content-type:application/json");
require_once("Coneccion.php");
require_once("constants.php");
$con = new Coneccion();
$constants = new constants();

if ($con->isConnectionUp()){
  
  $id = $_GET["id"];
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
  
  $queryString = "update ".$constants->proveedoresTableName." set nombre='".$nombre."', direccion='".$direccion."', telefono='".$telefono."', rfc='".$rfc."', credito_limite='".$limite."', credito_periodo='".$periodo."', credito_periodicidad='".$periodoa."', credito_pagos='".$pagos."', credito_cerrado='".$cerrado."', nota='".$notas."' where id='".$id."'";
  
  if ($con->insert($queryString)){
    
    $con->insetActionLog($usuario, $constants->proveedoresTableName, $id, $constants->operacionGeneralActualizacion);
    echo json_encode($constants->operationSuccess);
      
    
  } else {
    echo json_encode($constants->operationError);
  }
  
} else {
  echo json_encode($constants->noDBJSON);
}

$con->coseConnection();
?>