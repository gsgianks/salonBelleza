<div id="contenedorListado" data-idEmployee="<?php echo $_POST['id'] ?>">
  <ul class="contenedor_card_evaluacion">
    <?php
    $listAppointments = json_decode($_POST["listAppointments"]);

    if(count($listAppointments) > 0){
      foreach ($listAppointments as $appointment) {

        echo "<li class='card appointment' data-id='".$appointment->id."' >";
        echo "<div>";
        echo "<div class='contenido_card'>";
        echo "<label class='create_at'>Creado en:".$appointment->create_at."</label><br>";
        echo "<label class='date'>Fecha:".$appointment->date."</label>";
        echo "</div>";
        echo "<div class='barra_opciones'>";
        echo "<span class='icon-pencil btnEditAppointment' data-idEmployee='".$appointment->user_id."' data-id='".$appointment->id."' data-create_at='".$appointment->create_at."' data-date='".$appointment->date."'></span>";
        echo "<span class='icon-bin btnDeleteAppointment' data-id='".$appointment->id."'></span>";
        echo "</div>";
        echo "</div>";
        echo "</li>";
      }
    }else{
      echo "No hay resultados.";
    }
  ?>
  <script src="../../js/functions_admin_appointment.js"></script>
  </ul>
</div>

<div id="formAppointment" class="modal" style="display:none;">
  <form class="formPregunta form_select_multiple">
    <input type="hidden" name="consulta" value="add_appointment" data-valueInput='selec_multi' data-idPregunta="">
    <input type="hidden" name="id" value="">
    <span data-idcerrar="formEditEmployee" data-classform="form_select_multiple" class="icon-times btn_cerrar exitModal"></span>
    <h3>Agregar Cita</h3>
    <label for="user_id">Usuario</label><br>
    <input type="text" name="user_id" class="input_redondo_oscuro" placeholder="Solo numeros">
    <label for="create_at">Creado en</label><br>
    <input type="text" name="create_at" class="input_redondo_oscuro" placeholder="Solo numeros">
    <label for="date">Fecha</label><br>
    <input type="text" name="date" class="input_redondo_oscuro" placeholder="Solo numeros">
    <div class="footOpciones">
      <button type="submit" class="boton_redondeado br_verde"><span class=""></span>Guardar</button>
      <button type="button" data-idcerrar="formEditEmployee" data-classform="form_select_multiple" class="boton_redondeado br_azul exitModal"><span class=""></span>Cancelar</button>
    </div>
  </form>
</div>
<a class='btn_flotante verde_agua btnAddAppointment'><span class="icon-plus"></span></a>