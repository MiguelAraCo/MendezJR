<?php


header("Content-type:application/json");
require_once("Coneccion.php");

$con = new Coneccion();
if ($con->isConnectionUp()){
  
  //$con->insert('INSERT INTO entries (guestName, content) VALUES ("10", "test10"), ("11", "test11")');
  $result = $con->query('SELECT * FROM entries',array("guestName", "content"));
  echo json_encode($result);
  $con->coseConnection();
} else {
  
}

?>