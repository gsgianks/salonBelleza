<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>LogIn</title>
	<link rel="stylesheet" href="css/estilo_general.css">
	<link rel="stylesheet" href="css/estilo_resposive.css">
	<link rel="stylesheet" href="css/fonts/style.css">
	<link rel="stylesheet" href="css/Roboto/WebFont/roboto_regular_macroman/stylesheet.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body class="body">
	<main class="login_main">
		<h1><i class="icon-key"></i>Bienvenido a Salón de Belleza</h1>
		<form class="formPregunta form_select_multiple" method="post" action="Controller/UserController.php">
		    <input type="hidden" name="consulta" value="update_employee" data-valueInput='selec_multi' data-idPregunta="">
		    <input type="hidden" name="id" value="2">
		    <span data-idcerrar="formEditEmployee" data-classform="form_select_multiple" class="icon-times btn_cerrar exitModal"></span>
		    <h3>Editar Empleado</h3>
		    <label for="pregunta">Correo</label><br>
		    <input type="email" name="email" class="input_redondo_oscuro" placeholder="Solo numeros">
		    <label for="pregunta">Contraseña</label><br>
		    <input type="password" name="password" class="input_redondo_oscuro" placeholder="Solo numeros">
		    <label for="pregunta">Confirme la contraseña</label><br>
		    <input type="password" name="confirm_password" class="input_redondo_oscuro" placeholder="Solo numeros">
		    <div class="footOpciones">
		    <button type="submit" class="boton_redondeado br_verde"><span class=""></span>Guardar</button>
		    <button type="button" data-idcerrar="formEditEmployee" data-classform="form_select_multiple" class="boton_redondeado br_azul exitModal"><span class=""></span>Cancelar</button>
	    </div>
	  </form>
	</main>
	<footer class="footer">
	  <p>Plataforma asistente del salón de belleza.<br>Versión 1.0 ©2017.</p>
	</footer>	
	
</body>
</html>