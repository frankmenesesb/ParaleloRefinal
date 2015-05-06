/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//arraylists para llenarlos e imprimirlos en el recibo
var des = [];
var can = [];

//variables locales las cuales tendran el encabezado

var id_rec_enc;
var observacion;
var id_usuario;
var nombre_usuario;
var estado;
var fecha;
var id_proveedor;
var nom_prov;
var strLog;
function uReciboEnc() {


    var html;

    strLog = $("#recibirVariable").val();

    var dataString = {'usuario': strLog};


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
                        observacion = jsonResp.DATA[i]["observacion"];
                        id_usuario = jsonResp.DATA[i]["id_usuario"];
                        nombre_usuario = jsonResp.DATA[i]["nombre_usuario"];
                        estado = jsonResp.DATA[i]["estado"];
                        fecha = jsonResp.DATA[i]["fecha"];
                        id_proveedor = jsonResp.DATA[i]["id_proveedor"];
                        nom_prov = jsonResp.DATA[i]["nom_prov"];

                        //dato.push(id_rec_enc);



                        var log = "";
                        if ((id_rec_enc === null || id_rec_enc === "") || (id_usuario === null || id_usuario === "")) {

                            alert("Error al traer recibo");

                        } else {




                            //articulos.add(id);






                        }
                    }
                    uReciboDet(id_rec_enc);
                    /*for(var a=0; a < dato.length; a++){
                     alert(dato[a]);
                     }*/
                    //$("#recibo").html(html);
                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    alert("Error: Recibo no existe!!");
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

function uReciboDet(strRec) {


    //variables de entrada
    //var strIde = $("#txtIdentificacion").val();

    //variables locales
    var cantidad;
    var id;
    var descripcion;
    var html;



    var dataString = {'recibo': strRec};


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

                            if (parseInt(cantidad) === 0) {
                                des.push(descripcion);
                                can.push(cantidad);
                            }








                        }
                    }


                    formato(fecha, nom_prov, id_proveedor);


                    //$("#recibo").html(html);
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


function formato(fechaP, proveedorP, nitP) {

    var fecha = "";
    var cantidad_fecha = "";
    var salto = "                                ";
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
    var proveedor = proveedorP;
    var cantidad_proveedor = "";
    var nit = "Nit: "+nitP;
    var cantidad_nit = "";

    fecha = "Fecha: "+fechaP;
    cantidad_emp = empresa.length;
    cantidad_fecha = fecha.length;
    cantidad_nit = nit.length;
    cantidad_proveedor = proveedor.length;


    while (cantidad_fecha < 32) {

        fecha = fecha + " ";

        cantidad_fecha = parseInt(cantidad_fecha) + 1;
    }

    while (cantidad_proveedor < 32) {

        proveedor = proveedor + " ";

        cantidad_proveedor = parseInt(cantidad_proveedor) + 1;
    }

    while (cantidad_nit < 32) {

        nit = nit + " ";

        cantidad_nit = parseInt(cantidad_nit) + 1;
    }

    while (cantidad_emp < 18) {

        emp_ini = emp_ini + " ";

        cantidad_emp = parseInt(cantidad_emp) + 1;
    }

    encabezado = emp_ini + empresa + emp_ini + " " + salto + salto + fecha + salto + nit + proveedor + salto + salto;



    for (i = 0; i < des.length; i++) {
        t1 = des[i];
        t1 = t1.toString();
        t2 = can[i];
        t2 = t2.toString();
        cantidad = t1.length + t2.length;

        while (cantidad < 32 - (inicio.length + fin.length)) {

            espacio = espacio + " ";
            cantidad = parseInt(cantidad) + 1;
        }

        mensaje = inicio + t1 + espacio + t2 + fin;

        fin_mensaje = fin_mensaje + mensaje;
        espacio = "";
        cantidad = "";

    }

    fin_mensaje = encabezado + fin_mensaje;
    imprimir(fin_mensaje);

    alert(":" + fin_mensaje);

}



function imprimir(str) {


    cordova.plugins.zbtprinter.print(str,
            function (success) {
                location.href = '../frm/frmInicio.html?var='+strLog+'$';  
            }, function (fail) {
        alert(fail);
    });
}
