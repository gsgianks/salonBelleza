<?php
  session_start();
  if(!isset($_SESSION["role"]) || $_SESSION["role"]!=1){
  	header('Location: ../../Controller/Logout.php');
  }
?>
<header class="headAdmin">
	<nav class="azul_oscuro">  
		  <ul>
		    <li><a href="#" class="center_to_sides btnSubMenu loadEmployees"><span class="icon-user-tie"></span>Empleados</a></li>
		    <li><a href="#" class="center_to_sides btnSubMenu loadAppointments"><span class="icon-file-text2"></span>Citas</a></li>	
		    <li><a href="#" class="center_to_sides btnSubMenu"><span class="icon-user"></span>Administrador</a>
				<ul>
					<li class="btnOpcionSubMenu"><a href="../../Controller/Logout.php">Salir</a></li>
				</ul>
		    </li>
		  </ul>
	</nav>
</header>

<script src="../../js/nav_bar.js"></script>
