$(document).ready(function () {
    //alertify.set('confirm','transition', 'fade');
    //alertify.set('notifier','position', 'top-right');

    var vec = [0,0,1];
    $(vec).each(function(index,val){
        delay(1000);
        alert('hola');
    })
    while(vec[0]>0 && vec[1]>0 && vec[2]>0){
        delay(100);
        alert('hola');
    }


    alert("login");
    
    $('form').submit(function (e) {

        e.preventDefault();
       
        var data = $(this).serializeArray();       // {consulta:'login',email:'tomela',array:['hola','todos','mae']};//$(this).serializeArray();
        var url = "Controller/controladora_login.php";

        //validar

        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (resp) {

            

                alert(resp);     

              
                
            },
            error: function (jqXHR, estado, error) {
                alert('error log');
                console.log("fallo");
            }
        });
    });
});


