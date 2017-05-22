$(document).ready(function(){


	 $("#fEvaluacion").submit(function(e){
    	e.preventDefault();
        if(this.nombreEvaluacion.value.trim().length != 0 && this.tiempo.value.trim().length){
            $("#cargando").fadeIn("slow");
        	agregarEvaluacion($("#fEvaluacion").serializeArray());
        }else{
        	alert("Por favor, complete los campos.");
        }
    });

	function agregarEvaluacion(datos){
		$.ajax({
		    url:"../../Controller/ControladoraEvaluacion.php",
		    type:'POST',
		    data:datos,
		    success: function(responseText){
      			if(responseText == 1){
                    $("#cargando").fadeOut("slow",function(){
                        cargarEvaluaciones();
                    });
                    alertify.success("Evaluación agregada");
                }else{
                    alertify.error("Disculpe ha sucedido un error :(");
                }
      		}
		});
	}
    function cargarEvaluaciones(){
        $.ajax({
            url:"../../Controller/ControladoraEvaluacion.php",
            type:'POST',
            data:{consulta:"getEvaluacionesProfeLimit", 
                idProfesor:$("#perfilProfesor").attr("data-profe"),
                strBusqueda:"",
                inicioLimit:0},
            success: function(responseText){
                $(".centrado").fadeOut("slow", function(){
                    $(".contenedorPrincipal").load("../Evaluacion/ModuloEvaluaciones.php", {evaluaciones:responseText}).fadeIn("slow");
                }); 
            }
        });
    }
	 $(".fabAddEvaluacion").on("click",function(e){
	 	e.preventDefault();
        $("#fEvaluacion input[name=consulta]").val("guardarEvaluacionProfesor");
	 	mostr_ocultr("."+this.getAttribute("href"));
	 });

	 $("#cancelFEvaluacion").on("click",function(e){
	 	e.preventDefault();
	 	mostr_ocultr("."+$(this).attr("data-form"));
	 	limpiar_form("#"+$(this).attr("data-form"))
	 });

	function mostr_ocultr(id){
		
        if ( $(id).is(":visible")){
             //click();
             $(id).fadeOut("slow");
        }else{
            $(id).fadeIn("slow");
            //$('body').off('click');
        }
    }

    /*function click(){
        alert
        $('body').on('click',function(e){
            e.preventDefault();
            alert('menu');
            $('body').off('click');
            $('.cntMenuDesplegable').fadeOut('slow');

        });
}*/

    function limpiar_form(id){
    	$(id).each (function(){
  			this.reset();
		});
    }

    /*LLevar al link del disenador evaluaciones*/
    $(".linkPregunta").on("click", function(e){
    	e.preventDefault();
    	$("#mainModEvaluacion").load("DisenadorEvaluaciones.php?", 
            {idEvaluacion:$(this).attr("data-idEvaluacion"), nomEvaluacion:$(this).attr("data-nomEvaluacion"), 
            tiempo:$(this).attr("data-tiempo"), profe:$(this).attr("data-profe")});
    });

    function recargar_pagina_endiv(contenedorDeCarga, linkACargar){
    	$(contenedorDeCarga).load(linkACargar);
    	$(contenedorDeCarga).fadeIn(1000);
    }

    $('.btnAgregarTr').on( 'click', function () {
        var fila = "<tr>"
                  +"<td><textarea name='opcion' required></textarea></td>"
                  +"<td><button data-idtabla='"+$(this).attr("data-idtabla")+"' type='button' class='botonCircular rojo_flat btnRestarTr'><span class='icon-minus'></span></button></td>"
                  +"</tr>";
        $("#"+$(this).attr("data-idtabla")).append(fila);
        agregarEventoEliminarFila();
    });

    function agregarEventoEliminarFila(){
        $('.btnRestarTr').off("click");
        $('.btnRestarTr').on( 'click', function () {
        var idRow = this.parentNode.parentNode.rowIndex;
        var table = this.parentNode.parentNode.parentNode.parentNode;
        document.getElementById($(this).attr("data-idtabla")).deleteRow(idRow);
    });
    }

});
