let contenidoPrincipal = document.getElementById('contenidoPrincipal');
let modalComando = 1;
//$('.dropdown-toggle').dropdown()

/*
function mostrarMasContenido(){
    $('.view-more').click(function(){   
        $('.hide-content').attr('hidden', false);
        let btn = "<i class='ri-arrow-up-circle-line view-less text-danger fs-2'></i>";
        $('#change-button').html(btn);
    });
}

function mostrarMenosContenido(){
    $('.view-less').click(function(){   
        $('.hide-content').attr('hidden', true);
        let btn = "<button type='button' class='btn btn-primary btn-sm view-more'>View More</button>";
        $('#change-button').html(btn);
    });
}*/


function mostrarContenido(id){
    let flechaMostrar = $('#icon_mostrar_contenido_'+id);
    let textFlecha = flechaMostrar[0];

    let comparar = textFlecha.className;
    //hide-content-humidity_{$val->telemetria_id}
    if(comparar.includes('ri-arrow-down-circle-line')){
        $('.hide-content-humidity_'+id).attr('hidden', false);
        $('.hide-content-compressor_'+id).attr('hidden', false);
        $('.hide-content-evaporator_'+id).attr('hidden', false);
        $('.hide-content-ambientair_'+id).attr('hidden', false);
        $('.hide-content-pwd_'+id).attr('hidden', false);
        $('.hide-content-cmode_'+id).attr('hidden', false);
        $('.hide-content-usda1_'+id).attr('hidden', false);
        $('.hide-content-usda4_'+id).attr('hidden', false);

        flechaMostrar.removeClass('ri-arrow-down-circle-line');
        flechaMostrar.addClass('ri-arrow-up-circle-line');

    }else{
        flechaMostrar.removeClass('ri-arrow-up-circle-line');
        flechaMostrar.addClass('ri-arrow-down-circle-line');
        $('.hide-content-humidity_'+id).attr('hidden', true);
        $('.hide-content-compressor_'+id).attr('hidden', true);
        $('.hide-content-evaporator_'+id).attr('hidden', true);
        $('.hide-content-ambientair_'+id).attr('hidden', true);
        $('.hide-content-pwd_'+id).attr('hidden', true);
        $('.hide-content-cmode_'+id).attr('hidden', true);
        $('.hide-content-usda1_'+id).attr('hidden', true);
        $('.hide-content-usda4_'+id).attr('hidden', true);
    }
}



function hideContent(id){
    $('.hide-content').attr('hidden', false);
    $('#change-button').html('');
    let btn = `<i class='ri-arrow-up-circle-line view-less text-danger fs-2' id='${id}'></i>`;
    $('#change-button').html(btn);
}
/*
function showContent(id){
    $('.hide-content').attr('hidden', false);
    let btn = `<button type='button' class='btn btn-primary btn-sm view-more' onclick='hideContent(${id})'>View More</button>`;
    $('#change-button').html(btn);
}*/
document.addEventListener("DOMContentLoaded", async function(){
    try{
        const response = await fetch(base_url + "AdminPage/ListaDispositivoEmpresa",{method: 'GET'});
        const data = await response.json();
        console.log(data);
        contenidoPrincipal.innerHTML  =data.text;
       //mostrarMasContenido();
       alerta();
       
    }catch(err){alert(err);}
    
    //cada 10 segundos ejecutar 
    setInterval( async function(){ okey =  await obtenerCambio();}, 30000);
    //setInterval( async function(){ tst =  await mostrarMenosContenido();}, 1000);
    //setInterval( async function(){ tst2 =  await mostrarMasContenido();}, 1000);

})

function alerta(){
    // Seleccionar todos los elementos con el ID 'imei_contenedor'
    const imeiElements = document.querySelectorAll('#imei_contenedor');
    
    imeiElements.forEach(element => {
        let imei = element.value;
        const url = base_url + "AdminPage/cargarAlerta/" + imei;
        const http = new XMLHttpRequest();
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                const res = JSON.parse(this.responseText);
                let contenido = document.getElementById('alerta_' + imei);
                contenido.innerHTML = res.text;
                console.log(res);
            }
        }
    });
}

function modalfinalizar(id){
    //metodo para finalizar el proceso
    const url = base_url + "AdminPage/finalizarProceso/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            console.log(res);
            $('#contenidoFinalizar').html(res.text);
            $('#modalFinalizar').modal('show'); 
        }
    }
    
}
function finalizarProceso(id){
    //metodo para finalizar el proceso
    console.log(id);
}

async function obtenerCambio() {
    //$(".loader").show();
    const response = await fetch(base_url + "AdminPage/LiveData", {method: "GET", });
    const result = await response.json();
    if(result.length!=0){
        result.forEach(function(res){
            tarjeta(res);
            //$('#fechita_'+res.telemetria_id).text(res.ultima_fecha);
            alerta();
            console.log(res.telemetria_id);
        })
    }
    console.log(result);
    //setInterval(  function(){ $(".loader").fadeOut("fast"); }, 1000);

    return result;
}

