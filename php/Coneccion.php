<?php

class Coneccion{

  private $con;

  public function __construct(){

    $this->con=mysqli_connect("localhost","mendezjr_admin","5SM83uoz2a","mendezjr_sistema") or die($this->getDieError("Coneccion"));
    if (mysqli_connect_errno()) {
      $this->con = null;
    }
  }

  public function isConnectionUp(){
    return $this->con!=null;
  }

  public function coseConnection(){
    if ($this->con!=null){
      mysqli_close($this->con);
    }
  }

  public function query($query, $arr){
    $results = array();
    $result = mysqli_query($this->con,$query) or die($this->getDieError($query));
    if ($result==false) {
      $this->con = null;
      $obj = new stdClass();
      $obj->error=mysqli_connect_error();
      $results[] = $obj;
      return $results;
    } else {
      while($row = mysqli_fetch_array($result)) {
        $obj = new stdClass();
        foreach ($arr as $k => $v){
          $obj->$v=$row[$v];
        }
        $results[] = $obj;
      }
      return $results;
    }
  }

  public function queryExportCSV($query){

    $output = "";
    $sql = mysqli_query($this->con,$query) or die($this->getDieError($query));
    $columns_total = $sql->field_count;

    // Get The Field Name

    while ($property = mysqli_fetch_field($sql)) {
      $output .= '"'.$property->name.'",';
    }
    $output .="\n";

    // Get Records from the table

    while ($row = mysqli_fetch_array($sql)) {
      for ($i = 0; $i < $columns_total; $i++) {
        $output .='"'.$row["$i"].'",';
      }
      $output .="\n";
    }

    return $output;
  }

  public function getLastInserID(){
    return mysqli_insert_id($this->con);
  }

  public function insert($query){
    return mysqli_query($this->con,$query) or die($this->getDieError($query));
  }

  public function escapeStringForQuery($value){
    return mysqli_real_escape_string($this->con, $value);
  }


  public function insetActionLog($usuario, $tabla, $idTabla, $operacion){
    $this->insert("INSERT INTO actionlog (id, usuario, tabla, idexterno, accion, actiontime) VALUES (NULL, '".$usuario."', '".$tabla."', '".$idTabla."', '".$operacion."', CURRENT_DATE())");
  }

  public function delete(){

  }

  public function getDieError($query){
    $errorvar = array( "error" => "Error " . mysqli_error($this->con) . " " . $query);
    return json_encode($errorvar);
  }

}

?>