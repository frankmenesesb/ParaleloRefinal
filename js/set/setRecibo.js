var id_rec_enc;

$(function () {


    $(".submit_button").click(function () {


        cargar();

        var strLog = $("#recibirVariable").val();
        var strProveedor = $("#txtProveedor").val();
        var y;
        var can_totales = 0;



        //var strGen = $("#radioGenero").val();
        //var strGen = $('input:radio[name=radioGenero]:checked').val();


        var dataString = {'usuario': strLog, 'proveedor': strProveedor};


        for (x = 0; x < codArt.length; x++) {
            if ($("#" + codArt[x]).val() !== null) {

                can_totales += Number($("#" + codArt[x]).val());
            }
        }

        if (strLog === '') {

            alert("No has iniciado sesion correctamente :)..");


        } else if (can_totales === '' || can_totales === null || can_totales === 0 || can_totales === '0') {

            alert("No puedes guardar un recibo con todas las cantidades en 0 (cero). -->" + can_totales);


        } else
        {


//esta es una prueba
            $.ajax({
                type: "POST",
                url: "http://refinal.frienderco.com/php/set/setReciboEnc.php",
                //url: "../php/set/setReciboEnc.php",
                data: dataString,
                dataType: 'json',
                cache: true,
                success: function (jsonResp, html) {

                    cargar();
                    if (jsonResp.RESPONSE) {

                        for (x = 0; x < codArt.length; x++) {

                            if ($("#" + codArt[x]).val() !== null) {

                                detallado(codArt[x], $("#" + codArt[x]).val());
                                y = x;



                            }

//                            if(x===codArt.length){
//                                $("#dialogProgress").modal('hide');
//                            }
                        }




                        alert(jsonResp.MESSAGE);
                        if (y === canArt.length) {

                            var html = "Se guardo Correctamente!";



                            $("#txtRespuesta").html(html);
                            $("#txtRespuesta").focus();

                        }



                        ultReciboEnc();
                        if (jsonResp.MESSAGE === "") {

                            alert('XD');

                        } else if (jsonResp.MESSAGE === "EMPTY") {
                            alert("No se encontraron datos");
                        }
                    } else {
                        alert("Ocurrio Un error:" + jsonResp.MESSAGE);
                    }

                }
                ,
                error: function (jsonResp) {
                    alert("Ocurrio Un error Diferente");
                }
            });
        }
        return false;
    });
});



function mensaje() {
    var x;
    if (confirm("¿Esta correcta la informacion?") === true) {
        x = "You pressed OK!";
    } else {
        x = "You pressed Cancel!";
    }
    document.getElementById("demo").innerHTML = x;
}


function ultReciboEnc() {
    cargar();

    var html;

    strLog = $("#recibirVariable").val();

    var dataString = {'usuario': strLog};
    cargar();

    $.ajax({
        type: 'POST',
        data: dataString,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getUReciboEnc.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('No hay recibos para este usuario!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {





                        id_rec_enc = jsonResp.DATA[i]["id_rec_enc"];
                        var log = "";
                        if ((id_rec_enc === null || id_rec_enc === "")) {

                            alert("Error al traer recibo");

                        } else {


                        }
                    }
                    $("#dialogProgress").modal('hide');
                    var l = confirm("Desea revisar el recibo?");
                    if (l === true) {

                        location.href = '../frm/frmReciboBuscar.html?var=' + strLog + '$' + id_rec_enc + '*';
                    } else {
                        var r = confirm("Desea imprimir el recibo?");
                        if (r === true) {
                            uReciboEnc();
                            location.href = '../frm/frmInicio.html?var=' + strLog + '$';
                        } else {
                            location.href = '../frm/frmInicio.html?var=' + strLog + '$';
                        }
                    }
                    $("#dialogProgress").modal('hide');
                } else if (jsonResp.MESSAGE === "EMPTY") {
                    alert("Error: Recibo no existe!!");
                    $("#dialogProgress").modal('hide');
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