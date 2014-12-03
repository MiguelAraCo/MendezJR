<?php

class constants{

  public $noDBJSON = array( "error" => "no DB connection");
  public $operationError = array( "error" => "Query error");
  public $operationWarning = array( "warning" => "Query error");
  public $operationSuccess = array( "success" => "ok");
  public $sucursalActual = "1";
  public $estadoActivo = "1";
  public $estadoInactivo = "0";
  public $operacionGeneralInsercion = "insercion";
  public $operacionGeneralActualizacion = "actualizacion";
  public $operacionGeneralDelete = "delete";
  //Clientes
  public $clienteCreditoCerradoFalse = "0";
  public $clientesTableName = "clientes";
  public $clientesdentregaTableName = "clientesdentrega";
  public $clientespreciveTableName = "clientesprecive";
  //Proveedores
  public $proveedoresTableName = "proveedores";
  //Productos
  public $prodctosTableName = "productos";
  public $prodctosRecetaTableName = "receta";
  //Alamacenes
  public $almacenesTableName = "almacenes";
  //Bancos
  public $bancosTableName = "bancos";
  //Ventas
  public $ventasTableName = "venta";
  public $detalleVentas = "detalle_venta";
  
  public function __construct(){
    
  }
  
  public function validateStringEntries(){
    
  }
  
}


?>