

//esto es para el inicializar la base de datos en este caso
//esta siendo llamada desde el body en onload="init();"
//pero podriamos llamarlo con una funcion normal
//por ejemplo agregar en main.js del proyecto que se inicialice
//ya vos decidis
var db = window.openDatabase("Database", "1.0", "Database Sqlite", 200000);


function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
    
}

//esta es la que manda a interactuar con la base de datos
//el populateDB es el que crea e inserta en la tabla
//en la db transaction se controla todo, el populate que es la accion
//el error y la succescb que es lo que debe hacer si funciona correctamente 
//el populate
function onDeviceReady() {
    
    db.transaction(populateDB, errorCB, successCB);
    //db.transaction(queryDB, errorCB);
    
    
}

//Populate the database
//esta es la sentencia donde borra y crea la tabla nuevamente
//en caso de que sea temporal siempre se le envia las dos primeras sentenicas.
//pero en el caso nuestro vamos a borrar los datos cada semana o cada mes
//por lo tanto solo se enviarian las dos ultimas.
//mas adelante te coloco otroa funciona donde no borra ni crea la tabla
//que se llama function crearDato

function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS USUARIO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (id_usuario unique, nombre, apellido, telefono, email, usuario, password, tipo, identificacion)');
    /*
    tx.executeSql('INSERT INTO USUARIO (id_usuario, nombre, apellido, telefono, email, usuario, password, tipo, identificacion) ' +
            +'SELECT 9999, "Administrador","Administrador",3166234391,"frankmeneses10@gmail.com","admin","apolo11mb","A",1151937845 '+
            'WHERE NOT EXISTS(SELECT 1 FROM USUARIO WHERE id_usuario = 9999)');*/
}



// Transaction error callback
//
function errorCB(err) {
    //alert("Error processing SQL: " + err);
    swal("Mensaje!", "Error base de datos local " + err);
}

// Transaction successCB
//
function successCB(err) {
    alert("success processing SQL: " + err);
}


