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
  
  $id = $_GET["id"];
  $usuario = $_GET["usuario"];
  $descripcion = $con->escapeStringForQuery($_GET["descripcion"]);
  $banco = $con->escapeStringForQuery($_GET["banco"]);
  $banco_sucursal = $con->escapeStringForQuery($_GET["sucursal"]);
  $cuenta = $con->escapeStringForQuery($_GET["cuenta"]);
  $clabe = $con->escapeStringForQuery($_GET["clabe"]);
  $chequera = $_GET["chequera"];
  $tarjeta = $_GET["tarjeta"];
  $banco_default = $_GET["default"];
  $notas = $con->escapeStringForQuery($_GET["notas"]);
  
  $warning = false;
  
  $queryString = "update ".$constants->bancosTableName." set descripcion = '".$descripcion."', banco = '".$banco."', banco_sucursal = '".$banco_sucursal."', cuenta = '".$cuenta."', clabe = '".$clabe."', chequera = '".$chequera."', tarjeta = '".$tarjeta."', banco_default = '".$banco_default."', notas = '".$notas."' where id='".$id."'";
  
  if ($con->insert($queryString)){
      
      $con->insetActionLog($usuario, $constants->bancosTableName, $id, $constants->operacionGeneralActualizacion);
      echo json_encode($constants->operationSuccess);
      
  } else {
    echo json_encode($constants->operationError);
  }
  
} else {
  echo json_encode($constants->noDBJSON);
}
$con->coseConnection();

?>