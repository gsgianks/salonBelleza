<?php

class Data extends mysqli {

  private $conexion;

  public function Data() {
    try{
     
      $this->conexion = new mysqli('localhost', 'root', '', 'dbsalonbelleza') or die("Error de conexion!");
    }catch (mysqli_sql_exception $e){
      $mensaje = "Error de conexión a la base de datos.\nSi desea, vaya al inicio e intente de nuevo o ingrese mas tarde.";
      throw $e;
    }
  }

  public function recorrer($query) {
    return mysqli_fetch_array($query);
  }

  public function getConexion(){
    return $this->conexion;
  }

}
?>