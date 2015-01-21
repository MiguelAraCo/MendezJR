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

  $total = $_GET["total"];
  $cliente = $_GET["cliente"];
  $factura = $_GET["factura"];
  $envio = $con->escapeStringForQuery($_GET["envio"]);
  $recive = $con->escapeStringForQuery($_GET["recive"]);
  $tipo_pago = $_GET["tipo_pago"];
  $documento_pago = $_GET["documento_pago"];
  $cantidad = $_GET["cantidad"];
  $cambio = $_GET["cambio"];
  $banco = $_GET["banco"];

  $detalleArray = array();
  $cele = 0;
  for ($i = 0; $i <= 100; $i++) {
    if ($_GET["detalleproducto".$i] === null or empty($_GET["detalleproducto".$i])){
      $i = 120;
    } else {
      $detalleArray["detalleproducto".$i] = $_GET["detalleproducto".$i];
      $detalleArray["detallealmacen".$i] = $_GET["detallealmacen".$i];
      $detalleArray["detalleunidad".$i] = $_GET["detalleunidad".$i];
      $detalleArray["detallecantidad".$i] = $_GET["detallecantidad".$i];
      $detalleArray["detallepu".$i] = $_GET["detallepu".$i];
      $detalleArray["detalletotal".$i] = $_GET["detalletotal".$i];
      $detalleArray["detalleobs".$i] = $con->escapeStringForQuery($_GET["detalleobs".$i]);
      $cele++;
    }
  }


  $warning = false;


  $queryString = "INSERT INTO ".$constants->ventasTableName." (id, cliente, factura, tipo_pago, documento_pago, banco, cliente_envio, cliente_recive, cantidad_recivida, total, sucursal, estado) VALUES (NULL,'". $cliente ."', '". $factura ."', '". $tipo_pago ."', '". $documento_pago."', '". $banco ."', '". $envio ."', '". $recive ."', '". $cantidad ."', '". $total ."', '".$constants->sucursalActual."', '".$constants->estadoActivo."')";


  if ($con->insert($queryString)){
    $lastIDCliente = $con->getLastInserID();
    if ($lastIDCliente == 0){
      echo $constants->operationError;
    } else {
      $con->insetActionLog($usuario, $constants->ventasTableName, $lastIDCliente, $constants->operacionGeneralInsercion);

      if ($cele > 0){

        $queryString = "INSERT INTO ".$constants->detalleVentas." (id, venta, producto, almacen, unidad, cantidad, precio_unitario, total, observaciones, sucursal, estado) VALUES ";
        for ($i = 0; $i < $cele; $i++) {
          $queryString = $queryString.
            " (NULL,'".$lastIDCliente."','".$detalleArray["detalleproducto".$i]."','".$detalleArray["detallealmacen".$i]."','".$detalleArray["detalleunidad".$i]."','".$detalleArray["detallecantidad".$i]
            ."','".$detalleArray["detallepu".$i]."','".$detalleArray["detalletotal".$i]."','".$detalleArray["detalleobs".$i]."', '".$constants->sucursalActual."', '".$constants->estadoActivo."'),";
        }
        $queryString = rtrim($queryString, ",");
        if (!$con->insert($queryString)){
          $warning = true;
        } else {
          $lastID = $con->getLastInserID();
          if ($lastID != 0){
            $con->insetActionLog($usuario, $constants->detalleVentas, $lastID, $constants->operacionGeneralInsercion);
          }
        }
      }


      if ($warning){
        echo json_encode($constants->operationWarning);
      } else {
        $copy = $constants->operationSuccess;
        $copy["id"] = $lastIDCliente;
        echo json_encode( $copy );
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