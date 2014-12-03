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
  $unidad = $_GET["unidad"];
  $merma = $_GET["merma"];
  $precio = $_GET["precio"];
  $minimo= $_GET["minimo"];
  $barras = $_GET["barras"];
  $invertida = $_GET["invertida"];
  $notas = $con->escapeStringForQuery($_GET["notas"]);
  
  $recetaProducto = array();
  $recetaCandidad = array();
  $recetaMerma = array();
    
  for ($i = 0; $i <= 100; $i++) {
    if ($_GET["recetaProducto".$i] === null or empty($_GET["recetaProducto".$i])){
      $i = 120;
    } else {
      $recetaProducto["recetaProducto".$i] = $con->escapeStringForQuery($_GET["recetaProducto".$i]);
    }
  }
  
  for ($i = 0; $i <= 100; $i++) {
    if ($_GET["recetaCandidad".$i] === null or empty($_GET["recetaCandidad".$i])){
      $i = 120;
    } else {
      $recetaCandidad["recetaCandidad".$i] = $_GET["recetaCandidad".$i];
    }
  }
   
  for ($i = 0; $i <= 100; $i++) {
    if ($_GET["recetaMerma".$i] === null){
      $i = 120;
    } else {
      $recetaMerma["recetaMerma".$i] = $_GET["recetaMerma".$i];
    }
  }
  
  $warning = false;
  
  $queryString = "INSERT INTO ".$constants->prodctosTableName." (id, descripcion, medida, merma_transporte, precio, minimo, barras, receta_invertida, nota, sucursal, estado) VALUES (NULL, '".$descripcion."', '".$unidad."', '".$merma."', '".$precio."', '".$minimo."', '".$barras."', '".$invertida."', '".$notas."',  '".$constants->sucursalActual."', '".$constants->estadoActivo."')";
  
  if ($con->insert($queryString)){
    
    $lastIDCliente = $con->getLastInserID();
    
    if ($lastIDCliente == 0){
      echo $constants->operationError;
    } else {
      
      $con->insetActionLog($usuario, $constants->prodctosTableName, $lastIDCliente, $constants->operacionGeneralInsercion);
      
      if (count($recetaProducto) > 0){
        
        $queryString = "INSERT INTO ".$constants->prodctosRecetaTableName." (id, id_producto, id_producto_receta, cantidad, merma, sucursal, estado) VALUES ";
        
        
        
        for ($i = 0; $i <= 100; $i++) {
          
          $recetaCandidads = "";
          if (array_key_exists("recetaCandidad".$i, $recetaCandidad) and isset($recetaCandidad["recetaCandidad".$i])) {
            $recetaCandidads = $recetaCandidad["recetaCandidad".$i];
          
            $queryString = $queryString.
            " (NULL, '".$lastIDCliente."', '". $recetaProducto["recetaProducto".$i]."', '".$recetaCandidads."', '".$recetaMerma["recetaMerma".$i]."', '".$constants->sucursalActual."', '".$constants->estadoActivo."'),";
            
          } else {
            $i = 120;
          }
          
          
        }
        $queryString = rtrim($queryString, ",");
        if (!$con->insert($queryString)){
          $warning = true;
        } else {
          $lastID = $con->getLastInserID();
          if ($lastID != 0){
            $con->insetActionLog($usuario, $constants->prodctosRecetaTableName, $lastID, $constants->operacionGeneralInsercion);
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