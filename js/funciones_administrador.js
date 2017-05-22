    clickBtnBuscarCurso();
    clickVerEstudiantesCurso();
    clickBtnPaginacionDerecha();
    clickBtnPaginacionIzquierdo();
    clickVerListaEstudiantes();
    clickListarProfesores();
    clickListarCursos();
    clickInsertarProfesor();
    showCalendario();
    clickListarProfesoresModal();
    clickAgregarCurso();
    clickCerrarModal();
    clickBtnEditCurso();
    clickBtnBorrarCurso();

    function showCalendario(){
        $('.fecha').datetimepicker({
            timepicker:false,
            format:'d/m/Y'
        });
    }

    //////////////////////////Listar todos los estudiantes

    function clickVerListaEstudiantes(){
        $("#btnListEstudiantes").off("click")
        $("#btnListEstudiantes").on("click", function(){
            $(".centrado").fadeIn("slow");
           cargarEstudiantes(".contenedor", "VistaEstudiantesAdmin.php", "", 0);
        });
    }

    function cargarEstudiantes(contenedorCarga, vistaACargar, strBusqueda, limit){
         $(contenedorCarga).empty();
         $.ajax({
            url:"../../Controller/ControladoraEstudiante.php",
            type:'POST',
            data:{consulta:"getEstudiantesLimit", 
            strBusqueda:strBusqueda,
            inicioLimit:limit},
            success: function(responseText){

                var data = JSON.parse(responseText);
                if(data.length > 0){

                    $(".centrado").fadeOut("slow", function(){

                        $(contenedorCarga).load(vistaACargar,
                            {estudiantes:responseText, tipoListado:"estudiantes"}).fadeIn("slow");   

                    });
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                     $(".btnDer").attr("data-hayregistros", 1);
                 }
             }else{

                $(contenedorCarga).empty();
                $(".centrado").fadeOut("slow", function(){
                    $(contenedorCarga).load(vistaACargar,
                        {estudiantes:responseText, tipoListado:"estudiantes"}).fadeIn("slow");
                });
                $(".btnDer").attr("data-hayregistros", 0);

            }
        }
    });

 }

  ///////////////////////////////////Lista de estudiantes funciones
    function clickVerEstudiantesCurso(){
        $(".btnGetEstudiantesCurso").off("click")
        $(".btnGetEstudiantesCurso").on("click", function(){
            $(".centrado").fadeIn("slow");
            cargarEstudiantesDeCurso(".contenedor", "VistaEstudiantesAdmin.php", $(this).attr("data-idcurso"), "", 0);
        });
    }

    function cargarEstudiantesDeCurso(contenedorCarga, vistaACargar, idCurso, strBusqueda, limit){
        $(contenedorCarga).empty();
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
                    
                    $(".centrado").fadeOut("slow", function(){
                   
                        $(contenedorCarga).load(vistaACargar, {estudiantes:responseText, 
                                                tipoListado:"estudiantesDeCurso", idCurso:idCurso}).fadeIn("slow");   
                        
                    });
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                         $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                  
                    $(contenedorCarga).empty();
                    $(".centrado").fadeOut("slow", function(){
                            $(contenedorCarga).load(vistaACargar,{estudiantes:responseText, 
                                                    tipoListado:"estudiantesDeCurso", idCurso:idCurso}).fadeIn("slow");
                    });
                    $(".btnDer").attr("data-hayregistros", 0);
                     
                }
            }
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
                        cargarCursos("#contenedorListado", "ListarCursos.php", $.trim($(".inputBusqueda").val()), 
                                    limit.toString());
                    break;
                    case 'estudiantesDeCurso':
                        $(".centrado").fadeIn("slow");
                        cargarEstudiantesDeCurso("#contenedorListado", $("#idCurso").val(), 
                                                $.trim($(".inputBusqueda").val()), limit.toString());
                    break;
                    case 'profesores':
                        listarProfesores("#contenedorListado","VistaProfesores.php",$.trim($(".inputBusqueda").val()), 
                                        limit.toString());
                    break;
                    case 'estudiantes':
                        $(".centrado").fadeIn("slow");
                        cargarEstudiantes("#contenedorListado","listaEstudiantesAdmin.php",$.trim($(".inputBusqueda").val()), 
                                        limit.toString());
                    break;
                    case 'profesoresModal':
                        listarProfesoresModal($.trim($(".inputBusqueda").val()), limit.toString());
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
                        cargarCursos("#contenedorListado", "ListarCursos.php", $.trim($(".inputBusqueda").val()), 
                                    limit.toString());
                    break;
                    case 'estudiantesDeCurso':
                        $(".centrado").fadeIn("slow");
                        cargarEstudiantesDeCurso("#contenedorListado", $("#idCurso").val(), 
                                                $.trim($(".inputBusqueda").val()), limit.toString());
                    break;
                    case 'profesores':
                        listarProfesores("#contenedorListado","VistaProfesores.php",$.trim($(".inputBusqueda").val()),
                                        limit.toString());
                    break;
                    case 'estudiantes':
                        $(".centrado").fadeIn("slow");
                        cargarEstudiantes("#contenedorListado","listaEstudiantesAdmin.php",$.trim($(".inputBusqueda").val()), 
                                        limit.toString());
                    break;

                    case 'profesoresModal':
                        listarProfesoresModal($.trim($(".inputBusqueda").val()), limit.toString());
                    break; 
                }
            }else{
                alertify.message("No hay más registros para mostrar.");
            }
        });
    }
