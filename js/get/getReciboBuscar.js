/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var id_rec_enc2;
var observacion2;
var id_usuario2;
var nombre_usuario2;
var estado2;
var fecha2;
var id_proveedor2;
var nom_prov2;


//$(function () {
//    $(".find_button").click(function () {

function uReciboEncDiv(csc) {

    
    var html;

    strLog = $("#recibirVariable").val();

    var dataString = {'csc': csc};


    $.ajax({
        type: 'POST',
        data: dataString,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getReciboEncPorCsc.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('No hay recibos para este usuario!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {





                        id_rec_enc2 = jsonResp.DATA[i]["id_rec_enc"];
                        observacion2 = jsonResp.DATA[i]["observacion"];
                        id_usuario2 = jsonResp.DATA[i]["id_usuario"];
                        nombre_usuario2 = jsonResp.DATA[i]["nombre_usuario"];
                        estado2 = jsonResp.DATA[i]["estado"];
                        fecha2 = jsonResp.DATA[i]["fecha"];
                        id_proveedor2 = jsonResp.DATA[i]["id_proveedor"];
                        nom_prov2 = jsonResp.DATA[i]["nom_prov"];

                        //dato.push(id_rec_enc);



                        var log = "";
                        if ((id_rec_enc === null || id_rec_enc === "") || (id_usuario === null || id_usuario === "")) {

                            alert("Error al traer recibo");

                        } else {




                            //articulos.add(id);






                        }
                    }
                    buscar_recibo(csc);
                    /*for(var a=0; a < dato.length; a++){
                     alert(dato[a]);
                     }*/
                    //$("#recibo").html(html);
                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    alert("Error: Recibo no existe!!");
                }
                 $("#dialogProgress").modal('hide');
            } else {
                alert("Ocurrio Un error:" + jsonResp.MESSAGE);
            }


        },
        error: function (jsonResp) {
            alert("Ocurrio Un error");
        }
    });


}



function buscar_recibo(csc) {
    //variables de entrada
    //var strIde = $("#txtIdentificacion").val();

    //variables locales
    var cantidad;
    var id;
    var descripcion;
    var html;
    //var strRec = $("#txtRecibo").val();

    var strRec = csc;

    var dataString = {'recibo': strRec};

    html += '<tr>';

    html += '<td>';
    html += 'Recibo: ' + '#' + id_rec_enc2;
    html += '</td>';
    html += '<td>';
    html += '';
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>';
    html += 'Nit: ' + id_proveedor2;
    html += '</td>';
    html += '<td>';
    html += '';
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>';
    html += nom_prov2.substr(1, 22);
    html += '</td>';
    html += '<td>';
    html += '';
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>';
    html += '--------------------------------------------';
    html += '</td>';
    html += '<td>';
    html += '----------';
    html += '</td>';
    html += '</tr>';


    $.ajax({
        type: 'POST',
        data: dataString,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getReciboGenerado.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    alert('Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {




                        //id = jsonResp.DATA[i]["id_art"];
                        descripcion = jsonResp.DATA[i]["descripcion"];
                        cantidad = jsonResp.DATA[i]["cantidad"];



                        var log = "";
                        if ((descripcion === null || descripcion === "") || (cantidad === null || cantidad === "")) {

                            alert("Error: articulos con errores o sin existencia ");

                        } else {

                            if (cantidad > 0) {

                                html += '<tr>';
                                html += '<td>';
                                html += '' + descripcion + '&nbsp&nbsp&nbsp&nbsp';
                                html += '</td>';
                                html += '<td style="text-align: right;">';
                                html += '' + cantidad + 'Kgr';
                                html += '</td>';
                                html += '</tr>';
                                //articulos.add(id);

                            }




                        }
                    }
                    $("#recibo").html(html);

                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    alert("Error: no se encontro datos de articulos!!");
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

//   });
//
//});

