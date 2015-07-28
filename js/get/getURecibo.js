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
var nombre_plaza;
var estado;
var fecha;
var id_proveedor;
var nom_prov;
var strLog;




function uReciboEnc() {
    
    cargar();
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

                    swal('Mensaje!', 'No hay recibos para este usuario!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {





                        id_rec_enc = jsonResp.DATA[i]["id_rec_enc"];
                        observacion = jsonResp.DATA[i]["observacion"];
                        id_usuario = jsonResp.DATA[i]["id_usuario"];
                        nombre_usuario = jsonResp.DATA[i]["nombre_usuario"];
                        nombre_plaza = jsonResp.DATA[i]["nom_plaza"];
                        estado = jsonResp.DATA[i]["estado"];
                        fecha = jsonResp.DATA[i]["fecha"];
                        id_proveedor = jsonResp.DATA[i]["id_proveedor"];
                        nom_prov = jsonResp.DATA[i]["nom_prov"];

                        //dato.push(id_rec_enc);



                        var log = "";
                        if ((id_rec_enc === null || id_rec_enc === "") || (id_usuario === null || id_usuario === "")) {

                            swal("Mensaje!", "Error al traer recibo");

                        } else {




                        }
                    }
                    uReciboDet(id_rec_enc, strLog);
                    /*for(var a=0; a < dato.length; a++){
                     alert(dato[a]);
                     }*/
                    //$("#recibo").html(html);
                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    swal("Mensaje!", "Error: Recibo no existe!!");
                }
                
                $("#dialogProgress").modal('hide');
            } else {
                swal("Mensaje!", "Ocurrio Un error:" + jsonResp.MESSAGE);
            }


        },
        error: function (jsonResp) {
            swal("Mensaje!", "Ocurrio Un error");
        }
    });


}

function imprimirG(){
    
    var csc=$('#txtIdRecibo').val();
    //alert(csc);
    uReciboEncImp(csc);
}

function uReciboEncImp(csc) {
cargar();

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

                    swal('Mensaje!', 'No hay recibos para este usuario!!');
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
                        nombre_plaza = jsonResp.DATA[i]["nom_plaza"];

                        //dato.push(id_rec_enc);



                        var log = "";
                        if ((id_rec_enc === null || id_rec_enc === "") || (id_usuario === null || id_usuario === "")) {

                            swal("Mensaje!", "Error al traer recibo");

                        } else {




                            //articulos.add(id);






                        }
                    }
                    uReciboDet(id_rec_enc, strLog);
                    /*for(var a=0; a < dato.length; a++){
                     alert(dato[a]);
                     }*/
                    //$("#recibo").html(html);
                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    swal("Mensaje!", "Error: Recibo no existe!!");
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

function uReciboDet(strRec, usu) {
    des = [];
    can = [];
    
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

                    swal('Mensaje!', 'Error no hay articulos!!');
                }
                if (jsonResp.MESSAGE === "") {



                    for (var i = 0; i < jsonResp.DATA.length; i++) {




                        //id = jsonResp.DATA[i]["id_art"];
                        descripcion = jsonResp.DATA[i]["descripcion"];
                        cantidad = jsonResp.DATA[i]["cantidad"];



                        var log = "";
                        if ((descripcion === null || descripcion === "") || (cantidad === null || cantidad === "")) {

                            swal("Mensaje!", "Error: articulos con errores o sin existencia ");

                        } else {

                            if (parseInt(cantidad) !== 0) {
                                des.push(descripcion);
                                can.push(cantidad);
                            }








                        }
                    }

                   
                    formato(fecha, nom_prov, id_proveedor, usu, strRec,nombre_usuario,nombre_plaza);


                    //$("#recibo").html(html);
                    //$("#txtHint").html(encabezado+html+final);

                } else if (jsonResp.MESSAGE === "EMPTY") {
                    swal("Mensaje!", "Error: no se encontro datos de articulos!!");
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


function formato(fechaP, proveedorP, nitP, usu, recibo, nom_usuario,nom_plaza) {
    var cod_usu = "Cod. Usuario: " + usu;
    var cantidad_usu = cod_usu.length;
    var fecha = "";
    var cantidad_fecha = "";
    //var salto = "                                ";
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
    var proveedor = proveedorP;
    var csc_rec = "Recibo: #" + recibo;
    var cantidad_rec;
    var cantidad_proveedor = "";
    var nit = "Nit: " + nitP;
    var cantidad_nit = "";
    var espacio_final;
    var nombre_u=""+nom_usuario;
    var cantidad_nom_u;
    var nombre_p=""+nom_plaza;
    var cantidad_nom_p;

    fecha = "Fecha: " + fechaP;
    cantidad_emp = empresa.length;
    cantidad_fecha = fecha.length;
    cantidad_nit = nit.length;
    cantidad_proveedor = proveedor.length;
    cantidad_rec = csc_rec.length;
    cantidad_nom_u=nombre_u.length;
    cantidad_nom_p=nombre_p.length;
    
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
    while (cantidad_rec < 32) {

        csc_rec = csc_rec + " ";

        cantidad_rec = parseInt(cantidad_rec) + 1;
    }

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

    encabezado = emp_ini + empresa + emp_ini + " " + salto + salto + fecha + salto + nit + proveedor + salto + salto + csc_rec +cod_usu+nombre_u+nombre_p+ salto + salto;



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

        espacio_final = espacio;

        mensaje = inicio + t1 + espacio + t2 + fin;

        fin_mensaje = fin_mensaje + mensaje;
        espacio = "";
        cantidad = "";

    }

    fin_mensaje = encabezado + fin_mensaje + espacio_final + espacio_final + espacio_final + espacio_final;
    imprimir(fin_mensaje, usu);
    //alert(fin_mensaje);

    //swal("Mensaje!", ":" + fin_mensaje);

}



function imprimir(str, usu) {
    
    cordova.plugins.zbtprinter.print(str,
            function (success) {
                $("#dialogProgress").modal('hide');
                location.href = '../frm/frmInicio.html?var=' + usu + '$';
            }, function (fail) {
                
                $("#dialogProgress").modal('hide');
                if(fail!==null || fail!==""){
                    swal("Mensaje!", "Error conexion por favor reinicie la impresora, y reinicie el bluethooth de su celular");
                    //swal("Mensaje!", fail);
                }
        
    });
}