//////////////////////////////////////Fin de funciones lista estudiantes
    
    function clickListarProfesoresModal(){
        $("#nomProfe").off("click");
        $("#nomProfe").on("click", function(){
            $(".listProfesores").fadeIn("slow");
            listarProfesoresModal("", 0);
        });
    }
    function listarProfesoresModal(stringBusqueda, limite){
        $.ajax({
            url:"../../Controller/ControladoraProfesor.php",
            type:'POST',
            data:{consulta:"listarProfesoresLimit", strBusqueda:stringBusqueda, inicioLimit:limite},
            success: function(responseText){
                var data = JSON.parse(responseText);
                var filas = "";
                $("#tbListProfesores tbody").empty();
                if(data.length > 0){
                    $.each(data, function(i, profe) {
                        filas +="<tr class='trNomProf' data-id='"+profe.id+"' data-correo='"+profe.correo+"' data-nombre='"+profe.nombreCompleto
                            +"'><td>"+profe.nombreCompleto+"</td></tr>";
                        }); 
                    $("#tbListProfesores tbody").append(filas);
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                        $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                    $(".btnDer").attr("data-hayregistros", 0);
                    $("#tbListProfesores tbody").append("<tr><td>No hay resultados</td></tr>");
                }
                clickNombreProfe();
                $(".loader").fadeOut(function(){
                    $("#tbListProfesores").fadeIn("slow");
                });
            }
        });
    }

    function clickNombreProfe(){
        $("body").off("click", ".trNomProf");
        $("body").on("click", ".trNomProf", function(){
            $("#nomProfe").val($(this).attr("data-nombre"));
            $("#idProfe").val($(this).attr("data-id"));
            $("#correoProfe").val($(this).attr("data-correo"));
            $(".listProfesores").fadeOut("slow");
        });
    }
    $("#formCurso").on("submit", function(e){
        e.preventDefault();
        var data = $(this).serializeArray();
        if(hayCampoVacio(data)){
            alertify.error("Por favor, llene todos los campos.");
        }else if(!validarPass()){
            alertify.error("Las contraseñas no coinciden.");
        }else if(validarFechaMenorActual(document.formCurso.fechaInicio.value.trim())
           || validarFechaMenorActual(document.formCurso.fechaFinaliza.value.trim())){
            alertify.error("Las fecha es menor a la actual.");
        }else{
            registrarCurso(data);
            alertify.success("Enviando...");
        }
    });

    function registrarCurso(data){
       $.ajax({
        url: "../../Controller/ControladoraCurso.php",
        type: 'POST',
        data: data,
        success: function (responseText) {  
            if(responseText == 1){
                $('#formCurso').each (function(){
                    this.reset();
                });
                listarCursos();
                alertify.success("Operación realizada con éxito.");
            }else{
                alertify.error("Error al realizar la operación, vuelva a intentarlo.");
            } 
        }
    });
   }

        function validarPass(){
            var iguales = true;
            var pass1 = document.formCurso.pass1Curso.value.trim();
            var pass2 = document.formCurso.pass2Curso.value.trim();

            if(pass1 != pass2){
                iguales = false;
            }
            return iguales;
        }

        function hayCampoVacio(data){
            var respuesta = false;
            $(data).each(function(i, field){
                if(field.value.trim().length == 0){
                    respuesta = true;
                }
            });

            return respuesta ;
        }
        function validarFechaMenorActual(date){
            var x=new Date();
            var fecha = date.split("/");
            x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
            var today = new Date();
         
            if (x >= today)
                return false;
            else
                return true;
        }
    //acciones del submenu del nav en cursos
    function clickListarCursos(){
        $("#btnListCurso").off("click");
        $("#btnListCurso").on("click", function(){
            $(".centrado").fadeIn("slow");
            $(".contenedor").empty();
            cargarCursos(".contenedor", "VistaPaginacionCursos.php", "", 0);
        });
    }
    
    function cargarCursos(contenedorCarga, vistaACargar, strBusqueda, limit){
        $.ajax({
            url:"../../Controller/ControladoraCurso.php",
            type:'POST',
            data:{consulta:"getCursosLimit", strBusqueda:strBusqueda, inicioLimit:limit},
            success: function(responseText){
                
                var data = JSON.parse(responseText);
                if(data.length > 0){

                    $(contenedorCarga).empty();
                    
                    $(".centrado").fadeOut("slow", function(){
                   
                        $(contenedorCarga).load(vistaACargar,
                                            {cursos:responseText}).fadeIn("slow");     
                    });
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                         $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                  
                    $(contenedorCarga).empty();
                    $(".centrado").fadeOut("slow", function(){
                            $(contenedorCarga).load(vistaACargar,
                                            {cursos:responseText}).fadeIn("slow");
                    });
                    $(".btnDer").attr("data-hayregistros", 0);
                }       
            }
        });
    }

    function clickAgregarCurso(){
        $("#btnAregarCurso").off("click");
        $("#btnAregarCurso").on("click", function(){
            $(".contenedor").load("Insertarcursos.php",{tipoPeticion:"insert"});
        });
    }
    
    function clickCerrarModal(){ 
        $(".cerrarModal").off("click");
        $(".cerrarModal").on("click",function(){
            $(this).parent().parent().fadeOut("slow");
            $(this).siblings("table").css("display", "none");
            $(this).siblings("div.loader").css("display", "block");
        });
    }

    function clickBtnEditCurso(){
        $(".btnEditCurso").off("click");
        $(".btnEditCurso").on("click", function(){
            $(".contenedor").load("Insertarcursos.php", {tipoPeticion:"update", idCurso:$(this).attr("data-idcurso"), 
                codCurso:$(this).attr("data-codigo"), nombre:$(this).attr("data-nombre"), 
                fechaInicio:$(this).attr("data-fechainicio"), fechaFinaliza:$(this).attr("data-fechafinaliza"), 
                idProfe:$(this).attr("data-codprofe"), nomProfe:$(this).attr("data-nomprofe"), 
                contra:$(this).attr("data-access")}).fadeIn("slow");
        });
    }

    function clickBtnBorrarCurso(){
        $(".btnBorraCurso").off("click");
        $(".btnBorraCurso").on("click", function(){
            var idCurso = $(this).attr("data-idcurso"), nombreCurso = $(this).attr("data-nombrecurso");
            alertify.confirm('PlatCourse informa', 
                '¿Esta seguro de eliminar el curso:'+nombreCurso+'?',
                function(){
                    eliminarCurso(idCurso);
                }
                , function(){
                    alertify.success('Eliminación cancelada')
            }); 
        });
    }

    function eliminarCurso(id){
        $.ajax({
            url: "../../Controller/ControladoraCurso.php",
            type: 'POST',
            data: {consulta:"EliminarCursos", idCurso:id},
            success: function (responseText) {
                if(responseText == 1){
                    alertify.success("Operación realizada con éxito.");
                    listarCursos();
                }else{
                    alertify.error("Error al realizar la operación, vuelva a intentarlo.");
                } 
            }
        });
    }

    /*Funciones del nav para profesores*/

    /*Carga el formulario de registro*/
    function clickInsertarProfesor(){
        $("#btnAgregarProfesor").off("click");
        $("#btnAgregarProfesor").on("click", function(){
            $(".contenedor").load("registrarProfesor.php").fadeIn("slow");
        });
    }

    function clickListarProfesores(){
        $("#btnListProfesor").off("click");
        $("#btnListProfesor").on("click", function(){
            $(".centrado").fadeIn("slow");
            $(".contenedor").empty();
            listarProfesoresLimit(".contenedor", "VistaPaginacionProfesores.php", "", 0);
        });

    }

    function listarProfesoresLimit(contenedorCarga, vistaACargar, stringBusqueda, limite){
        $.ajax({
            url:"../../Controller/ControladoraProfesor.php",
            type:'POST',
            data:{consulta:"listarProfesoresLimit", strBusqueda:stringBusqueda, inicioLimit:limite},
            success: function(responseText){
                var data = JSON.parse(responseText);
                if(data.length > 0){

                    $(contenedorCarga).empty();
                    
                    $(".centrado").fadeOut("slow", function(){
                        $(contenedorCarga).load(vistaACargar, {profesores:responseText}).fadeIn("slow"); 
                    });
                    if(data.length < 15){
                        $(".btnDer").attr("data-hayregistros", 0);
                    }else{
                         $(".btnDer").attr("data-hayregistros", 1);
                    }
                }else{
                  
                    $(contenedorCarga).empty();
                    $(".centrado").fadeOut("slow", function(){
                        $(contenedorCarga).load(vistaACargar, {profesores:responseText}).fadeIn("slow");
                    });
                    $(".btnDer").attr("data-hayregistros", 0);
                }
            }
        });
    }

    function clickEditarProfesor(boton){

       $( "#modificarProfesores" ) .fadeIn("slow") ;

       $(".nombre").text( $(boton).attr('data-nombre'));
       $("#cedula").attr("value", $(boton).attr('data-cedula'));
       $("#fecha").attr("value", $(boton).attr('data-fechanac'));
       $("#correo").attr( "value", $(boton).attr('data-correo'));
       $("#telefono").attr("value", $(boton).attr('data-telefono'));
       $("#edad").attr("value", $(boton).attr('data-edad'));
   }  

   function guardarCambiosProfesor(){


      var telefono = $("#telefono").val();
      var correo = $("#correo").val();
      var cedula = $("#cedula").val();
      var fecha = $("#fecha").val();
      var edad = $("#edad").val();

      alertify.confirm("<h3> Comfirmar Cambios  </b></h3>", function (e) {

        if (e) {
           alertify.success("Cambios Guardados" ); 

                    /*  $.ajax({
                        url:"../../Controller/ControladoraCurso.php",
                        type:'POST',
                        data:{consulta:"",
                              telefono: telefono,
                              correo: correo,
                              cedula: cedula},
                    success: function(responseText){
                        
                             
                          
                        }); 
                    },
                    error: function (xhr, thrownError) {
                        
                     }
                 });  */

             }else{ 
                alertify.error("Cancelado" );                 
            }
            cerrarModificarProfesor();
            

        }).setHeader('<em> PlatCourse </em>'); 

  }

    function cerrarModificarProfesor(){  
        $( "#modificarProfesores") .fadeOut("slow") ;
    }


    function eliminarProfesor(boton){
        var id = $(boton).attr("data-id");
        var nombreProfe = $(boton).attr("data-nombre");
        alertify.confirm("<p> ¿Está seguro de eliminar al profesor <strong>"+nombreProfe+"</strong>?  </p>", function (e) {
         if (e) {
          $.ajax({
              url:"../../Controller/ControladoraProfesor.php",
              type:'POST',
              data:{consulta:"eliminarProfesor",
              idProfesor: id},
              success: function(responseText){

                if(responseText){
                    alertify.success("Profesor Eliminado" );   
                    eliminarProfesorGrafica(id);
                }else{
                 alertify.error("Problemas al eliminar" ); 
             }    
             },

            error: function (xhr, thrownError) {}
            });  

        }else{ 
            alertify.error("Cancelado" );                 
        }
        }).setHeader('<em> PlatCourse </em>'); 
    }

          function eliminarProfesorGrafica(idProfesor){

            $(".card").each(function(i){
              
               if( $(this).find("button").attr("data-id") === idProfesor ){
              
                $(this).fadeOut("slow",function (){
                          $(this).remove();
                });
               }
            });
          }

    function verCursosProfesor (boton){
        $(".contenedor").empty();
        $(".loader centrado").fadeIn("slow");
        $.ajax({
            url:"../../Controller/ControladoraCurso.php",
            type:'POST',
            data:{consulta:"getCursosPorProfesor", idProfesor:$(boton).attr("data-id")},
            success: function(responseText){
                $(".centrado").fadeOut("slow", function(){
                    $(".contenedor").load("listCursosProfesor.php", {cursos:responseText}).fadeIn("slow");
                }); 
            }
        });  
    }

    function clickBtnBuscarCurso(){
        $(".btnBuscar").off("click");
        $(".btnBuscar").on("click", function(){
            
            switch($(this).attr("data-tipolistado")){
                case 'profesores':
                    listarProfesoresLimit("#contenedorListado", "VistaProfesores.php", $.trim($(".inputBusqueda").val()), 0);
                break;

                case 'estudiantes':
                    cargarEstudiantes("#contenedorListado","listaEstudiantesAdmin.php",$.trim($(".inputBusqueda").val()), 0);
                break;
                
                case 'estudiantesDeCurso':
                    cargarEstudiantesDeCurso("#contenedorListado", "listaEstudiantesAdmin.php", $("#idCurso").val(), 
                                                $.trim($(".inputBusqueda").val()), 0);
                break;
                
                case 'cursos':
                    $("#contenedorListado").empty();
                    cargarCursos("#contenedorListado", "ListarCursos.php", $.trim($(".inputBusqueda").val()), 0);
                break;
                case 'profesoresModal':
                    $("#tbListProfesores").fadeOut(function(){
                        $("#loadModalProfesor").fadeIn();
                    });
            
                    listarProfesoresModal($.trim($(".inputBusqueda").val()), 0);
                break;
            }
           
        });
    }

    function listarCursosDeProfesor(idProfesor, strBusqueda, limit){
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
                    }
                }else{
                    $(".btnDer").attr("data-hayregistros", 0);
                    $("#contenedorListadoCursos").empty();
                    $("#contenedorListadoCursos").append("<p class='card textNoResult'>No hay resultados</p>");
                }
            }
        });
    }


          function buscarCursoGrafico(nombre){
                        alert("busccar "+nombre);
           var resultado=false;
          
         
            $(".card").each(function(i){
              
               if( $(this).find("header").attr("data-nombre")  === nombre ){
 
                resultado=true;
              
              }
            });

             if(resultado == false){
                    $("#resultadoBusqueda").html("<p >No hay resultados</p>");
             }else{
                    ocultarCursos(nombre) ;
            }
         }
          
          function ocultarCursos(nombre){
              
                      
            $(".busquedaCurso").each(function(i){
              if( $(this).find("hidden").attr("data-nombre")  != nombre ){
                 $(this).hide();
              
             }
          });
      }
         
