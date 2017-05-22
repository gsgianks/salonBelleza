$(document).ready(function () {

 
   });
function falsoVerdadero(pregunta,puntos,respuestas,opciones){
  //  alert("Dentra al  falsoVerdadero");
    var respuesta = JSON.parse(respuestas);
    var opcion=  JSON.parse(opciones);
    var id = $('.pre_falso_verdadero').length+1;

    var html = "<div data-idPregunta='"+id+"' class='pre_falso_verdadero' style='display:none;'>";

    
         html+="<h4 data-pregunta='"+pregunta+"'>"+ pregunta;
      
          //  html+="<h4 data-pregunta='"+puntos+"'>"+puntos;
      
            html+="<span data-valor='"+puntos+"'>("+puntos+"pts)</span></h4>";

              opcion=shuffle(opcion);
                for(var i=0; i<opcion.length; i++){
         var index = respuesta.indexOf(opcion[i]);
             
                   if(index === -1){
                  
            html+="<input type='radio' class='radioButton' data-revisado='false'  data-Correcta='false' data-puntos='"+puntos+"' data-groupnameFalso='groupnameFalso" +id  +"'' data-name='optionF"+id+"' name='optionF"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";
           
                   }else{
        
            html+="<input type='radio' class='radioButton' data-revisado='false'  data-Correcta='true' data-puntos='"+puntos+"' data-groupnameFalso='groupnameFalso" +id  +"'' data-name='optionF"+id+"' name='optionF"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";
               
                   }


            } 
   
     html+="<footer class='footPregunta'></footer></div>";
    html+="</div>";

    if($('.falso_verdadero').is(':empty')){
        $(".falso_verdadero").append("<h4 class='tituloPartePrueba'>Falso-Verdadero</h4>");
        $(".falso_verdadero").append(html);
        $(".falso_verdadero").hide();

    }else{
        $(".falso_verdadero").append(html);
    }
    
} 


function selecionUnica(pregunta,puntos,respuestas,opciones){
    //alert("Dentra al  selecionUnica");
    var id = $('.pre_seleccion_unica').length+1;

    var respuesta = JSON.parse(respuestas);
    var opcion=  JSON.parse(opciones);

    var html = "<div data-idPregunta='"+id+"' class='pre_seleccion_unica' style='display:none;'>";

            html+="<h4 data-pregunta='"+pregunta+"'>"+ pregunta;
       
            html+="<span data-valor='"+puntos+"'>("+puntos+"pts)</span></h4>";

            opcion=shuffle(opcion);

            for(var i=0; i<opcion.length; i++){
       //  html+="<input type='radio' class='radioButton' data-revisado='false' onclick='revisarRespuesta(this)' data-Correcta='false' data-puntos='"+puntos+"' data-groupname='groupnameUnica" +id  +"'' name='option"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";
              var index = respuestas.indexOf(opcion[i]);
             // alert("index="+index);
                   if(index === -1){
                  //  alert("respuesta incorrecta= "+opcion[i] );
          //html+="<input type='radio' class='radioButton' data-revisado='false' onclick='revisarRespuesta(this)' data-Correcta='false' data-puntos='"+puntos+"' data-groupname='groupnameUnica" +id  +"'' data-name='option"+id+"'  name='option"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";
                 
            html+="<input type='radio' class='radioButton' data-revisado='false'  data-Correcta='false' data-puntos='"+puntos+"' data-groupname='groupnameUnica" +id  +"'' data-name='option"+id+"'  name='option"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";
         //  html+="<input type='radio' class='radioButton'   data-Correcta='false' data-puntos='"+puntos+"' name='groupnameUnica" +id  +" ' data-groupname='groupnameUnica" +id  +"'  value='"+opcion[i]+"'>"+opcion[i]+"<br>";
           
                   }else{
            html+="<input type='radio' class='radioButton' data-revisado='false'  data-Correcta='true' data-puntos='"+puntos+"' data-groupname='groupnameUnica" +id  +"'' data-name='option"+id+"' name='option"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";
            //  html+="<input type='radio' class='radioButton'  data-Correcta='true' data-puntos='"+puntos+"' data-groupname='groupnameUnica" +id  +"'  value='"+opcion[i]+"'>"+opcion[i]+"<br>";
               
                   }


            } 
    
    html+="<footer class='footPregunta'></footer></div>";
             html+="</div>";

    if($('.seleccion_unica').is(':empty')){
        $(".seleccion_unica").append("<h4 class='tituloPartePrueba'>seleccion Unica</h4>");
        $(".seleccion_unica").append(html);
        $(".seleccion_unica").hide();

    }else{
        $(".seleccion_unica").append(html);
    }
    
}



