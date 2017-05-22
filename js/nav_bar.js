$(document).ready(function(){
	/*Verifica si la aplicacion se abre desde un dispositivo movil*/
	clickIconoMenu();
    opcionesSubMenu();
	
	var contador = 0;
	function clickIconoMenu(){
		$(".btnMenuBar").on("click", function(e){
			e.preventDefault();
			esconderMostrarNav();
		});
	}

	function opcionesSubMenu(){

	    $(".btnSubMenu").on("click", function(e){
	        e.preventDefault();
	        if($(this).siblings("ul").is(":visible")){
	            $(this).siblings("ul",this).slideUp('fast');
	        }else{
	            $(this).siblings("ul", this).stop(true,true).slideDown('fast');
	        }
	    });

	    $(".btnOpcionSubMenu").on("click", function(){
	    	if($(".menu_bar").is(":visible")){
    			esconderMostrarNav();
    		}
    	});

	}

    function esconderMostrarNav(){
    	if (contador == 1) {
			$('nav').animate({
				left: '0'
			});
			contador = 0;
		} else {
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
		}
    }
});