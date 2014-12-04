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

  $queryTBD = "SELECT ".$constants->detalleVentas.".id, venta, producto, ".$constants->prodctosTableName.".descripcion descripcionproducto, almacen, ".$constants->almacenesTableName.
    ".descripcion descripcionalmacen, unidad, cantidad, precio_unitario, total, observaciones, ".$constants->detalleVentas.".sucursal, ".$constants->detalleVentas.".estado FROM ".$constants->detalleVentas." LEFT join ".$constants->prodctosTableName." on "
    .$constants->detalleVentas.".producto = ".$constants->prodctosTableName.".id LEFT join ".$constants->almacenesTableName." on ".$constants->detalleVentas.".almacen = ".$constants->almacenesTableName.".id WHERE ".$constants->detalleVentas.".venta = '".$queryS."' ";


  $result = $con->query($queryTBD,array("id", "venta", "producto", "descripcionproducto", "almacen", "descripcionalmacen", "unidad", "cantidad", "precio_unitario", "total", "observaciones", "sucursal", "estado"));

  echo json_encode($result);
}

$con->coseConnection();
?>
