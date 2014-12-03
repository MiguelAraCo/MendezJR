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
  $descripcion = $con->escapeStringForQuery($_GET["descripcion"]);
  $compartida = $_GET["compartida"];
  $default = $_GET["default"];
  $notas = $con->escapeStringForQuery($_GET["notas"]);
  
  
  $warning = false;
  
  $queryString = "INSERT INTO ".$constants->almacenesTableName." (id, descripcion, compartida, alamacen_default, notas, sucursal, estado) VALUES (NULL, '".$descripcion."', '".$compartida."', '".$default."', '".$notas."',  '".$constants->sucursalActual."', '".$constants->estadoActivo."')";
  
  if ($con->insert($queryString)){
    $lastIDCliente = $con->getLastInserID();
    if ($lastIDCliente == 0){
      echo $constants->operationError;
    } else {
      $con->insetActionLog($usuario, $constants->almacenesTableName, $lastIDCliente, $constants->operacionGeneralInsercion);
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