function selectMulti(pregunta,puntos,respuestas,opciones){
       // alert("seleccion_multiple");
    var id = $('.pre_selec_multi').length+1;
   

    var respuesta = JSON.parse(respuestas);
    var opcion=  JSON.parse(opciones);

  

    var html = "<div data-idPregunta='"+id+"' class='pre_selec_multi' style='display:none;'>";
    
            html+="<h4 data-sumada"+id+"='false' data-pregunta='"+pregunta+"'>"+ pregunta; //data-sumada es para ver el 
       
            html+="<span data-valor='"+puntos+"'>("+puntos+"pts)</span></h4>";


            opcion=shuffle(opcion);

            for(var i=0; i<opcion.length; i++){ 
              var index = respuesta.indexOf(opcion[i]);
                  if(index === -1){
            html+="<input type='checkbox'  data-check='false' data-puntos='"+puntos+"' data-Correcta='false' data-revisado='false' data-name='checkoption"+id+"'  name='checkoption"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";
                }else{
                 // alert("correctas="+opcion[i]);
            html+="<input type='checkbox' data-preguntamulti='data-sumada"+id+"' data-Correcta='true' data-check='true' data-puntos='"+puntos+"' data-revisado='false' data-name='checkoption"+id+"'  name='checkoption"+id+"' value='"+opcion[i]+"'>"+opcion[i]+"<br>";    
                }
           }  

   
   
     html+="<footer class='footPregunta'></footer></div>";
             html+="</div>";
 
    if($('.seleccion_multiple').is(':empty')){
       
        $(".seleccion_multiple").append("<h4 class='tituloPartePrueba'>Selecci&oacute;n Múltiple</h4>");
        $(".seleccion_multiple").append(html);
        $(".seleccion_multiple").hide();

    }else{
        
        $(".seleccion_multiple").append(html);

    }
   
}   


   function preguntaDesarrollo(pregunta,puntos){

    var id = $('.pre_pregunta_desarrollo').length+1;

    var html = "<div data-idPregunta='"+id+"' class='pre_pregunta_desarrollo'>";

            html+="<h4 data-pregunta='"+pregunta+"'>"+ pregunta;
       
            html+="<span data-valor='"+puntos+"'>("+puntos+"pts)</span></h4>";

   
   
             html+="<textarea class='textareaDesarrollo'></textarea></div></div>";

    if($('.pregunta_desarrollo').is(':empty')){
    
        $(".pregunta_desarrollo").append("<h4 class='tituloPartePrueba'>Pregunta-Desarrollo</h4>");
        $(".pregunta_desarrollo").append(html);
        $(".pregunta_desarrollo").hide();

    }else{

        $(".pregunta_desarrollo").append(html);

    }

}

function completarOraciones(pregunta,puntos,respuestas,opciones){

    var respuesta = JSON.parse(respuestas);
    var opcion=  JSON.parse(opciones);
    var id = $('.pre_completar').length+1; 
    var html = "<div data-idPregunta='"+id+"' class='pre_completar'>";
    
            var Nuevapregunta = pregunta.replace(/\u00b7._________.\u00b7/g,"<input type='button' dataRespuesta='' data-idComplete='"+ id +"' class='botonPregunta' onclick='pasarValorCompletar(this)'>");

            html+="<h4>"+Nuevapregunta;
           
            html+="<span data-valor='"+puntos+"'>("+puntos+"pts)</span></h4>"
              
              opcion=shuffle(opcion);

            for(var i=0; i<opcion.length; i++){ 
              var index = respuesta.indexOf(opcion[i]);
                  if(index === -1){
                      html+= "<br>"+"<input type='button' data-estado='false' data-correcta='false' data-editar='complete'  class='botonCompletarRespuesta eventoRespuesta' data-idComplete='"+ id +"'  data-idOpcione='' style=' ' onclick='pasarValorTemporal(this)' value='"+opcion[i]+"'>"+"<br>";
           
                }else{ //opciones correctas
                      html+= "<br>"+"<input type='button' data-estado='false' data-correcta='true' data-editar='complete'  class='botonCompletarRespuesta eventoRespuesta' data-idComplete='"+ id +"'  data-idOpcione='' style=' ' onclick='pasarValorTemporal(this)' value='"+opcion[i]+"'>"+"<br>";
          
               }
           }
  
       /* for(var i=0; i<respuesta.length; i++){  
            html+= "<br>"+"<input type='button' data-editar='complete'  class='botonCompletarRespuesta eventoRespuesta' data-idComplete='"+ id +"'  data-idOpcione='' style=' ' onclick='pasarValorTemporal(this)' value='"+respuesta[i]+"'>"+"<br>";
            }
        for(var i=0; i<opcion.length; i++){
          html+= "<br>"+"<input type='button' data-editar='complete'  class='botonCompletarRespuesta eventoRespuesta' data-idComplete='"+ id +"'  data-idOpcione='' style=' ' onclick='pasarValorTemporal(this)' value='"+opcion[i]+"'>"+"<br>";
            } */


             html+="<footer class='footPregunta'></footer></div>";
             html+="</div>";
      

        if($('.completar').is(':empty')){
            $(".completar").append("<h4 class='tituloPartePrueba'>Completar Oraciones</h4>");
            $(".completar").append(html);
             $(".completar").hide();
          //  alert("Dentra al if completar");

        }else{
            $(".completar").append(html);
        }
      
   
}


