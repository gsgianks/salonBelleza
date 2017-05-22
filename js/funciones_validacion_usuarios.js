$(document).ready(function(){

    $("form").submit(function(e){
    	e.preventDefault();
        if(isEmail(this.correo.value)){
        	verificarUsuario($(this).serializeArray());
        }else{
            $("#msgLog").text("Por favor, asegurese de haber escrito correcto su correo.");
            $("#msgLog").fadeIn("slow");
        }
    });

    function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}

	function verificarUsuario(datos){
		$.ajax({
		    url:"Controller/UserController.php",
		    type:'POST',
		    data:datos,
		    success: function(responseText){
      			var data = JSON.parse(responseText);
            if(data[0].idUsuario == 0){
              $("#msgLog").text("*Usuario no registrado");
              $("#msgLog").fadeIn("slow");
            }else{
              redireccionarUsuario(data[0].role);
            }
      	}
		});
	}

  function redireccionarUsuario(tipoUsuario){
    switch(tipoUsuario) {
      case 1:
        location.href="GUI/Admin/AdminHomePage.php";
        break;
      case 0:
        location.href="GUI/Employee/EmployeeHomePage";
        break;
    } 
  }

});