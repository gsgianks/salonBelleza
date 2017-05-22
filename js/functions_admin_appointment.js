$(document).ready(function(){


	addAppointment();
	exitModal();
	deleteAppointment();
	editAppointment();

	$("form").submit(function(e){
    	e.preventDefault();
    	//alert('click form');
    	var data = $(this).serializeArray();
    	var type = $(this).find("input[name=consulta]").val();
    	var id = $(this).find("input[name=id]").val();

    		$.ajax({
			    url:"../../Controller/AppointmentController.php",
			    type:'POST',
			    data:data,
			    success: function(responseText){
	      			if(type === 'add_appointment'){
	      				addAppointmentGUI(responseText,data);
	      			}else if(type === 'update_appointment'){
	      				if(responseText > 0){
	      					updateAppointmentGUI(id,data);
	      				}else{      					
	      					alertify.error("No se actualizo el empleado");
	      				}
	      			}

	      		}
			});
        
    });


    function addAppointment(){
    	$(".btnAddAppointment").off("click");
    	$(".btnAddAppointment").on("click",function(){
    		//alert("click appointment");
    		$("#formAppointment").fadeIn("slow");
    	});
    }

    function exitModal(){
    	$(".exitModal").off("click");
    	$(".exitModal").on("click",function(){
    		clearForm("formAppointment","formPregunta");
    	});
    }

    function addAppointmentGUI(id,data){

    	var idTemp = 0;
    	var idEmployee = $("#contenedorListado").attr("data-idEmployee");
    	var created_at = "";
    	var date = "";

    	$(data).each(function(i, field){
    		if(i === 2){
    			idTemp = field.value;
    		}else if(i === 3 && idTemp === idEmployee){
    			created_at = field.value;
    		}else if(i === 4 && idTemp === idEmployee){
    			date = field.value;
    			var html = "<li class='card appointment' data-id='"+id+"'>";
		        html+= "<div>";
		        html+= "<div class='contenido_card'>";
		        html+= "<label class='create_at'>Creado en:"+created_at+"</label><br>";
		        html+= "<label class='date'>Fecha:"+date+"</label>";
		        html+= "</div>";
		        html+= "<div class='barra_opciones'>";
		        html+= "<span class='icon-pencil btnEditAppointment' data-id='"+id+"' data-create_at='"+created_at+"' data-date='"+date+"'></span>";
		        html+= "<span class='icon-bin btnDeleteAppointment' data-id='"+id+"'></span>";
		        html+= "</div>";
		        html+= "</div>";
		        html+= "</li>";

		        $(".contenedor_card_evaluacion").append(html);

		       	alertify.success('Cita agregada');
		       	clearForm("formAppointment","formPregunta");
		       	deleteAppointment();
    		}
    	});
    	if(idTemp != idEmployee){
    		alertify.success('Cita agregada a usuario');
			clearForm("formAppointment","formPregunta");
    	}
    	
    }

    function clearForm(idForm,classForm){
    	$("#"+idForm).fadeOut("slow",function(){
	        $('.'+classForm).each(function(){
	          this.reset();
	        });
    	});
    }

    function deleteAppointment(){
    	$(".btnDeleteAppointment").off("click");
    	$(".btnDeleteAppointment").on("click",function(){
    		var idEmployee = $(this).attr('data-id');
    		 alertify.confirm("<p style='font-size: 17px;font-weight: bold;'>Notificación Salón de Belleza </p>",
            "¿Desea eliminar la cita?",
	        function(){
	            var data = {consulta: 'delete_appointment',id : idEmployee};
    			ajax(data);
	        },function(){
	            alertify.error('Cancel');
	        });  
    		
    	});
    }

    function deleteAppointmentGUI(id){
    	$(".appointment").each(function(i){
    		if($(this).attr('data-id') === id){
    			 $(this).fadeOut(700, function() { $(this).remove();alertify.success("Cita eliminada"); });
    		}
    	});
    }

    function editAppointment(){
    	$(".btnEditAppointment").off("click");
    	$(".btnEditAppointment").on("click",function(){
    		$("#formAppointment").fadeIn("slow");
    		$("#formAppointment").find("input[name=id]").val($(this).attr("data-id"));
    		$("#formAppointment").find("input[name=user_id]").val($(this).attr("data-idEmployee"));
    		$("#formAppointment").find("input[name=create_at]").val($(this).attr("data-create_at"));
    		$("#formAppointment").find("input[name=date]").val($(this).attr("data-date"));
    		$("#formAppointment").find("h4").text("Editar Cita");
    		$("#formAppointment").find("input[name=consulta]").val("update_appointment");
    	});
    }

    function updateAppointmentGUI(id,data){
    	$(".appointment").each(function(i,field){
    		var contenedor = $(this);
    		//alert($(this).attr('data-id')+"  ===  "+id);
    		if($(this).attr('data-id') === id){
    			 $(data).each(function(j,field2){
    			 	if(j === 3){
    			 		contenedor.find(".create_at").text(field2.value);
    			 		contenedor.find(".btnEditAppointment").attr("data-create_at",field2.value);
    			 	}else if(j === 4){
    			 		contenedor.find(".date").text(field2.value);
    			 		contenedor.find(".btnEditAppointment").attr("data-date",field2.value);
    			 	}
    			 });
    		}
    	});
    	clearForm("formAppointment","formPregunta");
    	alertify.success("Cita Actualizada");
    }


    function ajax(data){
    	 $.ajax({
		    url:"../../Controller/AppointmentController.php",
		    type:'POST',
		    data:data,
		    success: function(responseText){
      			//alert("responseText employee");
      			if(responseText > 0){
	      				deleteAppointmentGUI(data.id);

      			}else{
      				alertify.error('Algo salió mal ):');
      			}
      			

      	}
		});
    }

});