function respuestaCorta(pregunta,puntos,renglones){

    var id = $('.pre_respuesta_corta').length+1;
   // alert("Llega a respuestaCorta");

    var html = "<div data-idPregunta='"+id+"' class='pre_respuesta_corta'>";
    
            html+="<h4 data-pregunta='"+pregunta+"'>"+pregunta;
      
            html+="<span data-valor='"+puntos+"'>("+puntos+"pts)</span></h4>";
       
            for (var i=0; i<renglones; i++) {
             html+="<input class='inputRespuestaCorta' type='text' name='respuesta'>";
            }
      
             html+="</div></div>";
     

    if($('.respuesta_corta').is(':empty')){
        $(".respuesta_corta").append("<h4 class='tituloPartePrueba'>Respuesta-Corta</h4>");
        $(".respuesta_corta").append(html);
        $(".respuesta_corta").hide();

    }else{
        $(".respuesta_corta").append(html);

    }
    
}

function asocie(pregunta,valor,columnA,columnaB,respuestas){ //respuesta falta
     // alert("Dentra Asocie");
        var columnB = JSON.parse(columnaB);
        var columnA=  JSON.parse(columnaA);
        var response=  JSON.parse(respuestas);
        var columna = $('.preColumnaA tr').length+2; /*Esta suma de 2, es por los 2 campos primeros del form*/
  
        var id = $('.pre_asocie').length+1;
        var clsColumA = "asocA"+id, clsColumB = "asocB"+id;
  
       var html = "<div data-idPregunta='"+id+"'  class='pre_asocie'>";
       var html = "<div class='pre_asocie' style='display:none;'>";

       var cont = 1;
      
          //  columnA=shuffle(columnA);
          //  columnB=shuffle(columnB);
      
     
            html+="<h4 data-idPregunta='"+id+"' data-Respuesta='"+ response.toString() +"' data-pregunta='"+pregunta+"'>"+pregunta;
        
            html+="<span data-puntos='"+valor+"'>("+valor+"pts)</span></h4><ul><li><h4>Columna A</h4> <table id='tbColumnaA'><tbody>";
        for(var i=0; i<columnA.length; i++){  
            html+="<tr class='"+clsColumA+"' data-columna='"+clsColumB+"'><td><span>"+(cont++)+"</span></td><td><p>"+columnA[i]+"</p></td></tr>";
           
        }
         html+="</tbody></table></li><li><h4>Columna B</h4><table id='tbColumnaB'><tbody>";
         
         for(var i=0; i<columnB.length; i++){ 
            html+="<tr class='"+clsColumB+"' data-focus=''><td><span> </span></td><td><p>"+columnB[i]+"</p></td></tr>";
         }
    
  
    html+="</tbody></table></li><footer class='footPregunta'></footer></ul> </div>    ";

    if($('.asocie').is(':empty')){
        $(".asocie").append("<h4 class='tituloPartePrueba'>Asocie</h4>");
         
        $(".asocie").append(html);

       $(".asocie").hide();

    }else{
      
        $(".asocie").append(html);
        $(".asocie").hide();

    } 
    clickColumA(clsColumA);
    clickColumB(clsColumB);
  // alert("sale asocie");
   
 }
      function opcionesMarcadasAsocie(etiqueta,nota,vect){
      var sumar=true;
      var pregunta=0;
       // alert("Dentro a anota asocie");
  $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
            
          
          var arrayOpciones=[];
          var arrayRespuesta=[];
          puntosPregunta=($(this).find('h4').children('span').attr('data-puntos'));

            
             vect[2]= vect[2]+parseInt(puntosPregunta);
             //alert("aciertos="+vect[1]);
            
            //  fallidas++;
            //  alert("fallos="+fallidas+ " vect="+vect[0]);
              
         
          // alert("puntos ="+puntosPregunta);
          var pregunta = $(this).find('h4').html();  
          arrayRespuesta = $(this).find('h4').attr('data-Respuesta').split(',');
           // alert("respuestas= "+arrayRespuesta.toString());
        // alert("id ="+ $(this).find('h4').attr("data-idPregunta"));

            var cont = 0;
            var acertadas = 0;

            $('.asocB'+$(this).find('h4').attr("data-idPregunta") ).each(function (i) {
             // alert(" columna b= "+$(this).find('span').text());
               if($(this).find('span').text() === arrayRespuesta[cont++]){
                  acertadas++;
                   vect[1]= parseInt(vect[1]) +1;
                  // alert("igual Asocie acertadas ="+acertadas);
               }else{
                 vect[0]= parseInt(vect[0]) + 1;
               }
           
            });
         

                    nota = nota +parseInt( acertadas);
                
                            
            });     
        // alert("nota Asocie="+nota);
        return nota;
        }   


 

   //Funciones para respuesta de pregunta
function pasarValorTemporal(valor){ 
    
    $("#temporal").attr("value", $(valor).val());
    $("#temporal").attr("data.idTemporal",$(valor).attr("data-idComplete"));
   // $(valor).attr("data-estado","true");
   // data-estado='false' data-correcta='false'
             
}

function pasarValorCompletar(boton){
       
    if( $("#temporal").attr("data.idTemporal") ==  $(boton).attr("data-idComplete") ){
        $(boton).attr("value",$("#temporal").val());
        $(boton).attr("dataRespuesta",$("#temporal").val());
    }else{
        alertify.error("Opción de pregunta equivocado :(");
    }

    $("#temporal").attr("value", "");
}  



