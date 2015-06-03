/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





var codArt = [];
var canArt = [];

var titleHeader = "";

function onDeviceReady() {
      document.addEventListener("backbutton", handleBackButton, true);
}
function handleBackButton(){
 
    /*if($.mobile.activePage.attr('id') === 'home'
              || $.mobile.activePage.attr('id') === 'listaUsuarios'){
        navigator.app.exitApp();
    }else if ($.mobile.activePage.attr('id') === 'cita'){
        $.mobile.changePage('#listaUsuarios');
    }else{
        navigator.app.backHistory();
    }*/
    
    var mensaje='no entra';
}
 
document.addEventListener("deviceready", onDeviceReady, false);


window.onload = function()
{
var recibiendoVariable = location.search.slice( location.search.indexOf("=") + 1,location.search.indexOf("$"));



//document.getElementById("recibirVariable").innerHTML = recibiendoVariable;

    titleHeader = $(".panel-heading").find("h4").text();
    $("#recibirVariable").val(recibiendoVariable);
    
    updateClock();



};


$(function () {
    $(".recibo_button").click(function () {
        
        location.href = 'frmIngreso.html?var='+$("#recibirVariable").val()+'$';
        
        
  });

});



$(function () {
    $(".rec_mod_button").click(function () {
        
        location.href = 'frmGestionRecibos.html?var='+$("#recibirVariable").val()+'$';
        
        
  });

});


$(function () {
    $(".consulta_button").click(function () {
        
        location.href = 'frmRecibos.html?var='+$("#recibirVariable").val()+'$';
        
        
  });

});

function updateClock(){
    
    var d = new Date();
    var hour  = d.getHours();
    var minute = d.getMinutes();
    
    if(minute < 9){
        minute = "0"+minute;
    }
    
    $(".panel-hora").find("h5").text('Hora: '+d.getHours()+':'+d.getMinutes());//,'Segundos: '+d.getSeconds());
    //$(".panel-hora").find("h5").text(titleHeader +' Hora: '+d.getHours()+':'+d.getMinutes());//,'Segundos: '+d.getSeconds());
    
    setTimeout("updateClock()",1000) ;
}

$(function () {
    $(".fact_button").click(function () {
        
        location.href = 'frmIngreso.html?var='+$("#recibirVariable").val()+'$';
        
   
    });

});


$(function () {
    $(".cancel_fact_button").click(function () {
        
        location.href = 'frmInicio.html?var='+$("#recibirVariable").val()+'$';
        
   
    });

});
