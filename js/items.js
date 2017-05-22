$(document).ready(function () {
    alertify.set('confirm','transition', 'fade');
    alertify.set('notifier','position', 'top-right');

    //$('#cargandoEvaluacion').fadeIn('slow');
    $('form').submit(function (e) {
        //alert("click form");
        e.preventDefault();

        var data = $(this).serializeArray();
        var consulta = $(this).children('input[name=consulta]').val();

        if(verificarCamposVacios(data)){
           if(consulta=== "selec_unica"){
            //  alert("select unica");
              selectUnica(data);
            }else if(consulta=== "selec_multi"){
              //  alert("select multi");
                selectMulti(data);
            }else if(consulta=== "falso_verdadero"){
               // alert("falso verdadero");
                falsoVerdadero(data);
            }else if(consulta=== "asocie"){
               // alert("asocie");
                asocie(data);
            }
            else if(consulta=== "completarOraciones"){
                //alert("Completar");
                completarOraciones(data);
               
            }else if(consulta=== "mod_pre_select_multi"){
                //alert("modificar multi "+$(this).children('input[type=hidden]').attr('data-idPregunta'));
                actualizarSeleccionMultiple(data, $(this).find('input[type=hidden]').attr('data-idPregunta'));
                
            }else if(consulta=== "mod_pre_select_unica"){
                //alert("modificar multi "+$(this).children('input[type=hidden]').attr('data-idPregunta'));
                actualizarSeleccionUnica(data, $(this).find('input[type=hidden]').attr('data-idPregunta'));
                
            }else if(consulta=== "Respuesta_Corta"){
                //alert("falso verdadero");
                respuestaCorta(data); //456
            }else if(consulta=== "Pregunta_Desarrollo"){
                //alert("falso verdadero");
                preguntaDesarrollo(data); //456
            }else if(consulta=== "mod_pre_respuesta_corta"){
                //alert("modificar multi "+$(this).children('input[type=hidden]').attr('data-idPregunta'));
                actualizarRespuestaCorta(data, $(this).find('input[type=hidden]').attr('data-idPregunta'));
                
            }else if(consulta=== "mod_pre_respuesta_desarrollo"){
                //alert("modificar multi "+$(this).children('input[type=hidden]').attr('data-idPregunta'));
                actualizarRespuestaDesarrollo(data, $(this).find('input[type=hidden]').attr('data-idPregunta'));
                
            }else if(consulta=== "mod_pre_completar"){
                //alert("modificar multi "+$(this).children('input[type=hidden]').attr('data-idPregunta'));
                actualizarComplete(data, $(this).find('input[type=hidden]').attr('data-idPregunta'));
                
            }else if(consulta=== "mod_pre_falso_verdadero"){
                //alert("modificar multi "+$(this).children('input[type=hidden]').attr('data-idPregunta'));
                actualizarFalsoVerdadero(data, $(this).find('input[type=hidden]').attr('data-idPregunta'));
                
            }else if(consulta=== "mod_pre_asocie"){
                modificarAsocie(data, $(this).find('input[type=hidden]').attr('data-idpregunta'));
            }
        }else{
            alertify.error('Existen campos vacios');
        }

        


    });
    clickEditAsocie();
        darEventoBtnEstado();

    //llamado accion de eliminar pregunta
    darEventoEliminarPregunta();

    darEventoEditarPregunta();
    //funcion para capturar evento de cerrar modal de pregunta
    $(".cerrarModal").on('click',function(){

        var modal = $(this).attr('data-idcerrar');
        var form = $(this).attr('data-classform');

        limpiarOcultarFormulario(modal,form);
    });

    //funcion para mostrar modal para agregar preguntas
    $('.mostrarModal').on('click',function(){
        var idform = $(this).attr('data-idform');

        $('#'+idform).fadeIn('slow');
    });
});


function verificarCamposVacios(data){

    var resultado = true;
    $(data).each(function(i, field){
        //alert('*'+field.value.trim()+"*, "+field.value.trim().length);
        if(field.value.trim().length<1 && resultado=== true){
          //  alert(field.value);
            resultado = false;
        }
    });
    return resultado;
}

//funcion para ocultar modal y limpiar formulario de las preguntas
function limpiarOcultarFormulario(idForm,classForm){
    //alert('limpiar ocultar');
    $("#"+idForm).fadeOut("slow",function(){
        $('.'+classForm).each(function(){
          this.reset();
        });
        $('.'+classForm).find('textarea').text("");
        $('#'+idForm).find('input[type=hidden]').val($('#'+idForm).find('input[type=hidden]').attr('data-valueInput'));
    });
}

function darEventoMenuPregunta(){
    $('.btnMenuDesplegable').off('click');
    $(".btnMenuDesplegable").on("click",function(){
        if ( $(this).next().is(":visible")){
            $(this).next().fadeOut("slow");
        }else{
            $(this).next().fadeIn("slow");
        }
    });
}

function darEventoEliminarPregunta(){
    $('.eliminarPregunta').on('click',function(){

        var objeto = $(this);
        var id = $(this).attr('data-idPregunta');

        alertify.confirm("<p style='font-size: 17px;font-weight: bold;'>Notificación PlatCourse </p>",
            "¿Desea eliminar la pregunta?",
        function(){
            if(objeto.hasClass('cargado')){
                var data = {consulta: 'eliminarPregunta',idPre:id};
                
                ajaxCargado(data,objeto);
            }else{
                eliminarPreguntaGUI(id,objeto);
            }  
        },function(){
            alertify.error('Cancel');
        });  
    });

}

function eliminarPreguntaGUI(id,objeto){
    var cant = $('.'+$(this).attr('data-classPregunta')).length;
    $('.'+objeto.attr('data-classPregunta')).each(function(div,i){
                if(id === $(this).attr("data-idPregunta")){
                    if (cant === 1) {
                        $('.'+objeto.attr('data-divPregunta')).find('h4').fadeOut(700, function() { $('.'+objeto.attr('data-divPregunta')).find('h4').remove(); });
                    }
                    $(this).fadeOut(700, function() { $(this).remove();alertify.success("Pregunta Eliminada"); });
                }
            });
}

function ajaxCargado(data,objeto){
    $.ajax({
            url: '../../Controller/ControladoraEvaluacion.php',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (resp) {

                //alert(resp.tipo+'  '+resp.success);
                if(resp.success > 0){
                    if(resp.tipo === 'eliminarPregunta'){
                        //alertify.success('Pregunta eliminada');
                        eliminarPreguntaGUI(resp.id,objeto);
                    }else if(resp.tipo === 'actualizarPregunta'){
                        alertify.success('Pregunta actualizada');
                    }
                }else{

                    alertify.error('Ocurrió un error :(');
                }
                
                
            },
            error: function (jqXHR, estado, error) {
                alertify.error('Ocurrió un error :(');
                console.log("fallo");
            }
        });
}



function darEventoEditarPregunta(){

    $('.editarPregunta').on('click',function(){

       // alert('editar '+$(this).attr('data-classPregunta'));

        var id = $(this).attr('data-idPregunta');
        var idForm = $(this).attr('data-idForm');
        var classPregunta = $(this).attr('data-classPregunta');

        $(".btnMenuDesplegable").next().fadeOut('slow');
        $("#"+idForm).fadeIn("slow");

         if(classPregunta === 'pre_selec_multi'){
            cargarSeleccionMultiple(id,$(this));
        }else if(classPregunta === 'pre_selec_unica'){
            cargarSeleccionUnica(id);

        }else if(classPregunta == 'pre_respuesta_corta'){
            cargarRespuestaCorta(id);

        }else if(classPregunta == 'pre_pregunta_desarrollo'){
            cargarRespuestaDesarrollo(id);

        }else if(classPregunta == 'pre_completar'){
            cargarComplete(id);
            
        }else if(classPregunta == 'pre_falso_verdadero'){
            //alert('falso verdadero');
            cargarFalsoVerdadero(id);
        }

    });     
}

//seleccion multiple

function addOptionMulti(){
    var temp = $(".opt_multi tr").length;
    if(temp <7){

        $(".opt_multi").append("<tr><td style='display: none;'>"+temp+"</td><td><textarea name='pregunta' placeholder='Ejemplo: ¿Cúal es el nombre de..?' class='input_redondo_oscuro' required></textarea></td><td><button type='button' onclick='deleteOptionMultiple("+temp+")' class='botonCircular rojo_flat'><span class='icon-minus'></span></button></td></tr>");
    }else{

        alertify.error("La cantidad máxima de opciones es 7");
    }
}

function selectMulti(data){

    
    //var id = $('.pre_selec_multi').length+1;
    var id = ultimoId('pre_selec_multi');

    var html = "<div data-idPregunta='"+id+"' class='pre_selec_multi'>"
    +"<div class='cntMenuDesplegable'>"
    +"<span class='icon-list2 btnMenuDesplegable'></span>"
    +"<aside class='card'><ul>"
    +"<li>Responder</li>"
    +"<li data-classPregunta='pre_selec_multi' data-idPregunta='"+id+"' data-idForm='formSelecMultiple' class='editarPregunta'>Editar</li>"
    +"<li data-classPregunta='pre_selec_multi' data-divPregunta='seleccion_multiple' data-idPregunta="+id+" class='eliminarPregunta'>Eliminar</li>"
    +"</ul></aside></div><div class='datos-pregunta'>";
    $(data).each(function(i, field){
        if(i===1){
            html+="<h4 data-pregunta='"+field.value+"'>"+field.value;
        }else if(i===2){
            html+="<span data-valor='"+field.value+"'>("+field.value+"pts)</span></h4>";
        }else if(i>1){
            html+="<input type='checkbox' name='option"+id+"' value='"+field.value+"'>"+field.value+"<br>";
        }
    });
    //div para agregar respuestas
     html+=" <br><br><div id='seleccionMultiple"+id + "' dataRespuestaCorrecta='' > </div>";
    //grupo botones identifica todos los check de esa pregunta       //btnEstadoCheck btnEstado
    html+="</div><footer class='footPregunta'><button data-id='"+id+"' data-clase='pre_selec_multi' grupoBotones='option"+id+"' dataEtiqueta='seleccionMultiple"+id + "' dataRespuesta='' dataMetodo='check' class='btnEstado'>Aun no respondida</button></footer></div>";
    
 
    if($('.pre_selec_multi').length  === 0){
        //alert("empty");
        $(".seleccion_multiple").append("<h4 class='tituloPartePrueba'>Selecci&oacute;n Múltiple</h4>");
        $(".seleccion_multiple").append(html);

    }else{
        //alert("!empty")
        $(".seleccion_multiple").append(html);

    }
    alertify.success("Pregunta Insertada");

    limpiarOcultarFormulario('formSelecMultiple','form_select_multiple');

    $(".opt_multi tr").each(function (index){
        if(index  > 3){
            $(this).remove();
        }
    });

   darEventoMenuPregunta();
   darEventoEliminarPregunta();
   darEventoEditarPregunta();
   darEventoBtnEstado();
}

