<?php 

require_once "Conexion.php";
class DataUser{

        var $conexion;
        
        function __construct(){
            $mysqli = new Data();
            $this->conexion = $mysqli->getConexion();
        }

        public function validarLogin($email, $contrasenia){
        $sentencia = $this->conexion->stmt_init();
        $sentencia->prepare("CALL paValidarLogin(?,?);");

        $sentencia->bind_param("ss",$email, $contrasenia);
        $sentencia->execute(); 
        $sentencia->bind_result($id, $role, $email, $password);
        $user = array();

        while($sentencia->fetch()){
            array_push($user, array("id"=>$id, "role"=>$role, "email"=>$email, "password"=>$password));
        }
            
        $sentencia->close();
        mysqli_close($this->conexion);
        return $user;
	}

    public function getListEmployees(){
        $sentencia = $this->conexion->stmt_init();
        $sentencia->prepare("CALL paGetEmployees();");

        $sentencia->execute(); 
        $sentencia->bind_result($id, $email, $password);

        $employees = array();

        while($sentencia->fetch()){
            array_push($employees, array("id"=>$id, "email"=>$email, "password"=>$password));
        }

        $sentencia->close();
        mysqli_close($this->conexion);

        return $employees;
    }
    public function updateEmployee($employee){
        $resultado=0;
        $sentencia = $this->conexion->stmt_init();
        $sentencia->prepare("CALL paUpdateEmployee(?,?,?);");   

        $id = $employee->getId();
        $email = $employee->getEmail();
        $pass = $employee->getPassword();

        $sentencia->bind_param("sss",$id,$email, $pass);
        $sentencia->execute(); 

        $afectados= mysqli_affected_rows($this->conexion);

        if($afectados>0){
            $resultado=1;
        }

        $sentencia->close();
        mysqli_close($this->conexion);

        return $resultado;
    }

    public function deleteEmployee($idEmployee){
        $resultado=0;
        $sentencia = $this->conexion->stmt_init();
        $sentencia->prepare("CALL paDeleteEmployee(?);");   

        $id = $idEmployee;

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
    public function addUser($employee){
        $resultado=0;
        
            try{
                $sentencia = $this->conexion->stmt_init();
                $sentencia->prepare("CALL paAddUser(?,?,?);"); 

                $role = $employee->getRole();
                $email = $employee->getEmail();
                $pass = $employee->getPassword();

                $sentencia->bind_param("sss",$role,$email, $pass);
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