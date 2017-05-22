<?php 
	include_once("../Data/DataAppointment.php");
	
	class LogicAppointment{
		var $dataAppointment;

		function __construct(){
        	$this->dataAppointment = new DataAppointment();
    	}

		public function getListAppointments($id){
			return json_encode($this->dataAppointment->getListAppointments($id));
		}

		public function updateAppointment($appointment){
			return $this->dataAppointment->updateAppointment($appointment);
		}

		public function deleteAppointment($idAppointment){
			return $this->dataAppointment->deleteAppointment($idAppointment);
		}
		public function addAppointment($appointment){
			return $this->dataAppointment->addAppointment($appointment);
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