function deleteOptionMultiple(num_fila){
   // alert("delete click "+num_fila);
 
    $(".opt_multi tr").each(function (index) {
    
        $(this).children("td").each(function (index2){
            
            if($(this).text() === ""+num_fila){
                    
                $(this).closest('tr').remove();
            }
        })            
    });
}

function cargarSeleccionMultiple(id,objeto){

    if(objeto.hasClass('cargado')){
       // alert('cargado');
        $('#formSelecMultiple input[type=hidden]').val("carg_mod_pre_select_multi");
        $('#formSelecMultiple input[type=hidden]').attr("data-respuestas",objeto.attr('data-respuestas'));
    }else{
        $('#formSelecMultiple input[type=hidden]').val("mod_pre_select_multi");
    }

    $(".pre_selec_multi").each(function(i){
        if($(this).attr('data-idPregunta') === id){
            $('#formSelecMultiple .cntRespuesta tr').remove();
            $('#formSelecMultiple textarea[name=pregunta]').text($(this).find('h4').attr('data-pregunta'));
            $('#formSelecMultiple input[type=text]').val($(this).find('h4').children('span').attr('data-valor'));
            $('#formSelecMultiple input[type=hidden]').attr("data-idPregunta",id);
            
            $(this).find('input[type=checkbox]').each(function(j){
                var value = $(this).attr('value');
                if(j>3){
                    $('#formSelecMultiple .cntRespuesta').append("<tr><td style='display: none;'>"+j+"</td><td><textarea name='opcion' class='input_redondo_oscuro' required>"+value+"</textarea></td><td><button type='button' onclick='deleteOptionMultiple("+j+")' class='botonCircular rojo_flat'><span class='icon-minus'></span></button></td></tr>");        
                }else{
                    $('#formSelecMultiple .cntRespuesta').append("<tr><td><textarea name='opcion' class='input_redondo_oscuro' required>"+value+"</textarea></td></tr>")
                }                
            });
        }
    });
}

function actualizarSeleccionMultiple(data,id){

    $(".pre_selec_multi").each(function(i){
        if($(this).attr('data-idPregunta') === id){
            var html = "";
            $(data).each(function(i, field){
                var valor = field.value.trim();
                if(i===1){
                    html+="<h4 data-pregunta='"+valor+"'>"+valor;
                }else if(i===2){
                    html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
                }else if(i>1){
    
                    html+="<input type='checkbox' name='option"+id+"' value='"+valor+"'>"+valor+"<br>";
                }
            });
             html+=" <br><br><div id='seleccionMultiple"+id + "' dataRespuestaCorrecta='' > </div>";
            $(this).find('div[class=datos-pregunta]').html(html);

            alertify.success("Pregunta Actualizada");

            limpiarOcultarFormulario('formSelecMultiple','form_select_multiple');

            $(".opt_multi tr").each(function (index){
                if(index  > 3){
                    $(this).remove();
                }
            });

            $('.form_select_multiple').find('textarea').attr('placeholder','Ejemplo: ¿Cúal es el nombre de..?');
            $('#formSelecMultiple input[type=hidden]').val("selec_multi");
        }
    });
}

// seleccion unica
function addOptionUnica(){

    var temp = $(".opt_unica tr").length;
    if(temp <7){

        $(".opt_unica").append("<tr><td style='display: none;'>"+temp+"</td><td><textarea name='pregunta' placeholder='Ejemplo: ¿Cúal es el nombre de..?' class='input_redondo_oscuro' required></textarea></td><td><button type='button' onclick='deleteOptionUnica("+temp+")' class='botonCircular rojo_flat'><span class='icon-minus'></span></button></td></tr>");
    }else{

        alertify.error("La cantidad máxima de opciones es 7");
    }
}



function guiaDarRespuesta(){
    //alert("Selecione la(s) respuestas y presione el boton 'Aun no respondida' ");
    alertify.alert("Guía para responder las preguntas","Selecione la(s) respuestas y presione el boton 'Aun no respondida'");
}

 //------------------------------------------------
function darEventoRadioButton(){
    $('.radioButton').on('click',function(){

        $("#temporalPreguntaUnica").attr("data-groupnameTemp",$(this).attr("data-groupname") ); //Pasa el id de grupo de botones
        $("input[data-groupname = '"+ $(this).attr("data-groupname")+"']").each(function (index) {  //lo recorre
       
            if($(this).is(':checked')){
                $("#temporalPreguntaUnica").attr("data.idTemporal",$(this).val());  
            }
        }); 
   
     });
}

function darEventoBtnEstado(){ //da el evento a el boton rojo de responder 
    $('.btnEstado').off('click');
    $('.btnEstado').on('click',function(){

        var metodo= $(this).attr("dataMetodo"); 
        var boton = $(this);

        if(metodo == "radio"){//si es selecion unica o falso,verdadero lo manda aqui
            respuestasRadio(boton);
            //guardarRespuestaRadio($(this));
        }else if(metodo == "check"){ //si es selecion multiple lo manda aqui
            respuestasCheck(boton);    
            //darEventoBtnEstadoCheck($(this));
        }else if(metodo == "completarOraciones"){ //si es selecion multiple lo manda aqui
            //alert('llamadi');
            respuestaCompletarOraciones($(this).attr("dataIndice"), $(this));
        }
   });
}


function respuestaCompletarOraciones(posicion,boton){//Recorre la pregunta y saca lo el valor de los botones
    var vectorRespuesta = [];
    var verificar=false;
    //alert('metodo');
      
    $(".pre_completar").each(function (index) { 
         //alert('fuera '+posicion +'  '+$(this).attr('data-idPregunta'));
        if(posicion === $(this).attr('data-idPregunta')){ //saca las respuestas que tiene la pregunta
           // alert('entra '+posicion +'  '+$(this).attr('data-idPregunta'));
            var texto=$(this).find('h4').html();
            vectorRespuesta=recorresPreguntaCompletar(texto); //Metodo devuelve un vector con las respuestas    
            verificar =  vectorCompletarLleno(vectorRespuesta);

            if(verificar == false){ //si todos los campos de la pregunta estan llenos se confirma
                // if(confirm("Establecer la(s) opcion(es): ' "+vectorRespuesta.toString()+" ' como respusta")){
                alertify.confirm("<p> "+ "Establecer la(s) opcion(es): ' "+vectorRespuesta.toString()+" ' como respusta"+" </b></p>", function (e) {
                    if (e) {
                       alertify.success("Respuesta Agregada");
             
                        $(boton).attr("dataRespuesta", vectorRespuesta.toString() );

                        //el boton contiene el id de la etiqueta div
                        $("#"+$(boton).attr("dataEtiqueta")).html("<label for='respuesta' dataEtiquetaRespuesta='"+ 
                        $(boton).attr("dataRespuesta")+" '>Respuesta(s) : "+ $(boton).attr("dataRespuesta") +"</label>");
                
                        //Guarda las respuestas en el div en dataRespuestaCompletar dataRespuestaCompletar
               
                        $("#"+$(boton).attr("dataEtiqueta")).attr("dataRespuestaCompletar",$(boton).attr("dataRespuesta"));
                        $(boton).attr("class" ,"btnCambioEstado"); //cambia a color verde el boton de responder
                        $(boton).text('Respondida');

                    }
                }).setHeader('<em> PlatCourse </em>'); //cierra el confirm
            }else{ //si dejo espacios sin contestar
                $(boton).attr("dataRespuesta","");
                $("#"+$(boton).attr("dataEtiqueta")).html("");
                alertify.error("Espacios vacios en la pregunta" );
                return false;
            }
        }   //               
    });

    

}



function respuestasCheck(boton){
    var id = boton.attr('data-id');
    $('.'+boton.attr('data-clase')).each(function(index){
        if($(this).attr('data-idpregunta') === id){
            //alert($(this).find('input[type=checkbox]:checked').val());
            var respuestas = []; 
            $(this).find('input[type=checkbox]:checked').each(function(){
            /*if ($(this).checked) {
                respuesta += $(this).val()+', ';
            }*/
                respuestas.push($(this).val());
            }); 
            // alert(respuestas);
            if(respuestas.length != 0){
                alertify.confirm("<p> Establecer la opciones: "+respuestas.toString() +" como respuestas </b></p>", function (e) {
            
                    if (e) {
                        $(boton).attr("dataRespuesta",respuestas.toString());

                        $("#"+$(boton).attr("dataEtiqueta")).html("<label for='respuesta' dataEtiquetaRespuesta='"+ 
                        $(boton).attr("dataRespuesta")+" '>Respuesta(s) : "+ $(boton).attr("dataRespuesta") +"</label>");
                        $("#"+$(boton).attr("dataEtiqueta")).attr("dataRespuestaCorrecta",respuestas.toString());   
                        alertify.success("Respuesta Agregada");
                        $(boton).attr("class" ,"btnCambioEstado"); //cambia a color verde el boton de responder
                        $(boton).text("Respondida");
                    }else{ 
                        alertify.error("Cancelado" );                 
                    }
                }).setHeader('<em> PlatCourse </em>') ; 
            }else{
                alertify.error('No hay ninguna opcion seleccionada');
            }

        }
    });
}

