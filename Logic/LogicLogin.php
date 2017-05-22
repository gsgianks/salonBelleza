<?php 
	include_once("../Data/DataUser.php");
	
	class LogicLogin{
		var $dataLogin;

		function __construct(){
        	$this->dataLogin = new DataUser();
    	}

		public function validarUsuario($correo, $contrasenia){
			$datosUsuario = array();
			
			if($this->esCorreo($correo) && !empty(trim($contrasenia))){
				$datosUsuario = $this->dataLogin->validarLogin($correo, $contrasenia);

				if(count($datosUsuario) > 0){
					$this->crearSession($datosUsuario);
				}else{
					 array_push($datosUsuario, array("id"=>0));
					 
				}
			}
			return json_encode($datosUsuario);
		}

		public function getListEmployees(){
			return json_encode($this->dataLogin->getListEmployees());
		}

		public function updateEmployee($employee){
			return $this->dataLogin->updateEmployee($employee);
		}

		public function deleteEmployee($idEmployee){
			return $this->dataLogin->deleteEmployee($idEmployee);
		}
		public function addUser($employee){
			return $this->dataLogin->addUser($employee);
		}

		public function esCorreo($corero){
			$respuesta = false;

			if (filter_var($corero, FILTER_VALIDATE_EMAIL)) {
				$respuesta = true;
			}

			return $respuesta;
		}  

		public function crearSession($datosUsuario){
			session_start();
			$_SESSION["id"] = $datosUsuario[0]["id"];
			$_SESSION["role"] = $datosUsuario[0]["role"];
			$_SESSION["email"] = $datosUsuario[0]["email"];
			$_SESSION["password"] = $datosUsuario[0]["password"];
		}
	}
?>