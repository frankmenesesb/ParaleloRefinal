var id_rec_enc;

$(function () {


    $(".submit_button").click(function () {





        var strLog = $("#recibirVariable").val();
        var strProveedor = $("#txtProveedor").val();
        var y;
        var can_totales = 0;



        //var strGen = $("#radioGenero").val();
        //var strGen = $('input:radio[name=radioGenero]:checked').val();


        var dataString = {'usuario': strLog, 'proveedor': strProveedor};


        for (x = 1; x < 17; x++) {

            if ($("#" + x).val() !== null) {

                can_totales += Number($("#" + x).val());
            }
        }



        if (strLog === '') {

            alert("No has iniciado sesion correctamente :)..");


        } else if (can_totales === '' || can_totales === null || can_totales === 0 || can_totales === '0') {

            alert("No puedes guardar un recibo con todas las cantidades en 0 (cero).");


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


                    if (jsonResp.RESPONSE) {


                        //alert(jsonResp.MESSAGE);
                        //location.href = '../frm/frmInicio.html?var='+strLog+'$';    
                        for (x = 1; x < 17; x++) {

                            if ($("#" + x).val() !== null) {

                                detallado(x, $("#" + x).val());
                                y = x;

                            }
                        }
                        
                        
                        
                       
                        alert(jsonResp.MESSAGE);
                         

                        //location.href = '../frm/frmInicio.html?var='+strLog+'$';    

                        if (y === 17) {

                            var html = "Se guardo Correctamente!";



                            $("#txtRespuesta").html(html);
                            $("#txtRespuesta").focus();

                            //location.href = 'frmReciboConsulta.html?var='+strLog+'$'+;


                        }
                        
                        

                        ultReciboEnc();
                        
//                        var r = confirm("Desea imprimir el recibo?");
//                        if (r === true) {
//                            uReciboEnc();
//                        } else {
//                            location.href = '../frm/frmInicio.html?var=' + strLog + '$';
//                        }



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
//                        observacion = jsonResp.DATA[i]["observacion"];
//                        id_usuario = jsonResp.DATA[i]["id_usuario"];
//                        nombre_usuario = jsonResp.DATA[i]["nombre_usuario"];
//                        estado = jsonResp.DATA[i]["estado"];
//                        fecha = jsonResp.DATA[i]["fecha"];
//                        id_proveedor = jsonResp.DATA[i]["id_proveedor"];
//                        nom_prov = jsonResp.DATA[i]["nom_prov"];

                        //dato.push(id_rec_enc);



                        var log = "";
                        if ((id_rec_enc === null || id_rec_enc === "")) {

                            alert("Error al traer recibo");

                        } else {




                            //articulos.add(id);






                        }
                    }
                    
                    var l = confirm("Desea revisar el recibo?");
                        if (l === true) {
                            
                            location.href = '../frm/frmReciboBuscar.html?var=' + strLog + '$'+id_rec_enc+'*';
                        } else {
                            var r = confirm("Desea imprimir el recibo?");
                        if (r === true) {
                            uReciboEnc();
                        } else {
                            location.href = '../frm/frmInicio.html?var=' + strLog + '$';
                        }
                        }
                    //uReciboDet(id_rec_enc,strLog);
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