////////////////////////////////////Eliminar estudiante
      
    function clickEliminarEstudiante(boton){
        var id = $(boton).attr("data-idEstudiante");
        var nombreEstudiante = $(boton).attr("data-nombre");

        alertify.confirm("<p>Al eliminar el estudiante, se borrará toda la información asociada.<br>"+
                            "¿Realmente desea eliminar al estudiante <strong>"+nombreEstudiante+"</strong>?</p>", 
                            function (e) {
            if (e) {
                $.ajax({
                    url:"../../Controller/ControladoraEstudiante.php",
                    type:'POST',
                    data:{consulta:"eliminarEstudiante",
                    idEstudiante: id},
                    success: function(responseText){
                        if(responseText != 0){
                            alertify.success("Estudiante Eliminado" ); 
                        }else{
                            alertify.error("Problemas al eliminar" ); 
                        }    
                        eliminarEstudianteGrafica(id);
                    },
                    error: function (xhr, thrownError) {}
                    });  
            }else{ 
                alertify.error("Cancelado" );                 
            }
        }).setHeader('<em> PlatCourse </em>'); 
    }  

    function eliminarEstudianteGrafica(id){

            $(".card").each(function(i){
           
               if( $(this).find("button").attr("data-idEstudiante") === id ){
              
                $(this).fadeOut("slow",function (){
                          $(this).remove();
                });
               }
            });
          }
