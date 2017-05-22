$(document).ready(function () {

    //alert('recuperarPreguntas');

    var data = {consulta : 'recuperarPreguntas',id : $('#idEvaluacion').text()};

    $.ajax({
            url: '../../Controller/ControladoraEvaluacion.php',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (resp) {
                alert(resp);       
            },
            error: function (jqXHR, estado, error) {
                alert('error log');
                console.log("fallo");
            }
    });


});



/*	<?php 	require_once "../../Domain/Pregunta.php";
		require_once "../../Data/DataEvaluacion.php";
		require_once '../../Logic/LogicaEvaluacion.php'; 
		$logic = new LogicaEvaluacion();
		$tipos = $logic->getPreguntasEvaluacion(19); 
	?>
	<?php 
			$id = 0;
			$html = "<div data-idPregunta='".$id."' class='pre_selec_unica'>";
    		$html.="<div class='cntMenuDesplegable'>";
            $html.="<span class='icon-list2 btnMenuDesplegable'></span>";
    		$html.="<aside class='card'><ul>";
    		$html.="<li   onclick='guiaDarRespuesta()' data-groupname='groupnameUnica".$id."'>Responder</li>";
    		$html.="<li data-classPregunta='pre_selec_unica' data-idPregunta='".$id."' data-idForm='formSelecUnica' class='editarPregunta'>Editar</li>";
    		$html.="<li data-classPregunta='pre_selec_unica' data-divPregunta='seleccion_unica' data-idPregunta=".$id." class='eliminarPregunta'>Eliminar</li>";
    		$html.="</ul></aside></div><div class='datos-pregunta'>";
			foreach ($tipos[0] as $pregunta) {
				$html.="<h4 data-pregunta='".$pregunta[2]."'>".$pregunta[2]."<span data-valor='".$pregunta[3]."'>(".$pregunta[3]."pts)</span></h4>";
				//echo "<br><br>";
				echo 'id: '.$pregunta[0];
				//echo 'tipo: '.$pregunta[1];
				//echo '<br>descrip: '.$pregunta[2];
				//echo '<br>valor: '.$pregunta[3];
				shuffle($pregunta[4]);
				foreach ($pregunta[4] as $opcion) {
					$html.="<input type='radio' class='radioButton' data-groupname='groupnameUnica".$id ."'' name='option".$id."' value='".$opcion."'>".$opcion."<br>";
					//echo '<br>opcion: '.$opcion;
				}
				$html.="<br><br><div id='seleccionUnica".$id."' dataRespuestaCorrecta='' > </div></div> <footer class='footPregunta'><button class='btnEstado'  dataMetodo='radio' dataEtiqueta='seleccionUnica".$id."' dataRespuesta=''  data-groupname='groupnameUnica".$id."'  >Aun no respondida</button></footer></div>";
				echo $html;
				$html = '';
				$id++;
			}
		?>*/