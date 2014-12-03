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
  $compartida = $_GET["compartida"];
  $default = $_GET["default"];
  $notas = $con->escapeStringForQuery($_GET["notas"]);
  
  $warning = false;
  
  $queryString = "update ".$constants->almacenesTableName." set descripcion = '".$descripcion."', compartida = '".$compartida."', alamacen_default = '".$default."', notas = '".$notas."' where id='".$id."'";
  
  if ($con->insert($queryString)){
      
      $con->insetActionLog($usuario, $constants->almacenesTableName, $id, $constants->operacionGeneralActualizacion);
      echo json_encode($constants->operationSuccess);
      
  } else {
    echo json_encode($constants->operationError);
  }
  
} else {
  echo json_encode($constants->noDBJSON);
}
$con->coseConnection();

?>