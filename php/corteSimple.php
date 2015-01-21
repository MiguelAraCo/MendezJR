<?php

header('Content-type: application/csv');
header('Content-Disposition: attachment; filename=corte.csv');

require_once("Coneccion.php");
require_once("constants.php");

$con = new Coneccion();
$constants = new constants();

if ($con->isConnectionUp()){

  $output = $con->queryExportCSV("SELECT venta.id as venta_numero, clientes.nombre as cliente, venta.factura, venta.tipo_pago, venta.documento_pago, bancos.descripcion as banco, venta.cliente_envio as direccion_de_envio, venta.cliente_recive as recibe_producto, venta.cantidad_recivida as recibio_cajero, venta.total, venta.fecha FROM venta LEFT JOIN clientes ON venta.cliente = clientes.id LEFT JOIN bancos ON venta.banco = bancos.id where DATE(venta.fecha) = CURDATE()");
  echo $output;
}

$con->coseConnection();

?>