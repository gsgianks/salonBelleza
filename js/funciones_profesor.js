    alertify.set('confirm','transition', 'fade');
    alertify.set('notifier','position', 'top-right');
	
    clickbtnDisenadorEvaluacion();
    clickLinkEvaluacion();
	clickbtnListarCursos();
	clickEditarCurso();
	clickAddModulo();
	clickAddClaseModulo();
	clickCerrarModal();
	clickEditarProfesor();
    clickEliminarClase();
    clickEliminarModulo();
    clickBtnBuscar();
    clickBtnPaginacionDerecha();
    clickBtnPaginacionIzquierdo();
    clickEliminarEvaluacion();
    clickEditarEvaluacion();
    clickVerTemasDeClase();
    clickAgregarTema();
    clickAgregarEvaluacion();
    clickNombreEvaluacion();
    clickInputFile();
    submitFormAddInfoClase();
    clickVerEstudiantesCurso();
    clickEliminarArchivo();
    clickShowMiPerfil();
    clickBtnFormEditTitulo();
    clickBtnFormEditDescripcion();
    clickInputFileArchAds();
    eventoSubirArchivo();


    function clickShowMiPerfil(){
	   $("#perfilProfesor").off("click");
       $("#perfilProfesor").on("click", function(){
	       verMiPerfil();
	   });
    }

    function verMiPerfil(){
        $(".contenedorPrincipal").empty();
        $(".centrado").fadeIn("slow");
        var id = $("#perfilProfesor").attr("data-profe");
        $.ajax({
            url:"../../Controller/ControladoraProfesor.php",
            type:'POST',
            data:{consulta:"infoProfesor", idProfesor:id},
            success: function(responseText){
                var data = JSON.parse(responseText);
                 $(".centrado").fadeOut("slow", function(){
                    $(".contenedorPrincipal").load("informacionPerfil.php",
                     {id:data[0].id, cedula:data[0].cedula,foto:data[0].foto,
                      nombreCompleto:data[0].nombreCompleto, correo:data[0].correo, 
                        fechaNacimiento:data[0].fechaNacimiento, 
                            telefono:data[0].telefono, 
                               edadActual:data[0].edadActual, 
                                 sexo:data[0].sexo}).fadeIn("slow");
                }); 
            }
        }); 
    }
    function clickbtnDisenadorEvaluacion(){
        $("#btnDisenadorEvaluacion").off("click");
        $("#btnDisenadorEvaluacion").on("click", function(){
            $(".contenedorPrincipal").empty();
            $(".centrado").fadeIn("slow");
            cargarEvaluaciones();
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
                    $(".contenedorPrincipal").load("../Evaluacion/ModuloEvaluaciones.php", {evaluaciones:responseText});
                }); 
            }
        });
    }
	function clickLinkEvaluacion(){
		$(".linkPregunta").off("click");
		$(".linkPregunta").on("click", function(e){
	    	e.preventDefault();
	    	$(".contenedorPrincipal").load("../Evaluacion/DisenadorEvaluaciones.php", 
	            {idEvaluacion:$(this).attr("data-idEvaluacion"), nomEvaluacion:$(this).attr("data-nomEvaluacion"), 
	            tiempo:$(this).attr("data-tiempo"), profe:$(this).attr("data-profe")}).fadeIn("slow");
	    });
	}  

	function clickbtnListarCursos(){
	    $("#btnMisCursos").off("click");
	    $("#btnMisCursos").on("click", function(){
	    	$(".contenedorPrincipal").empty();
	    	$(".centrado").fadeIn("slow");
            cargarMisCursosProfesor();//se cargan los cursos de un profesor 
	    });
	}

    function cargarMisCursosProfesor(){
        $.ajax({
            url:"../../Controller/ControladoraCurso.php",
            type:'POST',
            data:{consulta:"getCursosDeProfesorLimit", 
                idProfesor:$("#perfilProfesor").attr("data-profe"),
                strBusqueda:"",
                inicioLimit:0},
            success: function(responseText){
                $(".centrado").fadeOut("slow", function(){
                    $(".contenedorPrincipal").empty();
                    $(".contenedorPrincipal").load("ModuloCursos.php", {cursos:responseText}).fadeIn("slow");
                }); 
            }
        });
    }

    function listarCursosProfesorPaginacion(idProfesor, strBusqueda, limit){
        $.ajax({
            url:"../../Controller/ControladoraCurso.php",
            type:'POST',
            data:{consulta:"getCursosDeProfesorLimit", idProfesor:idProfesor,
                  strBusqueda:strBusqueda, inicioLimit:limit},
            success: function(responseText){
                var data = JSON.parse(responseText);
                if(data.length > 0){
                    $("#cargando").fadeOut("slow", function(){
                        $("#contenedorListadoCursos").empty();
                        $("#contenedorListadoCursos").hide("slow").load("listaMisCursos.php", 
                                                          {cursos:responseText}).fadeIn("slow");
                    }); 
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                        $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                    $(".btnDer").attr("data-hayregistros", 0);
                    $("#contenedorListadoCursos").empty();
                    $("#contenedorListadoCursos").append("<p class='card textNoResult'>No hay resultados</p>");
                }
            }
        });
    }
    /*Click en el boton de buscar*/
    function clickBtnBuscar(){
        $(".btnBuscar").off("click");
        $(".btnBuscar").on("click", function(){
            switch($(this).attr("data-tipolistado")){
                case "cursos":
                     $("#cargando").fadeIn("slow");
                    listarCursosProfesorPaginacion($("#perfilProfesor").attr("data-profe"), 
                                                $.trim($(".inputBusqueda").val()), 0);
                break;
                case "evaluaciones":
                    $("#cargando").fadeIn("slow");
                    listarEvaluacionPaginacion($("#perfilProfesor").attr("data-profe"),  
                                                $.trim($("#inputBusquedaEva").val()), 0);
                break;
                case 'evaluacionesModal':
                    cargarEvaluacionesModal($("#perfilProfesor").attr("data-profe"), 
                                               $.trim($("#inputBusquedaEva").val()), 0);
                break;
                case 'estudiantesCurso':
                        cargarEstudiantesDeCurso("#contenedorListado", "../Estudiantes/listaEstudiantes.php", $("#idCurso").val(), 
                                                $.trim($(".inputBusqueda").val()), 0);
                break;
            }
           $(".btnDer").attr("data-hayregistros",1);
           $(".btnDer").attr("data-inicio",0);
        });
    }
    function clickBtnPaginacionIzquierdo(){
        $(".btnIzq").off("click");
        $(".btnIzq").on("click", function(){
            
            if( ((parseInt($(".btnDer").attr("data-inicio"))) ) - 15  >= 0){
                var limit = (parseInt($(".btnDer").attr("data-inicio"))) - 15;
                $(".btnDer").attr("data-inicio", limit.toString());
                
                //se verifica el listado que se va hacer
                switch($(this).attr("data-tipolistado")){
                    case "cursos":
                        listarCursosProfesorPaginacion($("#perfilProfesor").attr("data-profe"), 
                                                $.trim($(".inputBusqueda").val()), limit);
                    break;
                    case "evaluaciones":
                        listarEvaluacionPaginacion($("#perfilProfesor").attr("data-profe"), 
                                               $.trim($("#inputBusquedaEva").val()), limit);
                    break;
                    case 'evaluacionesModal':
                        cargarEvaluacionesModal($("#perfilProfesor").attr("data-profe"), 
                                               $.trim($("#inputBusquedaEva").val()), limit.toString());
                    break;
                    case 'estudiantesCurso':
                        cargarEstudiantesDeCurso("#contenedorListado", "../Estudiantes/listaEstudiantes.php", $("#idCurso").val(), 
                                                $.trim($(".inputBusqueda").val()), limit.toString());
                    break;
                }
                
                if(parseInt($(".btnDer").attr("data-hayregistros")) === 0){
                    $(".btnDer").attr("data-hayregistros", 1);
                }
            }else{
                alertify.message("Ya estas en la primera pagína");
            }
        });
    }
    /*Click en el boton derecho para paginacion*/
    function clickBtnPaginacionDerecha(){
        $(".btnDer").off("click");
        $(".btnDer").on("click", function(){
            if(parseInt($(".btnDer").attr("data-hayregistros")) === 1){
                var limit = parseInt($(this).attr("data-inicio")) + 15; 
                $(this).attr("data-inicio", limit);

                 //se verifica el listado que se va hacer
                switch($(this).attr("data-tipolistado")){
                    case "cursos":
                        listarCursosProfesorPaginacion($("#perfilProfesor").attr("data-profe"), 
                                                $.trim($(".inputBusqueda").val()), limit);
                    break;
                    case "evaluaciones":
                         listarEvaluacionPaginacion($("#perfilProfesor").attr("data-profe"), 
                                           $.trim($("#inputBusquedaEva").val()), limit.toString());
                    case 'evaluacionesModal':
                        cargarEvaluacionesModal($("#perfilProfesor").attr("data-profe"), 
                                               $.trim($("#inputBusquedaEva").val()), limit.toString());
                    break;
                    case 'estudiantesCurso':
                        cargarEstudiantesDeCurso("#contenedorListado", "../Estudiantes/listaEstudiantes.php", $("#idCurso").val(), 
                                                $.trim($(".inputBusqueda").val()), limit.toString());
                    break;
                }
            }else{
                alertify.message("No hay más registros para mostrar.");
            }
        });
    }

    function listarEvaluacionPaginacion(idProfesor, strBusqueda, limit){
        $.ajax({
            url:"../../Controller/ControladoraEvaluacion.php",
            type:'POST',
            data:{consulta:"getEvaluacionesProfeLimit", idProfesor:idProfesor,
                strBusqueda:strBusqueda,
                inicioLimit:limit},
            success: function(responseText){
                var data = JSON.parse(responseText);
                if(data.length > 0){
                    $("#contenedorListado").empty();
                    $("#cargando").fadeOut("slow", function(){ 
                        cargarEvaluacionesProfesor(data);  
                    });
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                        $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                    $(".btnDer").attr("data-hayregistros", 0);
                    $("#contenedorListado").empty();
                    $("#contenedorListado").append("<p class='card textNoResult'>No hay resultados</p>");
                }
            }
        });
    }
    function cargarEvaluacionesProfesor(evaluaciones){
        if(evaluaciones.length > 0){
            $("#contenedorListado").empty();
            var contenido = '<ul class="contenedor_card_evaluacion">';
            $.each(evaluaciones, function(i, evaluacion) {
                contenido += "<li class='card'>"
                          +"<div>"
                          +"<span class='icon-clipboard sombra_boton'></span>"
                          +"</div>"
                          +"<div>"
                          +"<div class='contenido_card'>"
                          +"<h4><a href='#' data-idEvaluacion='"+evaluacion.idPrueba
                          +"' data-nomEvaluacion='"+evaluacion.nombre+"' data-tiempo='"+evaluacion.tiempo
                          +"' data-profe='"+$("#barNomProfe").text()+"' class='linkPregunta'>"+evaluacion.nombre
                          +"</a></h4>"
                          +"<label><span class='icon-clock2'></span>Tiempo limite:"+evaluacion.tiempo+"</label>"
                          +"</div>"
                          +"<div class='barra_opciones'>"
                          +"<span class='icon-pencil btnEditEvaluacion' data-id='"+evaluacion.idPrueba+"' data-nombre='"
                          +evaluacion.nombre+"' data-tiempo='"+evaluacion.tiempo+"'></span>"
                          +"<span class='icon-aspect_ratio ' onclick='irExamen(this)' data-id='"+evaluacion.idPrueba
                          +"' data-nombre='"+evaluacion.nombre+"' data-tiempo='"+evaluacion.tiempo+"' data-profe='"
                          +$("#barNomProfe").text()+"' ></span><span class='icon-bin btnEliminarEvaluacion' data-id='"
                          +evaluacion.idPrueba+"' data-nombre='"+evaluacion.nombre+"'></span>"
                          +"</div>"
                          +"</div>"
                          +"</li>";
            });
            contenido += "</ul>";
            $("#contenedorListado").append(contenido);
            if(evaluaciones.length < 15){
                $(".btnDer").attr("data-hayregistros", 0);
            }else{
                $(".btnDer").attr("data-hayregistros", 1);
            }
        }else{
            $(".btnDer").attr("data-hayregistros", 0);
            $("#contenedorListado").empty();
            $("#contenedorListado").append("<p class='card textNoResult'>No hay resultados</p>");
        }
        clickLinkEvaluacion();
        clickEliminarEvaluacion();
        clickEditarEvaluacion();
    }
    /*Boton eliminar evaluacion*/
    function clickEliminarEvaluacion(){
        $(".btnEliminarEvaluacion").off("click");
        $(".btnEliminarEvaluacion").on("click", function(){
            var nombre = $(this).attr("data-nombre");
            var id = $(this).attr("data-id");

            alertify.confirm('PlatCourse', '¿Desea eliminar la evaluación <strong>'+nombre+'</strong>?', 
                function(){ 
                    eliminarEvaluacion(id);
                }
                ,function(){ 
                    alertify.success("Eliminación cancelada");
                });
        });
    }

    function eliminarEvaluacion(idEvaluacion){
        $.ajax({
            url:"../../Controller/ControladoraEvaluacion.php",
            type:'POST',
            data:{consulta:"eliminarEvaluacion", idEvaluacion:idEvaluacion},
            success: function(responseText){
                if(responseText > 0){
                    alertify.success("Evaluación eliminada con éxito.");
                    cargarEvaluaciones();
                }else{
                    alertify.error("Error al eliminar la evaluación, intentelo de nuevo.");
                }
            }
        });
    }

    /*Edicion de evaluacion*/

    function clickEditarEvaluacion(){
        $(".btnEditEvaluacion").off("click");
        $(".btnEditEvaluacion").on("click", function(){
            cargarFormEvaluacionEdicion($(this).attr("data-id"), $(this).attr("data-nombre"),
                                        $(this).attr("data-tiempo"));
        });
    }

    function cargarFormEvaluacionEdicion(idEvaluacion, nombre, tiempo){
        $("#fEvaluacion input[name=consulta]").val("actualizarEvaluacion");
        $("#fEvaluacion input[name=nombreEvaluacion]").val(nombre);
        $("#fEvaluacion input[name=tiempo]").val(tiempo);
         $("#fEvaluacion input[name=idPrueba]").val(idEvaluacion);
        $(".fEvaluacion").fadeIn("slow");
    }

    /*Lleva al diseñador de clases del curso*/
    function clickEditarCurso(){
	    $(".btnEditCurso").off("click");
	    $(".btnEditCurso").on("click", function(){
            $("#cargando").fadeIn("slow");
            var id = $(this).attr("data-idcurso"), nombre = $(this).attr("data-nombre");
            $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"obtenerModulos", idCurso:id},
            success: function(responseText){
                $("#cargando").fadeOut("slow", function(){
    	    	  $(".contenedorPrincipal").load("ConstructorCurso.php", {idCurso:id, 
    	    		nombreCurso:nombre, modulos:responseText}).fadeIn("slow");
                });
            }
            });  
	    });
	}

    //Obtiene la lista de modulos y clases y envia a php que carga dicha informacion
    function cargarEstructuraCursos(idCurso){
        $("#animCargandoEstructuraCurso").fadeIn("slow");
        //$("#contenedorEstructuraCurso").empty();
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"obtenerModulos", idCurso:idCurso},
            success: function(responseText){
                $("#animCargandoEstructuraCurso").fadeOut("slow",function(){
                    $("#contenedorEstructuraCurso").load("listaEstructuraCurso.php", {modulos:responseText}).fadeIn("slow");
                });
            }
        });
    }

    /*Acciones para el disenador cursos*/
    function clickAddModulo(){
    	$(".btnAddModulo").off("click");
	    $(".btnAddModulo").on("click", function(){
	    	agregarModuloInterfaz($(this).attr("data-idcurso"), $(this).attr("data-nombrecurso"));
	    });
	}

    function agregarModuloInterfaz(idCurso, nombreCurso){
    	alertify.prompt( nombreCurso,
    		'Ingrese el nombre del módulo',
    		'', 
    		function(evt, value) {
    			if(value.trim().length == 0){
    				alertify.error("El campo no puede estar vacío");
    				evt.preventDefault();
    			}else{
    				$("#animCargandoEstructuraCurso").fadeIn("slow");
    				insertarModulo(idCurso, value.trim());
            	}
            },
            function() {
         	}
        );
    }

    function insertarModulo(idCurso, nombreModulo){
    	$.ajax({
			url:"../../Controller/ControladoraModulo.php",
			type:'POST',
			data:{consulta:"Insertarmodulo", idCurso:idCurso, descripcion:nombreModulo},
			success: function(responseText){
		   		if(responseText > 0){
			   		$("#animCargandoEstructuraCurso").fadeOut("slow", function(){ 
				   		$(".listClases").append("<li><h4><span class='icon-folder-open'></span>"
		    				+nombreModulo+"<button  class='btnEliminarModulo'><span class='icon-times'></span>"
		    				+"</button></h4><button  class='btnAddClaseModulo' data-idModulo='"+responseText
		    				+"' data-idcurso='"+idCurso+"'><span class='icon-plus'></span></button> <ul> </ul></li> ");
			   		});
			   		alertify.success("Módulo agregado :)");
		   		}else{
		   			alertify.error("Error al agregar el módulo, intentelo de nuevo.");
                    $("#animCargandoEstructuraCurso").fadeOut("slow");
		   		}
			}
		});

		   clickAddClaseModulo();

    }

    /*Accion agregar clase a modulo*/
    function clickAddClaseModulo(){
	   $("body").off("click",".btnAddClaseModulo");
	    $("body").on("click", ".btnAddClaseModulo", function(){    
	    dialogAgregarClase($(this).siblings("ul"),$(this).attr("data-id"), $(this).siblings("h4").text(),
                           $(this).attr("data-idcurso"));
	   });
	}

    function dialogAgregarClase($moduloList, idModulo,  nombreModulo, idCurso){
    	alertify.prompt( nombreModulo,
    		'Ingrese el nombre de la clase',
    		'', 
    		function(evt, value) {
    			if(value.trim().length == 0){
    				alertify.error("El campo no puede estar vacío");
    				evt.preventDefault();
    			}else{
    				$("#animCargandoEstructuraCurso").fadeIn("slow");
    				agregarClaseModulo($moduloList, idModulo, value.trim(), idCurso);
            	}
            },
            function() {
         	}
        );
    }

    function agregarClaseModulo($moduloList, idModulo, nombreClase, idCurso){
    	$.ajax({
			url:"../../Controller/ControladoraModulo.php",
			type:'POST',
			data:{consulta:"InsertarClase", idModulo:idModulo, descripcion:nombreClase},
			success: function(responseText){
		   		if(responseText > 0){
			   		$("#animCargandoEstructuraCurso").fadeOut("slow", function(){ 
				   		$moduloList.append("<li class='btnClickClase' data-id='"+responseText+"'>"+nombreClase
                        +"<button data-idclase='"+responseText
                        +"' class='btnEliminarOpcion' data-idcurso='"+idCurso
                        +"'><span class='icon-times'></span></button></li>");
			   		});
			   		alertify.success("Módulo agregado :)");
		   		}else{
		   			alertify.error("Error al agregar el módulo, intentelo de nuevo.");
		   		}
			}
		});
        clickVerTemasDeClase();
        clickEliminarClase();
    }

    /*Funciones para el form de agregar info a la clase*/

    function validarVacio(data){

    }

    function clickEliminarClase(){
        $('.btnEliminarOpcion').off("click");
        $('body').on("click", '.btnEliminarOpcion', function(){
            var idClase = $(this).attr("data-idclase");
            var idCurso = $(this).attr("data-idcurso");
            var objetoLi= this;
           
            alertify.confirm('PlatCourse', '<p>Al eliminar la clase, se borrará todo el contenido asociado.<br>'+
                            '¿Realmente desea eliminar la clase?</p>', 
                function(){ 
                    $(objetoLi).parent('li').hide("slow").remove();
                    eliminarClase(idClase, idCurso);
                }
                ,function(){ 
                    alertify.success("Eliminación cancelada");
            });
        });
    }
    function eliminarClase(idClase, idCurso){
        $("#animCargandoEstructuraCurso").fadeIn("slow");
        $.ajax({
            url: "../../Controller/ControladoraModulo.php",
            type: 'POST',
            data: {consulta:"eliminarClase", idClase:idClase},
            success: function (resp) {   
                if(resp == 1){   
                    cargarEstructuraCursos(idCurso);
                    alertify.success("Clase eliminada");
                }else{
                    alertify.error("Error al eliminar la clase, intentelo de nuevo");
                }
            }
        });
    }

    function modificarProfesor(){
        $( "#modificarProfe" ) .fadeIn("slow") ;
    }

    function cerrarModificarProfesor(){ 
        $( "#modificarProfe" ) .fadeOut("slow") ;
    }

    function clickEditarProfesor(){
        $(".butonCambios").off("click");
        $(".butonCambios").on("click", function (){

            var telefono = $("#telefono").val();
            var correo = $("#correo").val();
            var cedula = $("#informacion").val();

          
          
                   alertify.success("Camnbios Guardados" ); 

                      $.ajax({
                        url:"../../Controller/ControladoraCurso.php",
                        type:'POST',
                        data:{consulta:"actualizarProfesor",
                              telefono: telefono,
                              correo: correo,
                              cedula: cedula},
                    success: function(responseText){
                        
                             
                          
                     
                    },
                    error: function (xhr, thrownError) {
                        
                     }
                 });  

                      
            
            cerrarModificarProfesor();
            
    });
       
    }


    function eliminarCurso(boton){
        var id = $(boton).attr("data-idcurso");
        var nombreCurso = $(boton).attr("data-nombrecurso");

        alertify.confirm("¿Realmente desea eliminar el curso <strong>"+nombreCurso+"</strong>?", function (e) {
           if (e) {
               $.ajax({
                    url:"../../Controller/ControladoraCurso.php",
                    type:'POST',
                    data:{consulta:"EliminarCursos",
                    idCurso: id},
                    success: function(responseText){

                        if(responseText){
                            alertify.success("Curso Eliminado" );   
                            eliminarCursoGrafica(id);
                        }else{
                            alertify.error("Curso al eliminar" ); 
                        }    
                    },

                    error: function (xhr, thrownError) {}
                });  
           }else{ 
            alertify.error("Cancelado" );                 
        }
        }).setHeader('<em> PlatCourse </em>'); 

    }

    function eliminarCursoGrafica(idCurso){

        $(".card").each(function(i){

         if( $(this).find("button").attr("data-idcurso") === idCurso ){

            $(this).fadeOut("slow",function (){
              $(this).remove();
          });
        }
    });
    }
    
    function clickEliminarModulo(){
        $('.btnEliminarModulo').off("click");
        $('.btnEliminarModulo').on("click", function(){
            var id = $(this).attr('data-id');
            var padre = $(this).parent().parent('li');
            var nombreModulo = $(this).attr('data-modulo');

            alertify.confirm("¿Desea eliminar el módulo "+nombreModulo+"?", function (e) {

                if (e) {
                    
                     $.ajax({
                        url: '../../Controller/ControladoraModulo.php',
                        type: 'post',
                        dataType: 'json',
                        data: {consulta: 'eliminarModulo',id:id},
                        success: function (resp) {

                            if(resp === 1){
                                padre.hide();
                                alertify.success('Módulo '+nombreModulo+' eliminado');
                            }
                        },
                        error: function (jqXHR, estado, error) {
                            console.log("fallo");
                        }
                    });

                }else{ 
                    alertify.success("Eliminación cancelada" );                 
                }
            
            });
        });
    }

    function eliminarModulo(){

    }

    function clickVerTemasDeClase(){
        $("body").off("click", ".btnClickClase");
        $("body").on("click", ".btnClickClase", function(){
            $("#nomClase").text($(this).text());
            $("#nomClase").attr("data-idclase", $(this).attr("data-id"));
            $("#loadCntInfoCurso").fadeIn("slow");
            obtenerTemasClase($(this).attr("data-id"));
        });
    }

    function obtenerTemasClase(idClase){
        $("#mainClase").empty();
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"getTemasClase", idClase:idClase},
            success: function(responseText){
                $("#loadCntInfoCurso").fadeOut("slow", function(){
                    cargarTemasClase(responseText);
                });
            }
        });
    }

    function cargarTemasClase(data){
        $("#mainClase").append('<button id="btnAddTema" class="btnNormal btnCerrarFTema">'
                +'<span class="icon-plus"></span>Agregar información a la clase</button>');
        var temas = JSON.parse(data);
        if(temas.length > 0){
            var contenido = "";
            var idTema = 0;
            var idArchivo = 0;
            var archivos = "";
            var evaluaciones = "";
            var idListaArchivos = "";
            var idListaEvals = "";
            var adjuntos = [];
            var archivosAgregados = [];
            var evaluacionesAgregadas = [];

            $.each(temas, function(i, tema) {
                if(idTema != tema.idTema){
                    if(idListaArchivos != ""){
                        var item = {};
                        item["id"] = '#'+idListaArchivos;
                        item["contenido"] = archivos;
                        adjuntos.push(item);
                        archivos = "";
                        idListaArchivos = "";
                    }
                    if(idListaEvals != ""){       
                        var item = {};
                        item["id"] = '#'+idListaEvals;
                        item["contenido"]= evaluaciones;
                        adjuntos.push(item);
                        evaluaciones = "";
                        idListaEvals = "";
                    }

                    idTema = tema.idTema;
                    idListaArchivos = "listArch"+idTema;
                    idListaEvals = "listEvals"+idTema;
                
                    contenido += '<section class="tema"><header><h3><button data-idtema="'+tema.idTema+'" data-descripcion="'+tema.tituloTema+'" class="btnEditarTitulo"><span class="icon-pencil"></span></button>'+tema.tituloTema+
                                '<button class="btnEliminarOpcion"><span class="icon-times"></span></button>'+
                                '</h3></header><div class="contenido"><p><button data-idtema="'+tema.idTema+'" class="btnEditDescTema" '+
                                'data-descrip="'+tema.descTema+'"><span class="icon-pencil"></span></button>'+tema.descTema+'</p>'+
                                '<section class="archivos"><h4><span class="icon-box-add iconoIlustrativo azul">'+
                                '</span>Archivos<button onclick=agregarArchivosAdcionales(this) class="clsBtnAdd" data-idtema="'+tema.idTema+'"><span class="icon-plus"></span></button></h4><ul id="'+idListaArchivos+'" class="listaArchivos">'+
                                '</ul></section><section class="evaluaciones">'+
                                '<h4><span class="icon-paste iconoIlustrativo verde"></span>Evaluaciones<button class="clsBtnAdd"><span class="icon-plus"></span></button></h4>'+
                                '<ul id="'+idListaEvals+'"></ul></section></div></section>';
                    $("#mainClase").append(contenido);
                    contenido = "";
                    if( tema.idArchivo != null){
                        if( !(verificarExisteArchivo(archivosAgregados, tema.idTema, tema.idArchivo)) ){
                        archivos += '<li>'+getTipoArchivo(tema)+'<button class="clsBtnEliminarArch" data-ruta="'+tema.rutaArchivo+'" data-id="'+tema.idArchivo+'" data-nombre="'+tema.descArchivo
                                    +'" onclick=clickEliminarArchivoCargado(this)><span class="icon-times"></span></button></li>';
                        
                            var archivo = {};
                            archivo["idTema"] = tema.idTema;
                            archivo["idArchivo"] = tema.idArchivo ;
                            archivosAgregados.push(archivo);
                        }
                        
                    }
                    if( tema.idEvaluacion != null){
                       if( !(verificarExisteEvaluacion(evaluacionesAgregadas,  tema.idTema, tema.idEvaluacion )) ){
                            evaluaciones += '<li class="evalAdjunta hoverButton"><span class="icon-clipboard"></span><a href="#" data-id="'+
                            tema.idEvaluacion+'" data-nombre="'+tema.nomEvaluacion+'">'+tema.nomEvaluacion+
                            '</a><button onclick=clickEliminarEvaluacionCargada(this) data-idtema="'+tema.idTema+'" data-idevaluacion="'+tema.idEvaluacion+'" data-nombre="'+tema.nomEvaluacion
                            +'" class="btnEliminarEvalList"><span class="icon-times"></span></button></li>';
                            
                            var eval = {};
                            eval["idTema"] = tema.idTema;
                            eval["idEva"] = tema.idEvaluacion ;
                            evaluacionesAgregadas.push(eval);
                        }
                    }
                }else{
                    if( tema.idArchivo != null){
                        if( !(verificarExisteArchivo(archivosAgregados, tema.idTema, tema.idArchivo)) ){
                            archivos += '<li>'+getTipoArchivo(tema)+'<button class="clsBtnEliminarArch" data-ruta="'+tema.rutaArchivo+'" data-id="'+tema.idArchivo+'" data-nombre="'+tema.descArchivo
                                    +'" onclick=clickEliminarArchivoCargado(this)><span class="icon-times"></span></button></li>';
                       
                            var archivo = {};
                            archivo["idTema"] = tema.idTema;
                            archivo["idArchivo"] = tema.idArchivo ;
                            archivosAgregados.push(archivo);
                        }
                    }
                    if( tema.idEvaluacion != null){
                        if( !(verificarExisteEvaluacion(evaluacionesAgregadas,  tema.idTema, tema.idEvaluacion )) ){
                            evaluaciones += '<li class="evalAdjunta hoverButton"><span class="icon-clipboard"></span><a href="#" data-id="'+
                            tema.idEvaluacion+'" data-nombre="'+tema.nomEvaluacion+'">'+tema.nomEvaluacion+
                            '</a><button onclick=clickEliminarEvaluacionCargada(this) data-idtema="'+tema.idTema+'" data-idevaluacion="'+tema.idEvaluacion+'" data-nombre="'+tema.nomEvaluacion
                            +'" class="btnEliminarEvalList"><span class="icon-times"></span></button></li>';
                            
                            var eval = {};
                            eval["idTema"] = tema.idTema;
                            eval["idEva"] = tema.idEvaluacion ;
                            evaluacionesAgregadas.push(eval);
                        }
                    }
                }
            });
            clickAgregarTema();
            if(idListaArchivos != ""){
                var item = {};
                item["id"] = '#'+idListaArchivos;
                item["contenido"] = archivos;
                adjuntos.push(item);
            }
            if(idListaEvals != ""){       
                var item = {};
                item["id"] = '#'+idListaEvals;
                item["contenido"]= evaluaciones;
                adjuntos.push(item);
            }

        agregarAdjuntos(adjuntos);
        clickEditarTitulo();
        clickEditarDescripcion();
        }else{
            $("#mainClase").append('<p class="card textNoResult"><span class="icon-info"></span>Aun no hay información agregada a esta clase<br></p>');
        }
    }

    function verificarExisteArchivo(array, idTema, idArchivo){
        var respuesta = false;
        
        $.each(array, function(i, archivo) {
            if(archivo["idTema"] == idTema && archivo["idArchivo"] == idArchivo){
                respuesta = true;
            }
        });

        return respuesta;
    }

    function verificarExisteEvaluacion(array, idTema, idEvaluacion){
        var respuesta = false;
        
        $.each(array, function(i, archivo) {
            if(archivo["idTema"] == idTema && archivo["idEva"] == idEvaluacion){
                respuesta = true;
            }
        });

        return respuesta;
    }

    function getTipoArchivo(tema){
        var resultado = "";
        if(tema.rutaArchivo.indexOf('docs') != -1){
            resultado ='<a href="../../'+tema.rutaArchivo+'" download>'+getIconoExtension(tema.rutaArchivo)+
                        tema.descArchivo+'</a>';
        }else{
            resultado = '<img src="../../'+tema.rutaArchivo+'" width="50">'+
                                '<a href="../../'+tema.rutaArchivo+'" download>'+tema.descArchivo+'</a>';
        }
        return resultado;
    }

    function getIconoExtension(archivo){
        var icono = "<span class='icon-description ic-extension gris'></span>";
        var extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
        switch(extension){
            case '.doc':
                icono = "<span class='icon-file-word ic-extension azul'></span>";
            break;

            case '.docx':
                icono = "<span class='icon-file-word ic-extension azul'></span>";
            break;

            case '.pdf':
                icono = "<span class='icon-file-pdf ic-extension rojo'></span>";
            break;

            case '.odt':
                icono = "<span class='icon-libreoffice ic-extension gris'></span>";
            break;
            case '.ods':
                icono = "<span class='icon-libreoffice ic-extension gris'></span>";
            break;
            case '.ots':
                icono = "<span class='icon-libreoffice ic-extension gris'></span>";
            break;
        }

        return icono;
    }

    function agregarAdjuntos(array){
        $.each(array, function(i, adjunto) {
            $(adjunto["id"]).append(adjunto["contenido"]);
        });
    }

    function editarTituloTema(temaId, descripcionTema){
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"editarTitulo", idTema:temaId, descripcion:descripcionTema},
            success: function(responseText){
                if(responseText == 1){
                    alertify.success("Título actualizado");
                    $("#formEditTitulo").fadeOut("slow");
                    obtenerTemasClase($("#nomClase").attr("data-idclase"));
                }else{
                    alertify.error("Error al actualizar el título");
                }
            }
        });
    }

     function editarDescripcionTema(temaId, descripcionTema){
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"editarDescripcion", idTema:temaId, descripcion:descripcionTema},
            success: function(responseText){
               if(responseText == 1){
                    alertify.success("Descripción actualizada");
                    $("#formEditDescripcion").fadeOut("slow");
                    obtenerTemasClase($("#nomClase").attr("data-idclase"));
                }else{
                    alertify.error("Error al actualizar la descripción");
                }
            }
        });
    }

     function eliminarArchivoTema(archivoId, ruta){
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"eliminarArchivo", idArchivo:archivoId, rutaArchivo:ruta},
            success: function(responseText){
                obtenerTemasClase($("#nomClase").attr("data-idclase"));
            }
        });
    }

     function eliminarEvaluacionAdjunta(temaId, evaluacionId){
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"eliminarEvaluacion", idTema:temaId, idEvaluacion:evaluacionId},
            success: function(responseText){
                obtenerTemasClase($("#nomClase").attr("data-idclase"));
            }
        });
    }

    function clickEditarTitulo(){
        $("body").off("click", ".btnEditarTitulo");
        $("body").on("click", ".btnEditarTitulo", function(){
            var idTema = $(this).attr("data-idtema");
           
            $("#taTitulo").val($(this).attr("data-descripcion"));
            $("#taTitulo").attr("data-idtema", idTema);
            
            $("#formEditTitulo").fadeIn("slow");
        });
    }

    function clickEditarDescripcion(){
        $("body").off("click", ".btnEditDescTema");
        $("body").on("click", ".btnEditDescTema", function(){
            var idTema = $(this).attr("data-idtema");
           
            $("#taDescripcion").val($(this).attr("data-descrip"));
            $("#taDescripcion").attr("data-idtema", idTema);

            $("#formEditDescripcion").fadeIn("slow");
            
        });
    }

    function clickBtnFormEditTitulo(){
        $("#btnFormEditTitulo").off("click");
        $("#btnFormEditTitulo").on("click", function(){
            if( validarInputVacio( "#taTitulo") ){
                alertify.error("No puede dejar el campo vacío");
            }else{
                editarTituloTema($("#taTitulo").attr("data-idtema"), $("#taTitulo").val());
            }
        });

        $("#btnCanFormEditTitulo").off("click");
        $("#btnCanFormEditTitulo").on("click", function(){
            $("#taTitulo").val("");
            $("#formEditTitulo").fadeOut("slow");
        });
    }


    function clickBtnFormEditDescripcion(){
        $("#btnFormEditDescrip").off("click");
        $("#btnFormEditDescrip").on("click", function(){
            if( validarInputVacio( "#taDescripcion") ){
                alertify.error("No puede dejar el campo vacío");
            }else{
                editarDescripcionTema($("#taDescripcion").attr("data-idtema"), $("#taDescripcion").val());
            }
        });

        $("#btnCanFormEditDescrip").off("click");
        $("#btnCanFormEditDescrip").on("click", function(){
            $("#taDescripcion").val("");
            $("#formEditDescripcion").fadeOut("slow");
        });
    }

    function clickEliminarArchivoCargado(objeto){
        var idArchivo = $(objeto).attr("data-id");
        var nomArchivo = $(objeto).attr("data-nombre");
        var ruta = $(objeto).attr("data-ruta");
           
        alertify.confirm('PlatCourse', '<p>¿Desea aeliminar el archivo <strong>'+nomArchivo+'</strong>?</p>', 
            function(){ 
                eliminarArchivoTema(idArchivo, ruta);
            }
            ,function(){ 
                    alertify.success("Eliminación cancelada");
            }
        );
    }

    function clickEliminarEvaluacionCargada(objeto){
        var idTema =  $(objeto).attr("data-idtema");
        var idEvaluacion = $(objeto).attr("data-idevaluacion");
        var nomEvaluacion = $(objeto).attr("data-nombre");

        alertify.confirm('PlatCourse', '¿Desea aeliminar la evaluación <strong>'+nomEvaluacion+'</strong>?', 
            function(){ 
                eliminarEvaluacionAdjunta(idTema, idEvaluacion);  
            }
            ,function(){ 
                alertify.success("Eliminación cancelada");
            }
        );
    }

    function validarInputVacio(idInput){
        var resultado = false;

        if($.trim($(idInput).val()).length == 0){
            resultado = true;
        } 

        return  resultado;
    }

    function agregarArchivosAdcionales(objeto){
        $("#formArchAdcional").fadeIn("slow");
        $("#idTema").val($(objeto).attr("data-idtema"));
    }
   
    function eventoSubirArchivo(){
        $("#formSubirArchivo").off("submit");
        $("#formSubirArchivo").on("submit", function(e){
            e.preventDefault();
            $("#cargando").fadeIn("slow");
            var formData = document.getElementById("formSubirArchivo");
            envioArchivosAdjuntosAdicionales( $("#idTema").val(), formData);
        });
    }

    function envioArchivosAdjuntosAdicionales(idTema, formData){
        if ($('#archDoc').get(0).files.length != 0) {
            var formArchivos = new FormData();
            formArchivos.append("consulta", "subirDoc");
            formArchivos.append("idTema", idTema);
            var doc = formData.doc;
            var fileDoc = doc.files[0];
            formArchivos.append("doc", fileDoc);
            if(insertarArhivosTema(formArchivos) == 1){
                alertify.success("Archivo guardado");
            }else{
                alertify.error("Sucedió un error al guardar el archivo");
            }
            $("#fileAd .nombreArchivo").text("");
            $(".inconoArchivo").fadeOut("slow");
        }
        if ($('#archImagen').get(0).files.length != 0) {
            var formArchivos = new FormData();
            formArchivos.append("consulta", "subirImg");
             formArchivos.append("idTema", idTema);
            var imagen = formData.imagen;
            var fileImg = imagen.files[0];
            formArchivos.append("img", fileImg);
            if(insertarArhivosTema(formArchivos) == 1){
                alertify.success("Archivo guardado");
            }else{
                alertify.error("Sucedió un error al guardar el archivo");
            }
            $("#imagenAd .nombreArchivo").text("");
            $('#imagenAd img').attr("src","");
        }
        $("#cargando").fadeOut("slow");
        $("#formArchAdcional").fadeOut("slow");
    }

     function clickInputFileArchAds(){
        $(".InputChangeArchAds").off("change");
        $(".InputChangeArchAds").on("change", function(){
            var file = this.files[0];
            if(file.size <= (1024*1024*5)){
                if($(this).attr("data-tipo") == "doc"){
                    $("#fileAd .nombreArchivo").text(this.files[0].name);
                     $(".inconoArchivo").fadeIn("slow");
                }else{
                    $("#imagenAd .nombreArchivo").text(this.files[0].name);
                    previsualizarImagen(this);
                }
            }else{
                alertify.error("Error al subir archivo, sobre pasa el peso máximo (5MB).");
            }
        });
    }

    function valida(e){
      tecla = (document.all) ? e.keyCode : e.which;
              //Tecla de retroceso para borrar, siempre la permite
            if (tecla==8){
                return true;
            }    
            // Patron de entrada, en este caso solo acepta numeros
            patron =/[0-9]/;
            tecla_final = String.fromCharCode(tecla);
            return patron.test(tecla_final);
    }

    function soloNumeros(evt){
       var charCode = (evt.which) ? evt.which : event.keyCode
       if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
    }

    /*Metodos para agregar tema a clase*/

    function clickAgregarTema(){
        $("body").off("click",".btnCerrarFTema");
        $("body").on("click",".btnCerrarFTema", function(e){
           /* $("#listaEvaluacionesAgregadas").empty();
            $("#formInfoClase")[0].reset();
            
            $("#imagen .nombreArchivo").text("");
            $('#imagen img').attr("src","");

            $("#archivo .nombreArchivo").text("");
            $(".inconoArchivo").fadeOut("slow");*/
            mostrarOcultarModal("#formAddInfoClase");
        });
    }

    function mostrarOcultarModal(id){
        if($(id).is(":visible")){
            $(id).fadeOut("slow");
        }else{
            $(id).fadeIn("slow");
        }
    }

    function clickAgregarEvaluacion(){
        $("#btnAdjuntarEvaluacion").off("click");
        $("#btnAdjuntarEvaluacion").on("click", function(){
            mostrarOcultarModal("#"+"listaEvaluacion");
            cargarEvaluacionesModal($("#perfilProfesor").attr("data-profe"),"",0);
        });
    }

    function cargarEvaluacionesModal(idProfesor, strBusqueda, limit){
        $("#loadEvaluacionModal").fadeIn("slow");
        $("#tbListEvaluaciones").empty();
        $.ajax({
            url:"../../Controller/ControladoraEvaluacion.php",
            type:'POST',
            data:{consulta:"getEvaluacionesProfeLimit", idProfesor:idProfesor,
                strBusqueda:strBusqueda,
                inicioLimit:limit},
            success: function(responseText){
                var data = JSON.parse(responseText);
                if(data.length > 0){
                    $("#loadEvaluacionModal").fadeOut("slow", function(){
                        $("#tbListEvaluaciones").load("listaMisEvaluaciones.php",
                                            {evaluaciones:responseText}).fadeIn("slow");   
                    });
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                        $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                    $(".btnDer").attr("data-hayregistros", 0);
                    $("#tbListEvaluaciones").empty();
                    $("#tbListEvaluaciones").append("<p class='card textNoResult'>No hay resultados</p>");
                }
            }
        });
    }

    function clickNombreEvaluacion(){
        $(".trNomEvaluacion").off("click");
        $(".trNomEvaluacion").on("click", function(){
            if( !existeEvaluacion($(this).attr("data-id")) ){
                $("#listaEvaluacionesAgregadas").append("<li class='nomEvaluacion' data-id='"+$(this).attr("data-id")+"'>"+
                $(this).attr("data-nombre")+"<span class='icon-times eliminarTrEvaluacion'></span></li>");
                eliminarFilaEvaluacionAgregada();
                alertify.success("Evaluación agregada");
            }else{
                alertify.success("La evaluación ya fue agregada.");
            }
        });
    }

    function eliminarFilaEvaluacionAgregada(){
        $(".eliminarTrEvaluacion").off("click");
        $(".eliminarTrEvaluacion").on("click", function(){
            $(this).parent().remove();   
        })
    }
    function existeEvaluacion(idEvaluacion){
        var esta = false;
        $("#listaEvaluacionesAgregadas li").each(function(index) { 
           if( $(this).attr("data-id") == idEvaluacion){
                esta = true;
           }
        });
        return esta;
    }
    function clickCerrarModal(){
        $(".btnCerrarModal").off("click");
        $(".btnCerrarModal").on("click", function (){
            $("#"+$(this).attr("data-idcerrar")).fadeOut('slow');   
        });
    }

    function submitFormAddInfoClase(){
        $('#formInfoClase').off("submit");
        $('#formInfoClase').on("submit",function (e) {
            e.preventDefault();
            $("#cargando").fadeIn("slow");
            var formData = document.getElementById("formInfoClase");

            $.ajax({
                url: "../../Controller/ControladoraModulo.php",
                type: 'POST',
                data: {consulta:"insertarTemaClase", idClase:$("#nomClase").attr("data-idclase"), titulo:formData.tituloClase.value, 
                descripcion:formData.descripcionClase.value},
                success: function (resp) {  
                    if(resp > 0){
                        if($("#listaEvaluacionesAgregadas li").length > 0){
                            insertarEvaluacionesTema(resp);
                        }
                        if ($('#fileDoc').get(0).files.length != 0 || $('#fileImagen').get(0).files.length != 0) {
                            validarEnvioArchivos(resp, formData);
                            obtenerTemasClase($("#nomClase").attr("data-idclase"));
                        }
                        $("#cargando").fadeOut("slow", function(){
                            $("#formAddInfoClase").fadeOut("slow");
                        });
                        $("#formInfoClase")[0].reset();
                    }else{
                        alertify.error("Sucedió un error al guardar la información, intente de nuevo");
                    } 
                }
            });
        });
    }
    function clickInputFile(){
        $(".InputChange").off("change");
        $(".InputChange").on("change", function(){
            var file = this.files[0];
            if(file.size <= (1024*1024*5)){
                if($(this).attr("data-tipo") == "doc"){
                    $("#archivo .nombreArchivo").text(this.files[0].name);
                     $(".inconoArchivo").fadeIn("slow");
                }else{
                    $("#imagen .nombreArchivo").text(this.files[0].name);
                    previsualizarImagen(this);
                }
            }else{
                alertify.error("Error al subir archivo, sobre pasa el peso máximo (5MB).");
            }
        });
    }
    function previsualizarImagen(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagen img').attr("src",e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    function validarEnvioArchivos(idTema, formData){
        if ($('#fileDoc').get(0).files.length != 0) {
            var formArchivos = new FormData();
            formArchivos.append("consulta", "subirDoc");
            formArchivos.append("idTema", idTema);
            var doc = formData.doc;
            var fileDoc = doc.files[0];
            formArchivos.append("doc", fileDoc);
            insertarArhivosTema(formArchivos);
            $("#archivo .nombreArchivo").text("");
            $(".inconoArchivo").fadeOut("slow");
        }
        if ($('#fileImagen').get(0).files.length != 0) {
            var formArchivos = new FormData();
            formArchivos.append("consulta", "subirImg");
             formArchivos.append("idTema", idTema);
            var imagen = formData.imagen;
            var fileImg = imagen.files[0];
            formArchivos.append("img", fileImg);
            insertarArhivosTema(formArchivos);
            $("#imagen .nombreArchivo").text("");
            $('#imagen img').attr("src","");
        }
    }

    function clickEliminarArchivo(){
        $(".btnEliminarArchivo").off("click");
        $(".btnEliminarArchivo").on("click", function(){
            if($(this).attr("data-tipo") == "doc"){
                $('#fileDoc:reset');
                $("#archivo .nombreArchivo").text("");
                $(".inconoArchivo").fadeOut("slow");
            }else{
                $('#fileImagen:reset');
                $("#imagen .nombreArchivo").text("");
                $('#imagen img').attr("src","");
            }
        });
    }

    function insertarArhivosTema(formArchivos){
        var respuesta = 0;
        $.ajax({
            url: "../../Controller/ControladoraModulo.php",
            type: 'POST',
            async:false,
            contentType: false,
            data: formArchivos,
            processData: false,
            cache: false,
            success: function (resp) {  
                if(resp > 0){ 
                    respuesta = resp;   
                }
            }
        });
        return respuesta;
    }
    function insertarEvaluacionesTema(idTema){
        var respuesta = 0;
        $("#listaEvaluacionesAgregadas li").each(function (index) { 
            respuesta = insertarEvalToTema(idTema, $(this).attr("data-id"));
        });
        return respuesta;
    }

    function insertarEvalToTema(idTema, idEvaluacion){
        var respuesta = 0;
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            async:false,
            data:{consulta:"agregarEvaluacionTemaClase", idTema:idTema, idEvaluacion:idEvaluacion},
            success: function(responseText){
                if(responseText > 0){
                    respuesta = 1;
                }
                $("#listaEvaluacionesAgregadas").empty();
            }
        });

        return respuesta;
    }

    function clickVerEstudiantesCurso(){
        $(".btnGetEstudiantesCurso").off("click")
        $(".btnGetEstudiantesCurso").on("click", function(){
            cargarEstudiantesDeCurso(".contenedorPrincipal", "VistaEstudiantesDeCurso.php",$(this).attr("data-idcurso"), "", 0);
            $("#idCurso").val($(this).attr("data-idcurso"));
        });
    }

    function cargarEstudiantesDeCurso(contenedorCarga,  vistaACargar, idCurso, strBusqueda, limit){
        $("#cargando").fadeIn("slow");
        $.ajax({
            url:"../../Controller/ControladoraEstudiante.php",
            type:'POST',
            data:{consulta:"getEstudiantesCursoLimit", idCurso:idCurso,
                strBusqueda:strBusqueda,
                inicioLimit:limit},
            success: function(responseText){
                var data = JSON.parse(responseText);
                if(data.length > 0){
                    $(contenedorCarga).empty();
                    $("#cargando").fadeOut("slow", function(){
                        $(contenedorCarga).load(vistaACargar,
                                            {estudiantes:responseText}).fadeIn("slow");   
                    });
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                         $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                    $(contenedorCarga).empty();
                    $("#cargando").fadeOut("slow", function(){
                            $(contenedorCarga).load(vistaACargar,
                                            {estudiantes:responseText}).fadeIn("slow");
                    });
                    $(".btnDer").attr("data-hayregistros", 0);
                }
            }
        });
    }


    function ajax(url,data){
        alert('ajax');

    }

    function irExamen(boton){
     $("#cargando").fadeIn("slow");
     var idevaluacion=$(boton).attr("data-id");
     var nombre =$(boton).attr("data-nombre");
     var tiempo =$(boton).attr("data-tiempo");
     var nombreProfe =$(boton).attr("data-profe");

     $.ajax({
        url:"../../Controller/ControladoraEvaluacion.php",
        type:'POST',
        data:{consulta:"recuperarPreguntas",
        id:idevaluacion},
        success: function(responseText){
            $("#cargando").fadeOut("slow", function(){
                $(".contenedorPrincipal").load("vistaExamenProfesor.php", {listaPreguntas:responseText,nomEvaluacion:nombre,tiempo:tiempo,profe:nombreProfe}).fadeIn("slow");
            });  
        },
        error: function (xhr, thrownError) {
            $(".contenedorPrincipal").html("Error ...");
        }
    }); 

 }