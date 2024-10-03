<?php include "Views/Templates/navbar.php"; ?>
<div class="px-2 py-2">
    <div class="col-12">
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex">
                            <h1 align="center" id="tituloGrafica">TEST123456-7</h1>    
                            <input type="hidden" id="telemetria_id" value="<?php echo $data ?>">
                        </div>
                        <div class="d-flex">
                            <button type="button" class="btn btn-primary" onclick="retornar()">Return</button>
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                            <h5>Search by date range:</h5>
                        </div>
                        <div class="d-flex flex-wrap justify-content-center align-items-center">
                            <div class="col-6 col-lg-2" style="padding-left: 15px; margin-top:10px;">
                                <h5 ><strong>From :</strong></h5>
                                <input class='form-control'  id="fechaInicial" type="datetime-local">	
                            </div>
                            <div class="col-6 col-lg-2" style="padding-right: 15px;margin-top:10px;">
                                <h5 ><strong>To :</strong></h5>
                                <input class='form-control' id="fechaFin" type="datetime-local">
                            </div>
                            <div class="col-6 col-lg-2" style="margin-top:35px;">
                                <button type="button"  id="fechaPer" onclick="procesarFecha()" class="btn btn-primary btn-lg">Search </button>
                            </div>
                        </div>
                        <div class="table-responsive mt-2">
                            <table class="table table-bordered" style="width:100%" id="tblData">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>SPoint</th>
                                        <th>Supply</th>
                                        <th>Return</th>
                                        <th>Evap. coil</th>
                                        <th>Compress Coil</th>
                                        <th>USDA1</th>
                                        <th>USDA2</th>
                                        <th>USDA3</th>
                                        <th>USDA4</th>
                                        <th>Humidity</th>
                                        <th>Consumption ph1</th>
                                        <th>Consumption ph2</th>
                                        <th>CO2</th>
                                        <th>Power Khw</th>
                                        <th>Power State</th>
                                        <th>SP Humidity</th>
                                        <th>Ethylene</th>
                                        <th>State Process</th>
                                        <th>SP Ethylene</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>