//Funcion Asocie
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


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {

      // Seleccionar un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // E intercambiarlo con el elemento actual
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function getRandomArbitrary(min, max) { //retorna incluyendo el minimo y Excluyendo el maximo
    return Math.random() * (max - min) + min;
  }

    function puntuacionFinal(){  
              alertify.confirm("<h3> Enviar respuestas a evaluar  </b></h3> <br>"+
                              " <h5> Esta acción no es reversible </b></h5>", function (e) {
                         if (e) {
                          ocultarTodo();
                           clearInterval(control);
                  var nota=0;
                  var vectNota=[];
                  vectNota[0]=0;
                  vectNota[1]=0;
                   vectNota[2]=0;
                 var  etiqueta=".contenido_preguntas .pre_selec_multi"; //Etiqueta que va a recorrer
                  
                nota = contarPuntos(etiqueta,nota,"check",vectNota);
             //  alert("Nota check="+nota);
                etiqueta=".contenido_preguntas .pre_seleccion_unica"; //Etiqueta que va a recorrer
                //  alert("Nota que dentra al radio="+nota);
                nota = contarPuntos(etiqueta,nota,"radio",vectNota);
                 //alert("Nota radio="+nota);
                etiqueta=".contenido_preguntas .pre_falso_verdadero"; //Etiqueta que va a recorrer
                        //  alert("Nota que sale al radio falso="+nota);  
               nota = contarPuntos(etiqueta,nota,"radio",vectNota);
               nota =  opcionesMarcadasCompletar(".contenido_preguntas .pre_completar",nota,vectNota);

               nota =opcionesMarcadasAsocie( ".contenido_preguntas .pre_asocie",nota,vectNota);
               // alert("Nota Final="+nota);
                /////////////saca la nota final

                 var puntos=0;
                 var final=0;

                 puntos=nota *100;
                 final= puntos / parseInt(vectNota[2]);

               //empieza a ocultar componentes
                 $("#Nota").attr("value",final);
                 $("#btnDer").hide();
                 $("#btnIzq").hide();
                 $("#evaluar").hide();
                 $("#volver").attr("type","button");
                 $("#fallos").attr("value",vectNota[0].toString());
                 $("#aciertos").attr("value",vectNota[1].toString());  
                 $("#notaExamen").attr("value",final); 
                 $("#totalPuntos").attr("value",vectNota[2].toString());
                  $("#puntosObtenidos").attr("value",nota);
                  $("#cardNota").fadeIn("slow");
                 }else{ 
                      alertify.error("Cancelado" );                 
                    }

                  }).setHeader('<em> PlatCourse </em>');
    }

    function quitarExamen(){  
              ocultarTodo();
                  var nota=0;
                  var vectNota=[];
                  vectNota[0]=0;
                  vectNota[1]=0;
                   vectNota[2]=0;
                 var  etiqueta=".contenido_preguntas .pre_selec_multi"; //Etiqueta que va a recorrer
                  
                nota = contarPuntos(etiqueta,nota,"check",vectNota);
             //  alert("Nota check="+nota);
                etiqueta=".contenido_preguntas .pre_seleccion_unica"; //Etiqueta que va a recorrer
                //  alert("Nota que dentra al radio="+nota);
                nota = contarPuntos(etiqueta,nota,"radio",vectNota);
                 //alert("Nota radio="+nota);
                etiqueta=".contenido_preguntas .pre_falso_verdadero"; //Etiqueta que va a recorrer
                        //  alert("Nota que sale al radio falso="+nota);  
               nota =  opcionesMarcadasCompletar(".contenido_preguntas .pre_completar",nota,vectNota);

               nota =opcionesMarcadasAsocie( ".contenido_preguntas .pre_asocie",nota,vectNota);
              ///  alert("Nota Final="+nota);
                /////////////saca la nota final

                 var puntos=0;
                 var final=0;

                 puntos=nota *100;
                 final= puntos / parseInt(vectNota[2]);

               //empieza a ocultar componentes
                 $("#Nota").attr("value",final);
                 $("#btnDer").hide();
                 $("#btnIzq").hide();
                 $("#evaluar").hide();
                 $("#volver").attr("type","button");
                 $("#totalPuntos").attr("value",vectNota[2].toString());
                  $("#puntosObtenidos").attr("value",nota);
                 $("#fallos").attr("value",vectNota[0].toString());
                 $("#aciertos").attr("value",vectNota[1].toString());  
                 $("#notaExamen").attr("value",final); 
                  $("#cardNota").fadeIn("slow");
                

                
    }

  function contarPuntos(etiqueta,nota,tipo,vect){ //cuenta los puntos de las preguntas asertadas
      //alert('guardarPreguntas');
    
      var id=1;
      var puntosPregunta=0;
      var sumar=true;
      var boton;
      var aciertos=0;
      var fallidas=0;

      // alert("Dentra");
      $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
        
             puntosPregunta=($(this).find('h4').children('span').attr('data-valor'));
            
           
               boton=$(this).find('input');
               if(tipo == "check"){
                     sumar=sumarCheck(boton);
                   //  alert("respuesta check="+sumar);
               }
               if(tipo == "radio"){
                   sumar=sumarRadio(boton);
                 // alert("respuesta Radio="+sumar);
               } 
              

            if(sumar){
              //   alert("puntos="+puntosPregunta);
            //  alert("dentra a sumar="+parseInt(puntosPregunta));
             nota = nota +parseInt( puntosPregunta);
             vect[1]= parseInt(vect[1]) +1;
             vect[2]= vect[2]+parseInt( puntosPregunta);
             //alert("aciertos="+vect[1]);
            }else{
            //  fallidas++;
            //  alert("fallos="+fallidas+ " vect="+vect[0]);
              vect[2]= vect[2]+parseInt( puntosPregunta);
              vect[0]= parseInt(vect[0]) + 1;
              // alert("fallos="+vect[0]);
            }
             
              puntosPregunta=0;
                            
          });        
            
      return nota;
  } 

  function sumarRadio(boton){
          var  sumar=false;
          
          $("input[name='"+$(boton).attr("data-name") +"']").each(function() { 
    
               
         if($(this).is(':checked')){
           if($(this).attr("data-Correcta") == "true" ){ //verifica si la pregunta marcada es correcta
            
                sumar=true;
             }
         }
         
      });
              //  alert("Salir Radio="+sumar);
    return sumar;
  }

  function sumarCheck(boton){ //da evento a los todos los checkbox creados
       var respuestas = [];
       var marcadas = [];
       var verificar =true;
       var nota=0;
       var valorPregunta=0;
       var sumar=false;

      //recorre todo el grupo de check box de la pregunta
      $("input[name='"+$(boton).attr("data-name") +"']:checked").each(function() {
              marcadas.push($(this).val());
         
      });
      
      $("input[name='"+$(boton).attr("data-name") +"']").each(function() {
     
         if($(this).attr("data-check") == "true"){ //data-check='true' si la respuesta que marco es la correcta
             respuestas.push($(this).val());

         }
      });

         if(respuestas.length === marcadas.length){ //dentra si la cantidad de respuestas marcadas es igual el verctor respuestas
             for(var i=0; i<respuestas.length; i++){
                 var index = marcadas.indexOf(respuestas[i]);
                     if(index != 0){           //revisa las respuestas marcadas con el vector de respuestas
                        i=respuestas.length;
                         verificar=false;
                  }
              }
        

           if(verificar){
              sumar=true;
          }
        } 
    return sumar;

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

    function opcionesMarcadasCompletar(etiqueta,nota,vect){
      var sumar=true;
      var pregunta=0;

  $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
            
          
          var arrayOpciones=[];
          var arrayRespuesta=[];
          puntosPregunta=($(this).find('h4').children('span').attr('data-valor'));
          // alert("puntos ="+puntosPregunta);
          var pregunta = $(this).find('h4').html();  
         // alert("Pregunta ="+pregunta);
             arrayRespuesta=recorresPreguntaCompletar(pregunta);
       //      alert("Respuestas +++++++++++++="+arrayRespuesta.toString());
          $(this).find('input').each(function (index2) { //reorre las opciones de la pregunta
                 
                 
                if($(this).attr('data-correcta') == "true"){ //
                    arrayOpciones.push($(this).attr('value')); //guarda las opciones correctas
                   }
          });
           for(var i=0; i<arrayOpciones.length; i++){

                if(arrayOpciones[i] != arrayRespuesta[i]){
                           sumar=false;
                           i=arrayOpciones.length;
               }
            }
                 if(sumar){
                    nota = nota +parseInt( puntosPregunta);
                    vect[1]= parseInt(vect[1]) +1;
                    vect[2]= vect[2]+parseInt( puntosPregunta);
                 }else{
            //  fallidas++;
            //  alert("fallos="+fallidas+ " vect="+vect[0]);
              vect[2]= vect[2]+parseInt( puntosPregunta);
              vect[0]= parseInt(vect[0]) + 1;
              // alert("fallos="+vect[0]);
            }
                  sumar=true;    

                            
            });     
       //  alert("nota completar="+nota);
        return nota;
        }   

  function comprobanteExamen() { //para exportar a pdf
            var divEncabezado= $("#cardNota").html();
          //  $(".btnImpresion").
           
            //var divContents = $("#exportarPreguntas").html();
           // divContents=divEncabezado+divContents;
           // divContents=divContents+"style='padding: 15px'";
            var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>Comprobante Examen</title>');
            printWindow.document.write('<link rel="stylesheet" href="../../css/estilo_general.css"><link rel="stylesheet" href="../../css/fonts/style.css"> </head><body >');
            printWindow.document.write(divEncabezado);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
}

  
/*

  $("#btnPrint").live("click", function () { //para exportar
    alert("Hola");
            var divContents = $("#contenidoPreguntas").html();
            var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>Exportar Examen</title>');
            printWindow.document.write('<link rel="stylesheet" href="../../css/estilo_general.css"><link rel="stylesheet" href="../../css/fonts/style.css"> </head><body >');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        });*/
  function exportPdf() { //para exportar a pdf
            var divEncabezado= $("#contenidoPreguntas").html();
           
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
}





