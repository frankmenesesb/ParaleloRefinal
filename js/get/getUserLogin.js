/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function () {
    $(".find_button").click(function () {

        cargar();
        //variables de entrada
        var strLog = $("#txtUsuario").val();
        var strPass = $("#txtContrasena").val();
       
        //variables locales

        var id;
        var nombre;
        var apellido;
        var login;
        var telefono;
        var identificacion;
        var email;
        var tipo;
        var log = "";
        var password;

        var dataString = {'usuario': strLog,'contrasena': strPass};

        if (strLog === '') {

            swal("Mensaje!", "No has ingresado el usuario :)..");
            $("#txtUsuario").focus();

        } else if (strPass === '') {

            swal("Mensaje!", "No has ingresado la contraseña :)..");
            $("#txtContrasena").focus();

        } else
        {
            $.ajax({
                type: 'POST',
                data: dataString,
                dataType: 'json',
                url: "http://refinalapp.fluxusmedia.co/php/get/getUserLogin.php",
                success: function (jsonResp) {

                    if (jsonResp.RESPONSE) {


                        if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                            swal('Mensaje!', 'Error Usuario no registrado!!');
                        }
                        if (jsonResp.MESSAGE === "") {



                            for (var i = 0; i < jsonResp.DATA.length; i++) {

                                id = jsonResp.DATA[i]["id_usuario"];
                                nombre = jsonResp.DATA[i]["nombre"];
                                apellido = jsonResp.DATA[i]["apellido"];
                                login = jsonResp.DATA[i]["usuario"];
                                telefono = jsonResp.DATA[i]["telefono"];
                                identificacion = jsonResp.DATA[i]["identificacion"];
                                email = jsonResp.DATA[i]["email"];
                                tipo = jsonResp.DATA[i]["tipo"];
                                password = jsonResp.DATA[i]["password"];
                                
                                registrarUsuario(id, nombre, apellido, telefono, email, login, password, tipo, identificacion);


                                log = "";
                                if ((nombre === null || nombre === "") || (id === null || id === "")) {

                                    swal("Mensaje!", "Error: usuario o contraseña invalidos ");

                                } else {
                                    
                                    if (tipo === 'A') {
                                         $("#dialogProgress").modal('hide');
                                        location.href = 'frm/frmMainA.html?var='+id+'$';
                                    } else if (tipo === 'R') {
                                        $("#dialogProgress").modal('hide');
                                        location.href = 'frm/frmInicio.html?var='+id+'$';
                                    } else if (tipo === 'S') {
                                        $("#dialogProgress").modal('hide');
                                        location.href = 'frm/frmMainS.html?var='+id+'$';

                                    }
                                }
                            }

                            //$("#txtHint").html(encabezado+html+final);

                        } else if (jsonResp.MESSAGE === "EMPTY") {
                            swal("Mensaje!", "Error: no se encontro datos de registro del usuario!!");
                            $("#dialogProgress").modal('hide');
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

    });

});


function loginLocal(usuarioP,passP){
    
        cargar();
        //variables de entrada
        var strLog = usuarioP;
        var strPass = passP;
       
        //variables locales

        var id;
        var nombre;
        var apellido;
        var login;
        var telefono;
        var identificacion;
        var email;
        var tipo;
        var log = "";
        var password;

        var dataString = {'usuario': strLog,'contrasena': strPass};

        if (strLog === '') {

            swal("Mensaje!", "No has ingresado el usuario :)..");
            $("#txtUsuario").focus();

        } else if (strPass === '') {

            swal("Mensaje!", "No has ingresado la contraseña :)..");
            $("#txtContrasena").focus();

        } else
        {
            $.ajax({
                type: 'POST',
                data: dataString,
                dataType: 'json',
                url: "http://refinalapp.fluxusmedia.co/php/get/getUserLogin.php",
                success: function (jsonResp) {

                    if (jsonResp.RESPONSE) {


                        if (jsonResp.MESSAGE === "undefined" || jsonResp.MESSAGE === undefined) {

                            swal('Mensaje!', 'Error Usuario no registrado!!');
                        }
                        if (jsonResp.MESSAGE === "") {



                            for (var i = 0; i < jsonResp.DATA.length; i++) {

                                id = jsonResp.DATA[i]["id_usuario"];
                                nombre = jsonResp.DATA[i]["nombre"];
                                apellido = jsonResp.DATA[i]["apellido"];
                                login = jsonResp.DATA[i]["usuario"];
                                telefono = jsonResp.DATA[i]["telefono"];
                                identificacion = jsonResp.DATA[i]["identificacion"];
                                email = jsonResp.DATA[i]["email"];
                                tipo = jsonResp.DATA[i]["tipo"];
                                password = jsonResp.DATA[i]["password"];
                                
                                registrarUsuario(id, nombre, apellido, telefono, email, login, password, tipo, identificacion);


                                log = "";
                                if ((nombre === null || nombre === "") || (id === null || id === "")) {

                                    swal("Mensaje!", "Error: usuario o contraseña invalidos ");

                                } else {
                                    
                                    if (tipo === 'A') {
                                         $("#dialogProgress").modal('hide');
                                        location.href = 'frm/frmMainA.html?var='+id+'$';
                                    } else if (tipo === 'R') {
                                        $("#dialogProgress").modal('hide');
                                        location.href = 'frm/frmInicio.html?var='+id+'$';
                                    } else if (tipo === 'S') {
                                        $("#dialogProgress").modal('hide');
                                        location.href = 'frm/frmMainS.html?var='+id+'$';

                                    }
                                }
                            }

                            //$("#txtHint").html(encabezado+html+final);

                        } else if (jsonResp.MESSAGE === "EMPTY") {
                            swal("Mensaje!", "Error: no se encontro datos de registro del usuario!!");
                            $("#dialogProgress").modal('hide');
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

