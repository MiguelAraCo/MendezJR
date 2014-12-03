
<?php
header("Content-type:application/json");
require_once("Coneccion.php");
require_once("constants.php");

$con = new Coneccion();
$constants = new constants();

$queryTBD = 'select id, descripcion from almacenes where alamacen_default = 1 and estado = '.$constants->estadoActivo.' limit 1';
$result = $con->query($queryTBD,array("id", "descripcion"));

echo json_encode($result);
$con->coseConnection();
?>

