<?php
class ComandoModel extends Query{
    public function __construct()
    {
        parent::__construct();
    }

    public function ListaHistoricaComandos($user)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, urlapiMongo2."/Comandos/buscar/".$user);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res = curl_exec($ch);
        curl_close($ch);   
        return $res;
    }

}