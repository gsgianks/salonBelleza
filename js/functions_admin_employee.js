$(document).ready(function(){


	addEmployee();
	exitModal();
	deleteEmployee();
	editEmployee();
	loadAppointments();

	$("form").submit(function(e){
    	e.preventDefault();
    	//alert('click form');
    	var data = $(this).serializeArray();
    	var type = $(this).find("input[name=consulta]").val();
    	var id = $(this).find("input[name=id]").val();
    	var temp =  true;
    	if($(this).find("input[name=password]").val() === $(this).find("input[name=confirm_password]").val()){

    	}else{
    		alertify.error("La contraseña no coincide");
    		temp = false;
    	}

    	if(temp){
    		$.ajax({
			    url:"../../Controller/UserController.php",
			    type:'POST',
			    data:data,
			    success: function(responseText){
	      			if(type === 'add_employee'){
	      				addEmployeeGUI(responseText,data);
	      			}else if(type === 'update_employee'){
	      				if(responseText > 0){
	      					updateEmployeeGUI(id,data);
	      				}else{      					
	      					alertify.error("No se actualizo el empleado");
	      				}
	      			}

	      		}
			});
    	}
        
    });


    function addEmployee(){
    	$(".btnAddEmployee").off("click");
    	$(".btnAddEmployee").on("click",function(){
    		$("#formEditEmployee").fadeIn("slow");
    	});
    }

    function exitModal(){
    	$(".exitModal").off("click");
    	$(".exitModal").on("click",function(){
    		clearForm("formEditEmployee","formPregunta");
    	});
    }

    function addEmployeeGUI(id,data){

    	var email = "";
    	var pass = "";

    	$(data).each(function(i, field){
    		if(i === 2){
    			email = field.value;
    		}else if(i === 3){
    			pass = field.value;
    		}
    	});

    	var html = "<li class='card employee' data-id='"+id+"'>";
        html+= "<div>";
        html+= "<div class='contenido_card'>";
        html+= "<h4><a href='#' data-idEvaluacion='"+id+"' data-nomEvaluacion='"+email+"' data-tiempo='"+pass+"' </a></h4>";
        html+= "<label class='email'>Email:"+email+"</label><br>";
        html+= "<label class='password'>Password:"+pass+"</label>";
        html+= "</div>";
        html+= "<div class='barra_opciones'>";
        html+= "<span class='icon-pencil btnEditEmployee' data-id='"+id+"' data-email='"+email+"' data-password='"+pass+"'></span>";
        html+= "<span class='icon-description loadAppointments' data-id='"+id+"'></span>";
        html+= "<span class='icon-bin btnDeleteEmployee' data-id='"+id+"'></span>";
        html+= "</div>";
        html+= "</div>";
        html+= "</li>";

        $(".contenedor_card_evaluacion").append(html);

       	alertify.success('Empleado agregado');
       	clearForm("formEditEmployee","formPregunta");
       	deleteEmployee();


    }

    function clearForm(idForm,classForm){
    	$("#"+idForm).fadeOut("slow",function(){
	        $('.'+classForm).each(function(){
	          this.reset();
	        });
    	});
    }

    function deleteEmployee(){
    	$(".btnDeleteEmployee").off("click");
    	$(".btnDeleteEmployee").on("click",function(){
    		var idEmployee = $(this).attr('data-id');
    		 alertify.confirm("<p style='font-size: 17px;font-weight: bold;'>Notificación Salón de Belleza </p>",
            "¿Desea eliminar el empleado?",
	        function(){
	            var data = {consulta: 'delete_employee',id : idEmployee};
    			ajax(data);
	        },function(){
	            alertify.error('Cancel');
	        });  
    		
    	});
    }

    function deleteEmployeeGUI(id){
    	$(".employee").each(function(i){
    		if($(this).attr('data-id') === id){
    			 $(this).fadeOut(700, function() { $(this).remove();alertify.success("Empleado eliminado"); });
    		}
    	});
    }

    function editEmployee(){
    	$(".btnEditEmployee").off("click");
    	$(".btnEditEmployee").on("click",function(){
    		$("#formEditEmployee").fadeIn("slow");
    		$("#formEditEmployee").find("input[name=id]").val($(this).attr("data-id"));
    		$("#formEditEmployee").find("input[name=email]").val($(this).attr("data-email"));
    		$("#formEditEmployee").find("input[name=password]").val($(this).attr("data-password"));
    		$("#formEditEmployee").find("input[name=confirm_password]").val($(this).attr("data-password"));
    		$("#formEditEmployee").find("h4").text("Editar Empleado");
    		$("#formEditEmployee").find("input[name=consulta]").val("update_employee");
    	});
    }

    function updateEmployeeGUI(id,data){
    	$(".employee").each(function(i,field){
    		var contenedor = $(this);
    		//alert($(this).attr('data-id')+"  ===  "+id);
    		if($(this).attr('data-id') === id){
    			 $(data).each(function(j,field2){
    			 	if(j === 2){
    			 		contenedor.find(".email").text(field2.value);
    			 		contenedor.find(".btnEditEmployee").attr("data-email",field2.value);
    			 	}else if(j === 3){
    			 		contenedor.find(".password").text(field2.value);
    			 		contenedor.find(".btnEditEmployee").attr("data-password",field2.value);
    			 	}
    			 });
    		}
    	});
    	clearForm("formEditEmployee","formPregunta");
    	$("#formEditEmployee").find("input[name=consulta]").val("add_employee");
    	$("#formEditEmployee").find("h4").text("Agregar Empleado");
    }


    function ajax(data){
    	 $.ajax({
		    url:"../../Controller/UserController.php",
		    type:'POST',
		    data:data,
		    success: function(responseText){
      			//alert("responseText employee");
      			if(responseText > 0){
      				if(data.consulta === 'delete_employee'){
	      				deleteEmployeeGUI(data.id);
	      			}

      			}else{
      				alertify.error('Algo salió mal ):');
      			}
      			

      	}
		});
    }

    function loadAppointments(){
        //alert('loadAppointments');
        $(".loadAppoint").off('click');
        $(".loadAppoint").on('click',function(){
            //alert('click AppointmentController');
            var idEmployee = $(this).attr("data-id");
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

});