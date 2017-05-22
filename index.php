<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>LogIn</title>
	<link rel="stylesheet" href="css/estilo_general.css">
	<link rel="stylesheet" href="css/fonts/style.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/funciones_validacion_usuarios.js"></script>
</head>
<body class="body">
	<main class="login_main">
		<h1><i class="icon-key"></i>Bienvenido a Salón de Belleza</h1>
		<form name="login" class="form_card">
			<h2>Inicio de sesión</h2>
			<div id="msgLog" style="display:none">Usuario incorrecto</div>
			<input type="hidden" name="consulta" value="validarLogin">
			<input type="email" name="correo" placeholder="Ingrese su correo" class="input_redondo_oscuro" required/>
			<input type="password" name="pass" placeholder="Ingrese su contraseña" class="input_redondo_oscuro" required/>
			<input type="submit" class="boton_redondeado br_verde" value="Ingresar">
		</form>
	</main>
	<footer class="footer">
	  <p>Asistente para salón de belleza.<br>Versión 1.0 ©2017.</p>
	</footer>	
	
</body>
</html>