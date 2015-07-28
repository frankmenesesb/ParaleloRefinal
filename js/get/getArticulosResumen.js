/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
conecctionStatus();
var articulos = new Array();
var des_e = [];
var can_e = [];
var nombre_de_usuario;
var fecha_entrega;

function impresion_entrega() {

    //swal('Mensaje!', 'entro impresion entrega');
    var placa = $("#txtPlaca").val();
    var recibiendoVariable = location.search.slice(location.search.indexOf("=") + 1, location.search.indexOf("$"));
    $("#recibirVariable").val(recibiendoVariable);
    var strLog = $("#recibirVariable").val();
    formatoEntrega(fecha_entrega, strLog, nombre_de_usuario, '', placa);

}

$(function () {

    resumen();
    // });

});


function resumen() {
    des_e = [];
    can_e = [];
    cargar();
    //swal('Mensaje!', 'entre');
    $("#recibo").html('<tr><td>No tienes nada acumulado</td></tr>');
    //$(".find_button").click(function () {
    var recibiendoVariable = location.search.slice(location.search.indexOf("=") + 1, location.search.indexOf("$"));



//document.getElementById("recibirVariable").innerHTML = recibiendoVariable;

    titleHeader = $(".panel-heading").find("h4").text();
    $("#recibirVariable").val(recibiendoVariable);

    //variables de entrada
    var strLog = $("#recibirVariable").val();

    //variables locales

    var can;
    var descripcion;
    var imagen;
    var html;

    var dataString = {'usuario': strLog};


    $.ajax({
        type: 'POST',
        data: dataString,
        dataType: 'json',
        url: "http://refinal.frienderco.com/php/get/getArticulosResumen.php",
        //url: "../php/get/getArticulos.php",
        success: function (jsonResp) {

            if (jsonResp.RESPONSE) {


                if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                    swal('Mensaje!', 'Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {




                        can = jsonResp.DATA[i]["can_res"];
                        descripcion = jsonResp.DATA[i]["descripcion"];
                        imagen = jsonResp.DATA[i]["imagen"];
                        nombre_de_usuario = jsonResp.DATA[i]["nom_usuario"];
                        fecha_entrega = jsonResp.DATA[i]["fecha"];





                        var log = "";
                        if ((descripcion === null || descripcion === "") || (can === null || can === "")) {

                            //swal("Mensaje!", "Error: articulos con errores o sin existencia ");

                        } else {



                            html += '<tr>';
                            html += '<td>';
                            html += '<img src="../images/' + imagen + '" alt="">';
                            html += '</td>';
                            html += '<td>';
                            html += '' + descripcion + ''
                            html += '</td>';
                            html += '<td>';
                            html += '' + can;
                            html += '</td>';
                            html += '<td>';
                            html += '<label>Kg.</label>';
                            html += '</td>';
                            html += '</tr>';
                            //articulos.add(id);

                            des_e.push(descripcion);
                            can_e.push(can);






                        }
                    }
                    $("#recibo").html(html);
                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    //swal("Mensaje!", "Error: no se encontro datos de articulos!!");
                }
            } else {
                //swal("Mensaje!", "Ocurrio Un error:" + jsonResp.MESSAGE);
            }
            $("#dialogProgress").modal('hide');

        },
        error: function (jsonResp) {
            swal("Mensaje!", "Ocurrio Un error");
        }
    });

}


function formatoEntrega(fechaP, usu, nom_usuario, nom_plaza, placa) {
    var cod_usu = "Cod. Usuario: " + usu;
    var cantidad_usu = cod_usu.length;
    var fecha = "";
    var cantidad_fecha = "";
    var salto="                                                ";
    var t1 = "";
    var t2 = "";
    var cantidad = "";
    var emp_ini = " ";
    var emp_fin = " ";
    var empresa = "REFINAL";
    var encabezado = "";
    var cantidad_emp = "";
    var inicio = " ";
    var fin = " ";
    var espacio = "";
    var mensaje = "";
    var fin_mensaje = "";
    var n_placa = "Placa Entrega: " + placa;
    var cantidad_placa;





    var espacio_final;
    var nombre_u = "" + nom_usuario;
    var cantidad_nom_u;
    var nombre_p = "" + nom_plaza;
    var cantidad_nom_p;

    fecha = "Fecha: " + fechaP;
    cantidad_emp = empresa.length;
    cantidad_fecha = fecha.length;
    cantidad_placa = n_placa.length;



    cantidad_nom_u = nombre_u.length;
    cantidad_nom_p = nombre_p.length;

    while (cantidad_placa < 32) {

        n_placa = n_placa + " ";

        cantidad_placa = parseInt(cantidad_placa) + 1;
    }

    while (cantidad_nom_p < 32) {

        nombre_p = nombre_p + " ";

        cantidad_nom_p = parseInt(cantidad_nom_p) + 1;
    }

    while (cantidad_nom_u < 32) {

        nombre_u = nombre_u + " ";

        cantidad_nom_u = parseInt(cantidad_nom_u) + 1;
    }


    while (cantidad_usu < 32) {

        cod_usu = cod_usu + " ";

        cantidad_usu = parseInt(cantidad_usu) + 1;
    }


    while (cantidad_fecha < 32) {

        fecha = fecha + " ";

        cantidad_fecha = parseInt(cantidad_fecha) + 1;
    }





    while (cantidad_emp < 18) {

        emp_ini = emp_ini + " ";

        cantidad_emp = parseInt(cantidad_emp) + 1;
    }

    encabezado = emp_ini + empresa + emp_ini + " " + salto + salto + fecha + salto + salto + n_placa + salto + cod_usu + nombre_u + nombre_p + salto + salto;



    for (i = 0; i < des_e.length; i++) {
        t1 = des_e[i];
        t1 = t1.toString();
        t2 = can_e[i];
        t2 = t2.toString();
        cantidad = t1.length + t2.length;

        while (cantidad < 32 - (inicio.length + fin.length)) {

            espacio = espacio + " ";
            cantidad = parseInt(cantidad) + 1;
        }

        espacio_final = espacio;

        mensaje = inicio + t1 + espacio + t2 + fin;

        fin_mensaje = fin_mensaje + mensaje;
        espacio = "";
        cantidad = "";

    }

    fin_mensaje = encabezado + fin_mensaje + espacio_final + espacio_final + espacio_final + espacio_final;

    //alert(fin_mensaje);
    imprimir_entrega(fin_mensaje, usu);



}


function imprimir_entrega(str, usu) {
    
    //var cadena ="! 0 200 200 200 1 ENCODING UTF-8 TEXT 0 20 30 r/n/ PRINTr/n/";
    //var ca="^XA^FO10,10^AFN,26,13^FDHello, World!^FS^XZ";
    //str=str+cadena;
    
    
    cordova.plugins.zbtprinter.print(str,
            function (success) {
                $("#dialogProgress").modal('hide');
                location.href = '../frm/frmInicio.html?var=' + usu + '$';
            }, function (fail) {
                
                $("#dialogProgress").modal('hide');
                if(fail!==null || fail!==""){
                    swal("Mensaje!", "Error conexion por favor reinicie la impresora, y reinicie el bluethooth de su celular");
                }
        //alert(fail);
    });

}