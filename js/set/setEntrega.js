/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var des_e = [];
var can_e = [];

function abrirEntrega() {
    $('#dialogEntregas').modal('show');
    $('#dialogAcciones').modal('hide');
}

function entrega() {


    cargar();
    //variables de entrada
    var strLog = $("#recibirVariable").val();
    var strPlaca = $("#txtPlaca").val();


    var dataString = {'usuario': strLog, 'placa': strPlaca};

    if (strLog === '') {

        swal("Mensaje!", "No has ingresado el usuario :)..");


    } else if (strPlaca === '') {

        swal("Mensaje!", "No has ingresado la placa :)..");
        $("#txtPlaca").focus();

    } else
    {
        $.ajax({
            type: 'POST',
            data: dataString,
            dataType: 'json',
            url: "http://refinalapp.fluxusmedia.co/php/set/setUdpRecEnt.php",
            success: function (jsonResp) {

                if (jsonResp.RESPONSE) {

                    alert(jsonResp.MESSAGE);
                    $("#dialogEntregas").modal('hide');


                    impresion_entrega();
                    resumen();

                    if (jsonResp.MESSAGE === "") {

                    } else if (jsonResp.MESSAGE === "EMPTY") {
                        swal("Mensaje!", "Error: no se pudo ejecutar la operacion de entrega!!");
                    }

                } else {
                    swal("Mensaje!", "Ocurrio Un error:" + jsonResp.MESSAGE);
                }


            },
            error: function (jsonResp) {
                swal("Mensaje!", "Ocurrio Un error");
            }
        });
    }



}