function respuestasRadio (boton){
    //alert(mae.attr('data-id')+' '+mae.attr('data-clase'));
    var id = boton.attr('data-id');
    $('.'+boton.attr('data-clase')).each(function(index){
        if($(this).attr('data-idpregunta') === id){
            //alert('encontrada');
            //$(this).find('input[type=radIo]').each(function(index){
                if($(this).find('input[type=radio]:checked').val() != null){
      //              alert($(this).find('input[type=radIo]:checked').val());    
                    var opcion = $(this).find('input[type=radIo]:checked').val();
                    alertify.confirm("<p> Establecer la opcion: "+opcion+" como respuesta </b></p>", function (e) {
            
                        if (e) {
                            
             
                            $(boton).attr("dataRespuesta", opcion );//guarda la respuesta en el boton
                            $("#"+$(boton).attr("dataEtiqueta")).html("<label for='respuesta' dataEtiquetaRespuesta='"+opcion+"'>Respuesta : "+ opcion +"</label>");
                     
                            //Guarda la respueta en el div en el atributo dataRespuestaCorrecta
                            $("#"+$(boton).attr("dataEtiqueta")).attr("dataRespuestaCorrecta",opcion);
                            alertify.success("Respuesta Agregada");
                            $(boton).attr("class" ,"btnCambioEstado"); //cambia a color verde el boton de responder   
                            $(boton).text('Respondida');    
                        }
                    }).setHeader('<em> PlatCourse </em>') ; //cierra la confirmacion de alertify
                }else{
                    alertify.error('No hay pregunta seleccionada');
                }
                
            //);
        }
    });
}


function confirmar(mensaje){
    var respuesta=false;
    alertify.confirm("<p> "+ mensaje+" </b></p>", function (e) {
        if (e) {
            respuesta=true;
            alertify.success("Respuesta Agregada");
                  
        } else { 
            alertify.error("Cancelado" );
        }
    }); 
    return respuesta;
}


//---------------------
function selectUnica(data){
    //var id = $('.pre_selec_unica').length+1;
    var id = ultimoId('pre_selec_unica');

    var html = "<div data-idPregunta='"+id+"' class='pre_selec_unica'>"
    +"<div class='cntMenuDesplegable'>"
    +"<span class='icon-list2 btnMenuDesplegable'></span>"
    +"<aside class='card'><ul>"
    +"<li   onclick='guiaDarRespuesta()' data-groupname='groupnameUnica" +id  +"'>Responder</li>"
    +"<li data-classPregunta='pre_selec_unica' data-idPregunta='"+id+"' data-idForm='formSelecUnica' class='editarPregunta'>Editar</li>"
    +"<li data-classPregunta='pre_selec_unica' data-divPregunta='seleccion_unica' data-idPregunta="+id+" class='eliminarPregunta'>Eliminar</li>"
    +"</ul></aside></div><div class='datos-pregunta'>";

    $(data).each(function(i, field){
        //alert(field.value);
        var valor = field.value.trim();
        if(i===1){
            html+="<h4 data-pregunta='"+valor+"'>"+valor;
        }else if(i == 2){
            html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
        }else if(i>1){
            html+="<input type='radio' class='radioButton' data-groupname='groupnameUnica" +id  +"'' name='option"+id+"' value='"+valor+"'>"+valor+"<br>";
        }
    });
    html+=" <br><br><div id='seleccionUnica"+id + "' dataRespuestaCorrecta='' > </div>";
    html+="</div> <footer class='footPregunta'><button class='btnEstado' data-id='"+id+"' data-clase='pre_selec_unica'  dataMetodo='radio' dataEtiqueta='seleccionUnica"+id + "' dataRespuesta=''  data-groupname='groupnameUnica"+id +"'  >Aun no respondida</button></footer></div>";

    if($('.pre_selec_unica').length  === 0){
        $(".seleccion_unica").append("<h4 class='tituloPartePrueba'>Selecci&oacute;n unica</h4>");
        $(".seleccion_unica").append(html);

    }else{
        $(".seleccion_unica").append(html);
    }
    alertify.success("Pregunta Agregada");
    limpiarOcultarFormulario('formSelecUnica','form_select_unica');

    //eliminar opciones de mas
    $(".opt_unica tr").each(function (index){
        if(index  > 3){
            $(this).remove();
        }
     });

    darEventoMenuPregunta();
    darEventoEliminarPregunta();
    darEventoEditarPregunta();
    darEventoBtnEstado();
    darEventoRadioButton();
    
}

function deleteOptionUnica(num_fila){
    $(".opt_unica tr").each(function (index){
            
        $(this).children("td").each(function (index2){
              
            if($(this).text() === ""+num_fila){        
                    
                $(this).closest('tr').remove();
            }
        })            
    });
}

function cargarSeleccionUnica(id){
    $(".pre_selec_unica").each(function(i){
        if($(this).attr('data-idPregunta') === id){

            $('#formSelecUnica .cntRespuesta tr').remove();
            $('#formSelecUnica textarea[name=pregunta]').text($(this).find('h4').attr('data-pregunta'));
            $('#formSelecUnica input[type=text]').val($(this).find('h4').children('span').attr('data-valor'));
          
            $('#formSelecUnica input[type=hidden]').val("mod_pre_select_unica");
            $('#formSelecUnica input[type=hidden]').attr("data-idPregunta",id);
            $(this).find('input[type=radio]').each(function(j){
                var value = $(this).attr('value').trim();
                if(j>3){
                    $('#formSelecUnica .cntRespuesta').append("<tr><td style='display: none;'>"+j+"</td><td><textarea name='opcion' class='input_redondo_oscuro' required>"+value+"</textarea></td><td><button type='button' onclick='deleteOptionMultiple("+j+")' class='botonCircular rojo_flat'><span class='icon-minus'></span></button></td></tr>");        
                }else{
                    $('#formSelecUnica .cntRespuesta').append("<tr><td><textarea name='opcion"+id+"' class='input_redondo_oscuro' required>"+value+"</textarea></td></tr>")
                }                
            });
        }
    });
}

function actualizarSeleccionUnica(data,id){

    $(".pre_selec_unica").each(function(i){
        if($(this).attr('data-idPregunta') === id){

            var html = "";
            $(data).each(function(i, field){
          //      alert(field.value);
                var valor = field.value.trim();
                if(i===1){
                    html+="<h4 data-pregunta='"+valor+"'>"+valor;

                }else if(i===2){
                   html+= "<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
                }else if(i>1){

                     html+="<input type='radio' class='radioButton' data-groupname='groupnameUnica" +id  +"'' name='option' value='"+valor+"'>"+valor+"<br>";            
                }
            }); //

            html+=" <br><br><div id='seleccionUnica"+id + "' dataRespuestaCorrecta='' > </div>";
            $(this).find('div[class=datos-pregunta]').html(html);
            alertify.success("Pregunta Actualizada");

            limpiarOcultarFormulario('formSelecUnica','form_select_unica');

            $(".opt_unica tr").each(function (index){
                if(index  > 3){
                    $(this).remove();
                }
            });

            $('.form_select_unica').find('textarea').attr('placeholder','Ejemplo: ¿Cúal es el nombre de..?');

            $('#formSelecUnica input[type=hidden]').val("selec_unica"); ///ojo aqui cuidado con los hidden
        }
    });
    darEventoRadioButton();
}
//falso verdadero
function falsoVerdadero(data){
    //alert("function unica")
    //var id = $('.pre_falso_verdadero').length+1;
    var id = ultimoId('pre_falso_verdadero');


    var html = "<div data-idPregunta='"+id+"' class='pre_falso_verdadero'>"
    +"<div class='cntMenuDesplegable'>"
    +"<span class='icon-list2 btnMenuDesplegable'></span>"
    +"<aside class='card'><ul>"
    +"<li  onclick='guiaDarRespuesta()'  data-groupname='groupname" +id  +"'>Responder</li>"
    +"<li data-classPregunta='pre_falso_verdadero' data-idPregunta='"+id+"' data-idForm='formFalsoVerdadero' class='editarPregunta'>Editar</li>"
    +"<li data-classPregunta='pre_falso_verdadero' data-divPregunta='falso_verdadero' data-idPregunta="+id+" class='eliminarPregunta'>Eliminar</li>"
    +"</ul></aside></div><div class='datos-pregunta'>";

    $(data).each(function(i, field){
        var valor = field.value.trim();
        if(i===1){
            html+="<h4 data-pregunta='"+valor+"'>"+valor;
        }else if(i===2){
            html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
        }
         //else if(i>1){          se ensucia cuando se edita por eso estan abajo el error esta en actualizar $('#formFalsoVerdadero input[type=hidden]').val("falso_verdadero");
          //  alert(field.value);
           // html+="<input type='radio' class='radioButton' data-groupname='groupname" +id  +"'' name='option' value='"+field.value+"'>"+field.value+"<br>";
       // }
    });
    html+="<input type='radio' class='radioButton' data-groupname='groupname" +id  +"'' name='option' value='Falso'>Falso<br>";
    html+="<input type='radio' class='radioButton' data-groupname='groupname" +id  +"'' name='option' value='Verdadero'>Verdadero"
    html+=" <br><br><div id='seleccionFalsoVerdadero"+id + "' dataRespuestaCorrecta='' > </div>"; //div para actualizar respuesta se puso una data en el boton que identifica la pregunta
    html+="</div><footer class='footPregunta'><button data-id='"+id+"' data-clase='pre_falso_verdadero' class='btnEstado' dataMetodo='radio' dataEtiqueta='seleccionFalsoVerdadero"+id + "' dataRespuesta=''  data-groupname='groupname"+id +"' >Aun no respondida</button></footer></div>";

    if($('.pre_falso_verdadero').length  === 0){
        $(".falso_verdadero").append("<h4 class='tituloPartePrueba'>Falso-Verdadero</h4>");
        $(".falso_verdadero").append(html);

    }else{
        $(".falso_verdadero").append(html);
    }
    alertify.success("Pregunta Agregada");

    limpiarOcultarFormulario('formFalsoVerdadero','form_falso_verdadero');

    darEventoMenuPregunta();
    darEventoEliminarPregunta();
    darEventoBtnEstado();
    darEventoRadioButton();
    darEventoEditarPregunta();
}

