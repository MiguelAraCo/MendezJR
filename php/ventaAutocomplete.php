<?php

header("Content-type:application/json");

require_once("Coneccion.php");
require_once("constants.php");

$con = new Coneccion();
$constants = new constants();
$queryS = $_GET["term"];
$array2 = array();

if ($queryS === null or empty($queryS)){
  echo json_encode($constants->operationError);
} else {

  $queryTBD = "SELECT ".$constants->ventasTableName.".id, ".$constants->ventasTableName.".id label, ".$constants->ventasTableName.".cliente, ".$constants->clientesTableName.".nombre, "
    .$constants->clientesTableName.".rfc, ".$constants->clientesTableName.".credito_limite, ".$constants->ventasTableName.".factura, "
    .$constants->ventasTableName.".tipo_pago, ".$constants->ventasTableName.".documento_pago, ".$constants->ventasTableName.".banco, ".$constants->bancosTableName.".descripcion, ".$constants->ventasTableName.".cliente_envio, "
    .$constants->ventasTableName.".cliente_recive, ".$constants->ventasTableName.".cantidad_recivida, ".$constants->ventasTableName.".total, ".$constants->ventasTableName.".sucursal, ".$constants->ventasTableName.".estado FROM "
    .$constants->ventasTableName." LEFT join ".$constants->clientesTableName." on ".$constants->ventasTableName.".cliente = ".$constants->clientesTableName.".id LEFT join ".$constants->bancosTableName." on ".$constants->ventasTableName.".banco = "
    .$constants->bancosTableName.".id WHERE ".$constants->ventasTableName.".id like '%".$queryS."%' ";

  $result = $con->query($queryTBD,array("id", "cliente", "nombre", "rfc", "credito_limite", "label", "factura", "tipo_pago", "documento_pago", "banco", "descripcion", "cliente_envio", "cliente_recive", "cantidad_recivida", "total", "sucursal", "estado"));

  echo json_encode($result);
}

$con->coseConnection();
?>