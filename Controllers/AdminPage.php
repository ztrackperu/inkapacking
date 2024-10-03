<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Libraries/PHPMailer/src/Exception.php';
require 'Libraries/PHPMailer/src/PHPMailer.php';
require 'Libraries/PHPMailer/src/SMTP.php';

class AdminPage extends Controller
{
    public function __construct()
    {
        session_start();
        if (empty($_SESSION['activo_ztrack'])) {
            header("location: " . base_url);
        }
        parent::__construct();
    }
    public function index()
    {
		$id_user = $_SESSION['id_ztrack'];
        //$perm = $this->model->verificarPermisos($id_user, "AdminPage");
        //if (!$perm && $id_user != 1) {
            //$this->views->getView($this, "permisos");
            //exit;
        //}
        
       
        $this->views->getView($this, "index");
        //$this->views->getView($this, "index");
    }
    public function validarCamposCorreoYClave()
    {
        $id_user = $_SESSION['id_usuario'];
        $res = $this->model->validarCamposCorreoYClave($id_user);
        echo json_encode($res);
        die();
    }

    public function registrar()
    {
        $id = strClean($_POST['id']);
        $correo_usuario = strClean($_POST['correo']);
        $clave_correo = strClean($_POST['password']);
        $email_existente = strClean($_POST['correo_admin']);
        $usuario_activo = $_SESSION['id_usuario'];

        if (empty($correo_usuario) || empty($clave_correo)) {
            $msg = array('msg' => 'Ingrese todos sus datos', 'icono' => 'warning');
        } else {
            $data = $this->model->insertarRespuesta($id, $correo_usuario,$usuario_activo);

            if ($data == "ok") {
                $evento = "RESPONDIDO";
                $id_consulta = $this->model->IdRespuesta($correo_usuario);
                $id = $id_consulta['id'];
                $data2 = $this->model->h_respuesta($id, $id, $correo_usuario,$usuario_activo, $evento);
                $msg = array('msg' => 'Respuesta enviada', 'icono' => 'success');
                
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = $correo_usuario; // Reemplaza con tu dirección de correo electrónico de Gmail
                $mail->Password = $clave_correo; // Reemplaza con tu contraseña de Gmail
                $mail->SMTPSecure = 'ssl';
                $mail->Port = 465;

                // Configuración del correo electrónico
                $mail->setFrom('zgroupsistemas@gmail.com', 'ZTRACK');
                $mail->addAddress($email_existente); // Reemplaza con la dirección de correo electrónico del destinatario
                $mail->send();
            } else {
                $msg = array('msg' => 'Error al registrar', 'icono' => 'error');
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
   
  
    public function LiveData()
    {
        // aqui debe llegar todo los datos si es user 1 sino de acuedo a loq ue esta permitido 
		$id_user = $_SESSION['id_ztrack'];
        /*
        $perm = $this->model->verificarPermisos($id_user, "Live");
        if (!$perm && $id_user != 1) {
            $this->views->getView($this, "permisos");
            exit;
        }
        */
        /*
        //forma de recibir un json desde js     
        $datosRecibidos = file_get_contents("php://input");
        //$resultado = $_POST['data'];
        //echo json_encode($datosRecibidos, JSON_UNESCAPED_UNICODE);
        $resultado1 = json_decode($datosRecibidos);
        //enviar el resultado1 a api para procesar si existe algun cambio
        $VerificarLive = $this->model->VerificarLive($resultado1);
        $resultado = $resultado1->data;
        echo json_encode($VerificarLive, JSON_UNESCAPED_UNICODE);
        */
        $datosW =$_SESSION['data'] ;
        $resultado1 = array('data'=>$datosW);
        $VerificarLive = $this->model->VerificarLive($resultado1);
        $Verificar = json_decode($VerificarLive);
        $Verificar = $Verificar->data;
        //$resultado = $VerificarLive->data;
        /*
        $text ="";
        $datosW =$_SESSION['data'] ;
        foreach ($datosW as $dat) {
            $text.=$dat->telemetria_id.",";
        }
        */
        $d =0 ;
        foreach ($datosW as $clave => $valor) {
            // $array[3] se actualizará con cada valor de $array...
            //echo "{$clave} => {$valor} ";
            //print_r($array);
            foreach ($Verificar as $dat) {
                if($valor->telemetria_id==$dat->telemetria_id){
                    //va haber reemplazo en session en la fecha pa continuar actualizando
                    $_SESSION['data'][$clave]->ultima_fecha =$dat->ultima_fecha ;
                    $dat->ultima_fecha = fechaPro($dat->ultima_fecha);
                    //echo $dat->ultima_fecha;
                    $dat->temp_supply_1 =tempNormal($dat->temp_supply_1) ; 
                    $dat->return_air =tempNormal($dat->return_air) ; 
                    $dat->set_point =tempNormal($dat->set_point);
                    $dat->relative_humidity =porNormal($dat->relative_humidity) ; 
                    $dat->humidity_set_point =porNormal($dat->humidity_set_point) ; 
                    $dat->evaporation_coil =tempNormal($dat->evaporation_coil) ; 
                    //$dat->compress_coil_1 =$dat->compress_coil_1 ;
                    //$dat->compress_coil_1 =tempNormal($dat->compress_coil_1) ;
                    $dat->ambient_air = tempNormal($dat->ambient_air);
                    $dat->cargo_1_temp =tempNormal($dat->cargo_1_temp) ; 
                    $dat->cargo_2_temp =tempNormal($dat->cargo_2_temp) ; 
                    $dat->cargo_3_temp =tempNormal($dat->cargo_3_temp) ; 
                    $dat->cargo_4_temp =tempNormal($dat->cargo_4_temp) ; 
                    $d++;
                }
            }
        }        
        //echo json_encode($_SESSION['data'][0]->telemetria_id, JSON_UNESCAPED_UNICODE);
        echo json_encode($Verificar , JSON_UNESCAPED_UNICODE);
        die();
    } 
    
    
    public function ListaDispositivoEmpresa()
    {
        //$data = $this->model->ListaDispositivoEmpresa(22);
        $data = $this->model->ListaDispositivoEmpresa(32);

        $data = json_decode($data);
        $data = $data->data;        
        $text =""; 
        $data2 =[];
        $url = base_url;
        $fecha=[];
        $dataz="";
        
        foreach($data as $val){
            $tipo = $val->extra_1;
            $enlace = ContenedorMadurador_2($val);
            $fecha =  determinarEstado($val->ultima_fecha ,$id =1,$fecha);
            $text.=$enlace['text'];
            $dataz=$val;
        }
        
        //$data->text = $text;
        $data1 =array(
            //'data'=>tarjetamadurador($val)
            'data'=>$data,
            'text'=>$text,
            'text_extra'=>$enlace,
            'extraer'=>$_SESSION['data'],
            'estadofecha'=>$fecha
        );
        
        echo json_encode($data1, JSON_UNESCAPED_UNICODE);
        die();

    }   
    

    
    public function ListaComandos(){
        $data = $this->model-> ListaComandos();
        $data = json_decode($data);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
  
    public function generarCardAnalytic(){
        $data = $this->model->generarComandos(8);
        $cards = json_decode($data);
        echo json_encode($cards, JSON_UNESCAPED_UNICODE);
    }

    public function ModalReporte($id){
        $data = $this->model->ListaDispositivoEmpresa(22);
        $data = json_decode($data);
        $data = $data->data;
        $text= '';
        foreach($data as $fila){
            if($fila->telemetria_id == $id){
                $text = modalReporte($fila);
            }
        }
    
        echo json_encode($text);
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

    public function finalizarProceso($id){
        $data = $this->model->cargarAlerta($id);
        $data = json_decode($data);
        $res = $data->data;
        $text = "";
        foreach($res as $val){
            $text .= "<div class='row mb-3'>
                            <h5>Estas seguro de finalizar el proceso de {$val->dispositivo}</h5>
                            <p>{$val->imei}</p>
                            <div class='d-flex flex-wrap gap-2 justify-content-center'>
                                <button type='button' class='btn btn-danger' onclick='finalizarProceso({$val->imei})'>Finalizar</button>
                                <!-- cancel-->
                                <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
                            </div>
                        </div>";
        }
        $res = array('text'=>$text);
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    public function cargarAlerta($imei){
        $data = $this->model->cargarAlerta($imei);
        $data = json_decode($data);
        $res = $data->data;
        $text = "";
        //me devuelve un array, solo uno
        foreach ($res as $dat) {
            $fechaInicio = cambiarFomatoFecha($dat->inicio_control);
            $fechaFinal = cambiarFomatoFecha($dat->fin_control);
            //metodo diff para obtener la diferencia de tiempo
            $fecha1 = new DateTime($fechaInicio);
            $fecha2 = new DateTime($fechaFinal);
            //hora actual
            $fechaActual = new DateTime('America/Lima');
            $fact =  $fechaActual->format('Y-m-d H:i:s');
            $fact = new DateTime($fact);
            // Comparar fechas directamente
            if ($fechaActual < $fecha2) {
                $interval = $fact->diff($fecha2);
                $diferencia = $interval->format('%H horas %i minutos');
                $text .= "<div class='alert alert-success mt-2'>
                            <div class='d-flex justify-content-between px-0 py-0'>
                                <div>
                                    <h4 class='text-center alerta-main'>{$dat->dispositivo} proceso activo: {$diferencia} para finalizar</h4>  
                                </div>
                                <!-- button close-->
                                <div>
                                    <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                </div>
                            </div>
                            <div class='d-flex justify-content-center px-0 py-0'>
                                <button type='button' class='btn bg-success text-white fw-bold alerta-main' onclick='modalfinalizar({$dat->imei})'>Finalizar</button>
                            </div>
                        </div>";
            } else {
                $text .= "<div class='alert alert-secondary mt-2'>
                            <div class='d-flex justify-content-between'>
                                <div>
                                    <h4 class='text-start alerta-main'>No hay proceso en ejecución</h4>  
                                </div>
                                <!-- button close-->
                                <div>
                                    <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                </div>
                            </div>
                        </div>";
            }
        }
        $res = array('text' => $text);
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }




    
    public function DataReporte($param){
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
        $filtro = [];
        $primeraFecha = null;
        
        foreach ($res as $data) {
            $data->created_at = cambiarFomatoFecha($data->created_at);
            $data->set_point = validarSp($data->set_point);
            $data->temp_supply_1 = validar($data->temp_supply_1);
            $data->evaporation_coil = validar($data->evaporation_coil);
            $data->compress_coil_1 = validar($data->compress_coil_1);
            $data->cargo_1_temp = validar($data->cargo_1_temp);
            $data->cargo_2_temp = validar($data->cargo_2_temp);
            $data->cargo_3_temp = validar($data->cargo_3_temp);
            $data->cargo_4_temp = validar($data->cargo_4_temp);
            $data->relative_humidity = validarH($data->relative_humidity);
            $data->consumption_ph_1 = validar($data->consumption_ph_1);
            $data->consumption_ph_2 = validar($data->consumption_ph_2);
            $data->consumption_ph_3 = validar($data->consumption_ph_3);
            $data->co2_reading = validarCo2R($data->co2_reading);
            $data->power_kwh = validar($data->power_kwh);
            $data->power_state = validar($data->power_state);
            $data->humidity_set_point = validar($data->humidity_set_point);
            $data->ethylene = validar($data->ethylene);
            $data->stateProcess = validar($data->stateProcess);
            $data->sp_ethyleno = validar($data->sp_ethyleno);
        
            // Obtener tiempo actual
            $tiempoActual = new DateTime($data->created_at);
        
            // primer created_at
            if ($primeraFecha === null) {
                $primeraFecha = $tiempoActual;
                $filtro[] = $data;
            } else {
                // Calcular la diferencia en minutos con el primer timestamp
                $interval = $primeraFecha->diff($tiempoActual);
                $diferencia = $interval->i + ($interval->h * 60) + ($interval->d * 1440); // Convertir horas y días a minutos
        
                if ($diferencia >= 30) {
                    $primeraFecha = $tiempoActual;
                    $filtro[] = $data;
                }
            }
        }
        
        echo json_encode($filtro, JSON_UNESCAPED_UNICODE);
    }
}