function cargarFalsoVerdadero(id){
    $(".pre_falso_verdadero").each(function(i){
        if($(this).attr('data-idPregunta') === id){
            $('#formFalsoVerdadero textarea[name=pregunta]').text($(this).find('h4').attr('data-pregunta'));
            $('#formFalsoVerdadero input[type=text]').val($(this).find('h4').children('span').attr('data-valor'));
            $('#formFalsoVerdadero input[type=hidden]').val("mod_pre_falso_verdadero");
            $('#formFalsoVerdadero input[type=hidden]').attr("data-idPregunta",id);
        }
    });
}

function actualizarFalsoVerdadero(data,id){
    $(".pre_falso_verdadero").each(function(i){
        if($(this).attr('data-idPregunta') === id){
            var html = "";
            $(data).each(function(i, field){
                var valor = field.value.trim();
                if(i===1){
                    html+="<h4 data-pregunta='"+valor+"'>"+valor;
                }else if(i===2){
                    html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
                }
            });
            html+="<input type='radio' class='radioButton' data-groupname='groupname" +id  +"'' name='option' value='Falso'>Falso<br>";
            html+="<input type='radio' class='radioButton' data-groupname='groupname" +id  +"'' name='option' value='Verdadero'>Verdadero";
            html+=" <br><br><div id='seleccionFalsoVerdadero"+id + "' dataRespuestaCorrecta='' > </div>"; //div para actualizar respuesta se puso una data en el boton que identifica la pregunta
          
            $(this).find('div[class=datos-pregunta]').html(html);
            alertify.success("Pregunta Actualizada");

            limpiarOcultarFormulario('formFalsoVerdadero','form_falso_verdadero');

            $('#formFalsoVerdadero input[type=hidden]').val("falso_verdadero"); //por esto no sivia
        }
    });
    darEventoRadioButton();
}

//desarrollo
function preguntaDesarrollo(data){

    //var id = $('.pre_pregunta_desarrollo').length+1;
    var id = ultimoId('pre_pregunta_desarrollo');

    var html = "<div data-idPregunta='"+id+"' class='pre_pregunta_desarrollo'>"
    +"<div class='cntMenuDesplegable'>"
    +"<span class='icon-list2 btnMenuDesplegable'></span>"
    +"<aside class='card'><ul>"
    +"<li data-classPregunta='pre_pregunta_desarrollo' data-idPregunta='"+id+"' data-idForm='formPreguntaDesarrollo' class='editarPregunta'>Editar</li>"
    +"<li data-classPregunta='pre_pregunta_desarrollo' data-divPregunta='pregunta_desarrollo' data-idPregunta="+id+" class='eliminarPregunta'>Eliminar</li>"
    +"</ul></aside></div><div class='datos-pregunta'>";

    $(data).each(function(i, field){
        var valor = field.value.trim();
        if(i===1){
            html+="<h4 data-pregunta='"+valor+"'>"+valor;
        }else if(i===2){
            html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
        }else if(i===3){
            html+="<h5> Pts. "+valor+"</h5>";
        }
    });
    html+="<textarea class='textareaDesarrollo'></textarea></div></div>";

    if($('.pre_pregunta_desarrollo').length  === 0){
    
        $(".pregunta_desarrollo").append("<h4 class='tituloPartePrueba'>Pregunta-Desarrollo</h4>");
        $(".pregunta_desarrollo").append(html);

    }else{

        $(".pregunta_desarrollo").append(html);

    }
    alertify.success("Pregunta Agregada");
    limpiarOcultarFormulario('formPreguntaDesarrollo','form_Pregunta_Desarrollo');

    darEventoMenuPregunta();
    darEventoEliminarPregunta();
    darEventoEditarPregunta();
}

function cargarRespuestaDesarrollo(id){

    $(".pre_pregunta_desarrollo").each(function(i){
    
        if($(this).attr('data-idPregunta') === id){
            //alert('si encuentra la pregunta');
            $('#formPreguntaDesarrollo textarea[name=pregunta]').text($(this).find('h4').attr('data-pregunta'));
            $('#formPreguntaDesarrollo input[type=text]').val($(this).find('h4').children('span').attr('data-valor'));
            $('#formPreguntaDesarrollo input[type=hidden]').val("mod_pre_respuesta_desarrollo");
            $('#formPreguntaDesarrollo input[type=hidden]').attr("data-idPregunta",id);
        }
    });
}

function actualizarRespuestaDesarrollo(data,id){
    
    $(".pre_pregunta_desarrollo").each(function(i){
        if($(this).attr('data-idPregunta') === id){
            var html = "";
            $(data).each(function(i, field){
                var valor = field.value.trim();
                if(i===1){
                    html+="<h4 data-pregunta='"+valor+"'>"+valor;
                }else if(i===2){
                    html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4><textarea class='textareaDesarrollo'></textarea>";
                }
            });

            $(this).find('div[class=datos-pregunta]').html(html);
            alertify.success("Pregunta Actualizada");

            limpiarOcultarFormulario('formPreguntaDesarrollo','form_pregunta_desarrollo');

            $('#formPreguntaDesarrollo input[type=hidden]').val("Pregunta_Desarrollo");
        }
    });
}

//desarrollo
function respuestaCorta(data){

    //var id = $('.pre_respuesta_corta').length+1;
    var id = ultimoId('pre_respuesta_corta');

    var html = "<div data-idPregunta='"+id+"' class='pre_respuesta_corta'>"
    +"<div class='cntMenuDesplegable'>"
    +"<span class='icon-list2 btnMenuDesplegable'></span>"
    +"<aside class='card'><ul>"
    +"<li data-classPregunta='pre_respuesta_corta' data-idPregunta='"+id+"' data-idForm='formRespuestaCorta' class='editarPregunta'>Editar</li>"
    +"<li data-classPregunta='pre_respuesta_corta' data-divPregunta='respuesta_corta' data-idPregunta="+id+" class='eliminarPregunta'>Eliminar</li>"
    +"</ul></aside></div><div class='datos-pregunta'>";

    $(data).each(function(i, field){
        var valor = field.value.trim();
        if(i===1){
            html+="<h4 data-pregunta='"+valor+"'>"+valor;
        }else if(i===2){
            html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
        }else if(i===3){
            for (var i=0; i<valor; i++) {
                html+="<input class='inputRespuestaCorta' type='text' name='respuesta'>";
            }
        }
    });
    html+="</div></div>";

    if($('.respuesta_corta').is(':empty')){
        $(".respuesta_corta").append("<h4 class='tituloPartePrueba'>Respuesta-Corta</h4>");
        $(".respuesta_corta").append(html);

    }else{
        $(".respuesta_corta").append(html);

    }
    alertify.success("Pregunta Agregada");
    limpiarOcultarFormulario('formRespuestaCorta','form_respuesta_corta');

    darEventoMenuPregunta();
    darEventoEliminarPregunta();
    darEventoEditarPregunta();
}

function cargarRespuestaCorta(id){
    //alert('cargar corta');
    $(".pre_respuesta_corta").each(function(i){
        ///alert('corre corre corazon '+i)
        if($(this).attr('data-idPregunta') === id){
           // alert('si encuentra la pregunta');
            $('#formRespuestaCorta textarea[name=pregunta]').text($(this).find('h4').attr('data-pregunta'));
            $('#formRespuestaCorta input[name=puntos]').val($(this).find('h4').children('span').attr('data-valor'));
            $('#formRespuestaCorta input[name=lineas]').val($(this).find('input[class=inputRespuestaCorta]').length);
            $('#formRespuestaCorta input[type=hidden]').val("mod_pre_respuesta_corta");
            $('#formRespuestaCorta input[type=hidden]').attr("data-idPregunta",id);
        }
    });
}

//respuesta corta
function actualizarRespuestaCorta(data,id){
    //alert("actua id = "+id);
    $(".pre_respuesta_corta").each(function(i){
        if($(this).attr('data-idPregunta') === id){
            var html = "";
            $(data).each(function(i, field){
                var valor = field.value.trim();
                if(i===1){
                    html+="<h4 data-pregunta='"+valor+"'>"+valor;
                }else if(i===2){
                    html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>";
                }else if(i===3){
                    for (var i=0; i<valor; i++) {
                        html+="<input class='inputRespuestaCorta' type='text' name='respuesta'>";
                    }
                }
            });
            $(this).find('div[class=datos-pregunta]').html(html);
            alertify.success("Pregunta Actualizada");
            
            limpiarOcultarFormulario('formRespuestaCorta','form_respuesta_corta');

            //$('#formRespuestaCorta input[type=hidden]').val("Respuesta_Corta");

        }
    });
}


