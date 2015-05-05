/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var db = window.openDatabase("Database", "1.0", "Database Sqlite", 200000);
var m_db = "";

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
}


function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS SQLITE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULOS (ID_ART unique, DESCRIPCION, OBSERVACION,IMAGEN)');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(1, "SEBO EN RAMA", "", "prod-sebo rama.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(2, "HUESO CALAMBOMBO", "", "prod-hueso calambombo.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(3, "HUESO DE SEGUNDA", "", "prod-Hueso segunda.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(4, "HUESO SECO", "", "prod-hueso seco.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(5, "DESPERDICIO RES", "", "prod-desperdicio res.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(6, "SANGRE RES", "", "prod-sangre res.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(7, "PLUMA", "", "prod-pluma.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(8, "TRIPA DE AVES", "", "prod-tripa aves.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(9, "SANGRE DE AVES", "", "prod-sangre ave.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(10, "DESPERDICIO DE AVES", "", "prod-desperdicio ave.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(11, "GALLINAZA", "", "prod-gallinaza.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(12, "PIELES DE PRIMERA", "", "prod-piel primera.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(13, "PIELES DE SEGUNDA", "", "prod-piel segunda.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(14, "SEBO DERRETIDO", "", "prod-sebo derretido.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(15, "HARINA DE SANGRE", "", "prod-harina sangre.png")');
    tx.executesql('INSERT INTO articulos (id_art, descripcion, observacion, imagen) VALUES(16, "DESPERDICIO DE PESCADO", "", "prod-desperdicio pescado.png")');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS RECIBO (CSC unique, data)');
    //tx.executeSql('INSERT INTO SQLITE (id, data) VALUES (1, "Halaman Pertama")');
    //tx.executeSql('INSERT INTO SQLITE (id, data) VALUES (2, "Halaman Kedua")');
}


function errorCB(err) {
    alert("Error processing SQL: " + err);
}

function successCB() {
    m_db = "correctamente";
}
