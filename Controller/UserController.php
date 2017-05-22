<?php
    require_once "../Logic/LogicLogin.php";
    require_once "../Domain/User.php";
	
	if(isset($_REQUEST["consulta"])){
		
		switch ($_REQUEST["consulta"]) {
			
			case 'validarLogin':
				
				$logicLogin = new LogicLogin();
				echo $logicLogin->validarUsuario($_REQUEST["correo"], $_REQUEST["pass"]);
				
				break;
			case 'getListEmployees':
				$logicLogin = new LogicLogin();
				echo $logicLogin->getListEmployees();
				break;
			case 'update_employee':
				$logicLogin = new LogicLogin();
				
				if(isset($_REQUEST['id']) && isset($_REQUEST['email']) && isset($_REQUEST['password'])){
					echo $logicLogin->updateEmployee(new User($_REQUEST['id'],0,$_REQUEST['email'],$_REQUEST['password']));
				}
				break;
			case 'delete_employee':
				$logicLogin = new LogicLogin();
				
				if(isset($_REQUEST['id'])){
					echo $logicLogin->deleteEmployee($_REQUEST['id']);
				}
				break;
			case 'add_employee':
				$logicLogin = new LogicLogin();
				
				if(isset($_REQUEST['email']) && isset($_REQUEST['password'])){
					echo $logicLogin->addUser(new User(0,0,$_REQUEST['email'],$_REQUEST['password']));
				}
				break;
			default:
				echo "Error inesperado, intente más tarde :(";
				break;
		}
	}
?>