function asocie(data){
    $('.btnRestarTr').off("click");
    var columna = $('.preColumnaA tr').length+2; /*Esta suma de 2, es por los 2 campos primeros del form*/
   // var id = $('.pre_asocie').length+1;
    var id = ultimoId('pre_asocie');
    var clsColumA = "asocA"+id, clsColumB = "asocB"+id;

    var html = "<div data-idPregunta='"+id+"' class='pre_asocie'>"
    +"<div class='cntMenuDesplegable'>"
    +"<span class='icon-list2 btnMenuDesplegable'></span>"
    +"<aside class='card'><ul>"
    +"<li>Responder</li>"
    +"<li class='btnEditAsoc' data-idpregunta='"+id+"'>Editar</li>"
    +"<li data-classPregunta='pre_asocie' data-divPregunta='asocie' data-idPregunta="+id+" class='eliminarPregunta'>Eliminar</li>"
    +"</ul></aside></div>";
    //var html = "<div class='pre_asocie'>";
    var cont = 1;
    //var pts =  html+="<h5> Pts. "+field.value+"</h5>";
    $(data).each(function(i, field){
        var valor = field.value.trim();
        if(i===1){
            html+="<h4 data-pregunta='"+valor+"'>"+valor;
        }else if(i==2){
          html+="<span data-puntos='"+valor+"'>("+valor+"pts)</span></h4><ul><li><h4>Columna A</h4><table id='tbColumnaA'><tbody>";
        }else if(i>2 && i <= columna){
            html+="<tr class='"+clsColumA+"' data-columna='"+clsColumB+"'><td><span>"+(cont++)+"</span></td><td><p>"+valor+"</p></td></tr>";
        }else if(i>3){
            html+="<tr class='"+clsColumB+"' data-focus=''><td><span></span></td><td><p>"+valor+"</p></td></tr>";
        }
        if(i === columna){
            html+="</tbody></table></li><li><h4>Columna B</h4><table id='tbColumnaB'><tbody>";
        }
    });
    html+="</tbody></table></li><div id='asocie"+id+"' dataRespuestaCorrecta='' ></div><footer class='footPregunta'><button data-ide='"+id+"' data-columnab='"+clsColumB+"' class='btnEstado btnEstadoAsocie'>Aun no respondida</button></footer></ul></div>";
    //alert(html);
    if($('.pre_asocie').length  === 0){
        $(".asocie").append("<h4 class='tituloPartePrueba'>Asocie</h4>");
        $(".asocie").append(html);

    }else{
        $(".asocie").append(html);

    }
    alertify.success("Pregunta Agregada");
    $('#formAsocie').fadeOut("slow");
    restablecerFormAsocie();
    darEventoMenuPregunta();
    darEventoEliminarPregunta();
    clickColumA(clsColumA);
    clickColumB(clsColumB);
    clickBtnEstadoAsocie();
    clickEditAsocie();
}
/*Funciones para responder*/
function clickColumA(clase){
  $('.'+clase).off('click');
  
  $('.'+clase).on('click', function(){
    quitarFocus($(this).attr('class'), this.rowIndex);

    $(this).addClass("trSeleccionado");
    var clsColumnaB = $(this).attr("data-columna");
    var numeroOpcionColA =  $(this).children("td:first-child").children("span").text();
    $('.'+clsColumnaB).attr("data-focus", numeroOpcionColA);
    
  });
}

//solo deja a el elemento clickeado con la clase de los bordes
function quitarFocus(colsA, idFila){
  $('.'+colsA).each(function (index){
    if(this.rowIndex != idFila){
      $(this).removeClass("trSeleccionado");
    }     
  });
}

function clickColumB(clase){
  $('.'+clase).off('click');
  $('.'+clase).on('click', function(){
    quitarFocus($(this).attr('class'), this.rowIndex);
    
    var valorColA = $(this).attr("data-focus");
    $(this).addClass("trSeleccionado");
    $(this).children("td:first-child").children("span").text(valorColA);
  });
}

function clickBtnEstadoAsocie(){
  $(".btnEstadoAsocie").off("click");
  
  $(".btnEstadoAsocie").on("click", function(){
    var objeto = $(this);
    var clsColumnaB = $(this).attr("data-columnab");
    var respuestas = hayVaciosColumna(clsColumnaB);
    if(respuestas.length != 0){
     //   alert('#asocie'+$(this).attr('data-ide'));
        alertify.confirm("<p> "+ "Establecer la(s) opcion(es): ' "+respuestas.toString()+" ' como respusta"+" </b></p>", function (e) {
            if (e) {
                    $('#asocie'+objeto.attr('data-ide')).html('<label>'+respuestas.toString()+'</label>');
                    $('#asocie'+objeto.attr('data-ide')).attr('dataRespuestaCorrecta',respuestas.toString());
                    alertify.success("Respuesta agregada");
                    objeto.addClass("btnEstadoRespondido");
                    objeto.text("Respondida");

                    }
                }).setHeader('<em> PlatCourse </em>'); //cierra el confirm
        
      
    }else{
        alertify.error("Para guardar las respuestas es necesario que complete la solución de la columna B.");
    }

  });
}
/*Verifica que en la columna tpdp se haya respondido*/
function hayVaciosColumna(claseColumna){
  var respuestas = [];
  
  $('.'+claseColumna).each(function (index) { 
    var texto = $(this).children("td:first-child").children("span").text();
    if(texto.trim().length != 0){
      respuestas.push(texto);
    }else{
        respuestas = [];
        return respuestas;
    }
  });

  return respuestas;
}

function clickEditAsocie(){
  $(".btnEditAsoc").off("click");
  $(".btnEditAsoc").on("click", function(){
    var arrayColA = [];
    var arrayColB = [];

    var tituloPregunta = $(this).parent().parent().parent().siblings('h4').attr("data-pregunta");
    var puntos = $(this).parent().parent().parent().siblings('h4').children("span").attr("data-puntos");
    
    $(this).parent().parent().parent().parent().find("table").each(function (index) { 
        if(index == 0){
            $(this).children("tbody").children("tr").each(function (index) {
                arrayColA.push($(this).children("td:first-child").siblings('td').children("p").text());
            });
        }else if(index == 1){
            $(this).children("tbody").children("tr").each(function (index) {
                arrayColB.push($(this).children("td:first-child").siblings('td').children("p").text());
            });
        }
    });

    //alert("tituloPregunta: "+tituloPregunta+" Puntos:"+puntos+" col A: "+JSON.stringify(arrayColA)
       // +" col B: "+JSON.stringify(arrayColB));
    mostrarModalAsocie(tituloPregunta, puntos, arrayColA, arrayColB, $(this).attr("data-idpregunta"));
    $(this).parent().parent().fadeOut("slow");
    $("#formAsocie").fadeIn("slow");
  });
}

function mostrarModalAsocie(titulo, puntos, arrayColA, arrayColB, idPregunta){
    document.formAsocie.consulta.value = "mod_pre_asocie";
     document.formAsocie.consulta.setAttribute("data-idpregunta", idPregunta);
    document.formAsocie.pregunta.value = titulo;
    document.formAsocie.puntos.value = puntos;
    inicializarTablasAsocie("tbFormColumnaA", arrayColA);
    inicializarTablasAsocie("tbFormColumnaB", arrayColB);
}

function inicializarTablasAsocie(idTabla, arrayCols){
    if($("#"+idTabla+" tr").length < arrayCols.length){
        var maximo = (arrayCols.length - $("#"+idTabla+" tr").length);
        var fila = "<tr>"
                  +"<td><textarea name='opcion' required></textarea></td>"
                  +"<td><button data-idtabla='"+idTabla+"' type='button' class='botonCircular rojo_flat btnRestarTr'><span class='icon-minus'></span></button></td>"
                  +"</tr>";
        for(var i=0; i<maximo; i++){
            $("#"+idTabla).append(fila);
        }
    }
    $("#"+idTabla+" tbody tr").each(function (index) { 
        $(this).children("td:first-child").children("textarea").val(arrayCols[index]);
    });
    agregarEventoEliminarFila();
}
//evento para eliminar fila de tabla
function agregarEventoEliminarFila(){
    $('.btnRestarTr').off("click");
        $('.btnRestarTr').on( 'click', function () {
        var idRow = this.parentNode.parentNode.rowIndex;
        var table = this.parentNode.parentNode.parentNode.parentNode;
        document.getElementById($(this).attr("data-idtabla")).deleteRow(idRow);
    });
}

//metodo para editar asocie ya insertado el visor de evaluacion
function modificarAsocie(data, id){
    var columna = $('.preColumnaA tr').length+2;
    var h4 = "";
    var puntos = "";
    var arrayColA = [];
    var arrayColB = [];
        
    $(data).each(function(i, field){
        var valor = field.value.trim();
        if(i===1){
            h4 = valor;
        }else if(i==2){
            puntos = valor;   
        }else if(i>2 && i <= columna){
            arrayColA.push(valor);
        }else if(i>3){
            arrayColB.push(valor);
        } 
    });
    modificarPreAsocie(data, id, h4, puntos, arrayColA, arrayColB);
}

function modificarPreAsocie(data, id, pregunta, puntos, arrayColA, arrayColB){
    var clsColumA =  "asocA"+id,clsColumB = "asocB"+id; 
    $('.pre_asocie').each(function (index) { 
        if($(this).attr("data-idPregunta") == id){
            //alert("pregunta encontrada");
            
            $(this).find("table").empty();
            
            $(this).find("h4").each(function (index) { 
                if(index==0){
                    $(this).remove();
                    return false;
                }
            });
            var h4 = "<h4 data-pregunta='"+pregunta+"'>"+pregunta+"<span data-puntos='"+puntos+"'>("+puntos+"pts)</span></h4>";
            $(h4).insertAfter($(this).find("div.cntMenuDesplegable"));
            
            $(this).find("table").each(function (index) { 
                if(index == 0){
                    var fila = "<tbody>";
                    $(arrayColA).each(function (index) { 
                        fila += "<tr class='"+clsColumA+"' data-columna='"+clsColumB+"'><td><span>"+(index+1)+"</span></td><td><p>"+arrayColA[index]+"</p></td></tr>";
                    });
                    $(this).append(fila+"</tbody>");
                }else if(index == 1){
                    var colsB = "<tbody>";
                    $(arrayColB).each(function (index) { 
                        colsB +="<tr class='"+clsColumB+"' data-focus=''><td><span></span></td><td><p>"+arrayColB[index]+"</p></td></tr>";
                    });
                    $(this).append(colsB+"</tbody>");
                }
            });
            return false;//sale del each
        }        
    });
    clickColumA(clsColumA);
    clickColumB(clsColumB);
    clickEditAsocie();
    document.formAsocie.consulta.value = "asocie";
    $("#formAsocie").fadeOut("slow");
    restablecerFormAsocie();
}

function restablecerFormAsocie(){
    $('.formAsocie').each (function(){
      this.reset();
    });

    $('#tbFormColumnaA tr').each(function (index) {
        if(index > 1){
            $(this).remove();
        }
    });

    $('#tbFormColumnaB tr').each(function (index) {
        if(index > 3){
            $(this).remove();
        }
    });
}