let ethyValues = {};
let co2Values = {};
let supplyValues = {};
let returnValues = {};
let humidityValues = {};
let iHoursValues = {};
let avlValues = {};
let compressorValues = {};
let evaporatorValues = {};
let ambientValues = {};
let pwdValues = {};
let procesoValues = {};
let cmodeValues = {};
let usda1Values = {};
let usda2Values = {};
function tarjeta(res){
    let iconSuccess = "<i class='bi bi-arrow-up-short me-2 align-items-center mb-1 text-success value-icon'></i>";
    let iconDown = "<i class='bi bi-arrow-down-short me-2 align-items-center mb-1 text-danger value-icon'></i>";

    if(ethyValues[res.telemetria_id] === undefined){
        ethyValues[res.telemetria_id] = res.ethylene;
    }
    let evaluacionEti;
    if(res.ethylene > ethyValues[res.telemetria_id]){
        evaluacionEti = iconSuccess;
    }else if(res.ethylene < ethyValues[res.telemetria_id]){
        evaluacionEti = iconDown;
    }

    $('#eti_icon_'+res.telemetria_id).html(evaluacionEti);

    if(co2Values[res.telemetria_id] === undefined){
        co2Values[res.telemetria_id] = res.co2_reading;
    }
    let evaluacionCO2;
    if(res.co2_reading > co2Values[res.telemetria_id]){
        evaluacionCO2 = iconSuccess;
    }else if(res.co2_reading < co2Values[res.telemetria_id]){
        evaluacionCO2 = iconDown;
    }

    $('#co2_icon_'+res.telemetria_id).html(evaluacionCO2);

    if(supplyValues[res.telemetria_id] === undefined){
        supplyValues[res.telemetria_id] = res.temp_supply
    }

    let evaluacionSupply;

    if(res.temp_supply > supplyValues[res.telemetria_id]){
        evaluacionSupply = iconSuccess;
    }else if(res.temp_supply < supplyValues[res.telemetria_id]){
        evaluacionSupply = iconDown;
    }
    $('#supply_icon_'+res.telemetria_id).html(evaluacionSupply);

    if(returnValues[res.telemetria_id] === undefined){
        returnValues[res.telemetria_id] = res.return_air
    }

    let evaluacionReturn;
    if(res.return_air > returnValues[res.telemetria_id]){
        evaluacionReturn = iconSuccess;
    }else if(res.return_air < returnValues[res.telemetria_id]){
        evaluacionReturn = iconDown;
    }
    $('#return_icon_'+res.telemetria_id).html(evaluacionReturn);

    if(humidityValues[res.telemetria_id] === undefined){
        humidityValues[res.telemetria_id] = res.relative_humidity
    }
    let evaluacionHumidity;
    if(res.relative_humidity > humidityValues[res.telemetria]){
        evaluacionHumidity = iconSuccess;
    }else if(res.relative_humidity < humidityValues[res.telemetria_id]){
        evaluacionHumidity = iconDown;
    }
    $('#humidity_icon_'+res.telemetria_id).html(evaluacionHumidity);

    if(iHoursValues[res.telemetria_id] === undefined){
        iHoursValues[res.telemetria_id] = res.ripener_prueba
    }
    let evaluacionIHours;
    if(res.ripener_prueba > iHoursValues[res.telemetria_id]){
        evaluacionIHours = iconSuccess;
    }else if(res.ripener_prueba < iHoursValues[res.telemetria_id]){
        evaluacionIHours = iconDown;
    }
    $('#i_hours_icon_'+res.telemetria_id).html(evaluacionIHours);

    if(avlValues[res.telemetria_id] === undefined){
        avlValues[res.telemetria_id] = res.avl
    }
    let evaluacionAvl;
    if(res.avl > avlValues[res.telemetria_id]){
        evaluacionAvl = iconSuccess;
    }else if(res.avl < avlValues[res.telemetria_id]){
        evaluacionAvl = iconDown;
    }
    $('#avl_icon_'+res.telemetria_id).html(evaluacionAvl);

    if(compressorValues[res.telemetria_id] === undefined){
        compressorValues[res.telemetria_id] = res.compress_coil_1
    }
    let evaluacionCompressor;
    if(res.compress_coil_1 > compressorValues[res.telemetria_id]){
        evaluacionCompressor = iconSuccess;
    }else if(res.compress_coil_1 < compressorValues[res.telemetria_id]){
        evaluacionCompressor = iconDown;
    }
    $('#compressor_icon_'+res.telemetria_id).html(evaluacionCompressor);

    if(evaporatorValues[res.telemetria_id] === undefined){
        evaporatorValues[res.telemetria_id] = res.evaporation_coil
    }
    let evaluacionEvaporator;
    if(res.evaporation_coil > evaporatorValues[res.telemetria_id]){
        evaluacionEvaporator = iconSuccess;
    }else if(res.evaporation_coil < evaporatorValues[res.telemetria_id]){
        evaluacionEvaporator = iconDown;
    }
    $('#evaporator_icon_'+res.telemetria_id).html(evaluacionEvaporator);

    if(ambientValues[res.telemetria_id] === undefined){
        ambientValues[res.telemetria_id] = res.ambient_air
    }
    let evaluacionAmbient;
    if(res.ambient_air > ambientValues[res.telemetria_id]){
        evaluacionAmbient = iconSuccess;
    }else if(res.ambient_air < ambientValues[res.telemetria_id]){
        evaluacionAmbient = iconDown;
    }
    $('#ambient_air_icon_'+res.telemetria_id).html(evaluacionAmbient);

    if(pwdValues[res.telemetria_id] === undefined){
        pwdValues[res.telemetria_id] = res.defrost_prueba
    }
    let evaluacionPwd;
    if(res.defrost_prueba > pwdValues[res.telemetria_id]){
        evaluacionPwd = iconSuccess;
    }else if(res.defrost_prueba < pwdValues[res.telemetria_id]){
        evaluacionPwd = iconDown;
    }
    $('#pwd_icon_'+res.telemetria_id).html(evaluacionPwd);

    if(procesoValues[res.telemetria_id] === undefined){
        procesoValues[res.telemetria_id] = res.stateProcess
    }
    let evaluacionProceso;
    if(res.stateProcess > procesoValues[res.telemetria_id]){
        evaluacionProceso = iconSuccess;
    }else if(res.stateProcess < procesoValues[res.telemetria_id]){
        evaluacionProceso = iconDown;
    }
    $('#proceso_icon_'+res.telemetria_id).html(evaluacionProceso);

    if(cmodeValues[res.telemetria_id] === undefined){
        cmodeValues[res.telemetria_id] = res.controlling_mode
    }
    let evaluacionCmode;    
    if(res.controlling_mode > cmodeValues[res.telemetria_id]){
        evaluacionCmode = iconSuccess;
    }else if(res.controlling_mode < cmodeValues[res.telemetria_id]){
        evaluacionCmode = iconDown;
    }
    $('#c_mode_icon_'+res.telemetria_id).html(evaluacionCmode);

    if(usda1Values[res.telemetria_id] === undefined){
        usda1Values[res.telemetria_id] = res.cargo_1_temp
    }
    let evaluacionUsda1;
    if(res.cargo_1_temp > usda1Values[res.telemetria_id]){
        evaluacionUsda1 = iconSuccess;
    }else if(res.cargo_1_temp < usda1Values[res.telemetria_id]){
        evaluacionUsda1 = iconDown;
    }
    $('#usda_1_icon_'+res.telemetria_id).html(evaluacionUsda1);
    
    if(usda2Values[res.telemetria_id] === undefined){
        usda2Values[res.telemetria_id] = res.cargo_2_temp
    }
    let evaluacionUsda2;
    if(res.cargo_2_temp > usda2Values[res.telemetria_id]){
        evaluacionUsda2 = iconSuccess;
    }else if(res.cargo_2_temp < usda2Values[res.telemetria_id]){
        evaluacionUsda2 = iconDown;
    }
    $('#usda_2_icon_'+res.telemetria_id).html(evaluacionUsda2);
    

    $('#fechita_'+res.telemetria_id).text(res.ultima_fecha);
    $('#ethyleno_'+res.telemetria_id).text(res.ethylene +"ppm");
    let co2V = res.co2_reading;
    if(co2V>=0  && co2V<=30){
        $('#co2_'+res.telemetria_id).text(co2V + "%");
    }else{
        $('#co2_'+res.telemetria_id).text('NA %');
    }
    $('#supply_'+res.telemetria_id).text(res.temp_supply_1+"C°");
    $('#return_'+res.telemetria_id).text(res.return_air+"C°");
    $('#humidity_'+res.telemetria_id).text(res.relative_humidity+"%");
    $('#i_hours_'+res.telemetria_id).text(res.ripener_prueba);
    $('#avl_'+res.telemetria_id).text(res.avl+"CFM");
    //$('#compressor_'+res.telemetria_id).text(res.compress_coil_1+"C°");
    $('#evaporator_'+res.telemetria_id).text(res.evaporation_coil+"C°");
    $('#ambient_air_'+res.telemetria_id).text(res.ambient_air+"C°");
    $('#pwd_'+res.telemetria_id).text(res.defrost_prueba);
    $('#proceso_'+res.telemetria_id).text(res.stateProcess);
    $('#c_mode_'+res.telemetria_id).text(res.controlling_mode);
    $('#usda_1_'+res.telemetria_id).text(res.cargo_1_temp+"C°");
    $('#usda_2_'+res.telemetria_id).text(res.cargo_2_temp+"C°");
    
    /*
    $('#temp1_'+res.telemetria_id).text(res.temp_supply_1);
    $('#return_'+res.telemetria_id).text(res.return_air);
    $('#s_temp_'+res.telemetria_id).val(res.set_point);
    $('#humd_'+res.telemetria_id).text(res.relative_humidity);
    $('#evap_'+res.telemetria_id).text(res.evaporation_coil);
    $('#s_humd_'+res.telemetria_id).val(res.humidity_set_point);
    $('#cargo1_'+res.telemetria_id).text(res.cargo_1_temp);
    $('#cargo2_'+res.telemetria_id).text(res.cargo_2_temp);
    $('#cargo3_'+res.telemetria_id).text(res.cargo_3_temp);
    $('#cargo4_'+res.telemetria_id).text(res.cargo_4_temp);
    $('#etileno_'+res.telemetria_id).text(res.ethylene);
    $('#sp_etileno_'+res.telemetria_id).val(res.sp_ethyleno);
    $('#co2_'+res.telemetria_id).text(res.co2_reading);
    $('#sp_co2_'+res.telemetria_id).val(res.set_point_co2);
    $('#h_inyeccion_'+res.telemetria_id).text(res.ripener_prueba);
    $('#n_apertura_'+res.telemetria_id).text(res.avl);
    $('#compresor_'+res.telemetria_id).text(res.compress_coil_1);
    $('#defrost_prueba_'+res.telemetria_id).text(res.defrost_prueba);*/
}

