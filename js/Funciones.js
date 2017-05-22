$(document).ready(function () {


  alert("Dentra");
});

      function ventanaModalPregunta(){
 

        $("#ventanaModalPregunta").css("display","block");

          
  }
  
   function cerrarVentanaModalPregunta(){  
  $(function() {                
              
            
                        $( "#ventanaModalPregunta" ).css( "display","none" );
                       
                  
            });
            
            
  }


  function ventanaModalRespuesta(){
  
  $("#ventanaModalRespuesta").css("display","block");
   

  }
  
    function cerrarModalRespuesta(){  
               
              
                        $( "#ventanaModalRespuesta" ).css( "display","none" );
                  $("#opcion").val("");
          
              
  }
  
  function ventanaCrearPregunta(){

     $("#ventanaCrearPregunta").css("display","block");
 

  }
  
    function cerrarModalPregunta(){  
               
              
                        $( "#ventanaCrearPregunta" ).css("display", "none" );
                  
          
            
  }
  
  function crearPregunta(){
      var opcion=$("#pregunta").val();
      var parametros = {
                "opcion" : opcion,
                "metodo" : "Pregunta"
             
        };
          
    
        $.ajax({
                data:  parametros,
                url:   '../Logic/Metodos.php',
                type:  'post',
                
             

        success:  function (response) {
          
                $("#PreguntaCompletar").html(response);
              
          
                },
                 error: function (xhr, thrownError) {
                     $("#PreguntaCompletar").html("Error...");
   
      }
   
        });
        cerrarModalPregunta();
  }

function AgregarRespuestas(){

        var opcion=$("#opcion").val();

        var parametros = {
                "opcion" : opcion,
                "metodo" : "opcionNueva"
             
        };
          
    
        $.ajax({
                data:  parametros,
                url:   '../Logic/Metodos.php',
                type:  'post',
                
             

        success:  function (response) {
                $("#opcionesRespuesta").append(response);
               // recorrerRadioRespuestas();
           //$("#PreguntaCompletar").innerHTML = html(response);
       
                },
                 error: function (xhr, thrownError) {
                     $("#opcionesRespuesta").html("Error...");
   
      }
   
        });
        cerrarModalRespuesta();
    }
    

   function prueba(){
    alert("Hola   "+ $('div.opt-selec-unica').children('p').val);

      var vector=$('div.opt-selec-unica').children('p');

      for(var i=0; i<vector.length;i++){
          alert(   vector[i]);
      }
   }


    
    function guardarPregunta(){
          var texto=  $("#pregunta").val();
         // alert(texto);
          var listaRespuestas=   recorrerRadioRespuestas();
          
           var parametros = {
                "pregunta" : texto,
                "opcion" : listaRespuestas,
                "metodo" : "GuardarPregunta"
             
        };
          
    
        $.ajax({
                data:  parametros,
                url:   '../Logic/Metodos.php',
                type:  'post',
                
             

        success:  function (response) {
                 $("#examen").append(response);
               $( "#PreguntaCompletar" ).html("");
                $( "#opcionesRespuesta" ).html("");
                  $( "#pregunta" ).val("");
              cerrarVentanaModalPregunta();
                },
                 error: function (xhr, thrownError) {
                     $("#examen").html("Error...");
   
      }
          
    });
      }

function AgregarCampoVacio(){
   
    var espacio="_________";
     var texto=  $("#pregunta").val();
     texto=texto+espacio;
    $("#pregunta").val(texto);
}

 function recorrerRadioRespuestas(){
    var listaRespuestas = new Array();
    $("input[name=group1]").each(function (index) { 
       if($(this).is(':checked')){
          //listaRespuestas = $(this).val();
       }else{
           listaRespuestas.push($(this).val());
           alert("valor="+listaRespuestas[0]);
       }
    });
    return listaRespuestas;
  }