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
  
  $queryTBD = "SELECT ".$prodctosTableName->detalleVentas.".id, venta, producto, ".$prodctosTableName->ventasTableName.".descripcion descripcionproducto, almacen, ".$prodctosTableName->almacenesTableName.".descripcion descripcionalmacen, unidad, cantidad, precio_unitario, total, observaciones, ".$prodctosTableName->detalleVentas.".sucursal, ".$prodctosTableName->detalleVentas.".estado FROM ".$prodctosTableName->detalleVentas." LEFT join ".$prodctosTableName->ventasTableName." on ".$prodctosTableName->detalleVentas.".producto = ".$prodctosTableName->ventasTableName.".id LEFT join ".$prodctosTableName->almacenesTableName." on ".$prodctosTableName->detalleVentas.".almacen = ".$prodctosTableName->almacenesTableName.".id WHERE ".$prodctosTableName->detalleVentas.".venta = '".queryS."' ";
  
  
  $result = $con->query($queryTBD,array("id", "venta", "producto", "descripcionproducto", "almacen", "descripcionalmacen", "unidad", "cantidad", "precio_unitario", "total", "observaciones", "sucursal", "estado"));

  echo json_encode($result);
}

$con->coseConnection();
?>