function registrarRespuesta(e) {
    e.preventDefault();
    const url = base_url + "AdminPage/registrar";
    const frm = document.getElementById("frmRegistrar");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                frm.reset();
                tblFormulario.ajax.reload();
                alertas(res.msg, res.icono);
        }
    }
}

function fProcesarGrafica(id){
    window.location = base_url + `Graph/index/${id}`;      

}

function modalReporte(id){
    const url = base_url + "AdminPage/ModalReporte/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            //console.log(res);
            let contenido = document.getElementById('contenido');
            contenido.innerHTML = res.text;
            $('#modalReporte').modal('show');
        }
    }
}
function alertas(msg, icono) {
    Swal.fire({
        position: 'top-end',
        icon: icono,
        title: msg,
        showConfirmButton: false,
        timer: 3000
    })
}
function c_f(temp,data=0){
    if(data==0){
        res = temp==0 ? 'C' :'F';
        //temp_c_f.value=temp;
    }else{res= temp==0 ? data: parseInt((data*9)/5 +32);}
    return res;
}

async function graficaMPDF(id){
    let contenedor = document.getElementById('nombre_contenedor').value;
    const response = await fetch(base_url + "AdminPage/DataReporte/"+ contenedor + "/" +id, {method: "GET", });
    let res = await response.json();
    //console.log(recorrer);
    let datosTabla = [];
    // Obtener la longitud del array de datos
    for(let i=0; i<res.length; i++){
        let fecha = res[i].created_at;
        let setPoint = res[i].set_point;
        let tmpSupply = res[i].temp_supply_1;
        let evaporationCoil = res[i].evaporation_coil;
        let compressCoil = res[i].compress_coil_1;
        let relativeHumidity = res[i].relative_humidity;
        let co2 = res[i].co2_reading;
        //let powerkwh = res[i].power_kwh;
        //let powerState = res[i].power_state;
        let spHumidity = res[i].humidity_set_point;
        let ethylene = res[i].ethylene;
        let stateProcess = res[i].stateProcess;
        let spEthyleno = res[i].sp_ethyleno;
          
        datosTabla.push({
            created_at: fecha,
            set_point: setPoint,
            temp_supply_1: tmpSupply,
            evaporation_coil: evaporationCoil,
            compress_coil_1: compressCoil,
            relative_humidity: relativeHumidity,
            co2_reading: co2,
            //power_kwh: powerkwh,
            //power_state: powerState,
            humidity_set_point: spHumidity,
            ethylene: ethylene,
            stateProcess: stateProcess,
            sp_ethyleno: spEthyleno
        });
    }
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height= 400;
    document.body.appendChild(canvas);
    let labels = [datosTabla.map(item => item.created_at)];
    let setPoint = [datosTabla.map(item => item.set_point)];
    let tmpSupply = [datosTabla.map(item => item.temp_supply_1)];
    let evaporationCoil = [datosTabla.map(item => item.evaporation_coil)];
    let compressCoil = [datosTabla.map(item => item.compress_coil_1)];
    let relativeHumidity = [datosTabla.map(item => item.relative_humidity)];
    let co2 = [datosTabla.map(item => item.co2_reading)];
    let spHumidity = [datosTabla.map(item => item.humidity_set_point)];
    let ethylene = [datosTabla.map(item => item.ethylene)];
    let stateProcess = [datosTabla.map(item => item.stateProcess)];
    let spEthyleno = [datosTabla.map(item => item.sp_ethyleno)];
    let temp1 = 0;
    
    //let tituloGrafica = id;
    const textCenter = {
        id: 'textCenter',
        afterDatasetsDraw(chart, args, plugins) {
            const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
            ctx.save();
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = 'grey';
            //ctx.fillText(tituloGrafica.textContent, (width * 45) / 100, (height * 9) / 10);
        }
    };
    
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || '#ffffff';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };
    
    //GENERAR GRÁFICO
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type : 'line',
        plugins:[ChartDataLabels],
		data : {
			labels : labels[0],
            datasets: [
                {
                    label: 'Set',
                    data: setPoint[0],
                    borderColor: '#fdc204',
                    backgroundColor: '#fdc204',
                    borderWidth: 3, 
                    fill: false,
                    hidden:false,
                    pointRadius: 0,
                    spanGaps: true,
                    tension: -0.2,
                    yAxisID: "y",
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#fdc204',
                    datalabels:{
                        display:"false",
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'Tmp Supply',
                    data: tmpSupply[0],
                    borderColor: '#ff685a',
                    backgroundColor: '#ff685a',
                    borderWidth: 3,
                    fill: false,
                    hidden: false,
                    pointRadius: 0,
                    spanGaps: true,
                    tension: -0.2,
                    yAxisID: "y",
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#ff685a',
                    datalabels:{
                        display: "auto",
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'Evp Coil',
                    data: evaporationCoil[0],
                    borderColor: '#ecc0f2',
                    backgroundColor: '#ecc0f2',
                    borderWidth: 3,
                    fill: false,
                    pointRadius: 0,
                    spanGaps: true,
                    yAxisID: "y",
                    tension: -0.2,
                    hidden: false,
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#ecc0f2',
                    datalabels:{
                        display: "auto",
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'Cmprss Coil',
                    data: compressCoil[0],
                    borderColor: '#8dcd6b',
                    backgroundColor: '#8dcd6b',
                    borderWidth: 3,
                    fill: false,
                    hidden: false,
                    pointRadius: 0,
                    tension: -0.2,
                    spanGaps: true,
                    yAxisID: "y1",
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#8dcd6b',
                    datalabels:{
                        display: "auto",
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    //#ffffff
                    //#00b167
                    label: 'Humidity',
                    data: relativeHumidity[0],
                    borderColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    borderWidth: 3,
                    fill: false,
                    hidden: false,
                    pointRadius: 0,
                    spanGaps: true,
                    tension: -0.2,
                    yAxisID: "y",
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#ffffff',
                    datalabels:{
                        display: "auto",
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'CO2',
                    data: co2[0],
                    borderColor: '#90a6a7',
                    backgroundColor: '#90a6a7',
                    borderWidth: 3,
                    fill: false,
                    pointRadius: 0,
                    hidden: false,
                    tension: -0.2,
                    yAxisID: "y",
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#90a6a7',
                    datalabels:{
                        display: "auto",
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'SP Humidity',
                    data: spHumidity[0],
                    borderColor: '#efecec',
                    backgroundColor: '#efecec',
                    borderWidth: 3,
                    fill: false,
                    hidden: false,
                    pointRadius: 0,
                    spanGaps:true,
                    tension:-0.2,
                    yAxisID: "y",
                    cubicInterpolationMode: 'monotone',
                    pointBackgroundColor: '#efecec',
                    cubicInterpolationMode: 'monotone',
                    datalabels:{
                        display: "auto",
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'Ethylene',
                    data: ethylene[0],
                    borderColor: '#00b167',
                    backgroundColor: '#00b167',
                    backgroundColor: '#00b167',
                    borderWidth: 3,
                    fill: true,
                    hidden:false,
                    spanGaps: true,
                    tension: -0.2,
                    yAxisID: "y1",
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    datalabels:{
                        display: false,
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'State Process',
                    data: stateProcess[0],
                    borderColor: '#25608e',
                    backgroundColor: '#25608e',
                    backgroundColor: '#25608e',
                    borderWidth: 3,
                    fill: true,
                    hidden:false,
                    spanGaps: true,
                    tension: -0.2,
                    yAxisID: "y1",
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    datalabels:{
                        display: false,
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                },
                {
                    label: 'SP Ethylene',
                    data: spEthyleno[0],
                    borderColor: '#7243df',
                    backgroundColor: '#7243df',
                    backgroundColor: '#7243df',
                    borderWidth: 3,
                    fill: true,
                    hidden:false,
                    spanGaps: true,
                    tension: -0.2,
                    yAxisID: "y1",
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    datalabels:{
                        display: false,
                        align: "start",
                        clamp: "true",
                        clip: "true",
                    }
                }
            ]
		},
		options: {
            
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'ZTRACK - Live Telematic',
                        color: '#212529',
                        font: { 
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.1
                        },
                        padding: {top: -5, left: 0, right: 0, bottom: 0}
                      },
                    //offset:true,
                    alignToPixels:true,
                    time:{
                        minUnit:'minute',
                    },
                    clip :false,
                    ticks:{
                        major:{
                            enabled:true,
                            width:4
                        },
                        font :(context)=>{
                            //console.log(context.tick && context.tick.major)
                            const boldedTicks = context.tick && context.tick.major ? 'bold' :'';
                            return {weight:boldedTicks}
                        },
                        //padding:15,
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    display: true,
                    title: {
                        display: false,
                        text: 'temperature',
                        color: '#1a2c4e',
                        //reverse:true,
                        font: {     
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                    },
                    ticks:{
                        color:"blue",
                        callback :(value,index,ticks) =>{
                            return `${value}${c_f(temp1)}\u00B0`;
                        }
                    },
                    suggestedMin: c_f(temp1,10),
                    suggestedMax: c_f(temp1,20)
                },
                y1: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: 'Ethylene(ppm)',
                        color: '#1a2c4e',
                        font: { 
                            size: 20,
                            style: 'bold',
                            lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                      },
                      suggestedMin: 0,
                      suggestedMax: 10,
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                 }, y2: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: 'Percentage (%)',
                        color: '#1a2c4e',
                        font: {                      
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                    },
                    ticks:{
                        color:"red",
                        callback :(value,index,ticks) =>{
                            return `${value}\u2052`;
                        }
                    },
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                },
            },
            plugins:{
                datalabels: {
                    color: function(context) {
                      return context.dataset.backgroundColor;
                    },
                    font: {
                      weight: 'bold'
                    },          
                    padding: 6,
                  }
            },
            plugins : [ChartDataLabels, textCenter, plugin],
        }
    });
    await new Promise(resolve=>setTimeout(resolve,1000));
    const base64Image = canvas.toDataURL('image/png');
    document.body.removeChild(canvas);
    return base64Image;
    
}


async function reportToday(id) {
   
    const base64Image = await graficaMPDF(id);
    const cabecera = await base64_Header();
    const pie_de_pagina = await base64_Footer();
    let contenedor = document.getElementById('nombre_contenedor').value;
    let title = "Last 12 hours report - " + contenedor;
    const url = base_url + "AdminPage/DataReporte/"+contenedor+"/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);

            //created_at : [{created_at: '2024-09-16 14:02:21'},{created_at: '2024-09-16 14:01:51'}]
            let datosTabla = [];
            for(let i=0; i<res.length; i++){
                let fecha = res[i].created_at;
                let setPoint = res[i].set_point;
                let tmpSupply = res[i].temp_supply_1;
                let evaporationCoil = res[i].evaporation_coil;
                let compressCoil = res[i].compress_coil_1;
                let relativeHumidity = res[i].relative_humidity;
                let co2 = res[i].co2_reading;
                //let powerkwh = res[i].power_kwh;
                //let powerState = res[i].power_state;
                let spHumidity = res[i].humidity_set_point;
                let ethylene = res[i].ethylene;
                let stateProcess = res[i].stateProcess;
                let spEthyleno = res[i].sp_ethyleno;
                
                datosTabla.push({
                    created_at: fecha,
                    set_point: setPoint,
                    temp_supply_1: tmpSupply,
                    evaporation_coil: evaporationCoil,
                    compress_coil_1: compressCoil,
                    relative_humidity: relativeHumidity,
                    co2_reading: co2,
                    //power_kwh: powerkwh,
                    //power_state: powerState,
                    humidity_set_point: spHumidity,
                    ethylene: ethylene,
                    stateProcess: stateProcess,
                    sp_ethyleno: spEthyleno
                });
            }
            console.log(datosTabla);
            // Crear la estructura de la tabla
            let tableBody = [
                // Encabezados de la tabla
                [
                    { text: 'Date', style: 'tableHeader' },
                    { text: 'Set Point', style: 'tableHeader' },
                    { text: 'Tmp Supply', style: 'tableHeader' },
                    { text: 'Evp Coil', style: 'tableHeader' },
                    { text: 'Compress Coil', style: 'tableHeader' },
                    { text: 'Humidity', style: 'tableHeader' },
                    { text: 'CO2', style: 'tableHeader' },
                    //{ text: 'Pwr KWH', style: 'tableHeader' },
                    //{ text: 'Pwr State', style: 'tableHeader' },
                    { text: 'SP Humidity', style: 'tableHeader' },
                    { text: 'Ethylene', style: 'tableHeader' },
                    { text: 'State Process', style: 'tableHeader' },
                    { text: 'SP Ethylene', style: 'tableHeader' }

                ]
            ];

            // Agregar filas de datos a la tabla
            datosTabla.forEach(function (item) {
                tableBody.push([
                    item.created_at,
                    item.set_point,
                    item.temp_supply_1,
                    item.evaporation_coil,
                    item.compress_coil_1,
                    item.relative_humidity,
                    item.co2_reading,
                   //item.power_kwh,
                    //item.power_state,
                    item.humidity_set_point,
                    item.ethylene,
                    item.stateProcess,
                    item.sp_ethyleno
                ]);
            });
            // Definir el contenido del PDF
            let img_header = cabecera;
            let img_footer = pie_de_pagina;
           
            var docDefinition = 
                {
                    //pageMargins
                    pageMargins: [ 40, 60, 40, 60 ],
                    header: {
                        columns: [
                            {
                                image: img_header, 
                                alignment: 'center',
                                width: 575,
                                height:50,
                            }
                        ],
                        margin:[10,5]
                    },
                    footer:{
                        columns: [
                            {
                                image: img_footer,
                                alignment: 'center',
                                width: 575,
                                height:50
                            }
                        ],
                        margin:[10,0,10,0]
                    },
                    content:[
                      
                        {
                            text: title,
                            alignment: 'center',
                            margin: [0, 20, 0, 20] // Margen inferior para separar el texto de la tabla
                        },
                        {
                            image: base64Image,
                            width: 500,
                            height: 300,
                            alignment: 'center',
                            margin:[0,0]
                        },
                        {
                            alignment: 'center',
                            table: {
                                headerRows: 1,
                                body: tableBody,
                            },
                            //layout: 'exampleLayout',
                            margin: [-20, 50, 20, -20],
                            layout: 'exampleLayout',
                            pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                                return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
                            }
                        }   
                    ],
                    
                }
            
            pdfMake.tableLayouts = {
            exampleLayout: {
                hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
                },
                vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
                },
                paddingLeft: function (i, node) { return 4; },
                paddingRight: function (i, node) { return 4; },
                paddingTop: function (i, node) { return 4; },
                paddingBottom: function (i, node) { return 4; },
                fillColor: function (rowIndex, node, columnIndex) { return null; }
            }
            };
            // Generar y descargar el PDF
            pdfMake.createPdf(docDefinition).open();
        }
    };
}