var centesimas = 30;
var segundos = 60;
var minutos = 5;
var horas = 2;

function inicio () {
  var count = $('#tiempo').val();
  var vect= count.split(":");
  horas =    parseInt(vect[0]);
  minutos =  parseInt( vect[1]);
  segundos = parseInt(vect[2]);

  Segundos.innerHTML = ":"+segundos;
  Minutos.innerHTML = ":"+minutos;
  Horas.innerHTML = horas;

 control = setInterval(reloj,1000);

}

  function reloj(){
     
     if(segundos > 0){
        segundos--;
        Segundos.innerHTML = ":"+segundos;
     }else if(segundos == 0 && minutos > 0){
         minutos=minutos-1;
        segundos=59;
        Minutos.innerHTML = ":"+minutos;
        Segundos.innerHTML = ":"+segundos;
     }else if(segundos == 0 && minutos == 0 && horas >0){
        horas--;
        minutos = 59;
        segundos = 59; 
        Minutos.innerHTML = ":"+minutos;
        Segundos.innerHTML = ":"+segundos;
        Horas.innerHTML = horas;
     }else{
        clearInterval(control);
        quitarExamen();
     }

  }




       function mostrarPreguntasFaltantes(etiqueta, inicio ,limite,mostrar){

       // var inicio=1;
        var completo=0;
      
         // alert("Lega="+mostrar);
           $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
                   
                if ( (inicio < limite) ) {
                  
                  if(mostrar === true){
                 
                     $(this).fadeIn('slow');
                     inicio++; 

                  }else{
                
                       $(this).fadeOut('fast');
                     inicio++; 
                  }
                    
                }
              
               
              }); 
           
           if(inicio < limite ){
               completo = limite - inicio; 
           }
         //  alert("Completo en mostrar="+completo);
           return completo;
     }

     function ensenarPreguntas(etiqueta,mostrar){

        var completo=0;
        $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
               
               if(mostrar === true){
                   
                     $(this).fadeIn('fast');
                 
                  }else{
                   $(this).fadeOut('fast');
                  }
                    
               }); 
          
           return completo;
     }
      

     function mostrarPreguntas(etiqueta, inicio ,limite,mostrar){

       // var inicio=1;
        var completo=0;
      
         // alert("Lega="+mostrar +" inicio="+inicio+" fin="+limite);
           $(etiqueta).each(function (index) { //recore la etiqueta de la pregunta
                   
                if ( (inicio < limite) && (index >= inicio )) {
                //  if(inicio < limite){
                  if(mostrar === true){
                   // alert("muestra");
                     $(this).fadeIn('fast');
                     inicio++; 

                  }else{
                 //  alert("esconde ="+inicio+" fin="+limite);
                       $(this).fadeOut('fast');
                     inicio++; 
                  }
                    
                }
              
               
              }); 
           
           if(inicio < limite ){
               completo = limite - inicio; 
           }
          // alert("Completo en mostrar="+completo);
           return completo;
     }  
            function ocultarTodo(){
               $(".seleccion_unica").hide();
              $(".falso_verdadero").hide();
              $(".seleccion_multiple").hide();
              $(".completar").hide();
              $(".respuesta_corta").hide();
              $(".pregunta_desarrollo").hide();
              $(".asocie").hide();
            }

             function paginarIzquierda(){
            
            var inicio= parseInt($("#paginar").attr("data-inicio")) ; //donde inicia
            var limite = parseInt($("#paginar").attr("data-fin")) ; //donde termina
            var tamanoCompletar= $('.pre_completar').length;
            var tamanoUnica= $('.pre_seleccion_unica').length;
            var tamanofalso= $('.pre_falso_verdadero').length;
            var tamanoMultiple= $('.pre_selec_multi').length;
            var tamanoDesarrollo= $('.pre_pregunta_desarrollo').length;
            var tamanoCorta= $('.pre_respuesta_corta').length;
            var tamanoAsocie =$('.pre_asocie').length;
            var tamano=0;
            var tipo=1;
            var vectorRespuesta=[];
            var quedo=parseInt($("#paginar").attr("tipoPregunta"));
            var temporal=0;
            var tipoTemporal=0;
            var faltan=false;
            var paginar = parseInt($("#paginar").attr("data-salto")) ; //salto de pagina
              inicio= parseInt($("#paginar").attr("data-inicio")) ; //donde inicia
              limite = parseInt($("#paginar").attr("data-fin")) ; //donde termina
              
              tamano= tamanoCompletar+tamanoUnica+tamanofalso+tamanoMultiple+tamanoDesarrollo+tamanoCorta+tamanoAsocie;
               quedo=parseInt($("#paginar").attr("tipoPregunta"));
               if(quedo >1){
                quedo=quedo-1;
               inicio= parseInt($("#paginar").attr("data-inicio")) ; //donde inicia
               paginar = parseInt($("#paginar").attr("data-salto")) ;
               limite = parseInt($("#paginar").attr("data-fin")) ;
                              inicio =parseInt(inicio)-parseInt(paginar);
                              limite=parseInt(limite)-parseInt(paginar);
                            if(limite == 0){
                            inicio=4;
                            limite=8;
                            }
                       $("#paginar").attr( "data-inicio", inicio.toString());
                       $("#paginar").attr( "data-fin", limite.toString());
                       $("#evaluar").attr("type","hidden");
               }
               
           // alert("paginarcion Izquierda "+quedo);
              if( (tamanofalso != 0) && (quedo == 1) ) {
                      // alert("Dentra falso y verdadero");
                           ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                      $(".seleccion_unica").hide();
                       $(".falso_verdadero").show();
                       ensenarPreguntas(".contenido_preguntas .pre_falso_verdadero" ,true);
                       faltan=true; 
                       $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                  }else{
                     if(tamanofalso == 0){
                      // alert("Dentra al else falso y verdadero");
                       quedo=2;
                     }

                      }

                   if( (tamanoUnica != 0) && (quedo == 2) &&(faltan == false) ) {
                      faltan=true;
                           ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                    //   alert("Dentra Unica");
                       $(".falso_verdadero").show();
                       $(".seleccion_unica").hide();
                         ensenarPreguntas( ".contenido_preguntas .pre_falso_verdadero",true);
                        quedo--;
                       $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                  }else{
                     if(tamanoUnica == 0){
                      // alert("Dentra  elese seleccion Unica");
                       quedo=3;
                     }      
                  }
                   if( ( tamanoMultiple != 0) && (quedo == 3)&&(faltan == false) ) {
                      faltan=true;
                           ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                     //  alert("Dentra   Multiple");
                       $(".seleccion_unica").show();
                       $(".seleccion_multiple").hide();
                         ensenarPreguntas(".contenido_preguntas .seleccion_unica" ,true);
                         quedo--;
                       $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                   
                  }else{
                     if(tamanoMultiple == 0){
                      // alert("Dentra  elese Multiple");
                       quedo=4;
                     }
                 }
                    if( (tamanoCompletar != 0) && (quedo == 4) &&(faltan == false)) {  
      
                      faltan=true;
                      ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                       $(".seleccion_multiple").show();
                       $(".completar").hide();
                         ensenarPreguntas(".contenido_preguntas .seleccion_unica" ,true);
                        quedo--;
                       $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                          
                  }else{
                     if(tamanoCompletar == 0){
                       quedo=5;
                     }
                 }
                   if( (tamanoAsocie != 0) && (quedo == 5)&&(faltan == false) ) {
                      faltan=true;
                           ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                       $(".completar").show();
                       $(".asocie").hide();
                         ensenarPreguntas(".contenido_preguntas .completar" ,true);
                        quedo--;
                       $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                          
                  }else{
                     if(tamanoAsocie == 0){
                       quedo=6;
                     }
                 }
                   if( (tamanoCorta != 0) && (quedo == 6)&&(faltan == false) ) {
                      faltan=true;
                           ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                        $(".respuesta_corta").hide();
                        $(".asocie").show();
                          ensenarPreguntas(".contenido_preguntas .asocie" ,true);
                         quedo--;
                       $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                      
                          
                  }else{
                     if(tamanoCorta == 0){
                       quedo=7;
                     }
                 }
                   if( (tamanoDesarrollo != 0) && (quedo == 7)&&(faltan == false) ) {
                    faltan=true;  
                         ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                    $(".pregunta_desarrollo").show();
                    $(".respuesta_corta").hide();
                     ensenarPreguntas(".contenido_preguntas .respuesta_corta" ,true);
                      
                         
                  }else{
                     if(tamanoDesarrollo == 0){
                       quedo=8;
                     }
                 }
                 
               inicio= parseInt($("#paginar").attr("data-inicio")) ; //donde inicia
               paginar = parseInt($("#paginar").attr("data-salto")) ;
               limite = parseInt($("#paginar").attr("data-fin")) ;
                              inicio =parseInt(inicio)-parseInt(paginar);
                              limite=parseInt(limite)-parseInt(paginar);
                              if(limite == 0){
                            inicio=4;
                            limite=8;
                            }
                           // alert(" inicio= "+ inicio+" final="+limite);
                       $("#paginar").attr( "data-inicio", inicio.toString());
                       $("#paginar").attr( "data-fin", limite.toString());
         
           }



         function paginarDerecha(){

          var inicio= parseInt($("#paginar").attr("data-inicio")) ; //donde inicia
          var limite = parseInt($("#paginar").attr("data-fin")) ; //donde termina
          var tamanoCompletar= $('.pre_completar').length;
          var tamanoUnica= $('.pre_seleccion_unica').length;
          var tamanofalso= $('.pre_falso_verdadero').length;
          var tamanoMultiple= $('.pre_selec_multi').length;
          var tamanoDesarrollo= $('.pre_pregunta_desarrollo').length;
          var tamanoCorta= $('.pre_respuesta_corta').length;
          var tamanoAsocie =$('.pre_asocie').length;
          var tamano=0;
          var tipo=1;
          var vectorRespuesta=[];
          var quedo=parseInt($("#paginar").attr("tipoPregunta"));
          var temporal=0;
          var tipoTemporal=0;
          var faltan=false;
           var paginar = parseInt($("#paginar").attr("data-salto")) ; //salto de pagina
            inicio= parseInt($("#paginar").attr("data-inicio")) ; //donde inicia
            limite = parseInt($("#paginar").attr("data-fin")) ; //donde termina
                  tamano= tamanoCompletar+tamanoUnica+tamanofalso+tamanoMultiple+tamanoDesarrollo+tamanoCorta+tamanoAsocie;
               
             

            if( (tamanofalso != 0) && (quedo == 1) ) {
                    // alert("Dentra falso y verdadero");
                         ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                     $(".falso_verdadero").show();
                     ensenarPreguntas(".contenido_preguntas .pre_falso_verdadero" ,true);
                     faltan=true; 
                     quedo++;
                     $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                }else{
                   if(tamanofalso == 0){
                    // alert("Dentra al else falso y verdadero");
                     quedo=2;
                   }

                    }

                 if( (tamanoUnica != 0) && (quedo == 2) &&(faltan == false) ) {
                    faltan=true;
                         ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                  //   alert("Dentra Unica");
                     $(".falso_verdadero").hide();
                     $(".seleccion_unica").show();
                       ensenarPreguntas( ".contenido_preguntas .pre_seleccion_unica",true);
                      quedo++;
                     $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                }else{
                   if(tamanoUnica == 0){
                    // alert("Dentra  elese seleccion Unica");
                     quedo=3;
                   }      
                }
                 if( ( tamanoMultiple != 0) && (quedo == 3)&&(faltan == false) ) {
                    faltan=true;
                         ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                   //  alert("Dentra   Multiple");
                     $(".seleccion_unica").hide();
                     $(".seleccion_multiple").show();
                       ensenarPreguntas(".contenido_preguntas .pre_selec_multi" ,true);
                      quedo++;
                     $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                 
                }else{
                   if(tamanoMultiple == 0){
                    // alert("Dentra  elese Multiple");
                     quedo=4;
                   }
               }
                  if( (tamanoCompletar != 0) && (quedo == 4) &&(faltan == false)) {  
    
                    faltan=true;
                         ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                     $(".seleccion_multiple").hide();
                     $(".completar").show();
                       ensenarPreguntas(".contenido_preguntas .pre_completar" ,true);
                      quedo++;
                     $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                        
                }else{
                   if(tamanoCompletar == 0){
                     quedo=5;
                   }
               }
                 if( (tamanoAsocie != 0) && (quedo == 5)&&(faltan == false) ) {
                    faltan=true;
                     $(".completar").hide();
                          ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                     $(".asocie").show();
                       ensenarPreguntas(".contenido_preguntas .pre_asocie" ,true);
                      quedo++;
                     $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                        
                }else{
                   if(tamanoAsocie == 0){
                     quedo=6;
                   }
               }
                 if( (tamanoCorta != 0) && (quedo == 6)&&(faltan == false) ) {
                    faltan=true;
                      $(".pregunta_desarrollo").hide();
                           ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                      $(".respuesta_corta").show();
                        ensenarPreguntas(".contenido_preguntas .pre_respuesta_corta" ,true);
                       quedo++;
                     $("#paginar").attr( "tipoPregunta",  quedo.toString() );
                    
                        
                }else{
                   if(tamanoCorta == 0){
                     quedo=7;
                   }
               }
                 if( (tamanoDesarrollo != 0) && (quedo == 7)&&(faltan == false) ) {
                  faltan=true;  
                  $(".pregunta_desarrollo").show();
                       ocultarTodo();//////////////////////////////////////////////////////////////////////////////////////
                  $(".respuesta_corta").hide();
                   ensenarPreguntas(".contenido_preguntas .pre_pregunta_desarrollo" ,true);
                    
                       
                }else{
                   if(tamanoDesarrollo == 0){
                     quedo=8;
                   }
               }
                if(inicio > tamano){
                     $("#evaluar").attr("type","button");
                     alertify.success("Final del examen :)");
              }
             inicio= parseInt($("#paginar").attr("data-inicio")) ; //donde inicia
             paginar = parseInt($("#paginar").attr("data-salto")) ;
             limite = parseInt($("#paginar").attr("data-fin")) ;
                            inicio =parseInt(inicio)+parseInt(paginar);
                            limite=parseInt(limite)+parseInt(paginar);
                         //       alert(" inicio= "+ inicio+" final="+limite);
                     $("#paginar").attr( "data-inicio", inicio.toString());
                     $("#paginar").attr( "data-fin", limite.toString());
           
       

         }



