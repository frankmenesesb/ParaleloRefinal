/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var articulos = new Array();

//$(function () {
//$(".find_button").click(function () {

function buscar_art() {
    //variables de entrada
    cargar();
    var strProv = $("#txtProveedor").val();
    var strPlaza = $("#txtPlazaProveedor").val();
    //variables locales

    var id;
    var descripcion;
    var imagen;
    var html;


    var dataString = {'idproveedor': strProv};

    if (strPlaza === 'N') {
        $("#recibo").html('');
    }else if (strProv === 'N') {
        $("#recibo").html('');
    } else {

        $.ajax({
            type: 'POST',
            data: dataString,
            dataType: 'json',
            //url: "http://refinalapp.fluxusmedia.co/php/get/getArticulos.php",
            url: "http://refinalapp.fluxusmedia.co/php/get/getArticulosProveedor.php",
            //url: "../php/get/getArticulos.php",
            success: function (jsonResp) {

                if (jsonResp.RESPONSE) {


                    if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                        swal('Mensaje!', 'Error no hay articulos!!');
                    }
                    if (jsonResp.MESSAGE === "") {

                        for (var i = 0; i < jsonResp.DATA.length; i++) {


                            id = jsonResp.DATA[i]["id_art"];
                            descripcion = jsonResp.DATA[i]["descripcion"];
                            imagen = jsonResp.DATA[i]["imagen"];


                            var log = "";
                            if ((descripcion === null || descripcion === "") || (id === null || id === "")) {

                                swal("Mensaje!", "Error: articulos con errores o sin existencia ");

                            } else {

                                html += '<tr style="width: 100%;">';
                                html += '<td style="width: 3%;">';
                                html += '<img src="../images/' + imagen + '" alt="" style="width: 32px; height: 32px;">';
                                html += '</td>';
                                html += '<td style="width: 3%; font-size: 9px;">';
                                html += '' + descripcion + '';
                                html += '</td>';
                                html += '<td style="width: 85%;">';
                                html += "<input style=\"width: 100%;\" size=\"70\" type=\"number\" class=\"form-control\" id=\"" + id + "\" placeholder=\"0 Kg.\" onclick=\"ir('" + id + "');\"/>";
                                html += '</td>';
                                html += '<td style="width: 3%;">';
                                html += '<label style="font-size:10px;">Kg.</label>';
                                html += '</td>';
                                html += '</tr>';

                                codArt.push(id);

                                //articulos.add(id);

                            }
                        }
                        $("#recibo").html(html);



                    } else if (jsonResp.MESSAGE === "EMPTY") {
                        swal("Mensaje!", "El proveedor no tiene Articulos asignados por favor informar en oficina.");
                        $("#recibo").html('');
                    }
                    
                    $("#dialogProgress").modal('hide');
                } else {
                    $("#dialogProgress").modal('hide');
                    swal("Mensaje!", "Ocurrio Un error:" + jsonResp.MESSAGE);
                    
                }


            },
            error: function (jsonResp) {
                swal("Mensaje!", "Ocurrio Un error");
            }
        });
    }

    // });

//});

}

