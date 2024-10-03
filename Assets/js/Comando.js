$(document).ready(function(){
    const url = base_url + "Comando/ListaHistoricaComandos";
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function(){
         if(this.readyState == 4 && this.status == 200){
            let res = JSON.parse(this.responseText);
            let data = res.data;
            
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
            tblComando = $('#tblComando').dataTable({
                pageLength:10,
                data: data,
                responsive: true,
                //order: [[0, 'desc']], 
                columns: [
                    { 'data': 'imei' },
                    { 'data': 'estado' },
                    { 'data': 'fecha_creacion' },
                    { 'data': 'fecha_ejecucion' },
                    { 'data': 'comando' },
                    { 'data': 'dispositivo' },
                    { 'data': 'evento'},
                    { 'data': 'user' },
                    { 'data': 'receta'},
                    { 'data': 'tipo' },
                    { 'data': 'status'},
                    { 'data': 'dato'}
                ],
                language: 'es',
                dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons
            }); 
         }
     }
     
 });