function ocultar(etiqueta){
   
    var vectorGuia=[];
  
    // alert("Hola");
        var inicio= parseInt($(".btnDer").attr("data-inicio")) ;
   //alert("inicio="+ inicio );

   if(inicio === 1){
    $(".contenido_preguntas  .pre_asocie").each(function (index) { //recore la etiqueta de la pregunta
           alert("for");
         
       $(this).fadeOut('slow');
            });  
   inicio--;
  }
  if(inicio === 0){
   $(".contenido_preguntas  .pre_seleccion_unica").each(function (index) { //recore la etiqueta de la pregunta
           alert("for");
       
       $(this).fadeIn('slow');
            }); 
    inicio--;  //inicio.toString()
  }
 
   
   // alert(inicio);
     //$("#btnDer" ).atrr("data-inicio", "1");
     //   $(".btnDer").attr("data-inicio", limit.toString());
        $(".btnDer").attr("data-inicio","1" );
   //alert( parseInt($(".btnDer").attr("data-inicio")) );
          
   
    return vectorGuia;
} 


  function btnDerecha(boton){
    //alert("derecha");
             guardarPreguntas("pre_asocie",boton);

  }
  function btnIzquierda(boton){
alert("izaquierda");
             ocultar("pre_asocie",boton);

  }
