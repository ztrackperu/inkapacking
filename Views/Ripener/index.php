<?php include "Views/templates/navbar.php"; ?>
<div class="px-2 py-2">
    <div class="col-12">
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex gap-2">
                            <h1 class="fw-bold fs-4">Modo Ripener</h1>
                            <p>-</p>
                            <h1 class="fw-bold fs-4" id="nombreContenedor">TEST123</h1>
                        </div>
                        <div class="d-flex">
                            <button type="button" class="btn btn-primary" onclick="retornar()">Return</button>
                        </div>
                        <form id="formProcess" class="formProcessH" onsubmit="frmProcess(event);">
                            <div class="row mt-4">
                                <input type="hidden" id="telemetria_id" class="form-control text-center" value="<?php echo $data ?>">
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="dscInput">Descripción</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4">
                                    <input id="dscInput" class="form-control text-center" type="text"  name="dscInput" required>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="productoInput">Producto</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4">
                                    <input id="productoInput" class="form-control text-center" type="text"  name="productoInput" required>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="flujometroInput">Flujometro</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4">
                                    <input id="flujometroInput" class="form-control text-center" type="text"  name="flujometroInput" required>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="tmpInput">SP Temperature</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4 text-center">
                                    <input id="tmpInput" class="form-control text-center" type="text"  name="tmpInput" value="0" required>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="ethyInput">SP Ethylene</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4 text-center">
                                    <input id="ethyInput" class="form-control text-center" type="text" name="ethyInput" value="0" required> 
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="co2Input">SP CO2</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4 text-center">
                                    <input id="co2Input" class="form-control text-center" type="text" name="co2Input" value="0" required> 
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="hmInput">SP Humidity</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4 text-center">
                                    <input id="hmInput" class="form-control text-center" type="text" name="hmInput" value="0" required> 
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="ihoursInput">I. Hours</label>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4 text-center">
                                    <input id="ihoursInput" class="form-control text-center" type="text" name="ihoursInput" value="0" required> 
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="d-flex justify-content-between">
                                        <label>Process</label>
                                        <button class="btn btn-success btn-process px-2 py-2" id="btnAddProcess" type="submit">
                                            <i class="bi bi-patch-check-fill fs-6"></i>
                                                Start Process
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--MODAL -->
<div class='modal fade' id='strtProcess' tabindex='-1' aria-labelledby='my-modal-title' aria-hidden='true'>
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='title'>Validate</h5>
                <button class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                <div class="mt-2">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h5>Do you want to start the ripening process?</h5>
                            <div class="card py-2 px-2">
                                <div class="card-body">
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateDsc">Descripción</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateDsc" class="form-control text-center" type="text"  name="validateDsc" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateProducto">Producto</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateProducto" class="form-control text-center" type="text"  name="validateProducto" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateFlujometro">Flujometro</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateFlujometro" class="form-control text-center" type="text"  name="validateFlujometro" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateTMP">SP Temperature</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateTMP" class="form-control text-center" type="text"  name="validateTMP" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateEthy">SP Ethylene</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateEthy" class="form-control text-center" type="text"  name="validateEthy" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateCo2">SP Co2</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateCo2" class="form-control text-center" type="text"  name="validateCo2" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateHm">SP Humidity</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateHm" class="form-control text-center" type="text"  name="validateHm" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="validateIH">Injection Hours</label>
                                            </div>
                                            <div class="col-6">
                                                <input id="validateIH" class="form-control text-center" type="text"  name="validateIH" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center gap-2 mt-2">
                        <button type="button" class="btn btn-success col-3" onclick="btnProcesar()">Yes</button>
                        <button type="button" class="btn btn-danger col-3 clean_inputTMP" data-bs-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class='modal fade' id='mdlAdvertencia' tabindex='-1' aria-labelledby='my-modal-title' aria-hidden='true'>
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='title'>Warning!!</h5>
                <button class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                <div class="mt-2">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h5>There is currently a process in place</h5>
                        </div>
                        <div class="col-12 text-center gap-2 mt-2">
                            <button type="button" class="btn btn-danger col-3" onclick="btnParar()">Stop process</button>
                            <button type="button" class="btn btn-success col-3 clean_inputTMP" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include "Views/templates/footer.php"; ?>