<!--<?php
 /* session_start();
  if(!isset($_SESSION["idUsuario"]) || $_SESSION["tipoUsuario"]!="pf"){
    header('Location: ../../Controller/Logout.php');
  }*/
?>-->
<script>$(".centrado").fadeOut("slow");</script>
<div id="contenedorListado">
  <ul class="contenedor_card_evaluacion">
    <?php
    $listEmployees = json_decode($_POST["listEmployees"]);

    if(count($listEmployees) > 0){
      foreach ($listEmployees as $employee) {

        echo "<li class='card employee' data-id='".$employee->id."'>";
        echo "<div>";
        echo "<div class='contenido_card'>";
        echo "<h4><a href='#' data-idEvaluacion='".$employee->id."' data-nomEvaluacion='".$employee->email."' data-tiempo='".$employee->password."' </a></h4>";
        echo "<label class='email'>Email:".$employee->email."</label><br>";
        echo "<label class='password'>Password:".$employee->password."</label>";
        echo "</div>";
        echo "<div class='barra_opciones'>";
        echo "<span class='icon-pencil btnEditEmployee' data-id='".$employee->id."' data-email='".$employee->email."' data-password='".$employee->password."'></span>";
        echo "<span class='icon-description loadAppoint' data-id='".$employee->id."'></span>";
        echo "<span class='icon-bin btnDeleteEmployee' data-id='".$employee->id."'></span>";
        echo "</div>";
        echo "</div>";
        echo "</li>";
      }
    }else{
      echo "No hay resultados.";
    }
  ?>
  <script src="../../js/functions_admin_employee.js"></script>
  </ul>
</div>


<div id="formEditEmployee" class="modal" style="display:none;">
  <form class="formPregunta form_select_multiple">
    <input type="hidden" name="consulta" value="add_employee" data-valueInput='selec_multi' data-idPregunta="">
    <input type="hidden" name="id" value="">
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
</div>
<a class='btn_flotante verde_agua btnAddEmployee'><span class="icon-plus"></span></a>

