

function detallado(articulo, cantidad) {
    
    var strArt = articulo;
    var strCan = cantidad;
    var dataString = {'articulo': strArt, 'cantidad': strCan};

//esta es una prueba
    $.ajax({
        type: "POST",
        url: "http://refinal.frienderco.com/php/set/setReciboDet.php",
        //url: "../php/set/setReciboDet.php",
        data: dataString,
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {

                var html = "Se guardo Correctamente el datallado!";


                if (jsonResp.MESSAGE === "") {

                    swal('Mensaje!', 'XD');

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    swal("Mensaje!", "No se encontraron datos");
                }
            } else {
                swal("Mensaje!", "Ocurrio Un error:" + jsonResp.MESSAGE);
            }

        }
        ,
        error: function (jsonResp) {
            swal("Mensaje!", "Ocurrio Un error Diferente");
        }
    });

    return false;
}
;