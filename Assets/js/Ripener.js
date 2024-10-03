let idtelemetria = $('#telemetria_id').val();
let partes = idtelemetria.split(',');
let tblData = document.getElementById('tblData');

let valor1 = partes[0]; //id telemetria
let valor2 = partes[1]; // nombre contenedor
let valor3 = partes[2]; //imei

document.addEventListener("DOMContentLoaded", async function(){
    try{
        console.log(valor1);
        console.log(valor2);
        $('#nombreContenedor').html(valor2);

    }catch(err){alert(err);}

});

async function btnProcesar(){
    $('#formProcess').trigger('reset');
    $('#strtProcess').modal('hide');
    trama = datosArray[0].dsc+"|"+datosArray[0].producto+"|"+datosArray[0].flujometro+"|"+datosArray[0].spTmp + "|" + datosArray[0].spEthy + "|" + datosArray[0].spCo2 + "|" + datosArray[0].spHm + "|" + datosArray[0].iHours + "|" + valor3 + "|" + valor2;
    console.log(trama);
    const response = await fetch(base_url + "Ripener/modoRipener/"+trama, {method: "GET", });
    const result = await response.json();
    analizar =JSON.parse(result) ;
    if(analizar == 0){
        $('#mdlAdvertencia').modal('show');
    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Process is being executed!',
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            window.location = base_url + "AdminPage";
        });
    }    
}

$(document).ready(function(){
    $('#tmpInput').TouchSpin({
        min: 58,
        max: 104,
        step: 0.1,
        decimals: 1,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '°F'
    })
    $("#tmpInput").val(0)
    $('#ethyInput').TouchSpin({
        min: 1,
        max: 300,
        step: 1,
        decimals: 0,
        boostat: 5,
        maxboostedstep: 10,
        postfix: 'PPM'
    })
    $("#ethyInput").val(0)
    $('#co2Input').TouchSpin({
        min: 0.1,
        max: 30,
        step: 0.1,
        decimals: 1,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    })
    $("#co2Input").val(0)
    $('#hmInput').TouchSpin({
        min: 80,
        max: 99,
        step: 1,
        decimals: 0,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    })
    $("#hmInput").val(0)
    $('#ihoursInput').TouchSpin({
        min: 0,
        max: 100,
        step: 1,
        decimals: 0,
        boostat: 5,
        maxboostedstep: 10,
        postfix: 'Hrs'
    })
    $("#ihoursInput").val(0)
});

function alertas(msg, icono) {
    Swal.fire({
        position: 'top-end',
        icon: icono,
        title: msg,
        showConfirmButton: false,
        timer: 3000
    })
}

function frmProcess(e){
    e.preventDefault();
    let descripcion = $('input[name=\'dscInput\']').val();
    let producto = $('input[name=\'productoInput\']').val();
    let flujometro = $('input[name=\'flujometroInput\']').val();
    let valorT = $('input[name=\'tmpInput\']').val();
    let valorE = $('input[name=\'ethyInput\']').val();
    let valorC = $('input[name=\'co2Input\']').val();
    let valorH = $('input[name=\'hmInput\']').val();
    let valorI = $('input[name=\'ihoursInput\']').val();

    if(valorT != 0 && valorE != 0 && valorC != 0 && valorH != 0 && valorI != 0){
        $('#strtProcess').modal('show');
        $('#validateDsc').val(descripcion);
        $('#validateProducto').val(producto);
        $('#validateFlujometro').val(flujometro);
        $('#validateTMP').val(valorT);
        $('#validateEthy').val(valorE);
        $('#validateCo2').val(valorC);
        $('#validateHm').val(valorH);
        $('#validateIH').val(valorI);

        datosArray=[];
        //Creando Objeto
        datosArray.push ({
            dsc: descripcion,
            producto: producto,
            flujometro: flujometro,
            spTmp: valorT,
            spEthy: valorE,
            spCo2: valorC,
            spHm: valorH,
            iHours: valorI
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            text: 'It looks like an input has 0 value',
        });
    }
}

function retornar(){
    window.location = base_url + "AdminPage";
}
