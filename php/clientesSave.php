<?php

header("Content-type:application/json");
  
require_once("Coneccion.php");
require_once("constants.php");

// print_r($_GET);
// if($_GET["a"] === "") echo "a is an empty string\n";
// if($_GET["a"] === false) echo "a is false\n";
// if($_GET["a"] === null) echo "a is null\n";
// if(isset($_GET["a"])) echo "a is set\n";
// if(!empty($_GET["a"])) echo "a is not empty";

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
  
  $entregaArray = array();
  $preciveArray = array();
    
  for ($i = 0; $i <= 100; $i++) {
    if ($_GET["dentrega".$i] === null or empty($_GET["dentrega".$i])){
      $i = 120;
    } else {
      $entregaArray["dentrega".$i] = $con->escapeStringForQuery($_GET["dentrega".$i]);
    }
  }
  
  for ($i = 0; $i <= 100; $i++) {
    if ($_GET["precive".$i] === null or empty($_GET["precive".$i])){
      $i = 120;
    } else {
      $preciveArray["precive".$i] = $con->escapeStringForQuery($_GET["precive".$i]);
    }
  }
  
  $warning = false;
  
  $queryString = "INSERT INTO clientes (id, nombre, direccion, telefono, rfc, credito_limite, credito_periodo, credito_periodicidad, credito_pagos, credito_cerrado, nota, sucursal, estado) VALUES (NULL, '".$nombre."', '".$direccion."', '".$telefono."', '".$rfc."', '".$limite."', '".$periodo."', '".$periodoa."', '".$pagos."', '".$cerrado."', '".$notas."', '".$constants->sucursalActual."', '".$constants->estadoActivo."')";
  
  if ($con->insert($queryString)){
    
    $lastIDCliente = $con->getLastInserID();
    
    if ($lastIDCliente == 0){
      echo $constants->operationError;
    } else {
      
      $con->insetActionLog($usuario, $constants->clientesTableName, $lastIDCliente, $constants->operacionGeneralInsercion);
      
      if (count($entregaArray) > 0){
        $queryString = "INSERT INTO clientesdentrega (id, id_cliente, dentrega, sucursal, estado) VALUES ";
        foreach ($entregaArray as $key => $value){
          $queryString = $queryString.
            " (NULL, '".$lastIDCliente."', '".$value."', '".$constants->sucursalActual."', '".$constants->estadoActivo."'),";
        }
        $queryString = rtrim($queryString, ",");
        if (!$con->insert($queryString)){
          $warning = true;
        } else {
          $lastID = $con->getLastInserID();
          if ($lastID != 0){
            $con->insetActionLog($usuario, $constants->clientesdentregaTableName, $lastID, $constants->operacionGeneralInsercion);
          }
        }
      }
      
      if (count($preciveArray) > 0){
        $queryString = "INSERT INTO clientesprecive (id, id_cliente, precive, sucursal, estado) VALUES ";
        foreach($preciveArray as $key => $value){
          $queryString = $queryString.
            " (NULL, '".$lastIDCliente."', '".$value."', '".$constants->sucursalActual."', '".$constants->estadoActivo."'),";
        }
        $queryString = rtrim($queryString, ",");
        if (!$con->insert($queryString)){
          $warning = true;
        } else {
          $lastID = $con->getLastInserID();
          if ($lastID != 0){
            $con->insetActionLog($usuario, $constants->clientespreciveTableName, $lastID, $constants->operacionGeneralInsercion);
          }
        }
        
      }
      
      
      if ($warning){
        echo json_encode($constants->operationWarning);
      } else {
        echo json_encode($constants->operationSuccess);
      }
      
    }
  } else {
    echo json_encode($constants->operationError);
  }
  
} else {
  echo json_encode($constants->noDBJSON);
}
$con->coseConnection();

?>