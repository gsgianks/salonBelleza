<?php
  session_start();
  if(!isset($_SESSION["role"]) || $_SESSION["role"]!=0){
  	header('Location: ../../Controller/Logout.php');
  }
?>
<header class="headEmployee">
	<nav class="azul_oscuro">  
		  <ul>
		    <li><a href="#" class="center_to_sides btnSubMenu"><span class="icon-user"></span>Empleado</a>
				<ul>
					<li class="btnOpcionSubMenu"><a href="../../Controller/Logout.php">Salir</a></li>
				</ul>
		    </li>
		  </ul>
	</nav>
</header>

<script src="../../js/nav_bar.js"></script>
