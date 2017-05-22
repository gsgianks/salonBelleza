



$(document).ready(function () {
 
   
}); 

  function mandarVideo() {
        var inputFileImage = document.getElementById("filevideo");
        var file = inputFileImage.files[0];
      //  var formdata = document.getElementById("Pruebavideo");
       // var data = new FormData(formdata);
        
      
         //  data.append('archivo', file);
        
           
          // var url = "../../Controller/ControladoraVideo.php";     
       alert("manda");
      

        $.ajax({
            url: url,
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,

             success: function (resp) {      
                alert(resp); 
               
                
              
            },
            error: function (jqXHR, estado, error) {
                alert('error log');
                console.log("fallo");
                 
            }
  

        });  

    }


$("#filevideo").change(function () {
    var file = this.files[0],  name = file.name, size = file.size, type = file.type;
   
     var imageType = new Array("video/mp4","video/wave");

    if(jQuery.inArray(type, imageType )  == -1) {
       alert("Archivo no valido");
    }else{ 
      $("#infoArchivo").text(name);
      previsualizarImagen(this);
    }
});