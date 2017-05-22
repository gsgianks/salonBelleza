     
$(document).ready(function(){
  
		$("#cambiarContrasenia").on("click", function(){
                 
           $('.formCambioContrasenia').fadeIn("slow") ;

          });
          
	
		}); //cierra el document  onsubmit='return validate_password()'
	

	/////////////////////////////////Inicio de cambiar Foto

	             function cerrarVentana(){

	             	$("#FormularioContra")[0].reset();
	             	 $('.formCambioContrasenia').fadeOut("slow") ;
	             }

	       
	       $("#cambiarFoto").on("click", function(){
	        
	                 
	           $('.formCambioFoto').fadeIn("slow") ;
	               
	       });
	        
	       
	        function cerrarVentanaFoto(){ //cierra la ventana de cambiar foto
	               	$("#formFoto")[0].reset();
	               $('.formCambioFoto').fadeOut("slow") ;
	             }
	     

	     $("#fileImagen").change(function () {
	    		var file = this.files[0],  name = file.name, size = file.size, type = file.type;
	   
	    		var imageType = new Array("image/png","image/jpeg", "image/gif");

	   if(jQuery.inArray(type, imageType )  == -1) {
	     	  alert("Archivo no valido");
	   	 }else{ 
	      	$("#infoArchivo").text(name);
	      	previsualizarImagen(this);
	    } 
	});

function previsualizarImagen(input) {
    if (input.files && input.files[0]) {
       	 	var reader = new FileReader();
        	reader.onload = function (e) {
            $('#prevImagen img').remove();
            $('#prevImagen').append('<img src="'+e.target.result+'" width="135" height="135"/>');
        }
        
      reader.readAsDataURL(input.files[0]);

    
    }
}

 function enviarCambioFoto() {
 	 alert("Dentra");
        var inputFileImage = document.getElementById("fileImagen");
        var file = inputFileImage.files[0];
      
        var formdata = document.getElementById("formFoto");
        var data = new FormData(formdata);
  
        
           data.append('archivo', file);
           data.append('consulta', 'cambiarFoto');
           var url = "../../Controller/ControladoraUsuarios.php";     
     
        $.ajax({
            url: url,
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
             success: function (resp) {      
               alert(resp);
               alertify.success("Foto cambiada :)");
              /*  if(resp == 1){
                  alertify.success("Foto cambiada :)");
                 
                }else{
                  alertify.error("Error al cambiar foto.");
                } */
            },
            error: function (jqXHR, estado, error) {
                alert('error log');
                console.log("fallo");
                 
            }
  
         
        });
       
    }

//////////////////////////////////////Fin de cambiar foto
          

			 function ventanaCambiarContrasenia(){  
			 	//var url="../../Controller/ControladoraCurso.php";
			 	
              
		        if( $("#contraActual").val() ===  $("#contraseniaAntigua").val()  ){

	                           $("#contraActual").css('border','2px solid #E0E0E0'); 
		               
		               if( $("#cambiar").val() === $("#cambiarConfimado").val() ){
		                       var contra=$("#cambiarConfimado").val();
		                       var id=$("#contraseniaAntigua").attr("data-idUsuario");
		                       var tipoUsuario=$("#contraseniaAntigua").attr("data-tipoUsuario");

	                           $("#cambiar").css('border','2px solid #E0E0E0');
							   $("#cambiarConfimado").css('border','2px solid #E0E0E0');
	                    	   //alertify.success(":)");
	                   		 //  $('.formCambioContrasenia').fadeOut("slow") ;
	                   		   $("#FormularioContra")[0].reset();
	               //  alert("contra="+contra+" tipoUsuario="+$("#contraseniaAntigua").attr("data-tipoUsuario")+" id="+$("#contraseniaAntigua").attr("data-idUsuario"));
		   					  var parametros = {
	               					 "consulta" : "cambiarContrasenia",
	                				 "contrasenia" : contra,
	                				 "id" : id,
	                				 "tipoUsuario" :tipoUsuario};
		          
			     			 $.ajax({
			              		  data:  parametros,
			               		  url:   '../../Controller/ControladoraUsuarios.php',
			                	  type:  'post',
			           
			                success:  function (response) {
			           
			                	
			                		alertify.success("Contraseña cambiada ");
			                	

			                   
			                  	
			                  	$('.formCambioContrasenia').fadeOut("slow") ;
			                 
			                 },
			            	 error: function (xhr, thrownError) {
			            	 	//alert("error log");
			             	      }
			   
			                  });
		                }else{
		                		$("#cambiar").attr("value",""); //cambia a color rojo
		            			alertify.error("La nueva contraseña no coincide");
		            			$("#cambiar").css('border', '2px solid red');
		            			$("#cambiarConfimado").css('border', '2px solid red');
		            			
		            	}
		            
                          
	               }else{
	               			$("#contraActual").css('border', '2px solid red');
	               			alertify.error( "Contraseña no coincide");
	               }
	               
		        }

		
			 