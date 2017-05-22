<div id="contenedorListado">
  <ul class="contenedor_card_evaluacion">
    <?php
    $listAppointments = json_decode($_POST["listAppointments"]);

    if(count($listAppointments) > 0){
      foreach ($listAppointments as $appointment) {

        echo "<li class='card appointment' data-id='".$appointment->id."'>";
        echo "<div>";
        echo "<span class='icon-clipboard sombra_boton'></span>";
        echo "</div>";
        echo "<div>";
        echo "<div class='contenido_card'>";
        echo "<label class='create_at'>Creado en:".$appointment->create_at."</label><br>";
        echo "<label class='date'>Fecha:".$appointment->date."</label>";
        echo "</div>";
        echo "</div>";
        echo "</li>";
      }
    }else{
      echo "No hay resultados.";
    }
  ?>
  <script src="../../js/functions_admin_appointments.js"></script>
  </ul>
</div>