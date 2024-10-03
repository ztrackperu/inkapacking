<?php
class Comando extends Controller
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
    }

    public function ListaHistoricaComandos(){
        $user = $_SESSION['id_ztrack'];
        $data = $this->model->ListaHistoricaComandos();
        echo json_encode($data);
    }
}