async function procesarReporte(id){
    let fechaI = document.getElementById('fechaInicial').value;
    let fechaF = document.getElementById('fechaFin').value;
    let contenedor = document.getElementById('nombre_contenedor').value;
    let title = contenedor;
    const cabecera = await base64_Header();
    const pie_de_pagina = await base64_Footer();

    if(fechaI == '' || fechaF == ''){
        Swal.fire({
            title: 'Error',
            text: 'Seleccione un rango de fechas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }else{
        const response = await fetch(base_url + "AdminPage/DataReporte/"+ contenedor +"/"+id+"/"+fechaI+"/"+fechaF,{method: 'GET'});
        const res = await response.json();
        if(res=="mal"){
            Swal.fire({
                title: 'Error',
                text: 'Fecha Inicial mayor a Fecha Mayor!!',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }else if(res=="rango"){
            Swal.fire({
                title: 'Error',
                text: 'Búsqueda fuera de Rango , contacta al Administrador',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }else{
            let datosTabla = [];
            // Obtener la longitud del array de datos
            for(let i=0; i<res.length; i++){
                let fecha = res[i].created_at;
                let setPoint = res[i].set_point;
                let tmpSupply = res[i].temp_supply_1;
                let evaporationCoil = res[i].evaporation_coil;
                let compressCoil = res[i].compress_coil_1;
                let relativeHumidity = res[i].relative_humidity;
                let co2 = res[i].co2_reading;
                //let powerkwh = res[i].power_kwh;
                //let powerState = res[i].power_state;
                let spHumidity = res[i].humidity_set_point;
                let ethylene = res[i].ethylene;
                let stateProcess = res[i].stateProcess;
                let spEthyleno = res[i].sp_ethyleno;
                  
                datosTabla.push({
                    created_at: fecha,
                    set_point: setPoint,
                    temp_supply_1: tmpSupply,
                    evaporation_coil: evaporationCoil,
                    compress_coil_1: compressCoil,
                    relative_humidity: relativeHumidity,
                    co2_reading: co2,
                    //power_kwh: powerkwh,
                    //power_state: powerState,
                    humidity_set_point: spHumidity,
                    ethylene: ethylene,
                    stateProcess: stateProcess,
                    sp_ethyleno: spEthyleno
                });
            }

            let tableBody = [
                // Encabezados de la tabla
                [
                    { text: 'Date', style: 'tableHeader' },
                    { text: 'Set Point', style: 'tableHeader' },
                    { text: 'Tmp Supply', style: 'tableHeader' },
                    { text: 'Evp Coil', style: 'tableHeader' },
                    { text: 'Compress Coil', style: 'tableHeader' },
                    { text: 'Humidity', style: 'tableHeader' },
                    { text: 'CO2', style: 'tableHeader' },
                    //{ text: 'Pwr KWH', style: 'tableHeader' },
                    //{ text: 'Pwr State', style: 'tableHeader' },
                    { text: 'SP Humidity', style: 'tableHeader' },
                    { text: 'Ethylene', style: 'tableHeader' },
                    { text: 'State Process', style: 'tableHeader' },
                    { text: 'SP Ethylene', style: 'tableHeader' }

                ]
            ];

            // Agregar filas de datos a la tabla
            datosTabla.forEach(function (item) {
                tableBody.push([
                    item.created_at,
                    item.set_point,
                    item.temp_supply_1,
                    item.evaporation_coil,
                    item.compress_coil_1,
                    item.relative_humidity,
                    item.co2_reading,
                   //item.power_kwh,
                    //item.power_state,
                    item.humidity_set_point,
                    item.ethylene,
                    item.stateProcess,
                    item.sp_ethyleno
                ]);
            });

            const canvas = document.createElement('canvas');
            canvas.width = 900;
            canvas.height= 400;
            document.body.appendChild(canvas);
            let labels = [datosTabla.map(item => item.created_at)];
            let setPoint = [datosTabla.map(item => item.set_point)];
            let tmpSupply = [datosTabla.map(item => item.temp_supply_1)];
            let evaporationCoil = [datosTabla.map(item => item.evaporation_coil)];
            let compressCoil = [datosTabla.map(item => item.compress_coil_1)];
            let relativeHumidity = [datosTabla.map(item => item.relative_humidity)];
            let co2 = [datosTabla.map(item => item.co2_reading)];
            let spHumidity = [datosTabla.map(item => item.humidity_set_point)];
            let ethylene = [datosTabla.map(item => item.ethylene)];
            let stateProcess = [datosTabla.map(item => item.stateProcess)];
            let spEthyleno = [datosTabla.map(item => item.sp_ethyleno)];
            let temp1 = 0;
            
            //let tituloGrafica = id;
            const textCenter = {
                id: 'textCenter',
                afterDatasetsDraw(chart, args, plugins) {
                    const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
                    ctx.save();
                    ctx.font = 'bold 15px sans-serif';
                    ctx.fillStyle = 'grey';
                    //ctx.fillText(tituloGrafica.textContent, (width * 45) / 100, (height * 9) / 10);
                }
            };
            
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                    const { ctx } = chart;
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = options.color || '#ffffff';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            };
            
            //GENERAR GRÁFICO
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type : 'line',
                plugins:[ChartDataLabels],
                data : {
                    labels : labels[0],
                    datasets: [
                        {
                            label: 'Set',
                            data: setPoint[0],
                            borderColor: '#fdc204',
                            backgroundColor: '#fdc204',
                            borderWidth: 3, 
                            fill: false,
                            hidden:false,
                            pointRadius: 0,
                            spanGaps: true,
                            tension: -0.2,
                            yAxisID: "y",
                            cubicInterpolationMode: 'monotone',
                            pointBackgroundColor: '#fdc204',
                            datalabels:{
                                display:"false",
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'Tmp Supply',
                            data: tmpSupply[0],
                            borderColor: '#ff685a',
                            backgroundColor: '#ff685a',
                            borderWidth: 3,
                            fill: false,
                            hidden: false,
                            pointRadius: 0,
                            spanGaps: true,
                            tension: -0.2,
                            yAxisID: "y",
                            cubicInterpolationMode: 'monotone',
                            pointBackgroundColor: '#ff685a',
                            datalabels:{
                                display: "auto",
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'Evp Coil',
                            data: evaporationCoil[0],
                            borderColor: '#ecc0f2',
                            backgroundColor: '#ecc0f2',
                            borderWidth: 3,
                            fill: false,
                            pointRadius: 0,
                            spanGaps: true,
                            yAxisID: "y",
                            tension: -0.2,
                            hidden: false,
                            cubicInterpolationMode: 'monotone',
                            pointBackgroundColor: '#ecc0f2',
                            datalabels:{
                                display: "auto",
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'Cmprss Coil',
                            data: compressCoil[0],
                            borderColor: '#8dcd6b',
                            backgroundColor: '#8dcd6b',
                            borderWidth: 3,
                            fill: false,
                            hidden: false,
                            pointRadius: 0,
                            tension: -0.2,
                            spanGaps: true,
                            yAxisID: "y1",
                            cubicInterpolationMode: 'monotone',
                            pointBackgroundColor: '#8dcd6b',
                            datalabels:{
                                display: "auto",
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            //#ffffff
                            //#00b167
                            label: 'Humidity',
                            data: relativeHumidity[0],
                            borderColor: '#ffffff',
                            backgroundColor: '#ffffff',
                            borderWidth: 3,
                            fill: false,
                            hidden: false,
                            pointRadius: 0,
                            spanGaps: true,
                            tension: -0.2,
                            yAxisID: "y",
                            cubicInterpolationMode: 'monotone',
                            pointBackgroundColor: '#ffffff',
                            datalabels:{
                                display: "auto",
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'CO2',
                            data: co2[0],
                            borderColor: '#90a6a7',
                            backgroundColor: '#90a6a7',
                            borderWidth: 3,
                            fill: false,
                            pointRadius: 0,
                            hidden: false,
                            tension: -0.2,
                            yAxisID: "y",
                            cubicInterpolationMode: 'monotone',
                            pointBackgroundColor: '#90a6a7',
                            datalabels:{
                                display: "auto",
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'SP Humidity',
                            data: spHumidity[0],
                            borderColor: '#efecec',
                            backgroundColor: '#efecec',
                            borderWidth: 3,
                            fill: false,
                            hidden: false,
                            pointRadius: 0,
                            spanGaps:true,
                            tension:-0.2,
                            yAxisID: "y",
                            cubicInterpolationMode: 'monotone',
                            pointBackgroundColor: '#efecec',
                            cubicInterpolationMode: 'monotone',
                            datalabels:{
                                display: "auto",
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'Ethylene',
                            data: ethylene[0],
                            borderColor: '#00b167',
                            backgroundColor: '#00b167',
                            backgroundColor: '#00b167',
                            borderWidth: 3,
                            fill: true,
                            hidden:false,
                            spanGaps: true,
                            tension: -0.2,
                            yAxisID: "y1",
                            pointRadius: 0,
                            cubicInterpolationMode: 'monotone',
                            datalabels:{
                                display: false,
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'State Process',
                            data: stateProcess[0],
                            borderColor: '#25608e',
                            backgroundColor: '#25608e',
                            backgroundColor: '#25608e',
                            borderWidth: 3,
                            fill: true,
                            hidden:false,
                            spanGaps: true,
                            tension: -0.2,
                            yAxisID: "y1",
                            pointRadius: 0,
                            cubicInterpolationMode: 'monotone',
                            datalabels:{
                                display: false,
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        },
                        {
                            label: 'SP Ethylene',
                            data: spEthyleno[0],
                            borderColor: '#7243df',
                            backgroundColor: '#7243df',
                            backgroundColor: '#7243df',
                            borderWidth: 3,
                            fill: true,
                            hidden:false,
                            spanGaps: true,
                            tension: -0.2,
                            yAxisID: "y1",
                            pointRadius: 0,
                            cubicInterpolationMode: 'monotone',
                            datalabels:{
                                display: false,
                                align: "start",
                                clamp: "true",
                                clip: "true",
                            }
                        }
                    ]
                },
                options: {
                    
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'ZTRACK - Live Telematic',
                                color: '#212529',
                                font: { 
                                    size: 20,
                                    style: 'normal',
                                    lineHeight: 1.1
                                },
                                padding: {top: -5, left: 0, right: 0, bottom: 0}
                            },
                            //offset:true,
                            alignToPixels:true,
                            time:{
                                minUnit:'minute',
                            },
                            clip :false,
                            ticks:{
                                major:{
                                    enabled:true,
                                    width:4
                                },
                                font :(context)=>{
                                    //console.log(context.tick && context.tick.major)
                                    const boldedTicks = context.tick && context.tick.major ? 'bold' :'';
                                    return {weight:boldedTicks}
                                },
                                //padding:15,
                            }
                        },
                        y: {
                            type: 'linear',
                            position: 'left',
                            display: true,
                            title: {
                                display: false,
                                text: 'temperature',
                                color: '#1a2c4e',
                                //reverse:true,
                                font: {     
                                    size: 20,
                                    style: 'normal',
                                    lineHeight: 1.2
                                },
                                padding: {top: 30, left: 0, right: 0, bottom: 0}
                            },
                            ticks:{
                                color:"blue",
                                callback :(value,index,ticks) =>{
                                    return `${value}${c_f(temp1)}\u00B0`;
                                }
                            },
                            suggestedMin: c_f(temp1,10),
                            suggestedMax: c_f(temp1,20)
                        },
                        y1: {
                            type: 'linear',
                            display: false,
                            position: 'right',
                            beginAtZero: true,
                            title: {
                                display: false,
                                text: 'Ethylene(ppm)',
                                color: '#1a2c4e',
                                font: { 
                                    size: 20,
                                    style: 'bold',
                                    lineHeight: 1.2
                                },
                                padding: {top: 30, left: 0, right: 0, bottom: 0}
                            },
                            suggestedMin: 0,
                            suggestedMax: 10,
                            grid: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                        }, y2: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            beginAtZero: true,
                            title: {
                                display: false,
                                text: 'Percentage (%)',
                                color: '#1a2c4e',
                                font: {                      
                                    size: 20,
                                    style: 'normal',
                                    lineHeight: 1.2
                                },
                                padding: {top: 30, left: 0, right: 0, bottom: 0}
                            },
                            ticks:{
                                color:"red",
                                callback :(value,index,ticks) =>{
                                    return `${value}\u2052`;
                                }
                            },
                            grid: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                        },
                    },
                    plugins:{
                        datalabels: {
                            color: function(context) {
                            return context.dataset.backgroundColor;
                            },
                            font: {
                            weight: 'bold'
                            },          
                            padding: 6,
                        }
                    },
                    plugins : [ChartDataLabels, textCenter, plugin],
                }
            });
            await new Promise(resolve=>setTimeout(resolve,1000));
            const base64Image = canvas.toDataURL('image/png');
            document.body.removeChild(canvas);
            // Definir el contenido del PDF
            let img_header = cabecera;
            let img_footer = pie_de_pagina;  
            var docDefinition = 
                {
                    //pageMargins
                    pageMargins: [ 40, 60, 40, 60 ],
                    header: {
                        columns: [
                            {
                                image: img_header, 
                                alignment: 'center',
                                width: 575,
                                height:50,
                                
                            }
                        ],
                        margin:[10,5]
                    },
                    footer:{
                        columns: [
                            {
                                image: img_footer,
                                alignment: 'center',
                                width: 575,
                                height:50
                            }
                        ],
                        margin:[10,0,10,0]
                    },
                    content:[    
                        {
                            text: title,
                            alignment: 'center',
                            margin: [0, 20, 0, 20] // Margen inferior para separar el texto de la tabla
                        },
                        {
                            image: base64Image,
                            width: 500,
                            height: 300,
                            alignment: 'center',
                        },
                        {
                            alignment: 'center',
                            table: {
                                headerRows: 1,
                                body: tableBody,
                            },
                            //layout: 'exampleLayout',
                            margin: [-20, 50, -20, 50],
                            layout: 'exampleLayout',
                            pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                                return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
                            }
                        }   
                    ],   
                }
            pdfMake.tableLayouts = {
            exampleLayout: {
                hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
                },
                vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
                },
                paddingLeft: function (i, node) { return 4; },
                paddingRight: function (i, node) { return 4; },
                paddingTop: function (i, node) { return 4; },
                paddingBottom: function (i, node) { return 4; },
                fillColor: function (rowIndex, node, columnIndex) { return null; }
            }
            };
            // Generar y descargar el PDF
            pdfMake.createPdf(docDefinition).open();
        }
    }
}

async function base64_Header(){
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAACKCAYAAAD19+fuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAGHxSURBVHhe7d0HfFTF2gbwKJ1s6D3U9IQQSui9hU7oiBQpCiIIooiKqIAFULGAiig2LCiooEhRUZAmTaVXQXoNISRACoQ8d97Z3bC7ObvZhMAl4Znv+1+S3XPmlF30dx7fmfEAGxsbGxsbGxsbGxsbGxsbGxsbW45tHpu37wMRERERERERERHlRPvhERQxCERERERERERERJTzBLcZDI/8Qe1BREREREREREREOU+B4A7w8KrWGURERERERERERJTzFAqLZABIRERERERERESUUzEAJCIiIiIiIiIiysEYABIREREREREREeVgDACJiIiIiIiIiIhyMAaAREREREREREREORgDQCIiIiIiIiIiohyMASAREREREREREVEOxgCQiIiIiIiIiIgoB2MASERERERERERElIMxACQiIiIiIiIiIsrBGAASERERERERERHlYAwAiYiIiIiIiIiIcjAGgERERERERERERDkYA0AiIiIiIiIiIqIcjAEgERERERERERFRDsYAkIiIiIiIiIiIKAdjAEhERERERERERJSDMQAkIiIiIiIiIiLKwRgAEhERERERERER5WAMAImIiIiIiIiIiHIwBoBEREREREREREQ5GANAIiIiIiIiIiKiHIwBIBERERERERERUQ7GAJCIiIiIiIiIiCgHYwBIRERERERERESUgzEAJCIiIiIiIiIiysEYABIREREREREREeVgDACJiIiIiIiIiIhyMAaAREREREREREREORgDQCIiIiIiIiIiohyMASARERERERERuSESXmFKtS7mPx3J67KNZrQ/Ef2/MAAkIiIiIiIiImNhlrAvVP0c2gleVdvDK6QNCgVHwCtItDZTv5uC2prfl+30vmq/6hIKdkbBqh1RMKTjjT7ldR0cyp+Wn/W2wnJsIsoyDACJiIiIiIiIyJ6EctU6wSuoDbz8msOrSkN4VqiD/GWrI0/JqshdLBh5igejQOlq8CxXHZ7eNZVaMFUIh2elejBVaQQv/2bI79cSuX1bo3CNrihVt7cOIUzBqs+AluZ+fZuY+TWDKaAFTHI8Oa4+PisJibIKA0AiIiIi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lX83+uoEz0r19dx9xsFexugqwjJhMAVFmM/T7ryJKKMYABIRERERERHdtSRcswRsEgZWbacX9vCSVXn9W8IrRH5vB5N/C8vv7fVCIoaVecFt9bDgm68CtArRlYUMAIluHgNAIiIiIiIiIlJsgzaj0M029DN6X4YCNzfPE+hGCFhQLxZi+1raffRiIAwAiW4aA0AiIiIiIiIiyhqhnWDyaaTDPLsVg9MIhWfl+nquP/N2ITCVqwmTd039s3UbU2Ar1S8DQKKbxQCQiIiIiIiIiLKOhIBVZN5Ay1x+soCIBHqpfwbDs3w4vPxbWLYxzxsow31N5Wur94OUEJgq1IFX1Y7GxyCiDGEASERERERERERZKFKvMiwLheg5Aa0rCOuFPUJ1lZ9XYCuYAlvDVL6WDgP1oiKWfUzetXSA6BXS1qBvIsoMBoBERERERERElPVksZCgCHNln28Ts4AWerEQ/Z4sOiKLjKQuLKL2qdrB/Lv86dgfEWUaA0AiIiIiIiIiugUsc/eFCgn8bBcRsZJtrGxfs92GiG4WA0AiIiIiIiIiIqIcjAEgERERERERERFRDsYAkIiIiIiIiIiIKAdjAEhERERERERERJSDMQAkIiIiIiIiIiLKwRgAEhERERERERER5WAMAImIiIiIiIiIiHIwBoBEREREREREREQ5GANAIiIiIiIiIiKiHIwBIBERERERERERUQ7GAJCIiIiIiIiIiCgHYwBIRERERERERESUgzEAJCIiIiIiIiIiysEYABIREREREREREeVgDACJiIiIiIiIiIhyMAaAREREREREREREORgDQCIiIiIiIiIiohyMASAREREREREREVEOxgCQiIiIiIiIiIgoB2MASERERERERERElIMxACQiIiIiIiIiIsrBGAASERERERERERHlYAwAiYiIiIiIiIiIcjAGgERERERERERERDmYDgBNoZ1AREREREREREREOY9XtUh4FK7eBURERERERERERJTzFKnRFR4RDzwFIiIiIiIiIiIiypk8ytTrBSIiIiIiIiIiIsp5ytbvDY+CVTuCiIiIiIiIiIiIch7P0E5cBZiIiIiIiIiIiCin0qsAG71BRERERERERERE2R8DQCIiIiIiIiIiohysUFgk/gd3lN6rFS5asgAAAABJRU5ErkJggg==';
}
async function base64_Footer(){
    return 'data:image/jpg;base64,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TknZo5Wiu21T4K+NtF8dWXg2+8PXNr4lvsfZbKR0xcAgkMkmdjKcHkHFdn/wxp8Z+QvgW6cgFiEuYGOAMk4D80nUglfmQ1Tm+h4tRXqXhX9mH4n+ONEh1jQ/Cc9/pszMiTrcwqCysVYYZweCD2rA+I3we8Y/CSewh8XaFNokl8hkthM6P5qg4JBUkdafPG9r6i5JWvY4yiuk0/4c+JNV8Fan4vtNIuJfDOmTJb3epYAiikbovJ5P06VznPeqTT2Jaa3Ep0f3hTadH94UxDaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKWkpR1oA9z/ZW034m/EXx5p3gLwN4p1fw/p1zMbrUJrG4aOK2hGPMlbHGccD1Ne2ftPfG6x+Nnxq8B/BrR9SmvPh/oeqW2n3V3NIXbUpw4WSRmP3gMEA+pJrmv2T/2pvhj8CPhb4j8P+IPDWt3Wu6+8kV9qekyKjtbkYWNXyGXAz09a4b4peOvgI/huKb4W+D/ABJ4c8ZW97Dc2+o6jemWNAjbmyCxySQK8yUXKs24PsvXuz0lJRopKa8z6r/af1Dxx49/aSj+DnhHx3a/C7w14f0e3uLbzbg2kNwzAYXIIyRwAK808L/DTxt8L/8AgoJ8L7Dx74qXxjr115c/9pKzMfKEbqiktzwBTNb/AGtPgf8AHaPw/rXxg8AaufGukRRxnUdEn2pclCGBPIOMjODnFcz46/bI8NeLP2uvBHxWt9C1K00Dw7Atu1m7K1xKFVhkdh94cVjCnV5eRR6O+nU6JSpt87l109D7amtvEHwb+Inxf+KHjH4iLrnw1jjkVfClozXJtmYAKkigkRnnGMD73NfM/wCy3rx+G/7G/wAcfih4Xt1s/FE19NHb3CqC9rFvAQL6AByfqM1514P/AG09N8OftFfEXxRd6Pean8OPHDSL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pgRWZl4mmbPO7ZkDHrXKeAfiR4n+Futyat4U1m50XU5Imt3urcjc8bcspz1BqpRbm5RWy0JUkoKMnu9T6j1bxdbeIf2c/jB4Y8L6fdWvgnw0mm2elRvAyyXbecTNdvxy8jZPsMV8bt1r6S8O/twePrP4a+NdF1bxNql9ruqi3XTL5VjCWqqT5ob5f4lOK+bpnMkjOx3MxLE+pJyTRQpzhzcyCvOM1HlYynR/eFNp0f3hXUco2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAClpKWgB1J3xX1h+xH8C/h78V/DPxJ1zx/pt/qVr4ato7mKPT7hon27WZwAOpOK5PxzD8DvGPivwFpPw48MeJND+26vFb6odamY+bA7Ku1CTweTzXP9YjzuCT0Ov2D5FO61PntqXt1r7U/b6/ZJ8FfAnw3oPiLwDBcw6f9tk07VI57lpvLl2hkOW6Z5FdH4U/Yt8B2/7HN5418Q2t0/j/APsKTW4wt0yLCjE+UDGODwPxqPrVNxU+7sP6rU53HsfBA5zmjHvX0f8AsU/Avwr8WtU8WeIfiEsw8DeGdNFxeNFI0RaVz8o3D0GTisP9sT4I6Z8DfjJ/Znh9JR4T1S1g1HSWlYuTDIBuXceTg/zrRVoup7LqZexl7P2nQ8Mor7K+PP7MfgTwD8evgn4U0eyuodH8VW9u+pxyXLOzl2w21jyv4V4z+198MdB+D/7QHiTwp4ZgkttGslhMEU0pkYbkBPzHk81NOvGpJJLfUqdCVNNt7HjNKMmu/wBY+BPjHQfhHpPxLvdOjj8I6pN5FtdLODIzZIBKdQDg4PtVL4aeIPBfh6+vZPGnhK48W2skarbwW+otZmF88sWX72Rxit+dNNx1MeRp66HHUuD+FfU3jfw/8G9D+BWjeMpvh1qHh/XNdv1Gj6VJrckz3Nkh/fTtkfIp+6pxz1qxoNr8C9a+Cvizx/8A8Ko1KE6Fqdrpw0//AISGU+d5ylt+7HGMfjXP9YVr8r3sbfV3e3Mj5QxSc9q+kfhzoPwq8ReE/ir49v8AwJfS6JoH2EadoK6vIrRmVirlpurdM9KxfH3gHwD4q+Bz/E7wHp2p+GP7P1hNH1LRtQvPtcbl03JJDJjP1Wr9sr2afYXsXa913PCee9GPwr6R+CP7Oeh+PvgzrOq6xNLb+MNbN1H4PhVyFma0TzLglf4twyo9xXnPwC+EUXxc8X3ttq1/JonhrRbKTVNb1BF3PBbx9VQHq7H5RnvT9tH3vIXspe75nmn8qK9s1nx58Cp7O/sNL+FesQr5TpZaxJr7m4L4+SSSPG3BPJUVaf8AZ/Pin4Y/B6bwpYSXHirxXJfC+kklIgSOGTAlYniNFXJLUe1SV5KwexbbUdbHhJX060L9a9f8YfD/AML678QPDnw6+GQk13VVcWd74gmlIi1C6P8ArHjTokMeG57hc16D4Z+D/gu4a7sfDXgHX/i19hm+yXniKTVV0uxkuBw0dspI34PAyST6UpVoxSdgVFtvU+X+tFey/FP4T6DpGgjxh4Xh1O10qx1QaVr3hrWHDXmk3Q+byzIv343GQG6g16V8E9M+Cvxh8XHTB8JNQ0rSbG1e/wBX1mfxJKY7G2QZaVhjkk8Be5NJ10o8yQKi3LlbPlD2o6+9e6+A/hb4H8dax8QPHF9Pf6B8IvDM2Y4IG8y9ujI2ILZGbgMwGSx6Cs/W/iB8E9R0jULKy+FGp6NeGJhZajH4gklkWX+FpEYbWHqBin7VN2SbD2dlq0eNUewFfQngfw18NvC37N9h498X+D7vxbql94gm0pVg1R7NY0SMMD8vBPNM8cfAXQ/FUfwq1j4ZRX9jY/EG4ksYdI1aYTSWVxHJschwAXjxzn2o9sm7Pbv6D9i7XW/Y+fs+9Hp+VfRXi68+A3wr8S3nhAeB9V8fSaXKbS/8Ryaw9q00y8SG3iQbQoOQN2c4qVf2d/DUfx++FWn2N3daz8N/HzwXNjLOdlwIWJEkDsP40YYyOvWkq0eqt2B0Xsnc+cBn0o+tbvibSbfS/HmraVArCzttVltI1JyfLWYoBn6CvpPTfgF4Gt/2uvFHgq8026u/CekaJLqaWS3TJI7pbLLjzOuCxNVKqoq77XJjSctvQ+T2z+NN5r6M0rwZ8Lfjf4F8b3fg7w7q3gbxP4X0w6wsU+om9s7yBWCujbhlH5yDnmvEPAfg3UfiN4y0LwzpCCTU9Yu47SAN0DMep9gMn8KcaiabeltwlTaatrcxOlFfRXiy6+Avwn8R3XhIeCtV+Ik+my/ZtQ8Qy6u9mJZlOJPs8acBQcgbs5xWL8M/hp4J1/S/G/xJ8TR6nYfDfQLlLez0i3nBvL64lOYrbzSOAByzYzU+2VuZp2K9i78ulzw/nrR9a+kfBOg/CL9obV38GeHvCN/8OvF91DI2jXg1R722upkUsIJkfkFgCAy96v8A7Nf7O3hb4p/DH4gjxBFcW/jK2vxpOiSJMVRLzymcRsvRtxRhzUyrqKbkrNfqCouVrPQ+XlpfavRfgT8Ml+JPxY07w/qwe10u2Mt1rMgO0wW0AJl57HI2/U1rftVeAfD3wy+OOt+H/CsEttoMMVvNbRTyGRwskYfljyeta+0XtPZ9TP2b5OfoeSAGg9ete/8Awz8L/DvRf2dtS8feMPCV34rv08RrpEUMGpPaKkZh35+Xqc1P4m+D/gbWbP4UeM/B8Wpad4Y8X63/AGNe6LqU/my2sqSqsnlygAshDcHtUe3SdmvI09i2rpnzzSN1r6Q+MWpfBH4eeO/F/hC0+FOoy3Wk3U1hDqDeIJcF14WQpj15x7V83t1q4S51zJWInHk0uNp0f3hTadH94VoZDaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKWkpRQB+gH/AAS/m1iDwb8ZpdAtVvNaS0hNlBIoZZJtjbFIPByfWuG+Ml/8cNZ+JPwkuvi74RsvDNvHrsMenvZW8UXmuZELqdhOcDHWvlTw5428ReD/AD/7A13UdF8/HnfYLlovMx0zg84qfWviJ4q8SyWb6v4l1XVHs5PNtjd3TyGF/wC8uTwf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CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnKabRQB9m/BP9q74PeAf2cz8MvEHhDxBcyaluk1u60ucQm8ct03ghtuMDHtXi3x28S/BTXtF02H4VeEdZ8Nagkzm9l1S6MqSRFcKqgk4IPNeN0VzRoRhPnTf3nTLESlHlaX3H0P8dP2jtD+KfwD+FPgPTtOvrTUfCMZS6uLjb5UuYwvyY56jvSW/wC0jo9v+xn/AMKfSxv4/EK6wdTTUkIEKjzN4weu4fzr55oqvYwso9E7k+3ndy7qx9eat+1j8PPihafCzWPiJ4d1a68b+DbiM3eoaeIzHqcEf3UfPOchW+oPrWJ8YP2+/iV4u+Keoa74Q8Vaz4b8MmWM2ejLMFVY0xkOBxlsHP1r5eoqFhqad7FPE1GrXPsH4iftyadd/tBeDvi54M0a8tNbstOGn65aagVEV8mACFK89Oh9hR48+NX7LfjKbWfE3/Crtej8WamskhtVutlolyyn94QDj7xz05r4+opLDU1Zq6t5j+szd72d/I+h7P8AaQ0a1/Y0m+D62F9H4gbWW1NNQjKiBAZd4GeuRx+NbvxR/ai8G/HX4Y+AbPxzoOo3PjvwzPDFcapbFRFf2YYeZG5+8CyjPs2fWvluiq+rwvzLe9xfWJ2s9rWPsX4dftQfBn4L/Gjxd4z8FeDNW0+zutGWw0azXbi3nKkyytkkgE7eh6A+tc98Ff2/PiP4L+KFhrXjTxTrXijwxmUXmkNMGUqwONgPGVOMe1fLdFL6tS1ur3H9Zqq1nY+r9H/aq8EeF/APxz8MaPourQW/ju7e50vcUAtA4GVkx6HPSvlS3k8ueKRyWKurMc5JwQf6VHRWlOlGnfl6mU6sqlr9D6D/AGwP2jNG/aK1zwfeaJYX+mwaLo66bPHeMP3jhs7gB2r59PtSUVVOnGnFRjsiak5VJc0gp0f3hTadH94VoQNop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2inbaNtADaKdto20ANop22jbQA2nR/eFG2lUfMKAIdo9KNo9KKKwOkNo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KNo9KKKADaPSjaPSiigA2j0o2j0oooANo9KMD0oooA//2Q==';
}