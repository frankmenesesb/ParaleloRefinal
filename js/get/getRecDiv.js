/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var recibiendoRecibo = location.search.slice(location.search.indexOf("$") + 1, location.search.indexOf("*"));
cargar();
//buscar_recibo(recibiendoRecibo);
uReciboEncDiv(recibiendoRecibo);
updateImg1();
$(function () {


    $(".imp_button").click(function () {
        uReciboEncImp(recibiendoRecibo);
    });
});

var i = 0;
var img;
function updateImg1() {

    if (i === 1 || i === "1") {
        img = '<img src="../images/icon 01.png" alt="" style="height: 20px;">';
        i = parseInt(i) + 1;


    }
    if (i === 0 || i === "0") {
        img = '<img src="../images/icon 07.png" alt="" style="height: 20px;">';
        i = parseInt(i) + 1;

    }



    $("#alerta").html(img);
    setTimeout("updateImg1()", 1500);

    if (i === 2 || i === "2") {

        i = parseInt(0);

    }

}