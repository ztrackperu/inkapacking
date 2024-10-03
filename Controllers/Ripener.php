<?php
class Ripener extends Controller
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

    public function modoRipener($param) {
        if($param!=""){
            $comando = $param;
            $trama = explode("|", $comando);
            $data = [
                'co2' => intval($trama[5]),
                'descripcion' => $trama[0],
                'etileno' => intval($trama[4]),
                'flujometro' => $trama[2],
                'horas' => intval($trama[7]),
                'humedad' => intval($trama[6]),
                'imei' => $trama[8],
                'producto' => $trama[1],
                'temperatura' => intval($trama[3]),
                'dispositivo' => $trama[9],
                'user'=> 'China Control'
            ];
            $request = $this->model->controlRipener($data);
            $response = json_encode($request);
        }
        echo json_encode($response);
    }
}