//funcion que recorre todas las preguntas de asocie y las guarda en un array
function obtenerAsocie(){
    //recorre las estructura html para recuperar las preguntas de asocie
    var arrayAsocie = [];
    $(".contenido_preguntas .pre_asocie").each(function (index) { 
            
        //alert(index+" index-multiple");
        var arrayAsocieValores = [];
        var arrayAsocieColumA = [];
        var arrayAsocieColumB = [];
        var arrayRespuestas = [];
        arrayAsocieValores.push($(this).find('h4').attr('data-pregunta'));

        $(this).find('#tbColumnaA p').each(function (index2) { 
            //arrayFalsoVerdaderoValores.push($(this).attr('value'));
            arrayAsocieColumA.push($(this).text());
            //alert(index2 +" index2"+$(this).text());
          
        });
        $(this).find('.asocB1').each(function (index3) { 
            //arrayFalsoVerdaderoValores.push($(this).attr('value'));
            //alert(index3 +" index3"+$(this).text());
            //alert($(this).find('p').text()+'    '+$(this).find('span').text()+'  .asocB1');
            arrayAsocieColumB.push($(this).find('p').text());
            arrayRespuestas.push($(this).find('span').text());
        });
        arrayAsocieValores.push(arrayAsocieColumA);
        arrayAsocieValores.push(arrayAsocieColumB);
        arrayAsocieValores.push(arrayRespuestas);
        arrayAsocieValores.push($(this).find('h4').find('span').attr('data-puntos'));

        //alert(arrayAsocieValores.toString());
        arrayAsocie.push(arrayAsocieValores);
        //alert(arrayAsocieValores.toString()+" valores falso verdadero");          
    });

    //alert(arrayAsocie.toString()+" asocie");
    return arrayAsocie;
}


//funcion que recorre todas las preguntas de respuesta corta y las guarda en un array
function obtenerRespuestaCorta(){
    var respuestaCorta = [];
    var pregunta = [];
    $(".contenido_preguntas .pre_respuesta_corta").each(function (index) { 
        pregunta.push($(this).find('h4').attr('data-pregunta')+'*'+$(this).find('input[class=inputRespuestaCorta]').length);
        pregunta.push($(this).find('h4').children('span').attr('data-valor'));
        respuestaCorta.push(pregunta);
    });
    
    //alert(pregunta.toString()+" pregunta corta");
    return respuestaCorta;
}

//funcion que recorre todas las preguntas de desarrollo y las guarda en un array
function obtenerDesarrollo(){
    var desarrollo = [];
    var pregunta = [];
    $(".contenido_preguntas .pre_pregunta_desarrollo").each(function (index) { 
        pregunta.push($(this).find('h4').attr('data-pregunta'));
        pregunta.push($(this).find('h4').children('span').attr('data-valor'));
        desarrollo.push(pregunta);
    });
    
   // alert(desarrollo.toString()+" desarrollo");
    return desarrollo;
}


function addCompletarPregunta(){
    var temp = $(".completar_oracion tr").length;
    //alert("add option multiple "+temp);
    if(temp <7){

        $(".completar_oracion").append("<tr><td style='display: none;'>"+temp+"</td><td><textarea name='pregunta' placeholder='Posible respuesta' class='input_redondo_oscuro' required></textarea></td><td><button type='button' onclick='deleteCompletarPregunta("+temp+")' class='botonCircular rojo_flat'><span class='icon-minus'></span></button></td></tr>");
    }else{

        alertify.error("La cantidad maxima de opciones es 7");
    }
}


function deleteCompletarPregunta(num_fila){
  //  alert("delete click "+num_fila);
    $(".completar_oracion tr").each(function (index){
        //alert(index);
        $(this).children("td").each(function (index2){
            //alert(index2+"  "+$(this).text());
            if($(this).text() === ""+num_fila){
                $(this).closest('tr').remove();
            }
        });            
    });
} 

 

function obtenerTextoEnComillas(pregunta) {
    const regex = /<([^"]*)>|<([^']*)>/g;
    var   grupo,
    grupoBotones = [];
    //alert("Segundo Hola ="+pregunta);
    while ((grupo = regex.exec(pregunta)) !== null) {
        //si coincide con <>, el contenido estará en el
        //   grupo[1], con el grupo[2] undefined, y viceversa
        grupoBotones.push(grupo[1]|| grupo[2]);
      //  alert("while ="+grupo[1]);
    }
    for(var i=0; i<grupoBotones.length; i++){
           alert("Valores regex="+grupoBotones[i]);
    } 
}

function agregarBotones(pregunta){
    var cadena;
    var preguntaFinal;
    for(var i=0; i<pregunta.length;i++){
        if(" " == pregunta.charAt(i)){
        
        }else{
            cadena=cadena+pregunta.charAt(i);
        }
    }   
   // alert(" sirve ="+cadena);
}


function recorresPreguntaCompletar(pregunta){ //recorre la pregunta y saca el valor dado en los botones
    var dentra=false;
    var vector = pregunta.split(" "); //pregunta
    var vectorRespuesta = [];
    var boton="";
  
    for(var i=0; i<vector.length;i++){  
          
        if(vector[i] == "<input"){ //inicia la esctructura de  un boton 
            dentra=true;
              
        }  
            
        if(dentra == true){ //Empieza a formar el boton
             boton+=vector[i]+" ";
               
        }
        
        if(vector[i].substr(-1) == '>'){ //guarda elvalordel boton en el vector
              
            vectorRespuesta.push($(boton).attr("dataRespuesta")); //guarda el la respuesta en el boton
       
            boton="";
            dentra=false;
        }
    }
    return vectorRespuesta;
} 
  
function vectorCompletarLleno(vectorRespuesta){ //verifica si el usuario lleno los espacios 
                                                   //en la pregunta completar oraciones
    var verificar=false;
    for(var i=0; i<vectorRespuesta.length;i++){  
          
        if(vectorRespuesta[i] == ""){ 
            verificar=true;
        
        }
    }
      
    return verificar;
}


function remplazarComplete(pregunta){ //remplaza los botones por espacios para guardar la pregunta
    var dentra=false;
    var vector = pregunta.split(" ");
    var vector2 = [];
    var j=0;
      
    for(var i=0; i<vector.length;i++){  
        if(vector[i] == "<input"){
            dentra=true;
            vector2[j]="·._________.·";
            j++;
        }
                
        if(dentra == false){
            vector2[j]=vector[i];
            j++;
        }
        if(vector[i].substr(-1) == '>'){
            dentra=false;
        } 
    }     
    return vector2;
}

       function compararOpcionesRespuesta(vectorRespuesta,opcion){
            var contenida=true; 
          for(var i=0; i<vectorRespuesta.length; i++){
                if(vectorRespuesta[i].includes(opcion)){
                  contenida=false; 
                  i=vectorRespuesta.length;
                  }
               }
           return contenida;
     }


//-------------------funciones para completar oraciones pasar valor a botones
function pasarValorTemporal(valor){ 
    
    $("#temporal").attr("value", $(valor).val());
    $("#temporal").attr("data.idTemporal",$(valor).attr("data-idComplete"));
             
}

function pasarValorCompletar(boton){
       
    if( $("#temporal").attr("data.idTemporal") ==  $(boton).attr("data-idComplete") ){
        $(boton).attr("value",$("#temporal").val());
        $(boton).attr("dataRespuesta",$("#temporal").val());
    }else{
        alertify.error("Boton de pregunta equivocado :(");
    }

    $("#temporal").attr("value", "");
}


function completarOraciones(data){
    
    //var id = $('.pre_completar').length+1; 
    var id = ultimoId('pre_completar');
    var cadena;
    var verificar=false;

    var html = "<div data-idPregunta='"+id+"' class='pre_completar'>"
    +"<div class='cntMenuDesplegable'>"
    +"<span class='icon-list2 btnMenuDesplegable'></span>"
    +"<aside class='card'><ul>"
    +"<li>Responder</li>"
    +"<li data-classPregunta='pre_completar' data-idPregunta='"+id+"' data-idForm='formCompletarOraciones' class='editarPregunta'>Editar</li>"
    +"<li data-classPregunta='pre_completar' data-divPregunta='completar' data-idPregunta="+id+" class='eliminarPregunta'>Eliminar</li>"
    +"</ul></aside></div><div class='datos-pregunta'>";

    $(data).each(function(i, field){
        var valor = field.value.trim();
        if(i===1){
            cadena=valor;
        }
    });
    verificar= verificarCampoPregunta(cadena);
    if(verificar){
        $(data).each(function(i, field){
            verificar= verificarCampoPregunta(cadena);
            var valor = field.value.trim();                         
            if(i===1){
                var pregunta = valor.replace(/·._________.·/g,"<input type='button' dataPrueba='JIMMY'  dataRespuesta='' data-idComplete='"+ id +"' class='botonPregunta' onclick='pasarValorCompletar(this)'>");

                html+="<h4>"+pregunta;
            }else if(i===2){
                html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>"
            }else if(i>1){     
                html+= "<br>"+"<input type='button' data-editar='complete'  class='botonCompletarRespuesta eventoRespuesta' data-idComplete='"+ id +"'  data-idOpcione='' style=' ' onclick='pasarValorTemporal(this)' value='"+valor+"'>"+"<br>";
        
            }
        });
   
        // el dataIndice lleva el control de la pregunta para recorrer y ver su respuestas marcadas 
        
        html+=" <br><div id='seleccionCompletarOraciones"+id + "' dataRespuestaCompletar='' > </div>"; //div para actualizar respuesta se puso una data en el boton que identifica la pregunta
        html+="<footer class='footPregunta'><button class='btnEstado' dataMetodo='completarOraciones' dataIndice='"+id + "'  dataEtiqueta='seleccionCompletarOraciones"+id + "' dataRespuesta=''   >Aun no respondida</button></footer></div>";
        html+="</div>";
        html+="<br>" ;
      // alert(html);

        if($('.pre_completar').length  === 0){
            $(".completar").append("<h4 class='tituloPartePrueba'>Completar Oraciones</h4>");
            $(".completar").append(html);

        }else{
            $(".completar").append(html);
        }
        alertify.success("Pregunta Agregada");

        limpiarOcultarFormulario('formCompletarOraciones','formCompletarOraciones');


        //eliminar opciones de mas
        $(".completar_oracion tr").each(function (index){
            if(index  > 3){
                $(this).remove();
            }
        });

        
    }else{ //
        alertify.error("Agrege espacio(s) en la pregunta");
        // alertify.alert("Agrege espacio(s) en la pregunta");
    }

    darEventoBtnEstado();
    darEventoMenuPregunta();
    darEventoEliminarPregunta();
    darEventoEditarPregunta();
}

function verificarCampo(pregunta){
    var vector = pregunta.split(" ");
    var repetidas=0;
    var verificar=false;
        for(var i=0; i<vector.length;i++){
            if(vector[i] == "·._________.·"){
                repetidas++;
            }
        }
    if(repetidas>3){
        verificar=true;
    }
    return verificar;
}
     
function verificarCampoPregunta(pregunta){
    var vector = pregunta.split(" ");
    var repetidas=0;
    var verificar=false;
    for(var i=0; i<vector.length;i++){
        if(vector[i] == "·._________.·"){
            repetidas++;
            verificar=true;
            i=vector.length;
        }
    }
    return verificar;
}


function AgregarCampoVacio(){
    var cadena=$("#pregunt").val();
    var verificar=verificarCampo(cadena);
    cadena=cadena.substr(-2);
 
    if((cadena != '· ')&&(verificar == false)){
        var espacio="·._________.·";
        var texto=  $("#pregunt").val();
        texto=texto+" "+espacio+" ";
        $("#pregunt").val(texto);
    }
 }

function validar_letras(texto, id){

   $(document).ready(function (){
        $('#'+id).keyup(function (){
            this.value = (this.value + '').replace(/[^a-zA-Z ., . . ?¿() /%# ""]/g, '');
        });
    });
}  



// Resibe la etiqueta general de la pregunta que va a recorrer y la etiqueta del div que tiene las respuestas
function guardarPreguntas(etiqueta,etiquetaRespuesta,atributoRespuesta,completar){
    //alert('guardarPreguntas');
    var remplazar=[];
    var arrayPreguntasFormadas= []; //tiene el array preguntas
    var id=0;
     
    $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
           
        var arrayPregunta=[]; //la primera posicion es la pregunta 2 respuestas y 3 opciones
        var arrayOpciones=[];
        var arrayRespuesta=[];
        var respuestasEtiqueta="";
        var idPre = $(this).attr('data-idpregunta');

        respuestasEtiqueta= $("#"+etiquetaRespuesta+idPre).attr(atributoRespuesta);
       // alert(respuestasEtiqueta+' correctas');

            arrayRespuesta = respuestasEtiqueta.split(","); //crea el vector de respuestas
            
            if(completar){ //solo dentra si es una pregunta de completar oraciones

                var pregunta = $(this).find('h4').html().replace(/>/g,"/*// <");  //aqui
                var vec = pregunta.split("<");

                arrayPregunta.push(obtenerTexto(vec));
           
            }else{//Guarda la pregunta si no es de completar oraciones
                arrayPregunta.push($(this).find('h4').attr('data-pregunta')); 
            }
            id++;//suma lleva el id de cada etiqueta div donde esta las respuestas
            arrayPregunta.push(arrayRespuesta); //guarda las respuestas
    
            $(this).find('input').each(function (index2) { 
               
               
            if(compararOpcionesRespuesta(arrayRespuesta,$(this).attr('value'))){ //compara si la opcion esta en el vector de respuestas
                arrayOpciones.push($(this).attr('value')); //guarda las opciones
                         }
            });
                   

            arrayPregunta.push(arrayOpciones);
            arrayPregunta.push($(this).find('h4').children('span').attr('data-valor'));

            arrayPreguntasFormadas.push(arrayPregunta);  
    
           
                      
        });        
        
    return arrayPreguntasFormadas;
} 

function verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta){
    //alert(respuestasEtiqueta+' etiquetaRespuesta : '+$("#"+etiquetaRespuesta+$(this).attr('data-idPregunta'))); 
    var id=0;
    var respuestasEtiqueta="";
    var verificar=true;
    //alert(etiqueta+' '+etiquetaRespuesta+' '+atributoRespuesta);
   
    $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta       
          
        respuestasEtiqueta="";
        respuestasEtiqueta= $("#"+etiquetaRespuesta+$(this).attr('data-idPregunta')).attr(atributoRespuesta);
        
        if(respuestasEtiqueta == ""){// verifica si hay preguntas sin contestar
            verificar=false;
        }
        id++;//suma lleva el id de cada etiqueta div donde esta las respuestas
                    
    });    

    return verificar;
} 
    
