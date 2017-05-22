<?php 

require_once "Conexion.php";
class DataAppointment{

        var $conexion;
        
        function __construct(){
            $mysqli = new Data();
            $this->conexion = $mysqli->getConexion();
        }

    public function getListAppointments($id){
        $sentencia = $this->conexion->stmt_init();
        $sentencia->prepare("CALL paGetAppointments(?);");

        $sentencia->bind_param("s",$id);
        $sentencia->execute(); 
        $sentencia->bind_result($id, $user_id, $create_at,$date);

        $appointments = array();

        while($sentencia->fetch()){
            array_push($appointments, array("id"=>$id, "user_id"=>$user_id, "create_at"=>$create_at,"date"=>$date));
        }

        $sentencia->close();
        mysqli_close($this->conexion);

        return $appointments;
    }
    public function updateAppointment($appointment){
        $resultado=0;
        $sentencia = $this->conexion->stmt_init();
        $sentencia->prepare("CALL paUpdateAppointment(?,?,?,?);");   

        $id = $appointment->getId();
        $user_id = $appointment->getUserId();
        $created_at = $appointment->getCreatedAt();
        $date = $appointment->getDate();

        $sentencia->bind_param("ssss",$id,$user_id, $created_at,$date);
        $sentencia->execute(); 

        $afectados= mysqli_affected_rows($this->conexion);

        if($afectados>0){
            $resultado=1;
        }

        $sentencia->close();
        mysqli_close($this->conexion);

        return $resultado;
    }

    public function deleteAppointment($idAppointment){
        $resultado=0;
        $sentencia = $this->conexion->stmt_init();
        $sentencia->prepare("CALL paDeleteAppointment(?);");   

        $id = $idAppointment;

        $sentencia->bind_param("s",$id);
        $sentencia->execute(); 

        $afectados= mysqli_affected_rows($this->conexion);

        if($afectados>0){
            $resultado=1;
        }

        $sentencia->close();
        mysqli_close($this->conexion);

        return $resultado;
    }
    public function addAppointment($appointment){
        $resultado=0;
        
            try{
                $sentencia = $this->conexion->stmt_init();
                $sentencia->prepare("CALL paAddAppointment(?,?,?);"); 

                $user_id = $appointment->getUserId();
                $created_at = $appointment->getCreatedAt();
                $date = $appointment->getDate();

                $sentencia->bind_param("sss",$user_id,$created_at, $date);
                $sentencia->execute(); 
                $sentencia->bind_result($id);

                while($sentencia->fetch()){
                    $resultado=$id;
                }

                      
            }catch(mysqli_sql_exception $e){
               $resultado=0;
            }  

             return $resultado;;
    }
}
?>