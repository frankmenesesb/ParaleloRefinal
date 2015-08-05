/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var iBar;
var plus;

var codArt = [];
var canArt = [];

var titleHeader = "";

function onDeviceReady() {
    document.addEventListener("backbutton", handleBackButton, true);
}
function handleBackButton() {

    /*if($.mobile.activePage.attr('id') === 'home'
     || $.mobile.activePage.attr('id') === 'listaUsuarios'){
     navigator.app.exitApp();
     }else if ($.mobile.activePage.attr('id') === 'cita'){
     $.mobile.changePage('#listaUsuarios');
     }else{
     navigator.app.backHistory();
     }*/

    var mensaje = 'no entra';
}

document.addEventListener("deviceready", onDeviceReady, false);


window.onload = function ()
{
    var recibiendoVariable = location.search.slice(location.search.indexOf("=") + 1, location.search.indexOf("$"));

    titleHeader = $(".panel-heading").find("h4").text();
    $("#recibirVariable").val(recibiendoVariable);

    updateClock();

};


$(function () {
    $(".recibo_button").click(function () {

        location.href = 'frmIngreso.html?var=' + $("#recibirVariable").val() + '$';


    });

});



$(function () {
    $(".rec_mod_button").click(function () {

        location.href = 'frmGestionRecibos.html?var=' + $("#recibirVariable").val() + '$';


    });

});


$(function () {
    $(".consulta_button").click(function () {

        location.href = 'frmRecibos.html?var=' + $("#recibirVariable").val() + '$';


    });

});

function updateClock() {

    var d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();

    if (minute < 9) {
        minute = "0" + minute;
    }

    $(".panel-hora").find("h5").text('Hora: ' + d.getHours() + ':' + d.getMinutes());//,'Segundos: '+d.getSeconds());

    setTimeout("updateClock()", 1000);
}

$(function () {
    $(".fact_button").click(function () {

        location.href = 'frmIngreso.html?var=' + $("#recibirVariable").val() + '$';


    });

});


$(function () {
    $(".cancel_fact_button").click(function () {

        location.href = 'frmInicio.html?var=' + $("#recibirVariable").val() + '$';


    });

});



function updateBarA() {

    iBar = parseInt(iBar) + parseInt(plus);

    var html = "";
    html += '<div class="progress">';
    html += '<div class="progress-bar progress-bar-striped active" role="progressbar"aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + iBar + '%"></div>';
    html += '</div>';





    $("#progreso-pagina").html(html);


    if (parseInt(iBar) < 100) {

        setTimeout("updateBarA()", 200);

    }

}


function cargar() {

    iBar = 5;
    plus = 5;
    $("#dialogProgress").modal('show');
    updateBarA();
}




function conecctionStatus() {
    $.ajax({
        type: "POST",
        url: "http://refinalapp.fluxusmedia.co/php/get/conecctionStatus.php",
        data: "NULL",
        dataType: 'json',
        cache: true,
        success: function (jsonResp, html) {

            if (jsonResp.RESPONSE) {
                $("#btn-est-con").html('<a id="btn-con-con" class="list-group-item con-con" title="Conexion Correcta" onclick="msn_conexion(\'S\');" ></a>');
            } else {
                $("#btn-est-con").html('<a id="btn-sin-con" class="list-group-item sin-con" title="Sin Conexion" onclick="msn_conexion(\'N\');"></a>');
            }

        }
        ,
        error: function (jsonResp) {
            $("#btn-est-con").html('<a id="btn-sin-con" class="list-group-item sin-con" title="Sin Conexion"></a>');
        }
    });

    setTimeout("conecctionStatus()", 10000);

}

function msn_conexion(estado){
    
//alert('entro con '+estado);
   if (estado==="S"){
       swal("Estado Conexion!", "Estable");
   } else{
       swal("Estado Conexion!", "No hay conexion.");
   }
}
