/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var articulos = new Array();



$(function () {
    cargar();
    var plaza = '%';
    var dataParams = {'idPlaza': plaza};
    var options = "";
    options += '<option value="N">Seleccione Plaza</option>';

    $.ajax({
        type: 'POST',
        data: dataParams,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getPlazas.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {
                        var id = jsonResp.DATA[i]["id_plaza"];
                        var descripcion = jsonResp.DATA[i]["nombre"];

                        options += '<option value="' + id + '">' + descripcion + '</option>';
                    }

                    $('#txtPlazaProveedor').html(options);


                } else if (jsonResp.MESSAGE === "EMPTY") {
                    alert("Error: no se encontro datos de articulos!!");
                }
                $("#dialogProgress").modal('hide');
            } else {
                alert("Ocurrio Un error:" + jsonResp.MESSAGE);
                $("#dialogProgress").modal('hide');
            }


        },
        error: function (jsonResp) {
            alert("Ocurrio Un error");
        }
    });
});

function buscar_proveedor() {
    
    
    cargar();

    var id;
    var descripcion;
    var html;
    var strPlaza = $("#txtPlazaProveedor").val();
    var dataString = {'plaza': strPlaza};



    if (strPlaza === 'N') {
        html += '<option value="N">Seleccione Proveedor</option>';
        $("#txtProveedor").html(html);
         $("#recibo").html('');
    } else {

        html += '<option value="N">Seleccione Proveedor</option>';

        $.ajax({
            type: 'POST',
            data: dataString,
            dataType: 'json',
            url: "http://refinal.frienderco.com/php/get/getProveedorXPlaza.php",
            //url: "../php/get/getArticulos.php",
            success: function (jsonResp) {

                if (jsonResp.RESPONSE) {


                    if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                        alert('Error no hay articulos!!');
                    }
                    if (jsonResp.MESSAGE === "") {

                        for (var i = 0; i < jsonResp.DATA.length; i++) {

                            id = jsonResp.DATA[i]["id_proveedor"];
                            descripcion = jsonResp.DATA[i]["nombre"];

                            var log = "";
                            if ((descripcion === null || descripcion === "") || (id === null || id === "")) {

                                alert("Error: articulos con errores o sin existencia ");

                            } else {



                                html += '<option value="' + id + '">' + descripcion + '</option>';

                                //articulos.add(id);






                            }
                        }
                        $("#txtProveedor").html(html);
                        buscar_art();
                        //$("#txtHint").html(encabezado+html+final);

                    } else if (jsonResp.MESSAGE === "EMPTY") {
                        alert("Error: no se encontro proveedores en esta plaza!!");
                    }
                    
                    $("#dialogProgress").modal('hide');
                } else {
                    alert("Ocurrio Un error:" + jsonResp.MESSAGE);
                    $("#dialogProgress").modal('hide');
                }


            },
            error: function (jsonResp) {
                alert("Ocurrio Un error");
            }
        });

    }
    // });

}

