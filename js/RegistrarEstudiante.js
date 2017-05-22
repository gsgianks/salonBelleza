$(document).ready(function () {
 
   
}); 
   
    function uploadAjax() {
        var inputFileImage = document.getElementById("fileImagen");
        var file = inputFileImage.files[0];
        var formdata = document.getElementById("registrar_Estudiante");
        var data = new FormData(formdata);
  
        
           data.append('archivo', file);
           data.append('consulta', 'registrar_Estudiante');
           var url = "../../Controller/ControladoraEstudiante.php";     
       
        $.ajax({
            url: url,
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
             success: function (resp) {      
                if(resp == 1){
                  alertify.success("Estudiante registrado con exito.");
                  limpiarForm();
                }else{
                  alertify.error("Error, no se pudo completar el registro.");
                } 
            },
            error: function (jqXHR, estado, error) {
                alert('error log');
                console.log("fallo");
                 
            }
  

        });

    }
     
function validar_letras(texto, id){
    
    
   $(document).ready(function (){
          $('#'+id).keyup(function (){
            this.value = (this.value + '').replace(/[^a-zA-Z]/g, '');
          });
        });
}

function limpiarForm(){
  $('#registrar_Estudiante').each (function(){
      this.reset();
  });
  $("#infoArchivo").text("");
  $('#prevImagen img').attr("src","../../imagenes/default_icon_user.png");;
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




