$(document).ready(function () {
    /*alertify.set('confirm','transition', 'fade');
    //alertify.set('notifier','position', 'top-right');

   // alert("registrar profesor");
    */
    $('form').submit(function (e) {
        e.preventDefault();
        
        var formdata = document.getElementById("registrar_profesor");
        var inputFileImage = formdata.foto;
        var file = inputFileImage.files[0];
        var data = new FormData(formdata);
  
        
        data.append('archivo', file);
        var url = "../../Controller/ControladoraProfesor.php";        

        $.ajax({
            url: url,
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (resp) {      
                if(resp == 1){   
                    alertify.success("Profesor registrado con éxito");
                    limpiarForm();
                }else{
                    alertify.error("Error al registrar el profesor.<br>Intente de nuevo más tarde.");
                }
            },
            error: function (jqXHR, estado, error) {
                alert('error log');
                console.log("fallo");
            }
        });

    });
});


function limpiarForm(){
    $('#registrar_profesor').each (function(){
      this.reset();
    });
    $("#infoArchivo").text("");
    $('#prevImagen img').attr("src","../../imagenes/default_icon_user.png");
}
$("#fileImagen").change(function () {
    var file = this.files[0],  name = file.name, size = file.size, type = file.type;
    
    var imageType = new Array("image/png","image/jpeg", "image/gif");

    if(jQuery.inArray(type, imageType )  == -1) {
       alert("Archivo no valido");
    } else{
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