function verificacionGeneralRespuestas(){ //verifica si todas las preguntas tienen sus respuestas

    var verificar=true;
    var etiqueta=".contenido_preguntas .pre_selec_unica"; //Etiqueta que va a recorrer seleccion_unica  pre_selec_unica
    var etiquetaRespuesta="seleccionUnica"; //Etiqueta que tiene las respuestas
    var atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
     
    verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
         
    if(verificar){ //si verificar es false no dentra a verificar las otras preguntas
        etiqueta=".contenido_preguntas .pre_selec_multi"; //Etiqueta que va a recorrer
        etiquetaRespuesta="seleccionMultiple"; //Etiqueta que tiene las respuestas
        atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas

        verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
    }
      
    if(verificar){
        etiqueta=".contenido_preguntas .pre_falso_verdadero"; //Etiqueta que va a recorrer
        etiquetaRespuesta="seleccionFalsoVerdadero"; //Etiqueta que tiene las respuestas
        atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
        verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
    }
        
    if(verificar){
        etiqueta=".contenido_preguntas .pre_completar";
        etiquetaRespuesta="seleccionCompletarOraciones";
        atributoRespuesta="dataRespuestaCompletar";
        verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
    }
 

            
    return verificar;
}

function guardarEvaluacion(){  
        
    //alert("guardarEvaluacion");
    var arrayTipos = [];
    //arrayTipos.push('hola');
    var verificarRespuesta=false;
    verificarRespuesta=verificacionGeneralRespuestas();
    ver = verificarAsocie();
    //alert(verificarRespuesta+' '+ver);
    alertify.confirm("<p> "+ " Desea guardar las preguntas"+ "</b></p>", function (e) {
        if (e) {
           
            if(verificarRespuesta && ver){ //solo dentra si todas las preguntas estan respondidas
                //$('.alertify').css('display','none');
            //recorre las estructura html para recuperar las preguntas de seleccion unica
                var idEvaluacion = $('#idEvaluacion').text();
                var url = '../../Controller/ControladoraEvaluacion.php';

                var arraySeleccionUnica = [];

                //arraySeleccionUnica.push('unica');
                var etiqueta=".contenido_preguntas .pre_selec_unica"; //Etiqueta que va a recorrer seleccion_unica  pre_selec_unica
                var etiquetaRespuesta="seleccionUnica"; //Etiqueta que tiene las respuestas
                var atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
                //alert(etiqueta+' '+etiquetaRespuesta+' '+atributoRespuesta);
                //Preguntas de selecion unica el false solo diferencia si es de complete o no
                arraySeleccionUnica =guardarPreguntas(etiqueta,etiquetaRespuesta,atributoRespuesta,false);
                //alert(arraySeleccionUnica+" arraySeleccionUnica "+arraySeleccionUnica.length);
                arrayTipos.push(arraySeleccionUnica);
     
                var arraySeleccionMultiple = []; 
                etiqueta=".contenido_preguntas .pre_selec_multi"; //Etiqueta que va a recorrer
                etiquetaRespuesta="seleccionMultiple"; //Etiqueta que tiene las respuestas
                atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
                
                arraySeleccionMultiple =guardarPreguntas(etiqueta,etiquetaRespuesta,atributoRespuesta,false);
                //alert(arraySeleccionMultiple+" arraySeleccionMultiple "+arraySeleccionMultiple.length);
                arrayTipos.push(arraySeleccionMultiple);

                
                //Preguntas de falso Verdadero
                var arrayFalsoVerdadero = [];
                //arrayFalsoVerdadero.push('falso');
                etiqueta=".contenido_preguntas .pre_falso_verdadero"; //Etiqueta que va a recorrer
                etiquetaRespuesta="seleccionFalsoVerdadero"; //Etiqueta que tiene las respuestas
                atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
                
                arrayFalsoVerdadero=guardarPreguntas(etiqueta,etiquetaRespuesta,atributoRespuesta,false);
                //alert(arrayFalsoVerdadero+" arrayFalsoVerdadero "+arrayFalsoVerdadero.length);
                arrayTipos.push(arrayFalsoVerdadero);
                
                //Preguntas de completar oraciones
                var arrayCompletarOraciones = [];
                etiqueta=".contenido_preguntas .pre_completar";
                etiquetaRespuesta="seleccionCompletarOraciones";
                atributoRespuesta="dataRespuestaCompletar";
                arrayCompletarOraciones=guardarPreguntas(etiqueta,etiquetaRespuesta,atributoRespuesta,true);
                //alert(arrayCompletarOraciones+" arrayCompletarOraciones "+arrayCompletarOraciones.length);
                arrayTipos.push(arrayCompletarOraciones);

                arrayRespuestaCorta = obtenerRespuestaCorta()
                arrayTipos.push(arrayRespuestaCorta);
                //alert(arrayRespuestaCorta+" arrayRespuestaCorta "+arrayRespuestaCorta.length);

                arrayDesarrollo = obtenerDesarrollo();
                arrayTipos.push(arrayDesarrollo);
                //alert(arrayDesarrollo+" arrayDesarrollo "+arrayDesarrollo.length);
                
                //alert(arrayTipos.toString());
                arrayAsocie = obtenerAsocie();
                arrayTipos.push(arrayAsocie);

                var idEvaluacion = $('#idEvaluacion').text();
                //falta asocie
                var data = {consulta:'guardarEvaluacion',datos:arrayTipos,id:idEvaluacion};
                var url = '../../Controller/ControladoraEvaluacion.php';
                //ajax(url,data, 0);
                $('#cargandoEvaluacion').fadeIn('slow');
                ajax(0,0, idEvaluacion,arrayTipos,'unica',0);
            }else{ //si hay preguntas sin rsponder
            alertify.error("Preguntas sin responder");
        }

    }
    }).setHeader('<em> PlatCourse </em>');

}  

