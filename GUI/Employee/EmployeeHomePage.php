<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Inicio</title>
	<link rel="stylesheet" href="../../css/estilo_general.css">
    <link rel="stylesheet" href="../../css/fonts/style.css">
    <link rel="stylesheet" href="../../css/alertify/alertify.min.css">
    <link rel="stylesheet" href="../../css/alertify/themes/default.css">
    <script type="text/javascript" src="../../js/alertify.min.js"></script>
  	<script src="../../js/jquery.min.js"></script>
  	<script src="../../js/functions_employee.js"></script>
</head>
<body class="gris">
	<?php
		include("BarraNavegacionEmployee.php");
	?>
	<div class="loader centrado" style="display: none;"></div>
	<div class="contenedor fixMargin">

	</div>
	<main class="contenedorPrincipal fixMargin" data-idEmployee="<?php echo $_SESSION['id'] ?>">

 	</main>
</body>
</html>