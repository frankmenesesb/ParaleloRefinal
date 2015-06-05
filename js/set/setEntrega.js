/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function abrirEntrega(){
$('#dialogEntregas').modal('show');
$('#dialogAcciones').modal('hide');
}

function entrega(){
    

        cargar();
        //variables de entrada
        var strLog = $("#recibirVariable").val();
        var strPlaca = $("#txtPlaca").val();
        
       
        //variables locales

        

        var dataString = {'usuario': strLog,'placa': strPlaca};

        if (strLog === '') {

            alert("No has ingresado el usuario :)..");
            

        } else if (strPlaca === '') {

            alert("No has ingresado la placa :)..");
            $("#txtPlaca").focus();

        } else
        {
            $.ajax({
                type: 'POST',
                data: dataString,
                dataType: 'json',
                url: "http://refinal.frienderco.com/php/set/setUdpRecEnt.php",
                success: function (jsonResp) {

                    if (jsonResp.RESPONSE) {

                    alert(jsonResp.MESSAGE);
                            $("#dialogEntregas").modal('hide');
                        
                        if (jsonResp.MESSAGE === "") {


                            
                            
                            //$("#txtHint").html(encabezado+html+final);

                        } else if (jsonResp.MESSAGE === "EMPTY") {
                            alert("Error: no se pudo ejecutar la operacion de entrega!!");
                        }
                    } else {
                        alert("Ocurrio Un error:" + jsonResp.MESSAGE);
                    }


                },
                error: function (jsonResp) {
                    alert("Ocurrio Un error");
                }
            });
        }

   

}