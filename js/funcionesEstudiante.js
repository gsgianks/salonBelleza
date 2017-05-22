	darmatricularCurso();
    clickVerTemasDeClase();  
    clickBtnBuscarCursos();
    clickBtnPaginacionIzquierdo();
	clickBtnPaginacionDerecha(); 
    clickVerMiPerfil();
    clickVerExamen();

    function clickVerMiPerfil(){
       $("#perfilEstudiante").off("click");
       $("#perfilEstudiante").on("click", function(){
        
            showMiPerfil();
       });
    }

     function clickVerExamen(){
       $(".verExamen").off("click");
       $(".verExamen").on("click", function(){
       // alert("llega");
           // irExamen();
       });
    }

    

    function showMiPerfil(){
        $("#contenedorPrincipalEstudiante").empty();
      //  $(".centrado").fadeIn("slow");
        var id = $(".opCursosDispon").attr("data-idestudiante");
        $.ajax({
            url:"../../Controller/ControladoraEstudiante.php",
            type:'POST',
            data:{consulta:"getEstudiante", idEstudiante:id},
            success: function(responseText){
            
            var data = JSON.parse(responseText);
            
               // $(".centrado").fadeOut("slow", function(){
                    $("#contenedorPrincipalEstudiante").load("informacionPerfilEstudiante.php", 
                        {id:data[0].id, fotoEstud:data[0].fotoEstud, 
                            nombEstud:data[0].nombEstud,
                             correo:data[0].correo
                    });
              //  }); 
            }
        });
    }

	function ventanaMatricularCurso(boton){  
		$(".nombreCurso").text( $(boton).data('nombre'));   
        $("#informacion").attr("data-idCurso",$(boton).attr('data-idcurso') ); //Guarda el id del curso
        $("#informacion").attr("data-Estudiante",$(boton).attr('data-idEstudiante') ); //id del estudiante
        $("#informacion").attr("data-contraCurso",$(boton).attr('data-Contracurso') ); //contraseña del curso
        $("#matricularCurso").fadeIn("slow");
        alert( "Contraseña= "+  $("#informacion").attr("data-contraCurso") );
	}
  
	function cerrarMatricularCurso(){
	    $( "#matricularCurso" ) .fadeOut("slow") ;
	}

  
	function clickbtnListarCursos(){
		$("#contenedorPrincipalEstudiante").hide("slow").empty();
		$(".centrado").fadeIn("slow");
		$.ajax({
			url:"../../Controller/ControladoraCurso.php",
			type:'POST',
			data:{consulta:"getCursosDisponiblesLimit", idEstudiante:$(".opCursosDispon").attr("data-idestudiante"), strBusqueda:"", 
                            inicioLimit:0},
			success: function(responseText){
				$(".centrado").fadeOut("slow", function(){
					$("#contenedorPrincipalEstudiante").load("VistaCursosDisponiblesPaginacion.php", {cursos:responseText}).fadeIn("slow");
				}); 
			}
		}); 
	}  

	/*Click en el boton de buscar*/ 
    function clickBtnBuscarCursos(){
        $(".btnBuscar").off("click");
        $(".btnBuscar").on("click", function(){
            switch($(this).attr("data-tipolistado")){
                case 'cursosDisponibles':
                    	cargarCursosDisponiblesPaginacion($.trim($(".inputBusqueda").val()), 0);
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
                    case 'cursosDisponibles':
                    	cargarCursosDisponiblesPaginacion($.trim($(".inputBusqueda").val()), limit);
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
             
                    case 'cursosDisponibles':
                    	cargarCursosDisponiblesPaginacion($.trim($(".inputBusqueda").val()), limit);
                    break;
                }
            }else{
                alertify.message("No hay más registros para mostrar.");
            }
        });
    }

    function cargarCursosDisponiblesPaginacion(stringBusquedda, limit){
    	$(".listaCursos").empty();
    	$.ajax({
			url:"../../Controller/ControladoraEstudiante.php",
			type:'POST',
			data:{consulta:"getCursosDisponiblesLimit", idEstudiante:$(".opCursosDispon").attr("data-idestudiante"), 
                            strBusqueda:stringBusquedda, inicioLimit:limit},
			success: function(responseText){
				var data = JSON.parse(responseText);
                if(data.length > 0){
              		$(".listaCursos").hide().load("listaCursos.php", {cursos:responseText}).fadeIn("slow");
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }
                }else{
                    $(".btnDer").attr("data-hayregistros", 0);
                }
			},
			error: function (xhr, thrownError) {
			}
		}); 
    }

	function clickbtnListarMisCursos(boton){
		$("#contenedorPrincipalEstudiante").empty();
		$(".centrado").fadeIn("slow");
		$.ajax({
			url:"../../Controller/ControladoraEstudiante.php",
			type:'POST',
			data:{consulta:"getCursosEstudiante",
			idEstudiante:$(boton).attr("data-idestudiante")  },
			success: function(responseText){

				$(".centrado").fadeOut("slow", function(){
					$("#contenedorPrincipalEstudiante").load("ListarCursosEstudiante.php", {cursos:responseText}).fadeIn("slow");
				}); 
			},
			error: function (xhr, thrownError) {
				$("#contenedorPrincipalEstudiante").html("Error...");
			}
		}); 

	}  

	function darmatricularCurso(){

		$('.butonMatricula').on('click',function(){

		cerrarMatricularCurso();

		var contraCurso = $("#informacion").attr("data-contraCurso");
		var idCurso = $("#informacion").attr("data-idCurso");
		var idEstudiante = $("#informacion").attr("data-Estudiante");
		var contraDigitada=$("#contrasenia").val();
		$("#contrasenia").attr("value","");

		if(contraCurso === contraDigitada ) {

			alertify.success("Contraseña correcta");
			$(".centrado").fadeIn("slow");

			$.ajax({
				url:"../../Controller/ControladoraEstudiante.php",
				type:'POST',
				data:{consulta:"matricularCurso",
				idCurso: idCurso,
				idEstudiante: idEstudiante},
				success: function(responseText){
					if(responseText == 1){
					   $(".centrado").fadeOut("slow", function(){
		                   // $("#contenedorPrincipalEstudiante").load("ListarCursosEstudiante.php", {cursos:responseText}).fadeIn("slow");
		              });
                    }else{
                        alertify.error("No se pudo tramitar la matrícula intentelo más tarde.");
                    } 
				},
				error: function (xhr, thrownError) {
					$("#contenedorPrincipalEstudiante").html("Error...");
				}
			}); 

		}else{
			alertify.error("Contraseña incorrecta");

		}  

		});
	}


	function irxEamen(etiqueta){
       var idexamen=  $(etiqueta).attr("data-id") ;
       var nombre = $(etiqueta).attr("data-nombre"); 
       var tiempo =  $(etiqueta).attr("data-tiempo"); 
        
       
		//var idevaluacion=$("#");
$("#contenedorPrincipalEstudiante").empty();
$(".centrado").fadeIn("slow");
		$.ajax({
			url:"../../Controller/ControladoraEvaluacion.php",
			type:'POST',
			data:{consulta:"recuperarPreguntas",
			id:idexamen},
			success: function(responseText){
				//alert( "Respuesta="+responseText);
                        $(".centrado").fadeOut("slow", function(){

				$("#contenedorPrincipalEstudiante").load("vistaExamen.php", {listaPreguntas:responseText ,nom:nombre,time:tiempo}).fadeIn("slow");
                    });
			},
			error: function (xhr, thrownError) {
				$("#contenedorPrincipalEstudiante").html("Error...");
			}
		}); 

	}
   ////////////////////////////////////Metodos vista materiales estudiante

   function btnverMateriales(boton){
        $("#contenedorPrincipalEstudiante").empty();
	   	$(".centrado").fadeIn("slow");
	   	var id = $(boton).attr("data-idcurso"), nombre = $(boton).attr("data-nombre");
    
        $.ajax({
	        url:"../../Controller/ControladoraModulo.php",
	        type:'POST',
	        data:{consulta:"obtenerModulos", idCurso:id},
	        success: function(responseText){

           		$(".centrado").fadeOut("slow", function(){
           			$("#contenedorPrincipalEstudiante").load("materialesCurso.php", {idCurso:id, 
           				nombreCurso:nombre, modulos:responseText}).fadeIn("slow");
           		});
           	}
        }); 
    }  

    function cargarEstructuraCursos(idCurso){
    	$.ajax({
    		url:"../../Controller/ControladoraModulo.php",
    		type:'POST',
    		data:{consulta:"obtenerModulos", idCurso:idCurso},
    		success: function(responseText){
    			alert(responseText);
    			$("#contenedorEstructuraCurso").load("listaEstructuraCursosEstudiante.php", {modulos:responseText}).fadeIn("slow");
    		}
    	});
    }

     function clickVerTemasDeClase(){
        $(".btnClickClase").off("click");
        $(".btnClickClase").on("click", function(){
            $("#nomClase").text($(this).text());
            $("#nomClase").attr("data-idclase", $(this).attr("data-id"));
            obtenerTemasClase($(this).attr("data-id")); 
        });
    }

    function obtenerTemasClase(idClase){
        $.ajax({
            url:"../../Controller/ControladoraModulo.php",
            type:'POST',
            data:{consulta:"getTemasClase", idClase:idClase},
            success: function(responseText){
                cargarTemasClase(responseText);
            }
        });
    }

    function cargarTemasClase(data){
        $("#mainClase").empty();
        var temas = JSON.parse(data);
        if(temas.length > 0){
            var contenido = "";
            var idTema = 0;
            var archivos = "";
            var evaluaciones = "";
            var idListaArchivos = "";
            var idListaEvals = "";
            var adjuntos = [];

            $.each(temas, function(i, tema) {
                if(idTema != tema.idTema){
                    if(idListaArchivos != "" && idListaEvals != ""){
                        var item = {};
                        item["id"] = '#'+idListaArchivos;
                        item["contenido"] = archivos;
                        adjuntos.push(item);
                        
                        item = {};
                        item["id"] = '#'+idListaEvals;
                        item["contenido"]= evaluaciones;
                        adjuntos.push(item);

                        archivos = "";
                        evaluaciones = "";
                        idListaArchivos = "";
                        idListaEvals = "";
                    }
                    idTema = tema.idTema;
                    idListaArchivos = "listArch"+idTema;
                    idListaEvals = "listEvals"+idTema;
                
                    contenido += '<section class="tema"><header><h3>'+tema.tituloTema+
                                '<button class="btnEditarClase"><span class="icon-pencil"></span></button>'+
                                '<button class="btnEliminarOpcion"><span class="icon-times"></span></button>'+
                                '</h3></header><div class="contenido"><p>'+tema.descTema+'</p>'+
                                '<section class="archivos"><h4><span class="icon-box-add iconoIlustrativo azul">'+
                                '</span>Archivos</h4><ul id="'+idListaArchivos+'" class="listaArchivos">'+
                                '</ul></section><section class="evaluaciones">'+
                                '<h4><span class="icon-paste iconoIlustrativo verde"></span>Evaluaciones</h4>'+
                                '<ul id="'+idListaEvals+'"></ul></section></div></section>';
                    $("#mainClase").append(contenido);
                    contenido = "";
                    if( tema.idArchivo != null){
                        archivos += '<li>'+getTipoArchivo(tema)+'</li>';
                    }
                    if( tema.idEvaluacion != null){
                        evaluaciones += '<li class="evalAdjunta"><span class="icon-clipboard"></span><a onclick=irxEamen(this) href="#" data-id="'+
                        tema.idEvaluacion+'" data-nombre="'+tema.nomEvaluacion+'" data-tiempo="'+tema.tiempo+'">'+tema.nomEvaluacion+'</a></li>';
                    }
                }else{
                    if( tema.idArchivo != null){
                    archivos += '<li>'+getTipoArchivo(tema)+'</li>';
                    }
                    if( tema.idEvaluacion != null){
                        evaluaciones += '<li class="evalAdjunta"><span class="icon-clipboard"></span><a onclick=irxEamen(this) href="#" data-id="'+
                        tema.idEvaluacion+'" data-nombre="'+tema.nomEvaluacion+'" data-tiempo="'+tema.tiempo+'">'+tema.nomEvaluacion+'</a></li>';
                    }
                }
            });
            var item = {};
            item["id"] = '#'+idListaArchivos;
            item["contenido"] = archivos;
            adjuntos.push(item);
            item = {};
            item["id"] = '#'+idListaEvals;
            item["contenido"]= evaluaciones;
            adjuntos.push(item);

        agregarAdjuntos(adjuntos);
        }else{
            $("#mainClase").append('<p class="card textNoResult"><span class="icon-info"></span>Aun no hay información agregada a esta clase</p>');
        }
    }

    function getTipoArchivo(tema){
        var resultado = "";
        if(tema.rutaArchivo.indexOf('docs') != -1){
            resultado ='<a href="../../'+tema.rutaArchivo+'" download>'+getIconoExtension(tema.rutaArchivo)+
                        tema.descArchivo+'</a>';
        }else{
            resultado = '<img src="../../'+tema.rutaArchivo+'" width="50">'+
                                '<a href="../../'+tema.rutaArchivo+'" download>Admin icon</a>';
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
	//////////////////////////////////////////