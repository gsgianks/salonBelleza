$(document).ready(function(){

	/*botones opciones*/
	function btnClickOpciones(){
		$(".btnClickOpciones").off("click");
		
		$(".btnClickOpciones").on("click", function(){
			$(this).val();
			$(".btnClickOpCompletar").attr("data-focus", $(this).val());
		});
	}
	/*funciones botones completar*/
	function btnClickOpCompletar(){
		$(".btnClickOpCompletar").on("click", function(){
			
			$(this).val($(this).attr("data-focus"));
		});
	}
});


<button data-focus="" data-idOpcion="" class="btnClickOpCompletar" ><button>

<button class="btnClickOpciones"><button>