function verificarAsocie(){
    var verificar = true;
       $(".contenido_preguntas .pre_asocie").each(function(index){

        if($(this).find('div').attr('asocie'+$(this).attr('data-idPregunta')) === ''){
            verificar = false;
        }
    });
    return verificar;
}
function ajax(contTipo, contPregunta, idEvaluacion, tipos,type,insertadas){
    //alert('ajax');
    //alert('insertados '+insertadas);
                        $('#insertados').text(insertadas);
    var total = tipos[0].length + tipos[1].length + tipos[2].length +tipos[3].length +tipos[4].length +tipos[5].length +tipos[6].length;
    $('#total').text(total);
    if(contTipo < tipos.length){
        //alert('tipo');
        if(contPregunta < tipos[contTipo].length){
            //alert('menor '+tipos[contTipo].toString()+" length: "+tipos[contTipo].length+" contTipo: "+contTipo+" contPregunta: "+contPregunta+" type:"+type);
            var preguntas = tipos[contTipo]
            var data = {consulta:'guardarEvaluacion',datos:preguntas[contPregunta],id:idEvaluacion, tipo: type};
            //alert('consulta:'+'guardarEvaluacion,'+'datos:'+preguntas[contPregunta]+',id:'+idEvaluacion+',tipo:'+type);
            $.ajax({
                url: '../../Controller/ControladoraEvaluacion.php',
                type: 'post',
                dataType: 'json',
                data: data,
                
                success: function (resp) {  
                   // $("#prueb").append(resp);    
                   // alert(resp);                     
                 if(resp > 0){
                        ++insertadas;
                        
                        //alertify.success("Pregunta Guardada "+type);
                        ++contPregunta;
                        ajax(contTipo, contPregunta,idEvaluacion,tipos, type,insertadas);    
                   }else{
                       alertify.error("Error al guardar");
                        $('#cargandoEvaluacion').fadeOut('slow');
                 }                     
                },
                error: function (jqXHR, estado, error) {
                    alert('error log');
                     $('#cargandoEvaluacion').fadeOut('slow');
                    console.log("fallo");
                }
            });   
        }else{
            //alert('else');
            ++contTipo;
            //contPregunta = 0;
            if(contTipo === 1){
                type = 'multiple';
            }else if(contTipo === 2){
                type = 'falso'
            }else if(contTipo === 3){
                type = 'complete'
            }else if(contTipo === 4){
                type = 'corta'
            }else if(contTipo === 5){
                type = 'desarrollo'
            }else if(contTipo === 6){
                type = 'asocie'
            }
            ajax(contTipo,0,idEvaluacion,tipos,type,insertadas);
        }
         
    }else{
        //alert('mayor');
        alertify.success("Preguntas Guardadas");
        $('#cargandoEvaluacion').fadeOut('slow');
    }
}


function verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta){
 
    var id=1;
    var respuestasEtiqueta="";
    var verificar=true;
   
        $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
           
          
            respuestasEtiqueta="";
            respuestasEtiqueta= $("#"+etiquetaRespuesta+id).attr(atributoRespuesta);
           
            if(respuestasEtiqueta == ""){// verifica si hay preguntas sin contestar
                verificar=false;
            }
            id++;//suma lleva el id de cada etiqueta div donde esta las respuestas
                    
        });
    return verificar;
} 
    
function verificacionGeneralRespuestas(){ //verifica si todas las preguntas tienen sus respuestas
    var verificar=true;
    var etiqueta=".contenido_preguntas .pre_selec_unica"; //Etiqueta que va a recorrer seleccion_unica  pre_selec_unica
    var etiquetaRespuesta="seleccionUnica"; //Etiqueta que tiene las respuestas
    var atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
     
    verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
         
    if(verificar){ //si verificar es false no dentra a verificar las otras preguntas
        etiqueta=".contenido_preguntas .pre_selec_multi"; //Etiqueta que va a recorrer
        etiquetaRespuesta="seleccionMultiple"; //Etiqueta que tiene las respuestas
        atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
        verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
    }
      
    if(verificar){
        etiqueta=".contenido_preguntas .pre_falso_verdadero"; //Etiqueta que va a recorrer
        etiquetaRespuesta="seleccionFalsoVerdadero"; //Etiqueta que tiene las respuestas
        atributoRespuesta="dataRespuestaCorrecta"; //attributo donde guardo esas respuestas
        verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
                   }
        
    if(verificar){
        etiqueta=".contenido_preguntas .pre_completar";
        etiquetaRespuesta="seleccionCompletarOraciones";
        atributoRespuesta="dataRespuestaCompletar";
        verificar= verificarRespuestas(etiqueta,etiquetaRespuesta,atributoRespuesta);
    }
            
    return verificar;
}

function existePalabra(texto,palabra){
    //alert('****existe '+texto+" "+palabra);
    return texto.indexOf(palabra);
}
 
function obtenerTexto(vector){
    var texto = "";
    $.each(vector,function(i){
        //alert('each '+vector[i]);
        var resp = existePalabra(vector[i],'/*//'); //aqui
        var span = existePalabra(vector[i],'span');
        var pts = existePalabra(vector[i],'pts');
        //alert('resp '+resp)
        if(span != -1 || pts != -1){
            texto = texto;
        }else if(resp != -1 ){
            texto+='·._________.·';
        }else{
            texto+=vector[i];
        }
    });
    return texto;
}


 function cargarComplete(id){
    //alert('cargar acá');
    $(".pre_completar").each(function(i){
        //alert($(this).attr('data-idPregunta')+" = "+id);

        if($(this).attr('data-idPregunta') === id){

            //alert('entro');
            $('#formCompletarOraciones .cntRespuesta tr').remove();

           // alert($(this).find('h4').html());

            var pregunta = $(this).find('h4').html().replace(/>/g,"/*// <");  //aqui
            var vec = pregunta.split("<");
            //alert(vec.toString());

            $('#formCompletarOraciones textarea[name=pregunta]').text(obtenerTexto(vec));
            $('#formCompletarOraciones input[type=text]').val($(this).find('h4').children('span').attr('data-valor'));
            //alert();
            $('#formCompletarOraciones input[name=consulta]').val("mod_pre_completar");
            $('#formCompletarOraciones input[name=consulta]').attr("data-idPregunta",id);
            $(this).find('input[data-editar=complete]').each(function(j){
                //alert($(this).attr('value'));
                var value = $(this).attr('value');
              //  alert(value);
                if(j>3){
                    $('#formCompletarOraciones .cntRespuesta').append("<tr><td style='display: none;'>"+j+"</td><td><textarea name='opcion' class='input_redondo_oscuro' required>"+value+"</textarea></td><td><button type='button' onclick='deleteCompletarPregunta("+j+")' class='botonCircular rojo_flat'><span class='icon-minus'></span></button></td></tr>");        
                }else{
                    $('#formCompletarOraciones .cntRespuesta').append("<tr><td><textarea name='opcion' class='input_redondo_oscuro' required>"+value+"</textarea></td></tr>")
                }
                
            });

        }
    });
}

function actualizarComplete(data,id){
    //alert("actua id = "+id);
    $(".pre_completar").each(function(i){
        if($(this).attr('data-idPregunta') === id){
            var html = "";
            $(data).each(function(i, field){
                var valor = field.value.trim();  
                
                if(i===1){
                    var pregunta = valor.replace(/·._________.·/g,"<input type='button' dataPrueba='JIMMY'  dataRespuesta='' data-idComplete='"+ id +"' class='botonPregunta' onclick='pasarValorCompletar(this)'>");

                    html+="<h4>"+pregunta;
                }else if(i===2){
                    html+="<span data-valor='"+valor+"'>("+valor+"pts)</span></h4>"
                }else if(i>1){
                    html+= "<br>"+"<input type='button' dataEditar='complete'  class='botonCompletarRespuesta eventoRespuesta' data-idComplete='"+ id +"'  data-idOpcione='' style=' ' onclick='pasarValorTemporal(this)' value='"+valor+"'>"+"<br>";
                }

            });
            $(this).find('div[class=datos-pregunta]').html(html);
            alertify.success("Pregunta Actualizada");

            limpiarOcultarFormulario('formCompletarOraciones','formCompletarOraciones');

            $(".completar_oracion tr").each(function (index){
                if(index  > 3){
                    $(this).remove();
                }
            });

            $('#formCompletarOraciones input[type=hidden]').val("completarOraciones");
        }
    });
}

function ultimoId(clase){
    //alert($('.'+clase+':last').attr('data-idPregunta'));
    if( $('.'+clase).length > 0){
       
        var id = $('.'+clase+':last').attr('data-idPregunta');
         //alert(parseInt(id)+1);
        return parseInt(id)+1;
    }else{
        //alert('1');
        return 1;
    }
}
  /*
  function exportPdf() { //para exportar a pdf
            var divEncabezado= $("#encabezado").html();
           
            //var divContents = $("#exportarPreguntas").html();
           // divContents=divEncabezado+divContents;
           // divContents=divContents+"style='padding: 15px'";
            var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>Exportar Examen</title>');
            printWindow.document.write('<link rel="stylesheet" href="../../css/estilo_general.css"><link rel="stylesheet" href="../../css/fonts/style.css"> </head><body >');
            printWindow.document.write(divEncabezado);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
} */

