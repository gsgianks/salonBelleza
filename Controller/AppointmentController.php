<?php
    require_once "../Logic/LogicAppointment.php";
    require_once "../Domain/Appointment.php";
	
	if(isset($_REQUEST["consulta"])){
		
		switch ($_REQUEST["consulta"]) {
				
			case 'getListAppointments':
				$logicAppointment = new LogicAppointment();
				if(isset($_REQUEST['id'])){
					echo $logicAppointment->getListAppointments($_REQUEST['id']);
				}
				
				break;
			case 'update_appointment':
				$logicAppointment = new LogicAppointment();
				
				if(isset($_REQUEST['id']) && isset($_REQUEST['user_id']) && isset($_REQUEST['create_at'])&& isset($_REQUEST['date'])){
					echo $logicAppointment->updateAppointment(new Appointment($_REQUEST['id'],$_REQUEST['user_id'],$_REQUEST['create_at'],$_REQUEST['date']));
				}
				break;
			case 'delete_appointment':
				$logicAppointment = new LogicAppointment();
				
				if(isset($_REQUEST['id'])){
					echo $logicAppointment->deleteAppointment($_REQUEST['id']);
				}
				break;
			case 'add_appointment':
				$logicAppointment = new LogicAppointment();
				
				if(isset($_REQUEST['user_id']) && isset($_REQUEST['create_at'])&& isset($_REQUEST['date'])){
					echo $logicAppointment->addAppointment(new Appointment(0,$_REQUEST['user_id'],$_REQUEST['create_at'],$_REQUEST['date']));
				}
				break;
			default:
				echo "Error inesperado, intente más tarde :(";
				break;
		}
	}
?>