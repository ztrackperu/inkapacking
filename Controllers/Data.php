<?php
class Data extends Controller
{
    public function __construct()
    {
        session_start();
        if (empty($_SESSION['activo_ztrack'])) {
            header("location: " . base_url);
        }
        parent::__construct();
    }
    public function index($id)
    {
		$id_user = $_SESSION['id_ztrack'];
        //$perm = $this->model->verificarPermisos($id_user, "AdminPage");
        //if (!$perm && $id_user != 1) {
            //$this->views->getView($this, "permisos");
            //exit;
        //}
        $data = $id;
        $this->views->getView($this, "index", $data);
    }

    public function GraficaInicial($param){
    
        if($param!=""){
            $pros = explode(",",$param);
            //se debe enviar id de telemetria
            $nombre = $pros[0];
            $telemetria = $pros[1];

            $fechaI =(isset($pros[2])) ? $pros[2] :"0" ;
            $fechaF =(isset($pros[3])) ? $pros[3] :"0" ;
            // consultar para nombre_contenedor y ultima fecha 
            $consultaUltima = $this->model->ContenedorData($nombre);
            $resultadoL = json_decode($consultaUltima);
            $resultadoL = $resultadoL->data;
            $ultimaFecha = $resultadoL[0]->ultima_fecha;
            if($fechaI=="0" && $fechaF=="0"){
                $cadena = array(
                    'device'=>$telemetria,
                    'ultima'=>gmtFecha($ultimaFecha),
                    'utc'=>$_SESSION['utc']
                );
            }else{
                if(fechaGrafica($fechaI,$fechaF)=="ok"){
                    $cadena = array(
                        'device'=>$telemetria,
                        'ultima'=>gmtFecha($ultimaFecha),
                        //'fechaI'=>$fechaI.":00",
                        //'fechaF'=>$fechaF.":00"
                        'fechaI'=> validateDate($fechaI),
                        'fechaF'=> validateDate($fechaF),
                        'utc'=>$_SESSION['utc']
                        
                    );
                    //validateDate($fechaI, $format = 'Y-m-d H:i:s')
                }else{
                    $cadena = array();
                }
            }
            if(count($cadena)!=0){
                //hacer peticion de data en el servidor 
                $dataMadurador = $this->model->DatosGraficaTabla($cadena);
                $resultadoMadurador = json_decode($dataMadurador);
                $resultadoMadurador = $resultadoMadurador->data;
            }else{
                $resultadoMadurador =fechaGrafica($fechaI,$fechaF);
            }
        }else{
            $resultadoMadurador ="";
        }
        
        //$resultadoMadurador = $resultadoMadurador->table;
        
        $res = $resultadoMadurador->table;
        foreach ($res as $data) {
            $data->created_at = cambiarFomatoFecha($data->created_at);
            $data->set_point = validarSp($data->set_point);
            $data->temp_supply_1 = validar($data->temp_supply_1);
            $data->evaporation_coil = validar($data->evaporation_coil);
            $data-> compress_coil_1 = validar($data->compress_coil_1);
            $data-> cargo_1_temp = validar($data->cargo_1_temp);
            $data-> cargo_2_temp = validar($data->cargo_2_temp);
            $data-> cargo_3_temp = validar($data->cargo_3_temp);
            $data-> cargo_4_temp = validar($data->cargo_4_temp);
            $data-> relative_humidity = validarH($data->relative_humidity);
            $data-> consumption_ph_1 = validar($data->consumption_ph_1);
            $data-> consumption_ph_2 = validar($data->consumption_ph_2);
            $data-> consumption_ph_3 = validar($data->consumption_ph_3);
            $data-> co2_reading = validarCo2R($data->co2_reading);
            $data-> power_kwh = validar($data->power_kwh);
            $data-> power_state = validar($data->power_state);
            $data-> humidity_set_point = validar($data->humidity_set_point);
            $data-> ethylene = validar($data->ethylene);
            $data-> stateProcess = validar($data->stateProcess);
            $data-> sp_ethyleno = validar($data->sp_ethyleno);

        }
        echo json_encode($res , JSON_UNESCAPED_UNICODE);
    }
}
