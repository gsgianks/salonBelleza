$(document).ready(function(){
	$(".btnMenuDesplegable").on("click",function(){
		if ( $(this).next().is(":visible")){
			$(this).next().fadeOut("slow");
		}else{
			$(this).next().fadeIn("slow");
		}
	});

	$(".btnCerrar").on("click", function(){
		mostr_ocultr("#"+$(this).attr("data-idcerrar"));
	});
	
	function mostr_ocultr(id){
		
        if ( $(id).is(":visible")){
             $(id).fadeOut("slow");
           
        }else{
            $(id).fadeIn("slow");
        }
    }
    function limpiar_form(id){
    	$(id).each (function(){
  			this.reset();
		});
    }
});