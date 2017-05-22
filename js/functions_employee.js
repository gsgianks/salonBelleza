$(document).ready(function(){
	$(".loader").fadeIn("slow");
	loadAppointments();
 function loadAppointments(){

    idEmployee = 0;
    $.ajax({
            url:"../../Controller/AppointmentController.php",
            type:'POST',
            data:{consulta:"getListAppointments",id:idEmployee},
            success: function(responseText){
                $(".centrado").fadeOut("slow", function(){
                    $(".contenedorPrincipal").load("ListAppointments.php", {listAppointments:responseText,id:idEmployee});
                }); 
            }
        });
    }

});