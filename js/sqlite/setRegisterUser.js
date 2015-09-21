/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var id_usuario; 
var nombre; 
var apellido;
var telefono; 
var email; 
var usuario; 
var password; 
var tipo; 
var identificacion;

//esta es la que manda a interactuar con la base de datos
//el populateDB es el que crea e inserta en la tabla
//en la db transaction se controla todo, el populate que es la accion
//el error y la succescb que es lo que debe hacer si funciona correctamente 
//el populate
function registrarUsuario(id_usuarioP, nombreP, apellidoP, telefonoP, emailP, usuarioP, passwordP, tipoP, identificacionP) {
    
    
    alert(id_usuarioP+ nombreP+apellidoP+telefonoP+emailP+usuarioP+passwordP+tipoP+identificacionP);
    //variables traidas del motodo donde comprueba el login
    id_usuario=id_usuarioP; 
    nombre=nombreP; 
    apellido=apellidoP;
    telefono=telefonoP; 
    email=emailP; 
    usuario=usuarioP; 
    password=passwordP; 
    tipo=tipoP; 
    identificacion=identificacionP;
    
    
    db.transaction(registerUserDB, errorCB, successCB);
}

//Populate the database
//esta es la sentencia donde borra y crea la tabla nuevamente
//en caso de que sea temporal siempre se le envia las dos primeras sentenicas.
//pero en el caso nuestro vamos a borrar los datos cada semana o cada mes
//por lo tanto solo se enviarian las dos ultimas.
//mas adelante te coloco otroa funciona donde no borra ni crea la tabla
//que se llama function crearDato

function registerUserDB(tx) {
    alert(id_usuario+ nombre+apellido+telefono+email+usuario+password+tipo+identificacion);
    //tx.executeSql('DROP TABLE IF EXISTS USUARIO');
    /*tx.executeSql('INSERT INTO USUARIO (id_usuario, nombre, apellido, telefono, email, usuario, password, tipo, identificacion) '+
                  +'VALUES('+id_usuario+',"'+nombre+'","'+apellido+'",'+telefono+',"'+email+'","'+usuario+'","'+password+'","'+tipo+'",'+identificacion+')');*/
    tx.executeSql('INSERT INTO USUARIO (id_usuario, nombre, apellido, telefono, email, usuario, password, tipo, identificacion) '+
                  +'SELECT '+id_usuario+',"'+nombre+'","'+apellido+'",'+telefono+',"'+email+'","'+usuario+'","'+password+'","'+tipo+'",'+identificacion
                  +' WHERE NOT EXISTS(SELECT 1 FROM USUARIO WHERE id_usuario = '+id_usuario+')');
}

// Transaction error callback
//
function errorCB(err) {
    alert("Error registrando usuario desde setRegisterUser SQL: " + err);
}

// Transaction successCB
//
function successCB(err) {
    alert("Exitoso" + err);
}



