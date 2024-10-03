
let idtelemetria = $('#telemetria_id').val();
let partes = idtelemetria.split(',');
let tblData = document.getElementById('tblData');

let valor1 = partes[0]; //id telemetria
let valor2 = partes[1]; // nombre contenedor

function retornar(){
    window.location = base_url + "AdminPage";
}


document.addEventListener("DOMContentLoaded", async function(){
    try{
        /*
        tituloGrafica.textContent =valor2;
        const response1 = await fetch(base_url + "Data/GraficaInicial/"+valor2+"/"+valor1, {method: "GET", });
        const result = await response1.json();
        tablaData();
        console.log(result);*/
        tablaData();

    }catch(err){alert(err);}
 
     /*
     const url = base_url + 'Graph/graph';
     const http = new XMLHttpRequest();
     http.open("GET", url, true);
     http.send();
     http.onreadystatechange = function(){
         if(this.readyState == 4 && this.status == 200){
             let data = JSON.parse(this.responseText);
             $('#content').html(data.text);
             console.log(data);
         }
     }*/
 });

 function procesarFecha(){
    let fechai = document.getElementById('fechaInicial').value;
    let fechaf = document.getElementById('fechaFin').value;
    if(fechai == "" || fechaf == ""){
        Swal.fire({
            title: 'Error',
            text: 'Seleccione un rango de fechas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }else{
        const url = base_url + "Data/GraficaInicial/"+valor2+"/"+valor1+"/"+fechai+"/"+fechaf;
        const http = new XMLHttpRequest();
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let res = JSON.parse(this.responseText);
                if ($.fn.DataTable.isDataTable('#tblData')) {
                    // Destruir la instancia existente
                    $('#tblData').DataTable().clear().destroy();
                }
                const buttons = [
                    {
                        extend: 'excel',
                        text: '<i class="ri-file-excel-2-line fs-6"></i>',
                        className: 'btn btn-success',
                        titleAttr: 'Exportar a Excel'
                    },
                    {
                        extend: 'pdf',
                        text: '<i class="ri-file-pdf-2-line fs-6"></i>',
                        className: 'btn btn-danger',
                        titleAttr: 'Exportar a PDF',
                        orientation: 'landscape', //orientacion
                        customize: function (doc) {
                            doc.defaultStyle.fontSize = 4; // tamaño de contenido
                            doc.styles.tableHeader.fontSize = 4; //tamaño de encabezado
                            doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split(''); //ancho
                            doc.pageMargins = [10, 10, 10, 10]; // margenes
                            doc.content.splice(0, 1); //borra titulo 

                        }
                    },
                    {
                        extend: 'print',
                        text: '<i class="ri-printer-line fs-6"></i>',
                        className: 'btn btn-info',
                        titleAttr: 'Imprimir'
                    }
                ];
                tblData = $('#tblData').dataTable({
                    pageLength:10,
                    data: res,
                    responsive: true,
                    order: [[0, 'desc']], 
                    columns: [
                        { 'data': 'created_at' },
                        { 'data': 'set_point' },
                        { 'data': 'temp_supply_1' },
                        { 'data': 'evaporation_coil' },
                        { 'data': 'compress_coil_1' },
                        { 'data': 'cargo_1_temp' },
                        { 'data': 'cargo_2_temp'},
                        { 'data': 'cargo_3_temp' },
                        { 'data': 'cargo_4_temp'},
                        { 'data': 'relative_humidity' },
                        { 'data': 'consumption_ph_1'},
                        { 'data': 'consumption_ph_2'},
                        { 'data': 'consumption_ph_3'},
                        { 'data': 'co2_reading'},
                        { 'data': 'power_kwh'},
                        { 'data': 'power_state'},
                        { 'data': 'humidity_set_point'},
                        { 'data': 'ethylene'},
                        { 'data': 'stateProcess'},
                        { 'data': 'sp_ethyleno'}
                    ],
                    language: 'es',
                    dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                    buttons
                });
            }
        }
    }
 }

 function tablaData(){
    tituloGrafica.textContent =valor2;
    //let fechai = document.getElementById('fechaInicial').value;
    //let fechaf = document.getElementById('fechaFin').value;
    const url = base_url + "Data/GraficaInicial/"+valor2+"/"+valor1;
     const http = new XMLHttpRequest();
     http.open("GET", url);
     http.send();
     http.onreadystatechange = function(){
         if(this.readyState == 4 && this.status == 200){
            let res = JSON.parse(this.responseText);
            
            if ($.fn.DataTable.isDataTable('#tblData')) {
                // Destruir la instancia existente
                $('#tblData').DataTable().clear().destroy();
            }
            const buttons = [
                {
                    extend: 'excel',
                    text: '<i class="ri-file-excel-2-line fs-6"></i>',
                    className: 'btn btn-success',
                    titleAttr: 'Exportar a Excel'
                },
                {
                    extend: 'pdf',
                    text: '<i class="ri-file-pdf-2-line fs-6"></i>',
                    className: 'btn btn-danger',
                    titleAttr: 'Exportar a PDF',
                    orientation: 'landscape', //orientacion
                    customize: function (doc) {
                        doc.defaultStyle.fontSize = 4; // tamaño de contenido
                        doc.styles.tableHeader.fontSize = 4; //tamaño de encabezado
                        doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split(''); //ancho
                        doc.pageMargins = [10, 10, 10, 10]; // margenes
                        doc.content.splice(0, 1); //borra titulo 

                    }
                },
                {
                    extend: 'print',
                    text: '<i class="ri-printer-line fs-6"></i>',
                    className: 'btn btn-info',
                    titleAttr: 'Imprimir'
                }
            ];
            tblData = $('#tblData').dataTable({
                pageLength:10,
                data: res,
                responsive: true,
                order: [[0, 'desc']], 
                columns: [
                    { 'data': 'created_at' },
                    { 'data': 'set_point' },
                    { 'data': 'temp_supply_1' },
                    { 'data': 'evaporation_coil' },
                    { 'data': 'compress_coil_1' },
                    { 'data': 'cargo_1_temp' },
                    { 'data': 'cargo_2_temp'},
                    { 'data': 'cargo_3_temp' },
                    { 'data': 'cargo_4_temp'},
                    { 'data': 'relative_humidity' },
                    { 'data': 'consumption_ph_1'},
                    { 'data': 'consumption_ph_2'},
                    { 'data': 'consumption_ph_3'},
                    { 'data': 'co2_reading'},
                    { 'data': 'power_kwh'},
                    { 'data': 'power_state'},
                    { 'data': 'humidity_set_point'},
                    { 'data': 'ethylene'},
                    { 'data': 'stateProcess'},
                    { 'data': 'sp_ethyleno'}
                ],
                language: 'es',
                dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons
            }); 
         }
     }
     
 }


 /*
 ,
        columnDefs:[
            {
                targets: 6,
                render: function(data, type, row, meta){
                    if (data === 1) {
                        return '<span class="badge bg-success">Abierto</span>';
                    }else if (data === 0) {
                        return '<span class="badge bg-danger">Cerrado</span>';
                    }
                }
            }
        ],
 
 
 */