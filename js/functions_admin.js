$(document).ready(function(){
    $(".loader").fadeIn("slow");
    loadEmployees();
    loadAppointments();
    btnLoadEmployees();

	function loadEmployees(){
        $.ajax({
            url:"../../Controller/UserController.php",
            type:'POST',
            data:{consulta:"getListEmployees"},
            success: function(responseText){
                $(".centrado").fadeOut("slow", function(){
                    $(".contenedorPrincipal").load("ListEmployees.php", {listEmployees:responseText});
                }); 
            }
        });
    }

    function loadAppointments(){
        //alert('loadAppointments');
        $(".loadAppointments").off('click');
        $(".loadAppointments").on('click',function(){
            //alert('click AppointmentController');
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
        });
    }

    function btnLoadEmployees(){
        $(".loadEmployees").off("click");
        $(".loadEmployees").on("click",function(){
           // alert("click load");
            loadEmployees();
        });
    }



});
